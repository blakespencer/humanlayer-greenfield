# Common Templates

Shared templates and configurations that work across all tech stacks.

## Contents

- `docker/` - Docker configurations
- `cicd/` - CI/CD pipeline templates
- `docs/` - Documentation templates

---

## Docker Templates

### docker-compose.yml (Full-stack)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:4000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### .dockerignore

```
node_modules
npm-debug.log
dist
build
.git
.env
.env.local
*.log
coverage
.DS_Store
```

---

## CI/CD Templates

### GitHub Actions - Test and Deploy

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run linter
        working-directory: ./frontend
        run: npm run lint

      - name: Run tests
        working-directory: ./frontend
        run: npm test

      - name: Build
        working-directory: ./frontend
        run: npm run build

  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      # TypeScript/Node.js Backend
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run tests
        working-directory: ./backend
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:password@localhost:5432/test_db

      # Go Backend (alternative)
      # - name: Setup Go
      #   uses: actions/setup-go@v5
      #   with:
      #     go-version: '1.21'

      # - name: Run tests
      #   working-directory: ./backend
      #   run: go test ./...

      # Python Backend (alternative)
      # - name: Setup Python
      #   uses: actions/setup-python@v5
      #   with:
      #     python-version: '3.11'

      # - name: Install dependencies
      #   working-directory: ./backend
      #   run: |
      #     pip install -r requirements.txt

      # - name: Run tests
      #   working-directory: ./backend
      #   run: pytest
```

### GitHub Actions - Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        run: |
          # Add your deployment script here
          echo "Deploying to production"
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2

test:frontend:
  stage: test
  image: node:20
  script:
    - cd frontend
    - npm ci
    - npm run lint
    - npm test
    - npm run build

test:backend:
  stage: test
  image: node:20  # or golang:1.21, python:3.11
  services:
    - postgres:16
  variables:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: password
    POSTGRES_DB: test_db
    DATABASE_URL: postgresql://postgres:password@postgres:5432/test_db
  script:
    - cd backend
    - npm ci
    - npm test

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t myapp:$CI_COMMIT_SHORT_SHA .
  only:
    - main

deploy:production:
  stage: deploy
  script:
    - echo "Deploy to production"
  only:
    - main
  when: manual
```

---

## Documentation Templates

### README.md

```markdown
# Project Name

Brief description of what this project does.

## Features

- ✅ Feature 1
- ✅ Feature 2
- ✅ Feature 3

## Tech Stack

### Frontend
- React 19
- [Next.js 15 / Vite]
- TypeScript
- Tailwind CSS

### Backend
- [TypeScript/Go/Python/Rust]
- [NestJS/Gin/FastAPI/Axum]
- PostgreSQL
- Redis

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- [Language-specific requirements]

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/username/project-name.git
cd project-name
\`\`\`

### 2. Set up environment variables

\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### 3. Start with Docker Compose

\`\`\`bash
docker compose up -d
\`\`\`

Or run services individually:

#### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

#### Backend
\`\`\`bash
cd backend
npm install  # or go mod download, pip install -r requirements.txt
npm run dev
\`\`\`

### 4. Access the application

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/docs

## Development

### Project Structure

\`\`\`
project-name/
├── frontend/          # React frontend
├── backend/           # API backend
├── docker-compose.yml
└── README.md
\`\`\`

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter

#### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter

## Testing

\`\`\`bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
\`\`\`

## Deployment

### Production Build

\`\`\`bash
docker compose -f docker-compose.prod.yml up -d
\`\`\`

### Environment Variables

See `.env.example` for required environment variables.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

[License Type] - see LICENSE file for details
```

### CONTRIBUTING.md

```markdown
# Contributing Guidelines

Thank you for considering contributing to this project!

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

See [README.md](README.md) for setup instructions.

## Coding Standards

### General
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow the existing code style

### TypeScript/JavaScript
- Use TypeScript strict mode
- Use ESLint and Prettier
- Write tests for new features
- Avoid `any` types

### Go
- Follow Go idioms
- Run `go fmt` before committing
- Write table-driven tests
- Document exported functions

### Python
- Follow PEP 8 style guide
- Use type hints
- Run `black` and `ruff` for formatting
- Write docstrings

### Rust
- Use `rustfmt` for formatting
- Use `clippy` for linting
- Write documentation comments
- Handle errors properly

## Commit Messages

Follow conventional commits format:

\`\`\`
type(scope): description

[optional body]

[optional footer]
\`\`\`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/config changes

Examples:
\`\`\`
feat(auth): add JWT authentication
fix(api): handle null user in getUserById
docs(readme): update installation instructions
\`\`\`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Testing Requirements

- All new features must have tests
- Maintain >80% code coverage
- All tests must pass before merging

## Questions?

Feel free to open an issue for any questions!
```

### API_DOCUMENTATION.md Template

```markdown
# API Documentation

Base URL: `http://localhost:4000/api/v1`

## Authentication

Most endpoints require authentication via JWT token.

Include token in header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Users

#### Create User
- **POST** `/users`
- **Body**:
  \`\`\`json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  \`\`\`
- **Response**: `201 Created`
  \`\`\`json
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  }
  \`\`\`

#### Get All Users
- **GET** `/users`
- **Query Params**: `page`, `limit`
- **Response**: `200 OK`
  \`\`\`json
  {
    "data": [...],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
  \`\`\`

## Error Responses

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {...}
  }
}
\`\`\`

### Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
```

---

## Usage

These common templates should be copied to the root of your project and customized for your specific tech stack and requirements.

### Applying Templates

```bash
# Copy Docker configuration
cp .claude/utils/scaffold-templates/common/docker/docker-compose.yml .

# Copy CI/CD workflow
cp .claude/utils/scaffold-templates/common/cicd/github-actions-test.yml .github/workflows/test.yml

# Copy documentation
cp .claude/utils/scaffold-templates/common/docs/README.md .
cp .claude/utils/scaffold-templates/common/docs/CONTRIBUTING.md .
```

### Customization Checklist

- [ ] Update project name and description
- [ ] Configure environment variables
- [ ] Adjust ports if needed
- [ ] Add/remove services (Redis, MongoDB, etc.)
- [ ] Customize CI/CD for your tech stack
- [ ] Update documentation with actual API endpoints
- [ ] Add project-specific sections to README
