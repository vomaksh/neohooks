package api

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/neohooks/api/controllers"
	"github.com/iyorozuya/neohooks/api/services"
	"github.com/iyorozuya/neohooks/api/structs"
)

type Controller struct {
	routes func() []structs.Route
}

func Bootstrap(db *redis.Client, r *chi.Mux) {
	// Initialize all services
	webhookRequestService := services.WebhookRequestService{DB: db}
	webhookService := services.WebhookService{
		DB:                    db,
		WebhookRequestService: webhookRequestService,
	}
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
