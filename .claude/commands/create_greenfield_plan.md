---
description: Create implementation plans for greenfield MVPs with tech stack selection
model: opus
---

# Greenfield MVP Implementation Plan

You are tasked with creating comprehensive implementation plans for greenfield MVP projects through an interactive, iterative process focusing on technology selection and requirements clarification.

## Initial Response

When invoked, respond with:
```
I'll help you create a greenfield MVP implementation plan. Let's start from scratch and build something great together!

Please provide:
1. What type of application you want to build (web app, mobile app, API, CLI tool, etc.)
2. Core problem it solves or value it provides
3. Target users and scale expectations
4. Any constraints (timeline, budget, team size, existing skills)
5. Must-have features for the MVP

I'll guide you through technology selection and create a comprehensive implementation plan.
```

## Process Steps

### Step 1: Requirements Gathering

1. **Parse Initial Requirements**:
   - Use greenfield-requirements-decomposer agent
   - Identify core features vs nice-to-haves
   - Clarify ambiguities interactively

2. **Define Success Criteria**:
   - What makes the MVP successful?
   - Key metrics to track
   - User acceptance criteria

### Step 2: Interactive Tech Stack Selection

1. **Frontend Framework Selection** (React-based):
   ```
   For the frontend, we'll use React. Which React framework fits your needs?

   **Next.js 15**
   ✅ Pros: Full-stack capabilities, SSR/SSG, great SEO, Vercel integration
   ❌ Cons: Learning curve, opinionated structure
   Best for: Marketing sites, e-commerce, full-stack apps

   **Remix**
   ✅ Pros: Nested routing, progressive enhancement, great data loading
   ❌ Cons: Newer ecosystem, different mental model
   Best for: Complex forms, dashboards, data-heavy apps

   **Vite + React 19**
   ✅ Pros: Lightning fast builds, simple SPA, flexible structure
   ❌ Cons: No SSR out-of-box, need separate backend
   Best for: Admin panels, SPAs, when you have separate API
   ```

2. **Backend Language Selection**:
   Use greenfield-tech-evaluator to present options:
   ```
   For the backend API, which language aligns with your team and requirements?

   **TypeScript (Node.js)**
   ✅ Pros: Same language as frontend, huge ecosystem, rapid development
   ❌ Cons: Runtime performance limitations, memory usage
   Best for: Full-stack JS teams, rapid MVPs

   **Go**
   ✅ Pros: Excellent performance, simple deployment, great concurrency
   ❌ Cons: More verbose, smaller web ecosystem
   Best for: High-performance APIs, microservices

   **Python**
   ✅ Pros: Rapid prototyping, AI/ML libraries, readable code
   ❌ Cons: GIL limitations, slower than compiled languages
   Best for: Data science, ML/AI features, quick MVPs

   **Rust**
   ✅ Pros: Maximum performance, memory safety, no runtime
   ❌ Cons: Steep learning curve, longer development time
   Best for: Systems where performance is critical
   ```

3. **Backend Framework Selection** (based on language):
   Present framework options with trade-offs

4. **Database Selection** (independent of language):
   ```
   Which database approach fits your data needs?

   **PostgreSQL**
   ✅ Pros: ACID compliance, complex queries, JSON support, mature
   ❌ Cons: Vertical scaling, more setup complexity
   Best for: Relational data, financial apps, complex queries

   **MongoDB**
   ✅ Pros: Flexible schema, horizontal scaling, easy start
   ❌ Cons: No ACID by default, no complex joins
   Best for: Document storage, rapid prototyping, real-time apps

   **DynamoDB/Firestore**
   ✅ Pros: Fully managed, auto-scaling, serverless-friendly
   ❌ Cons: Vendor lock-in, learning curve, cost at scale
   Best for: Serverless apps, variable traffic
   ```

5. **Infrastructure Decisions**:
   - Hosting (Vercel, AWS, Railway, Fly.io)
   - CI/CD approach
   - Monitoring strategy

### Step 3: Architecture Design

1. **Use greenfield-architecture-designer**:
   - Create system architecture
   - Design component boundaries
   - Plan data flow

2. **API Design**:
   - Use greenfield-api-designer
   - Define contracts before implementation

### Step 4: Implementation Planning

Create phased approach:

## Phase 1: Project Setup and Infrastructure
- Initialize repository
- Set up development environment
- Configure build tooling
- Set up CI/CD pipeline

## Phase 2: Core Data Model and API
- Design and implement database schema
- Create base API structure
- Implement authentication

## Phase 3: MVP Features
- [Feature 1 implementation]
- [Feature 2 implementation]
- Basic UI/UX

## Phase 4: Testing and Polish
- Comprehensive testing
- Performance optimization
- Error handling
- Documentation

### Step 5: Generate Scaffolding

Use greenfield-scaffolder to create initial project structure

## Template Structure

```markdown
# [Project Name] Greenfield MVP Implementation Plan

## Overview
[One paragraph description]

## Requirements Summary
### Functional Requirements
- [Requirement 1]
- [Requirement 2]

### Non-Functional Requirements
- Performance targets
- Security requirements
- Scalability needs

## Technology Decisions

### Tech Stack
- **Frontend**: [Choice] - [Rationale]
- **Backend Language**: [Choice] - [Rationale]
- **Backend Framework**: [Choice] - [Rationale]
- **Database**: [Choice] - [Rationale]
- **Hosting**: [Choice] - [Rationale]

### Architecture Overview
[Mermaid diagram of system architecture]

## Implementation Phases

### Phase 1: Foundation (Week 1)
[Details]

### Phase 2: Core Features (Weeks 2-3)
[Details]

### Phase 3: MVP Completion (Week 4)
[Details]

## Success Criteria
- [ ] All core features implemented
- [ ] Basic testing coverage
- [ ] Deployment pipeline functional
- [ ] Documentation complete
```

## Tools to Use

- **greenfield-requirements-decomposer**: Parse and structure requirements
- **greenfield-tech-evaluator**: Research and compare technology options
- **greenfield-architecture-designer**: Design system architecture
- **greenfield-api-designer**: Define API contracts
- **greenfield-data-model-designer**: Design database schemas
- **greenfield-scaffolder**: Generate initial project structure

## Output Location

Save plan to: `thoughts/shared/plans/[project-name]-mvp-plan.md`

## Important Guidelines

1. **Interactive Process**: Use AskUserQuestion tool extensively to clarify requirements and preferences
2. **Trade-off Analysis**: Always present pros/cons for technology choices
3. **2025 Framework Knowledge**: Reference latest versions (Next.js 15, React 19, FastAPI 0.119, etc.)
4. **Hierarchical Selection**: Frontend → Backend Language → Backend Framework → Database
5. **Database Independence**: PostgreSQL/MongoDB/DynamoDB work with any backend language
6. **MVP Focus**: Prioritize features that deliver core value, defer nice-to-haves
7. **Realistic Timelines**: Base estimates on team size and experience
8. **Cost Awareness**: Consider hosting costs and free tier options
