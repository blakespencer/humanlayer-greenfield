# Scaffold Templates

This directory contains templates and initialization instructions for scaffolding greenfield MVP projects with various tech stacks.

## Directory Structure

```
scaffold-templates/
├── nextjs/              # Next.js 15 + TypeScript templates
├── vite-react/          # Vite + React 19 templates
├── nestjs/              # NestJS 11 templates
├── go-gin/              # Go + Gin framework templates
├── python-fastapi/      # Python + FastAPI templates
├── rust-axum/           # Rust + Axum framework templates
└── common/              # Shared templates across stacks
    ├── docker/          # Docker configurations
    ├── cicd/            # CI/CD pipeline templates
    └── docs/            # Documentation templates
```

## Usage

The `greenfield-scaffolder` agent uses these templates to initialize new projects based on the selected tech stack.

### Scaffolding Process

1. **Determine tech stack** from user selections or `/select_tech_stack` command
2. **Use initialization commands** from the appropriate subdirectory
3. **Apply common templates** for Docker, CI/CD, and documentation
4. **Customize** based on project-specific requirements

### Initialization Commands

Each subdirectory contains:
- `README.md` - Setup instructions and initialization commands
- Template files and configuration examples
- Best practices and recommendations

## Tech Stack Coverage

### Frontend Frameworks
- ✅ Next.js 15 + TypeScript (SSR/SSG, full-stack)
- ✅ Vite + React 19 + TypeScript (SPA, fast builds)

### Backend Frameworks

#### TypeScript/Node.js
- ✅ NestJS 11 (enterprise, modular)
- 📝 Express (minimal - use directly, no template needed)
- 📝 Fastify (high performance - use directly, no template needed)

#### Go
- ✅ Gin (fast, minimalist)
- 📝 Fiber (Express-like - similar to Gin template)
- 📝 Echo (high performance - similar to Gin template)

#### Python
- ✅ FastAPI (modern, fast, async)
- 📝 Django (batteries included - use django-admin)
- 📝 Flask (minimal - use directly)

#### Rust
- ✅ Axum (Tokio-native, modern)
- 📝 Rocket (beginner-friendly - use cargo-generate)
- 📝 Actix-web (fastest - similar to Axum template)

### Common Templates
- ✅ Docker configurations (docker-compose.yml)
- ✅ CI/CD pipelines (GitHub Actions, GitLab CI)
- ✅ Documentation (README, CONTRIBUTING, API docs)
- ✅ Environment setup (.env templates)

## Quick Start Examples

### Full-stack TypeScript (Next.js + NestJS)
```bash
# Frontend
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Backend
cd backend
npm i -g @nestjs/cli
nest new . --package-manager npm --strict

# Database
docker compose up -d postgres
```

### React SPA + Go API (Vite + Gin)
```bash
# Frontend
cd frontend
npm create vite@latest . -- --template react-ts

# Backend
cd backend
go mod init project-name
mkdir -p cmd/api pkg/handlers internal/models

# Database
docker compose up -d postgres
```

### Python ML/AI App (Vite + FastAPI)
```bash
# Frontend
cd frontend
npm create vite@latest . -- --template react-ts

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn sqlalchemy alembic pytest

# Database
docker compose up -d postgres
```

## Standard Project Structure

All scaffolded projects follow this structure:

```
project-name/
├── frontend/              # React-based frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/               # API backend
│   ├── src/              # (or cmd/ for Go, app/ for Python)
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── main.[ts|go|py|rs]
│   ├── tests/
│   └── [language-specific config]
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema/
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## Best Practices

### 1. Always Include
- ✅ TypeScript for type safety (all TS projects)
- ✅ Testing setup (Jest/Vitest/Pytest/Go test)
- ✅ Linting and formatting (ESLint, Prettier, Ruff, rustfmt)
- ✅ Environment variable management
- ✅ Docker for local development
- ✅ CI/CD pipeline templates

### 2. Configuration Management
- Use `.env` files for environment-specific config
- Never commit secrets or API keys
- Provide `.env.example` template
- Document all required environment variables

### 3. Development Workflow
- Hot reload enabled in dev mode
- Fast feedback loops (type checking, linting)
- Easy database reset/seeding
- Clear README with setup instructions

### 4. Production Ready
- Health check endpoints
- Graceful shutdown handling
- Proper error handling and logging
- Security headers and CORS configuration
- Rate limiting for APIs

## Customization

Templates should be customized based on:

1. **Project Scale**
   - Small MVP: Minimal structure
   - Enterprise: Full modular structure

2. **Team Size**
   - Solo/small: Simpler setup
   - Large team: More structure, conventions

3. **Deployment Target**
   - Serverless: No Docker needed
   - Containers: Include Dockerfiles
   - Traditional: Standard deployment

4. **Database Choice**
   - SQL: Include migration tools
   - NoSQL: Include ODM setup
   - Managed: Connection strings only

## Testing Strategy

Each template includes:
- Unit test setup and examples
- Integration test patterns
- E2E test configuration
- Test coverage reporting
- CI/CD test automation

## Documentation

Each scaffolded project includes:

### README.md
- Project overview
- Setup instructions
- Development commands
- Environment variables
- Deployment guide

### CONTRIBUTING.md
- Code style guidelines
- Commit message format
- Branch naming conventions
- PR process
- Testing requirements

### API Documentation
- OpenAPI/Swagger specs (REST APIs)
- GraphQL schema (GraphQL APIs)
- Endpoint descriptions
- Request/response examples

## Updates and Maintenance

Templates should be updated when:
- Framework versions receive major updates
- Best practices change
- New tools become standard
- Security vulnerabilities are discovered

Check for updates quarterly or when starting new projects.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [Gin Documentation](https://gin-gonic.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Axum Documentation](https://docs.rs/axum)

## Contributing

When adding new templates:
1. Follow the existing directory structure
2. Include comprehensive README
3. Provide working example
4. Document all dependencies
5. Test initialization commands
6. Update this main README
