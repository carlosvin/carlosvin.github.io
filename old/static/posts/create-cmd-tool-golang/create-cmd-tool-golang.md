# Easily creating a golang command line tool

[Golang, window=_blank](https://golang.org/) is the one of the most useful technologies I’ve recently learned. [Golang, window=_blank](https://golang.org/) has a pretty nice support for networking, command line or logging out of the box, you don’t need any dependency. But there are libraries making developers' life even easier. 

I’ve already talked about [creating REST service in go,window=blank_](/posts/rest-service-go-vs-java/), today I’d like to focus on creating a command line tool.

## Flags

**Command line tool to read number of lines as an input integer parameter [Golang, window=_blank](https://golang.org/)**

```go
```

With previous simple code we have already some useful capabilities

**Print help menu**

```bash
$ cmd --help

> Usage of cmd:
    -lines int
        number of lines (default 1234)
```

**Use default value**

```bash
$ cmd

> Lines 1234
```

**Pass a value to the command tool**

```bash
$ cmd --lines=2

> Lines 2
```

**Pass an invalid value**

```bash
$ cmd --lines=asdf

> invalid value "asdf" for flag -lines: parse error
Usage of cmd:
    -lines int
        number of lines (default 1234)
exit status 2
```

For a simple command line tool, in most of the cases, we will have enough with the default language support. But if we want to bring more features to the combo like reading configuration from environment variables or from files, then a library like the awesome [Viper,window=_blank](https://github.com/spf13/viper) will come really handy.

## Viper

[Viper,window=_blank](https://github.com/spf13/viper) is very powerful and well documented library widely used from many projects, I will not get into the details or how to use it, because I’ve created an abstraction to simplify its usage, I named it [Meta-Viper,window=_blank](https://github.com/carlosvin/meta-viper).

## Meta-Viper
[Meta-Viper,window=_blank](https://github.com/carlosvin/meta-viper) abstracts you of the details of reading configuration from files, environment or flags. This extra simplicity comes with a tradeoff, we are missing some flexibility.

Let’s see some features with an example. 

**Firstly we have to create a go modules project with the meta-viper dependency**

```bash
go mod init example.com/meta-viper ①

go get github.com/carlosvin/meta-viper ②
```
1. Create a go modules project
2. Install the meta-viper dependency

Now let’s create a program that is configurable from files, command line params and environment variables.

**main.go**

```go
```

Now let’s see some examples how this command line tool is able to load configuration.

**Print usage (help)**

```bash
$ cmd --help

Usage of flagsConfig:
    --apis.search string    Search API endpoint (default "google")
    --config string         Configuration name
    --config-dirs strings   Configuration directories search paths (default [.,config,configs,cfg])
    --host string           Server host (default "localhost")
    --port int              Server port (default 6000)
pflag: help requested
exit status 2
```

**Run with default values**

```bash
$ cmd

2021/02/15 23:12:48 No configuration name has been specified, so no configuration file will be loaded. Using flags and environment variables.
2021/02/15 23:12:48 Loaded Configuration &{localhost 6000 google}...
```

**Read the port from environment variable and host from input param**

```bash
$ PORT=9999 cmd --host=myhost

2021/02/15 23:15:47 No configuration name has been specified, so no configuration file will be loaded. Using flags and environment variables.
2021/02/15 23:15:47 Loaded Configuration &{myhost 9999 google}...
```

The last example will aggregate all the possible sources of configuration, it will extend the previous one adding configuration from a file. So let’s create a configuration file:

**the-config.json**

```json
```

**Read configuration from the-config.json file, from environment and from input params**

```bash
$ PORT=9999 cmd --host=myhost --config=the-config

2021/02/15 23:22:17 Loaded Configuration &{myhost 9999 duckduckgo}...
```

**💡 TIP**\
Here you can find a [multi-environment example,window=_blank](https://github.com/carlosvin/meta-viper/tree/master/examples/multi-env) a little bit more complete.
