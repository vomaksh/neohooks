package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/webhooks/api/controllers"
	"github.com/iyorozuya/webhooks/api/structs"
	"github.com/iyorozuya/webhooks/api/webhook"
	"log"
	"net/http"
)

type Controller struct {
	routes func() []structs.Route
}

func Bootstrap(db *redis.Client, r *chi.Mux) {
	webhookController := controllers.WebhookController{DB: db, Service: webhook.WebhookService{
		DB: db,
	}}
	registerRoutes(r, []Controller{
		Controller{routes: webhookController.Routes},
	})
}

func registerRoutes(r *chi.Mux, controllers []Controller) {
	for _, controller := range controllers {
		for _, route := range controller.routes() {
			registerRouteByMethod(r, route)
		}
	}
}

func registerRouteByMethod(r *chi.Mux, route structs.Route) {
	switch route.Method {
	case http.MethodGet:
		r.Get("/api"+route.Path, route.Handler)
	case http.MethodPost:
		r.Post("/api"+route.Path, route.Handler)
	case http.MethodDelete:
		r.Delete("/api"+route.Path, route.Handler)
	default:
		log.Fatalf("%s Method not supported\n", route.Method)
	}
}
