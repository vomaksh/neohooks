package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/webhooks/api/controllers"
	"github.com/iyorozuya/webhooks/api/structs"
	"github.com/iyorozuya/webhooks/api/webhook"
	"github.com/iyorozuya/webhooks/api/webhook-request"
	"log"
	"net/http"
)

type Controller struct {
	routes func() []structs.Route
}

func Bootstrap(db *redis.Client, r *chi.Mux) {
	// Initialize all services
	webhookRequestService := webhook_request.WebhookRequestService{DB: db}
	webhookService := webhook.WebhookService{DB: db}
	// Initialize controllers and DI services respectively
	webhookController := controllers.WebhookController{WebhookRequestService: webhookRequestService}
	webhookCoreController := controllers.WebhookCoreController{WebhookService: webhookService}
	webhookRequestController := controllers.WebhookRequestController{WebhookRequestService: webhookRequestService}
	// register routes
	registerRoutes(r, []Controller{
		{routes: webhookController.Routes},
		{routes: webhookCoreController.Routes},
		{routes: webhookRequestController.Routes},
	})
}

// register routes of given controllers
func registerRoutes(r *chi.Mux, controllers []Controller) {
	for _, controller := range controllers {
		for _, route := range controller.routes() {
			registerRouteByMethod(r, route)
		}
	}
}

// register route by method
func registerRouteByMethod(r *chi.Mux, route structs.Route) {
	switch route.Method {
	case http.MethodGet:
		r.Get(route.Path, route.Handler)
	case http.MethodPost:
		r.Post(route.Path, route.Handler)
	case http.MethodDelete:
		r.Delete(route.Path, route.Handler)
	default:
		log.Fatalf("%s Method not supported\n", route.Method)
	}
}
