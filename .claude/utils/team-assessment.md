# Team Assessment Utility

## Purpose
Help users select technology stacks based on team size, skill levels, and hiring constraints.

## Team Size Recommendations

### Solo Developer (1 person)

**Recommended Stacks**:
1. **Next.js 15 Full-Stack** ⭐ Best Choice
   - Single framework for frontend + backend
   - Minimize context switching
   - Great community support
   - **Timeline**: Fastest to MVP

2. **Vite + FastAPI**
   - Simple, clean separation
   - Quick to prototype
   - Python is approachable
   - **Timeline**: Very fast

3. **Vite + Go/Gin**
   - Simple architecture
   - Great performance
   - If you know Go already
   - **Timeline**: Fast if experienced

**Avoid**:
- ❌ NestJS (too much ceremony for solo)
- ❌ Microservices (unnecessary complexity)
- ❌ Complex DevOps (stick to Vercel/Railway)
- ❌ Multiple databases
- ❌ GraphQL (unless specific need)

**Key Principle**: Maximize productivity, minimize context switching, choose full-stack frameworks.

**Timeline Impact**: Choose wrong (like NestJS) = +40% development time

---

### Small Team (2-3 developers)

**Recommended Stacks**:
1. **Next.js + Separate NestJS Backend**
   - Clear separation of concerns
   - One person on frontend, one on backend
   - Both TypeScript (shared knowledge)
   - **Timeline**: Good velocity

2. **Vite+React + Go/Gin**
   - Simple architecture
   - Frontend/backend split clear
   - Go is easy to learn for small team
   - **Timeline**: Very good

3. **Next.js + Python/FastAPI**
   - Full-stack on Next.js
   - Python for complex backend logic/ML
   - **Timeline**: Good

**Can Consider**:
- ✅ Basic microservices (2-3 services max)
- ✅ Monorepo setup (Turborepo, Nx)
- ✅ Shared component libraries

**Avoid**:
- ❌ Too many services (>3)
- ❌ Complex orchestration (Kubernetes)
- ❌ Multiple languages without strong reason

**Key Principle**: Enable parallel work, but keep architecture simple.

**Timeline Impact**: Good choice = on schedule. Over-engineering = +30% time.

---

### Medium Team (4-10 developers)

**Recommended Stacks**:
1. **NestJS + Next.js** ⭐ Best Choice
   - NestJS modular architecture scales well
   - Clear module boundaries
   - Dependency injection helps organization
   - TypeScript across stack
   - **Timeline**: Scales with team

2. **Go Microservices + React**
   - Module-per-service
   - Clear ownership boundaries
   - Go's simplicity helps consistency
   - **Timeline**: Good if well-planned

3. **Monorepo with Multiple Apps**
   - Turborepo or Nx
   - Shared libraries
   - Clear app boundaries
   - **Timeline**: Excellent for coordination

**Should Have**:
- ✅ Module ownership (1-2 devs per module)
- ✅ API contracts and documentation
- ✅ Code review process
- ✅ CI/CD per module
- ✅ Shared component library

**Can Consider**:
- ✅ Microservices (3-5 services)
- ✅ Event-driven architecture
- ✅ BFF (Backend for Frontend) pattern

**Avoid**:
- ❌ Monolith without modules
- ❌ Too many services (>8)

**Key Principle**: Structure prevents stepping on toes. Clear boundaries enable parallel work.

**Timeline Impact**: Good structure = linear scaling. Poor structure = +50% time due to conflicts.

---

### Large Team (10+ developers)

**Recommended Architecture**:
1. **Microservices with Clear Boundaries**
   - One team per service (2-3 devs)
   - Independent deployment
   - API contracts first
   - **Timeline**: Enables parallel work

2. **Multiple Repositories**
   - Clear ownership
   - Independent versioning
   - Reduced merge conflicts
   - **Timeline**: Best for large teams

3. **Strong API Contracts**
   - OpenAPI/GraphQL schemas
   - Contract testing
   - Versioned APIs
   - **Timeline**: Prevents breaking changes

**Must Have**:
- ✅ Service mesh or API gateway
- ✅ Comprehensive monitoring
- ✅ Distributed tracing
- ✅ Service ownership model
- ✅ Platform team (if >20 devs)
- ✅ Shared infrastructure tools

**Architecture Patterns**:
- ✅ Event sourcing (if applicable)
- ✅ CQRS (if complex domain)
- ✅ Saga pattern (distributed transactions)
- ✅ Circuit breakers and retries

**Key Principle**: Independence, clear boundaries, strong contracts.

**Timeline Impact**: Microservices overhead = -20% initially, but +100% scaling capability.

---

## Skill Level Assessment

### All Beginners (Junior Team)

**Recommended Languages**:
1. **JavaScript/TypeScript** ⭐ Best Choice
   - Most learning resources available
   - Huge community
   - Easy to find help
   - Can do full-stack
   - **Ramp-up**: 1-2 weeks

2. **Python**
   - Very beginner-friendly
   - Great for backend
   - Readable code
   - **Ramp-up**: 1-2 weeks

**Recommended Frameworks**:
- ✅ Next.js (opinionated, less decisions)
- ✅ FastAPI (clear docs, modern Python)
- ✅ Django (batteries included)

**Avoid**:
- ❌ Rust (steep learning curve)
- ❌ Complex Go patterns
- ❌ Advanced TypeScript (generics, decorators)
- ❌ Microservices
- ❌ GraphQL (unless strong reason)

**Support Strategies**:
- Use opinionated frameworks (less decisions)
- Extensive code reviews
- Pair programming
- Strong documentation
- External mentorship if possible

**Timeline Impact**: +50% for learning curve. Choose wrong stack (Rust) = +100%.

---

### Mixed Experience (1-2 Seniors + Juniors)

**Strategy**: Match stack to strongest developer's expertise

**Recommended Approach**:
1. **Senior's strength becomes team standard**
   - If senior knows Go → Go backend
   - If senior knows TypeScript → Full TS stack
   - Juniors learn from senior

2. **Pair Programming**
   - Junior + Senior on complex features
   - Knowledge transfer built into workflow
   - **Ramp-up**: 2-4 weeks

3. **Progressive Complexity**
   - Start juniors on simple CRUD
   - Gradually increase complexity
   - Senior handles architecture/complex logic

**Recommended Stacks**:
- ✅ TypeScript full-stack (most resources for juniors)
- ✅ Go + React (if senior knows Go well)
- ✅ Python + React (approachable)

**Timeline Impact**: +25% for ramp-up. With good mentorship, juniors productive in 3-4 weeks.

---

### All Experienced (Senior Team)

**Freedom**: Choose best tool for the job

**Considerations**:
1. **Problem fit over familiarity**
   - High-performance needs? → Go or Rust
   - Rapid development? → TypeScript or Python
   - ML/AI features? → Python

2. **Learning new tech is OK**
   - Seniors adapt quickly
   - New tech can improve architecture
   - **Ramp-up**: 1-2 weeks for new language

3. **Avoid over-engineering**
   - Seniors sometimes over-architect
   - Start simple, refactor later
   - MVP doesn't need perfect architecture

**Timeline Impact**: Minimal (+10% for new tech). Can ship faster than junior teams despite learning.

---

## Hiring Difficulty (2025 Market)

### Very Easy to Hire

**JavaScript/TypeScript**: ⭐⭐⭐⭐⭐
- **Availability**: 10/10
- **Cost**: $70k-150k (US market)
- **Quality**: Wide range (easy to find good devs)
- **Time to hire**: 2-4 weeks

**Python**: ⭐⭐⭐⭐⭐
- **Availability**: 9/10
- **Cost**: $80k-160k
- **Quality**: Wide range
- **Time to hire**: 2-4 weeks

**React**: ⭐⭐⭐⭐⭐
- **Availability**: 10/10 (most popular frontend)
- **Cost**: $80k-150k
- **Quality**: Wide range
- **Time to hire**: 1-3 weeks

### Moderate Difficulty

**Go**: ⭐⭐⭐
- **Availability**: 6/10 (growing rapidly)
- **Cost**: $90k-170k (15% premium)
- **Quality**: Generally higher (self-selected)
- **Time to hire**: 4-8 weeks

**Full-Stack Engineers**: ⭐⭐⭐
- **Availability**: 5/10 (everyone wants them)
- **Cost**: $100k-180k (premium for both skills)
- **Quality**: Wide range
- **Time to hire**: 6-12 weeks

**Senior Frontend (React)**: ⭐⭐⭐
- **Availability**: 6/10
- **Cost**: $120k-200k
- **Quality**: High
- **Time to hire**: 6-10 weeks

### Difficult to Hire

**Rust**: ⭐⭐
- **Availability**: 3/10 (small community)
- **Cost**: $110k-200k (30% premium)
- **Quality**: Very high (Rust attracts strong devs)
- **Time to hire**: 12-20 weeks
- **Risk**: May need to train existing team

**Specialized Frameworks** (GraphQL experts, Nest.js specialists): ⭐⭐
- **Availability**: 4/10
- **Cost**: $100k-180k
- **Time to hire**: 8-16 weeks
- **Alternative**: Hire strong generalist and train

**DevOps/Platform Engineers**: ⭐⭐
- **Availability**: 4/10 (high demand)
- **Cost**: $110k-190k
- **Time to hire**: 8-16 weeks

---

## Ramp-up Time Estimates

### Junior Developer (0-2 years experience)

**JavaScript/TypeScript**:
- Basic proficiency: 1-2 weeks
- Productive contributor: 4-6 weeks
- Independent work: 8-12 weeks

**Python**:
- Basic proficiency: 1-2 weeks
- Productive contributor: 3-5 weeks
- Independent work: 8-10 weeks

**Go**:
- Basic proficiency: 3-4 weeks
- Productive contributor: 6-8 weeks
- Independent work: 12-16 weeks

**Rust**:
- Basic proficiency: 8-12 weeks
- Productive contributor: 16-20 weeks
- Independent work: 24+ weeks

### Mid-level Developer (2-5 years experience)

**JavaScript/TypeScript**:
- Basic proficiency: 3-5 days
- Productive contributor: 2-3 weeks
- Expert level: 8-12 weeks

**Python**:
- Basic proficiency: 3-5 days
- Productive contributor: 2-3 weeks
- Expert level: 6-10 weeks

**Go**:
- Basic proficiency: 1-2 weeks
- Productive contributor: 4-6 weeks
- Expert level: 12-16 weeks

**Rust**:
- Basic proficiency: 4-6 weeks
- Productive contributor: 10-14 weeks
- Expert level: 24+ weeks

### Senior Developer (5+ years experience)

**New Language/Framework**:
- Basic proficiency: 2-5 days
- Productive contributor: 1-2 weeks
- Expert level: 4-8 weeks

**Note**: Seniors adapt quickly but may need time to learn ecosystem best practices.

---

## Questions to Ask User

Use these questions to gather team context for recommendations:

### Team Composition
1. **How many developers will work on this project?**
   - Solo
   - 2-3
   - 4-10
   - 10+

2. **What's your team's experience level?**
   - Mostly juniors (0-2 years)
   - Mixed (juniors + some seniors)
   - Mostly mid-level (2-5 years)
   - Mostly seniors (5+ years)

### Existing Skills
3. **What languages is your team strongest in?**
   - JavaScript/TypeScript
   - Python
   - Go
   - Rust
   - Other: ______

4. **What frameworks has your team used?**
   - React/Next.js
   - Vue/Nuxt
   - Django/Flask/FastAPI
   - Node.js (Express/NestJS)
   - Go frameworks
   - None

### Learning & Hiring
5. **Is your team open to learning new technologies?**
   - Yes, excited to learn
   - Yes, if necessary
   - Prefer familiar tech
   - No, must use existing skills

6. **Will you need to hire developers for this project?**
   - No, existing team only
   - Maybe 1-2 developers
   - Yes, will hire 3-5
   - Yes, building large team (5+)

### Timeline & Budget
7. **What's your timeline pressure?**
   - Ship MVP in 1-2 months (urgent)
   - Ship MVP in 3-6 months (normal)
   - Ship MVP in 6-12 months (relaxed)
   - No specific deadline

8. **Can you afford time for learning curve?**
   - No, must ship ASAP
   - Can afford 2-4 weeks
   - Can afford 1-2 months
   - Timeline is flexible

---

## Decision Matrix by Team Profile

### Solo Developer
| Factor | TypeScript | Go | Python | Rust |
|--------|-----------|-----|--------|------|
| Learning Resources | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Full-Stack Capability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Context Switching | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Community Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Recommendation** | **Best** | Good | Very Good | Avoid |

### 2-3 Person Team
| Factor | TypeScript | Go | Python | Rust |
|--------|-----------|-----|--------|------|
| Hiring Ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Collaboration Tools | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Clear Boundaries | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Ramp-up Speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **Recommendation** | **Best** | Very Good | Very Good | Risky |

### 4-10 Person Team
| Factor | TypeScript | Go | Python | Rust |
|--------|-----------|-----|--------|------|
| Hiring Ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Modular Architecture | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Scaling Team | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Tooling Ecosystem | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Recommendation** | **Best** | Very Good | Good | Risky |

### 10+ Person Team
| Factor | TypeScript | Go | Python | Rust |
|--------|-----------|-----|--------|------|
| Hiring Ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Microservices Support | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Enterprise Patterns | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Team Scaling | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Recommendation** | **Best** | Very Good | Good | Niche Cases |

---

## Team Anti-Patterns to Avoid

### Anti-Pattern 1: Rust for Junior Team
**Problem**: 8-12 week ramp-up kills velocity
**Impact**: +100% timeline
**Solution**: Use TypeScript/Python, introduce Rust later if needed

### Anti-Pattern 2: Microservices for Small Team (<5 devs)
**Problem**: More infrastructure than features
**Impact**: +50% complexity, slower development
**Solution**: Start with monolith, split later

### Anti-Pattern 3: Multiple Languages Without Reason
**Problem**: Context switching, hiring difficulty
**Impact**: +30% overhead
**Solution**: TypeScript full-stack, or frontend language + Go backend

### Anti-Pattern 4: Over-Engineering for Solo Dev
**Problem**: Spending time on architecture instead of features
**Impact**: +40% development time
**Solution**: Next.js full-stack, ship features fast

### Anti-Pattern 5: No Structure for Large Team
**Problem**: Merge conflicts, stepping on toes
**Impact**: +50% time, team frustration
**Solution**: Microservices or well-modularized monolith

---

## Integration with Tech Selection

When presenting tech stack options, include team implications:

```markdown
**Option 1: Next.js Full-Stack**
✅ Pros: One framework, minimal context switching
❌ Cons: Vendor lock-in, scales to ~$200/month
👥 Team: Perfect for solo dev or small team (1-3)
📚 Ramp-up: 1-2 weeks for experienced React dev
💼 Hiring: Very easy (huge React talent pool)

**Option 2: Go + React**
✅ Pros: Great performance, clear separation
❌ Cons: Two languages, more initial setup
👥 Team: Good for 2+ developers with clear roles
📚 Ramp-up: 3-4 weeks for Go beginners
💼 Hiring: Moderate (Go devs in demand but available)

**Option 3: Rust + React**
✅ Pros: Maximum performance and safety
❌ Cons: Very steep learning curve
👥 Team: Requires senior developers or long timeline
📚 Ramp-up: 8-12 weeks for Rust beginners
💼 Hiring: Difficult (small Rust talent pool)
⚠️ Warning: Only recommend if team has Rust experience
```

---

## Quick Reference: Team Size → Stack Recommendation

| Team Size | Best Choice | Good Alternative | Avoid |
|-----------|-------------|------------------|-------|
| Solo (1) | Next.js full-stack | Vite + FastAPI | NestJS, Microservices |
| Small (2-3) | Next.js + NestJS | Vite + Go/Gin | Complex architectures |
| Medium (4-10) | NestJS monolith | Go microservices | Rust (unless experienced) |
| Large (10+) | Microservices (TS/Go) | Modular monolith | Single monolith |

---

**Note**: These are guidelines, not rules. Exceptional teams can succeed with any stack. The key is honest assessment of team capabilities and choosing technologies that enable success, not hinder it.
