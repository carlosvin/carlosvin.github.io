package config

import (
	"fmt"
	"log"
	"path/filepath"
	"reflect"
	"strconv"
	"strings"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

var cfgDirNames = [...]string{"config", "configs", "cfg"}

const flagName = "config"
const flagDirs = "config-dirs"

// Cfg Configuration loader
type Cfg interface {
	// Reload the configured attributes in the structure from env, flags and/or configuration files
	Reload() error
}

type cfgLoader struct {
	cfg interface{}
}

// New Instantiate a configuration loader. It loads the configuration into cfg argument.
func New(cfg interface{}, args []string) (Cfg, error) {
	a := &appConfig{
		v:          viper.New(),
		cfg:        cfg,
		t:          reflect.ValueOf(cfg).Elem(),
		searchDirs: getSearchDirs(args),
	}
	a.initEnv()
	err := a.initFlags(args)
	if err != nil {
		return nil, err
	}
	err = a.initFiles()
	if err != nil {
		return nil, err
	}
	err = a.loadValues()
	if err != nil {
		return nil, err
	}
	return a, nil
}

func getBaseSearchDirs(program string) []string {
	dir, err := filepath.Abs(filepath.Dir(program))
	if err != nil {
		log.Printf("can't find the directory of %s, using current working path", program)
		return []string{"."}
	}
	return []string{dir, "."}
}

func getSearchDirs(args []string) []string {
	program := ""
	if len(args) > 0 {
		program = args[0]
	}
	dirs := make([]string, 0)
	for _, b := range getBaseSearchDirs(program) {
		dirs = append(dirs, b)
		for _, s := range cfgDirNames {
			dirs = append(dirs, filepath.Join(b, s))
		}
	}
	return dirs
}

// Reload The configuration from files, env and flags
func (a *appConfig) Reload() error {
	return a.loadValues()
}

// appConfig Application configuration
type appConfig struct {
	v          *viper.Viper
	cfg        interface{}
	t          reflect.Value
	searchDirs []string
}

func (a *appConfig) initEnv() {
	// Env config
	a.v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	a.v.AutomaticEnv()
}

func (a *appConfig) initFlags(args []string) error {
	// Flags config
	flagSet := pflag.NewFlagSet("flagsConfig", pflag.ExitOnError)
	flagSet.String(flagName, "", "Configuration name")
	flagSet.StringSlice(flagDirs, a.searchDirs, "Configuration directories search paths")
	for i := 0; i < a.t.NumField(); i++ {
		err := a.initFlag(a.t.Field(i), a.t.Type().Field(i), flagSet)
		if err != nil {
			return err
		}
	}
	flagSet.Parse(args)
	a.v.BindPFlags(flagSet)
	return nil
}

func (a *appConfig) initFlag(v reflect.Value, t reflect.StructField, flagSet *pflag.FlagSet) error {
	name, desc := t.Tag.Get("cfg_name"), t.Tag.Get("cfg_desc")
	switch t.Type.Kind() {
	case reflect.String:
		flagSet.String(name, v.String(), desc)
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		flagSet.Int64(name, v.Int(), desc)
	case reflect.Float32, reflect.Float64:
		flagSet.Float64(name, v.Float(), desc)
	case reflect.Bool:
		flagSet.Bool(name, v.Bool(), desc)
	case reflect.Slice:
		a.initFlagSlice(v, t, flagSet, name, desc)
	default:
		return errorType(t.Type)
	}
	return nil
}

func (a *appConfig) initFlagSlice(v reflect.Value, t reflect.StructField, flagSet *pflag.FlagSet, name, desc string) error {
	switch t.Type.Elem().Kind() {
	case reflect.String:
		slice, ok := v.Interface().([]string)
		if !ok {
			return errorType(t.Type)
		}
		flagSet.StringSlice(name, slice, desc)
	case reflect.Int:
		slice, ok := v.Interface().([]int)
		if !ok {
			return errorType(t.Type)
		}
		flagSet.IntSlice(name, slice, desc)
	default:
		return errorType(t.Type)
	}
	return nil
}

func errorType(t reflect.Type) error {
	return fmt.Errorf("unexpected type %d %v", t.Kind(), t.Name())
}

func (a *appConfig) initFiles() error {
	// Config files
	configName := a.v.GetString("config")
	if configName == "" {
		log.Println("No configuration name has been specified, so no configuration file will be loaded. Using flags and environment variables.")
		return nil
	}
	a.v.SetConfigName(configName)
	searchDirs := a.v.GetStringSlice(flagDirs)
	for _, d := range searchDirs {
		a.v.AddConfigPath(d)
	}
	a.v.WatchConfig()
	a.v.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)
	})
	return a.v.ReadInConfig()
}

func (a *appConfig) loadValues() error {
	for i := 0; i < a.t.NumField(); i++ {
		err := a.loadValue(a.t.Field(i), a.t.Type().Field(i))
		if err != nil {
			return err
		}
	}
	return nil
}

func (a *appConfig) loadValue(v reflect.Value, t reflect.StructField) error {
	name := t.Tag.Get("cfg_name")
	switch t.Type.Kind() {
	case reflect.String:
		v.SetString(a.v.GetString(name))
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		v.SetInt(a.v.GetInt64(name))
	case reflect.Float32, reflect.Float64:
		v.SetFloat(a.v.GetFloat64(name))
	case reflect.Bool:
		v.SetBool(a.v.GetBool(name))
	case reflect.Slice:
		return a.loadValueSlice(v, t, name)
	default:
		return errorType(t.Type)
	}
	return nil
}

func (a *appConfig) loadValueSlice(v reflect.Value, t reflect.StructField, name string) error {
	switch t.Type.Elem().Kind() {
	case reflect.String:
		v.Set(reflect.ValueOf(a.v.GetStringSlice(name)))
	case reflect.Int:
		v.Set(reflect.ValueOf(a.getIntSlice(name)))
	default:
		return errorType(t.Type)
	}
	return nil
}

func (a *appConfig) getIntSlice(name string) []int {
	ints := a.v.GetIntSlice(name)
	// for some reason when it is an env, the GetIntSlice doesn't return the slice
	if len(ints) == 0 {
		strs := a.v.GetStringSlice(name)
		ints = make([]int, len(strs))
		for i := range strs {
			ints[i], _ = strconv.Atoi(strs[i])
		}
	}
	return ints
}
