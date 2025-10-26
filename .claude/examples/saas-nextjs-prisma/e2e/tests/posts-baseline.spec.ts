import { test, expect } from '@playwright/test'
import { test as authTest } from '../fixtures/auth.fixture'
import { fillPostForm, goToCreatePost, goToDashboard, getPostsByAuthor } from '../helpers/post-helpers'
import { expectPostInList } from '../helpers/assertion-helpers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// CATEGORY 4: Baseline Security (3 tests)

test('unauthenticated user can access home page', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL('/')
  await expect(page.getByText('Sign In')).toBeVisible()
})

authTest('XSS attempt is sanitized', async ({ authenticatedUser }) => {
  const { page } = authenticatedUser

  await goToCreatePost(page)

  // Try to inject script
  await fillPostForm(page, {
    title: '<script>alert("XSS")</script>',
    content: 'Normal content'
  })

  await page.click('button:has-text("Publish Post")')

  // Should succeed (create post with script as text)
  await expect(page).toHaveURL('/dashboard')

  // Wait for posts to load
  await page.waitForSelector('[data-testid^="post-card-"]', { timeout: 5000 })

  // Should display as text, not execute
  // If script executed, Playwright would have detected the alert
  const titleText = await page
    .locator('[data-testid^="post-card-"]')
    .first()
    .textContent()

  expect(titleText).toContain('script') // Displayed as text, not executed
})

authTest('SQL injection attempt prevented', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  await goToCreatePost(page)

  // Try SQL injection
  await fillPostForm(page, {
    title: "'; DROP TABLE posts; --",
    content: 'Malicious content'
  })

  await page.click('button:has-text("Publish Post")')

  // Should create post normally (not execute SQL)
  await expect(page).toHaveURL('/dashboard')

  // Verify post created with literal string
  const posts = await getPostsByAuthor(user.id)
  expect(posts.length).toBe(1)
  expect(posts[0].title).toBe("'; DROP TABLE posts; --")

  // Verify posts table still exists (can query it)
  const allPosts = await prisma.post.findMany()
  expect(allPosts).toBeDefined()
  expect(Array.isArray(allPosts)).toBe(true)
})
