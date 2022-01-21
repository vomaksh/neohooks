package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/neohooks/api/controllers"
	"github.com/iyorozuya/neohooks/api/db"
	"github.com/iyorozuya/neohooks/api/services"
	"github.com/iyorozuya/neohooks/api/structs"
)

type Controller struct {
	routes func() []structs.Route
}

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
	bootstrap(rdb, r)
	if err := http.ListenAndServe(":5000", r); err != nil {
		log.Fatalf("%s\n", err)
	}
}

func bootstrap(db *redis.Client, r *chi.Mux) {
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
