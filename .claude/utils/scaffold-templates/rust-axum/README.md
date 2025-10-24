# Rust + Axum Framework Template

High-performance, type-safe web framework built on Tokio for blazing-fast APIs.

## Initialization

```bash
cargo init
# Edit Cargo.toml to add dependencies
cargo build
```

## What's Included

- ✅ Axum 0.8+ web framework
- ✅ Tokio async runtime
- ✅ Tower middleware
- ✅ Serde for JSON
- ✅ Type-safe routing

## Project Structure

```
rust-project/
├── src/
│   ├── main.rs              # Application entry point
│   ├── routes/              # Route handlers
│   │   ├── mod.rs
│   │   └── users.rs
│   ├── models/              # Data models
│   │   ├── mod.rs
│   │   └── user.rs
│   ├── handlers/            # Request handlers
│   │   ├── mod.rs
│   │   └── users.rs
│   ├── middleware/          # Custom middleware
│   │   └── mod.rs
│   ├── database.rs          # Database connection
│   └── config.rs            # Configuration
├── tests/
│   └── integration_tests.rs
├── Cargo.toml
├── Cargo.lock
└── .env
```

## Cargo.toml

```toml
[package]
name = "my-api"
version = "0.1.0"
edition = "2021"

[dependencies]
# Web framework
axum = "0.8"
tokio = { version = "1", features = ["full"] }
tower = "0.5"
tower-http = { version = "0.6", features = ["cors", "trace"] }

# Serialization
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# Database
sqlx = { version = "0.8", features = ["runtime-tokio", "postgres", "uuid", "chrono"] }

# Environment & Config
dotenv = "0.15"
config = "0.14"

# JWT & Auth
jsonwebtoken = "9"

# Validation
validator = { version = "0.18", features = ["derive"] }

# Logging
tracing = "0.1"
tracing-subscriber = "0.3"

# Async traits
async-trait = "0.1"

[dev-dependencies]
# Testing
reqwest = { version = "0.12", features = ["json"] }
```

## Main Application

```rust
// src/main.rs
use axum::{
    routing::{get, post},
    Router,
};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tracing_subscriber;

mod routes;
mod handlers;
mod models;
mod database;
mod config;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Initialize database
    let db = database::init().await.expect("Failed to connect to database");

    // Build router
    let app = Router::new()
        .route("/", get(root))
        .route("/health", get(health_check))
        .nest("/api/v1", routes::users::routes())
        .layer(CorsLayer::permissive())
        .with_state(db);

    // Run server
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> &'static str {
    "Welcome to the API"
}

async fn health_check() -> &'static str {
    "healthy"
}
```

## Models

```rust
// src/models/user.rs
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateUser {
    #[validate(email)]
    pub email: String,

    #[validate(length(min = 3))]
    pub name: String,

    #[validate(length(min = 8))]
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct UserResponse {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub created_at: DateTime<Utc>,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        UserResponse {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
        }
    }
}
```

## Handlers

```rust
// src/handlers/users.rs
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use uuid::Uuid;
use validator::Validate;

use crate::models::user::{CreateUser, User, UserResponse};
use crate::database::DatabasePool;

pub async fn create_user(
    State(db): State<DatabasePool>,
    Json(payload): Json<CreateUser>,
) -> Result<(StatusCode, Json<UserResponse>), StatusCode> {
    // Validate input
    payload.validate().map_err(|_| StatusCode::BAD_REQUEST)?;

    // Create user in database
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (email, name, hashed_password) VALUES ($1, $2, $3) RETURNING *"
    )
    .bind(&payload.email)
    .bind(&payload.name)
    .bind(hash_password(&payload.password))
    .fetch_one(&db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok((StatusCode::CREATED, Json(user.into())))
}

pub async fn get_users(
    State(db): State<DatabasePool>,
) -> Result<Json<Vec<UserResponse>>, StatusCode> {
    let users = sqlx::query_as::<_, User>("SELECT * FROM users")
        .fetch_all(&db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let response: Vec<UserResponse> = users.into_iter().map(|u| u.into()).collect();
    Ok(Json(response))
}

pub async fn get_user(
    State(db): State<DatabasePool>,
    Path(id): Path<Uuid>,
) -> Result<Json<UserResponse>, StatusCode> {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(id)
        .fetch_one(&db)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;

    Ok(Json(user.into()))
}

fn hash_password(password: &str) -> String {
    // Implement password hashing
    password.to_string()
}
```

## Routes

```rust
// src/routes/users.rs
use axum::{
    routing::{get, post},
    Router,
};

use crate::handlers::users;
use crate::database::DatabasePool;

pub fn routes() -> Router<DatabasePool> {
    Router::new()
        .route("/users", get(users::get_users).post(users::create_user))
        .route("/users/:id", get(users::get_user))
}
```

## Database

```rust
// src/database.rs
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

pub type DatabasePool = PgPool;

pub async fn init() -> Result<DatabasePool, sqlx::Error> {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}
```

## Environment Variables

```env
# .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
JWT_SECRET=your-secret-key
RUST_LOG=info
```

## Middleware Example

```rust
// src/middleware/auth.rs
use axum::{
    extract::Request,
    http::{StatusCode, HeaderMap},
    middleware::Next,
    response::Response,
};

pub async fn auth(
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let auth_header = headers
        .get("authorization")
        .and_then(|h| h.to_str().ok())
        .ok_or(StatusCode::UNAUTHORIZED)?;

    if !auth_header.starts_with("Bearer ") {
        return Err(StatusCode::UNAUTHORIZED);
    }

    // Validate JWT token

    Ok(next.run(request).await)
}
```

## Testing

```rust
// tests/integration_tests.rs
use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use tower::ServiceExt;

use my_api::app;

#[tokio::test]
async fn test_health_check() {
    let app = app().await;

    let response = app
        .oneshot(Request::builder().uri("/health").body(Body::empty()).unwrap())
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);
}
```

Run tests:
```bash
cargo test
cargo test -- --nocapture  # Show println output
cargo test --release       # Test release build
```

## Build and Run

```bash
# Development
cargo run

# Release build
cargo build --release
./target/release/my-api

# Watch mode (install cargo-watch)
cargo install cargo-watch
cargo watch -x run
```

## Docker

```dockerfile
# Multi-stage build
FROM rust:1.75 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y libpq5 ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/target/release/my-api .
EXPOSE 3000
CMD ["./my-api"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/mydb
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

## Database Migrations (SQLx)

```bash
# Install SQLx CLI
cargo install sqlx-cli --no-default-features --features postgres

# Create migration
sqlx migrate add create_users_table

# Edit migration file, then run
sqlx migrate run

# Revert migration
sqlx migrate revert
```

Example migration:
```sql
-- migrations/20240101_create_users_table.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

## Best Practices

1. **Error Handling** - Use Result<T, E> everywhere
2. **Type Safety** - Leverage Rust's type system
3. **Async/Await** - Use tokio for async operations
4. **Ownership** - Understand borrowing and lifetimes
5. **Testing** - Write unit and integration tests
6. **Logging** - Use tracing for structured logging
7. **Security** - Memory safety by default

## Resources

- [Axum Documentation](https://docs.rs/axum)
- [Tokio Documentation](https://tokio.rs)
- [SQLx Documentation](https://docs.rs/sqlx)
- [Rust Book](https://doc.rust-lang.org/book/)
