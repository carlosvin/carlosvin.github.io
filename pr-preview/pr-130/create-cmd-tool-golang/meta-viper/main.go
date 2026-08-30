package main

import (
	"log"
	"os"

	config "github.com/carlosvin/meta-viper"
)

// Here is where you define the struct that will hold the configuration values
// cfg_name is the parameter name
// cfg_desc is the parameter description that will be shown in the command line help
type appConfig struct {
	Host      string `cfg_name:"host" cfg_desc:"Server host"`
	Port      int    `cfg_name:"port" cfg_desc:"Server port"`
	SearchAPI string `cfg_name:"apis.search" cfg_desc:"Search API endpoint"`
}

func main() {
	// Instantiate the structure with default values
	cfg := &appConfig{
		Host:      "localhost",
		Port:      6000,
		SearchAPI: "google",
	}

	// Meta-Viper instance is loading the configuration from wherever is available: files, env, or input params
	_, err := config.New(cfg, os.Args)
	if err != nil {
		panic(err)
	}
	log.Printf("Loaded Configuration %v...", cfg)
}
