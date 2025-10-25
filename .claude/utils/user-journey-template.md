# User Journey Template

**Purpose**: Map the complete user experience from initial awareness to goal completion, identifying pain points and opportunities.

**When to use**: Before designing features, to understand the user's perspective, emotions, and pain points at each stage.

**2025 UX Best Practice**: Empathy-driven design, focusing on emotional journey, not just tasks.

---

## Table of Contents

1. [Journey Map Template](#journey-map-template)
2. [Example Journeys](#example-journeys)
3. [Journey Map Components](#journey-map-components)
4. [Creating Effective Journeys](#creating-effective-journeys)
5. [Integration with Personas](#integration-with-personas)
6. [Tips and Best Practices](#tips-and-best-practices)

---

## Journey Map Template

### Basic Structure

```markdown
# User Journey: [Journey Name]

**Persona**: [User Type/Persona Name]
**Goal**: [What user wants to achieve]
**Scenario**: [Context and situation]
**Date Created**: [YYYY-MM-DD]

---

## Stage 1: [Stage Name]

**Phase**: [Awareness / Consideration / Acquisition / Service / Loyalty]

### Touchpoints
- [List of touchpoints: website, email, app, support, etc.]

### User Actions
- [What user does at this stage]
- [Step-by-step actions]

### Thoughts
- [What user is thinking]
- [Questions they have]
- [Concerns or doubts]

### Emotions
- [Emotional state: 😊 Happy / 😐 Neutral / 😟 Frustrated / 😡 Angry / 🤔 Confused]
- [Intensity: Low / Medium / High]

### Pain Points
- [Problems encountered]
- [Friction or obstacles]
- [Unmet needs]

### Opportunities
- [How to improve experience]
- [Features to add]
- [Pain points to address]

### Supporting Evidence
- [User research data]
- [Analytics metrics]
- [Support tickets]

---

## Stage 2: [Next Stage Name]

[Repeat structure above...]

---

## Journey Summary

**Duration**: [Time from start to finish]
**Success Rate**: [% of users who complete journey]
**Drop-off Points**: [Where users abandon]
**Overall Satisfaction**: [Rating or NPS]

### Key Insights
1. [Major finding 1]
2. [Major finding 2]
3. [Major finding 3]

### Priority Improvements
1. **High**: [Critical issue to fix]
2. **Medium**: [Important enhancement]
3. **Low**: [Nice-to-have improvement]
```

---

## Example Journeys

### Example 1: New User Onboarding

```markdown
# User Journey: New User Onboarding

**Persona**: Sarah, First-time SaaS User
**Goal**: Create account and complete first task successfully
**Scenario**: Sarah heard about the product from a colleague and wants to try it
**Date Created**: 2025-10-25

---

## Stage 1: Discovery

**Phase**: Awareness

### Touchpoints
- Google search results
- Landing page
- Product demo video

### User Actions
- Searches "project management tool for startups"
- Clicks on result
- Scrolls through landing page
- Watches 2-minute demo video
- Reads feature list

### Thoughts
- "Does this solve my problem?"
- "How is this different from [competitor]?"
- "Is it easy to use?"
- "What's the pricing?"

### Emotions
- 😊 Curious and hopeful (High)
- 🤔 Slightly skeptical (Medium)

### Pain Points
- Too much information on landing page
- Not immediately clear what makes product unique
- Pricing not visible without scrolling

### Opportunities
- Add clear value proposition above the fold
- Highlight key differentiator in hero section
- Show pricing earlier or add "Pricing" to nav
- Add comparison table with competitors

### Supporting Evidence
- Heatmap shows 40% bounce before scrolling
- 60% watch demo video (good engagement)
- Exit surveys mention "pricing confusion"

---

## Stage 2: Sign Up

**Phase**: Acquisition

### Touchpoints
- Sign up form
- Email verification
- Welcome email

### User Actions
- Clicks "Start Free Trial" button
- Fills out email, password, name
- Receives verification email
- Clicks verification link
- Lands on welcome page

### Thoughts
- "This better be quick"
- "Do I need to enter credit card?"
- "How long is the trial?"
- "Can I cancel anytime?"

### Emotions
- 😐 Neutral, wants to proceed quickly (Medium)
- 😊 Relieved when no credit card required (High)

### Pain Points
- Form has too many fields (company, role, etc.)
- Password requirements unclear until error
- Verification email takes 2-3 minutes to arrive
- No clear indication of trial length

### Opportunities
- Reduce form fields to email + password only
- Show password requirements proactively
- Add "No credit card required • 14-day trial" near button
- Speed up email delivery (< 30 seconds)
- Add social login options (Google, GitHub)

### Supporting Evidence
- 30% drop-off on signup form (form analytics)
- Support tickets: "Didn't receive verification email"
- A/B test: Reduced fields increased conversions by 15%

---

## Stage 3: First Use

**Phase**: Service

### Touchpoints
- In-app onboarding tour
- Dashboard
- Task creation flow
- Help center

### User Actions
- Sees onboarding tour popup
- Skips tour (wants to explore)
- Clicks "Create New Task"
- Fills out task form
- Submits first task
- Views task in list

### Thoughts
- "Let me just try it myself"
- "Where do I start?"
- "This is pretty intuitive"
- "I did it!"

### Emotions
- 😐 Neutral at start (Medium)
- 🤔 Slightly confused when exploring (Low)
- 😊 Satisfied after creating task (High)

### Pain Points
- Onboarding tour is intrusive (blocks UI)
- Not clear where to start after dismissing tour
- No empty state guidance on dashboard
- No confirmation after task creation

### Opportunities
- Make tour optional, add "Show me around" button instead
- Add empty state with "Create your first task" prompt
- Add success notification after task creation
- Offer contextual tips instead of full tour
- Add progress indicator: "2 of 5 steps complete"

### Supporting Evidence
- 70% skip onboarding tour
- Time to first action: 3.2 minutes (target: < 2 min)
- 85% successfully create first task (good!)
- User testing: "Wished there was guidance without blocking"

---

## Stage 4: Exploration

**Phase**: Service

### Touchpoints
- Various app features
- Settings page
- Integration marketplace
- In-app notifications

### User Actions
- Explores different features
- Sets up team workspace
- Invites first team member
- Connects integration (Slack)
- Customizes settings

### Thoughts
- "This is more powerful than I thought"
- "Let me invite my team"
- "Great, it integrates with Slack"

### Emotions
- 😊 Excited about features (High)
- 😊 Happy with integrations (High)

### Pain Points
- Overwhelming number of features
- Integration setup requires multiple steps
- Team invitation process is unclear

### Opportunities
- Add feature discovery flow: "Did you know..."
- Simplify integration setup (one-click)
- Add template workspaces for common use cases
- Create guided tours for advanced features

### Supporting Evidence
- Average features used: 3 of 12 (low adoption)
- Integration completion rate: 60%
- NPS at day 7: 35 (neutral)

---

## Stage 5: Value Realization

**Phase**: Service / Loyalty

### Touchpoints
- Daily app usage
- Email summaries
- Progress notifications
- Upgrade prompts

### User Actions
- Uses app daily
- Completes 10+ tasks
- Shares with team (3 invites)
- Reviews pricing page
- Considers upgrading

### Thoughts
- "This is actually helping us"
- "My team loves it"
- "The free plan might not be enough"
- "Is Pro worth $29/month?"

### Emotions
- 😊 Very satisfied with value (High)
- 🤔 Considering pricing (Medium)

### Pain Points
- Hitting free plan limits
- Not sure which plan to choose
- Unclear what happens to data after trial

### Opportunities
- Show value metrics: "You've completed 50 tasks!"
- Add in-app comparison of Free vs Pro features
- Offer discount for annual billing
- Add "Talk to Sales" option for questions
- Proactive email: "You're getting great value..."

### Supporting Evidence
- Day 14 retention: 45%
- Free to paid conversion: 12%
- Exit surveys: "Not sure if worth the price"

---

## Journey Summary

**Duration**: 14 days (trial period)
**Success Rate**: 45% complete onboarding, 12% convert to paid
**Drop-off Points**:
- 30% at signup form
- 25% after day 1 (don't return)
- 55% don't convert after trial

**Overall Satisfaction**: NPS 35 (Neutral)

### Key Insights

1. **Signup Friction**: Form has too many fields, causing 30% drop-off
2. **Onboarding Confusion**: Users skip tour but get lost, need better empty states
3. **Value Communication**: Users love the product but unclear on pricing value
4. **Feature Overwhelm**: Low feature adoption (3 of 12), need better discovery

### Priority Improvements

1. **High - Signup Optimization**
   - Reduce form to email + password only
   - Add social login
   - Communicate trial terms clearly
   - Expected impact: +15% conversion

2. **High - First Use Experience**
   - Remove intrusive onboarding tour
   - Add empty state guidance
   - Add success confirmations
   - Expected impact: +20% day 1 retention

3. **Medium - Value Communication**
   - Show usage metrics and achievements
   - Improve pricing page clarity
   - Add testimonials and social proof
   - Expected impact: +5% conversion rate

4. **Medium - Feature Discovery**
   - Add progressive disclosure of features
   - Create use case templates
   - Send feature spotlight emails
   - Expected impact: +50% feature adoption

5. **Low - Polish**
   - Faster email delivery
   - Better mobile experience
   - Dark mode option
   - Expected impact: Improved satisfaction
```

---

### Example 2: Feature Discovery Journey

```markdown
# User Journey: Discovering Advanced Features

**Persona**: Mark, Existing User (1 month)
**Goal**: Discover and use automation features
**Scenario**: Mark uses basic features but hasn't explored automation
**Date Created**: 2025-10-25

---

## Stage 1: Awareness

### Touchpoints
- Email newsletter
- In-app notification
- Feature announcement banner

### User Actions
- Receives weekly newsletter
- Sees "New: Automation Features" announcement
- Clicks to learn more

### Thoughts
- "Automation? That sounds useful"
- "Is this hard to set up?"
- "Will this save me time?"

### Emotions
- 😊 Interested (Medium)
- 🤔 Curious but cautious (Medium)

### Pain Points
- Doesn't know what automation can do
- Worried it might be complex
- Not sure if it applies to his use case

### Opportunities
- Show real examples: "Automate your weekly reports"
- Add video tutorial (2 min)
- Provide templates for common automations
- Highlight time saved: "Save 5 hours/week"

---

## Stage 2: Exploration

### Touchpoints
- Automation setup page
- Template library
- Help documentation

### User Actions
- Opens automation page
- Browses templates
- Selects "Weekly report automation"
- Follows setup wizard

### Thoughts
- "Oh, there are templates!"
- "This seems straightforward"
- "Let me try the report automation"

### Emotions
- 😊 Pleasantly surprised (Medium)
- 😐 Focused on setup (Low)

### Pain Points
- Template descriptions are technical
- Setup wizard has 5 steps (feels long)
- Not sure what each field does

### Opportunities
- Use plain language in descriptions
- Show progress: "Step 2 of 5"
- Add inline help for each field
- Preview automation before saving

---

## Stage 3: Activation

### Touchpoints
- Automation dashboard
- Slack notification (from automation)
- Email report (generated by automation)

### User Actions
- Completes automation setup
- Waits for first run (scheduled weekly)
- Receives Slack notification
- Checks email report
- Reviews automation results

### Thoughts
- "It worked!"
- "This report looks great"
- "I didn't have to do anything"

### Emotions
- 😊 Excited (High)
- 😊 Impressed (High)

### Pain Points
- Had to wait 5 days for first run
- Didn't know it ran until checking Slack

### Opportunities
- Offer "Run now" option to test immediately
- Send confirmation: "Automation created successfully"
- Add notification settings for automation runs
- Show preview of what automation will produce

---

## Stage 4: Mastery

### Touchpoints
- Automation dashboard
- Multiple active automations
- Shared with team

### User Actions
- Creates 3 more automations
- Customizes existing automation
- Shares automations with team
- Recommends feature to colleague

### Thoughts
- "This is saving me so much time"
- "My team should use this too"
- "What else can I automate?"

### Emotions
- 😊 Very satisfied (High)
- 😊 Proud of mastery (High)

### Pain Points
- Managing many automations gets messy
- No analytics on automation impact
- Sharing with team is manual

### Opportunities
- Add automation folders/organization
- Show time saved metrics
- Add team automation library
- Gamify: "You've saved 10 hours this month!"

---

## Journey Summary

**Duration**: 2 weeks from awareness to mastery
**Success Rate**: 35% of users who see announcement try feature, 60% of those become regular users
**Drop-off Points**:
- 65% don't click announcement
- 20% abandon during setup
- 15% don't use after first setup

**Overall Satisfaction**: NPS 65 (Promoters)

### Key Insights

1. **Discovery Gap**: Most users don't know feature exists
2. **Setup Complexity**: 5-step wizard feels long, but completion rate is good
3. **Delayed Gratification**: Waiting for first run reduces excitement
4. **High Value**: Users who adopt love it (NPS 65)

### Priority Improvements

1. **High - Increase Awareness**
   - In-app prompts when user performs repetitive task
   - Onboarding includes automation intro
   - Video tutorial on dashboard
   - Expected impact: +30% feature awareness

2. **Medium - Reduce Setup Friction**
   - Combine some steps in wizard
   - Add "Run now" test option
   - Improve field help text
   - Expected impact: +10% completion rate

3. **Low - Enhance Experience**
   - Add time saved metrics
   - Improve automation organization
   - Team sharing features
   - Expected impact: Improved engagement
```

---

### Example 3: Task Completion Journey

```markdown
# User Journey: Completing a Complex Task

**Persona**: Lisa, Power User
**Goal**: Create and manage a multi-step project with dependencies
**Scenario**: Lisa needs to plan a product launch with her team
**Date Created**: 2025-10-25

---

## Stage 1: Planning

### Touchpoints
- Project creation page
- Task templates
- Calendar view

### User Actions
- Creates new project "Product Launch Q2"
- Browses project templates
- Selects "Product Launch" template
- Reviews pre-populated tasks
- Customizes task list

### Thoughts
- "Great, there's a template for this"
- "I need to add our specific tasks"
- "Need to set deadlines"

### Emotions
- 😊 Relieved to find template (Medium)
- 😐 Focused on customization (Low)

### Pain Points
- Template has too many tasks (overwhelming)
- Not clear how to add dependencies
- Calendar view doesn't show dependencies

### Opportunities
- Allow template customization before creating
- Add "Suggested for your industry" templates
- Improve dependency visualization
- Add Gantt chart view option

---

## Stage 2: Collaboration

### Touchpoints
- Task assignment interface
- Team member profiles
- Comments and discussions
- Notifications

### User Actions
- Assigns tasks to team members
- Sets deadlines and priorities
- Adds descriptions and files
- @mentions team in comments
- Reviews team activity

### Thoughts
- "Everyone needs clear responsibilities"
- "Hope they see the assignments"
- "Need to check progress regularly"

### Emotions
- 😐 Task-focused (Low)
- 😟 Slightly anxious about coordination (Medium)

### Pain Points
- No bulk assignment option
- Team members don't always respond to @mentions
- Hard to see overall project status
- Missing workload balancing view

### Opportunities
- Add bulk actions for assignment
- Improve notification reliability
- Add project progress dashboard
- Show team workload distribution
- Add "Request update" feature

---

## Stage 3: Execution

### Touchpoints
- Daily task list
- Progress updates
- Blockers and issues
- Status reports

### User Actions
- Checks project daily
- Moves tasks through stages
- Resolves blockers
- Requests updates from team
- Updates stakeholders

### Thoughts
- "We're on track"
- "John's task is overdue"
- "Need to escalate this blocker"

### Emotions
- 😊 Satisfied with progress (Medium)
- 😟 Concerned about delays (Medium)

### Pain Points
- No automatic reminders for overdue tasks
- Blocker resolution is manual
- Status reports require manual compilation
- No predictive analytics on completion

### Opportunities
- Auto-remind on overdue tasks
- Add blocker escalation flow
- Auto-generate status reports
- Add AI prediction: "At risk of delay"
- Show critical path

---

## Stage 4: Completion

### Touchpoints
- Project completion page
- Archive functionality
- Retrospective template
- Success metrics

### User Actions
- Marks all tasks complete
- Reviews project timeline
- Conducts team retrospective
- Archives project
- Celebrates success

### Thoughts
- "We did it!"
- "What can we improve next time?"
- "Good to have this documented"

### Emotions
- 😊 Proud and accomplished (High)
- 😊 Reflective (Medium)

### Pain Points
- No celebration moment
- Retrospective is manual
- Metrics are hard to extract
- Learnings not captured for future

### Opportunities
- Add completion celebration UI
- Auto-generate project report
- Show metrics: tasks completed, time spent
- Create "Lessons learned" template
- Suggest improvements based on data

---

## Journey Summary

**Duration**: 6 weeks (project length)
**Success Rate**: 75% of projects complete on time
**Drop-off Points**:
- 15% abandon during planning phase
- 10% stall in execution (resolved with intervention)

**Overall Satisfaction**: NPS 55 (Satisfied)

### Key Insights

1. **Templates Help**: Users love templates but need customization
2. **Collaboration Friction**: Communication and coordination need improvement
3. **Visibility Gap**: Hard to see project health at a glance
4. **Learning Lost**: Retrospective insights not captured systematically

### Priority Improvements

1. **High - Project Health Dashboard**
   - At-a-glance project status
   - Risk indicators
   - Team workload view
   - Expected impact: +20% on-time completion

2. **Medium - Collaboration Tools**
   - Improved notifications
   - Bulk assignment
   - Request update feature
   - Expected impact: +15% team engagement

3. **Medium - Retrospective Tools**
   - Auto-generated reports
   - Metrics dashboard
   - Lessons learned capture
   - Expected impact: Improved future planning

4. **Low - Celebration**
   - Completion UI
   - Team recognition
   - Share success
   - Expected impact: Improved satisfaction
```

---

### Example 4: Error Recovery Journey

```markdown
# User Journey: Recovering from Payment Failure

**Persona**: David, Paid User
**Goal**: Resolve payment failure and restore service
**Scenario**: David's credit card expired, causing payment failure
**Date Created**: 2025-10-25

---

## Stage 1: Notification

### Touchpoints
- Email: "Payment failed"
- In-app banner
- App functionality

### User Actions
- Opens email notification
- Logs into app
- Sees banner: "Payment failed"
- Clicks to update payment

### Thoughts
- "Oh no, what happened?"
- "I hope my data is safe"
- "Need to fix this quickly"

### Emotions
- 😟 Worried (High)
- 😟 Frustrated (Medium)

### Pain Points
- Email is alarming (red, urgent language)
- Banner blocks entire UI
- Not clear what features are disabled
- No explanation of why it failed

### Opportunities
- Use calm, helpful language in email
- Make banner dismissible
- Explain: "Your card expired"
- Show grace period: "You have 5 days"
- List what's still accessible

---

## Stage 2: Resolution

### Touchpoints
- Payment settings page
- Credit card form
- Confirmation page

### User Actions
- Navigates to billing settings
- Updates credit card info
- Submits new card
- Receives confirmation
- Waits for retry

### Thoughts
- "Is this secure?"
- "When will service restore?"
- "Hope this works"

### Emotions
- 😐 Cautious (Medium)
- 😟 Anxious (Medium)

### Pain Points
- Form requires re-entering all details
- No indication when retry happens
- No immediate confirmation
- Unclear if service is restored

### Opportunities
- Auto-detect card details (with consent)
- Show: "We'll retry in a few minutes"
- Immediate confirmation: "Payment successful!"
- Auto-redirect to app when resolved

---

## Stage 3: Restoration

### Touchpoints
- Email: "Payment successful"
- App (full access restored)
- Support chat (if needed)

### User Actions
- Receives confirmation email
- Logs back into app
- Verifies full access
- Continues work

### Thoughts
- "Phew, that's resolved"
- "Glad my data is safe"
- "Should set up auto-update"

### Emotions
- 😊 Relieved (High)
- 😐 Neutral (returning to work)

### Pain Points
- Process took 30 minutes total
- Stressful experience
- No follow-up explanation
- Didn't know about grace period earlier

### Opportunities
- Proactive card expiry reminders
- Add automatic card update service
- Reduce resolution time to < 5 min
- Send "All good now" email
- Offer credit for downtime

---

## Journey Summary

**Duration**: 30 minutes (time to discover and resolve)
**Success Rate**: 85% resolve within 24 hours, 15% churn
**Drop-off Points**:
- 10% don't open email notification
- 5% can't resolve (wrong card, no backup)
- 15% churn (frustrated with experience)

**Overall Satisfaction**: NPS -15 (Detractors)

### Key Insights

1. **Fear and Uncertainty**: Users panic when seeing failure notification
2. **Resolution Friction**: Payment update process is stressful
3. **Communication Gap**: Users don't understand grace period or timeline
4. **Prevention Opportunity**: Could prevent 80% of failures with expiry reminders

### Priority Improvements

1. **High - Prevent Failures**
   - Send card expiry reminders (30, 15, 7 days before)
   - Offer card update service (save new card on file)
   - Expected impact: -80% payment failures

2. **High - Improve Communication**
   - Use calm, helpful language
   - Explain grace period upfront
   - Show timeline for resolution
   - Expected impact: -50% churn from failures

3. **Medium - Streamline Resolution**
   - One-click card update
   - Immediate retry after update
   - Real-time status updates
   - Expected impact: -50% resolution time

4. **Low - Recovery**
   - Apologize for disruption
   - Offer discount/credit for downtime
   - Send "We're here to help" message
   - Expected impact: Improved retention
```

---

## Journey Map Components

### 1. Touchpoints

**Definition**: Any point of interaction between user and your product/service.

**Types**:
- **Digital**: Website, app, email, SMS, push notifications, chatbot
- **Human**: Support call, sales call, in-person meeting
- **Physical**: Packaging, physical product, retail location
- **Indirect**: Reviews, social media, word-of-mouth

**Examples**:
- User visits landing page (digital touchpoint)
- User receives welcome email (digital touchpoint)
- User calls support (human touchpoint)
- User reads review on G2 (indirect touchpoint)

---

### 2. User Actions

**Definition**: Specific behaviors and tasks user performs at each stage.

**Be Specific**:
- ✅ Good: "Enters email and password, clicks 'Sign In', waits 2 seconds for redirect"
- ❌ Bad: "Logs in"

**Include**:
- Mouse clicks, taps, swipes
- Text input
- Navigation choices
- Wait times
- External actions (checking email, asking colleague)

---

### 3. Thoughts

**Definition**: What user is thinking at each stage - questions, concerns, expectations.

**Capture**:
- Questions: "How much does this cost?"
- Concerns: "Is this secure?"
- Doubts: "Will this work for me?"
- Expectations: "This should be quick"

**Source**: User interviews, think-aloud sessions, surveys

---

### 4. Emotions

**Definition**: User's emotional state throughout journey.

**Emotion Scale**:
- 😊 Positive (joy, satisfaction, excitement, relief)
- 😐 Neutral (focused, calm, neutral)
- 😟 Negative (frustration, confusion, anxiety, anger)

**Intensity**: Low / Medium / High

**Track Changes**: Map emotional ups and downs across journey

**Example**:
```
Stage 1: 😊 Excited (High) - seeing product demo
Stage 2: 😟 Frustrated (Medium) - complicated signup form
Stage 3: 😊 Satisfied (High) - completed first task
```

---

### 5. Pain Points

**Definition**: Problems, friction, obstacles that prevent smooth experience.

**Types**:
- **Usability**: Confusing UI, hard to find, too many steps
- **Technical**: Slow load, errors, crashes, bugs
- **Communication**: Unclear messaging, jargon, missing information
- **Process**: Too many steps, redundant actions, waiting
- **Emotional**: Anxiety, uncertainty, frustration

**Format**:
- [Problem description]
- [Impact on user]
- [Frequency: Common / Occasional / Rare]

---

### 6. Opportunities

**Definition**: Ideas for improving experience and addressing pain points.

**Types**:
- **Fix Pain Points**: Directly address identified problems
- **Enhance Positives**: Make good experiences even better
- **Add Value**: New features or services
- **Reduce Friction**: Simplify, automate, streamline

**Prioritize**:
- **High Impact / Low Effort**: Quick wins
- **High Impact / High Effort**: Strategic initiatives
- **Low Impact / Low Effort**: Nice-to-haves
- **Low Impact / High Effort**: Avoid

---

### 7. Supporting Evidence

**Definition**: Data and research backing up each stage of journey.

**Sources**:
- User interviews and testing
- Analytics (Google Analytics, Mixpanel)
- Session recordings (Hotjar, FullStory)
- Support tickets and chat logs
- Surveys and NPS
- A/B test results
- Heatmaps and click tracking

**Example**:
- "40% bounce rate on this page (Google Analytics)"
- "Average task completion time: 5 minutes (user testing)"
- "15 support tickets about this issue (Zendesk)"

---

## Creating Effective Journeys

### Step 1: Define Scope

**Questions to Answer**:
- Who is the user? (Persona)
- What is their goal?
- Where does journey start and end?
- What scenario/context?

**Example**:
- **Who**: Sarah, first-time SaaS user
- **Goal**: Sign up and create first project
- **Start**: Lands on homepage
- **End**: Completes first project
- **Context**: Referred by colleague, trying during work hours

---

### Step 2: Map Stages

**Common Journey Stages**:

1. **Awareness**: User becomes aware of need or solution
2. **Consideration**: User evaluates options
3. **Acquisition**: User signs up or purchases
4. **Service**: User actively uses product
5. **Loyalty**: User becomes repeat customer or advocate

**Customize for Your Journey**:
- Onboarding: Discovery → Signup → First Use → Exploration → Value
- Feature Adoption: Awareness → Trial → Activation → Mastery
- Purchase: Browse → Compare → Add to Cart → Checkout → Delivery
- Support: Issue → Contact → Resolution → Follow-up

---

### Step 3: Identify Touchpoints

**For Each Stage, List**:
- Where does user interact?
- What channels?
- Which tools or interfaces?

**Don't Miss**:
- Before/after primary touchpoints (discovery, follow-up)
- Indirect touchpoints (reviews, referrals)
- Cross-channel touchpoints (email → app, app → support)

---

### Step 4: Document Actions & Thoughts

**Use Real User Data**:
- Conduct user interviews
- Watch session recordings
- Run think-aloud usability tests
- Review support conversations

**Be Detailed**:
- Not: "User signs up"
- Instead: "User enters email, creates password (struggles with requirements), clicks signup, waits for email (checks spam), clicks verification link"

---

### Step 5: Capture Emotions

**Techniques**:
- Ask users: "How did you feel at this point?"
- Observe reactions during testing
- Use emotion cards in interviews
- Review feedback and reviews for emotional language

**Track Transitions**:
- Where do emotions shift?
- What causes positive/negative changes?
- Where are emotional peaks and valleys?

---

### Step 6: Identify Pain Points

**Sources**:
- User complaints and feedback
- Support ticket patterns
- Low conversion or high drop-off rates
- Analytics showing abandonment
- Usability test failures

**Validate**:
- Is this a real problem? (not just one user)
- How many users affected?
- What's the impact? (blocker vs. annoyance)

---

### Step 7: Define Opportunities

**For Each Pain Point**:
- How could this be solved?
- What's the effort required?
- What's the expected impact?
- Priority: High / Medium / Low

**Think Creatively**:
- Can we eliminate the step entirely?
- Can we automate it?
- Can we make it delightful instead of functional?
- What would the ideal experience be?

---

## Integration with Personas

### Connecting Personas to Journeys

**Personas**: Who the user is (demographics, goals, behaviors)
**Journeys**: What the user does (actions, emotions, pain points)

### Use Personas in Journeys

1. **Select Persona**: Choose which persona this journey is for
2. **Apply Persona Insights**: Use persona's goals, motivations, tech-savvy level
3. **Customize Journey**: Different personas may have different journeys for same goal
4. **Test Assumptions**: Validate journey with real users matching persona

### Example: Same Goal, Different Personas

**Goal**: Purchase product online

**Persona A: Tech-Savvy Millennial**
- Journey: Quick browse → Add to cart → Express checkout (saved payment) → Done
- Emotions: Neutral throughout, just wants efficiency
- Pain Points: Any friction or extra steps

**Persona B: Senior Citizen, First Online Purchase**
- Journey: Slow browse → Read reviews → Add to cart → Hesitant at checkout → Calls support → Completes purchase
- Emotions: Anxious at checkout, relieved after support help
- Pain Points: Confusing checkout, fear of fraud, no human help

**Design Implication**: Need both quick path AND supportive path

---

## Tips and Best Practices

### DO ✅

- **Start with Research**: Base journeys on real user data, not assumptions
- **Be Specific**: Detail specific actions, not generic "user logs in"
- **Include Emotions**: Empathy is key to great UX
- **Find Patterns**: Look for common pain points across users
- **Prioritize Fixes**: Not all pain points are equally important
- **Update Regularly**: Journeys change as product evolves
- **Share Widely**: Make journeys visible to entire team
- **Test Solutions**: Validate that improvements actually help

### DON'T ❌

- **Don't Assume**: Every assumption should be validated with data
- **Don't Skip Stages**: Include the full journey, not just key moments
- **Don't Ignore Edge Cases**: Unhappy paths are important too
- **Don't Make It Perfect**: Journey maps are tools, not art projects
- **Don't Create and Forget**: Use journey maps to drive improvements
- **Don't Go It Alone**: Involve designers, developers, product managers
- **Don't Be Generic**: "User is frustrated" - why? what specifically?

### Common Mistakes

1. **Too High-Level**: "User signs up and uses app" - not useful!
2. **Missing Emotions**: Only documenting actions, not feelings
3. **No Evidence**: Guessing instead of using real data
4. **No Prioritization**: Every pain point marked "high priority"
5. **Single Perspective**: Only mapping happy path, ignoring errors
6. **No Follow-Through**: Creating journey, then not using it

---

## Tools and Resources

### Journey Mapping Tools

- **Miro/Mural**: Collaborative online whiteboards
- **Smaply**: Dedicated journey mapping software
- **UXPressia**: Persona and journey map tool
- **Figma/FigJam**: Design tool with templates
- **Markdown**: Simple text format (like these templates!)

### Research Methods

- **User Interviews**: Ask about experiences
- **Usability Testing**: Observe users completing tasks
- **Surveys**: Quantitative validation of pain points
- **Analytics**: Track behavior and drop-off
- **Session Recordings**: See actual user interactions
- **Support Tickets**: Find common problems

### Further Reading

- Nielsen Norman Group: Journey Mapping 101
- Adaptive Path: Guide to Experience Mapping
- IDEO: Customer Experience Journey Map
- UX Magazine: Creating Customer Journey Maps

---

## Workflow with Other UX Tools

### Recommended Sequence

1. **Define Personas** (Phase 5: `requirements-templates.md`)
   - Who are your users?
   - What are their goals?

2. **Map User Journeys** (This tool)
   - What path do users take?
   - Where are pain points?

3. **Create Wireframes** (`wireframe-templates.md`)
   - Design screens for each touchpoint
   - Address identified pain points

4. **Design Flows** (`mermaid-ux-flows.md`)
   - Show navigation between screens
   - Document decision points

5. **Define Requirements** (Phase 5: `requirements-templates.md`)
   - Turn opportunities into user stories
   - Prioritize based on journey insights

6. **Implement & Test**
   - Build solutions
   - Validate improvements

7. **Measure & Iterate**
   - Track metrics
   - Update journey maps
   - Continue improving

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
**Maintainer**: Humanlayer Greenfield Transformation Team
