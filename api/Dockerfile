FROM golang:1.17 as builder

WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY api/ api/
RUN ls -l

RUN go build -o app api/main.go

FROM golang:1.17 as production

WORKDIR /app
COPY --from=builder /app/app .

ENTRYPOINT ["./app"]