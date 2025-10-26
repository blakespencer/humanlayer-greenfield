# Posts CRUD - Wireframes

**Created**: 2025-10-26
**Purpose**: Wireframes for Phase 6C - Posts CRUD functionality
**Entity**: Post (title, content, author, timestamps)

---

## Page 1: Dashboard - Posts List View

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] SaaS App              [Dashboard] [Settings] [Avatar ▼]│
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dashboard                                    [+ New Post]      │
│  ═══════════                                                    │
│                                                                 │
│  My Posts (3)                                                   │
│  ─────────────────────────────────────────────────────────     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  My First Blog Post                          [Edit]   │      │
│  │  Published 2 hours ago                      [Delete]  │      │
│  │  ─────────────────────────────────────────────────   │      │
│  │  This is the beginning of my blog journey...         │      │
│  │  It's been an exciting experience so far.            │      │
│  │                                              [Read →] │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  Learning TypeScript                         [Edit]   │      │
│  │  Published yesterday                        [Delete]  │      │
│  │  ─────────────────────────────────────────────────   │      │
│  │  Today I learned about advanced TypeScript           │      │
│  │  patterns including generics and utility types...    │      │
│  │                                              [Read →] │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  Building a SaaS Product                     [Edit]   │      │
│  │  Published last week                        [Delete]  │      │
│  │  ─────────────────────────────────────────────────   │      │
│  │  Reflections on building a SaaS product from         │      │
│  │  scratch with modern technologies...                 │      │
│  │                                              [Read →] │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  [← Previous]                               [Next →]           │
│  Page 1 of 1                                                   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

**Empty State** (when user has no posts):
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Dashboard                                    [+ New Post]      │
│  ═══════════                                                    │
│                                                                 │
│  My Posts (0)                                                   │
│  ─────────────────────────────────────────────────────────     │
│                                                                 │
│         ┌─────────────────────────────────────┐                │
│         │                                     │                │
│         │         📝                          │                │
│         │                                     │                │
│         │    No posts yet                     │                │
│         │                                     │                │
│         │    Get started by creating your     │                │
│         │    first post.                      │                │
│         │                                     │                │
│         │         [Create Post]               │                │
│         │                                     │                │
│         └─────────────────────────────────────┘                │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Key Features**:
- List of user's posts with preview
- Edit/Delete buttons for each post
- "New Post" button in header
- Pagination (10 posts per page)
- Empty state with call-to-action
- Timestamps in relative format

---

## Page 2: Create New Post

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] SaaS App              [Dashboard] [Settings] [Avatar ▼]│
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Back to Dashboard                                           │
│                                                                 │
│  Create New Post                                               │
│  ════════════════                                              │
│                                                                 │
│  Title *                                                       │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Enter post title...                                  │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  Content *                                                     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │                                                       │     │
│  │ Write your post content here...                      │     │
│  │                                                       │     │
│  │                                                       │     │
│  │                                                       │     │
│  │                                                       │     │
│  │                                                       │     │
│  │                                                       │     │
│  └──────────────────────────────────────────────────────┘     │
│  Markdown supported                                            │
│                                                                 │
│  [Cancel]                                    [Publish Post]    │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

**Validation States**:

Error State (empty title):
│  Title *                                                       │
│  ┌──────────────────────────────────────────────────────┐     │
│  │                                                       │     │
│  └──────────────────────────────────────────────────────┘     │
│  ⚠️ Title is required                                          │

Loading State (submitting):
│  [Cancel]                      [⟳ Publishing...]              │
```

**Key Features**:
- Simple form with title and content
- Required field indicators (*)
- Validation errors shown inline
- Cancel returns to dashboard
- Loading state during submission
- Markdown support hint

---

## Page 3: View/Edit Post

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] SaaS App              [Dashboard] [Settings] [Avatar ▼]│
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Back to Dashboard                                    [Edit] │
│                                                                 │
│  My First Blog Post                                            │
│  ═══════════════════                                           │
│  Published 2 hours ago · Last edited 1 hour ago               │
│                                                                 │
│  This is the beginning of my blog journey. I've decided to    │
│  start writing about my experiences learning to code and      │
│  building software products.                                   │
│                                                                 │
│  It's been an exciting experience so far, and I'm looking     │
│  forward to sharing more of my journey with others.           │
│                                                                 │
│  Stay tuned for more updates!                                  │
│                                                                 │
│                                                                 │
│  ─────────────────────────────────────────────────────────    │
│                                                                 │
│  [Delete Post]                                                 │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

**Edit Mode** (after clicking Edit):
┌────────────────────────────────────────────────────────────────┐
│ [Logo] SaaS App              [Dashboard] [Settings] [Avatar ▼]│
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ← Back to Dashboard                                           │
│                                                                 │
│  Edit Post                                                     │
│  ═════════                                                     │
│                                                                 │
│  Title *                                                       │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ My First Blog Post                                   │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  Content *                                                     │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ This is the beginning of my blog journey. I've       │     │
│  │ decided to start writing about my experiences        │     │
│  │ learning to code and building software products.     │     │
│  │                                                       │     │
│  │ It's been an exciting experience so far, and I'm     │     │
│  │ looking forward to sharing more of my journey...     │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  [Cancel]                                  [Save Changes]      │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

**Delete Confirmation Modal**:
┌────────────────────────────────────────────────────────────────┐
│               ╔════════════════════════════════╗               │
│               ║  Delete Post?                  ║               │
│               ║                                ║               │
│               ║  Are you sure you want to      ║               │
│               ║  delete this post? This        ║               │
│               ║  action cannot be undone.      ║               │
│               ║                                ║               │
│               ║  [Cancel]        [Delete]      ║               │
│               ╚════════════════════════════════╝               │
└────────────────────────────────────────────────────────────────┘
```

**Key Features**:
- View mode shows rendered content
- Edit button switches to edit mode
- Edit mode pre-fills form with existing data
- Delete button shows confirmation modal
- Cancel returns to view mode
- Save updates the post
- Timestamps show creation and last edit

---

## Component Breakdown

### PostCard Component
**Used in**: Dashboard list view
**Props**: `post: { id, title, content, createdAt, updatedAt }`
**Features**:
- Title (clickable → detail page)
- Content preview (first 100 chars)
- Timestamp (relative format)
- Edit button
- Delete button
- Read more link

### PostForm Component
**Used in**: Create page, Edit mode
**Props**: `post?: Post, onSubmit: (data) => void, onCancel: () => void`
**Features**:
- Title input (required)
- Content textarea (required)
- Client-side validation
- Submit button (disabled during loading)
- Cancel button
- Loading state

### PostList Component
**Used in**: Dashboard
**Props**: `posts: Post[], onEdit: (id) => void, onDelete: (id) => void`
**Features**:
- Maps posts to PostCard components
- Empty state when no posts
- Pagination controls

---

## Navigation Flow

```
┌─────────────┐
│   Sign In   │
└──────┬──────┘
       │
       v
┌─────────────────┐     [+ New Post]      ┌─────────────────┐
│   Dashboard     │─────────────────────→│   Create Post   │
│  (Posts List)   │                       └────────┬────────┘
└────┬────────┬───┘                               │
     │        │                                    │
     │        │ [Delete]                   [Publish Post]
     │        │                                    │
     │        v                                    v
     │   ┌──────────┐                     ┌─────────────┐
     │   │ Delete   │                     │  Dashboard  │
     │   │ Confirm  │                     │ (refreshed) │
     │   └────┬─────┘                     └─────────────┘
     │        │
     │   [Delete]
     │        │
     │        v
     │   ┌─────────────┐
     │   │  Dashboard  │
     │   │ (refreshed) │
     │   └─────────────┘
     │
     │ [Read/Edit]
     │
     v
┌─────────────────┐     [Edit]      ┌─────────────────┐
│   View Post     │─────────────────→│   Edit Post     │
│  (read mode)    │                  │  (edit mode)    │
└────┬────────────┘                  └────────┬────────┘
     │                                         │
     │ [← Back]                       [Save Changes]
     │                                         │
     v                                         v
┌─────────────┐                       ┌─────────────┐
│  Dashboard  │                       │  View Post  │
└─────────────┘                       │ (read mode) │
                                      └─────────────┘
```

---

## Design Decisions

### Data Model
```typescript
interface Post {
  id: string              // UUID
  title: string           // Max 200 chars
  content: string         // Text (no limit)
  authorId: string        // References User.id
  createdAt: Date
  updatedAt: Date
}
```

### Color Scheme
- Matches existing auth pages (blues/grays)
- Error states: Red (#ef4444)
- Success states: Green (#10b981)
- Primary actions: Blue (#3b82f6)

### Responsive Behavior
- Mobile: Stack elements vertically
- Desktop: Max-width content area (800px)
- Tablet: Full-width with padding

### Accessibility
- Semantic HTML (h1, article, form)
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus visible styles

---

## Questions for Validation

1. **Pagination**: 10 posts per page acceptable?
2. **Content format**: Plain text or markdown?
3. **Publish/Draft**: Just publish, or support drafts?
4. **Categories/Tags**: Not in v1, add later?
5. **Search**: Not in v1, add later?

---

**Status**: Ready for user journey mapping
**Next Step**: Create `posts-crud-user-journey.md`
