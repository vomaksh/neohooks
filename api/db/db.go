package db

import "github.com/go-redis/redis/v8"

type DBOptions struct {
	Addr     string
	Password string
	Name     int
}

func Connect(db DBOptions) *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     db.Addr,
		Password: db.Password,
		DB:       db.Name,
	})
}
