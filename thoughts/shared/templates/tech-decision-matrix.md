# Tech Stack Decision Matrix

Use this template to systematically evaluate technology options for your greenfield MVP project.

## Project Context

**Project Name**: _______________________
**Project Type**: (Web app / Mobile app / API / CLI / Other)
**Timeline**: _______ months to MVP
**Team Size**: _______ developers
**Budget**: $_______ per month

---

## Evaluation Criteria

Customize weights based on your project priorities (must total 100%):

| Criterion | Weight | Option 1 | Option 2 | Option 3 | Option 4 |
|-----------|--------|----------|----------|----------|----------|
| **Performance** | 25% | | | | |
| **Development Velocity** | 25% | | | | |
| **Scalability** | 20% | | | | |
| **Team Skills Match** | 15% | | | | |
| **Ecosystem Maturity** | 10% | | | | |
| **Hosting Cost** | 5% | | | | |
| **TOTAL SCORE** | 100% | **___** | **___** | **___** | **___** |

---

## Scoring Guide

Rate each option on a scale of 1-5:

- **5**: Excellent - Best in class, no concerns
- **4**: Good - Strong choice with minor trade-offs
- **3**: Adequate - Meets requirements, notable compromises
- **2**: Poor - Significant concerns or limitations
- **1**: Very Poor - Major issues, avoid if possible

**How to calculate weighted score**:
```
Weighted Score = (Rating × Weight) / 100
Total Score = Sum of all weighted scores
```

**Example**:
- Performance rating: 4, Weight: 25% → Weighted: 1.0
- Dev Velocity rating: 5, Weight: 25% → Weighted: 1.25
- Total: 1.0 + 1.25 + ... = Final Score

---

## Decision Matrix Example: Backend Language Selection

### Project Context
- **Project**: SaaS Analytics Platform
- **Timeline**: 6 months to MVP
- **Team**: 3 developers (2 mid-level, 1 senior)
- **Budget**: $100/month

### Evaluation

| Criterion | Weight | TypeScript | Go | Python | Rust |
|-----------|--------|-----------|-----|--------|------|
| **Performance** | 20% | 3 (0.60) | 5 (1.00) | 2 (0.40) | 5 (1.00) |
| **Dev Velocity** | 30% | 5 (1.50) | 3 (0.90) | 5 (1.50) | 2 (0.60) |
| **Scalability** | 15% | 3 (0.45) | 5 (0.75) | 3 (0.45) | 5 (0.75) |
| **Team Skills** | 25% | 5 (1.25) | 2 (0.50) | 4 (1.00) | 1 (0.25) |
| **Ecosystem** | 5% | 5 (0.25) | 3 (0.15) | 5 (0.25) | 2 (0.10) |
| **Hosting Cost** | 5% | 3 (0.15) | 5 (0.25) | 3 (0.15) | 5 (0.25) |
| **TOTAL** | **100%** | **4.20** | **3.55** | **3.75** | **2.95** |

### Scoring Rationale

#### TypeScript (Winner: 4.20)
- **Performance (3)**: Good enough for MVP, not CPU-intensive
- **Dev Velocity (5)**: Team already knows it, fastest development
- **Scalability (3)**: Adequate for initial scale, can optimize later
- **Team Skills (5)**: Perfect match, entire team experienced
- **Ecosystem (5)**: Massive npm ecosystem, any library needed available
- **Hosting Cost (3)**: Moderate (more memory than Go/Rust)

**Why it wins**: Team expertise + rapid development outweigh performance concerns for MVP phase.

#### Go (Second: 3.55)
- **Performance (5)**: Excellent, highly concurrent
- **Dev Velocity (3)**: 3-4 week ramp-up for team
- **Scalability (5)**: Built for scale
- **Team Skills (2)**: Only senior knows it, others would need training
- **Ecosystem (3)**: Growing but smaller than TS/Python
- **Hosting Cost (5)**: Very efficient, low memory

**Why it didn't win**: Team learning curve too steep for 6-month timeline.

#### Python (Third: 3.75)
- **Performance (2)**: GIL limitations for concurrent workloads
- **Dev Velocity (5)**: Very fast prototyping
- **Scalability (3)**: Can scale but requires careful architecture
- **Team Skills (4)**: Team knows it moderately well
- **Ecosystem (5)**: Huge ecosystem, especially for data/analytics
- **Hosting Cost (3)**: Moderate

**Why it didn't win**: Performance concerns for analytics workload + TypeScript team expertise.

#### Rust (Last: 2.95)
- **Performance (5)**: Best possible performance
- **Dev Velocity (2)**: Very slow development, steep learning curve
- **Scalability (5)**: Excellent for scale
- **Team Skills (1)**: Nobody on team knows Rust
- **Ecosystem (2)**: Limited web ecosystem
- **Hosting Cost (5)**: Most efficient

**Why it didn't win**: 8-12 week ramp-up would consume half the timeline.

---

## Decision Rationale Template

Use this template after scoring to document your decision:

### Final Decision: [Technology Name]

**Score**: ____ / 5.0

**Why this choice**:
1. [Primary reason aligned with highest-weight criteria]
2. [Secondary reason]
3. [Mitigating factor for main weakness]

**Accepted Trade-offs**:
- [What you're giving up]: [Why it's acceptable]
- [Another trade-off]: [Mitigation strategy]

**Alternative considered**: [Second-place option]
- Why not chosen: [Key differentiator]
- When to revisit: [Conditions that would trigger reconsideration]

**Risk Management**:
- **Risk 1**: [Potential issue]
  - **Mitigation**: [How you'll address it]
- **Risk 2**: [Another concern]
  - **Mitigation**: [Mitigation approach]

**Success Metrics**:
- [ ] Metric 1: [How you'll measure success of this decision]
- [ ] Metric 2: [Another validation metric]
- [ ] Revisit decision if: [Specific trigger for reconsideration]

---

## Common Weight Profiles

Choose a profile that matches your project priorities:

### Speed to Market (Startup MVP)
- Development Velocity: 35%
- Team Skills Match: 30%
- Ecosystem Maturity: 20%
- Performance: 10%
- Hosting Cost: 5%

**Best for**: Early-stage startups, unvalidated ideas, tight timelines

---

### High Performance (Technical Product)
- Performance: 40%
- Scalability: 30%
- Development Velocity: 15%
- Team Skills Match: 10%
- Hosting Cost: 5%

**Best for**: APIs, data processing, real-time systems, gaming

---

### Balanced Production (SaaS)
- Development Velocity: 25%
- Performance: 25%
- Scalability: 20%
- Team Skills Match: 15%
- Ecosystem Maturity: 10%
- Hosting Cost: 5%

**Best for**: SaaS applications, production systems, balanced priorities

---

### Cost-Optimized (Side Project)
- Hosting Cost: 30%
- Development Velocity: 30%
- Team Skills Match: 25%
- Performance: 10%
- Scalability: 5%

**Best for**: Side projects, bootstrapped startups, hobby projects

---

### Enterprise (Stability Focus)
- Ecosystem Maturity: 30%
- Team Skills Match: 25%
- Scalability: 20%
- Performance: 15%
- Development Velocity: 10%

**Best for**: Enterprise software, long-term projects, large teams

---

## Multi-Layer Decision Process

For complex stacks, evaluate each layer separately:

### Layer 1: Frontend Framework
| Criterion | Weight | Next.js | Remix | Vite+React |
|-----------|--------|---------|-------|------------|
| ... | ... | ... | ... | ... |

**Decision**: ___________

---

### Layer 2: Backend Language
| Criterion | Weight | TypeScript | Go | Python | Rust |
|-----------|--------|-----------|-----|--------|------|
| ... | ... | ... | ... | ... | ... |

**Decision**: ___________

---

### Layer 3: Backend Framework
(Populate based on Layer 2 choice)

**Decision**: ___________

---

### Layer 4: Database
| Criterion | Weight | PostgreSQL | MongoDB | DynamoDB |
|-----------|--------|-----------|---------|----------|
| ... | ... | ... | ... | ... |

**Decision**: ___________

---

## Integration with Other Utilities

After completing this decision matrix, cross-reference with:

1. **Cost Calculator** (`.claude/utils/cost-calculator.md`)
   - Validate hosting cost ratings against actual 2025 pricing
   - Check if your choices fit within budget constraints

2. **Team Assessment** (`.claude/utils/team-assessment.md`)
   - Verify team skills ratings are accurate
   - Confirm ramp-up time fits timeline

3. **Tech Selector** (`.claude/utils/tech-selector.md`)
   - Review trade-offs for chosen technologies
   - Ensure no critical anti-patterns missed

---

## Decision Change Log

Track when and why decisions change:

| Date | Change | Previous | New | Reason |
|------|--------|----------|-----|---------|
| YYYY-MM-DD | Backend Language | TypeScript | Go | Performance issues at scale |
| YYYY-MM-DD | Database | MongoDB | PostgreSQL | Need ACID compliance |

---

## Notes

- **Subjectivity**: Scoring involves judgment - be honest and consistent
- **Bias**: Avoid anchoring on familiar tech - evaluate objectively
- **Revisit**: Technology landscape changes - revisit every 6-12 months
- **Team Input**: Get scoring input from multiple team members
- **Document**: Save completed matrices in version control for reference

---

**Template Version**: 1.0
**Last Updated**: 2025-10-24
**Compatible With**: Greenfield MVP Transformation System
