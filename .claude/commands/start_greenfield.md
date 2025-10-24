---
description: Start a new greenfield MVP project with living documentation and proper structure
model: sonnet
---

# Start Greenfield MVP Project

You are starting a brand new greenfield MVP project. You'll create a living document to track progress and ensure smooth handoffs between sessions.

## Initial Setup

When invoked, immediately:

1. **Create Project Living Document**:
   - Copy template from `/thoughts/shared/templates/greenfield-living-document.md`
   - Save as `/thoughts/shared/projects/[project-name]-living-doc.md`
   - Fill in initial sections

2. **Start Interactive Planning**:
   ```
   🚀 Let's build your MVP from scratch!

   I'll guide you through setting up a new project with:
   - Interactive tech stack selection (React frontend + your choice of backend)
   - Proper project structure
   - Living documentation for continuity
   - Architecture decisions recorded

   First, tell me about your project:
   1. Project name and description
   2. Core problem it solves
   3. Target users
   4. 2-3 must-have features for MVP
   5. Any specific requirements (real-time, AI/ML, heavy data processing)?
   ```

## Process Flow

### Step 1: Requirements Gathering
- Use `greenfield-requirements-decomposer` agent
- Document in living document under "MVP Milestones"
- Create initial user stories

### Step 2: Tech Stack Selection
Follow the hierarchy:
1. **Frontend** (Always React-based):
   - Next.js 15 (Full-stack, SSR/SSG)
   - Remix (Nested routing, forms)
   - Vite + React (SPA, separate API)

2. **Backend Language**:
   - TypeScript (Same as frontend)
   - Go (High performance)
   - Python (ML/AI features)
   - Rust (Maximum performance)

3. **Backend Framework** (based on language)
4. **Database** (based on data needs, not language)
5. **Infrastructure** (hosting, CI/CD)

Document all choices in living document architecture section.

### Step 3: Project Scaffolding
1. Create directory structure as defined in living document
2. Initialize git repository
3. Set up frontend project with chosen framework
4. Set up backend project with chosen stack
5. Create docker-compose for local development
6. Set up initial CI/CD pipeline

### Step 4: Create Initial Code
Generate based on tech stack:
- Frontend: App shell, routing, layout components
- Backend: Server setup, health check endpoint
- Database: Initial schema, migrations
- Shared: Type definitions
- Tests: Basic test setup

### Step 5: Document Everything
Update living document with:
- Completed setup steps
- File paths created
- Architecture decisions
- Next steps for continuation
- Current context usage percentage

## Context Management

Monitor context usage throughout:
- At 30%: Start being concise
- At 40%: Prepare for handoff
- At 50%: Initiate handoff procedure
- NEVER exceed 60%

## Handoff Preparation

When context approaches 40%, prepare handoff:

1. **Update Living Document**:
   ```markdown
   ## 🔄 Handoff Status
   - **Current Context**: 40%
   - **Session Summary**: [What was accomplished]
   - **In Progress**: [Exact status of current task]
   - **Next Steps**: [Clear, actionable items]
   - **Decisions Needed**: [Any blockers]
   ```

2. **Commit All Code**:
   ```bash
   git add .
   git commit -m "feat: [description] - preparing for handoff at 40% context"
   ```

3. **Final Message**:
   ```
   ✅ Project successfully initialized!

   📊 Context Usage: [X]%
   📁 Living Document: /thoughts/shared/projects/[name]-living-doc.md

   To continue this project in a new session:
   /continue_greenfield [project-name]

   Next immediate steps:
   1. [First task]
   2. [Second task]
   3. [Third task]
   ```

## Success Criteria

By end of session:
- [ ] Living document created and populated
- [ ] Tech stack selected and documented
- [ ] Project structure created
- [ ] Initial code scaffolded
- [ ] Git repository initialized
- [ ] Development environment working
- [ ] Clear next steps documented
- [ ] Context usage below 50%