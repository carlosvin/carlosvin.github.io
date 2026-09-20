package main

import (
	"log"
	"net/http"
)

func main() {
	router := http.NewServeMux()
	router.Handle("/redirect", http.RedirectHandler("https://carlosvin.github.io/", 307))
	router.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello world!"))
	})
	log.Println("Listening...")
	http.ListenAndServe(":3000", router)
}
