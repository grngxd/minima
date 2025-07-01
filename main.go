package main

import (
	"embed"
	"io/fs"
	"net/http"

	"git.iwakura.rip/grng/tiramisu"
)

var Enviroment = "dev"

//go:embed web/dist/*
var web embed.FS

func main() {
	app := tiramisu.New(tiramisu.TiramisuOptions{
		Title:  "Minima",
		Width:  800,
		Height: 600,
		Debug:  Enviroment == "dev",
	})

	app.Run(func() {
		if Enviroment == "prod" {
			// TODO: implement *tiramisu.Tiramisu.StaticFS(web) or whatever i shld call it
			go func() {
				fs, err := fs.Sub(web, "web/dist")
				if err != nil {
					panic(err)
				}
				http.Handle("/", http.FileServer(http.FS(fs)))
				http.ListenAndServe("127.0.0.1:8080", nil)
			}()
			app.Navigate("http://localhost:8080")
		} else {
			app.Navigate("http://localhost:5173")
		}
	})
}
