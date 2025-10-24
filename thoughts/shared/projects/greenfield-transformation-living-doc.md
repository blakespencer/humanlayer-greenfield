# 🚀 Greenfield Transformation Project - Living Document

**Project**: Humanlayer Greenfield Transformation
**Started**: 2025-10-24
**Current Phase**: Phase 1 - Create Core Greenfield Agents (0/8 completed)
**Tech Stack**: N/A (This is a tooling/system transformation project)
**Last Updated**: 2025-10-24

---

## 🎯 Quick Start for Next Agent

### **Context Window Management**
- **CRITICAL**: Monitor your context window usage!
- **Handoff at 40%** (ideally), NEVER exceed 60%
- **Check periodically**: Your context should not be over 60%
- **When handing off**: Update this document with detailed status

**Current Context Budget**: START FRESH (previous agent at 42.7%)

### **Immediate Next Steps**
1. [ ] **Create greenfield-tech-evaluator.md agent** (~30-40 min)
   - File: `.claude/agents/greenfield-tech-evaluator.md`
   - Reference: Implementation plan lines 53-105
   - Include 2025 framework knowledge (TypeScript, Go, Python, Rust)
   - Add interactive tech selection with React frontend + backend choice
   - Database selection independent of language

2. [ ] **Create greenfield-requirements-decomposer.md agent** (~30 min)
   - File: `.claude/agents/greenfield-requirements-decomposer.md`
   - Reference: Implementation plan lines 107-159
   - Focus on hybrid structured/free-form requirements

3. [ ] **Continue with remaining 6 agents from Phase 1**
   - architecture-designer
   - api-designer
   - scaffolder
   - data-model-designer
   - test-strategy-planner
   - deployment-planner

### **Blockers/Decisions Needed**
- None currently - path is clear from implementation plan

---

## 📁 Project Structure

This is a **system transformation project** to convert humanlayer brownfield tooling into greenfield MVP development system.

```
humanlayer-greenfield/
├── .claude/
│   ├── agents/
│   │   ├── [OLD] codebase-*.md           # Brownfield agents (keep as reference)
│   │   ├── [OLD] thoughts-*.md           # Brownfield agents (keep as reference)
│   │   ├── [NEW] greenfield-tech-evaluator.md          # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-requirements-decomposer.md # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-architecture-designer.md   # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-api-designer.md            # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-scaffolder.md              # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-data-model-designer.md     # ❌ TODO Phase 1
│   │   ├── [NEW] greenfield-test-strategy-planner.md   # ❌ TODO Phase 1
│   │   └── [NEW] greenfield-deployment-planner.md      # ❌ TODO Phase 1
│   │
│   ├── commands/
│   │   ├── [OLD] create_plan.md          # Brownfield command (keep as reference)
│   │   ├── [OLD] research_codebase.md    # Brownfield command (keep as reference)
│   │   ├── [NEW] start_greenfield.md     # ✅ CREATED - Start new MVP
│   │   ├── [NEW] continue_greenfield.md  # ✅ CREATED - Resume MVP work
│   │   ├── [NEW] handoff_greenfield.md   # ✅ CREATED - Handoff workflow
│   │   ├── [NEW] create_greenfield_plan.md       # ❌ TODO Phase 3
│   │   ├── [NEW] gather_requirements.md          # ❌ TODO Phase 3
│   │   ├── [NEW] select_tech_stack.md            # ❌ TODO Phase 3
│   │   ├── [NEW] design_architecture.md          # ❌ TODO Phase 3
│   │   └── [NEW] scaffold_project.md             # ❌ TODO Phase 3
│   │
│   └── utils/                            # ❌ TODO Phase 2
│       ├── tech-selector.md              # Tech selection utility
│       ├── requirements-templates.md     # Requirements templates
│       └── scaffold-templates/           # Project scaffolding templates
│
├── thoughts/shared/
│   ├── plans/
│   │   └── 2025-10-24-greenfield-mvp-transformation.md  # ✅ CREATED - Master plan
│   ├── templates/
│   │   └── greenfield-living-document.md                # ✅ CREATED - Template
│   └── projects/
│       └── greenfield-transformation-living-doc.md      # ✅ THIS FILE
│
└── [Rest of original humanlayer codebase - unchanged]
```

---

## 🏗️ Architecture Overview

### **Transformation Architecture**

This is a **7-phase refactoring project** to transform brownfield tooling into greenfield MVP system:

**Phase 1**: Create 8 Core Greenfield Agents ⬅️ **WE ARE HERE**
- tech-evaluator (2025 frameworks, React frontend + backend)
- requirements-decomposer (hybrid approach)
- architecture-designer
- api-designer
- scaffolder (project generation)
- data-model-designer (database schemas)
- test-strategy-planner (2025 testing tools)
- deployment-planner (2025 cloud platforms)

**Phase 2**: Create Utility Functions and Templates
- Tech stack selector utility
- Requirements templates
- Scaffolding templates for each tech stack

**Phase 3**: Create Greenfield Slash Commands
- /create_greenfield_plan
- /gather_requirements
- /select_tech_stack
- /design_architecture
- /scaffold_project

**Phase 4**: Implement Tech Stack Selection System
- Decision matrix templates
- 2025 tech stack knowledge base
- Interactive selection flows

**Phase 5**: Implement Requirements Gathering System
- Hybrid templates
- User story generators
- INVEST criteria validation

**Phase 6**: Create MVP Planning & Scaffolding Tools
- MVP scope optimizer
- Project generation scripts
- Boilerplate creation

**Phase 7**: Integration and Documentation
- Settings configuration
- Migration script (Linux compatible)
- Comprehensive user guide

### **Key Design Decisions**

1. **React Always Frontend**: Next.js 15 / Remix / Vite+React 19
2. **Database Independent**: PostgreSQL/MongoDB/DynamoDB work with any backend
3. **Hierarchical Tech Selection**: Frontend → Backend Lang → Backend Framework → Database → Infrastructure
4. **2025 Framework Knowledge**: Latest versions (FastAPI 0.119, Django 5.1, Axum 0.8, etc.)
5. **Context-Aware Development**: Agents handoff at 40-50% context
6. **Agent Continuity System**: Living documents enable multi-session work

---

## 📊 Implementation Plan Reference

**Master Plan**: `/thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md`

Key sections:
- Lines 46-517: Phase 1 - Agent specifications
- Lines 520-543: Phase 2 - Utilities
- Lines 546-864: Phase 3 - Commands
- Lines 866-1060: Phase 4 - Tech stack system
- Lines 1063-1180: Phase 5 - Requirements system
- Lines 1182-1327: Phase 6 - MVP tools
- Lines 1391-1572: Phase 7 - Integration

---

## 📝 Development Log

### **2025-10-24 - Session 1** (Initial Agent)
**Agent**: Initial conversation agent
**Context at Handoff**: 42.7%
**Duration**: Full conversation to first handoff
**Handoff Type**: Planned (40-50% ideal)

#### Completed This Session ✅
- ✅ **Deep dive research of humanlayer codebase**
  - Analyzed 27 slash commands and 6 agents
  - Identified brownfield focus (existing code analysis)
  - Confirmed planning infrastructure is sophisticated

- ✅ **Verified greenfield capabilities**
  - Confirmed system CAN be adapted for greenfield
  - Identified needed modifications for empty directory MVPs
  - Recommended creating greenfield-specific variants

- ✅ **Created full copy of codebase**
  - Copied `/Users/blakespencer/projects/humanlayer` to `/Users/blakespencer/projects/humanlayer-greenfield`
  - Verified: 171M, all 27 commands, 6 agents, git repo intact

- ✅ **Created comprehensive 7-phase implementation plan**
  - File: `/thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md`
  - 1,548 lines covering complete transformation
  - Approved by user with enhancements:
    - Expanded from 5 to 8 agents (added data-model, test-strategy, deployment)
    - Restructured from 6 to 7 phases
    - Added Python (FastAPI, Django) and Rust (Axum, Rocket, Actix) frameworks
    - Made migration script Linux-compatible
    - Integrated 2025 latest framework research

- ✅ **Fixed tech stack selection logic**
  - React as default frontend (Next.js/Remix/Vite variants)
  - Database selection independent of language
  - Hierarchical: Frontend → Backend Lang → Backend Framework → Database
  - Removed incorrect pairings like "Go+MongoDB" vs "Go+PostgreSQL"

- ✅ **Created agent continuity system**
  - File: `/thoughts/shared/templates/greenfield-living-document.md` (template)
  - File: `.claude/commands/start_greenfield.md` (initialize new project)
  - File: `.claude/commands/continue_greenfield.md` (resume existing project)
  - File: `.claude/commands/handoff_greenfield.md` (prepare handoff)
  - All commands use `model: sonnet` for efficiency
  - Context management: 30% → 40% → 50% → 60% thresholds

- ✅ **Updated implementation plan with continuity system**
  - Added agent continuity to Phase 7
  - Integrated context management guidelines
  - Added continuity commands to available_commands

- ✅ **Created this living document**
  - File: `/thoughts/shared/projects/greenfield-transformation-living-doc.md`
  - Documenting transformation project itself (meta!)

#### In Progress 🔄
- Nothing in progress - clean handoff

#### Architectural Decisions 🏗️
1. **Use agent continuity for transformation itself**: Apply the system we're building to build itself
2. **React always frontend**: Changed from language-first to frontend-first approach
3. **Database independence**: PostgreSQL/MongoDB/DynamoDB work with any backend language
4. **2025 framework focus**: Include latest versions and web research capability
5. **Sonnet for continuity commands**: Conserve opus usage, use sonnet for workflow commands

#### Files Created This Session 📁
```
thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md    [+1548 lines]
thoughts/shared/templates/greenfield-living-document.md               [+350 lines]
.claude/commands/start_greenfield.md                                  [+150 lines]
.claude/commands/continue_greenfield.md                               [+250 lines]
.claude/commands/handoff_greenfield.md                                [+350 lines]
thoughts/shared/projects/greenfield-transformation-living-doc.md      [+THIS FILE]
```

#### Technical Debt Noted 💳
- [ ] Need to test agent continuity system with a real greenfield project
- [ ] Migration script needs testing on both macOS and Linux
- [ ] 2025 framework knowledge needs periodic updates

#### Next Immediate Steps (Priority Order) 📋

1. **Create greenfield-tech-evaluator.md** (~30-40 min)
   - Why: First agent, handles critical tech stack selection
   - File: `.claude/agents/greenfield-tech-evaluator.md`
   - Reference: Plan lines 53-105
   - Key features:
     - Interactive hierarchical selection (Frontend → Backend → Database)
     - 2025 framework knowledge (React, Next.js 15, FastAPI 0.119, Axum 0.8, etc.)
     - Trade-off analysis for each option
     - AskUserQuestion for user input
   - Estimate: 30-40 min including web research for 2025 frameworks

2. **Create greenfield-requirements-decomposer.md** (~30 min)
   - Why: Second most important, handles requirements → user stories
   - File: `.claude/agents/greenfield-requirements-decomposer.md`
   - Reference: Plan lines 107-159
   - Key features:
     - Parse user requirements from various formats
     - Create user stories with acceptance criteria
     - Hybrid structured/free-form approach
     - Interactive clarification with AskUserQuestion
   - Estimate: 30 min

3. **Create greenfield-architecture-designer.md** (~30 min)
   - File: `.claude/agents/greenfield-architecture-designer.md`
   - Reference: Plan lines 161-214
   - Designs system architecture and component boundaries

4. **Create remaining 5 agents** (2-3 hours total)
   - greenfield-api-designer.md
   - greenfield-scaffolder.md
   - greenfield-data-model-designer.md
   - greenfield-test-strategy-planner.md
   - greenfield-deployment-planner.md

5. **Move to Phase 2** (after all 8 agents complete)
   - Create utility functions and templates

#### Blockers/Decisions Needed ⚠️
- None - path is clear from implementation plan

#### Context for Next Agent 💡

You're implementing a meta project: using the agent continuity system we just built to transform the humanlayer codebase into a greenfield MVP development tool.

**What's been done**:
- Complete 7-phase plan created and approved
- Agent continuity system (living docs + handoff commands) built
- Tech stack logic fixed (React frontend, database independence)
- 2025 framework knowledge integrated

**What you need to do**:
Start Phase 1 by creating the 8 greenfield agents. Each agent is defined in detail in the implementation plan. Copy the agent definitions from the plan and create them as markdown files in `.claude/agents/`.

**Important context**:
- All agents should use the tools specified in their frontmatter
- Include 2025 framework knowledge (we did web research - reference it)
- Use AskUserQuestion extensively for interactive selection
- Focus on greenfield (no existing code) workflows
- Test each agent after creation if context allows

**Gotchas**:
- Don't create brownfield agents - we're keeping those as reference
- Database choice must be independent of language (user corrected this)
- Frontend is always React (Next.js/Remix/Vite variants)
- Monitor context usage - handoff at 40-50%

---

## 🔄 Handoff Procedure

### **Before Handoff**
1. ✅ Update "Immediate Next Steps" section
2. ✅ Document any pending decisions in "Blockers"
3. ✅ Commit all code changes with clear messages (N/A - no code yet)
4. ✅ Update architecture section if changed
5. ✅ Add session entry to Development Log

### **After Pickup**
1. Read entire living document
2. Check git status and recent commits
3. Review "Immediate Next Steps"
4. Verify project context (this is transformation project, not MVP)
5. Continue from documented point (Phase 1: Create first agent)

---

## 🚨 Important Conventions

### **File Naming**
- Agents: kebab-case with greenfield- prefix (greenfield-tech-evaluator.md)
- Commands: snake_case (start_greenfield.md)
- Utilities: kebab-case (tech-selector.md)
- Living docs: kebab-case (greenfield-transformation-living-doc.md)

### **Git Commit Format**
```
type(scope): description

- feat: New feature/agent/command
- fix: Bug fix
- docs: Documentation
- refactor: Code refactoring
- chore: Build/config updates

Example: "feat(agents): add greenfield-tech-evaluator with 2025 frameworks"
```

### **Agent File Structure**
All agents must have:
```markdown
---
name: agent-name
description: What this agent does
tools: Tool1, Tool2, Tool3
color: color-name
model: sonnet
---

# Agent prompt content here
```

---

## 🔗 Important Links

- **Repository**: /Users/blakespencer/projects/humanlayer-greenfield
- **Original**: /Users/blakespencer/projects/humanlayer (DO NOT MODIFY)
- **Implementation Plan**: /thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md
- **Living Doc Template**: /thoughts/shared/templates/greenfield-living-document.md

---

## 🎯 Transformation Milestones

- [ ] **Phase 1 Complete**: All 8 greenfield agents created (0/8)
  - [ ] greenfield-tech-evaluator.md
  - [ ] greenfield-requirements-decomposer.md
  - [ ] greenfield-architecture-designer.md
  - [ ] greenfield-api-designer.md
  - [ ] greenfield-scaffolder.md
  - [ ] greenfield-data-model-designer.md
  - [ ] greenfield-test-strategy-planner.md
  - [ ] greenfield-deployment-planner.md

- [ ] **Phase 2 Complete**: Utility functions and templates created
- [ ] **Phase 3 Complete**: Greenfield slash commands created
- [ ] **Phase 4 Complete**: Tech stack selection system implemented
- [ ] **Phase 5 Complete**: Requirements gathering system implemented
- [ ] **Phase 6 Complete**: MVP planning & scaffolding tools created
- [ ] **Phase 7 Complete**: Integration and documentation finished

**Target**: Complete transformation ready for greenfield MVP development

---

## 📌 Notes for Future Sessions

### **Key Insights**
- This is a meta-project: using agent continuity to build agent continuity system
- User wants multiple agents working with handoffs at 40% context
- React is always frontend, database is independent of backend language
- 2025 framework knowledge is crucial (use WebSearch when needed)

### **Testing Strategy**
- After Phase 1-3 complete, test with real greenfield MVP project
- Use `/start_greenfield` to verify entire workflow
- Test context management and handoffs work as expected

### **Future Enhancements**
- Consider adding more languages (Swift for iOS, Kotlin for Android)
- Add mobile-specific frameworks (React Native, Flutter)
- Create pre-built MVP templates for common use cases (SaaS, E-commerce, etc.)

---

## 🔄 HANDOFF STATUS - NEXT AGENT START HERE

**Context at Handoff**: 42.7%
**Clean Working State**: Yes (no code commits needed, just documentation files created)
**Ready for Next Agent**: ✅ YES

### **What Next Agent Should Do**

1. **Read this entire document** (you are here!)
2. **Review implementation plan**: `/thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md` (lines 46-517 for Phase 1)
3. **Start creating first agent**: `greenfield-tech-evaluator.md`
   - Copy agent definition from plan (lines 53-105)
   - Create file at `.claude/agents/greenfield-tech-evaluator.md`
   - Include 2025 framework knowledge
   - Test if context allows
4. **Continue with remaining 7 agents**
5. **Update this living document** after each agent
6. **Handoff at 40-50% context**

### **Commands to Resume**
```bash
cd /Users/blakespencer/projects/humanlayer-greenfield

# Read living doc
cat thoughts/shared/projects/greenfield-transformation-living-doc.md

# Read implementation plan Phase 1
cat thoughts/shared/plans/2025-10-24-greenfield-mvp-transformation.md | head -n 517

# Create first agent
# (use Write tool to create .claude/agents/greenfield-tech-evaluator.md)
```

### **Success Criteria for Next Session**
- [ ] At least 1 agent created and tested
- [ ] Living document updated with progress
- [ ] Clear handoff notes for following agent
- [ ] Context usage < 50% at handoff

**Good luck! 🚀**