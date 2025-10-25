# Wireframe Templates Utility

**Purpose**: Provides ASCII wireframe templates for rapid UX design and prototyping before implementation.

**When to use**: Before implementing any new feature or page, create a wireframe to visualize layout, components, and user flow.

**2025 UX Best Practices**: Mobile-first, accessible (WCAG 2.1), clean visual hierarchy, minimal cognitive load.

---

## Table of Contents

1. [Page Templates](#page-templates)
2. [Responsive Layouts](#responsive-layouts)
3. [Component Library](#component-library)
4. [Usage Guidelines](#usage-guidelines)
5. [Customization Guide](#customization-guide)

---

## Page Templates

### 1. Login/Signup Page

**Use case**: Authentication, user onboarding
**Key elements**: Logo, form, social login, links
**Accessibility**: Clear labels, error messages, keyboard navigation

```
Desktop (1200px+):
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                    [Logo/Brand]                          │
│                                                          │
│                 Welcome Back! 👋                         │
│              Sign in to your account                     │
│                                                          │
│              ┌────────────────────┐                      │
│  Email:      │                    │                      │
│              └────────────────────┘                      │
│                                                          │
│              ┌────────────────────┐                      │
│  Password:   │ ****************** │  [👁 Show]          │
│              └────────────────────┘                      │
│                                                          │
│              ☐ Remember me     [Forgot password?]        │
│                                                          │
│              ┌────────────────────┐                      │
│              │   Sign In →        │ (Primary button)     │
│              └────────────────────┘                      │
│                                                          │
│                   ─── OR ───                             │
│                                                          │
│              ┌────────────────────┐                      │
│              │ [G] Google Sign In │                      │
│              └────────────────────┘                      │
│              ┌────────────────────┐                      │
│              │ [f] Facebook Login │                      │
│              └────────────────────┘                      │
│                                                          │
│         Don't have an account? [Sign up]                 │
│                                                          │
└──────────────────────────────────────────────────────────┘

Mobile (375px):
┌──────────────────┐
│                  │
│   [Logo/Brand]   │
│                  │
│  Welcome Back!   │
│                  │
│ ┌──────────────┐ │
│ │ Email        │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │ Password  👁 │ │
│ └──────────────┘ │
│                  │
│ ☐ Remember me    │
│                  │
│ ┌──────────────┐ │
│ │  Sign In →   │ │
│ └──────────────┘ │
│                  │
│    ─── OR ───    │
│                  │
│ ┌──────────────┐ │
│ │ [G] Google   │ │
│ └──────────────┘ │
│                  │
│ Don't have an    │
│ account? Sign up │
│                  │
└──────────────────┘
```

**Variations**:
- **Sign Up Page**: Add "Confirm Password" field, terms checkbox
- **Password Reset**: Single email field + submit button
- **Magic Link**: Just email field, no password

---

### 2. Dashboard Layout

**Use case**: Main landing page after login, overview of key metrics
**Key elements**: Navigation, stats cards, activity feed, actions
**Accessibility**: Landmark regions, heading hierarchy, skip links

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [☰] Logo          Dashboard    Profile    Settings    [User ▼]    │ ← Header/Nav
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  👋 Welcome back, Sarah!                                          │
│  Here's what's happening with your projects today.                │
│                                                                    │
│  📊 Quick Stats                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Total Posts │  │ Total Users │  │ Total Views │              │
│  │    247      │  │    1,523    │  │   12.4K     │              │
│  │ +12% ↑      │  │ +8% ↑       │  │ +15% ↑      │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                    │
│  📝 Recent Activity                    [View All →]               │
│  ┌────────────────────────────────────────────────┐              │
│  │ 📄 New post: "Getting Started with React 19"  │              │
│  │    By: John Doe • 2 hours ago                 │              │
│  │    [View] [Edit] [Delete]                      │              │
│  └────────────────────────────────────────────────┘              │
│  ┌────────────────────────────────────────────────┐              │
│  │ 👤 New user registered: alice@example.com      │              │
│  │    3 hours ago                                 │              │
│  └────────────────────────────────────────────────┘              │
│  ┌────────────────────────────────────────────────┐              │
│  │ ⚙️ Settings updated: Email notifications ON    │              │
│  │    5 hours ago                                 │              │
│  └────────────────────────────────────────────────┘              │
│                                                                    │
│  🔥 Quick Actions                                                 │
│  [+ Create Post]  [📧 Invite Users]  [📊 View Analytics]        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│ [☰] Logo  [User▼] │
├────────────────────┤
│                    │
│ 👋 Welcome, Sarah! │
│                    │
│ 📊 Quick Stats      │
│ ┌────────────────┐ │
│ │ Total Posts    │ │
│ │     247        │ │
│ │   +12% ↑       │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Total Users    │ │
│ │    1,523       │ │
│ │   +8% ↑        │ │
│ └────────────────┘ │
│                    │
│ 📝 Activity [All→] │
│ ┌────────────────┐ │
│ │ New post:      │ │
│ │ "Getting..."   │ │
│ │ By: John • 2h  │ │
│ │ [View] [Edit]  │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ User signed up │ │
│ │ alice@...      │ │
│ │ 3h ago         │ │
│ └────────────────┘ │
│                    │
│ 🔥 Quick Actions    │
│ [+ Create Post]    │
│ [📧 Invite Users]   │
│                    │
└────────────────────┘
```

**Variations**:
- **Admin Dashboard**: Add system health metrics, user management
- **Analytics Dashboard**: Charts and graphs instead of activity feed
- **E-commerce Dashboard**: Sales, orders, revenue stats

---

### 3. List View Page

**Use case**: Display collection of items (posts, users, products)
**Key elements**: Search/filter, table/cards, pagination, actions
**Accessibility**: Sortable columns, keyboard navigation, ARIA labels

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [☰] Logo          Posts       Users       Settings    [User ▼]    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  📝 Posts                                    [+ Create New Post]   │
│                                                                    │
│  ┌──────────────────────────┐  🔍 [Search posts...           ]   │
│  │ ☐ All (247)              │                                     │
│  │ ☐ Published (189)        │  🔽 Filter: [All Authors ▼]        │
│  │ ☐ Draft (58)             │  🔽 Sort: [Newest First ▼]         │
│  │ ☐ Archived (12)          │                                     │
│  └──────────────────────────┘                                     │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Title ↕         │ Author ↕    │ Status ↕  │ Date ↕  │ Actions│  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ Getting Started │ John Doe    │ ✅ Pub    │ 2h ago │ [⋮]   │  │
│  │ with React 19   │             │           │        │       │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ Understanding   │ Jane Smith  │ 📝 Draft  │ 1d ago │ [⋮]   │  │
│  │ TypeScript 5.5  │             │           │        │       │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ Database        │ Bob Johnson │ ✅ Pub    │ 2d ago │ [⋮]   │  │
│  │ Optimization    │             │           │        │       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ← 1 [2] [3] [4] [5] ... [25] →               Showing 1-10 of 247│
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Card View Alternative:
┌────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────┐  ┌─────────────────────┐                  │
│ │ Getting Started     │  │ Understanding       │                  │
│ │ with React 19       │  │ TypeScript 5.5      │                  │
│ │                     │  │                     │                  │
│ │ By: John Doe        │  │ By: Jane Smith      │                  │
│ │ 📅 2h ago           │  │ 📅 1d ago           │                  │
│ │ ✅ Published        │  │ 📝 Draft            │                  │
│ │                     │  │                     │                  │
│ │ [View] [Edit] [Del] │  │ [View] [Edit] [Del] │                  │
│ └─────────────────────┘  └─────────────────────┘                  │
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│ [☰] Posts [User▼] │
├────────────────────┤
│                    │
│ 🔍 [Search...    ] │
│                    │
│ [All▼] [Newest▼]  │
│                    │
│ [+ New Post]       │
│                    │
│ ┌────────────────┐ │
│ │ Getting Started│ │
│ │ with React 19  │ │
│ │ By: John • 2h  │ │
│ │ ✅ Published   │ │
│ │ [View] [Edit]  │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Understanding  │ │
│ │ TypeScript 5.5 │ │
│ │ By: Jane • 1d  │ │
│ │ 📝 Draft       │ │
│ │ [View] [Edit]  │ │
│ └────────────────┘ │
│                    │
│ ← [2] [3] [4] →    │
│                    │
└────────────────────┘
```

**Variations**:
- **User List**: Avatar, name, email, role, actions
- **Product List**: Image, name, price, stock, actions
- **Invoice List**: Number, customer, amount, status, date

---

### 4. Detail/Edit Page

**Use case**: View and edit single item details
**Key elements**: Form fields, save/cancel, validation, actions
**Accessibility**: Form labels, required fields marked, error messages

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [☰] Logo          Posts       Users       Settings    [User ▼]    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ← Back to Posts                                                   │
│                                                                    │
│  ✏️ Edit Post: "Getting Started with React 19"                    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Title *                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────┐ │ │
│  │ │ Getting Started with React 19                            │ │ │
│  │ └──────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ Slug                                                          │ │
│  │ ┌──────────────────────────────────────────────────────────┐ │ │
│  │ │ getting-started-with-react-19                            │ │ │
│  │ └──────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ Content * (Markdown supported)                                │ │
│  │ ┌──────────────────────────────────────────────────────────┐ │ │
│  │ │ # Introduction                                           │ │ │
│  │ │                                                          │ │ │
│  │ │ React 19 introduces several new features...             │ │ │
│  │ │                                                          │ │ │
│  │ │ ## Key Features                                          │ │ │
│  │ │ - Server Components                                      │ │ │
│  │ │ - Improved hydration                                     │ │ │
│  │ │                                                          │ │ │
│  │ └──────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ Category *                           Status *                 │ │
│  │ ┌──────────────────┐                ┌──────────────────┐     │ │
│  │ │ Tutorial      ▼  │                │ Published     ▼  │     │ │
│  │ └──────────────────┘                └──────────────────┘     │ │
│  │                                                               │ │
│  │ Tags (comma-separated)                                        │ │
│  │ ┌──────────────────────────────────────────────────────────┐ │ │
│  │ │ react, typescript, tutorial, frontend                    │ │ │
│  │ └──────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │ ☑ Feature this post                                          │ │
│  │ ☐ Allow comments                                             │ │
│  │                                                               │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  [Cancel]                                      [Save Draft] [Publish]│
│                                                                    │
│  ───────────────────────────────────────────────────────────────  │
│                                                                    │
│  ⚙️ Metadata                                                       │
│  Created: 2 hours ago by John Doe                                 │
│  Last edited: 5 minutes ago                                       │
│  Views: 0 (unpublished)                                           │
│                                                                    │
│  🗑️ Danger Zone                                                   │
│  [Delete Post] This action cannot be undone                       │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│ ← Posts  [User▼]   │
├────────────────────┤
│ ✏️ Edit Post        │
│                    │
│ Title *            │
│ ┌────────────────┐ │
│ │Getting Started │ │
│ │with React 19   │ │
│ └────────────────┘ │
│                    │
│ Slug               │
│ ┌────────────────┐ │
│ │getting-start...│ │
│ └────────────────┘ │
│                    │
│ Content *          │
│ ┌────────────────┐ │
│ │# Introduction  │ │
│ │                │ │
│ │React 19...     │ │
│ │                │ │
│ │                │ │
│ └────────────────┘ │
│                    │
│ Category *         │
│ [Tutorial      ▼]  │
│                    │
│ Status *           │
│ [Published     ▼]  │
│                    │
│ Tags               │
│ ┌────────────────┐ │
│ │react, typescr..│ │
│ └────────────────┘ │
│                    │
│ ☑ Feature this     │
│ ☐ Allow comments   │
│                    │
│ [Cancel] [Save]    │
│                    │
│ ⚙️ Metadata         │
│ Created: 2h ago    │
│ By: John Doe       │
│                    │
│ 🗑️ [Delete Post]   │
│                    │
└────────────────────┘
```

**Variations**:
- **Read-only View**: Remove form inputs, show formatted content
- **User Profile Edit**: Avatar upload, bio, social links
- **Product Edit**: Images, pricing, inventory, variants

---

### 5. Settings Page

**Use case**: User preferences and account configuration
**Key elements**: Tabs/sections, toggles, form fields, save button
**Accessibility**: Clear section headings, keyboard navigation

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [☰] Logo          Dashboard    Profile    Settings    [User ▼]    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ⚙️ Settings                                                       │
│                                                                    │
│  ┌──────────────┐  ┌────────────────────────────────────────────┐│
│  │ [Profile   ] │  │ 👤 Profile Information                     ││
│  │              │  │                                            ││
│  │  Account     │  │ ┌────────────┐  ┌────────────┐            ││
│  │              │  │ │ First Name │  │ Last Name  │            ││
│  │  Security    │  │ │ John       │  │ Doe        │            ││
│  │              │  │ └────────────┘  └────────────┘            ││
│  │  Notifications│  │                                            ││
│  │              │  │ Email                                      ││
│  │  Privacy     │  │ ┌──────────────────────────┐              ││
│  │              │  │ │ john.doe@example.com     │              ││
│  │  Billing     │  │ └──────────────────────────┘              ││
│  └──────────────┘  │                                            ││
│                    │ Bio                                        ││
│                    │ ┌──────────────────────────┐              ││
│                    │ │ Full-stack developer     │              ││
│                    │ │ passionate about React   │              ││
│                    │ │ and TypeScript           │              ││
│                    │ └──────────────────────────┘              ││
│                    │                                            ││
│                    │ Avatar                                     ││
│                    │ ┌────┐                                     ││
│                    │ │ JD │  [Upload New] [Remove]             ││
│                    │ └────┘                                     ││
│                    │                                            ││
│                    │ [Cancel]              [Save Changes]       ││
│                    └────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘

Account Tab:
┌────────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌────────────────────────────────────────────┐│
│  │  Profile     │  │ 🔐 Account Settings                        ││
│  │              │  │                                            ││
│  │ [Account   ] │  │ Email Address                              ││
│  │              │  │ john.doe@example.com                       ││
│  │  Security    │  │                                            ││
│  │              │  │ Username                                   ││
│  │  Notifications│  │ ┌──────────────────────────┐              ││
│  │              │  │ │ johndoe                  │              ││
│  │  Privacy     │  │ └──────────────────────────┘              ││
│  │              │  │                                            ││
│  │  Billing     │  │ Language                                   ││
│  └──────────────┘  │ [English (US)           ▼]                ││
│                    │                                            ││
│                    │ Timezone                                   ││
│                    │ [America/New_York       ▼]                ││
│                    │                                            ││
│                    │ ───────────────────────────────────        ││
│                    │                                            ││
│                    │ 🗑️ Delete Account                          ││
│                    │ Once you delete your account, there is     ││
│                    │ no going back. Please be certain.          ││
│                    │                                            ││
│                    │ [Delete My Account]                        ││
│                    └────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘

Notifications Tab:
┌────────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌────────────────────────────────────────────┐│
│  │  Profile     │  │ 🔔 Notification Preferences                ││
│  │              │  │                                            ││
│  │  Account     │  │ Email Notifications                        ││
│  │              │  │ ☑ New posts from people you follow         ││
│  │  Security    │  │ ☑ Comments on your posts                   ││
│  │              │  │ ☐ Replies to your comments                 ││
│  │[Notifications]│  │ ☑ Security alerts                          ││
│  │              │  │ ☐ Product updates and news                 ││
│  │  Privacy     │  │                                            ││
│  │              │  │ Push Notifications (Browser)               ││
│  │  Billing     │  │ ☑ Direct messages                          ││
│  └──────────────┘  │ ☑ Mentions                                 ││
│                    │ ☐ New followers                            ││
│                    │                                            ││
│                    │ Frequency                                  ││
│                    │ [Real-time              ▼]                ││
│                    │                                            ││
│                    │ Quiet Hours                                ││
│                    │ ☑ Enable quiet hours                       ││
│                    │ From: [10:00 PM ▼] To: [8:00 AM ▼]        ││
│                    │                                            ││
│                    │ [Cancel]              [Save Changes]       ││
│                    └────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│ [☰] Settings      │
├────────────────────┤
│                    │
│ [Profile]          │
│ [Account]          │
│ [Security]         │
│ [Notifications] ← │
│ [Privacy]          │
│ [Billing]          │
│                    │
│ 🔔 Notifications    │
│                    │
│ Email              │
│ ☑ New posts        │
│ ☑ Comments         │
│ ☐ Replies          │
│ ☑ Security         │
│ ☐ Updates          │
│                    │
│ Push               │
│ ☑ Direct messages  │
│ ☑ Mentions         │
│ ☐ New followers    │
│                    │
│ Frequency          │
│ [Real-time     ▼]  │
│                    │
│ Quiet Hours        │
│ ☑ Enable           │
│ 10PM - 8AM         │
│                    │
│ [Save Changes]     │
│                    │
└────────────────────┘
```

**Variations**:
- **Admin Settings**: System config, user roles, integrations
- **Team Settings**: Member management, permissions
- **App Settings**: Theme, display preferences, shortcuts

---

### 6. Landing Page

**Use case**: Marketing, first impression, conversion
**Key elements**: Hero, features, CTA, social proof, footer
**Accessibility**: Semantic HTML, alt text, keyboard navigation

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [Logo]              Features    Pricing    Docs    [Sign In] [Try] │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                     🚀 Hero Section                                │
│                                                                    │
│              Build MVPs 10x Faster with AI                         │
│           Transform ideas into working products                    │
│                    in days, not months                             │
│                                                                    │
│          [Get Started Free →]  [Watch Demo (2 min)]               │
│                                                                    │
│           ✓ No credit card  ✓ 14-day trial  ✓ Cancel anytime      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                                                              │ │
│  │         [Product Screenshot/Video Preview]                   │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ─────────────────────────────────────────────────────────────── │
│                                                                    │
│  As Featured In:  [TechCrunch] [ProductHunt] [HackerNews] [YC]   │
│                                                                    │
│  ─────────────────────────────────────────────────────────────── │
│                                                                    │
│              ✨ Features That Make You Productive                  │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 🎨 Beautiful │  │ 🚀 Lightning │  │ 🔒 Secure by │           │
│  │ UI Comps     │  │ Fast         │  │ Default      │           │
│  │              │  │              │  │              │           │
│  │ Pre-built    │  │ Optimized    │  │ Enterprise   │           │
│  │ components   │  │ for speed    │  │ grade auth   │           │
│  │ that just    │  │ from day one │  │ and security │           │
│  │ work         │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 📱 Responsive│  │ 🔌 Integrates│  │ 📊 Analytics │           │
│  │ by Default   │  │ Everything   │  │ Built-in     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  ─────────────────────────────────────────────────────────────── │
│                                                                    │
│              💬 What Our Users Say                                 │
│                                                                    │
│  ┌──────────────────────┐  ┌──────────────────────┐              │
│  │ ⭐⭐⭐⭐⭐               │  │ ⭐⭐⭐⭐⭐               │              │
│  │                      │  │                      │              │
│  │ "This tool saved me  │  │ "The best investment │              │
│  │  weeks of work!"     │  │  for our startup"    │              │
│  │                      │  │                      │              │
│  │ - Sarah, Founder     │  │ - Mike, CTO          │              │
│  │   [Company Logo]     │  │   [Company Logo]     │              │
│  └──────────────────────┘  └──────────────────────┘              │
│                                                                    │
│  ─────────────────────────────────────────────────────────────── │
│                                                                    │
│              📈 Pricing That Scales With You                       │
│                                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                        │
│  │  Starter │  │    Pro   │  │Enterprise│                        │
│  │   $0/mo  │  │  $29/mo  │  │ Custom   │                        │
│  │          │  │          │  │          │                        │
│  │ Perfect  │  │ For      │  │ For      │                        │
│  │ for      │  │ growing  │  │ large    │                        │
│  │ trying   │  │ teams    │  │ teams    │                        │
│  │          │  │          │  │          │                        │
│  │ [Start]  │  │ [Start]  │  │[Contact] │                        │
│  └──────────┘  └──────────┘  └──────────┘                        │
│                                                                    │
│  ─────────────────────────────────────────────────────────────── │
│                                                                    │
│                Ready to Get Started?                               │
│           Join 10,000+ developers building faster                  │
│                                                                    │
│                  [Start Building Now →]                            │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ Footer                                                             │
│ [Logo]                                                             │
│ Product    Company     Resources    Legal                          │
│ Features   About       Docs         Privacy                        │
│ Pricing    Team        Blog         Terms                          │
│ Updates    Careers     Support      Cookies                        │
│                                                                    │
│ © 2025 Company. Made with ❤️ in San Francisco.                    │
│ [Twitter] [GitHub] [LinkedIn] [Discord]                            │
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│[Logo]     [☰ Menu]│
├────────────────────┤
│                    │
│   Build MVPs 10x   │
│      Faster        │
│                    │
│ Transform ideas    │
│ into products in   │
│ days, not months   │
│                    │
│ [Get Started →]    │
│ [Watch Demo]       │
│                    │
│ ✓ No credit card   │
│ ✓ 14-day trial     │
│                    │
│ ┌────────────────┐ │
│ │                │ │
│ │   Screenshot   │ │
│ │                │ │
│ └────────────────┘ │
│                    │
│ Featured In:       │
│ [TC][PH][HN][YC]   │
│                    │
│ ✨ Features         │
│                    │
│ ┌────────────────┐ │
│ │ 🎨 Beautiful   │ │
│ │ UI Components  │ │
│ │                │ │
│ │ Pre-built...   │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ 🚀 Fast        │ │
│ │ Performance    │ │
│ └────────────────┘ │
│                    │
│ 💬 Testimonials    │
│ ⭐⭐⭐⭐⭐           │
│ "Amazing tool!"    │
│ - Sarah            │
│                    │
│ 📈 Pricing         │
│ ┌────────────────┐ │
│ │ Starter: Free  │ │
│ │ [Start Now]    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Pro: $29/mo    │ │
│ │ [Start Trial]  │ │
│ └────────────────┘ │
│                    │
│ Ready?             │
│ [Start Building]   │
│                    │
│ [Footer Links...]  │
│                    │
└────────────────────┘
```

**Variations**:
- **SaaS Landing**: Focus on features, benefits, social proof
- **E-commerce**: Product showcase, bestsellers, categories
- **Portfolio**: Projects, about, contact, testimonials

---

## Responsive Layouts

### Mobile-First Approach (2025 Best Practice)

**Philosophy**: Design for mobile first, then enhance for larger screens.

**Breakpoints**:
- Mobile: 375px - 767px (base)
- Tablet: 768px - 1023px (medium)
- Desktop: 1024px - 1439px (large)
- Wide: 1440px+ (extra-large)

### Layout Patterns

#### 1. Stack (Mobile) → Columns (Desktop)

```
Mobile (375px):           Desktop (1200px):
┌──────────┐              ┌────────────────────────┐
│ Content A│              │ Content A│ Content B   │
└──────────┘              └────────────────────────┘
┌──────────┐
│ Content B│
└──────────┘
```

#### 2. Hidden Navigation (Mobile) → Visible Nav (Desktop)

```
Mobile:                   Desktop:
┌──────────┐              ┌────────────────────────┐
│[☰] Logo  │              │Logo Nav1 Nav2 Nav3 [User]│
└──────────┘              └────────────────────────┘
```

#### 3. Full-width (Mobile) → Sidebar (Desktop)

```
Mobile:                   Desktop:
┌──────────┐              ┌────┬──────────────────┐
│ Content  │              │Side│    Content       │
│          │              │bar │                  │
│          │              │    │                  │
└──────────┘              └────┴──────────────────┘
```

---

## Component Library

### Navigation Components

#### Top Navigation Bar

```
Desktop:
┌────────────────────────────────────────────────────────────┐
│ [Logo/Brand]    Home    About    Features    Docs  [Sign In]│
└────────────────────────────────────────────────────────────┘

With Dropdown:
┌────────────────────────────────────────────────────────────┐
│ [Logo]    Home    Products ▼    Docs    [Contact Us]      │
│                   ┌────────────┐                           │
│                   │ Product A  │                           │
│                   │ Product B  │                           │
│                   │ Product C  │                           │
│                   └────────────┘                           │
└────────────────────────────────────────────────────────────┘

Mobile Hamburger:
┌────────────────┐
│ [☰]  [Logo]    │
│ ┌────────────┐ │ (Expanded)
│ │ Home       │ │
│ │ About      │ │
│ │ Features   │ │
│ │ Docs       │ │
│ │ Sign In    │ │
│ └────────────┘ │
└────────────────┘
```

#### Sidebar Navigation

```
┌──────────────┐
│ 📊 Dashboard │
│              │
│ 📝 Posts     │
│   → All Posts│ (Current)
│   → New Post │
│   → Categories│
│              │
│ 👥 Users     │
│   → All Users│
│   → Add User │
│              │
│ ⚙️ Settings  │
│              │
└──────────────┘
```

#### Breadcrumbs

```
Home / Products / Category / Item Name

[🏠 Home] → [Products] → [Electronics] → [Laptop]
```

#### Tabs

```
┌────────────────────────────────────────┐
│ [Overview] Details  Reviews  Related   │
├────────────────────────────────────────┤
│                                        │
│ Overview content here...               │
│                                        │
└────────────────────────────────────────┘
```

### Form Components

#### Text Input

```
Label *
┌──────────────────────────┐
│ Placeholder text...      │
└──────────────────────────┘
Helper text here

With Error:
Label *
┌──────────────────────────┐
│ Invalid value            │ ❌
└──────────────────────────┘
⚠️ Error message here

With Icon:
Label
┌──────────────────────────┐
│ 🔍 Search...             │
└──────────────────────────┘
```

#### Select Dropdown

```
Label *
┌──────────────────────────┐
│ Select an option...    ▼ │
└──────────────────────────┘

Expanded:
┌──────────────────────────┐
│ Option 1                 │
│ Option 2              ✓  │ (Selected)
│ Option 3                 │
│ Option 4                 │
└──────────────────────────┘
```

#### Checkbox & Radio

```
Checkbox:
☑ Option 1 (Checked)
☐ Option 2
☐ Option 3

Radio:
⦿ Option A (Selected)
○ Option B
○ Option C
```

#### Toggle Switch

```
Enable notifications    [ON  ◯]

Dark mode              [◯  OFF]
```

#### Text Area

```
Description
┌──────────────────────────┐
│ Multi-line text input... │
│                          │
│                          │
│                          │
└──────────────────────────┘
0/500 characters
```

### Button Components

```
Primary:    [  Submit  →  ]
Secondary:  [    Cancel    ]
Danger:     [    Delete    ]
Ghost:      [     Skip     ]
Icon:       [ 🗑 Delete    ]
Loading:    [ ⏳ Loading...  ]
Disabled:   [   Disabled   ] (grayed out)
```

### Card Components

```
Basic Card:
┌────────────────────────┐
│ Card Title             │
├────────────────────────┤
│ Card content goes here │
│ with multiple lines of │
│ text and information   │
│                        │
│ [Action Button]        │
└────────────────────────┘

Image Card:
┌────────────────────────┐
│ ┌────────────────────┐ │
│ │   [Image/Photo]    │ │
│ └────────────────────┘ │
│ Card Title             │
│ Short description here │
│ [Learn More →]         │
└────────────────────────┘

Stats Card:
┌────────────────────────┐
│ 📈 Total Revenue       │
│                        │
│   $127,492             │
│   +12.3% ↑             │
│                        │
│ [View Details]         │
└────────────────────────┘
```

### Modal/Dialog

```
Background: [Dimmed/Overlay]
┌────────────────────────────────┐
│ ✕                              │
│                                │
│       Modal Title              │
│                                │
│ Modal content goes here with   │
│ text, forms, or other elements │
│                                │
│ [Cancel]        [Confirm]      │
└────────────────────────────────┘

Alert/Confirm:
┌────────────────────────────────┐
│ ⚠️  Are you sure?              │
│                                │
│ This action cannot be undone.  │
│                                │
│ [Cancel]        [Delete]       │
└────────────────────────────────┘
```

### Table

```
┌─────────────────────────────────────────────────────────┐
│ Name ↕         │ Email ↕          │ Role ↕    │ Actions│
├─────────────────────────────────────────────────────────┤
│ John Doe       │ john@example.com │ Admin     │ [⋮]   │
│ Jane Smith     │ jane@example.com │ Editor    │ [⋮]   │
│ Bob Johnson    │ bob@example.com  │ Viewer    │ [⋮]   │
└─────────────────────────────────────────────────────────┘
```

### Alert/Notification

```
Success:
┌────────────────────────────────────────┐
│ ✓ Success! Your changes have been saved│ ✕
└────────────────────────────────────────┘

Error:
┌────────────────────────────────────────┐
│ ❌ Error: Failed to save changes       │ ✕
└────────────────────────────────────────┘

Warning:
┌────────────────────────────────────────┐
│ ⚠️ Warning: Your session will expire    │ ✕
└────────────────────────────────────────┘

Info:
┌────────────────────────────────────────┐
│ ℹ️ Info: New version available          │ ✕
└────────────────────────────────────────┘
```

### Loading States

```
Spinner:
   ⏳ Loading...

Progress Bar:
Loading [████████░░░░░░░░] 50%

Skeleton:
┌────────────────────────┐
│ ░░░░░░░░░░░░           │
│ ░░░░░░░░░░░░░░░░░░     │
│ ░░░░░░░░░░             │
└────────────────────────┘
```

### Empty States

```
┌────────────────────────┐
│         📭             │
│                        │
│   No Posts Yet         │
│                        │
│ Create your first post │
│ to get started         │
│                        │
│ [+ Create Post]        │
└────────────────────────┘
```

---

## Usage Guidelines

### When to Use Each Template

**Login/Signup**:
- User authentication entry points
- Registration flows
- Password reset

**Dashboard**:
- Main post-login landing page
- Overview of key information
- Quick access to common actions

**List View**:
- Display collections (posts, users, products)
- Bulk operations
- Search and filter data

**Detail/Edit**:
- View single item details
- Edit/update item
- Delete operations

**Settings**:
- User preferences
- Account configuration
- Application settings

**Landing Page**:
- Marketing homepage
- Product introduction
- Lead conversion

### Design Principles (2025)

1. **Mobile-First**: Design for smallest screen first, enhance for larger
2. **Accessibility**: WCAG 2.1 AA compliance minimum
3. **Simplicity**: Remove unnecessary elements
4. **Consistency**: Same patterns across pages
5. **Performance**: Optimize for fast load times
6. **Feedback**: Clear loading, success, error states
7. **White Space**: Don't crowd elements
8. **Hierarchy**: Clear visual hierarchy with typography and spacing

### Common Patterns

**F-Pattern Reading**: Users scan in F-shape (top-left heavy)
**Z-Pattern**: For pages with less content (hero sections)
**Gutenberg Diagram**: Visual weight in top-left, action in bottom-right

---

## Customization Guide

### How to Adapt Templates

1. **Replace Placeholders**: Update text, labels, field names
2. **Add/Remove Fields**: Adjust based on data model
3. **Adjust Layout**: Change grid/column structure
4. **Brand Colors**: Apply your color scheme (noted with comments)
5. **Icons/Imagery**: Replace generic icons with brand-appropriate ones
6. **Spacing**: Adjust padding/margins for your design system

### Example Customization

**Original Template**:
```
┌────────────────────────┐
│ Title                  │
│ Description            │
│ [Generic Button]       │
└────────────────────────┘
```

**Customized for E-commerce**:
```
┌────────────────────────┐
│ Product Name: $99.99   │
│ ⭐⭐⭐⭐⭐ (124 reviews)   │
│ [Add to Cart 🛒]       │
└────────────────────────┘
```

### Tools for Creating Wireframes

- **ASCII Tool**: Use monospace font (Courier, Monaco)
- **Box Drawing**: Unicode characters (│ ─ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼)
- **Emoji**: Use for quick visual indicators (🔍 📝 ⚙️ 👤)
- **Whitespace**: Use spaces for padding and alignment

---

## Best Practices

### DO ✅

- Start with wireframes before writing code
- Use consistent spacing and alignment
- Include loading and error states
- Design for keyboard navigation
- Add ARIA labels mentally (note them)
- Consider mobile first
- Show empty states
- Include success/error feedback
- Use clear, actionable labels
- Follow platform conventions (iOS/Android/Web)

### DON'T ❌

- Skip wireframing for "simple" features
- Overcrowd screens with too many elements
- Use vague labels ("Click here", "Submit")
- Forget about edge cases (long text, no data)
- Ignore accessibility
- Design only for desktop
- Hide important actions
- Use unclear icons without labels
- Assume users know your jargon
- Forget about loading states

---

## Integration with Other Tools

**Use with**:
- `user-journey-template.md`: Map user flow first, then wireframe each step
- `mermaid-ux-flows.md`: Create flow diagrams to show navigation between wireframes
- `greenfield-ux-analyzer` agent: Generate wireframes from descriptions
- Requirements templates: Match wireframes to user stories

**Workflow**:
1. Gather requirements → User stories
2. Map user journeys → Touchpoints
3. Create wireframes → Visual design
4. Create flow diagrams → Navigation
5. Validate with users → Iterate
6. Begin implementation → Refer to wireframes

---

## Resources

**Learn More**:
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Mobile-First Design: https://www.nngroup.com/articles/mobile-first-design/
- UX Patterns: https://ui-patterns.com/
- Accessibility: https://www.a11yproject.com/

**Tools**:
- Figma (high-fidelity mockups)
- Balsamiq (quick wireframes)
- Whimsical (flow + wireframes)
- Draw.io (free diagrams)

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
**Maintainer**: Humanlayer Greenfield Transformation Team
