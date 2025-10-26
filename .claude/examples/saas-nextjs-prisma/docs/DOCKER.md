# Docker Guide

Complete guide for running the SaaS application with Docker and Docker Compose.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Docker Compose Commands](#docker-compose-commands)
- [Dockerfile Explanation](#dockerfile-explanation)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

---

## Quick Start

Get the entire application running with one command:

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Generate secure secret
openssl rand -base64 32
# Add this to .env as NEXTAUTH_SECRET=<generated-secret>

# 3. Start all services
docker compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### What Gets Started

- **PostgreSQL**: Database server on port 5432
- **Next.js App**: Application server on port 3000
- **Automatic Migrations**: Database schema is applied on startup

---

## Prerequisites

### Required

- **Docker 20.10+** - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose 2.0+** - Included with Docker Desktop
- **2 GB RAM** - Minimum for running containers
- **5 GB disk space** - For images and volumes

### Check Versions

```bash
docker --version
# Docker version 24.0.0 or higher

docker compose version
# Docker Compose version 2.0.0 or higher
```

---

## Configuration

### Environment Variables

The application requires these environment variables:

#### Required

```env
# Database connection (Docker Compose sets this automatically)
DATABASE_URL="postgresql://postgres:password@postgres:5432/saas_app"

# NextAuth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secure-secret-here"

# Application URL
NEXTAUTH_URL="http://localhost:3000"
```

#### Optional

```env
# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Node environment
NODE_ENV="production"
```

### Creating .env File

```bash
# Copy example
cp .env.example .env

# Generate secret
openssl rand -base64 32

# Edit .env and add the generated secret
nano .env
```

---

## Docker Compose Commands

### Start Services

```bash
# Start in foreground (see logs)
docker compose up

# Start in background (detached)
docker compose up -d

# Rebuild images and start
docker compose up --build

# Start specific service
docker compose up postgres
```

### Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (⚠️ deletes database data)
docker compose down -v

# Stop specific service
docker compose stop app
```

### View Logs

```bash
# View all logs
docker compose logs

# Follow logs (real-time)
docker compose logs -f

# View specific service logs
docker compose logs app
docker compose logs postgres

# Last 100 lines
docker compose logs --tail=100 app
```

### Service Status

```bash
# List running services
docker compose ps

# View resource usage
docker compose top

# Check service health
docker compose ps app
```

### Accessing Containers

```bash
# Open shell in app container
docker compose exec app sh

# Open shell in postgres container
docker compose exec postgres psql -U postgres -d saas_app

# Run command in container
docker compose exec app npm run db:studio
```

### Database Operations

```bash
# Run migrations
docker compose exec app npx prisma migrate deploy

# Generate Prisma Client
docker compose exec app npx prisma generate

# Open Prisma Studio
docker compose exec app npx prisma studio --browser none
# Then open http://localhost:5555 in your browser

# Backup database
docker compose exec postgres pg_dump -U postgres saas_app > backup.sql

# Restore database
cat backup.sql | docker compose exec -T postgres psql -U postgres saas_app
```

### Rebuild and Restart

```bash
# Rebuild app service only
docker compose build app

# Restart services
docker compose restart

# Restart specific service
docker compose restart app
```

### Clean Up

```bash
# Remove stopped containers
docker compose rm

# Remove all containers, networks, and volumes
docker compose down -v

# Remove unused Docker images
docker image prune

# Remove all unused Docker resources
docker system prune -a
```

---

## Dockerfile Explanation

The Dockerfile uses a multi-stage build for optimization:

### Stage 1: Dependencies

```dockerfile
FROM node:18-alpine AS deps
```

- Installs Node.js dependencies
- Uses Alpine Linux for smaller image size
- Only installs production dependencies

### Stage 2: Builder

```dockerfile
FROM node:18-alpine AS builder
```

- Generates Prisma Client
- Builds Next.js application
- Creates optimized production build
- Enables standalone output mode

### Stage 3: Runner

```dockerfile
FROM node:18-alpine AS runner
```

- Minimal production image
- Runs as non-root user for security
- Includes only necessary files
- Uses entrypoint script for migrations

### Image Size

- **Development image**: ~1.2 GB (with dev dependencies)
- **Production image**: ~300 MB (optimized)

---

## Troubleshooting

### Port Already in Use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - '3001:3000'
```

### Database Connection Failed

**Error**: `Can't reach database server at postgres:5432`

**Solution**:
```bash
# Check if postgres container is running
docker compose ps postgres

# View postgres logs
docker compose logs postgres

# Restart postgres
docker compose restart postgres

# Verify network connectivity
docker compose exec app ping postgres
```

### Build Fails

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker compose build --no-cache

# Verify Prisma generate runs in Dockerfile
docker compose up --build
```

### Migrations Fail

**Error**: `Migration failed to apply`

**Solution**:
```bash
# Check database schema
docker compose exec postgres psql -U postgres -d saas_app -c "\dt"

# Reset database (⚠️ deletes all data)
docker compose down -v
docker compose up

# Run migrations manually
docker compose exec app npx prisma migrate deploy
```

### Container Exits Immediately

**Error**: Container starts then stops

**Solution**:
```bash
# View container logs
docker compose logs app

# Check environment variables
docker compose exec app env | grep DATABASE

# Verify NEXTAUTH_SECRET is set
docker compose exec app env | grep NEXTAUTH
```

### Out of Memory

**Error**: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase Docker memory limit
# Docker Desktop → Settings → Resources → Memory → 4 GB

# Or add to Dockerfile
ENV NODE_OPTIONS="--max-old-space-size=4096"
```

### Health Check Fails

**Error**: `Health check failed`

**Solution**:
```bash
# Test health endpoint manually
docker compose exec app curl http://localhost:3000/api/health

# Check database connection
docker compose exec app npx prisma db pull

# View detailed logs
docker compose logs --tail=50 app
```

---

## Production Deployment

### Building for Production

```bash
# Build production image
docker build -t saas-app:1.0.0 .

# Tag for registry
docker tag saas-app:1.0.0 registry.example.com/saas-app:1.0.0

# Push to registry
docker push registry.example.com/saas-app:1.0.0
```

### Running in Production

```bash
# Run with production env vars
docker run -d \
  --name saas-app \
  --restart unless-stopped \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@db.example.com:5432/prod" \
  -e NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  -e NEXTAUTH_URL="https://yourapp.com" \
  -e NODE_ENV="production" \
  saas-app:1.0.0
```

### Docker Compose Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: saas-app:1.0.0
    restart: always
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: ${DATABASE_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      NODE_ENV: production
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ['CMD', 'node', '-e', 'require("http").get("http://localhost:3000/api/health")']
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
      POSTGRES_DB: saas_app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    secrets:
      - db_password
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
    driver: local

secrets:
  db_password:
    external: true
```

### Deployment Platforms

#### AWS ECS/Fargate

```bash
# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <ecr-url>
docker push <ecr-url>/saas-app:latest

# Deploy with ECS CLI
ecs-cli compose up
```

#### Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/<project>/saas-app

# Deploy
gcloud run deploy saas-app \
  --image gcr.io/<project>/saas-app \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=$DATABASE_URL
```

#### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: saas-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: saas-app
  template:
    metadata:
      labels:
        app: saas-app
    spec:
      containers:
      - name: app
        image: saas-app:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: nextauth-secret
```

---

## Performance Optimization

### Build Cache

Use BuildKit for faster builds:

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Build with cache mount
docker build --target runner -t saas-app:latest .
```

### Image Size Reduction

Current optimizations:
- ✅ Multi-stage build
- ✅ Alpine Linux base image
- ✅ Standalone Next.js output
- ✅ Only production dependencies
- ✅ Non-root user

### Resource Limits

```yaml
# docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## Security Best Practices

### ✅ Implemented

- Non-root user in container
- Alpine Linux (minimal attack surface)
- No secrets in Dockerfile
- Health checks enabled
- Database SSL/TLS (in production)

### Recommended

- Use Docker secrets for sensitive data
- Scan images for vulnerabilities:
  ```bash
  docker scan saas-app:latest
  ```
- Keep base images updated
- Use specific image tags (not `latest`)
- Enable read-only root filesystem:
  ```yaml
  security_opt:
    - no-new-privileges:true
  read_only: true
  ```

---

## Monitoring

### View Container Stats

```bash
# Real-time stats
docker compose stats

# Detailed container info
docker compose inspect app

# Process list
docker compose top
```

### Export Logs

```bash
# Export to file
docker compose logs > app-logs.txt

# Export with timestamps
docker compose logs --timestamps > app-logs-$(date +%Y%m%d).txt
```

### Health Check Monitoring

```bash
# Check health status
docker compose ps

# Watch health in real-time
watch -n 1 'docker compose ps'
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

---

## Need Help?

- Check the main [README.md](../README.md) for general setup
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Review [Troubleshooting](#troubleshooting) section above
- Open an issue in the repository
