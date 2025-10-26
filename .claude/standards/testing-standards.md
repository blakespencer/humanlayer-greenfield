# Testing Standards - Universal DRY Testing Approach

**Purpose**: Mandatory testing standards for ALL projects across ALL languages
**Status**: 🔒 **REQUIRED** - All AI agents must follow these standards
**Applies to**: TypeScript, Go, Python, Rust, Java, and any other language

---

## 🎯 Core Principles (Non-Negotiable)

### 1. No Vanity Tests
**Rule**: Every test must catch real bugs or prevent real user pain.

**Questions to ask before writing a test**:
- ❓ What bug would this test catch?
- ❓ What user pain does this prevent?
- ❓ Is this already covered by another test?

**If you can't answer these, DELETE THE TEST.**

**Examples of vanity tests to AVOID**:
- ❌ Testing framework internals (e.g., "useState updates state")
- ❌ Testing library behavior (e.g., "Prisma saves to database")
- ❌ Redundant tests (e.g., testing same thing as another test)
- ❌ Testing trivial getters/setters
- ❌ 100% coverage for the sake of coverage

**Examples of valuable tests**:
- ✅ Edge cases (empty input, boundary conditions)
- ✅ Security (XSS, SQL injection, auth bypass)
- ✅ Race conditions (double-submit, concurrent updates)
- ✅ Error handling (network failures, validation)
- ✅ Critical business logic

---

### 2. DRY Testing (Don't Repeat Yourself)
**Rule**: Use fixtures and helpers. Never copy-paste test setup code.

**Pattern**:
```
tests/
├── fixtures/          # Reusable test data and setup
│   ├── auth.fixture.{ts,go,py}
│   ├── data.fixture.{ts,go,py}
│   └── database.fixture.{ts,go,py}
├── helpers/           # Reusable test utilities
│   ├── assertion-helpers.{ts,go,py}
│   ├── mock-helpers.{ts,go,py}
│   └── setup-helpers.{ts,go,py}
└── tests/             # Actual test files (lean and readable)
    ├── feature-a.spec.{ts,go,py}
    └── feature-b.spec.{ts,go,py}
```

**Benefits**:
- 📉 40-60% fewer tokens during test implementation
- 📖 Tests are readable (no noise from setup)
- 🔧 Easy to maintain (change once, fixes all tests)
- ⚡ Faster to write new tests

---

### 3. Context Engineering
**Rule**: AI should read fixtures/helpers once, then reuse everywhere.

**How to structure for AI efficiency**:

1. **Fixtures file** - AI reads once, gets context
   ```typescript
   // fixtures/auth.fixture.ts
   export const authenticatedUser = { /* setup */ }
   export const adminUser = { /* setup */ }
   ```

2. **Helper file** - AI reads once, calls many times
   ```typescript
   // helpers/post-helpers.ts
   export function createPost(data) { /* implementation */ }
   export function fillPostForm(page, data) { /* implementation */ }
   ```

3. **Test file** - AI reads, sees lean tests
   ```typescript
   // tests/posts.spec.ts
   test('create post', async ({ authenticatedUser }) => {
     await createPost({ title: 'Test' })
     await expectPostInList('Test')
   })
   ```

**Token usage comparison**:
- ❌ Without helpers: 100-150 lines per test
- ✅ With helpers: 10-20 lines per test
- 💰 Savings: 80% fewer tokens

---

## 🏗️ Implementation Patterns by Language

### TypeScript / JavaScript (Playwright, Vitest, Jest)

#### Fixtures Pattern (Playwright)
```typescript
// e2e/fixtures/auth.fixture.ts
import { test as base } from '@playwright/test'

export const test = base.extend({
  authenticatedUser: async ({ page }, use) => {
    const user = await createUser({ email: 'test@example.com' })
    const session = await createSession(user.id)

    await page.context().addCookies([{
      name: 'session-token',
      value: session.token,
      domain: 'localhost',
      path: '/'
    }])

    await use({ page, user })

    // Cleanup
    await deleteUser(user.id)
  }
})
```

#### Helpers Pattern
```typescript
// e2e/helpers/post-helpers.ts
export async function createPost(authorId: string, data: PostData) {
  return prisma.post.create({
    data: { ...data, authorId }
  })
}

export async function fillPostForm(page: Page, data: PostData) {
  await page.fill('input[name="title"]', data.title)
  await page.fill('textarea[name="content"]', data.content)
  await page.click('button[type="submit"]')
}

export async function expectPostInList(page: Page, title: string) {
  await expect(page.getByText(title)).toBeVisible()
}
```

#### Usage in Tests
```typescript
// e2e/tests/posts.spec.ts
import { test } from '../fixtures/auth.fixture'
import { createPost, fillPostForm, expectPostInList } from '../helpers/post-helpers'

test('user can create post', async ({ authenticatedUser }) => {
  const { page } = authenticatedUser

  await page.goto('/posts/new')
  await fillPostForm(page, { title: 'Test', content: 'Content' })
  await expectPostInList(page, 'Test')
})
```

---

### Go (testify, table-driven tests)

#### Fixtures Pattern
```go
// tests/fixtures/auth_fixture.go
package fixtures

import (
    "testing"
    "myapp/models"
)

type AuthFixture struct {
    User    *models.User
    Token   string
    Cleanup func()
}

func AuthenticatedUser(t *testing.T) *AuthFixture {
    t.Helper()

    user := createUser(t, "test@example.com")
    token := createSession(t, user.ID)

    return &AuthFixture{
        User:  user,
        Token: token,
        Cleanup: func() {
            deleteUser(t, user.ID)
        },
    }
}
```

#### Helpers Pattern
```go
// tests/helpers/post_helpers.go
package helpers

import (
    "testing"
    "myapp/models"
)

func CreatePost(t *testing.T, authorID string, data models.PostInput) *models.Post {
    t.Helper()

    post, err := db.CreatePost(authorID, data)
    if err != nil {
        t.Fatalf("Failed to create post: %v", err)
    }
    return post
}

func AssertPostExists(t *testing.T, postID string) {
    t.Helper()

    post, err := db.GetPost(postID)
    if err != nil {
        t.Errorf("Expected post to exist, got error: %v", err)
    }
    if post == nil {
        t.Error("Expected post to exist, got nil")
    }
}
```

#### Usage in Tests
```go
// tests/posts_test.go
package tests

import (
    "testing"
    "myapp/tests/fixtures"
    "myapp/tests/helpers"
)

func TestCreatePost(t *testing.T) {
    auth := fixtures.AuthenticatedUser(t)
    defer auth.Cleanup()

    post := helpers.CreatePost(t, auth.User.ID, models.PostInput{
        Title:   "Test Post",
        Content: "Test content",
    })

    helpers.AssertPostExists(t, post.ID)
}
```

---

### Python (pytest)

#### Fixtures Pattern
```python
# tests/fixtures/auth_fixtures.py
import pytest
from myapp.models import User
from myapp.auth import create_session

@pytest.fixture
def authenticated_user(db_session):
    """Fixture providing authenticated user with session"""
    user = User(email="test@example.com")
    db_session.add(user)
    db_session.commit()

    session = create_session(user.id)

    yield {"user": user, "session": session}

    # Cleanup
    db_session.delete(user)
    db_session.commit()

@pytest.fixture
def user_with_posts(authenticated_user, db_session):
    """Fixture providing user with 5 posts"""
    user = authenticated_user["user"]
    posts = [create_post(user.id, f"Post {i}") for i in range(5)]

    yield {"user": user, "posts": posts, "session": authenticated_user["session"]}
```

#### Helpers Pattern
```python
# tests/helpers/post_helpers.py
from myapp.models import Post

def create_post(author_id: str, title: str, content: str = "Default content"):
    """Helper to create post in database"""
    post = Post(
        author_id=author_id,
        title=title,
        content=content
    )
    db.session.add(post)
    db.session.commit()
    return post

def assert_post_in_list(response, title: str):
    """Helper to assert post appears in list response"""
    posts = response.json()["posts"]
    assert any(p["title"] == title for p in posts), \
        f"Expected post '{title}' in list"

def fill_post_form(page, data: dict):
    """Helper to fill post form (Playwright)"""
    page.fill("input[name='title']", data["title"])
    page.fill("textarea[name='content']", data["content"])
    page.click("button[type='submit']")
```

#### Usage in Tests
```python
# tests/test_posts.py
import pytest
from tests.helpers.post_helpers import create_post, assert_post_in_list

def test_create_post(authenticated_user, client):
    user = authenticated_user["user"]
    session = authenticated_user["session"]

    # Create post via API
    response = client.post(
        "/api/posts",
        json={"title": "Test", "content": "Content"},
        headers={"Authorization": f"Bearer {session}"}
    )

    assert response.status_code == 201
    assert_post_in_list(
        client.get("/api/posts", headers={"Authorization": f"Bearer {session}"}),
        "Test"
    )
```

---

### Rust (cargo test)

#### Fixtures Pattern
```rust
// tests/fixtures/auth_fixtures.rs
use myapp::models::User;
use myapp::auth::create_session;

pub struct AuthFixture {
    pub user: User,
    pub token: String,
}

impl AuthFixture {
    pub fn new() -> Self {
        let user = create_user("test@example.com");
        let token = create_session(&user.id);

        Self { user, token }
    }
}

impl Drop for AuthFixture {
    fn drop(&mut self) {
        // Cleanup
        delete_user(&self.user.id);
    }
}
```

#### Helpers Pattern
```rust
// tests/helpers/post_helpers.rs
use myapp::models::{Post, PostInput};

pub fn create_post(author_id: &str, data: PostInput) -> Post {
    db::create_post(author_id, data)
        .expect("Failed to create post")
}

pub fn assert_post_exists(post_id: &str) {
    let post = db::get_post(post_id)
        .expect("Failed to get post");
    assert!(post.is_some(), "Expected post to exist");
}
```

#### Usage in Tests
```rust
// tests/posts_test.rs
mod fixtures;
mod helpers;

use fixtures::auth_fixtures::AuthFixture;
use helpers::post_helpers::{create_post, assert_post_exists};

#[test]
fn test_create_post() {
    let auth = AuthFixture::new();

    let post = create_post(&auth.user.id, PostInput {
        title: "Test".to_string(),
        content: "Content".to_string(),
    });

    assert_post_exists(&post.id);
}
```

---

## 🚨 Mandatory Checklist for AI Agents

Before implementing tests, AI agents MUST:

### Step 1: Design Test Suite
- [ ] List all test scenarios
- [ ] **Critically review**: Remove vanity tests
- [ ] **Add edge cases**: Missing scenarios
- [ ] Estimate: Aim for 10-20 tests max (not 50+)

### Step 2: Identify Repetition
- [ ] What setup code repeats? → **Make fixture**
- [ ] What actions repeat? → **Make helper**
- [ ] What assertions repeat? → **Make helper**

### Step 3: Create Infrastructure First
- [ ] Create `fixtures/` directory
- [ ] Create `helpers/` directory
- [ ] Implement 3-5 fixtures
- [ ] Implement 5-10 helpers

### Step 4: Write Lean Tests
- [ ] Each test should be 10-20 lines max
- [ ] No repetitive setup code
- [ ] Use fixtures and helpers
- [ ] Clear test name and purpose

### Step 5: Validate Quality
- [ ] **Zero vanity tests** (can justify every test)
- [ ] **All edge cases covered** (double-submit, whitespace, etc.)
- [ ] **DRY achieved** (no copy-paste code)
- [ ] **Token efficient** (40%+ savings vs naive approach)

---

## 📋 Common Fixtures to Create

### Every Project Should Have:

1. **Auth Fixture**
   - `authenticatedUser` - Regular user with session
   - `adminUser` - Admin user with elevated permissions
   - `unauthenticatedContext` - No session

2. **Database Fixture**
   - `cleanDb` - Wipes database before each test
   - `seedDb` - Populates with test data
   - `transaction` - Wraps test in transaction (rollback after)

3. **Data Fixtures**
   - `userWithPosts(n)` - User with N related records
   - `sampleData` - Realistic test data
   - `edgeCaseData` - Boundary conditions

---

## 📋 Common Helpers to Create

### Every Project Should Have:

1. **Setup Helpers**
   - `createUser(data)` - Create user in DB
   - `createSession(userId)` - Create auth session
   - `seedData(count)` - Populate test data

2. **Action Helpers**
   - `fillForm(page, data)` - Fill form fields
   - `submitForm(page)` - Submit and wait
   - `clickAndWait(page, selector)` - Click and wait for navigation

3. **Assertion Helpers**
   - `expectInList(page, item)` - Assert item in list
   - `expectValidationError(page, field)` - Assert validation
   - `expectApiSuccess(response)` - Assert API response

4. **Mock Helpers**
   - `mockNetworkError(page, endpoint)` - Simulate failure
   - `mockSlowNetwork(page)` - Simulate latency
   - `mockApiResponse(page, endpoint, data)` - Mock response

---

## 🎯 Edge Cases That Must Be Tested (Universal)

**These apply to EVERY project**, regardless of features:

### Security (Critical)
- [ ] XSS prevention (script injection)
- [ ] SQL injection prevention (malicious queries)
- [ ] CSRF protection (state-changing operations)
- [ ] Auth bypass attempts (URL manipulation)
- [ ] Rate limiting (if applicable)

### Validation (Critical)
- [ ] Required fields validation
- [ ] Empty string validation
- [ ] **Whitespace-only validation** (spaces/tabs/newlines)
- [ ] Max length validation
- [ ] Format validation (email, phone, etc.)

### Concurrency (Important)
- [ ] **Double-submit prevention** (rapid clicks)
- [ ] Concurrent updates (multiple users)
- [ ] Race conditions (critical paths)
- [ ] Optimistic locking (if applicable)

### Error Handling (Important)
- [ ] Network timeout
- [ ] Server error (500)
- [ ] Not found (404)
- [ ] Unauthorized (401/403)
- [ ] Form data preservation on error

### Edge Cases (Important)
- [ ] Empty list states
- [ ] Pagination boundaries (first page, last page)
- [ ] Delete last item on page
- [ ] Boundary values (0, -1, MAX_INT)

---

## 🚫 Anti-Patterns to AVOID

### ❌ Don't Do This

```typescript
// BAD: Repetitive setup in every test
test('create post', async ({ page }) => {
  // 20 lines of login code
  await page.goto('/login')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')
  await page.waitForURL('/dashboard')

  // 30 lines of test code
  await page.goto('/posts/new')
  await page.fill('input[name="title"]', 'Test')
  await page.fill('textarea[name="content"]', 'Content')
  await page.click('button[type="submit"]')

  // 20 lines of assertions
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Test')).toBeVisible()
  // ...
})

// BAD: Next test repeats the same setup
test('edit post', async ({ page }) => {
  // SAME 20 lines of login code again
  await page.goto('/login')
  await page.fill('input[name="email"]', 'test@example.com')
  // ...
})
```

### ✅ Do This Instead

```typescript
// GOOD: Use fixture for auth, helpers for actions
test('create post', async ({ authenticatedUser }) => {
  const { page } = authenticatedUser

  await fillPostForm(page, { title: 'Test', content: 'Content' })
  await expectPostInList(page, 'Test')
})

test('edit post', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser
  const post = await createPost(user.id, { title: 'Old' })

  await editPost(page, post.id, { title: 'New' })
  await expectPostInList(page, 'New')
})
```

**Result**: 80% less code, infinitely more readable

---

## 📊 Success Metrics

**A good test suite has**:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Vanity tests | 0 | Can justify every test |
| Code repetition | < 10% | No copy-paste setup code |
| Test count | 10-20 | Not 50+ for simple CRUD |
| Lines per test | 10-20 | Using fixtures/helpers |
| Token efficiency | 40%+ savings | vs naive approach |
| Edge case coverage | 100% | See mandatory edge cases |
| Critical bugs caught | 5-10+ | Double-submit, XSS, etc. |

---

## 🔗 Integration with Other Standards

This document is referenced by:
- `.claude/utils/test-first-workflow.md` - Uses these standards
- `.claude/agents/greenfield-*.md` - All agents follow this
- `PHASE_6_TEST_FIRST_INTEGRATION.md` - Example implementation

**When creating ANY new project**:
1. AI reads this document first
2. AI creates fixtures/ and helpers/ directories
3. AI implements tests following DRY principles
4. AI removes vanity tests before user review

---

## 🎓 Examples of This Approach in Action

See `.claude/examples/saas-nextjs-prisma/docs/e2e-test-descriptions-v2.md` for:
- 15 lean tests (down from 20)
- 8 fixtures and helpers
- 4 critical edge cases added
- 40% token savings
- Zero vanity tests

---

**Last Updated**: 2025-10-26
**Version**: 1.0.0
**Status**: 🔒 MANDATORY for all AI agents
