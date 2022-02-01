package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/iyorozuya/neohooks/pkg/db"
	"github.com/iyorozuya/neohooks/pkg/structs"
	"github.com/iyorozuya/neohooks/pkg/webhook"
	"github.com/iyorozuya/neohooks/pkg/webhook_request"
)

type WebhookUtil struct {
	WebhookService        webhook.WebhookService
	WebhookRequestService webhook_request.WebhookRequestService
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

	wrs := webhook_request.WebhookRequestService{DB: rdb}
	wru := WebhookUtil{
		WebhookService: webhook.WebhookService{
			DB:                    rdb,
			WebhookRequestService: wrs,
		},
		WebhookRequestService: wrs,
	}

	r.HandleFunc("/{id}", wru.HandleFunc)

	if err := http.ListenAndServe(":5000", r); err != nil {
		log.Fatalf("%s\n", err)
	}
}

func (wru *WebhookUtil) HandleFunc(w http.ResponseWriter, r *http.Request) {
	webhookId := chi.URLParam(r, "id")
	webhookExists, err := wru.WebhookService.Exists(webhookId)
	if err != nil || !webhookExists {
		w.WriteHeader(422)
		json.NewEncoder(w).Encode(
			structs.ErrorResponse{
				Errors: []string{"webhook doesn't exists"},
			},
		)
		return
	}
	headers := make(map[string]string)
	// Extract request body if method == POST
	var requestBody []byte
	if r.Method == "POST" {
		reqBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(422)
			json.NewEncoder(w).Encode(
				structs.ErrorResponse{
					Errors: []string{"unable to read body"},
				},
			)
			return
		}
		requestBody = reqBody
	}
	// Get webhook-request headers
	for header, values := range r.Header {
		headers[header] = strings.Join(values, ", ")
	}
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	wru.WebhookRequestService.Save(webhookId,
		structs.WebhookRequest{
			ID:           headers["X-Request-Id"],
			URL:          fmt.Sprintf("%s://%s%s", scheme, r.Host, r.RequestURI),
			Method:       r.Method,
			Host:         r.RemoteAddr,
			Size:         strconv.FormatInt(r.ContentLength, 10),
			Headers:      headers,
			QueryStrings: r.URL.Query(),
			Body:         string(requestBody),
			CreatedAt:    headers["X-Request-Time"],
		})
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Ok!",
	})
}
