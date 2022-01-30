FROM golang:1.17 as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY pkg/ pkg/
COPY services/webhook services/webhook

RUN go build -o webhook_service services/webhook/main.go

FROM golang:1.17 as production

WORKDIR /app
COPY --from=builder /app/webhook_service .

ENTRYPOINT ["./webhook_service"]