# Authentication System - UX Design

**Project**: SaaS Next.js + Prisma Example
**Feature**: User Authentication (Email/Password + OAuth)
**Design Date**: 2025-10-25
**Status**: Phase 6B - UX Design Phase

---

## Design Philosophy

**2025 Best Practices Applied**:
- Mobile-first responsive design
- Minimal cognitive load (simple, clear forms)
- Progressive disclosure (show complexity only when needed)
- Accessible (WCAG 2.1 Level AA)
- Security-conscious UI (password visibility toggle, secure password requirements)
- Social login options for convenience

**User-Centered Goals**:
- Quick signup (< 2 minutes)
- Clear error messages and validation feedback
- Trust signals (security indicators, privacy policy)
- Smooth onboarding experience

---

## Wireframes

### 1. Login Page

**URL**: `/login`
**Purpose**: Allow existing users to authenticate
**Key Elements**: Email/password form, social login, password reset link, signup link

```
Desktop (1200px+):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                     ┌──────────────┐                            │
│                     │  [App Logo]  │                            │
│                     └──────────────┘                            │
│                                                                 │
│                    Welcome Back! 👋                             │
│                Sign in to your account                          │
│                                                                 │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Email:       │                          │                     │
│                └──────────────────────────┘                     │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Password:    │ ******************       │  [👁 Show]         │
│                └──────────────────────────┘                     │
│                                                                 │
│                ☐ Remember me         [Forgot password?]         │
│                                                                 │
│                ┌──────────────────────────┐                     │
│                │      Sign In →           │ (Primary CTA)       │
│                └──────────────────────────┘                     │
│                                                                 │
│                      ─── OR ───                                 │
│                                                                 │
│                ┌──────────────────────────┐                     │
│                │  [G] Continue with Google│ (Secondary)         │
│                └──────────────────────────┘                     │
│                                                                 │
│                                                                 │
│           Don't have an account? [Sign up here]                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│                    │
│   ┌──────────┐     │
│   │ App Logo │     │
│   └──────────┘     │
│                    │
│   Welcome Back!    │
│                    │
│  ┌──────────────┐  │
│  │ Email        │  │
│  └──────────────┘  │
│                    │
│  ┌──────────────┐  │
│  │ Password  👁 │  │
│  └──────────────┘  │
│                    │
│  ☐ Remember me     │
│  [Forgot password?]│
│                    │
│  ┌──────────────┐  │
│  │  Sign In →   │  │
│  └──────────────┘  │
│                    │
│     ─── OR ───     │
│                    │
│  ┌──────────────┐  │
│  │ [G] Google   │  │
│  └──────────────┘  │
│                    │
│  Don't have an     │
│  account? Sign up  │
│                    │
└────────────────────┘
```

**Interaction Notes**:
- Email field: Auto-focus on page load, email validation
- Password field: Toggle visibility with eye icon
- Remember me: Optional checkbox, stores session for 30 days
- Forgot password: Opens password reset flow
- Google OAuth: Opens OAuth consent flow in popup
- Sign up link: Navigates to `/signup`

**Validation**:
- Email: Valid email format required
- Password: Minimum 8 characters (checked on submit)
- Show inline error messages below fields
- Disable submit button while processing

**Error States**:
```
┌──────────────────────────┐
│ Email                    │
│ user@example.com         │
│ ⚠️ Invalid email address  │
└──────────────────────────┘

┌──────────────────────────┐
│ Password                 │
│ ********                 │
│ ❌ Incorrect password     │
└──────────────────────────┘

Alert banner (top of page):
┌────────────────────────────────────────┐
│ ❌ Authentication failed. Please check │
│    your email and password.            │
└────────────────────────────────────────┘
```

---

### 2. Sign Up Page

**URL**: `/signup`
**Purpose**: Allow new users to create an account
**Key Elements**: Name, email, password fields, terms acceptance, social signup

```
Desktop (1200px+):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     ┌──────────────┐                            │
│                     │  [App Logo]  │                            │
│                     └──────────────┘                            │
│                                                                 │
│                   Create Your Account                           │
│              Start your free 14-day trial                       │
│                                                                 │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Full Name:   │                          │                     │
│                └──────────────────────────┘                     │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Email:       │                          │                     │
│                └──────────────────────────┘                     │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Password:    │ ******************       │  [👁 Show]         │
│                └──────────────────────────┘                     │
│                Password strength: [▓▓▓▓░░] Strong              │
│                                                                 │
│                ┌──────────────────────────┐                     │
│   Confirm:     │ ******************       │  [👁 Show]         │
│                └──────────────────────────┘                     │
│                                                                 │
│                ☑ I agree to the [Terms of Service] and         │
│                  [Privacy Policy]                               │
│                                                                 │
│                ┌──────────────────────────┐                     │
│                │   Create Account →       │ (Primary CTA)       │
│                └──────────────────────────┘                     │
│                                                                 │
│                      ─── OR ───                                 │
│                                                                 │
│                ┌──────────────────────────┐                     │
│                │  [G] Sign up with Google │ (Secondary)         │
│                └──────────────────────────┘                     │
│                                                                 │
│                                                                 │
│           Already have an account? [Sign in]                    │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│   ┌──────────┐     │
│   │ App Logo │     │
│   └──────────┘     │
│                    │
│ Create Account     │
│ Free 14-day trial  │
│                    │
│  ┌──────────────┐  │
│  │ Full Name    │  │
│  └──────────────┘  │
│                    │
│  ┌──────────────┐  │
│  │ Email        │  │
│  └──────────────┘  │
│                    │
│  ┌──────────────┐  │
│  │ Password  👁 │  │
│  └──────────────┘  │
│  Strength: Strong  │
│                    │
│  ┌──────────────┐  │
│  │ Confirm   👁 │  │
│  └──────────────┘  │
│                    │
│  ☑ I agree to      │
│  Terms & Privacy   │
│                    │
│  ┌──────────────┐  │
│  │ Create Acct→ │  │
│  └──────────────┘  │
│                    │
│     ─── OR ───     │
│                    │
│  ┌──────────────┐  │
│  │ [G] Google   │  │
│  └──────────────┘  │
│                    │
│  Have an account?  │
│  Sign in           │
│                    │
└────────────────────┘
```

**Interaction Notes**:
- Name field: Auto-focus on page load, text validation
- Email field: Email format validation, check uniqueness on blur
- Password field: Real-time strength indicator
- Confirm password: Match validation with password field
- Terms checkbox: Required to enable submit button
- Google OAuth: Skips form, creates account from OAuth data
- Sign in link: Navigates to `/login`

**Password Requirements** (shown on focus):
```
┌──────────────────────────────────┐
│ Password requirements:           │
│ ✓ At least 8 characters          │
│ ✓ Contains uppercase letter      │
│ ✓ Contains lowercase letter      │
│ ✓ Contains number                │
│ ○ Contains special character     │
└──────────────────────────────────┘
```

**Validation**:
- Name: Required, min 2 characters
- Email: Valid format, unique (checked server-side)
- Password: Min 8 chars, uppercase, lowercase, number
- Confirm: Must match password
- Terms: Must be checked
- Show inline error messages below fields

---

### 3. Dashboard Layout (Post-Login)

**URL**: `/dashboard`
**Purpose**: Main landing page after successful authentication
**Key Elements**: Navigation header, welcome message, quick stats, recent activity

```
Desktop (1200px+):
┌────────────────────────────────────────────────────────────────────┐
│ [☰] Logo        Dashboard    Projects    Settings    [User ▼]     │ ← Header
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  👋 Welcome back, [User Name]!                                    │
│  Here's what's happening with your account today.                 │
│                                                                    │
│  📊 Quick Stats                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Total Items  │  │ Active Tasks │  │ Team Members │           │
│  │     0        │  │      0       │  │      1       │           │
│  │  Get started │  │  Create one  │  │  Invite more │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  🚀 Getting Started                                                │
│  ┌────────────────────────────────────────────────┐              │
│  │ Complete your profile                          │              │
│  │ Add profile picture, bio, and preferences      │              │
│  │ [Complete Profile →]                           │              │
│  └────────────────────────────────────────────────┘              │
│  ┌────────────────────────────────────────────────┐              │
│  │ Create your first project                      │              │
│  │ Projects help you organize your work           │              │
│  │ [+ New Project]                                │              │
│  └────────────────────────────────────────────────┘              │
│  ┌────────────────────────────────────────────────┐              │
│  │ Invite team members                            │              │
│  │ Collaborate with others on your projects       │              │
│  │ [Send Invites →]                               │              │
│  └────────────────────────────────────────────────┘              │
│                                                                    │
│  📝 Recent Activity                                                │
│  ┌────────────────────────────────────────────────┐              │
│  │ No recent activity yet.                        │              │
│  │ Start by creating your first project!          │              │
│  └────────────────────────────────────────────────┘              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│ [☰] Logo  [User▼] │
├────────────────────┤
│                    │
│ 👋 Welcome back!   │
│ [User Name]        │
│                    │
│ 📊 Quick Stats      │
│ ┌────────────────┐ │
│ │ Total Items    │ │
│ │      0         │ │
│ │  Get started   │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Active Tasks   │ │
│ │      0         │ │
│ │  Create one    │ │
│ └────────────────┘ │
│                    │
│ 🚀 Get Started      │
│ ┌────────────────┐ │
│ │ Complete       │ │
│ │ profile        │ │
│ │ [Do it now →]  │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Create first   │ │
│ │ project        │ │
│ │ [+ New]        │ │
│ └────────────────┘ │
│                    │
│ 📝 Activity         │
│ No activity yet    │
│                    │
└────────────────────┘
```

**Navigation Dropdown** (User menu):
```
┌──────────────────┐
│ [Avatar] Name    │
│ user@email.com   │
├──────────────────┤
│ 👤 Profile       │
│ ⚙️ Settings       │
│ 📊 Usage          │
│ ❓ Help           │
├──────────────────┤
│ 🚪 Sign Out       │
└──────────────────┘
```

**Mobile Navigation** (Hamburger menu):
```
┌────────────────────┐
│ [X] Close          │
├────────────────────┤
│                    │
│ 🏠 Dashboard        │
│ 📁 Projects         │
│ ⚙️ Settings         │
│                    │
├────────────────────┤
│                    │
│ 👤 Profile          │
│ ❓ Help             │
│ 🚪 Sign Out         │
│                    │
└────────────────────┘
```

**Interaction Notes**:
- Header: Fixed position, visible on scroll
- User dropdown: Click to expand, click outside to close
- Stats cards: Clickable, navigate to relevant sections
- Getting started cards: Onboarding flow, dismissible after completion
- Activity feed: Real-time updates, infinite scroll
- Mobile menu: Slide in from left, overlay

---

## Component Patterns

### Form Input Component

**States**: Default, Focus, Filled, Error, Disabled

```
Default:
┌────────────────────┐
│ Label              │
│ Placeholder text   │
└────────────────────┘

Focus (blue border):
┌────────────────────┐
│ Label              │
│ |                  │
└────────────────────┘

Filled:
┌────────────────────┐
│ Label              │
│ user@example.com   │
└────────────────────┘

Error (red border):
┌────────────────────┐
│ Label              │
│ invalid@           │
│ ⚠️ Invalid format   │
└────────────────────┘

Disabled (gray):
┌────────────────────┐
│ Label              │
│ (cannot edit)      │
└────────────────────┘
```

### Button Component

**Variants**: Primary, Secondary, Outline, Ghost, Danger

```
Primary (filled):
┌─────────────┐
│ Sign In →   │
└─────────────┘

Secondary (lighter):
┌─────────────┐
│ [G] Google  │
└─────────────┘

Outline (border only):
┌─────────────┐
│ Cancel      │
└─────────────┘

Ghost (no border):
┌─────────────┐
│ Learn More  │
└─────────────┘

Danger (red):
┌─────────────┐
│ Delete      │
└─────────────┘

Loading state:
┌─────────────┐
│ ⟳ Loading...│
└─────────────┘
```

### Alert/Banner Component

```
Success:
┌─────────────────────────────────┐
│ ✅ Account created successfully! │
└─────────────────────────────────┘

Error:
┌─────────────────────────────────┐
│ ❌ Authentication failed         │
└─────────────────────────────────┘

Warning:
┌─────────────────────────────────┐
│ ⚠️ Session expires in 5 minutes  │
└─────────────────────────────────┘

Info:
┌─────────────────────────────────┐
│ ℹ️ Check your email to verify    │
└─────────────────────────────────┘
```

---

## Responsive Breakpoints

**Design System**:
- Mobile: 375px - 767px (single column, stacked layout)
- Tablet: 768px - 1023px (two columns where appropriate)
- Desktop: 1024px+ (full layout with sidebars)

**Key Adaptations**:
- Mobile: Hamburger menu, full-width forms, vertical stats
- Tablet: Collapsible sidebar, two-column stats
- Desktop: Persistent sidebar, multi-column layouts

---

## Accessibility Features

**WCAG 2.1 Level AA Compliance**:
- Semantic HTML: `<form>`, `<label>`, `<button>` tags
- Keyboard navigation: Tab order, Enter to submit, Esc to cancel
- Screen reader support: ARIA labels, live regions for errors
- Color contrast: 4.5:1 minimum for text
- Focus indicators: Clear blue outline on focused elements
- Error announcements: Screen reader announces validation errors

**Focus Management**:
- Auto-focus first field on page load
- Move focus to error message on submit failure
- Trap focus in modals/dropdowns
- Return focus on modal close

---

## Security & Trust Signals

**Visual Trust Elements**:
- 🔒 HTTPS indicator in browser (mentioned in footer)
- "Your data is encrypted and secure" message on signup
- Password strength indicator (prevents weak passwords)
- Terms and Privacy Policy links (legal compliance)

**Security Best Practices**:
- No password visible by default (use toggle)
- Rate limiting on auth endpoints (prevent brute force)
- CSRF token protection (NextAuth.js handles this)
- Secure session cookies (httpOnly, sameSite)
- Password hashing with bcrypt (never store plaintext)

---

## Success Metrics

**UX Goals**:
- Signup completion rate: > 70%
- Time to first successful login: < 2 minutes
- Form abandonment rate: < 20%
- Password reset requests: < 5% of login attempts
- Mobile vs desktop conversion parity: 90%+

**Technical Goals**:
- Page load time: < 2 seconds
- Time to interactive: < 3 seconds
- Lighthouse accessibility score: > 95
- Zero critical security vulnerabilities

---

## Next Steps

After wireframe approval:
1. ✅ Proceed to user journey mapping
2. ✅ Implement wireframes in Next.js with Tailwind CSS
3. ✅ Add interactive validation and error handling
4. ✅ Implement accessibility features
5. ✅ Add responsive breakpoints
6. ✅ Test on real devices (iOS, Android, desktop browsers)
