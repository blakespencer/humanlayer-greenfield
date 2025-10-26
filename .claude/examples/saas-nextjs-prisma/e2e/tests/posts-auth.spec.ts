import { test, expect } from '@playwright/test'
import { test as authTest } from '../fixtures/auth.fixture'
import { createPost, getPost, goToCreatePost, goToDashboard } from '../helpers/post-helpers'
import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

// CATEGORY 3: Authorization (3 tests)

test('unauthenticated user redirected to login', async ({ page }) => {
  // No authentication
  await goToCreatePost(page)

  // Should redirect to login
  await expect(page).toHaveURL(/login/)
})

authTest('user cannot edit another user\'s post', async ({ authenticatedUser }) => {
  const { page, user: alice, cleanup: aliceCleanup } = authenticatedUser

  // Create Bob's user and post
  const bobEmail = `bob-${crypto.randomUUID()}@example.com`
  const bob = await prisma.user.create({
    data: {
      email: bobEmail,
      name: 'Bob',
      password: '$2a$10$dummyhashfortest'
    }
  })

  const bobPost = await createPost(bob.id, { title: 'Bob\'s Post', content: 'Bob content' })

  // Alice tries to access Bob's edit page
  await page.goto(`/posts/${bobPost.id}/edit`)

  // Should show "Forbidden" message
  await expect(page.getByText('Forbidden')).toBeVisible()
  await expect(page.getByText('You are not authorized to edit this post')).toBeVisible()

  // Cleanup Bob's data
  await prisma.post.deleteMany({ where: { authorId: bob.id } })
  await prisma.user.delete({ where: { id: bob.id } })
})

authTest('user cannot delete another user\'s post', async ({ authenticatedUser }) => {
  const { page, user: alice } = authenticatedUser

  // Create Bob's user and post
  const bobEmail = `bob-${crypto.randomUUID()}@example.com`
  const bob = await prisma.user.create({
    data: {
      email: bobEmail,
      name: 'Bob',
      password: '$2a$10$dummyhashfortest'
    }
  })

  const bobPost = await createPost(bob.id, { title: 'Bob\'s Post', content: 'Bob content' })

  // Try API call directly (bypass UI)
  const response = await page.request.delete(`/api/posts/${bobPost.id}`)

  expect(response.status()).toBe(403)

  // Verify Bob's post still exists
  const post = await getPost(bobPost.id)
  expect(post).toBeTruthy()

  // Cleanup Bob's data
  await prisma.post.deleteMany({ where: { authorId: bob.id } })
  await prisma.user.delete({ where: { id: bob.id } })
})
