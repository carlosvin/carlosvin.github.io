package main

import (
	"flag"
	"fmt"
)

func main() {
	var nFlag = flag.Int("lines", 1234, "number of lines")
	flag.Parse()
	fmt.Printf("Lines %d\n", *nFlag)
}
