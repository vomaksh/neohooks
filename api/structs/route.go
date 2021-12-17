package structs

import "net/http"

type Route struct {
	Path    string
	Method  string
	Handler func(w http.ResponseWriter, r *http.Request)
}
