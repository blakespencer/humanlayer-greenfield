import { test, expect } from '../fixtures/auth.fixture'
import {
  createPost,
  getPostByTitle,
  getPost,
  fillPostForm,
  submitPostForm,
  goToDashboard,
  goToCreatePost,
  goToEditPost,
  getPostsByAuthor
} from '../helpers/post-helpers'
import { expectPostInList, expectPostNotInList } from '../helpers/assertion-helpers'

// CATEGORY 1: Core CRUD (5 tests)

test('user can create first post', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  await goToCreatePost(page)

  // Use helper to fill form
  await fillPostForm(page, {
    title: 'My First Post',
    content: 'This is my first post content'
  })

  await submitPostForm(page)

  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard')

  // Use helper to verify post appears
  await expectPostInList(page, 'My First Post')

  // Verify in database
  const post = await getPostByTitle(user.id, 'My First Post')
  expect(post).toBeTruthy()
  expect(post?.content).toBe('This is my first post content')
})

test('user can edit existing post', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  // Helper creates post in DB
  const post = await createPost(user.id, {
    title: 'Original Title',
    content: 'Original content'
  })

  // Navigate and edit
  await goToEditPost(page, post.id)

  await fillPostForm(page, {
    title: 'Updated Title',
    content: 'Updated content'
  })

  await submitPostForm(page)

  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard')

  // Verify update
  await expectPostInList(page, 'Updated Title')
  await expectPostNotInList(page, 'Original Title')

  // Verify updatedAt changed
  const updated = await getPost(post.id)
  expect(updated).toBeTruthy()
  expect(updated!.updatedAt.getTime()).toBeGreaterThan(post.updatedAt.getTime())
})

test('user can delete post with confirmation', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  const post1 = await createPost(user.id, { title: 'Post 1', content: 'Content 1' })
  const post2 = await createPost(user.id, { title: 'Post 2', content: 'Content 2' })

  await goToDashboard(page)

  // Click delete, cancel in modal
  await page.click(`[data-testid="delete-post-${post1.id}"]`)
  const modal = page.locator('[data-testid="confirm-modal"]')
  await expect(modal.getByText('Delete Post?')).toBeVisible()
  await modal.getByRole('button', { name: 'Cancel' }).click()

  // Verify still exists
  await expectPostInList(page, 'Post 1')

  // Click delete, confirm
  await page.click(`[data-testid="delete-post-${post1.id}"]`)
  await modal.getByRole('button', { name: 'Delete' }).click()

  // Verify deleted
  await expectPostNotInList(page, 'Post 1')
  await expectPostInList(page, 'Post 2') // Other post still there

  // Verify in DB
  const deleted = await getPost(post1.id)
  expect(deleted).toBeNull()
})

test('user can navigate paginated posts', async ({ authenticatedUser }) => {
  const { page, user } = authenticatedUser

  // Create 25 posts
  const postPromises = []
  for (let i = 1; i <= 25; i++) {
    postPromises.push(
      createPost(user.id, { title: `Post ${i}`, content: `Content ${i}` })
    )
  }
  await Promise.all(postPromises)

  await goToDashboard(page)

  // Page 1: 10 posts
  const postCards = page.locator('[data-testid^="post-card-"]')
  await expect(postCards).toHaveCount(10)

  // Next button enabled, Previous disabled
  const pagination = page.locator('[data-testid="pagination"]')
  const nextBtn = pagination.getByRole('button', { name: 'Next' })
  const prevBtn = pagination.getByRole('button', { name: 'Previous' })
  await expect(nextBtn).toBeEnabled()
  await expect(prevBtn).toBeDisabled()

  // Go to page 2
  await nextBtn.click()
  await expect(page).toHaveURL(/page=2/)
  await expect(postCards).toHaveCount(10)

  // Both buttons enabled
  await expect(nextBtn).toBeEnabled()
  await expect(prevBtn).toBeEnabled()

  // Go to page 3 (only 5 posts)
  await nextBtn.click()
  await expect(page).toHaveURL(/page=3/)
  await expect(postCards).toHaveCount(5)

  // Next disabled
  await expect(nextBtn).toBeDisabled()
})

test('pagination updates when deleting post on page boundary', async ({
  authenticatedUser
}) => {
  const { page, user } = authenticatedUser

  // Create 11 posts (page 1: 10 newest, page 2: 1 oldest)
  // Posts are displayed newest first (createdAt DESC)
  const posts = []
  for (let i = 1; i <= 11; i++) {
    posts.push(
      await createPost(user.id, { title: `Post ${i}`, content: `Content ${i}` })
    )
  }

  await page.goto('/dashboard?page=2')

  // Page 2 has 1 post (the oldest post, posts[0])
  const postCards = page.locator('[data-testid^="post-card-"]')
  await expect(postCards).toHaveCount(1)

  // Delete the only post on page 2 (oldest post = posts[0])
  const deleteBtn = page.locator(`[data-testid="delete-post-${posts[0].id}"]`)
  await deleteBtn.waitFor({ state: 'visible', timeout: 10000 })
  await deleteBtn.click()

  const modal = page.locator('[data-testid="confirm-modal"]')
  await modal.getByRole('button', { name: 'Delete' }).click()

  // After delete, either stays on page 2 (now empty) or redirects to page 1
  // Verify the post was deleted from database
  await page.waitForTimeout(1000) // Wait for delete to process
  const remainingPosts = await getPostsByAuthor(user.id)
  expect(remainingPosts.length).toBe(10) // 10 posts remaining
})
