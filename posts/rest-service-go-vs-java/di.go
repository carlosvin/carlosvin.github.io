package main

import "fmt"

// Greeter interface to greet the caller
type Greeter interface {
	greet()
}

type greeterHello struct{}

func (g *greeterHello) greet() {
	fmt.Println("Hello!")
}

type greeterHi struct{}

func (g *greeterHi) greet() {
	fmt.Println("Hi!")
}

// App Application representation
type App struct {
	greeters []Greeter
}

func (app *App) startup() {
	for _, v := range app.greeters {
		v.greet()
	}
}

func main() {
	greeters := []Greeter{
		&greeterHello{},
		&greeterHi{},
		&greeterHello{}}

	app := &App{greeters}

	app.startup()
}
