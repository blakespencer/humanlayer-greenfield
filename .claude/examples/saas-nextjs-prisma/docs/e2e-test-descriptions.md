# E2E Test Descriptions - Posts CRUD

**Purpose**: Comprehensive E2E test suite for Phase 6C
**Based on**: User journeys in `posts-crud-user-journey.md`
**Status**: ⚠️ **AWAITING USER APPROVAL** ⚠️

**Instructions for User**: Review these test descriptions carefully. They define exactly what will be tested and what behavior the system must exhibit. Approve or request changes before implementation proceeds.

---

## Test Suite Overview

### Coverage
- ✅ **CRUD Operations**: Create, Read, Update, Delete posts
- ✅ **Authorization**: Users can only access their own posts
- ✅ **Validation**: Required fields, empty states
- ✅ **Error Handling**: Network errors, form validation
- ✅ **Pagination**: Multiple pages of posts
- ✅ **Baseline Tests**: Auth, network, security

### Test Categories
1. **Happy Path Tests** (7 tests) - Core functionality works
2. **Error Handling Tests** (4 tests) - Graceful failure
3. **Authorization Tests** (3 tests) - Security enforcement
4. **Baseline Tests** (6 tests) - Essential safeguards

**Total**: 20 E2E tests

---

## CATEGORY 1: Happy Path Tests (Core CRUD)

### Test 1: User can create their first post

**User Story**: As a logged-in user with no posts, I can create my first post and see it in my dashboard.

**Setup**:
- User authenticated as `test@example.com`
- User has zero posts in database
- Start at dashboard page

**Test Steps**:
1. Navigate to `/dashboard`
2. Verify empty state displayed:
   - See "No posts yet" message
   - See "Create Post" button
3. Click "Create Post" button
4. Verify navigation to `/posts/new`
5. Fill form:
   - Title: "My First Blog Post"
   - Content: "This is the beginning of my blog journey. I'm excited to start writing!"
6. Click "Publish Post" button
7. Wait for submission to complete

**Assertions - UI State**:
- ✅ Redirected to `/dashboard`
- ✅ Success message visible: "Post published successfully" (or similar)
- ✅ Post appears in dashboard list
- ✅ Post card shows:
  - Title: "My First Blog Post"
  - Content preview: "This is the beginning..."
  - Timestamp: "Published just now" (or similar)
  - "Edit" button visible
  - "Delete" button visible

**Assertions - Backend State**:
- ✅ Database has 1 post record
- ✅ Post has correct fields:
  - `title = "My First Blog Post"`
  - `content` contains "This is the beginning..."
  - `authorId = current user's ID`
  - `createdAt` is recent (within last minute)
  - `updatedAt = createdAt`

**Assertions - Side Effects**:
- None for v1

---

### Test 2: User can view post list with multiple posts

**User Story**: As a user with multiple posts, I can see all my posts in a list on the dashboard.

**Setup**:
- User authenticated as `test@example.com`
- User has 3 existing posts in database
- Start at dashboard page

**Test Steps**:
1. Navigate to `/dashboard`
2. Verify posts are displayed

**Assertions - UI State**:
- ✅ Header shows "My Posts (3)" (or similar count indicator)
- ✅ 3 post cards visible
- ✅ Posts ordered by creation date (newest first)
- ✅ Each post card shows:
  - Title
  - Content preview
  - Timestamp
  - Edit button
  - Delete button

**Assertions - Backend State**:
- ✅ API call made to `GET /api/posts`
- ✅ Response contains 3 posts
- ✅ All posts have `authorId = current user's ID`

---

### Test 3: User can edit an existing post

**User Story**: As a user, I can edit my existing post to fix a typo or update content.

**Setup**:
- User authenticated
- User has 1 post with:
  - Title: "My First Post"
  - Content: "This has a typo"
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`
2. Find post "My First Post"
3. Click "Edit" button on post card
4. Verify navigation to edit page (URL contains `/edit` or mode parameter)
5. Verify form pre-filled with existing data:
   - Title field: "My First Post"
   - Content field: "This has a typo"
6. Update content to: "This has been corrected"
7. Click "Save Changes" button
8. Wait for submission

**Assertions - UI State**:
- ✅ Success message shown: "Post updated successfully"
- ✅ Redirected to post view or dashboard
- ✅ Post shows updated content
- ✅ Timestamp shows "Last edited just now"

**Assertions - Backend State**:
- ✅ Database post record updated
- ✅ `content = "This has been corrected"`
- ✅ `updatedAt` is recent (within last minute)
- ✅ `updatedAt > createdAt`

---

### Test 4: User can delete a post with confirmation

**User Story**: As a user, I can delete a post, but I'm asked to confirm to prevent accidents.

**Setup**:
- User authenticated
- User has 2 posts in database
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`
2. Verify 2 posts visible
3. Click "Delete" button on first post
4. Verify confirmation modal appears:
   - Modal title: "Delete Post?" (or similar)
   - Warning text: "Are you sure? This action cannot be undone."
   - "Cancel" button
   - "Delete" button (danger styling)
5. Click "Cancel" button
6. Verify modal closes, post still visible
7. Click "Delete" button again
8. In modal, click "Delete" button
9. Wait for deletion

**Assertions - UI State**:
- ✅ Success message: "Post deleted" (or similar)
- ✅ Modal closes
- ✅ Post removed from list
- ✅ Only 1 post visible now

**Assertions - Backend State**:
- ✅ Database has 1 post remaining (deleted post gone)
- ✅ Deleted post ID not found in database

---

### Test 5: User can view a single post in detail

**User Story**: As a user, I can click on a post to see its full content.

**Setup**:
- User authenticated
- User has 1 post with long content (>200 chars)
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`
2. Post card shows truncated preview
3. Click "Read →" or post title
4. Verify navigation to `/posts/[id]`

**Assertions - UI State**:
- ✅ Full post title displayed
- ✅ Full post content displayed (not truncated)
- ✅ Creation timestamp visible
- ✅ "Edit" button visible
- ✅ "Delete" button visible (or at bottom)
- ✅ "← Back to Dashboard" link visible

---

### Test 6: User can navigate paginated posts

**User Story**: As a user with many posts, I can navigate through pages to see all my posts.

**Setup**:
- User authenticated
- User has 25 posts in database
- Pagination: 10 posts per page
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`
2. Verify page 1 shows 10 posts
3. Verify pagination controls:
   - "Page 1 of 3" (or similar indicator)
   - "Next →" button enabled
   - "← Previous" button disabled
4. Click "Next →" button
5. Verify URL changes (e.g., `?page=2`)
6. Verify page 2 shows next 10 posts (posts 11-20)
7. Verify pagination:
   - "Page 2 of 3"
   - Both "Previous" and "Next" enabled
8. Click "Next →" again
9. Verify page 3 shows last 5 posts
10. Verify "Next →" disabled

**Assertions - Backend State**:
- ✅ `GET /api/posts?page=1&limit=10` returns first 10
- ✅ `GET /api/posts?page=2&limit=10` returns next 10
- ✅ Response includes total count (25)

---

### Test 7: Empty state shows when user has no posts

**User Story**: As a new user with no posts, I see an encouraging empty state that guides me to create my first post.

**Setup**:
- User authenticated
- User has 0 posts
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`

**Assertions - UI State**:
- ✅ Empty state visible with:
  - Icon (e.g., 📝 emoji or SVG)
  - Heading: "No posts yet"
  - Encouraging text: "Get started by creating your first post"
  - "Create Post" button (primary styling)
- ✅ No post list or pagination shown

---

## CATEGORY 2: Error Handling Tests

### Test 8: Form validation prevents empty submission

**User Story**: As a user, I cannot submit a post without required fields.

**Setup**:
- User authenticated
- Start at create post page

**Test Steps**:
1. Navigate to `/posts/new`
2. Leave title empty
3. Leave content empty
4. Click "Publish Post" button

**Assertions - UI State**:
- ✅ Form NOT submitted (still on create page)
- ✅ Validation errors displayed:
  - Below title: "⚠️ Title is required" (or similar)
  - Below content: "⚠️ Content is required"
- ✅ Title field highlighted (red border or similar)
- ✅ Content field highlighted
- ✅ No success message
5. Fill in title: "Test Post"
6. Leave content empty
7. Click "Publish Post"

**Assertions - UI State**:
- ✅ Title error cleared
- ✅ Content error still visible
8. Fill in content: "Test content"
9. Click "Publish Post"

**Assertions - UI State**:
- ✅ All errors cleared
- ✅ Form submitted successfully

---

### Test 9: Network error shows user-friendly message and preserves form data

**User Story**: As a user experiencing network issues, I see a clear error message and my form data isn't lost.

**Setup**:
- User authenticated
- Start at create post page
- Simulate network error (Playwright route interception)

**Test Steps**:
1. Navigate to `/posts/new`
2. Fill form:
   - Title: "Important Post"
   - Content: "This took me 10 minutes to write!"
3. Mock API to return network error:
   ```typescript
   await page.route('**/api/posts', route => route.abort('failed'))
   ```
4. Click "Publish Post"
5. Wait for error

**Assertions - UI State**:
- ✅ Error message visible: "Network error. Please check your connection and try again." (or similar)
- ✅ Form data still present:
  - Title: "Important Post"
  - Content: "This took me 10 minutes to write!"
- ✅ "Publish Post" button re-enabled (not stuck in loading)
- ✅ User can edit and retry
6. Remove network mock (allow success)
7. Click "Publish Post" again

**Assertions**:
- ✅ Submission succeeds
- ✅ Post created with preserved data

---

### Test 10: Server error (500) shows user-friendly message

**User Story**: As a user encountering a server error, I see a helpful message without technical details.

**Setup**:
- User authenticated
- Start at create post page
- Mock API to return 500 error

**Test Steps**:
1. Navigate to `/posts/new`
2. Fill form with valid data
3. Mock API:
   ```typescript
   await page.route('**/api/posts', route => {
     route.fulfill({ status: 500, body: 'Internal Server Error' })
   })
   ```
4. Click "Publish Post"

**Assertions - UI State**:
- ✅ Error message visible: "Something went wrong. Please try again later." (or similar)
- ✅ NO technical details shown (no "500" or "Internal Server Error" text)
- ✅ Form data preserved
- ✅ Button re-enabled for retry

---

### Test 11: Attempting to create post with extremely long title shows validation

**User Story**: As a user, I'm prevented from creating posts with unreasonably long titles.

**Setup**:
- User authenticated
- Start at create post page

**Test Steps**:
1. Navigate to `/posts/new`
2. Fill title with 300 characters (exceeds 200 char limit)
3. Fill content with valid text
4. Click "Publish Post"

**Assertions - UI State**:
- ✅ Validation error: "Title must be less than 200 characters" (or similar)
- ✅ Form not submitted
- ✅ Character count shown (optional but nice)

---

## CATEGORY 3: Authorization Tests

### Test 12: User cannot edit another user's post

**User Story**: As a user, I cannot edit posts that don't belong to me (security test).

**Setup**:
- User A authenticated as `alice@example.com`
- User B exists as `bob@example.com`
- Bob has 1 post with ID `bob-post-123`
- Alice tries to access Bob's post

**Test Steps**:
1. Authenticate as Alice
2. Navigate directly to `/posts/bob-post-123/edit` (URL manipulation)
3. OR attempt API call: `PUT /api/posts/bob-post-123`

**Assertions - UI State**:
- ✅ Error page shown: "You don't have permission to edit this post" (or similar 403 page)
- ✅ OR redirected to dashboard with error message
- ✅ Edit form NOT shown

**Assertions - Backend State**:
- ✅ API returns `403 Forbidden`
- ✅ Bob's post unchanged in database

---

### Test 13: User cannot delete another user's post

**User Story**: As a user, I cannot delete posts that don't belong to me.

**Setup**:
- User A authenticated as Alice
- User B (Bob) has 1 post with ID `bob-post-123`

**Test Steps**:
1. Authenticate as Alice
2. Attempt API call: `DELETE /api/posts/bob-post-123`
   (or try via UI if somehow accessible)

**Assertions - Backend State**:
- ✅ API returns `403 Forbidden`
- ✅ Bob's post still exists in database
- ✅ No deletion occurred

---

### Test 14: Unauthenticated user cannot access create post page

**User Story**: As an unauthenticated visitor, I'm redirected to login when trying to create posts.

**Setup**:
- User NOT authenticated (no session)
- Start at home page

**Test Steps**:
1. Navigate to `/posts/new` (direct URL)

**Assertions - UI State**:
- ✅ Redirected to `/login`
- ✅ Create form NOT accessible
- ✅ Login page shown

---

## CATEGORY 4: Baseline Tests (From baseline-tests.md)

### Test 15: Public routes remain accessible (Auth baseline)

**User Story**: As an unauthenticated visitor, I can access public pages like home without being forced to log in.

**Setup**:
- User NOT authenticated
- Start fresh (no session)

**Test Steps**:
1. Navigate to `/`

**Assertions - UI State**:
- ✅ Home page loads (NOT redirected to `/login`)
- ✅ URL is `/`
- ✅ "Sign In" button visible
- ✅ "Sign Up" button visible

**Note**: This test already passed after middleware bug fix, but we keep it as regression prevention.

---

### Test 16: Protected routes require authentication (Auth baseline)

**User Story**: As an unauthenticated visitor, I'm redirected to login when accessing protected pages.

**Setup**:
- User NOT authenticated
- Start fresh

**Test Steps**:
1. Navigate to `/dashboard`

**Assertions - UI State**:
- ✅ Redirected to `/login`
- ✅ Dashboard NOT accessible
- ✅ Login form shown

---

### Test 17: Session persists across page refreshes (Auth baseline)

**User Story**: As a logged-in user, I remain logged in when I refresh the page.

**Setup**:
- User authenticated
- Start at dashboard

**Test Steps**:
1. Navigate to `/dashboard`
2. Verify logged in (user menu visible)
3. Refresh page (F5 or `page.reload()`)
4. Wait for page load

**Assertions - UI State**:
- ✅ Still at `/dashboard` (not redirected to login)
- ✅ User menu still visible with user's name
- ✅ Posts still loaded

---

### Test 18: API endpoints require authentication (Security baseline)

**User Story**: As a security measure, API endpoints reject unauthenticated requests.

**Setup**:
- No authentication (no session cookie)

**Test Steps**:
1. Make API request without auth: `GET /api/posts`

**Assertions - Backend State**:
- ✅ API returns `401 Unauthorized` or `403 Forbidden`
- ✅ No data returned

---

### Test 19: XSS attempt is sanitized (Security baseline)

**User Story**: As a security measure, malicious script injection is prevented.

**Setup**:
- User authenticated
- Start at create post page

**Test Steps**:
1. Navigate to `/posts/new`
2. Fill form:
   - Title: `<script>alert('XSS')</script>`
   - Content: "Normal content"
3. Submit post
4. Navigate to dashboard
5. View post

**Assertions - UI State**:
- ✅ Script does NOT execute (no alert shown)
- ✅ Script tag displayed as text: `<script>alert('XSS')</script>`
- ✅ OR script tags stripped: `alert('XSS')`

**Assertions - Backend State**:
- ✅ Database stores sanitized or escaped version
- ✅ No script execution on retrieval

---

### Test 20: SQL injection prevented (Security baseline)

**User Story**: As a security measure, SQL injection attempts are blocked.

**Setup**:
- User authenticated
- Start at create post page

**Test Steps**:
1. Navigate to `/posts/new`
2. Fill form:
   - Title: `'; DROP TABLE posts; --`
   - Content: "Normal content"
3. Submit post

**Assertions - Backend State**:
- ✅ Post created successfully (no SQL injection)
- ✅ Title stored as literal string: `'; DROP TABLE posts; --`
- ✅ `posts` table still exists (not dropped)
- ✅ Parameterized queries prevent injection

**Note**: Since we use Prisma ORM, this is automatically protected, but we test it anyway.

---

## Summary

### Test Count by Category
- **Happy Path**: 7 tests (core CRUD functionality)
- **Error Handling**: 4 tests (validation, network, server errors)
- **Authorization**: 3 tests (security enforcement)
- **Baseline**: 6 tests (auth, security, standard safeguards)

**Total**: 20 E2E tests

### Coverage Map

| Feature | Test Numbers | Status |
|---------|--------------|--------|
| Create Post | 1, 8, 9, 10, 11 | 5 tests |
| Read/List Posts | 2, 5, 6, 7 | 4 tests |
| Edit Post | 3, 12 | 2 tests |
| Delete Post | 4, 13 | 2 tests |
| Authorization | 12, 13, 14 | 3 tests |
| Auth Baseline | 15, 16, 17, 18 | 4 tests |
| Security | 19, 20 | 2 tests |

### Estimated Test Execution Time
- **Per test**: ~30-60 seconds
- **Full suite**: ~10-20 minutes (with parallel execution)
- **CI pipeline**: ~5 minutes (with optimizations)

---

## Implementation Plan (After Approval)

### Phase 1: Setup (5 min)
- Install Playwright
- Configure `playwright.config.ts`
- Create `e2e/` directory
- Setup test database utilities

### Phase 2: Implement Tests (15-20 min)
- Create `e2e/posts-crud.spec.ts` (tests 1-7)
- Create `e2e/posts-errors.spec.ts` (tests 8-11)
- Create `e2e/posts-auth.spec.ts` (tests 12-14)
- Create `e2e/baseline.spec.ts` (tests 15-20)
- All tests will FAIL initially (RED phase)

### Phase 3: Implementation (40-50 min)
- Create Prisma schema for Post model
- Implement API routes (CRUD)
- Create frontend pages (dashboard, create, edit)
- Add authorization middleware
- Add validation
- Tests gradually turn GREEN

### Phase 4: Verification (5 min)
- Run full test suite
- Verify all 20 tests pass
- Build succeeds
- Document results

---

## Questions for User Review

**Before approving, please consider**:

1. **Test coverage**: Are there any user scenarios I missed?
2. **Validation rules**: Is 200 char limit for title appropriate?
3. **Pagination**: Is 10 posts per page acceptable?
4. **Authorization**: Any additional security checks needed?
5. **Error messages**: Are the expected error messages user-friendly enough?
6. **Baseline tests**: Any additional security/safety tests needed?

---

## User Decision Required

**🚦 REVIEW GATE - Please respond with one of**:

1. ✅ **"Approved"** - Proceed with implementation
2. ⚠️ **"Changes requested"** - Specify what to modify
3. ❌ **"Reject"** - Explain concerns

**After your approval, I will**:
1. Install Playwright and dependencies
2. Implement all 20 E2E tests
3. Run tests (expect all to FAIL - RED phase)
4. Implement CRUD functionality to make tests pass (GREEN phase)
5. Verify all tests passing
6. Report completion

---

**Status**: ⏸️ AWAITING USER APPROVAL
**Created**: 2025-10-26
**Based on**: Phase 6C requirements, user journeys, baseline-tests.md
