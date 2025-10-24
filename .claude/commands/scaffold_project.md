---
description: Generate initial project structure and boilerplate
model: opus
---

# Project Scaffolding

You are tasked with generating the initial project structure and boilerplate code for greenfield MVPs, customized for the selected tech stack and ready for immediate development.

## Initial Response

When this command is invoked:

1. **Check if tech stack decisions are available**:
   - Look for tech stack decision document in `thoughts/shared/decisions/`
   - If found, read it immediately and completely
   - If not found, ask user to provide tech stack details or run `/select_tech_stack` first

2. **Check if architecture is defined**:
   - Look for architecture document in `thoughts/shared/architecture/`
   - If found, read it to understand component structure
   - If not found, you can still proceed with basic scaffolding

3. **If prerequisites are met**, respond with:
```
I'll generate the initial project structure for your greenfield MVP. Based on your tech stack:

- Frontend: [Framework]
- Backend: [Language + Framework]
- Database: [Database + ORM]

I'll create:
1. Directory structure
2. Configuration files (TypeScript, ESLint, etc.)
3. Docker setup for local development
4. CI/CD templates
5. Initial boilerplate code
6. Testing setup
7. Documentation templates

Where should I create this project structure? (Provide an absolute path, or I'll create it in the current directory)
```

4. **If prerequisites are missing**, respond with:
```
To scaffold the project effectively, I need tech stack decisions.

Please either:
1. Run /select_tech_stack first to make tech decisions
2. Or provide the tech stack details now:
   - Frontend framework
   - Backend language and framework
   - Database and ORM

Then I can proceed with scaffolding.
```

## Process Steps

### Step 1: Analyze Tech Stack and Requirements

1. **Read all prerequisite documents**:
   - Tech stack decision document
   - Architecture document (if available)
   - Requirements document (if available)

2. **Understand project structure needs**:
   - Monolith vs separate frontend/backend
   - Monorepo vs separate repositories
   - API-only vs full-stack
   - Any special requirements from architecture

3. **Identify scaffolding approach**:
   - Use official CLI tools when available
   - Use templates from `.claude/utils/scaffold-templates/`
   - Combine multiple templates if needed

### Step 2: Use Greenfield Scaffolder Agent

Use **greenfield-scaffolder** agent to create initial structure.

The scaffolder will reference:
- `.claude/utils/scaffold-templates/nextjs/` - Next.js 15 setup
- `.claude/utils/scaffold-templates/vite-react/` - Vite + React 19 setup
- `.claude/utils/scaffold-templates/nestjs/` - NestJS 11 setup
- `.claude/utils/scaffold-templates/go-gin/` - Go + Gin setup
- `.claude/utils/scaffold-templates/python-fastapi/` - FastAPI setup
- `.claude/utils/scaffold-templates/rust-axum/` - Rust + Axum setup
- `.claude/utils/scaffold-templates/common/` - Docker, CI/CD, docs templates

### Step 3: Initialize Project Structure

Based on tech stack, initialize using official tools:

#### Next.js 15
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

#### Vite + React 19
```bash
npm create vite@latest . -- --template react-ts
```

#### NestJS 11
```bash
npm i -g @nestjs/cli
nest new . --package-manager npm --strict
```

#### Go + Gin
```bash
go mod init [project-name]
mkdir -p cmd/api pkg/handlers internal/models
```

#### Python + FastAPI
```bash
python -m venv venv
pip install fastapi uvicorn sqlalchemy alembic pytest
```

#### Rust + Axum
```bash
cargo init
# Add dependencies to Cargo.toml
```

Use **Bash** tool to execute initialization commands.

### Step 4: Create Directory Structure

Generate appropriate directory structure based on architecture:

#### Full-Stack Monorepo Structure
```
project-name/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # Reusable components
│   │   ├── lib/          # Utilities
│   │   └── types/        # TypeScript types
│   ├── public/           # Static assets
│   ├── tests/            # Frontend tests
│   └── package.json
│
├── backend/              # API backend
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   ├── common/       # Shared code
│   │   ├── config/       # Configuration
│   │   └── main.ts       # Entry point
│   ├── tests/            # Backend tests
│   └── package.json
│
├── database/
│   ├── migrations/       # Schema migrations
│   ├── seeds/            # Seed data
│   └── schema.prisma     # Prisma schema (if using Prisma)
│
├── .github/
│   └── workflows/
│       ├── test.yml      # CI testing
│       └── deploy.yml    # CD deployment
│
├── docker-compose.yml    # Local development services
├── .env.example          # Environment variables template
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

#### API-Only Structure
```
api-name/
├── src/
│   ├── handlers/         # HTTP handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── middleware/       # HTTP middleware
│   └── main.[ts|go|py|rs] # Entry point
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── config/               # Configuration files
├── docs/                 # API documentation
├── Dockerfile
├── docker-compose.yml
└── README.md
```

Use **Bash** tool with `mkdir -p` to create directory structure.

### Step 5: Generate Configuration Files

Create all necessary configuration files:

#### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

#### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true
}
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

Reference `.claude/utils/scaffold-templates/common/` for:
- `.dockerignore`
- `.gitignore`
- CI/CD templates
- Documentation templates

Use **Write** tool to create configuration files.

### Step 6: Set Up Docker Environment

Create Docker configuration for local development:

#### docker-compose.yml
Reference `.claude/utils/scaffold-templates/common/README.md` for secure docker-compose template.

Customize for chosen tech stack:
- Add frontend service (if applicable)
- Add backend service
- Add database service (PostgreSQL, MongoDB, etc.)
- Add Redis (if needed)
- Configure environment variables (no hardcoded passwords!)
- Add health checks
- Configure volumes for persistence

#### Dockerfile for Backend
Create appropriate Dockerfile based on language:

**Node.js/TypeScript**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 4000
CMD ["node", "dist/main.js"]
```

**Go**:
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN go build -o main cmd/api/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

Reference scaffold templates for Python and Rust Dockerfiles.

#### .env.example
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379

# API
API_PORT=4000
API_SECRET=your-secret-key-here

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Step 7: Create Initial Boilerplate Code

Generate starter code for immediate development:

#### Backend API Boilerplate

**Example structure**:
```typescript
// src/main.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API routes
app.use('/api/v1', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

Create minimal working endpoints:
- Health check endpoint
- Example CRUD endpoints
- Authentication endpoints (basic structure)

#### Frontend Boilerplate

**Example structure**:
```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Welcome to [Project Name]</h1>
      <p className="mt-4">Your greenfield MVP is ready to build!</p>
    </main>
  );
}
```

Create basic pages:
- Home page
- About page
- Example feature page

#### Database Setup

**Prisma Schema Example**:
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Create initial migration:
```bash
npx prisma migrate dev --name init
```

### Step 8: Set Up Testing Infrastructure

Configure testing based on tech stack:

#### TypeScript - Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

```typescript
// tests/example.test.ts
import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
```

#### Go Testing
```go
// pkg/handlers/health_test.go
package handlers

import (
    "testing"
)

func TestHealthCheck(t *testing.T) {
    // Test implementation
}
```

Reference scaffold templates for Python (Pytest) and Rust (built-in tests) setup.

### Step 9: Set Up CI/CD Pipeline

Create CI/CD configuration using templates from `.claude/utils/scaffold-templates/common/`:

#### GitHub Actions
Create `.github/workflows/test.yml` and `.github/workflows/deploy.yml`

Reference the common templates and customize for your tech stack:
- Install dependencies for chosen language
- Run linting
- Run tests with coverage
- Build the application
- Deploy (if on main branch)

#### GitLab CI
Create `.gitlab-ci.yml` if using GitLab

Reference common templates for structure.

### Step 10: Create Documentation

Generate essential documentation files:

#### README.md
Use template from `.claude/utils/scaffold-templates/common/README.md`

Customize with:
- Project name and description
- Tech stack details
- Setup instructions
- Development commands
- Deployment instructions

#### CONTRIBUTING.md
Use template from `.claude/utils/scaffold-templates/common/CONTRIBUTING.md`

Customize with:
- Coding standards for chosen languages
- Commit message format
- PR process
- Testing requirements

#### API_DOCUMENTATION.md
Use template from `.claude/utils/scaffold-templates/common/README.md`

Customize with:
- Actual API endpoints
- Request/response examples
- Authentication details

### Step 11: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial project scaffolding

- Set up [frontend framework] frontend
- Set up [backend framework] backend
- Configure [database] database
- Add Docker development environment
- Add CI/CD pipeline
- Add testing infrastructure
- Add documentation"
```

### Step 12: Verify Setup

Run verification commands:

```bash
# Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Run linting
npm run lint

# Run tests
npm test

# Start development environment
docker compose up -d

# Verify services are running
docker compose ps

# Check health endpoint
curl http://localhost:4000/health
```

Report any issues and fix before completing.

## Tools to Use

- **greenfield-scaffolder**: Generate project structure based on tech stack
- **Bash**: Execute initialization commands, create directories, run verification
- **Write**: Create configuration files, boilerplate code, documentation
- **Read**: Read scaffold templates and tech stack decisions

## Important Guidelines

1. **Use Official Tools**: Prefer official CLI tools (create-next-app, nest new, etc.) over manual setup

2. **Reference Templates**: Use scaffold templates from `.claude/utils/scaffold-templates/` extensively

3. **Security First**:
   - No hardcoded passwords in docker-compose.yml
   - Use .env files for secrets
   - Add .env to .gitignore
   - Create .env.example with dummy values

4. **Ready to Run**: Generated project should work immediately with `docker compose up`

5. **Testing Included**: Include test setup and at least one example test

6. **Documentation Complete**: README should have all setup instructions

7. **CI/CD Ready**: Include working CI/CD configuration

8. **Best Practices**: Follow language-specific best practices and idioms

9. **Minimal but Complete**: Include only what's needed for MVP, but make it production-ready

10. **Verify Everything**: Run verification commands to ensure setup works

## Output Structure

The scaffolding process creates:

1. **Directory Structure**: Complete project file tree
2. **Configuration Files**: All necessary config files (.tsconfig, .eslintrc, etc.)
3. **Docker Setup**: docker-compose.yml and Dockerfiles
4. **CI/CD Templates**: GitHub Actions or GitLab CI configuration
5. **Boilerplate Code**: Minimal working application
6. **Testing Setup**: Test configuration and example tests
7. **Documentation**: README, CONTRIBUTING, API docs
8. **Git Repository**: Initialized with initial commit

## Success Criteria

- [ ] Project initializes with official CLI tools successfully
- [ ] Directory structure matches architecture decisions
- [ ] All configuration files created and valid
- [ ] Docker setup works with `docker compose up`
- [ ] Environment variables configured securely (no hardcoded secrets)
- [ ] Health check endpoint responds successfully
- [ ] Frontend serves and loads (if applicable)
- [ ] Backend API responds to requests
- [ ] Database connects and migrations run
- [ ] Tests run successfully
- [ ] Linting passes
- [ ] CI/CD configuration is valid
- [ ] Documentation is complete and accurate
- [ ] Git repository initialized with clean initial commit
- [ ] Developer can clone and run with minimal setup

## Example Final Message

```
✅ Project scaffolding complete!

Generated structure:
- Frontend: Next.js 15 with TypeScript and Tailwind
- Backend: NestJS 11 with Prisma and PostgreSQL
- Docker: Full development environment
- CI/CD: GitHub Actions configured
- Testing: Vitest + Playwright setup

To start development:
1. Copy .env.example to .env and fill in values
2. Run: docker compose up -d
3. Run: npm install (in both frontend/ and backend/)
4. Run: npm run dev

The application is now running:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- API Docs: http://localhost:4000/api

Next steps:
- Review the architecture in thoughts/shared/architecture/
- Start implementing features from requirements
- Run tests with: npm test
- Deploy with: git push (CI/CD will handle it)

Happy coding! 🚀
```
