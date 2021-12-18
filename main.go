package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/iyorozuya/webhooks/api"
	"github.com/iyorozuya/webhooks/api/db"
	"log"
	"net/http"
)

func main() {
	r := chi.NewRouter()

	// Middlewares
	r.Use(middleware.Logger)

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
