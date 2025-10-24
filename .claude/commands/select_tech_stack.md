---
description: Interactive tech stack selection with trade-off analysis
model: opus
---

# Tech Stack Selection

You are tasked with guiding users through hierarchical technology decisions for greenfield projects, presenting clear trade-offs at each level to help them make informed choices aligned with their requirements and constraints.

## Initial Response

When this command is invoked:

1. **Check if context was provided**:
   - If requirements or project context were provided as parameters, read them immediately
   - Begin the selection process with that context

2. **If no parameters provided**, respond with:
```
I'll help you select the optimal tech stack for your greenfield MVP. This is a hierarchical process where each decision informs the next.

Before we start, let me understand your project:
1. What type of application are you building? (web app, mobile app, API, CLI tool, etc.)
2. What's your team's current expertise?
3. What are your performance requirements?
4. What's your timeline and budget constraints?
5. Any specific integration requirements?

I'll guide you through selecting:
- Frontend framework (if applicable)
- Backend language and framework
- Database and data layer
- Supporting technologies
- Development tools

Each decision will present clear trade-offs to help you choose wisely.
```

Then wait for the user's input.

## Decision Flow

### Step 1: Project Type Classification

First, determine the project type to frame subsequent decisions:
- **Web application**: Full-stack or separate frontend/backend
- **Mobile application**: Native, cross-platform, or web-based
- **Desktop application**: Electron, Tauri, or native
- **API/Backend service**: RESTful, GraphQL, or gRPC
- **CLI tool**: Language and distribution strategy

Use **AskUserQuestion** to confirm project type and clarify scope.

### Step 2: Frontend Selection (for web/mobile apps)

**For web applications**, use **greenfield-tech-evaluator** agent and reference `.claude/utils/tech-selector.md` for comprehensive framework comparisons.

Present options hierarchically:

```
Since we're building a web application with React, which framework fits your needs?

**Next.js 15**
✅ Pros: [Reference tech-selector.md for details]
❌ Cons: [Reference tech-selector.md]
🎯 Best for: [Use cases from tech-selector.md]

**Remix**
✅ Pros: [Reference tech-selector.md]
❌ Cons: [Reference tech-selector.md]
🎯 Best for: [Use cases from tech-selector.md]

**Vite + React 19**
✅ Pros: [Reference tech-selector.md]
❌ Cons: [Reference tech-selector.md]
🎯 Best for: [Use cases from tech-selector.md]
```

Use **AskUserQuestion** to present these options interactively.

### Step 3: Backend Language Selection

Use **greenfield-tech-evaluator** agent and reference `.claude/utils/tech-selector.md` for language comparisons.

Present 3-4 language options based on project requirements:
- **TypeScript (Node.js)**: Full-stack JavaScript, rapid development
- **Go**: High performance, simple deployment
- **Python**: Rapid prototyping, AI/ML capabilities
- **Rust**: Maximum performance, memory safety

Consider team expertise, performance needs, and ecosystem maturity.

Example format:
```
For the backend, which language aligns with your team and requirements?

**TypeScript (Node.js)**
✅ Pros: [From tech-selector.md]
❌ Cons: [From tech-selector.md]
Team Ramp-up: [From tech-selector.md]
Cost Implications: [Reference .claude/utils/cost-calculator.md if available]

[Present other options similarly]
```

### Step 4: Backend Framework Selection

Based on language choice, present framework options using **greenfield-tech-evaluator**:

**TypeScript**: NestJS 11, Express, Fastify
**Go**: Gin, Fiber, Echo
**Python**: FastAPI 0.119, Django 5.1, Flask
**Rust**: Axum 0.8, Rocket 0.5, Actix-web

Reference `.claude/utils/tech-selector.md` for detailed framework comparisons within each language.

### Step 5: Data Layer Selection

**Important**: Database selection is **independent** of backend language choice.

#### 5.1 Database Type
Use **AskUserQuestion** to determine needs:
- Data structure (relational vs document)
- ACID requirements
- Scalability expectations
- Query complexity

Present options:
```
Which database approach fits your data needs?

**PostgreSQL 16**
✅ Pros: ACID compliance, complex queries, JSON support, mature ecosystem
❌ Cons: Vertical scaling limits, more complex setup
🎯 Best for: Relational data, financial apps, complex queries, strong consistency needs

**MongoDB 8**
✅ Pros: Flexible schema, horizontal scaling, rapid prototyping
❌ Cons: No ACID by default (single document only), limited joins
🎯 Best for: Document storage, evolving schemas, real-time apps

**DynamoDB/Firestore**
✅ Pros: Fully managed, auto-scaling, serverless-friendly, no infrastructure
❌ Cons: Vendor lock-in, learning curve, cost at high scale
🎯 Best for: Serverless apps, variable traffic, AWS/GCP ecosystem
```

#### 5.2 ORM/ODM Selection
Based on language and database choice, recommend:
- **TypeScript**: Prisma, TypeORM, Drizzle
- **Go**: GORM, Ent, SQLc
- **Python**: SQLAlchemy, Django ORM, Tortoise
- **Rust**: Diesel, SQLx, SeaORM

### Step 6: Additional Technologies

Guide user through selecting:

#### 6.1 Authentication & Authorization
Reference `.claude/utils/security-auth-selector.md` (if available from Phase 5) for:
- JWT vs Session-based vs OAuth 2.0 vs Magic Links
- Authorization patterns (RBAC, ABAC, ACL)
- Security best practices

Use **AskUserQuestion** to understand:
- User authentication needs
- Social login requirements
- Security compliance (GDPR, HIPAA, etc.)

#### 6.2 File Storage
- Local filesystem (development)
- AWS S3 / Cloudflare R2 (production)
- Integrated platform storage (Vercel Blob, Supabase Storage)

#### 6.3 Caching Layer
Determine if needed based on scale:
- **Redis 8**: Popular, feature-rich, pub/sub support
- **Memcached**: Simple, fast, memory-only
- None for MVP (add later if needed)

#### 6.4 Message Queue (if needed)
For async processing:
- **Redis**: Simple pub/sub
- **RabbitMQ**: Traditional message broker
- **AWS SQS**: Managed, serverless
- Defer to post-MVP if not critical

### Step 7: Development Tools

#### 7.1 Testing Framework
Based on language:
- **TypeScript**: Vitest, Jest 30, Playwright (E2E)
- **Go**: Native testing, Testify
- **Python**: Pytest 8, unittest
- **Rust**: Built-in tests, Criterion

#### 7.2 Build Tools
- Automatically determined by framework choice
- Document any custom build requirements

#### 7.3 Linting & Formatting
- **TypeScript**: ESLint, Prettier
- **Go**: golangci-lint, gofmt
- **Python**: Ruff, Black
- **Rust**: Clippy, rustfmt

## Documentation Process

### Create Decision Document

After all selections are made, create a comprehensive decision document:

**File**: `thoughts/shared/decisions/[project-name]-tech-stack.md`

**Template**:
```markdown
# [Project Name] Tech Stack Decisions

**Date**: [Date]
**Decided by**: [Team/Person]

## Overview
[One paragraph summarizing the tech stack]

## Project Context
- **Type**: [Web app/API/etc.]
- **Team Size**: [Number]
- **Team Expertise**: [Languages/frameworks]
- **Timeline**: [Duration]
- **Budget**: [Range]

## Technology Decisions

### Frontend
**Choice**: [Framework]
**Rationale**: [Why this was chosen]
**Alternatives Considered**: [What was rejected and why]

### Backend Language
**Choice**: [Language]
**Rationale**: [Why this was chosen]
**Alternatives Considered**: [What was rejected and why]

### Backend Framework
**Choice**: [Framework]
**Rationale**: [Why this was chosen]
**Alternatives Considered**: [What was rejected and why]

### Database
**Choice**: [Database + ORM]
**Rationale**: [Why this was chosen]
**Alternatives Considered**: [What was rejected and why]

### Additional Technologies
- **Authentication**: [Method] - [Why]
- **File Storage**: [Solution] - [Why]
- **Caching**: [Solution or None] - [Why]
- **Message Queue**: [Solution or None] - [Why]

### Development Tools
- **Testing**: [Framework(s)]
- **Linting**: [Tools]
- **Formatting**: [Tools]
- **CI/CD**: [Platform]

## Cost Estimation
[Reference .claude/utils/cost-calculator.md if available]
- **Hosting**: [Monthly estimate]
- **Database**: [Monthly estimate]
- **Other Services**: [Breakdown]
- **Total Estimated Monthly Cost**: $[X-Y]

## Team Considerations
[Reference .claude/utils/team-assessment.md if available]
- **Ramp-up Time**: [Estimate]
- **Hiring Difficulty**: [Assessment]
- **Training Needs**: [List]

## Risks & Mitigation
- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]

## Next Steps
1. Review and approve tech stack decisions
2. Set up development environment
3. Create project scaffolding
4. Begin implementation

## References
- Tech Stack Selector: .claude/utils/tech-selector.md
- Scaffold Templates: .claude/utils/scaffold-templates/
```

## Tools to Use

- **greenfield-tech-evaluator**: Research and compare technology options with 2025 latest versions
- **AskUserQuestion**: Present options interactively and gather preferences
- **WebSearch**: Research latest framework versions, best practices, and community sentiment
- **Write**: Create the decision document

## Important Guidelines

1. **Hierarchical Decision Making**: Each decision informs the next (Frontend → Backend Lang → Backend Framework → Database)

2. **Database Independence**: Emphasize that database choice works with any backend language

3. **2025 Framework Knowledge**: Always reference latest versions:
   - Next.js 15, React 19
   - NestJS 11, FastAPI 0.119, Django 5.1
   - PostgreSQL 16, MongoDB 8, Redis 8
   - Go 1.21+, Python 3.11+, Rust 1.70+

4. **Trade-off Analysis**: Always present pros/cons for each option, never just recommend without rationale

5. **Team Context Matters**: Factor in team size, skills, and hiring constraints

6. **Cost Awareness**: Consider hosting costs, free tiers, and operational expenses

7. **MVP Focus**: Prioritize speed to market and simplicity over premature optimization

8. **Interactive Process**: Use AskUserQuestion extensively - don't assume preferences

9. **Document Everything**: Create comprehensive decision document with rationale for future reference

10. **Validate Compatibility**: Ensure all chosen technologies work well together

## Example Interaction Flow

```
Agent: "I understand you're building a SaaS web application for project management. Let me guide you through tech stack selection.

First, your team: You mentioned 2 developers with strong TypeScript experience. This will inform our choices.

For the frontend, since you need SEO for your marketing pages and a dashboard for logged-in users, I recommend Next.js 15. It gives you:
- SSR for marketing pages (great SEO)
- Client-side routing for dashboard
- API routes for simple backends
- Vercel deployment (very easy)

Does this align with your needs, or would you prefer a different approach?"

[User responds]

Agent: "Great! Now for the backend API. Given your TypeScript expertise and MVP timeline, I'd recommend staying in the TypeScript ecosystem. However, let me present the options:

[Presents TypeScript vs Go vs Python with trade-offs]

Which direction feels right for your team?"

[Continue through all decisions]
```

## Output Location

- **Decision Document**: `thoughts/shared/decisions/[project-name]-tech-stack.md`
- **Tech Stack Summary**: Include in project README or planning document

## Success Criteria

- [ ] All technology decisions made with clear rationale
- [ ] Decision document created and saved
- [ ] Trade-offs understood by user
- [ ] Team capabilities factored into decisions
- [ ] Cost implications documented
- [ ] Next steps identified
- [ ] All decisions compatible and proven to work together
