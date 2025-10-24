# Requirements Templates

This utility provides structured templates for gathering and documenting requirements for greenfield MVP projects.

---

## Template 1: MVP Requirements Document

```markdown
# [Project Name] Requirements Document

**Project Type**: [Web App / Mobile App / API / CLI / Desktop]
**Target Launch**: [Date or Timeline]
**Team Size**: [Number of developers]
**Last Updated**: [Date]

---

## Executive Summary

[1-2 paragraph overview of the project]
- What problem does it solve?
- Who are the target users?
- What makes this solution unique?

---

## Functional Requirements

### Core Features (MVP - Must Have)

#### Feature 1: [Feature Name]
- **User Story**: As a [user type], I want to [action] so that [benefit]
- **Acceptance Criteria**:
  - [ ] Criterion 1: [Specific, testable requirement]
  - [ ] Criterion 2: [Specific, testable requirement]
  - [ ] Criterion 3: [Specific, testable requirement]
- **Priority**: Must-have
- **Complexity**: [Low / Medium / High]
- **Dependencies**: [Other features or systems]

#### Feature 2: [Feature Name]
- **User Story**: As a [user type], I want to [action] so that [benefit]
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Priority**: Must-have
- **Complexity**: [Low / Medium / High]
- **Dependencies**: [Other features or systems]

### Future Features (Post-MVP - Nice to Have)

#### Feature A: [Feature Name]
- **Description**: [Brief description]
- **Priority**: Should-have / Could-have
- **Planned for**: [Version or timeline]

#### Feature B: [Feature Name]
- **Description**: [Brief description]
- **Priority**: Should-have / Could-have
- **Planned for**: [Version or timeline]

---

## Non-Functional Requirements

### Performance
- **Response Time**: < [X]ms for API calls
- **Page Load Time**: < [X]s for initial load
- **Concurrent Users**: Support [N] concurrent users
- **Data Volume**: Handle [amount] of data
- **Uptime**: [X]% uptime SLA

### Security
- **Authentication Method**: [OAuth 2.0 / JWT / API Keys / Other]
- **Authorization Model**: [RBAC / ABAC / Custom]
- **Data Encryption**:
  - At rest: [Yes/No - Method]
  - In transit: [TLS 1.3]
- **Password Policy**: [Requirements]
- **Session Management**: [Details]
- **Compliance**: [GDPR / HIPAA / SOC2 / Other]

### Scalability
- **Initial Scale**: [users/requests per day]
- **Growth Expectations**: [X% growth per month/year]
- **Scaling Strategy**: [Vertical / Horizontal / Auto-scaling]
- **Database Scaling**: [Read replicas / Sharding / Other]

### Usability
- **Target Response Time**: [X seconds for user actions]
- **Browser Support**: [Chrome, Firefox, Safari, Edge versions]
- **Mobile Support**: [Responsive / Native app / PWA]
- **Accessibility**: [WCAG 2.1 Level A/AA/AAA]
- **Internationalization**: [Languages supported]

### Reliability
- **Error Handling**: [Strategy]
- **Backup Strategy**: [Frequency and retention]
- **Disaster Recovery**: [RTO and RPO targets]
- **Monitoring**: [Tools and metrics]

---

## User Personas

### Primary Persona: [Name/Role]
- **Demographics**: [Age, location, technical skill level]
- **Goals**:
  - [Primary goal 1]
  - [Primary goal 2]
- **Pain Points**:
  - [Pain point 1]
  - [Pain point 2]
- **How they'll use the product**: [Description]

### Secondary Persona: [Name/Role]
- **Demographics**: [Details]
- **Goals**: [List goals]
- **Pain Points**: [List pain points]
- **How they'll use the product**: [Description]

---

## Success Metrics

### Business Metrics
- [ ] **User Acquisition**: [Target number] users in [timeframe]
- [ ] **User Engagement**: [X]% DAU/MAU ratio
- [ ] **Conversion Rate**: [X]% of visitors sign up
- [ ] **Revenue**: $[amount] in [timeframe]

### Technical Metrics
- [ ] **API Response Time**: < [X]ms average
- [ ] **Error Rate**: < [X]%
- [ ] **Uptime**: > [X]%
- [ ] **Test Coverage**: > [X]%

### User Experience Metrics
- [ ] **Time to First Action**: < [X] seconds
- [ ] **Task Completion Rate**: > [X]%
- [ ] **User Satisfaction**: [X]/10 or [X]% positive

---

## Constraints

### Timeline
- **MVP Launch**: [Date]
- **Beta Launch**: [Date]
- **Major Milestones**:
  - [Milestone 1]: [Date]
  - [Milestone 2]: [Date]

### Budget
- **Development Budget**: $[amount]
- **Infrastructure Budget**: $[amount/month]
- **Third-party Services**: $[amount/month]

### Team
- **Team Size**: [Number] developers
- **Skill Sets**: [Technologies team knows]
- **Availability**: [Full-time / Part-time / Contract]

### Technology Constraints
- **Existing Systems**: [Systems to integrate with]
- **Required Technologies**: [Must-use technologies]
- **Avoided Technologies**: [Technologies to avoid and why]

---

## Dependencies

### External Services
- [ ] **Service 1**: [Name and purpose]
- [ ] **Service 2**: [Name and purpose]

### Third-party APIs
- [ ] **API 1**: [Name and purpose]
- [ ] **API 2**: [Name and purpose]

### Data Sources
- [ ] **Source 1**: [Name and details]
- [ ] **Source 2**: [Name and details]

---

## Open Questions

- [ ] **Question 1**: [Question needing clarification]
- [ ] **Question 2**: [Question needing clarification]
- [ ] **Question 3**: [Question needing clarification]

---

## Assumptions

- Assumption 1: [What we're assuming to be true]
- Assumption 2: [What we're assuming to be true]
- Assumption 3: [What we're assuming to be true]

---

## Out of Scope

Explicitly **NOT** included in MVP:

- ❌ Feature X: [Reason why it's out of scope]
- ❌ Feature Y: [Reason why it's out of scope]
- ❌ Integration Z: [Reason why it's out of scope]

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How to mitigate] |
| [Risk 2] | High/Med/Low | High/Med/Low | [How to mitigate] |
| [Risk 3] | High/Med/Low | High/Med/Low | [How to mitigate] |

---

## Approval

- **Stakeholder 1**: [Approved / Pending]
- **Stakeholder 2**: [Approved / Pending]
- **Final Approval Date**: [Date]
```

---

## Template 2: User Story Format

```markdown
## User Story: [Story Title]

**As a** [user type/persona]
**I want to** [action/goal]
**So that** [benefit/value]

### Acceptance Criteria

**Given** [initial context]
**When** [action occurs]
**Then** [expected outcome]

**Given** [another context]
**When** [another action]
**Then** [another outcome]

### Additional Details

- **Epic**: [Related epic name]
- **Priority**: Must-have / Should-have / Could-have / Won't-have
- **Complexity**: [Story points or T-shirt size: XS/S/M/L/XL]
- **Dependencies**: [Other stories this depends on]
- **Estimated Effort**: [Hours or days]

### Edge Cases

- **What if** [scenario 1]? → [Expected behavior]
- **What if** [scenario 2]? → [Expected behavior]
- **How to handle** [error case]? → [Error handling strategy]

### Technical Notes

- [Implementation considerations]
- [API endpoints needed]
- [Database changes required]

### Definition of Done

- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] QA testing completed
- [ ] Product owner approved
```

---

## Template 3: Feature Specification

```markdown
# Feature: [Feature Name]

## Overview
[1-2 sentence description of the feature]

## User Value
**Problem**: [What problem does this solve?]
**Solution**: [How does this feature solve it?]
**Impact**: [What's the expected outcome?]

## User Flow

1. User starts at [location]
2. User performs [action]
3. System responds with [feedback]
4. User sees [result]
5. User can now [next action]

## Functional Requirements

### Input
- **Field 1**: [Type, validation rules, required/optional]
- **Field 2**: [Type, validation rules, required/optional]

### Processing
- **Step 1**: [What happens internally]
- **Step 2**: [What happens internally]

### Output
- **Success Case**: [What user sees]
- **Error Cases**:
  - [Error type 1]: [Error message and recovery]
  - [Error type 2]: [Error message and recovery]

## Technical Design

### API Endpoints

#### Endpoint 1
- **Method**: GET/POST/PUT/DELETE
- **Path**: `/api/v1/resource`
- **Request**:
  ```json
  {
    "field": "value"
  }
  ```
- **Response**:
  ```json
  {
    "data": {},
    "meta": {}
  }
  ```
- **Error Codes**: 400, 401, 404, 500

### Database Changes

#### New Table/Collection
```sql
CREATE TABLE feature_data (
  id UUID PRIMARY KEY,
  field1 VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Modified Table/Collection
- **Table**: [name]
- **Changes**: [what's being added/modified]

### Frontend Components

- **Component 1**: [Name and purpose]
- **Component 2**: [Name and purpose]

## Testing Strategy

### Unit Tests
- [ ] Test [scenario 1]
- [ ] Test [scenario 2]

### Integration Tests
- [ ] Test [integration point 1]
- [ ] Test [integration point 2]

### E2E Tests
- [ ] Test [user flow 1]
- [ ] Test [user flow 2]

## Documentation Needs
- [ ] API documentation
- [ ] User guide
- [ ] Developer documentation

## Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
```

---

## Template 4: Quick MVP Canvas

```markdown
# [Project Name] MVP Canvas

## Problem
[What problem are we solving?]

## Solution
[What are we building?]

## Unique Value Proposition
[What makes this different/better?]

## Target Users
[Who will use this?]

## Must-Have Features (MVP)
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## Success Metrics
- [Metric 1]
- [Metric 2]
- [Metric 3]

## Timeline
- **Week 1-2**: [Milestone]
- **Week 3-4**: [Milestone]
- **Week 5-6**: [Milestone]

## Risks
- [Risk 1]
- [Risk 2]
```

---

## MoSCoW Prioritization Framework

Use this framework to prioritize features:

### Must Have (Critical)
Features without which the product cannot launch. The MVP is broken without these.
- **Questions to ask**:
  - Can the product function without this?
  - Is this legally required?
  - Does this solve the core problem?

### Should Have (Important)
Important features that add significant value but the product can launch without them.
- **Questions to ask**:
  - Would users be significantly disappointed without this?
  - Can we add this shortly after launch?
  - Does this provide a competitive advantage?

### Could Have (Nice to Have)
Features that would be nice to have if time/resources permit.
- **Questions to ask**:
  - Would users notice if this is missing?
  - Can we add this in a future version?
  - Is this a "polish" feature?

### Won't Have (Out of Scope)
Features that are explicitly out of scope for this version.
- **Questions to ask**:
  - Does this align with our MVP goals?
  - Would this delay our launch significantly?
  - Can we validate the core concept without this?

---

## INVEST Criteria for User Stories

Good user stories should be:

- **I**ndependent: Can be developed separately
- **N**egotiable: Details can be discussed
- **V**aluable: Provides clear value to users
- **E**stimable: Can estimate effort required
- **S**mall: Can be completed in one sprint
- **T**estable: Has clear acceptance criteria

---

## Usage Guidelines

### When to use MVP Requirements Document
- Full greenfield projects
- Need comprehensive documentation
- Multiple stakeholders
- Complex requirements

### When to use User Story Format
- Agile development
- Individual features
- Sprint planning
- Developer-focused work

### When to use Feature Specification
- Complex features
- Technical documentation needed
- Multiple team members working on feature
- Need detailed design before implementation

### When to use Quick MVP Canvas
- Initial ideation
- Quick validation
- Small teams
- Simple products

---

## Tips for Effective Requirements Gathering

1. **Start with the problem, not the solution**
   - Ask "what problem are we solving?" before "how should we build it?"

2. **Use concrete examples**
   - Instead of "users can manage items", say "users can add, edit, and delete items"

3. **Define success metrics early**
   - How will you know if this feature is successful?

4. **Identify edge cases**
   - What happens when things go wrong?

5. **Keep MVP scope small**
   - Focus on core value, not complete feature set

6. **Validate assumptions**
   - List what you're assuming and verify with users

7. **Document what's out of scope**
   - Be explicit about what you're NOT building

8. **Review with stakeholders**
   - Get feedback early and often

---

## Common Pitfalls to Avoid

- ❌ **Feature creep**: Adding features without prioritization
- ❌ **Vague acceptance criteria**: "User can use the feature" (too vague)
- ❌ **Technical solutions in requirements**: Focus on WHAT, not HOW
- ❌ **Missing non-functional requirements**: Don't forget performance, security, etc.
- ❌ **No user validation**: Assuming you know what users want
- ❌ **Skipping edge cases**: "Happy path only" requirements
- ❌ **No success metrics**: How will you measure success?

---

## Integration with Other Utilities

This template works with:
- **tech-selector.md**: Technical requirements inform technology selection
- **scaffold-templates/**: Requirements drive project structure needs
- **greenfield-requirements-decomposer agent**: Uses these templates to structure output
- **greenfield-architecture-designer agent**: References requirements when designing architecture
