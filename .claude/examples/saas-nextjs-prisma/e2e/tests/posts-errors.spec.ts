import { test, expect } from '../fixtures/auth.fixture'
import { fillPostForm, goToCreatePost, getPostsByAuthor } from '../helpers/post-helpers'
import { expectValidationError } from '../helpers/assertion-helpers'
import { mockNetworkError, clearMocks } from '../helpers/mock-helpers'

// CATEGORY 2: Error Handling (4 tests)

test('form validation prevents empty submission', async ({ authenticatedUser }) => {
  const { page } = authenticatedUser

  await goToCreatePost(page)

  // Try to submit empty
  await page.click('button:has-text("Publish Post")')

  // Helper checks validation errors
  await expectValidationError(page, 'title', 'Title is required')
  await expectValidationError(page, 'content', 'Content is required')

  // Fill only title
  await page.fill('input[name="title"]', 'Test')
  await page.click('button:has-text("Publish Post")')

  // Only content error remains
  await expectValidationError(page, 'content', 'Content is required')

  // Fill content and succeed
  await page.fill('textarea[name="content"]', 'Test content')
  await page.click('button:has-text("Publish Post")')

  await expect(page).toHaveURL('/dashboard')
})

test('validation rejects whitespace-only content', async ({ authenticatedUser }) => {
  const { page } = authenticatedUser

  await goToCreatePost(page)

  // Fill with only spaces/newlines
  await page.fill('input[name="title"]', '    ')
  await page.fill('textarea[name="content"]', '\n\n   \n')
  await page.click('button:has-text("Publish Post")')

  // Should show validation errors
  await expectValidationError(page, 'title', 'Title is required')
  await expectValidationError(page, 'content', 'Content is required')
})

test('network error shows message and preserves form data', async ({
  authenticatedUser
}) => {
  const { page } = authenticatedUser

  await goToCreatePost(page)

  // Fill form
  await fillPostForm(page, {
    title: 'Important Post',
    content: 'This took 10 minutes to write!'
  })

  // Mock network failure
  await mockNetworkError(page, '**/api/posts')

  await page.click('button:has-text("Publish Post")')

  // Verify error message
  await expect(page.getByText(/network error|failed|error/i)).toBeVisible()

  // Verify form data preserved (most important - user doesn't lose work)
  await expect(page.locator('input[name="title"]')).toHaveValue('Important Post')
  await expect(page.locator('textarea[name="content"]')).toHaveValue(
    'This took 10 minutes to write!'
  )

  // Clear mock for cleanup
  await clearMocks(page)
})

test('prevents duplicate post from double-submit', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  await goToCreatePost(page)
  await fillPostForm(page, { title: 'Test Post', content: 'Content' })

  // Click submit button multiple times rapidly
  const submitBtn = page.getByRole('button', { name: /publish/i })
  await Promise.all([submitBtn.click(), submitBtn.click(), submitBtn.click()])

  // Wait for navigation
  await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

  // Verify only ONE post created
  const posts = await getPostsByAuthor(user.id)
  expect(posts.length).toBe(1)

  // UI should show only 1 post card
  const postCards = page.locator('[data-testid^="post-card-"]')
  await expect(postCards).toHaveCount(1)
})
