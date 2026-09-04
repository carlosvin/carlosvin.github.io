package main

import "fmt"

// Greeter interface to greet the caller
type Greeter interface {
	greet()
}

type greeterHello struct{}

func (g *greeterHello) greet() { // <3>
	fmt.Println("Hello!")
}

type greeterHi struct{}

func (g *greeterHi) greet() { // <4>
	fmt.Println("Hi!")
}

// App Application representation
type App struct {
	greeters []Greeter // <1>
}

func (app *App) startup() {
	for _, v := range app.greeters {
		v.greet()
	}
}

func main() {
	greeters := []Greeter{ // <2>
		&greeterHello{},
		&greeterHi{},
		&greeterHello{}}

	app := &App{greeters}

	app.startup()
}

/*
<1> `App` accepts an array of `Greeter`
<2> During `App` instantiation we pass different implementations of `Greeter`
<3> Greeter implementation that prints *Hello!*
<4> Greeter implementation that prints *Hi!*
*/
