# 🚀 Greenfield Project Living Document

**Project**: [PROJECT_NAME]
**Started**: [DATE]
**Current Phase**: [PHASE]
**Tech Stack**: [STACK]
**Last Updated**: [TIMESTAMP]

---

## 🎯 Quick Start for Next Agent

### **Context Window Management**
- **CRITICAL**: Monitor your context window usage!
- **Handoff at 40%** (ideally), NEVER exceed 60%
- **Check periodically**: Your context should not be over 60%
- **When handing off**: Update this document with detailed status

### **Immediate Next Steps**
1. [ ] [Current task in progress]
2. [ ] [Next priority task]
3. [ ] [Following task]

### **Blockers/Decisions Needed**
- [ ] [Any blockers or pending decisions]

---

## 📁 Project Structure

```
project-root/
├── frontend/                 # React frontend (Next.js/Remix/Vite)
│   ├── src/
│   │   ├── components/      # Shared React components
│   │   ├── pages/          # Page components (Next.js) or routes (Remix)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and helpers
│   │   ├── styles/         # Global styles and themes
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                 # API backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types (if TS)
│   ├── tests/              # Backend tests
│   └── package.json        # or go.mod, requirements.txt, Cargo.toml
│
├── shared/                  # Shared between frontend/backend
│   ├── types/              # Shared type definitions
│   └── constants/          # Shared constants
│
├── database/               # Database related files
│   ├── migrations/         # Database migrations
│   ├── seeds/              # Seed data
│   └── schema/             # Schema definitions
│
├── infrastructure/         # IaC and deployment
│   ├── docker/            # Docker configurations
│   ├── kubernetes/        # K8s manifests (if applicable)
│   └── terraform/         # Terraform configs (if applicable)
│
├── docs/                   # Documentation
│   ├── api/               # API documentation
│   ├── architecture/      # Architecture decisions
│   └── setup/             # Setup guides
│
└── .github/               # GitHub specific
    └── workflows/         # CI/CD pipelines
```

---

## 🏗️ Architecture Overview

### **Frontend Architecture**
- **Framework**: [Next.js/Remix/Vite+React]
- **State Management**: [Redux/Zustand/Context]
- **Styling**: [Tailwind/CSS Modules/Styled Components]
- **Data Fetching**: [SWR/React Query/RTK Query]

### **Backend Architecture**
- **Language**: [TypeScript/Go/Python/Rust]
- **Framework**: [Express/NestJS/Gin/FastAPI/Axum]
- **API Style**: [REST/GraphQL/gRPC]
- **Authentication**: [JWT/OAuth/Session]

### **Database Architecture**
- **Primary DB**: [PostgreSQL/MongoDB/DynamoDB]
- **Caching**: [Redis/Memcached]
- **ORM/ODM**: [Prisma/TypeORM/GORM/SQLAlchemy]

### **Infrastructure**
- **Hosting**: [Vercel/AWS/Railway/Fly.io]
- **CI/CD**: [GitHub Actions/GitLab CI]
- **Monitoring**: [Datadog/New Relic/Sentry]

---

## 📊 Data Models

### **Core Entities**

```typescript
// Example User Model
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// Add more models as they're created
```

### **Database Schema**
```sql
-- Example PostgreSQL schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add more tables as created
```

---

## 🔌 API Endpoints

### **Implemented Endpoints**
- `GET /api/health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- [Add endpoints as implemented]

### **Planned Endpoints**
- [ ] `GET /api/users` - List users
- [ ] `PUT /api/users/:id` - Update user
- [ ] [Add planned endpoints]

---

## 🧪 Testing Strategy

### **Test Coverage**
- Frontend: [X]% coverage
- Backend: [X]% coverage
- E2E: [Number] scenarios

### **Test Files**
- Unit tests: `*.test.ts` or `*_test.go`
- Integration: `*.integration.test.ts`
- E2E: `/e2e/*.spec.ts`

---

## 📝 Development Log

### **[DATE] - Session 1**
**Agent**: [Agent Name]
**Context Used**: [X]%
**Completed**:
- ✅ Initial project setup
- ✅ Selected tech stack: [Stack details]
- ✅ Created project structure

**Notes**: [Any important decisions or context]

### **[DATE] - Session 2**
**Agent**: [Agent Name]
**Context Used**: [X]%
**Completed**:
- ✅ [Tasks completed]

**In Progress**:
- 🔄 [Current task status]

**Handoff Notes**: [Specific context for next agent]

---

## 🔄 Handoff Procedure

### **Before Handoff**
1. Update "Immediate Next Steps" section
2. Document any pending decisions in "Blockers"
3. Commit all code changes with clear messages
4. Update architecture section if changed
5. Add session entry to Development Log

### **After Pickup**
1. Read entire living document
2. Check git status and recent commits
3. Review "Immediate Next Steps"
4. Verify project still builds/runs
5. Continue from documented point

---

## 🚨 Important Conventions

### **File Naming**
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Types: PascalCase with .types.ts
- Tests: [name].test.ts or [name]_test.go

### **Git Commit Format**
```
type(scope): description

- feat: New feature
- fix: Bug fix
- docs: Documentation
- refactor: Code refactoring
- test: Test updates
- chore: Build/config updates
```

### **Code Organization Rules**
1. **Frontend Components**: One component per file
2. **API Routes**: Group by resource (users, posts, etc.)
3. **Services**: Single responsibility principle
4. **Types**: Shared types in /shared/types
5. **Constants**: Environment-agnostic in /shared/constants

---

## 🔗 Important Links

- **Repository**: [GitHub/GitLab URL]
- **Deployment**: [Production URL]
- **Staging**: [Staging URL]
- **CI/CD**: [Pipeline URL]
- **Documentation**: [Docs URL]
- **Design System**: [Figma/Storybook URL]

---

## 📋 Environment Variables

### **Required Variables**
```bash
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Auth
JWT_SECRET=...
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...

# External Services
API_KEY=...
STRIPE_KEY=...

# Add more as needed
```

---

## 🎯 MVP Milestones

- [ ] **Milestone 1**: Basic authentication working
- [ ] **Milestone 2**: Core CRUD operations
- [ ] **Milestone 3**: [Define based on project]
- [ ] **Milestone 4**: [Define based on project]
- [ ] **MVP Complete**: [Target date]

---

## 📌 Notes for Future Sessions

- [Any important context that doesn't fit elsewhere]
- [Design decisions that need documentation]
- [Technical debt to address]
- [Performance optimizations needed]