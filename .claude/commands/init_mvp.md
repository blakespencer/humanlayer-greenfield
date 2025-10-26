---
description: Initialize new MVP project with complete directory structure and automated workflow
model: sonnet
---

# Initialize MVP Project

Automated workflow to create a new MVP project from scratch with all required structure and AI-guided development.

## Initial Response

When invoked, start by asking for the project name and details:

```
🚀 Let's create your new MVP project!

I'll set up everything you need:
- Complete directory structure (thoughts/, docs/, etc.)
- Git initialization
- .gitignore configuration
- Initial README
- Run the full greenfield workflow

First, let's get some basic info...
```

## Step 1: Gather Project Info

Use **AskUserQuestion** to collect:

```json
{
  "questions": [
    {
      "question": "What should we name your project? (lowercase-with-dashes recommended)",
      "header": "Project Name",
      "multiSelect": false,
      "options": [
        {
          "label": "Enter custom name",
          "description": "You'll type the project name in the 'Other' field"
        }
      ]
    },
    {
      "question": "Where should we create this project?",
      "header": "Location",
      "multiSelect": false,
      "options": [
        {
          "label": "~/projects/[name]",
          "description": "Create in your projects directory (recommended)"
        },
        {
          "label": "Current directory",
          "description": "Create in the current working directory"
        },
        {
          "label": "Custom path",
          "description": "You'll specify the full path"
        }
      ]
    }
  ]
}
```

## Step 2: Validate Toolkit Availability

**CRITICAL**: Before creating project, verify we can access the toolkit:

```bash
# Store the current directory (toolkit location)
TOOLKIT_PATH="$(pwd)"

# Verify .claude directory exists (we're in toolkit repo)
if [ ! -d "$TOOLKIT_PATH/.claude" ]; then
  echo "❌ Error: .claude directory not found!"
  echo "You must run /init_mvp from the HumanLayer Greenfield toolkit repository."
  exit 1
fi

echo "✅ Toolkit found at: $TOOLKIT_PATH"
```

## Step 3: Create Project Structure

After getting the project name and validating toolkit:

### Safety Checks

```bash
# Define project path based on user choice
PROJECT_PATH="[from user choice]"
PROJECT_NAME="[from user input]"

# Check if project directory already exists
if [ -d "$PROJECT_PATH" ]; then
  echo "⚠️  Warning: Directory $PROJECT_PATH already exists!"
  echo "This command will add files to the existing directory."
  echo "Press Ctrl+C to cancel, or any key to continue..."
  read -n 1
fi
```

### Directory Creation

Use **Bash** tool to create all required directories:

```bash
# Create project root
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Initialize git (only if not already a git repo)
if [ ! -d ".git" ]; then
  git init
  echo "✅ Git initialized"
else
  echo "ℹ️  Git repository already exists, skipping init"
fi

# Create complete directory structure
mkdir -p thoughts/shared/plans
mkdir -p thoughts/shared/projects
mkdir -p thoughts/shared/knowledge
mkdir -p thoughts/shared/templates
mkdir -p thoughts/decisions
mkdir -p docs
mkdir -p src
mkdir -p tests

echo "✅ Directory structure created"
```

### Copy Toolkit

**CRITICAL STEP**: Copy the `.claude` toolkit from the source repository:

```bash
# Copy .claude directory from toolkit
echo "📦 Copying .claude toolkit..."
cp -r "$TOOLKIT_PATH/.claude" "$PROJECT_PATH/.claude"

# Verify copy succeeded
if [ -d "$PROJECT_PATH/.claude" ]; then
  echo "✅ .claude toolkit copied successfully"
  echo "   - $(ls "$PROJECT_PATH/.claude/commands" | wc -l | xargs) commands available"
  echo "   - $(ls "$PROJECT_PATH/.claude/agents" | wc -l | xargs) agents available"
else
  echo "❌ Error: Failed to copy .claude directory!"
  exit 1
fi
```

### File Creation

Use **Write** tool to create initial files:

#### 1. .gitignore

```
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/
vendor/
go.sum

# Build outputs
dist/
build/
.next/
out/
target/
bin/

# Environment
.env
.env.*
!.env.example

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Testing
coverage/
test-results/
playwright-report/
*.log

# Personal notes (AI working documents)
thoughts/
```

#### 2. README.md

```markdown
# [PROJECT_NAME]

## About

[Project description will be added after requirements gathering]

## Quick Start

```bash
# Setup instructions will be generated after tech stack selection
```

## Project Status

**Phase**: Requirements Gathering
**Created**: [DATE]

### Documentation

- **Requirements**: `thoughts/shared/projects/[PROJECT_NAME]-requirements.md`
- **Tech Stack**: `thoughts/decisions/tech-stack.md`
- **Architecture**: `thoughts/shared/knowledge/architecture.md`
- **Implementation Plan**: `thoughts/shared/plans/[PROJECT_NAME]-mvp-plan.md`
- **Living Document**: `thoughts/shared/projects/[PROJECT_NAME]-living-doc.md`

## Development

Built using HumanLayer Greenfield toolkit.

### AI Workflow Commands

1. `/gather_requirements` - Define what you're building
2. `/select_tech_stack` - Choose technologies
3. `/design_architecture` - Design system architecture
4. `/create_greenfield_plan` - Create implementation plan
5. Start building!

---

Generated with HumanLayer Greenfield ❤️
```

#### 3. thoughts/shared/projects/[PROJECT_NAME]-living-doc.md

```markdown
# [PROJECT_NAME] - Living Document

**Created**: [DATE]
**Status**: Initialized
**Current Phase**: Requirements Gathering

## Project Overview

[Will be filled during requirements gathering]

## Quick Status

- [ ] Requirements gathered
- [ ] Tech stack selected
- [ ] Architecture designed
- [ ] Implementation plan created
- [ ] Development started
- [ ] MVP deployed

## Timeline

- **Initialized**: [DATE]
- **Requirements**: TBD
- **Tech Stack**: TBD
- **Architecture**: TBD
- **Development Start**: TBD
- **MVP Launch**: TBD

## Next Steps

1. Run `/gather_requirements` to define project requirements
2. Document your vision, target users, and core features
3. The AI will guide you through the rest of the process

---

## Session Log

### Session 1 - Initialization ([DATE])
- Created project structure
- Initialized git repository
- Ready for requirements gathering
```

## Step 4: Initial Git Commit

Use **Bash** tool:

```bash
cd "$PROJECT_PATH"

git add .
git commit -m "chore: initialize MVP project with HumanLayer Greenfield toolkit

- Copy .claude/ toolkit (30+ commands, 15+ agents)
- Create complete directory structure
- Add thoughts/ for AI working documents
- Initialize README with project template
- Add comprehensive .gitignore
- Create living document for tracking

Ready for requirements gathering phase.

Toolkit copied from: $TOOLKIT_PATH"
```

**Verify commit includes `.claude`**:
```bash
# Should show .claude directory in commit
git show --name-only --pretty="" HEAD | grep ".claude" | head -5
```

## Step 5: Confirm and Launch Workflow

After setup is complete, inform the user:

```
✅ Project initialized successfully!

📍 Location: [PROJECT_PATH]
📁 Structure:
   ├── .claude/          ✅ (copied from toolkit - 30+ commands, 15+ agents)
   │   ├── agents/       ✅ (specialized AI agents)
   │   ├── commands/     ✅ (slash commands like /gather_requirements)
   │   ├── standards/    ✅ (testing standards, conventions)
   │   └── utils/        ✅ (templates, helpers)
   ├── thoughts/         ✅ (AI working documents)
   │   ├── shared/
   │   │   ├── plans/
   │   │   ├── projects/
   │   │   ├── knowledge/
   │   │   └── templates/
   │   └── decisions/
   ├── docs/             ✅ (project documentation)
   ├── src/              ✅ (source code - will be created)
   ├── tests/            ✅ (test files - will be created)
   ├── .gitignore        ✅
   └── README.md         ✅

🔧 Toolkit Verification:
   ✅ Commands: $(ls [PROJECT_PATH]/.claude/commands | wc -l) available
   ✅ Agents: $(ls [PROJECT_PATH]/.claude/agents | wc -l) available
   ✅ All slash commands functional

🎯 Next Steps:

I can now guide you through the complete MVP development workflow:

1. **Requirements Gathering** - Define your project vision
2. **Tech Stack Selection** - Choose the right technologies
3. **Architecture Design** - Design your system
4. **Implementation Planning** - Create detailed plan
5. **Development** - Build your MVP

Would you like me to start with requirements gathering now?
```

## Step 6: Ask to Continue

Use **AskUserQuestion**:

```json
{
  "questions": [
    {
      "question": "Ready to start building? I'll guide you through requirements gathering next.",
      "header": "Next Step",
      "multiSelect": false,
      "options": [
        {
          "label": "Yes, start requirements gathering",
          "description": "Run /gather_requirements automatically"
        },
        {
          "label": "No, I'll do it manually later",
          "description": "Just set up the structure, I'll run commands myself"
        }
      ]
    }
  ]
}
```

## Step 7: Launch Automated Workflow (Optional)

If user chooses "Yes", run the greenfield workflow commands in sequence:

### A. Requirements Gathering

Run `/gather_requirements` command:
- This is an interactive session
- AI will ask questions about the project
- User describes their vision
- AI documents requirements in `thoughts/shared/projects/[name]-requirements.md`

**Wait for requirements to complete before proceeding**

### B. Tech Stack Selection

After requirements are complete, run `/select_tech_stack`:
- AI evaluates tech options
- Presents recommendations with trade-offs
- User chooses technologies
- AI documents decision in `thoughts/decisions/tech-stack.md`

**Wait for tech stack to complete before proceeding**

### C. Architecture Design

After tech stack is selected, run `/design_architecture`:
- AI designs system architecture
- Creates component diagrams
- Defines data flows
- Documents in `thoughts/shared/knowledge/architecture.md`

**Wait for architecture to complete before proceeding**

### D. Create Implementation Plan

After architecture is complete, run `/create_greenfield_plan`:
- AI creates phased implementation plan
- Breaks down into manageable tasks
- Defines success criteria
- Documents in `thoughts/shared/plans/[name]-mvp-plan.md`

### E. Summary

After workflow completes:

```
🎉 Your MVP project is fully planned!

📊 What's Ready:
✅ Requirements documented
✅ Tech stack selected
✅ Architecture designed
✅ Implementation plan created

📁 Key Documents:
- Requirements: thoughts/shared/projects/[name]-requirements.md
- Tech Stack: thoughts/decisions/tech-stack.md
- Architecture: thoughts/shared/knowledge/architecture.md
- Implementation Plan: thoughts/shared/plans/[name]-mvp-plan.md
- Living Document: thoughts/shared/projects/[name]-living-doc.md

🚀 Ready to Start Building!

Next steps:
1. Review the implementation plan
2. Start with Phase 1 (usually infrastructure setup)
3. Use /implement_plan to execute each phase
4. Build your MVP! 🎯

Would you like me to start implementing Phase 1 now?
```

## Important Notes

### Toolkit Copy (CRITICAL)

**The `.claude` directory MUST be copied to new projects**:
- Contains all slash commands (e.g., `/gather_requirements`, `/continue_greenfield`)
- Contains all specialized agents (e.g., `greenfield-tech-evaluator`)
- Contains standards and templates
- **Without it**: No commands work, project is unusable
- **Size**: ~2-3MB (safe to copy)

**Implementation**:
```bash
# MUST run from toolkit repo
TOOLKIT_PATH="$(pwd)"

# MUST verify .claude exists before proceeding
if [ ! -d "$TOOLKIT_PATH/.claude" ]; then
  echo "Error: Must run from toolkit repository!"
  exit 1
fi

# MUST copy after creating project directory
cp -r "$TOOLKIT_PATH/.claude" "$PROJECT_PATH/.claude"

# MUST verify copy succeeded
if [ ! -d "$PROJECT_PATH/.claude" ]; then
  echo "Error: Toolkit copy failed!"
  exit 1
fi
```

### Error Handling

If any step fails:
1. Report the error clearly
2. Show what was completed successfully
3. Provide manual recovery steps
4. **Don't leave project in broken state**
5. **Verify toolkit copied** before claiming success

### Directory Safety

- **Always check** if directory already exists
- **Warn user** if directory exists (don't silently overwrite)
- **Validate paths** before creating directories
- **Check for .git** before running git init

### Git Safety

- Only initialize git if not already a git repo
- Don't commit until structure is complete
- Provide clear commit messages
- Include toolkit copy in initial commit

## Example Usage

```
User: /init_mvp

AI: 🚀 Let's create your new MVP project!
    What should we name your project?

User: task-tracker

AI: Great! Where should I create this?
    1. ~/projects/task-tracker (recommended)
    2. Current directory
    3. Custom path

User: 1

AI: ✅ Creating task-tracker in ~/projects/task-tracker
    📁 Creating directory structure...
    ✅ Initializing git...
    ✅ Creating initial files...
    ✅ Git commit complete!

    Project initialized successfully!

    Would you like me to start requirements gathering now?

User: Yes

AI: [Runs /gather_requirements and continues workflow...]
```

## Success Criteria

**MUST HAVE** (Project unusable without these):
- ✅ Running from toolkit repository (`.claude` exists in CWD)
- ✅ Project directory created with correct structure
- ✅ **`.claude` directory copied and verified** ⭐ CRITICAL
- ✅ Git initialized with clean history
- ✅ All required directories present (`thoughts/`, `docs/`, etc.)
- ✅ Initial files created (`.gitignore`, `README.md`, living doc)

**SHOULD HAVE** (Best practices):
- ✅ Directory existence checked before creating
- ✅ Git repo checked before running `git init`
- ✅ Toolkit copy verified with command/agent count
- ✅ User knows exact next steps
- ✅ Initial commit completed

**OPTIONAL** (User preference):
- ⭕ Workflow commands run automatically (`/gather_requirements`, etc.)

## Benefits

This command saves **30-60 minutes** of manual setup and ensures:
- Consistent project structure
- No missing directories
- Proper git configuration
- Clear next steps
- Automated workflow (optional)
- Professional starting point

---

**This is your personal MVP initialization command!** 🚀

Just run `/init_mvp` and you're ready to build.
