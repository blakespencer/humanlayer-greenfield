---
description: Continue working on an existing greenfield MVP project using the living document
model: sonnet
---

# Continue Greenfield MVP Project

You are continuing work on an existing greenfield MVP project. Another agent started this project and documented their progress in a living document.

## Initialization Process

When invoked with project name, immediately:

1. **Locate Living Document**:
   ```
   Looking for: /thoughts/shared/projects/[project-name]-living-doc.md
   ```

2. **Read Living Document Completely**:
   - Read entire document from start to finish
   - Pay special attention to:
     - 🎯 Quick Start section
     - Immediate Next Steps
     - Blockers/Decisions Needed
     - Development Log (most recent session)
     - Architecture Overview

3. **Verify Project State**:
   ```bash
   # Check git status
   git status

   # Check recent commits
   git log -5 --oneline

   # Verify project builds (based on tech stack)
   # For Node.js projects:
   npm install && npm run build

   # For Go projects:
   go build ./...

   # For Python projects:
   pip install -r requirements.txt
   ```

4. **Report Status**:
   ```
   ✅ Project loaded successfully!

   📁 Project: [PROJECT_NAME]
   🏗️ Tech Stack: [STACK]
   📊 Phase: [CURRENT_PHASE]

   Last session completed:
   - [Task 1]
   - [Task 2]

   Immediate next steps:
   1. [Next task 1]
   2. [Next task 2]

   ⚠️ Blockers: [List any blockers]

   Ready to continue! What would you like to focus on?
   ```

## Working Process

### Continuous Context Monitoring

**CRITICAL**: Monitor context usage throughout session:

```
Context Checkpoints:
├─ 0-30%  ✅ Normal operation
├─ 30-40% ⚠️  Start being concise, avoid unnecessary reads
├─ 40-50% 🔶 Prepare for handoff, focus on completing current task
├─ 50-60% 🔴 MUST handoff soon, wrap up immediately
└─ 60%+   ❌ NEVER EXCEED - Emergency handoff
```

After every major task completion, check context:
```
[Check context usage]
Current: [X]%

If > 40%: Start handoff preparation
If > 50%: Immediate handoff required
```

### Task Execution

For each task:

1. **Before Starting**:
   - Confirm task aligns with living document roadmap
   - Check if architecture decisions are needed
   - Estimate context impact

2. **During Execution**:
   - Write clean, well-documented code
   - Follow conventions in living document
   - Test incrementally
   - Commit frequently with clear messages

3. **After Completion**:
   - Update living document immediately
   - Check context usage
   - Commit with descriptive message
   - Update "Immediate Next Steps"

### Living Document Updates

Update the living document after EVERY significant change:

```markdown
## 📝 Development Log

### [DATE] - Session [N]
**Agent**: [Your session ID]
**Context Used**: [Current %]
**Completed**:
- ✅ [Task description with file references]
- ✅ [Another task]

**In Progress**:
- 🔄 [Current task status and exact stopping point]

**Decisions Made**:
- [Any architectural or tech decisions]

**Files Modified**:
- frontend/src/components/UserProfile.tsx
- backend/src/controllers/users.ts
- [List all significant changes]

**Next Immediate Steps**:
1. [ ] [Very specific next task]
2. [ ] [Following task]

**Handoff Notes**:
[Specific context next agent needs to know]
```

## Handoff Trigger Points

### Planned Handoff (40% context)

When context reaches 40%, begin handoff:

1. **Complete Current Task**: Finish what you're working on
2. **Commit Everything**: Clean git status
3. **Update Living Document**: Detailed session notes
4. **Trigger Handoff**: Use `/handoff_greenfield [project-name]`

### Emergency Handoff (50%+ context)

If context exceeds 50%:

1. **STOP IMMEDIATELY**: Don't start new tasks
2. **Save Current State**: Commit work-in-progress
3. **Minimal Documentation**: Quick status update
4. **Emergency Handoff**: Use `/handoff_greenfield [project-name] --emergency`

## Context-Aware Decision Making

Choose actions based on context usage:

**At 0-30% context**:
- Can explore freely
- Can read multiple files
- Can research alternatives
- Can refactor aggressively

**At 30-40% context**:
- Be focused and direct
- Minimize file reads
- Stick to plan
- Avoid scope creep

**At 40-50% context**:
- Finish current task ONLY
- Essential reads only
- Prepare handoff
- No new features

**At 50%+ context**:
- STOP new work
- Commit immediately
- Update docs
- Handoff NOW

## Best Practices

### 1. Communicate Context Usage

Update user frequently:
```
✅ Completed authentication module
📊 Context: 35% (5% increase)
⏭️ Next: User profile CRUD operations

Current context is healthy. Continuing...
```

### 2. Atomic Commits

Commit after every meaningful change:
```bash
git add .
git commit -m "feat(auth): implement JWT token generation

- Added token service with RS256 signing
- Created refresh token rotation
- Tests added for token validation

Context: 33%"
```

### 3. Clear Handoff Messages

When handing off:
```
🔄 HANDOFF REQUIRED - Context at 42%

✅ Completed this session:
- Authentication system fully working
- User CRUD operations implemented
- Tests passing (87% coverage)

🔄 In progress when stopped:
- Was implementing user profile image upload
- Created S3 service (backend/src/services/s3.ts)
- Need to: Connect upload endpoint to frontend

📋 Next agent should:
1. Complete image upload (30 min est.)
2. Add image optimization
3. Update user model tests

📁 Living Document: /thoughts/shared/projects/[name]-living-doc.md
```

## Success Criteria

Each session should:
- [ ] Read living document completely before starting
- [ ] Verify project builds and runs
- [ ] Complete at least one meaningful task
- [ ] Update living document after each task
- [ ] Monitor context usage continuously
- [ ] Handoff before 50% context
- [ ] Leave project in working state
- [ ] Clear next steps documented

## Emergency Recovery

If project is in broken state:

1. **Check Last Good Commit**:
   ```bash
   git log --oneline
   git diff [last-good-commit]
   ```

2. **Read Living Document**: Check what was being attempted

3. **Fix or Revert**:
   - Try to fix if simple
   - Revert if complex or context is high

4. **Document Issue**:
   Update living document with what went wrong and how it was fixed