# Go + Gin Framework Template

Fast, minimalist Go web framework for building high-performance APIs.

## Initialization

```bash
go mod init github.com/username/project-name
mkdir -p cmd/api pkg/handlers internal/models pkg/middleware pkg/utils
```

## What's Included

- ✅ Go modules
- ✅ Gin framework
- ✅ Clean architecture structure
- ✅ Middleware support
- ✅ Built-in testing

## Project Structure

```
go-project/
├── cmd/
│   └── api/
│       └── main.go          # Application entry point
├── internal/
│   ├── models/              # Data models
│   ├── repository/          # Database layer
│   └── config/              # Configuration
├── pkg/
│   ├── handlers/            # HTTP handlers (controllers)
│   ├── middleware/          # Custom middleware
│   └── utils/               # Utility functions
├── test/
├── go.mod
├── go.sum
├── .env.example
└── README.md
```

## Required Packages

```bash
# Core framework
go get -u github.com/gin-gonic/gin

# Environment variables
go get -u github.com/joho/godotenv

# Database (PostgreSQL)
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres

# Validation
go get -u github.com/go-playground/validator/v10

# JWT Authentication
go get -u github.com/golang-jwt/jwt/v5

# CORS
go get -u github.com/gin-contrib/cors

# Testing
go get -u github.com/stretchr/testify
```

## Main Application Setup

```go
// cmd/api/main.go
package main

import (
    "log"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "github.com/username/project/pkg/handlers"
    "github.com/username/project/pkg/middleware"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    // Initialize Gin router
    r := gin.Default()

    // Middleware
    r.Use(middleware.CORS())
    r.Use(middleware.Logger())

    // Health check
    r.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "status": "healthy",
        })
    })

    // API routes
    v1 := r.Group("/api/v1")
    {
        v1.GET("/users", handlers.GetUsers)
        v1.POST("/users", handlers.CreateUser)
        v1.GET("/users/:id", handlers.GetUser)
        v1.PUT("/users/:id", handlers.UpdateUser)
        v1.DELETE("/users/:id", handlers.DeleteUser)
    }

    // Protected routes
    auth := v1.Group("/")
    auth.Use(middleware.AuthRequired())
    {
        auth.GET("/profile", handlers.GetProfile)
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    r.Run(":" + port)
}
```

## Handler Example

```go
// pkg/handlers/users.go
package handlers

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/username/project/internal/models"
)

type CreateUserRequest struct {
    Email string `json:"email" binding:"required,email"`
    Name  string `json:"name" binding:"required,min=3"`
}

func GetUsers(c *gin.Context) {
    // Fetch users from database
    users := []models.User{}

    c.JSON(http.StatusOK, gin.H{
        "data": users,
    })
}

func CreateUser(c *gin.Context) {
    var req CreateUserRequest

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": err.Error(),
        })
        return
    }

    // Create user in database
    user := models.User{
        Email: req.Email,
        Name:  req.Name,
    }

    c.JSON(http.StatusCreated, gin.H{
        "data": user,
    })
}

func GetUser(c *gin.Context) {
    id := c.Param("id")

    // Fetch user from database

    c.JSON(http.StatusOK, gin.H{
        "data": gin.H{"id": id},
    })
}
```

## Models

```go
// internal/models/user.go
package models

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    ID        uint           `gorm:"primarykey" json:"id"`
    Email     string         `gorm:"unique;not null" json:"email"`
    Name      string         `gorm:"not null" json:"name"`
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
```

## Middleware

```go
// pkg/middleware/cors.go
package middleware

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func CORS() gin.HandlerFunc {
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    config.AllowCredentials = true
    return cors.New(config)
}

// pkg/middleware/auth.go
package middleware

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")

        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "authorization header required",
            })
            c.Abort()
            return
        }

        // Validate JWT token

        c.Next()
    }
}
```

## Database Configuration

```go
// internal/config/database.go
package config

import (
    "fmt"
    "os"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {
    dsn := fmt.Sprintf(
        "host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_PORT"),
    )

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }

    return db, nil
}
```

## Environment Variables

```env
# .env
PORT=8080
GIN_MODE=release  # or debug

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydb

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

## Testing

```go
// pkg/handlers/users_test.go
package handlers

import (
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func TestGetUsers(t *testing.T) {
    gin.SetMode(gin.TestMode)

    w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)

    GetUsers(c)

    assert.Equal(t, http.StatusOK, w.Code)
}
```

Run tests:
```bash
go test ./...
go test -v ./pkg/handlers
go test -cover ./...
```

## Build and Run

```bash
# Development
go run cmd/api/main.go

# Build for production
go build -o bin/api cmd/api/main.go

# Run binary
./bin/api

# Cross-compile for Linux
GOOS=linux GOARCH=amd64 go build -o bin/api-linux cmd/api/main.go
```

## Docker

```dockerfile
# Multi-stage build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/api/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY .env .
EXPOSE 8080
CMD ["./main"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
```

## Best Practices

1. **Package Organization** - Use internal/ for private packages
2. **Error Handling** - Always check errors, use custom error types
3. **Context Usage** - Pass context.Context for cancellation
4. **Defer Cleanup** - Use defer for resource cleanup
5. **Interface Design** - Program to interfaces, not implementations
6. **Concurrency** - Use goroutines and channels appropriately
7. **Testing** - Write tests with table-driven approach

## Resources

- [Gin Documentation](https://gin-gonic.com/docs/)
- [Go Documentation](https://go.dev/doc/)
- [GORM Documentation](https://gorm.io/docs/)
- [Go Project Layout](https://github.com/golang-standards/project-layout)
