# Baseline Test Suite

**Purpose**: Every application should include these baseline tests to catch common issues. These are the "table stakes" tests that prevent basic bugs.

**When to use**: Include these tests in EVERY project, regardless of features.

---

## 🛡️ Checklist

Copy this checklist when starting a new project:

### Authentication & Authorization
- [ ] Unauthenticated user can access public routes
- [ ] Unauthenticated user cannot access protected routes
- [ ] Authenticated user can access protected routes
- [ ] User logout clears session completely
- [ ] Expired token/session redirects to login
- [ ] Session persists across page refreshes
- [ ] Session persists across navigation

### Network & Error Handling
- [ ] Network timeout shows user-friendly error
- [ ] Server error (500) shows user-friendly error
- [ ] Network offline shows appropriate message
- [ ] Slow network doesn't break UI
- [ ] No sensitive data exposed in error messages

### Data Validation & Security
- [ ] Required fields validated on client
- [ ] Required fields validated on server
- [ ] Invalid data rejected with clear error messages
- [ ] XSS attempts sanitized (input contains `<script>`)
- [ ] SQL injection prevented (input contains `' OR '1'='1`)
- [ ] CSRF token required for state-changing operations
- [ ] Rate limiting prevents abuse (if applicable)

### Concurrency & Race Conditions
- [ ] Double-submit prevented (button disabled after click)
- [ ] Multiple simultaneous requests handled correctly
- [ ] Race condition in critical paths prevented
- [ ] Database transactions maintain consistency

### Performance (Optional but Recommended)
- [ ] Initial page load under 3 seconds
- [ ] API responses under 200ms (95th percentile)
- [ ] No memory leaks on long-running pages
- [ ] Images lazy-loaded appropriately

### Accessibility (Optional but Recommended)
- [ ] Keyboard navigation works throughout app
- [ ] Screen reader can navigate forms
- [ ] Form inputs have labels
- [ ] Error messages associated with form fields

---

## 📝 Test Templates

### Authentication Tests

See `.claude/templates/playwright/auth-flow-template.spec.ts` for complete examples.

**Quick Reference**:
```typescript
// Public route accessibility (CRITICAL - catches middleware bugs!)
test('unauthenticated user can access home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Sign In')).toBeVisible()
})

// Protected route redirects
test('unauthenticated user redirected from dashboard', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login/)
})

// Session persistence
test('session persists across page refreshes', async ({ page }) => {
  // Login
  await page.goto('/login')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')

  // Refresh
  await page.reload()

  // Should still be logged in
  await expect(page).toHaveURL('/dashboard')
})
```

---

### Network Error Tests

```typescript
test('shows user-friendly error on network timeout', async ({ page }) => {
  // Simulate timeout
  await page.route('**/api/**', route => {
    setTimeout(() => route.abort('timedout'), 5000)
  })

  // Perform action that makes API call
  await page.goto('/dashboard')

  // Should show friendly error
  await expect(page.getByText(/timeout|try again/i)).toBeVisible()
})

test('shows user-friendly error on server error', async ({ page }) => {
  // Simulate 500 error
  await page.route('**/api/**', route => {
    route.fulfill({ status: 500 })
  })

  await page.goto('/dashboard')

  // Should show generic error (not technical details)
  await expect(page.getByText(/something went wrong/i)).toBeVisible()
  await expect(page.getByText(/500|internal server/i)).not.toBeVisible()
})

test('handles slow network gracefully', async ({ page }) => {
  // Simulate slow network (2 second delay)
  await page.route('**/api/**', route => {
    setTimeout(() => route.continue(), 2000)
  })

  await page.goto('/dashboard')

  // Should show loading state
  await expect(page.getByRole('progressbar')).toBeVisible()

  // Eventually loads
  await expect(page.getByText(/welcome/i)).toBeVisible({ timeout: 5000 })
})
```

---

### Security Tests

```typescript
test('sanitizes XSS attempts', async ({ page }) => {
  await page.goto('/profile/edit')

  // Try to inject script
  await page.fill('input[name="name"]', '<script>alert("xss")</script>')
  await page.click('button[type="submit"]')

  // Script should not execute
  // (Playwright will throw if alert appears)

  // Should be displayed as text, not executed
  await expect(page.getByText('<script>alert("xss")</script>')).toBeVisible()
})

test('prevents SQL injection', async ({ page }) => {
  await page.goto('/login')

  // Try SQL injection
  await page.fill('input[name="email"]', "admin' OR '1'='1")
  await page.fill('input[name="password"]', "anything")
  await page.click('button[type="submit"]')

  // Should not log in
  await expect(page).toHaveURL(/\/login/)
  await expect(page.getByText(/invalid/i)).toBeVisible()
})

test('API requires authentication', async ({ request }) => {
  // Try to access protected endpoint without auth
  const response = await request.get('/api/user/me')

  expect([401, 403]).toContain(response.status())
})

test('CSRF protection enabled', async ({ request }) => {
  // Try POST without CSRF token
  const response = await request.post('/api/user/update', {
    data: { name: 'New Name' },
    // Omit CSRF token
  })

  expect(response.status()).not.toBe(200)
})
```

---

### Validation Tests

```typescript
test('validates required fields', async ({ page }) => {
  await page.goto('/signup')

  // Try to submit without filling fields
  await page.click('button[type="submit"]')

  // Should show validation errors
  await expect(page.getByText(/email is required/i)).toBeVisible()
  await expect(page.getByText(/password is required/i)).toBeVisible()
})

test('validates email format', async ({ page }) => {
  await page.goto('/signup')

  await page.fill('input[name="email"]', 'not-an-email')
  await page.click('button[type="submit"]')

  await expect(page.getByText(/invalid email/i)).toBeVisible()
})

test('validates password strength', async ({ page }) => {
  await page.goto('/signup')

  await page.fill('input[name="password"]', 'weak')
  await page.click('button[type="submit"]')

  await expect(page.getByText(/password must be.*8 characters/i)).toBeVisible()
})

// Server-side validation (even if client bypassed)
test('server validates required fields', async ({ request }) => {
  const response = await request.post('/api/user/create', {
    data: {
      // Missing required fields
      name: ''
    }
  })

  expect(response.status()).toBe(400)
  const body = await response.json()
  expect(body.error).toMatch(/required/i)
})
```

---

### Concurrency Tests

```typescript
test('prevents double-submit', async ({ page }) => {
  await page.goto('/checkout')

  // Fill checkout form
  await page.fill('input[name="card"]', '4242424242424242')

  // Click submit multiple times rapidly
  const submitButton = page.getByRole('button', { name: /submit|pay/i })
  await submitButton.click()
  await submitButton.click() // Second click
  await submitButton.click() // Third click

  // Should only create ONE order
  // Check backend state
  const response = await page.request.get('/api/orders')
  const orders = await response.json()

  expect(orders.length).toBe(1) // Only one order created
})

test('handles concurrent requests correctly', async ({ page, context }) => {
  // Open two tabs
  const page1 = await context.newPage()
  const page2 = await context.newPage()

  // Both pages try to update same resource
  await page1.goto('/profile/edit')
  await page2.goto('/profile/edit')

  await page1.fill('input[name="bio"]', 'Bio from page 1')
  await page2.fill('input[name="bio"]', 'Bio from page 2')

  await page1.click('button[type="submit"]')
  await page2.click('button[type="submit"]')

  // Last write should win, or show conflict error
  // Check which behavior is expected for your app
  const response = await page1.request.get('/api/user/me')
  const user = await response.json()

  // Either optimistic concurrency (shows error) or last-write-wins
  expect(['Bio from page 1', 'Bio from page 2']).toContain(user.bio)
})
```

---

### Performance Tests (Optional)

```typescript
test('page loads under 3 seconds', async ({ page }) => {
  const startTime = Date.now()

  await page.goto('/dashboard')

  const loadTime = Date.now() - startTime

  expect(loadTime).toBeLessThan(3000)
})

test('API response under 200ms', async ({ request }) => {
  const startTime = Date.now()

  await request.get('/api/user/me')

  const responseTime = Date.now() - startTime

  expect(responseTime).toBeLessThan(200)
})

test('lazy loads images', async ({ page }) => {
  await page.goto('/gallery')

  // Check images below fold are not loaded initially
  const belowFoldImage = page.locator('img').nth(20)

  expect(await belowFoldImage.getAttribute('loading')).toBe('lazy')
})
```

---

## 🎯 Integration with Test-First Workflow

**Phase 1-2: During E2E test description phase**
- Review this checklist
- Include relevant baseline tests in E2E test descriptions
- User reviews and approves (ensures nothing missed)

**Phase 3: During E2E test implementation**
- Implement baseline tests alongside feature-specific tests
- Use templates from `.claude/templates/playwright/`

**Phase 6: During implementation**
- Code must make baseline tests pass
- Baseline tests act as guardrails

---

## 🔍 How This Prevents Bugs

### Example: Phase 6B Middleware Bug

**What happened**: Middleware regex incorrectly protected home page

**How baseline test would catch it**:
```typescript
test('unauthenticated user can access home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/') // ❌ FAILS - redirects to /login
  await expect(page.getByText('Sign In')).toBeVisible() // ❌ FAILS
})
```

**When it would be caught**: Before any code review, during Phase 3 (E2E implementation)

**Result**: Bug caught immediately, never makes it to Phase 6 (implementation)

---

## 📚 Resources

- **Test Templates**: `.claude/templates/playwright/auth-flow-template.spec.ts`
- **Test-First Workflow**: `.claude/utils/test-first-workflow.md`
- **Playwright Docs**: https://playwright.dev/docs/intro
- **Security Checklist**: OWASP Top 10 2025

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
