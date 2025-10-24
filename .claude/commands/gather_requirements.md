---
description: Gather and decompose requirements for greenfield projects
model: sonnet
---

# Requirements Gathering

Interactive requirements gathering session using hybrid structured/free-form approach for greenfield MVP development.

## Initial Response

When invoked, respond with:
```
Let's gather requirements for your greenfield MVP! I'll help you structure your ideas and identify what's essential.

Start by describing your project in your own words:
- What problem does it solve?
- Who are your users?
- What's the core value proposition?

Don't worry about being perfectly structured - I'll help organize your thoughts!
```

## Process

### 1. Start with Open-Ended Discussion
- Let user describe their vision naturally
- Listen for key themes and problems
- Identify core value proposition
- Understand target users

### 2. Extract Key Requirements
Use **greenfield-requirements-decomposer** agent to:
- Parse requirements from user's description
- Categorize into functional vs non-functional
- Identify core features vs nice-to-haves
- Detect ambiguities and conflicts

### 3. Create Formal User Stories
For each feature, create user stories using INVEST criteria:
```
**As a** [user type]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria**:
- [ ] [Specific testable criterion]
- [ ] [Another criterion]

**Edge Cases**:
- What if [scenario]?
- How to handle [error case]?

**Complexity**: [Low/Medium/High]
**Priority**: [Must-have/Should-have/Could-have/Won't-have]
**Dependencies**: [Other stories this depends on]
```

### 4. Identify Ambiguities and Clarify
Use **AskUserQuestion** tool frequently to:
- Clarify feature priorities
- Understand user workflows
- Define acceptance criteria
- Identify edge cases
- Determine performance requirements
- Understand security needs
- Clarify scalability expectations

### 5. Prioritize for MVP Scope
Apply **MoSCoW Method**:
- **Must have**: Core functionality, MVP can't work without it
- **Should have**: Important but not critical for MVP
- **Could have**: Nice to have if time permits
- **Won't have**: Explicitly out of scope for MVP

Interactive questioning:
```
For each feature, ask:
- Is this essential for the core value proposition?
- Can users get value without this feature?
- What's the risk of deferring this to post-MVP?
```

### 6. Generate Requirements Document
Create structured document using template from `.claude/utils/requirements-templates.md`

## Interactive Questions to Ask

### Problem Validation
- "What's the core problem you're solving?"
- "How do users solve this problem today?"
- "What makes your solution better/different?"

### User Understanding
- "Who is your primary user persona?"
- "What are their goals and pain points?"
- "How will they discover and start using your product?"

### Feature Prioritization
- "If you could only build ONE feature, what would it be?"
- "What features are nice-to-have vs must-have?"
- "What can be added post-MVP?"

### Success Metrics
- "How will you measure success?"
- "What's the key metric that matters most?"
- "What would 'good adoption' look like?"

### Constraints
- "What's your timeline for MVP?"
- "What's your budget for initial deployment?"
- "Do you have any compliance requirements (GDPR, HIPAA, etc.)?"
- "What's your team size and skill level?"

### Technical Requirements
- "What performance expectations do you have?"
- "How many users do you expect initially? At 6 months?"
- "Do you need mobile access?"
- "Do you need offline capabilities?"
- "What integrations are required?"

## Output Templates

### Option 1: MVP Requirements Document
Use when project is well-defined:
```markdown
# [Project Name] MVP Requirements

## Executive Summary
[2-3 sentences describing the project]

## Problem Statement
[What problem are we solving?]

## Target Users
[Who are we building for?]

## Core Value Proposition
[Why will users choose this?]

## Functional Requirements

### Must Have (MVP Core)
1. [Feature 1]
   - User story
   - Acceptance criteria
   - Priority: MUST HAVE

### Should Have (MVP Nice-to-Have)
[Features that strengthen MVP but aren't critical]

### Won't Have (Post-MVP)
[Explicitly deferred features]

## Non-Functional Requirements
- **Performance**: [targets]
- **Security**: [requirements]
- **Scalability**: [initial + future]
- **Usability**: [standards]

## Success Metrics
- [Metric 1]
- [Metric 2]

## Constraints
- Timeline: [duration]
- Budget: [range]
- Team: [size/skills]

## Open Questions
- [ ] [Question 1]
- [ ] [Question 2]

## Assumptions
- [Assumption 1]
- [Assumption 2]

## Out of Scope
- [Explicitly not included]
```

### Option 2: Quick MVP Canvas
Use for rapid prototyping:
```markdown
# Quick MVP Canvas

**Problem**: [One sentence]
**Solution**: [One sentence]
**Users**: [Who]
**Core Feature**: [The ONE essential feature]
**Success Metric**: [How we measure success]

**MVP Features** (Must Have):
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

**Post-MVP** (Defer):
- [Future feature 1]
- [Future feature 2]
```

## Tools to Use

- **greenfield-requirements-decomposer**: Parse and structure requirements
- **AskUserQuestion**: Clarify ambiguities and priorities interactively
- **TodoWrite**: Track requirements gathering progress

## Output Location

Save requirements to: `thoughts/shared/requirements/[project-name]-requirements.md`

## Important Guidelines

1. **Start Unstructured**: Let users describe their vision naturally first
2. **Ask Questions**: Use AskUserQuestion extensively to clarify
3. **Focus on MVP**: Constantly push for minimum viable scope
4. **INVEST Criteria**: User stories should be Independent, Negotiable, Valuable, Estimable, Small, Testable
5. **Acceptance Criteria**: Make every requirement testable
6. **Edge Cases**: Identify error scenarios and edge cases early
7. **Dependencies**: Map dependencies between features
8. **Non-Functional Requirements**: Don't forget performance, security, scalability
9. **Constraints Matter**: Timeline, budget, team size heavily impact scope
10. **Document Assumptions**: Be explicit about what you're assuming

## Example Interaction

```
User: "I want to build a task management app"

Agent: "Great! Let me help you define the requirements. A few questions:

1. Who are your target users?
   - Individual users managing personal tasks?
   - Teams collaborating on projects?
   - Enterprises with complex workflows?

2. What's the ONE core feature that makes this valuable?
   - Is it the task organization system?
   - Real-time collaboration?
   - Smart prioritization?
   - Integration with other tools?

3. What's your timeline for launching the MVP?"

[User responds]

Agent: "Based on your answers, here's what I'm hearing as MUST-HAVE for MVP:
- User authentication
- Create/edit/delete tasks
- Basic task organization (lists or tags)
- Mark tasks complete

And these seem like SHOULD-HAVE (post-MVP):
- Team collaboration features
- Mobile apps
- Third-party integrations

Does this prioritization align with your vision?"
```
