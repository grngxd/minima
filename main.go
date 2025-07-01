package main

import (
	"embed"
	"io/fs"
	"net/http"

	"git.iwakura.rip/grng/tiramisu"
)

var Environment = "dev"

//go:embed web/dist/*
var web embed.FS

func main() {
	app := tiramisu.New(tiramisu.TiramisuOptions{
		Title:  "Minima",
		Width:  800,
		Height: 600,
		Debug:  Environment == "dev",
	})

	app.Run(func() {
		if Environment == "prod" {
			// TODO: implement *tiramisu.Tiramisu.StaticFS(web) or whatever i shld call it
			go func() {
				fs, err := fs.Sub(web, "web/dist")
				if err != nil {
					panic(err)
				}
				http.Handle("/", http.FileServer(http.FS(fs)))
				http.ListenAndServe(":8080", nil)
			}()
			app.Navigate("http://localhost:8080")
		} else {
			app.Navigate("http://localhost:5173")
		}
	})
}
