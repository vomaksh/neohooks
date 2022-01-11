package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/iyorozuya/neohooks/api"
	"github.com/iyorozuya/neohooks/api/db"
)

func main() {
	r := chi.NewRouter()

	// Base middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	// json, xml, plain text allowed as content type
	r.Use(middleware.AllowContentType("application/json", "application/xml", "text/plain"))

	// Middleware for setting header Content-Type to application/json
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
	})

	// Redis client
	rdb := db.Connect(db.DBOptions{
		Addr:     "redis:6379",
		Name:     0,
		Password: "",
	})

	// bootstrap api
	api.Bootstrap(rdb, r)
	if err := http.ListenAndServe(":5000", r); err != nil {
		log.Fatalf("%s\n", err)
	}
}
