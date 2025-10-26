# 🚀 Getting Started - Building Your MVP with HumanLayer Greenfield Toolkit

**Welcome!** This guide will walk you through creating a complete MVP from scratch using the HumanLayer Greenfield Transformation System.

---

## 📋 Table of Contents

- [What is This Toolkit?](#what-is-this-toolkit)
- [Prerequisites](#prerequisites)
- [Quick Start (5 minutes)](#quick-start-5-minutes)
- [Complete Workflow (Step-by-Step)](#complete-workflow-step-by-step)
- [Understanding the Toolkit](#understanding-the-toolkit)
- [Reference Examples](#reference-examples)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🎯 What is This Toolkit?

The **HumanLayer Greenfield Transformation System** is an AI-powered toolkit that helps you build production-ready MVPs from scratch through a guided, structured workflow.

### What You Get

✅ **AI-Guided Workflow**: Step-by-step guidance from requirements to deployment
✅ **Best Practices Built-In**: Production-ready patterns and standards
✅ **Reference Examples**: Complete, working applications you can learn from
✅ **Automated Setup**: One command to initialize your entire project structure
✅ **Multi-Language Support**: TypeScript, Go, Python examples included

### What Makes This Different?

Traditional approach:
1. ❌ Manually create directories
2. ❌ Google for best practices
3. ❌ Copy-paste random examples
4. ❌ Miss critical setup steps
5. ❌ Spend 30-60 minutes setting up

**Greenfield Toolkit approach:**
1. ✅ Run `/init_mvp` command
2. ✅ Answer a few questions
3. ✅ AI guides you through requirements, tech stack, architecture
4. ✅ Get a complete implementation plan
5. ✅ Start building in 5 minutes

---

## 🔧 Prerequisites

### Required

- **Claude Code** - You're already using it! 🎉
- **Git** - For version control
- **Basic understanding** of your chosen tech stack

### Optional (depending on your stack)

- **Node.js 18+** - For TypeScript/JavaScript projects
- **Go 1.21+** - For Go projects
- **Python 3.11+** - For Python projects
- **Docker** - For containerized deployment
- **PostgreSQL** - For database projects

---

## ⚡ Quick Start (5 minutes)

The fastest way to get started is using the automated `/init_mvp` command:

### Step 1: Initialize Your Project

In Claude Code, run:

```
/init_mvp
```

### Step 2: Answer Project Questions

The AI will ask you:

1. **Project Name**: e.g., `task-tracker`, `fitness-app`, `blog-platform`
2. **Location**: Where to create the project (recommended: `~/projects/[name]`)
3. **Run Workflow**: Whether to run the complete guided workflow automatically

### Step 3: Follow the Workflow

If you chose "Yes" to run the workflow, the AI will automatically guide you through:

1. **Requirements Gathering** (`/gather_requirements`)
   - Define your product vision
   - Identify target users
   - List core features
   - Document requirements

2. **Tech Stack Selection** (`/select_tech_stack`)
   - Choose frontend framework
   - Choose backend language/framework
   - Choose database
   - Document decisions with trade-offs

3. **Architecture Design** (`/design_architecture`)
   - Design system architecture
   - Create component diagrams
   - Define data flows
   - Document architecture

4. **Implementation Planning** (`/create_greenfield_plan`)
   - Create phased implementation plan
   - Break down into manageable tasks
   - Define success criteria
   - Get ready to build!

### Step 4: Start Building

After the workflow completes, you'll have:

✅ Complete project structure
✅ Requirements documented
✅ Tech stack selected with justification
✅ Architecture designed
✅ Implementation plan ready
✅ All necessary directories created
✅ Git repository initialized

**Time to start coding!** 🎉

---

## 📚 Complete Workflow (Step-by-Step)

### Understanding Toolkit vs Project Separation

**Important Concept**: The toolkit lives in one place, your projects live elsewhere.

```
📁 humanlayer-greenfield/          ← The Toolkit (this repo)
   ├── .claude/                     ← AI agents & commands
   ├── thoughts/                    ← Toolkit documentation
   └── docs/                        ← Toolkit guides

📁 ~/projects/your-mvp/             ← Your Project
   ├── .claude/                     ← Copy of toolkit (via /init_mvp)
   ├── thoughts/                    ← YOUR project docs
   ├── src/                         ← YOUR code
   └── tests/                       ← YOUR tests
```

**Key Point**: Never build your MVP inside the toolkit repo! Use `/init_mvp` to create a separate project.

---

### Phase 1: Project Initialization (5 minutes)

#### Option A: Automated Initialization (Recommended)

```bash
# In Claude Code
/init_mvp
```

Follow the prompts to:
1. Name your project
2. Choose location
3. Optionally run full workflow

#### Option B: Manual Initialization

If you prefer manual control:

```bash
# Create project directory
mkdir -p ~/projects/your-mvp
cd ~/projects/your-mvp

# Initialize git
git init

# Create directory structure
mkdir -p thoughts/shared/{plans,projects,knowledge,templates}
mkdir -p thoughts/decisions
mkdir -p docs src tests

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/
vendor/

# Build outputs
dist/
build/
.next/
out/
target/
bin/

# Environment
.env
.env.*
!.env.example

# IDE
.vscode/
.idea/
*.swp
.DS_Store

# Testing
coverage/
test-results/
playwright-report/
*.log

# Personal notes
thoughts/
EOF

# Initial commit
git add .
git commit -m "chore: initialize project structure"
```

---

### Phase 2: Requirements Gathering (15-30 minutes)

**Goal**: Document what you're building and why.

#### Run the Command

```bash
/gather_requirements
```

#### What the AI Will Ask

1. **Product Vision**
   - What problem does this solve?
   - Who is the target user?
   - What's the core value proposition?

2. **Core Features**
   - What are the must-have features for MVP?
   - What can wait for version 2?
   - What defines success?

3. **Constraints**
   - Timeline
   - Budget
   - Team size/skills
   - Technical requirements

#### Output

The AI creates: `thoughts/shared/projects/[name]-requirements.md`

This document includes:
- Product vision statement
- Target user personas
- Core features list (prioritized)
- Success criteria
- Constraints and assumptions

**Example Output Structure:**
```markdown
# Task Tracker - Requirements

## Vision
A simple, fast task management app for solo developers and small teams.

## Target Users
- Solo developers managing personal projects
- Small teams (2-5 people) needing basic task tracking

## Core Features (MVP)
1. User authentication (email/password)
2. Create/edit/delete tasks
3. Mark tasks as complete
4. Filter by status
5. Basic search

## Success Criteria
- Users can sign up and start tracking tasks in < 2 minutes
- 100ms task creation/update response time
- Mobile-responsive design

## Constraints
- Launch in 4 weeks
- Solo developer
- Budget: $50/month for hosting
```

---

### Phase 3: Tech Stack Selection (20-40 minutes)

**Goal**: Choose the right technologies with clear trade-offs.

#### Run the Command

```bash
/select_tech_stack
```

#### What the AI Will Do

The AI will guide you through selecting:

1. **Frontend Framework**
   - Next.js (Full-stack React with SSR)
   - Remix (Nested routing, progressive enhancement)
   - Vite + React (Fast SPA)

   For each option, you'll see:
   - ✅ Pros
   - ❌ Cons
   - 🎯 Best for
   - ⚠️ Avoid if
   - 📊 Performance metrics

2. **Backend Language**
   - TypeScript (same as frontend, huge ecosystem)
   - Go (high performance, simple deployment)
   - Python (rapid dev, AI/ML libraries)
   - Rust (maximum performance, memory safety)

3. **Backend Framework** (based on language choice)
   - TypeScript: NestJS, Express, Fastify
   - Go: Gin, Fiber, Echo
   - Python: FastAPI, Django, Flask
   - Rust: Axum, Rocket, Actix-web

4. **Database**
   - PostgreSQL (ACID, complex queries, JSON support)
   - MongoDB (flexible schema, horizontal scaling)
   - DynamoDB/Firestore (fully managed, serverless)

5. **Supporting Services** (if needed)
   - Redis (caching)
   - Message queues
   - File storage

#### Output

The AI creates: `thoughts/decisions/tech-stack.md`

This document includes:
- Selected technologies
- Trade-offs for each choice
- Why this stack fits your requirements
- Alternative options considered
- Cost estimates
- Team skill assessment

**Example Output:**
```markdown
# Task Tracker - Tech Stack Decision

## Selected Stack

### Frontend
**Next.js 15**
- ✅ Full-stack React framework
- ✅ Great for SEO (task sharing feature)
- ✅ Vercel deployment (free tier)
- Trade-off: Learning curve vs raw React

### Backend
**Same (Next.js API Routes)**
- ✅ No separate backend needed
- ✅ Shared types between frontend/backend
- ✅ Simpler deployment
- Trade-off: Locked to Node.js ecosystem

### Database
**PostgreSQL 16**
- ✅ ACID compliance (task integrity)
- ✅ JSON support (flexible task metadata)
- ✅ Mature ecosystem
- Trade-off: Need to manage migrations

### ORM
**Prisma**
- ✅ Type-safe queries
- ✅ Automatic migrations
- ✅ Great DX
- Trade-off: Abstraction layer overhead

### Auth
**NextAuth.js**
- ✅ Built for Next.js
- ✅ Multiple providers (email, OAuth)
- ✅ JWT + database sessions
- Trade-off: Less flexibility than custom auth

## Cost Estimate
- Vercel: Free (Hobby plan)
- PostgreSQL: Free (Neon.tech free tier)
- **Total**: $0/month (scales to $20/month at 1000+ users)

## Team Fit
- Solo developer: ✅ Excellent (one language, integrated stack)
- Timeline: ✅ 4 weeks achievable
- Skills: ⚠️ Need to learn Prisma (2-3 days)
```

---

### Phase 4: Architecture Design (30-60 minutes)

**Goal**: Design how your system will work before writing code.

#### Run the Command

```bash
/design_architecture
```

#### What the AI Will Do

The AI will help you design:

1. **System Architecture**
   - High-level component diagram
   - Data flow diagrams
   - API design
   - Database schema

2. **Component Breakdown**
   - Frontend components
   - Backend services
   - Database models
   - External integrations

3. **Data Models**
   - Entity relationships
   - Schema design
   - Data validation rules

4. **Security Architecture**
   - Authentication flow
   - Authorization rules
   - Data protection

#### Output

The AI creates: `thoughts/shared/knowledge/architecture.md`

This document includes:
- System architecture diagram (text-based)
- Component descriptions
- Data flow diagrams
- Database schema
- API endpoints design
- Security considerations

**Example Output:**
```markdown
# Task Tracker - Architecture

## System Overview

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser   │────▶│  Next.js App │────▶│  PostgreSQL  │
│  (Client)   │◀────│  (Frontend + │◀────│  (Database)  │
└─────────────┘     │   Backend)   │     └──────────────┘
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  NextAuth.js │
                    │    (Auth)    │
                    └──────────────┘
```

## Components

### 1. Frontend (Next.js App Router)
**Pages:**
- `/` - Home/landing page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/dashboard` - Main task dashboard (protected)
- `/tasks/[id]` - Individual task view (protected)

**Components:**
- `TaskList` - Displays tasks with filters
- `TaskCard` - Individual task display
- `TaskForm` - Create/edit task form
- `AuthForm` - Login/register form
- `FilterBar` - Status/search filters

### 2. Backend (Next.js API Routes)
**Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/tasks` - List tasks (with pagination)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `GET /api/tasks/[id]` - Get single task

### 3. Database (PostgreSQL + Prisma)
**Models:**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hashed with bcrypt
  name      String?
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      Status   @default(TODO)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([status])
}

enum Status {
  TODO
  IN_PROGRESS
  DONE
}
```

## Data Flow

### Task Creation Flow
1. User fills form in `TaskForm` component
2. Client-side validation
3. POST request to `/api/tasks`
4. Server validates session (NextAuth)
5. Server validates data (Zod)
6. Prisma creates task in database
7. Return created task to client
8. Client updates UI optimistically

### Authentication Flow
1. User submits credentials
2. POST to `/api/auth/login`
3. NextAuth validates credentials
4. If valid: Generate JWT token
5. Store token in HTTP-only cookie
6. Redirect to dashboard
7. Middleware checks token on protected routes

## Security

### Authentication
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens (HTTP-only cookies)
- CSRF protection enabled
- Session expiry: 30 days

### Authorization
- All API routes check authentication
- Users can only access own tasks
- Server-side validation on all mutations

### Data Protection
- SQL injection: Prevented by Prisma
- XSS: React auto-escapes by default
- CSRF: NextAuth built-in protection
```

---

### Phase 5: Implementation Planning (30-60 minutes)

**Goal**: Create a detailed, phased plan to build your MVP.

#### Run the Command

```bash
/create_greenfield_plan
```

#### What the AI Will Do

The AI will create a comprehensive implementation plan with:

1. **Phase Breakdown**
   - Phase 1: Infrastructure & Setup
   - Phase 2: Authentication
   - Phase 3: Core Features
   - Phase 4: Testing
   - Phase 5: Deployment

2. **For Each Phase:**
   - Detailed tasks
   - Success criteria
   - Dependencies
   - Estimated time
   - Verification steps

3. **Risk Assessment**
   - Potential blockers
   - Mitigation strategies

#### Output

The AI creates: `thoughts/shared/plans/[name]-mvp-plan.md`

This is your implementation roadmap!

**Example Output:**
```markdown
# Task Tracker - MVP Implementation Plan

## Overview
- **Total Estimated Time**: 3-4 weeks
- **Phases**: 5
- **Target Launch**: [Date]

---

## Phase 1: Infrastructure & Setup (Week 1, Days 1-2)

### Tasks
1. ✅ Initialize Next.js 15 project
   ```bash
   npx create-next-app@latest task-tracker --typescript --app --tailwind
   ```

2. ✅ Set up PostgreSQL database
   - Option A: Local (Docker Compose)
   - Option B: Neon.tech (free tier)

3. ✅ Install and configure Prisma
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

4. ✅ Create database schema
   - Create `prisma/schema.prisma` with User and Task models
   - Run `npx prisma migrate dev --name init`

5. ✅ Install NextAuth.js
   ```bash
   npm install next-auth @next-auth/prisma-adapter bcryptjs
   npm install -D @types/bcryptjs
   ```

6. ✅ Configure NextAuth.js
   - Create `src/app/api/auth/[...nextauth]/route.ts`
   - Set up JWT strategy
   - Configure email/password provider

7. ✅ Set up environment variables
   - Create `.env.example`
   - Document all required variables

### Success Criteria
- ✅ Next.js dev server runs (`npm run dev`)
- ✅ Database connection works (can run Prisma Studio)
- ✅ NextAuth configuration complete (can visit `/api/auth/signin`)

### Estimated Time: 4-6 hours

---

## Phase 2: Authentication (Week 1, Days 3-4)

### Tasks
1. ✅ Create registration page
   - Route: `/auth/register`
   - Form: Email, password, name
   - Validation: Email format, password strength (8+ chars)

2. ✅ Create registration API endpoint
   - Route: `/api/auth/register`
   - Hash password with bcrypt
   - Create user in database
   - Handle duplicate email error

3. ✅ Create login page
   - Route: `/auth/login`
   - Form: Email, password
   - NextAuth signIn() integration

4. ✅ Create protected middleware
   - File: `src/middleware.ts`
   - Check JWT token
   - Redirect unauthenticated users

5. ✅ Add authentication helpers
   - `getServerSession()` wrapper
   - `requireAuth()` utility
   - User session type

6. ✅ Create auth UI components
   - `AuthForm` component
   - Loading states
   - Error messages
   - Success redirects

### Success Criteria
- ✅ Users can register with email/password
- ✅ Users can log in with credentials
- ✅ Protected routes redirect to login
- ✅ Logged-in users see dashboard
- ✅ Users can log out

### Estimated Time: 8-10 hours

---

## Phase 3: Core Features (Week 2-3)

### 3A: Task CRUD Operations (Week 2, Days 1-3)

#### Tasks
1. ✅ Create task API endpoints
   - `POST /api/tasks` - Create task
   - `GET /api/tasks` - List tasks (with pagination)
   - `PUT /api/tasks/[id]` - Update task
   - `DELETE /api/tasks/[id]` - Delete task

2. ✅ Add server-side validation
   - Install Zod: `npm install zod`
   - Create validation schemas
   - Validate all inputs

3. ✅ Add authorization checks
   - Users can only access own tasks
   - Return 403 for unauthorized attempts

4. ✅ Create dashboard page
   - Route: `/dashboard`
   - Protected with middleware
   - Display user's tasks

5. ✅ Create TaskList component
   - Display tasks in cards
   - Show status badges
   - Loading states
   - Empty state

6. ✅ Create TaskForm component
   - Title input (required, max 200 chars)
   - Description textarea (optional, max 1000 chars)
   - Status dropdown
   - Submit/cancel buttons

7. ✅ Create TaskCard component
   - Display task info
   - Edit button
   - Delete button
   - Status indicator

#### Success Criteria
- ✅ Users can create tasks
- ✅ Users can see their tasks
- ✅ Users can edit tasks
- ✅ Users can delete tasks
- ✅ Users cannot see/edit other users' tasks

#### Estimated Time: 12-15 hours

---

### 3B: Filtering & Search (Week 2, Days 4-5)

#### Tasks
1. ✅ Add filter by status
   - All / TODO / IN_PROGRESS / DONE
   - Update API to support filter query param

2. ✅ Add search functionality
   - Search by title
   - Update API to support search query param

3. ✅ Create FilterBar component
   - Status filter buttons
   - Search input
   - Clear filters button

4. ✅ Add pagination
   - 10 tasks per page
   - Previous/Next buttons
   - Page indicators

#### Success Criteria
- ✅ Users can filter by status
- ✅ Users can search by title
- ✅ Pagination works correctly
- ✅ URL reflects filters (shareable links)

#### Estimated Time: 6-8 hours

---

## Phase 4: Testing (Week 3, Days 3-5)

### Tasks
1. ✅ Install Playwright
   ```bash
   npm init playwright@latest
   ```

2. ✅ Create E2E test infrastructure
   - Test fixtures for auth
   - Test helpers for common actions
   - Database seeding for tests

3. ✅ Write E2E tests
   - [ ] User registration flow
   - [ ] User login flow
   - [ ] Task creation flow
   - [ ] Task editing flow
   - [ ] Task deletion flow
   - [ ] Filtering works
   - [ ] Search works
   - [ ] Pagination works
   - [ ] Authorization prevents access to other users' tasks
   - [ ] Form validation works

4. ✅ Set up CI/CD
   - GitHub Actions workflow
   - Run tests on every push
   - Deploy on merge to main

### Success Criteria
- ✅ All E2E tests passing
- ✅ Test coverage > 80% of critical paths
- ✅ CI/CD pipeline working

### Estimated Time: 10-12 hours

---

## Phase 5: Deployment (Week 4)

### Tasks
1. ✅ Set up production database
   - Neon.tech or Supabase
   - Run migrations
   - Add connection pooling

2. ✅ Configure production environment
   - Set all environment variables
   - Generate secure NEXTAUTH_SECRET

3. ✅ Deploy to Vercel
   - Connect GitHub repo
   - Configure environment variables
   - Deploy

4. ✅ Post-deployment verification
   - Test registration
   - Test login
   - Test all CRUD operations
   - Test on mobile

5. ✅ Set up monitoring
   - Vercel Analytics
   - Error tracking (Sentry optional)

6. ✅ Create user documentation
   - Quick start guide
   - FAQ

### Success Criteria
- ✅ App accessible at production URL
- ✅ All features work in production
- ✅ Mobile-responsive
- ✅ Performance acceptable (< 3s page load)

### Estimated Time: 6-8 hours

---

## Risk Mitigation

### Risk 1: Database Performance
**Risk**: Slow queries with large datasets
**Mitigation**:
- Add database indexes early (userId, status)
- Implement pagination from start
- Monitor query performance

### Risk 2: Authentication Issues
**Risk**: Complex NextAuth setup
**Mitigation**:
- Follow NextAuth.js docs exactly
- Use JWT strategy (simpler)
- Test auth flow early and often

### Risk 3: Timeline Slippage
**Risk**: Taking longer than 4 weeks
**Mitigation**:
- Start with MVP features only
- Move "nice-to-have" features to Phase 2
- Time-box each phase

---

## Success Metrics

### Technical Metrics
- ✅ All E2E tests passing (100%)
- ✅ Zero TypeScript errors
- ✅ Build succeeds
- ✅ Lighthouse score > 90

### User Experience Metrics
- ✅ Registration flow < 2 minutes
- ✅ Task creation < 30 seconds
- ✅ Page load time < 3 seconds
- ✅ Works on mobile

### Launch Readiness
- ✅ Deployed to production
- ✅ Documentation complete
- ✅ Basic monitoring in place
- ✅ Bug-free for 3 days
```

---

### Phase 6: Implementation (Execution)

Now you're ready to build! You have:

✅ Complete requirements
✅ Tech stack selected with justification
✅ Architecture designed
✅ Detailed implementation plan

**Time to code!**

#### Tips for Implementation

1. **Follow the Plan**: Work through phases in order
2. **Test Early**: Don't wait until the end to test
3. **Commit Often**: Small, focused commits
4. **Ask for Help**: Use Claude Code for implementation questions

#### Example Implementation Session

```bash
# Start Phase 1
cd ~/projects/task-tracker

# Ask Claude Code to help implement Phase 1
"Help me implement Phase 1 of my task-tracker MVP plan. Let's start with initializing Next.js."

# Claude will guide you through each task, writing code, creating files, etc.

# When Phase 1 is complete:
"Phase 1 is complete. Let's move to Phase 2: Authentication."

# Continue through all phases
```

---

## 🎓 Understanding the Toolkit

### Directory Structure

When you run `/init_mvp`, you get this structure:

```
your-mvp/
├── .claude/                    # AI Toolkit (copied from main repo)
│   ├── agents/                 # Specialized AI agents
│   ├── commands/               # Slash commands
│   ├── utils/                  # Utility functions
│   └── examples/               # Reference examples
│
├── thoughts/                   # AI Working Documents
│   ├── shared/
│   │   ├── plans/             # Implementation plans
│   │   │   └── [name]-mvp-plan.md
│   │   ├── projects/          # Project living documents
│   │   │   ├── [name]-requirements.md
│   │   │   └── [name]-living-doc.md
│   │   ├── knowledge/         # Architecture & design
│   │   │   └── architecture.md
│   │   └── templates/         # Reusable templates
│   └── decisions/             # Technical decisions
│       └── tech-stack.md
│
├── docs/                       # Your project documentation
│   ├── README.md
│   └── API.md
│
├── src/                        # Your source code
│   ├── app/                   # (for Next.js)
│   ├── components/
│   └── lib/
│
├── tests/                      # Your tests
│   ├── e2e/
│   └── unit/
│
├── .gitignore
├── .env.example
└── README.md
```

### Important Files

#### `thoughts/shared/projects/[name]-living-doc.md`
Your project's "single source of truth" that tracks:
- Current status
- What's done
- What's next
- Important decisions
- Session logs

#### `thoughts/shared/plans/[name]-mvp-plan.md`
Your implementation roadmap:
- Phased breakdown
- Tasks for each phase
- Success criteria
- Time estimates

#### `thoughts/decisions/tech-stack.md`
Tech choices with justification:
- What you chose
- Why you chose it
- Trade-offs considered
- Alternatives evaluated

---

## 📖 Reference Examples

The toolkit includes complete, production-ready reference examples:

### Example 1: SaaS App (Next.js + Prisma + NextAuth.js)

**Location**: `.claude/examples/saas-nextjs-prisma/`

**What It Includes:**
- ✅ Complete authentication (email/password + Google OAuth)
- ✅ Full CRUD operations (Posts)
- ✅ 15 E2E tests with Playwright (100% passing)
- ✅ Docker deployment (one-command)
- ✅ Production-ready deployment guides
- ✅ Comprehensive documentation (2,900+ lines)

**Statistics:**
- Application Code: ~2,500 lines
- Test Code: ~1,200 lines
- Documentation: ~2,900 lines
- Total: ~6,600 lines

**Use It To Learn:**
- Authentication patterns
- CRUD best practices
- E2E testing with Playwright
- Docker deployment
- NextAuth.js setup
- Prisma ORM usage

**Quick Start:**
```bash
cd .claude/examples/saas-nextjs-prisma

# Read the README
cat README.md

# Or view specific documentation
cat docs/DEPLOYMENT.md  # Deployment guide
cat docs/DOCKER.md      # Docker guide

# Run the example locally
npm install
cp .env.example .env
# Edit .env with your values
npm run db:migrate
npm run dev

# Run tests
npx playwright test
```

---

## 🔧 Troubleshooting

### Issue: "Command not found: /init_mvp"

**Cause**: You're not in a directory with the `.claude/` toolkit, or the command file doesn't exist.

**Solution**:
1. Make sure you're in the `humanlayer-greenfield` directory
2. Check that `.claude/commands/init_mvp.md` exists
3. If not, you may need to pull the latest toolkit version

---

### Issue: "Directory already exists"

**Cause**: You're trying to create a project in a directory that already exists.

**Solution**:
1. Choose a different name
2. Or delete the existing directory
3. Or use the existing directory (but /init_mvp won't overwrite)

---

### Issue: "AI doesn't have context about my requirements"

**Cause**: You didn't run the workflow commands, or the documents weren't created.

**Solution**:
1. Make sure you ran `/gather_requirements` and it completed successfully
2. Check that `thoughts/shared/projects/[name]-requirements.md` exists
3. If not, run the command again
4. Make sure to answer all the AI's questions

---

### Issue: "Lost track of where I am in the process"

**Cause**: Working across multiple sessions without tracking progress.

**Solution**:
1. Check your living document: `thoughts/shared/projects/[name]-living-doc.md`
2. Check your implementation plan: `thoughts/shared/plans/[name]-mvp-plan.md`
3. These documents should tell you exactly where you are
4. Update them as you complete each phase

---

### Issue: "Tech stack choice doesn't feel right"

**Cause**: You chose technologies without fully understanding the trade-offs.

**Solution**:
1. Review `thoughts/decisions/tech-stack.md`
2. Re-run `/select_tech_stack` if needed
3. Ask Claude Code: "What are the trade-offs between [option A] and [option B] for my use case?"
4. It's okay to change your mind early! Better now than after writing 1000s of lines.

---

### Issue: "Implementation plan feels overwhelming"

**Cause**: Looking at the entire plan at once.

**Solution**:
1. Focus on ONE phase at a time
2. Don't look ahead to Phase 5 when you're in Phase 1
3. Break phases into daily tasks
4. Celebrate completing each phase
5. Remember: The AI will help you implement each task!

---

## 💡 Best Practices

### 1. Commit Early and Often

```bash
# After completing each task
git add .
git commit -m "feat(auth): add user registration endpoint"

# Don't wait until end of phase
```

### 2. Update Your Living Document

After each session, update `thoughts/shared/projects/[name]-living-doc.md`:
- What you completed
- What's next
- Any blockers
- Decisions made

### 3. Follow the DRY Principle (Don't Repeat Yourself)

If you're copying code, create a reusable component/function instead.

### 4. Test As You Build

Don't wait until the end to test. Add tests for each feature as you build it.

### 5. Keep Sessions Focused

Work in focused sessions:
- 1 phase per session (or part of a phase)
- Clear start and end goals
- Take breaks between sessions

### 6. Use Reference Examples

When stuck, check `.claude/examples/saas-nextjs-prisma/`:
- Similar feature?
- Authentication pattern?
- Testing approach?
- Deployment setup?

### 7. Ask Claude Code for Help

Claude Code can help with:
- "How do I implement [feature] in [framework]?"
- "Review my code for [security issues/best practices/bugs]"
- "Help me debug this error: [error message]"
- "What's the best way to [task] in [tech stack]?"

### 8. Document Decisions

When you make an important decision, document it in:
- `thoughts/decisions/` directory
- Add a markdown file explaining: what, why, alternatives, trade-offs

### 9. Keep Security in Mind

- Never commit `.env` files
- Always hash passwords
- Validate all user inputs
- Use prepared statements (Prisma does this automatically)
- Keep dependencies updated

### 10. Aim for MVP, Not Perfection

Remember:
- ✅ Working MVP > Perfect nothing
- ✅ Ship and iterate > Endless planning
- ✅ Learn from users > Guess in vacuum
- ✅ Done > Perfect

---

## 🎯 Success Checklist

Before considering your MVP "done", verify:

### Planning Phase
- [ ] Requirements documented
- [ ] Tech stack selected with justification
- [ ] Architecture designed
- [ ] Implementation plan created

### Development Phase
- [ ] All MVP features implemented
- [ ] Code follows best practices
- [ ] No obvious bugs
- [ ] Works on mobile

### Testing Phase
- [ ] E2E tests written and passing
- [ ] Manual testing complete
- [ ] Security basics covered
- [ ] Performance acceptable

### Deployment Phase
- [ ] Deployed to production
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Post-deployment verification complete

### Documentation Phase
- [ ] README explains how to run locally
- [ ] API documentation exists (if applicable)
- [ ] User guide created
- [ ] Known issues documented

---

## 🚀 What's Next?

After your MVP is live:

1. **Gather User Feedback**
   - What do users love?
   - What's confusing?
   - What's missing?

2. **Iterate Based on Feedback**
   - Prioritize user pain points
   - Add most-requested features
   - Fix critical bugs first

3. **Scale Gradually**
   - Monitor performance
   - Optimize bottlenecks
   - Add features incrementally

4. **Keep Learning**
   - Try different tech stacks
   - Build more MVPs
   - Share what you learned

---

## 📞 Getting Help

### Within Claude Code
- Just ask! "How do I [X]?"
- Reference examples: `.claude/examples/`
- Check documentation: `.claude/utils/`

### Community Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Playwright Docs](https://playwright.dev)

---

## 🎉 Congratulations!

You now have everything you need to build a production-ready MVP from scratch!

**Remember:**
- Start with `/init_mvp`
- Follow the workflow
- Use reference examples
- Ask Claude Code for help
- Ship your MVP!

**Good luck building!** 🚀

---

*Generated with HumanLayer Greenfield Toolkit*
*Last Updated: 2025-10-26*
