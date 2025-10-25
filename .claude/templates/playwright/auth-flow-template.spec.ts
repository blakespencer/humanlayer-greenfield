/**
 * E2E Test Template: Authentication Flow
 *
 * This template provides a complete authentication flow test
 * that should be included in every app with authentication.
 *
 * IMPORTANT: This test would have caught the Phase 6B middleware bug!
 *
 * Usage:
 * 1. Copy to your e2e/ directory
 * 2. Update baseURL and routes for your app
 * 3. Customize assertions for your UI
 * 4. Run with: npx playwright test
 */

import { test, expect } from '@playwright/test'

/**
 * CRITICAL TEST: Public Routes Accessibility
 *
 * This test ensures unauthenticated users can access public pages.
 * In Phase 6B, the middleware bug would have caused this test to FAIL,
 * immediately alerting us to the problem.
 */
test.describe('Public Routes', () => {
  test('unauthenticated user can access home page', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')

    // Should NOT redirect to login
    await expect(page).toHaveURL('/')

    // Should see public content (customize for your app)
    await expect(page.locator('h1')).toBeVisible()

    // Should see sign in/sign up links (not user menu)
    await expect(page.getByText('Sign In')).toBeVisible()
    await expect(page.getByText('Sign Up')).toBeVisible()
  })

  test('unauthenticated user can access login page', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: /log in|sign in/i })).toBeVisible()
  })

  test('unauthenticated user can access signup page', async ({ page }) => {
    await page.goto('/signup')

    await expect(page).toHaveURL('/signup')
    await expect(page.getByRole('heading', { name: /sign up|register/i })).toBeVisible()
  })
})

/**
 * CRITICAL TEST: Protected Routes
 *
 * Ensures authenticated routes redirect to login when not authenticated.
 */
test.describe('Protected Routes', () => {
  test('unauthenticated user redirected from dashboard', async ({ page }) => {
    // Try to access dashboard without auth
    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)

    // Should see login form
    await expect(page.getByRole('heading', { name: /log in|sign in/i })).toBeVisible()
  })

  test('unauthenticated user redirected from profile', async ({ page }) => {
    await page.goto('/profile')
    await expect(page).toHaveURL(/\/login/)
  })

  test('unauthenticated user redirected from settings', async ({ page }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL(/\/login/)
  })
})

/**
 * User Registration Flow
 */
test.describe('User Registration', () => {
  test('user can sign up with valid credentials', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup')

    // Generate unique email for this test run
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'SecurePassword123!'

    // Fill registration form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[type="password"]', testPassword)

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to dashboard after successful signup
    await expect(page).toHaveURL('/dashboard')

    // Should see welcome message with user's name
    await expect(page.getByText(/welcome.*test user/i)).toBeVisible()

    // UI State Check: Should see user menu (not sign in/sign up)
    await expect(page.getByText('Sign In')).not.toBeVisible()

    // Backend State Check: Verify user was created
    const response = await page.request.get('/api/auth/session')
    expect(response.status()).toBe(200)
    const session = await response.json()
    expect(session.user.email).toBe(testEmail)
  })

  test('shows error for duplicate email', async ({ page }) => {
    // This test assumes a user already exists
    // In real scenario, create a user in beforeAll/beforeEach

    await page.goto('/signup')

    await page.fill('input[name="email"]', 'existing@example.com')
    await page.fill('input[name="password"]', 'Password123!')
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.getByText(/email already registered|user already exists/i)).toBeVisible()

    // Should still be on signup page
    await expect(page).toHaveURL('/signup')
  })

  test('shows validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/signup')

    // Try to submit with invalid email
    await page.fill('input[name="email"]', 'not-an-email')
    await page.fill('input[name="password"]', 'short')
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.getByText(/invalid email|email address/i)).toBeVisible()
    await expect(page.getByText(/password must be|at least 8 characters/i)).toBeVisible()
  })
})

/**
 * User Login Flow
 */
test.describe('User Login', () => {
  // Setup: Create a test user before tests
  test.beforeEach(async ({ request }) => {
    // Create test user via API
    await request.post('/api/auth/signup', {
      data: {
        name: 'Login Test User',
        email: 'login-test@example.com',
        password: 'TestPassword123!'
      }
    })
  })

  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('/login')

    // Fill login form
    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123!')

    // Submit
    await page.click('button[type="submit"]')

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')

    // Should see welcome message
    await expect(page.getByText(/welcome/i)).toBeVisible()

    // UI State: Should see user menu
    await expect(page.getByText('Login Test User')).toBeVisible()
  })

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'WrongPassword!')
    await page.click('button[type="submit"]')

    // Should show error
    await expect(page.getByText(/invalid.*password|incorrect credentials/i)).toBeVisible()

    // Should still be on login page
    await expect(page).toHaveURL('/login')
  })

  test('remembers redirect destination after login', async ({ page }) => {
    // Try to access protected page
    await page.goto('/settings')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)

    // Login
    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Should redirect back to originally requested page
    await expect(page).toHaveURL('/settings')
  })
})

/**
 * User Logout Flow
 */
test.describe('User Logout', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })

  test('user can logout', async ({ page }) => {
    // Open user menu
    await page.click('button[aria-label="User menu"]')
    // Or if using text: await page.click('text="Test User"')

    // Click sign out
    await page.click('text="Sign Out"')

    // Should redirect to home page
    await expect(page).toHaveURL('/')

    // UI State: Should see sign in/sign up buttons (not user menu)
    await expect(page.getByText('Sign In')).toBeVisible()
    await expect(page.getByText('Sign Up')).toBeVisible()

    // Backend State: Session should be cleared
    const response = await page.request.get('/api/auth/session')
    const session = await response.json()
    expect(session.user).toBeNull()
  })

  test('logged out user cannot access protected routes', async ({ page }) => {
    // Logout
    await page.click('button[aria-label="User menu"]')
    await page.click('text="Sign Out"')

    // Try to access dashboard
    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })
})

/**
 * Session Persistence
 */
test.describe('Session Persistence', () => {
  test('session persists across page refreshes', async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Navigate to dashboard
    await page.goto('/dashboard')
    await expect(page.getByText(/welcome/i)).toBeVisible()

    // Refresh page
    await page.reload()

    // Should still be logged in
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText(/welcome/i)).toBeVisible()
  })

  test('session persists across navigation', async ({ page }) => {
    // Login and navigate through app
    await page.goto('/login')
    await page.fill('input[name="email"]', 'login-test@example.com')
    await page.fill('input[type="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Navigate to different protected pages
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/dashboard')

    await page.goto('/profile')
    await expect(page).toHaveURL('/profile')

    await page.goto('/settings')
    await expect(page).toHaveURL('/settings')

    // Should still be authenticated on all pages
    // (not redirected to login)
  })
})

/**
 * Security Tests
 */
test.describe('Security', () => {
  test('cannot access API routes without authentication', async ({ request }) => {
    // Try to access protected API endpoint
    const response = await request.get('/api/user/me')

    // Should return 401 or 403
    expect([401, 403]).toContain(response.status())
  })

  test('CSRF token required for state-changing operations', async ({ request }) => {
    // This test depends on your CSRF implementation
    // NextAuth includes CSRF protection by default

    const response = await request.post('/api/auth/signin', {
      data: {
        email: 'test@example.com',
        password: 'password'
      },
      // Omit CSRF token header
    })

    // Should reject request without CSRF token
    expect(response.status()).not.toBe(200)
  })
})

/**
 * Baseline Tests: Network Errors
 */
test.describe('Network Error Handling', () => {
  test('shows user-friendly error on network timeout', async ({ page }) => {
    // Simulate slow network
    await page.route('**/api/auth/signin', route => {
      setTimeout(() => route.abort('timedout'), 5000)
    })

    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button[type="submit"]')

    // Should show timeout error
    await expect(page.getByText(/timeout|took too long|try again/i)).toBeVisible()
  })

  test('shows user-friendly error on server error', async ({ page }) => {
    // Simulate server error
    await page.route('**/api/auth/signin', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    })

    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button[type="submit"]')

    // Should show generic error (not raw server error)
    await expect(page.getByText(/something went wrong|error occurred|try again/i)).toBeVisible()
    // Should NOT expose technical details
    await expect(page.getByText(/500|internal server error/i)).not.toBeVisible()
  })
})
