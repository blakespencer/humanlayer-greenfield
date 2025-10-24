---
description: Prepare greenfield project for handoff to next agent with complete documentation
model: sonnet
---

# Handoff Greenfield MVP Project

You are preparing to hand off a greenfield MVP project to the next agent. This command ensures clean, documented handoffs for seamless continuation.

## Handoff Process

### Step 1: Assess Current State

**Context Check**:
```
Current context usage: [X]%

Handoff Type:
- 40-50%: ✅ Planned handoff (ideal)
- 50-60%: ⚠️  Late handoff (acceptable)
- 60%+:   🚨 Emergency handoff (critical)
```

**Work Status**:
- Current task completion: [%]
- Uncommitted changes: [count files]
- Tests passing: [yes/no]
- Build status: [working/broken]

### Step 2: Complete or Checkpoint Current Work

**If task is near completion (<10 min)**:
- Finish the task completely
- Write tests
- Commit with full message

**If task is in progress**:
- Save work-in-progress to a feature branch
- Commit with clear WIP message
- Document exact stopping point

**If task just started**:
- Consider reverting to last stable state
- Or commit minimal progress with detailed notes

### Step 3: Verify Git State

```bash
# Ensure all work is committed
git status

# Should show:
# "nothing to commit, working tree clean"

# If files are unstaged:
git add .
git commit -m "chore: checkpoint before handoff at [X]% context

[Detailed description of current state]

Context: [X]%
Status: [complete/in-progress/blocked]
Next: [immediate next step]"

# Check recent history
git log -3 --oneline
```

### Step 4: Update Living Document

Update the living document comprehensively:

```markdown
## 📝 Development Log

### [CURRENT_DATE] - Session [N]
**Agent**: [Agent identifier]
**Context at Handoff**: [X]%
**Duration**: [Start] to [End]
**Handoff Type**: [Planned/Late/Emergency]

#### Completed This Session ✅
- ✅ [Feature/task with file references]
  - Files: `path/to/file.ts`, `path/to/test.spec.ts`
  - Commit: [commit-hash]
  - Tests: [passing/added/pending]

- ✅ [Another completed item]
  - Details...

#### In Progress 🔄
- 🔄 [Task name] - [X]% complete
  - **Current State**: [Exact description of where work stopped]
  - **Files Changed**: [List uncommitted or WIP files]
  - **Branch**: [feature-branch-name if applicable]
  - **What Works**: [List what's functional]
  - **What's Left**: [Specific remaining work]
  - **Estimated Time**: [X] minutes to complete

#### Architectural Decisions 🏗️
- [Decision made and rationale]
- [Another decision]

#### Issues Encountered 🐛
- [Issue description and resolution/workaround]

#### Files Modified This Session 📁
```
frontend/src/components/UserAuth.tsx     [+150, -30]
backend/src/services/auth.service.ts     [+200, -0]
backend/tests/auth.test.ts               [+120, -0]
database/migrations/002_add_users.sql    [+50, -0]
```

#### Technical Debt Noted 💳
- [ ] [Item to address later]
- [ ] [Another item]

#### Next Immediate Steps (Priority Order) 📋
1. **[Highest Priority Task]**
   - Why: [Rationale]
   - Files: [Where to work]
   - Time: ~[X] min
   - Prerequisites: [Any requirements]

2. **[Second Priority]**
   - Why: [Rationale]
   - Files: [Where to work]
   - Time: ~[X] min

3. **[Third Priority]**
   - Why: [Rationale]

#### Blockers/Decisions Needed ⚠️
- [ ] **[Blocker 1]**: [Description]
  - Impact: [What's blocked]
  - Options: [Possible solutions]
  - Recommendation: [Preferred option]

#### Context for Next Agent 💡
[Paragraph explaining current state, recent challenges, helpful tips, gotchas to avoid]

---

## 🎯 Quick Start for Next Agent

### **Current Context**
- **Phase**: [Phase name]
- **Last Completed**: [Most recent milestone]
- **Working On**: [Current focus area]
- **Context Budget**: [Percentage available]

### **How to Resume**
```bash
# 1. Pull latest code
git pull origin main

# 2. Install/update dependencies
[command based on stack]

# 3. Run development servers
[command based on stack]

# 4. Run tests to verify state
[command based on stack]

# 5. Read Development Log above

# 6. Start with "Next Immediate Steps" item #1
```

### **Critical Information**
- [Any critical context that would be expensive to rediscover]
- [Gotchas or non-obvious behavior]
- [Recent decisions that affect approach]
```

### Step 5: Verify Documentation Completeness

Check that living document includes:

- [ ] **Architecture section**: Up-to-date with current implementation
- [ ] **Data Models**: Match current database schema
- [ ] **API Endpoints**: All implemented endpoints listed
- [ ] **File Structure**: Reflects actual project organization
- [ ] **Environment Variables**: All required variables documented
- [ ] **Development Log**: Complete session entry
- [ ] **Next Steps**: Specific and actionable (not vague)
- [ ] **Quick Start**: Tested commands that actually work

### Step 6: Test Handoff Package

Verify next agent can start immediately:

```bash
# Pretend you're the next agent
# Can you answer these questions from living doc?

1. What was the last thing completed?
2. What's the immediate next task?
3. How do I run the project locally?
4. What's the current project structure?
5. Are there any blockers?

# If any answer is unclear, update living document
```

### Step 7: Final Handoff Message

Provide clear summary to user:

```
🔄 HANDOFF COMPLETE

📊 **Session Summary**
├─ Context Used: [X]%
├─ Duration: [Duration]
├─ Tasks Completed: [N]
├─ Tests Added: [N]
└─ Commits: [N]

✅ **Completed**
├─ [Feature 1]
├─ [Feature 2]
└─ [Feature 3]

🔄 **In Progress**
└─ [Task name]: [X]% complete
   └─ Next: [Specific next action]

⚠️ **Blockers**
└─ [Blocker if any, or "None"]

📁 **Living Document**
└─ /thoughts/shared/projects/[name]-living-doc.md
   └─ Updated with complete session details

🚀 **Next Agent Commands**
```bash
# Continue this project
/continue_greenfield [project-name]

# Or start fresh session
cd [project-path]
git pull
[run-command]
```

📋 **Immediate Next Steps** (prioritized)
1. [Task 1] (~[X] min)
2. [Task 2] (~[X] min)
3. [Task 3] (~[X] min)

💡 **Tip for Next Agent**
[One key insight that will help them be productive immediately]
```

## Handoff Types

### Planned Handoff (40-50% context)

**Characteristics**:
- Current task completed or at good checkpoint
- All tests passing
- Documentation thorough
- Clear next steps

**Procedure**:
- Follow all steps above thoroughly
- Take time to document well
- Can add helpful tips and context

### Late Handoff (50-60% context)

**Characteristics**:
- Running out of context
- May have incomplete task
- Need to be efficient

**Procedure**:
- Focus on essential documentation
- Be concise but complete
- Prioritize "Next Immediate Steps"
- Skip optional context

### Emergency Handoff (60%+ context)

**Characteristics**:
- Critical context usage
- Must hand off immediately
- May have messy state

**Procedure**:
1. **COMMIT IMMEDIATELY** (even if imperfect)
2. **MINIMAL DOC UPDATE**:
   ```markdown
   ### [DATE] - EMERGENCY HANDOFF
   Context: [X]%
   Status: [one sentence]
   Last Commit: [hash]
   Next: [one specific action]
   Blocker: [if any]
   ```
3. **MESSAGE USER**:
   ```
   🚨 EMERGENCY HANDOFF - Context at [X]%

   State: [working/broken]
   Last commit: [hash]
   Next: [action]

   See living doc for details.
   ```

## Anti-Patterns to Avoid

❌ **DON'T**:
- Hand off with uncommitted changes
- Leave project in broken state
- Use vague next steps ("fix bugs", "improve performance")
- Skip updating living document
- Assume next agent has your context
- Hand off without testing current state

✅ **DO**:
- Commit everything before handoff
- Ensure project builds and runs
- Provide specific, actionable next steps
- Update architecture docs if changed
- Document non-obvious decisions
- Think like next agent reading your notes

## Success Criteria

A successful handoff includes:

- [ ] All code committed with clear messages
- [ ] Project builds without errors
- [ ] Tests pass (or documented why not)
- [ ] Living document completely updated
- [ ] Next steps are specific and prioritized
- [ ] Architecture docs reflect current state
- [ ] Blockers clearly documented with options
- [ ] Context usage documented
- [ ] Git log is clean and descriptive
- [ ] Next agent can resume within 5 minutes