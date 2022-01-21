FROM golang:1.17 as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o app main.go

FROM golang:1.17 as production

WORKDIR /app
COPY --from=builder /app/app .

ENTRYPOINT ["./app"]