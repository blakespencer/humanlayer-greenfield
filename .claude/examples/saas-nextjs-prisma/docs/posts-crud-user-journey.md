# Posts CRUD - User Journey Map

**Created**: 2025-10-26
**Purpose**: User journey for Phase 6C - Posts CRUD functionality
**Persona**: Sarah, a blogger who wants to manage her posts

---

## Journey 1: Creating First Post (Happy Path)

### Context
- **Actor**: Sarah (authenticated user, no posts yet)
- **Goal**: Create her first blog post
- **Entry Point**: Dashboard (empty state)
- **Success Metric**: Post published and visible in dashboard

### Journey Stages

#### Stage 1: Discovering Empty Dashboard
**Touchpoint**: Dashboard page
**Action**: Sarah logs in and sees empty state

**UI State**:
- "No posts yet" message displayed
- "Create Post" button prominently shown
- Encouraging copy: "Get started by creating your first post"

**User Emotion**: 😊 Motivated, ready to start
**Pain Points**: None
**Opportunities**: Clear call-to-action works well

---

#### Stage 2: Initiating Post Creation
**Touchpoint**: Dashboard → Create page
**Action**: Clicks "Create Post" button

**UI State**:
- Navigates to `/posts/new`
- Empty form with title and content fields
- "Title *" and "Content *" labels visible
- Placeholder text guides input

**User Emotion**: 😊 Confident, knows what to do
**Pain Points**: None
**Opportunities**: None

---

#### Stage 3: Writing Post Content
**Touchpoint**: Create post form
**Action**: Fills in title and content

**UI State**:
- Types title: "My First Blog Post"
- Types content: "This is the beginning of my blog journey..."
- Form validates in real-time (fields turn green when valid)
- "Publish Post" button enabled

**User Emotion**: 😊 Engaged, creative flow
**Pain Points**: None in happy path
**Opportunities**: Could add character count, preview mode

---

#### Stage 4: Publishing Post
**Touchpoint**: Create post form → Dashboard
**Action**: Clicks "Publish Post" button

**UI State**:
- Button shows loading spinner: "Publishing..."
- Button disabled during submission
- Success: Redirects to dashboard
- Success message: "Post published successfully!"
- New post appears at top of list

**User Emotion**: 🎉 Accomplished, satisfied
**Pain Points**: None
**Opportunities**: Could add animation/celebration moment

---

#### Stage 5: Viewing Published Post
**Touchpoint**: Dashboard post list
**Action**: Reviews her published post

**UI State**:
- Post card shows:
  - Title: "My First Blog Post"
  - Preview: "This is the beginning..."
  - Timestamp: "Published just now"
  - Edit and Delete buttons
  - "Read →" link

**User Emotion**: 😊 Proud, wants to share
**Pain Points**: None
**Opportunities**: Add share buttons, public URL

---

### Journey Flow Diagram

```
[Dashboard Empty] → [Click Create] → [Fill Form] → [Click Publish] → [See Post]
      😊                  😊              😊              🎉              😊
```

### Backend Operations
1. `POST /api/posts` with `{ title, content }`
2. Database: Insert new post with `authorId = current user`
3. Return `201 Created` with post object
4. Frontend navigates to dashboard
5. Dashboard fetches posts: `GET /api/posts`

---

## Journey 2: Editing Existing Post

### Context
- **Actor**: Sarah (has published posts)
- **Goal**: Fix typo in existing post
- **Entry Point**: Dashboard
- **Success Metric**: Post updated, changes visible

### Journey Stages

#### Stage 1: Finding Post to Edit
**Touchpoint**: Dashboard
**Action**: Identifies post with typo

**UI State**:
- Sees post in list
- Spots typo in preview
- Notices "Edit" button

**User Emotion**: 😐 Slightly annoyed (found typo)
**Pain Points**: None
**Opportunities**: None

---

#### Stage 2: Entering Edit Mode
**Touchpoint**: Dashboard → Post detail → Edit mode
**Action**: Clicks "Edit" button (or "Read →" then "Edit")

**UI State**:
- Option A: Edit button on card → direct to edit form
- Option B: Click "Read →" → View page → Click "Edit" → Edit form
- Form pre-filled with existing content
- URL: `/posts/[id]/edit` or `/posts/[id]?mode=edit`

**User Emotion**: 😊 Relieved (easy to edit)
**Pain Points**: None in happy path
**Opportunities**: Could add inline editing

---

#### Stage 3: Making Changes
**Touchpoint**: Edit form
**Action**: Corrects typo

**UI State**:
- Form shows current title and content
- Sarah fixes typo in content
- "Save Changes" button enabled
- "Cancel" button available

**User Emotion**: 😊 Focused
**Pain Points**: Anxiety about losing changes if accidentally close
**Opportunities**: Auto-save draft, unsaved changes warning

---

#### Stage 4: Saving Changes
**Touchpoint**: Edit form → Post view/Dashboard
**Action**: Clicks "Save Changes"

**UI State**:
- Button shows "Saving..."
- Success: Returns to post view (or dashboard)
- Success message: "Post updated successfully!"
- Updated timestamp visible: "Last edited just now"

**User Emotion**: 😊 Satisfied, typo fixed
**Pain Points**: None
**Opportunities**: Show diff of what changed

---

### Journey Flow Diagram

```
[Dashboard] → [Click Edit] → [Fix Typo] → [Save] → [See Updated Post]
     😐             😊            😊         😊            😊
```

### Backend Operations
1. `GET /api/posts/[id]` to load post
2. Verify `post.authorId === currentUser.id`
3. User edits form
4. `PUT /api/posts/[id]` with `{ title, content }`
5. Database: Update post, set `updatedAt = now()`
6. Return `200 OK` with updated post

---

## Journey 3: Deleting Post

### Context
- **Actor**: Sarah (wants to remove old post)
- **Goal**: Delete post permanently
- **Entry Point**: Dashboard or post view
- **Success Metric**: Post removed from list

### Journey Stages

#### Stage 1: Deciding to Delete
**Touchpoint**: Dashboard or post view
**Action**: Decides post is no longer relevant

**UI State**:
- Sees "Delete" button on post card or detail page
- Considers deleting

**User Emotion**: 🤔 Uncertain, hesitant
**Pain Points**: Worried about accidental deletion
**Opportunities**: Confirmation modal prevents accidents

---

#### Stage 2: Initiating Delete
**Touchpoint**: Delete button → Confirmation modal
**Action**: Clicks "Delete" button

**UI State**:
- Modal appears: "Delete Post?"
- Warning: "Are you sure? This action cannot be undone."
- Two buttons: "Cancel" (safe) and "Delete" (danger, red)

**User Emotion**: 😰 Anxious, wants reassurance
**Pain Points**: Fear of accidental deletion
**Opportunities**: Modal provides safety net

---

#### Stage 3: Confirming Deletion
**Touchpoint**: Confirmation modal
**Action**: Clicks "Delete" in modal

**UI State**:
- Modal button shows "Deleting..."
- Modal closes
- Post removed from list immediately (optimistic update)
- Success message: "Post deleted"

**User Emotion**: 😌 Relieved (made right choice)
**Pain Points**: No undo option
**Opportunities**: Add "Undo" toast for 5 seconds

---

### Journey Flow Diagram

```
[Dashboard] → [Click Delete] → [Confirm Modal] → [Post Removed]
     🤔              😰                😰               😌
```

### Backend Operations
1. Click delete → Show modal (no API call yet)
2. Click confirm in modal
3. `DELETE /api/posts/[id]`
4. Verify `post.authorId === currentUser.id`
5. Database: Delete post record
6. Return `204 No Content`
7. Frontend removes post from list

---

## Journey 4: Viewing Post List (Pagination)

### Context
- **Actor**: Sarah (has 25 posts)
- **Goal**: Browse all her posts
- **Entry Point**: Dashboard
- **Success Metric**: Can navigate through pages

### Journey Stages

#### Stage 1: Landing on Dashboard
**Touchpoint**: Dashboard page 1
**Action**: Views first 10 posts

**UI State**:
- "My Posts (25)" header
- 10 posts displayed
- Pagination: "Page 1 of 3"
- "Next →" button enabled
- "← Previous" button disabled

**User Emotion**: 😊 Satisfied (sees recent posts)
**Pain Points**: None
**Opportunities**: Search/filter for specific posts

---

#### Stage 2: Navigating to Page 2
**Touchpoint**: Dashboard pagination
**Action**: Clicks "Next →"

**UI State**:
- URL changes: `/dashboard?page=2`
- Shows posts 11-20
- "Page 2 of 3"
- Both "Previous" and "Next" enabled

**User Emotion**: 😊 Exploring content
**Pain Points**: None
**Opportunities**: Infinite scroll option

---

### Journey Flow Diagram

```
[Page 1] → [Click Next] → [Page 2] → [Click Next] → [Page 3]
   😊           😊            😊           😊            😊
```

### Backend Operations
1. `GET /api/posts?page=1&limit=10`
2. Database: `SELECT * FROM posts WHERE authorId = ? ORDER BY createdAt DESC LIMIT 10 OFFSET 0`
3. Return posts with total count
4. Frontend renders and shows pagination

---

## Journey 5: Error Handling - Network Failure

### Context
- **Actor**: Sarah (creating post, network drops)
- **Goal**: Recover from network error
- **Entry Point**: Create post form
- **Success Metric**: Data not lost, clear error shown

### Journey Stages

#### Stage 1: Submitting Post (Network Fails)
**Touchpoint**: Create post form
**Action**: Clicks "Publish Post" but network fails

**UI State**:
- Button shows "Publishing..."
- Timeout after 10 seconds
- Error message appears: "Network error. Please check your connection and try again."
- Form data still present (not lost)
- "Publish Post" button re-enabled

**User Emotion**: 😤 Frustrated (error happened)
**Pain Points**: Lost work would be devastating
**Opportunities**: Form data preserved, can retry

---

#### Stage 2: Retrying Submission
**Touchpoint**: Create post form (after error)
**Action**: Clicks "Publish Post" again

**UI State**:
- Network restored
- Submission succeeds
- Post published successfully

**User Emotion**: 😌 Relieved (didn't lose work)
**Pain Points**: Had to retry manually
**Opportunities**: Auto-retry, offline support

---

### Journey Flow Diagram

```
[Fill Form] → [Submit] → [Network Error] → [Retry] → [Success]
     😊          😊            😤            😤          😌
```

---

## Journey 6: Authorization - Attempting to Edit Another User's Post

### Context
- **Actor**: Sarah (tries to edit Bob's post via URL manipulation)
- **Goal**: System prevents unauthorized access
- **Entry Point**: Direct URL to Bob's post edit page
- **Success Metric**: Access denied, clear error message

### Journey Stages

#### Stage 1: Attempting Unauthorized Access
**Touchpoint**: Browser URL bar
**Action**: Sarah navigates to `/posts/[bobs-post-id]/edit`

**UI State**:
- API call: `GET /api/posts/[bobs-post-id]`
- Server checks: `post.authorId !== currentUser.id`
- Returns `403 Forbidden`
- Frontend shows error page: "You don't have permission to edit this post"
- Button: "Back to Dashboard"

**User Emotion**: 😐 Understands (expected behavior)
**Pain Points**: None (security working correctly)
**Opportunities**: None

---

### Backend Security Check
```typescript
// In API route
const post = await db.post.findUnique({ where: { id } })
if (post.authorId !== session.user.id) {
  return res.status(403).json({ error: 'Forbidden' })
}
```

---

## Journey 7: Validation Errors

### Context
- **Actor**: Sarah (tries to submit empty form)
- **Goal**: System prevents invalid data
- **Entry Point**: Create post form
- **Success Metric**: Clear validation messages shown

### Journey Stages

#### Stage 1: Submitting Empty Form
**Touchpoint**: Create post form
**Action**: Clicks "Publish Post" without filling fields

**UI State**:
- Client-side validation triggers
- Error messages appear:
  - Below title field: "⚠️ Title is required"
  - Below content field: "⚠️ Content is required"
- Fields highlighted in red
- Form not submitted (prevented)
- "Publish Post" button remains enabled

**User Emotion**: 😅 Embarrassed (forgot to fill)
**Pain Points**: None (caught early)
**Opportunities**: Real-time validation as user types

---

#### Stage 2: Fixing Validation Errors
**Touchpoint**: Create post form
**Action**: Fills in title and content

**UI State**:
- As Sarah types, error messages disappear
- Fields turn green when valid
- "Publish Post" button ready
- Submit succeeds

**User Emotion**: 😊 Satisfied (clear guidance)
**Pain Points**: None
**Opportunities**: None

---

## Key Insights Across All Journeys

### Emotions Throughout
- **Positive**: Creating, viewing success (😊 🎉)
- **Neutral**: Browsing, editing (😊)
- **Negative**: Errors, deletion uncertainty (😤 😰)

### Critical Touchpoints
1. **Empty state** → Must encourage action
2. **Form submission** → Must handle errors gracefully
3. **Delete confirmation** → Must prevent accidents
4. **Authorization checks** → Must be clear when denied

### Pain Points to Address
1. **Network errors** → Don't lose form data
2. **Accidental deletion** → Confirmation modal helps
3. **Unsaved changes** → Could add warning
4. **No undo** → Could add soft delete

### Opportunities for Enhancement (Future)
1. Auto-save drafts
2. Markdown preview
3. Share/public URLs
4. Search and filter
5. Categories/tags
6. Rich text editor
7. Image uploads
8. Undo delete (soft delete)

---

## User Journey → E2E Test Mapping

Each journey stage maps to E2E test assertions:

| Journey | E2E Test Name |
|---------|---------------|
| Journey 1: Creating First Post | `test('user can create first post')` |
| Journey 2: Editing Post | `test('user can edit existing post')` |
| Journey 3: Deleting Post | `test('user can delete post with confirmation')` |
| Journey 4: Pagination | `test('user can navigate through paginated posts')` |
| Journey 5: Network Error | `test('shows error on network failure and preserves form data')` |
| Journey 6: Authorization | `test('user cannot edit another user's post')` |
| Journey 7: Validation | `test('shows validation errors for empty fields')` |

---

## Success Metrics

### Functional Success
- ✅ User can complete all CRUD operations
- ✅ Data persistence verified
- ✅ Authorization enforced
- ✅ Validation works

### User Experience Success
- ✅ No confusion at any stage
- ✅ Errors are clear and actionable
- ✅ No accidental data loss
- ✅ Fast feedback (< 200ms for most actions)

---

**Status**: Ready for E2E test descriptions
**Next Step**: Convert journeys to E2E test descriptions for user approval
