# Tech Stack Selection Flow

This utility provides a structured approach to technology selection for greenfield MVP projects.

## Selection Order

Technology decisions should follow this hierarchical order:

1. **Project Type Determination** - Web app, mobile app, API, CLI tool, etc.
2. **Frontend Framework** - React-based: Next.js vs Remix vs Vite+React
3. **Backend Language** - TypeScript vs Go vs Python vs Rust
4. **Backend Framework** - Based on language choice
5. **Database** - PostgreSQL vs MongoDB vs DynamoDB (independent of language)
6. **Supporting Services** - Redis, message queues, monitoring, etc.

---

## Interactive Prompts

### Frontend Framework Selection

Always React-based, present 3 options:

**Next.js 15**
- ✅ Pros: Full-stack capabilities, SSR/SSG, great SEO, Vercel integration, excellent DX
- ❌ Cons: Learning curve for SSR concepts, opinionated structure, potential over-engineering
- 🎯 Best for: Marketing sites, e-commerce, full-stack apps, SEO-critical applications
- ⚠️ Avoid if: Building simple SPA, no SSR needs, prefer minimal setup

**Remix**
- ✅ Pros: Nested routing, progressive enhancement, excellent data loading, great forms
- ❌ Cons: Newer ecosystem, different mental model, smaller community than Next.js
- 🎯 Best for: Complex forms, dashboards, data-heavy apps, progressive web apps
- ⚠️ Avoid if: Need SSG, prefer larger ecosystem, simple CRUD apps

**Vite + React 19**
- ✅ Pros: Lightning fast builds, simple SPA architecture, flexible structure, minimal setup
- ❌ Cons: No SSR out-of-box, need separate backend, manual routing setup
- 🎯 Best for: Admin panels, SPAs, internal tools, when you have separate API
- ⚠️ Avoid if: Need SEO, require SSR, want full-stack framework

Use `AskUserQuestion` with `multiSelect: false`

---

### Backend Language Selection

Present based on requirements:

**TypeScript (Node.js)**
- ✅ Pros: Same language as frontend, huge ecosystem, rapid development, easy full-stack
- ❌ Cons: Runtime performance limitations, memory usage, single-threaded by default
- 🎯 Best for: Full-stack JS teams, rapid MVPs, CRUD APIs, real-time features
- ⚠️ Avoid if: CPU-intensive tasks, need maximum performance, high concurrency needs

**Go**
- ✅ Pros: Excellent performance, simple deployment (single binary), great concurrency, low memory
- ❌ Cons: More verbose than dynamic languages, smaller web ecosystem, steeper learning curve
- 🎯 Best for: High-performance APIs, microservices, CLIs, systems programming
- ⚠️ Avoid if: Rapid prototyping priority, team unfamiliar, need dynamic features

**Python**
- ✅ Pros: Rapid prototyping, AI/ML libraries, readable code, huge ecosystem
- ❌ Cons: GIL limitations for concurrency, slower than compiled languages, runtime errors
- 🎯 Best for: Data science, ML/AI features, quick MVPs, scientific computing
- ⚠️ Avoid if: High-performance critical, large-scale concurrent operations

**Rust**
- ✅ Pros: Maximum performance, memory safety without GC, no runtime, fearless concurrency
- ❌ Cons: Steep learning curve, longer development time, smaller web ecosystem
- 🎯 Best for: Systems where performance is critical, security-sensitive apps, embedded systems
- ⚠️ Avoid if: Rapid MVP needed, team unfamiliar, prototype phase

---

### Backend Framework Selection

#### TypeScript Frameworks

**NestJS 11**
- ✅ Pros: Enterprise-ready, modular architecture, TypeScript-first, Angular-like structure
- ❌ Cons: Heavyweight, learning curve, over-engineering for simple apps
- 🎯 Best for: Large teams, complex domains, microservices, enterprise applications
- ⚠️ Avoid if: Simple APIs, small team, need minimal setup

**Express**
- ✅ Pros: Minimal, flexible, huge ecosystem, well-documented, battle-tested
- ❌ Cons: No structure, manual setup, callback hell potential, aging ecosystem
- 🎯 Best for: Simple APIs, maximum flexibility, experienced developers
- ⚠️ Avoid if: Need structure, large team, complex application

**Fastify**
- ✅ Pros: High performance, schema-based validation, plugin system, modern async/await
- ❌ Cons: Smaller ecosystem than Express, less middleware available
- 🎯 Best for: High-performance APIs, JSON schemas, modern TypeScript projects
- ⚠️ Avoid if: Need extensive middleware, prefer Express ecosystem

#### Go Frameworks

**Gin**
- ✅ Pros: Fast, minimalist, low learning curve, good documentation
- ❌ Cons: Less opinionated, manual middleware setup
- 🎯 Best for: Fast APIs, minimalist approach, RESTful services
- ⚠️ Avoid if: Need full-featured framework, GraphQL primary

**Fiber**
- ✅ Pros: Express-like API, extremely fast, zero memory allocation
- ❌ Cons: Uses fasthttp (not net/http), different from Go stdlib
- 🎯 Best for: Maximum performance, Express developers, high throughput
- ⚠️ Avoid if: Need stdlib compatibility, prefer standard approach

**Echo**
- ✅ Pros: High performance, clean API, good middleware, extensible
- ❌ Cons: Less popular than Gin, smaller community
- 🎯 Best for: RESTful APIs, need middleware, modern Go projects
- ⚠️ Avoid if: Need large ecosystem, GraphQL primary

#### Python Frameworks

**FastAPI 0.119**
- ✅ Pros: Extremely fast (21k req/s), automatic OpenAPI docs, modern async, type hints
- ❌ Cons: Async learning curve, younger than Django/Flask
- 🎯 Best for: Modern APIs, async operations, automatic documentation, ML/AI APIs
- ⚠️ Avoid if: Need ORM batteries included, prefer sync only

**Django 5.1**
- ✅ Pros: Batteries included, ORM, admin panel, mature ecosystem
- ❌ Cons: Monolithic, heavyweight, opinionated structure
- 🎯 Best for: Full-stack apps, admin interfaces, rapid development
- ⚠️ Avoid if: Building API-only, need minimal framework

**Flask**
- ✅ Pros: Minimal, flexible, easy learning curve, huge ecosystem
- ❌ Cons: Manual setup, no built-in ORM, can become messy
- 🎯 Best for: Simple APIs, maximum flexibility, microservices
- ⚠️ Avoid if: Need structure, large application, many built-ins

#### Rust Frameworks

**Axum 0.8**
- ✅ Pros: Tokio-native, best memory efficiency, type-safe routing, modern design
- ❌ Cons: Rust learning curve, async complexity
- 🎯 Best for: High-performance APIs, Tokio ecosystem, modern Rust
- ⚠️ Avoid if: Rust beginners, rapid prototyping

**Rocket 0.5**
- ✅ Pros: Beginner-friendly, intuitive macros, good documentation
- ❌ Cons: Async support newer, smaller ecosystem than Actix
- 🎯 Best for: Rust beginners, rapid development, type-safe APIs
- ⚠️ Avoid if: Maximum performance needed

**Actix-web**
- ✅ Pros: Fastest Rust framework, actor model, mature ecosystem
- ❌ Cons: Actor complexity, steeper learning curve
- 🎯 Best for: Maximum performance, actor pattern, experienced Rust devs
- ⚠️ Avoid if: Prefer simpler models, Rust beginners

---

### Database Selection (Independent of Backend Language)

**PostgreSQL 16**
- ✅ Pros: ACID compliance, complex queries, JSON support, mature, extensions
- ❌ Cons: Vertical scaling limitations, more setup complexity, steeper learning curve
- 🎯 Best for: Relational data, financial apps, complex queries, data integrity critical
- ⚠️ Avoid if: Rapid prototyping, flexible schema needed, horizontal scaling critical

**MongoDB 8**
- ✅ Pros: Flexible schema, horizontal scaling, developer friendly, easy start
- ❌ Cons: No ACID by default, no complex joins, data consistency challenges
- 🎯 Best for: Document storage, rapid prototyping, real-time apps, flexible schema
- ⚠️ Avoid if: Complex relationships, ACID required, financial data

**DynamoDB / Firestore**
- ✅ Pros: Fully managed, auto-scaling, serverless-friendly, pay-per-use
- ❌ Cons: Vendor lock-in, learning curve, cost at scale, limited query patterns
- 🎯 Best for: Serverless apps, variable traffic, AWS/GCP ecosystem, auto-scaling
- ⚠️ Avoid if: Complex queries, cost sensitive, need data portability

---

## Trade-off Presentation Format

For each option show:
- ✅ **Top 3 pros**
- ❌ **Top 3 cons**
- 🎯 **Best for**: [use cases]
- ⚠️ **Avoid if**: [anti-patterns]
- 📊 **Performance**: [metrics if available]

---

## Decision Factors

### Performance Critical
- Backend Language: Go > Rust > TypeScript > Python
- Consider: Gin, Axum, Fastify
- Database: PostgreSQL with proper indexing

### Rapid Development
- Backend Language: TypeScript > Python > Go > Rust
- Consider: Next.js full-stack, FastAPI, Express
- Database: MongoDB for flexibility

### Full-Stack JavaScript
- Frontend: Next.js or Remix
- Backend: TypeScript with NestJS or Fastify
- Database: PostgreSQL with Prisma ORM

### ML/AI Features
- Backend Language: Python mandatory
- Consider: FastAPI for API layer
- Database: PostgreSQL + Redis for caching

### High Concurrency
- Backend Language: Go or Rust
- Consider: Gin, Axum, Tokio
- Database: PostgreSQL with connection pooling

---

## Usage in Agents

Agents should reference this utility when presenting technology options:

```markdown
Let me help you select the right tech stack. I'll present options with trade-offs.

[Reference tech-selector.md for Frontend options]
[Use AskUserQuestion to get user selection]
[Reference tech-selector.md for Backend Language options]
[Use AskUserQuestion to get user selection]
[Reference tech-selector.md for Backend Framework options based on language]
[Use AskUserQuestion to get user selection]
[Reference tech-selector.md for Database options]
[Use AskUserQuestion to get user selection]
```

---

## 2025 Framework Versions

Always use WebSearch to verify latest versions when presenting options:
- Next.js: 15.x
- React: 19.x
- NestJS: 11.x
- FastAPI: 0.119+
- Django: 5.1+
- Axum: 0.8+
- PostgreSQL: 16.x
- MongoDB: 8.x

---

## Integration with Cost & Team Utilities

**IMPORTANT**: When using this tech selection utility, ALWAYS consider:

### Cost Implications
Reference `/Users/blakespencer/projects/humanlayer-greenfield/.claude/utils/cost-calculator.md` to:
- Provide cost estimates for each option (MVP, Production, Scale stages)
- Show decision impact on monthly hosting costs
- Highlight free tier options for MVPs
- Consider long-term scaling costs

**Example Integration**:
```markdown
**Next.js on Vercel**
✅ Pros: [technical pros from this utility]
❌ Cons: [technical cons from this utility]
💰 Cost: $0 (MVP), $20-50 (production), $200+ (scale)
🎯 Best for: When developer time is more valuable than hosting costs
```

### Team Context
Reference `/Users/blakespencer/projects/humanlayer-greenfield/.claude/utils/team-assessment.md` to:
- Match stack to team size and experience level
- Consider hiring difficulty and ramp-up time
- Assess learning curve against timeline pressure
- Identify team anti-patterns

**Example Integration**:
```markdown
**Go + React**
✅ Pros: [technical pros from this utility]
❌ Cons: [technical cons from this utility]
👥 Team: Good for 2+ developers with clear roles
📚 Ramp-up: 3-4 weeks for Go beginners
💼 Hiring: Moderate difficulty (6/10 availability)
```

### Complete Selection Flow with Context

1. **Gather Requirements** (technical needs)
2. **Assess Team** (use team-assessment.md)
   - Team size: _______
   - Experience level: _______
   - Timeline pressure: _______
3. **Assess Budget** (use cost-calculator.md)
   - Budget: _______
   - Growth expectations: _______
4. **Present Options** (use this utility + cost + team context)
5. **Get User Decision** (AskUserQuestion with full context)

---

## Selection Flow Example

### Example 1: Solo Developer, MVP, Tight Budget

**Context**:
- Team: Solo developer
- Budget: $0-10/month
- Timeline: 2 months to MVP

**Selection**:
1. **Project Type**: Web application with API
2. **Frontend**: Next.js (full-stack, minimize context switching)
3. **Backend**: Next.js API routes (same framework)
4. **Database**: PostgreSQL on Supabase free tier
5. **Supporting**: Supabase Auth, Vercel hosting

**Result**: Next.js full-stack + Supabase PostgreSQL
**Cost**: $0/month
**Team fit**: Perfect for solo dev (single framework)
**Timeline impact**: Fastest path to MVP

### Example 2: Small Team, Production SaaS, Moderate Budget

**Context**:
- Team: 3 developers (1 senior, 2 mid-level)
- Budget: $50-100/month
- Timeline: 6 months to production

**Selection**:
1. **Project Type**: SaaS web application
2. **Frontend**: Next.js (SEO + good DX)
3. **Backend**: NestJS (team size justifies structure)
4. **Database**: PostgreSQL (ACID needed for customer data)
5. **Supporting**: Redis for caching, GitHub Actions for CI/CD

**Result**: Next.js + NestJS + PostgreSQL
**Cost**: $97/month (Vercel Pro + Railway DB + Redis + monitoring)
**Team fit**: Good separation for 3-person team
**Timeline impact**: On schedule with good velocity

### Example 3: High-Performance API, Experienced Team

**Context**:
- Team: 5 senior engineers
- Budget: $200-400/month
- Requirements: High throughput, low latency

**Selection**:
1. **Project Type**: High-performance API
2. **Frontend**: Vite + React (separate SPA)
3. **Backend**: Go with Gin (performance critical)
4. **Database**: PostgreSQL with read replicas
5. **Supporting**: Redis, Prometheus monitoring

**Result**: Vite+React + Go/Gin + PostgreSQL
**Cost**: $150-200/month (optimized for performance)
**Team fit**: Seniors adapt quickly to Go (1-2 week ramp-up)
**Timeline impact**: Minimal delay for learning, big performance gains
