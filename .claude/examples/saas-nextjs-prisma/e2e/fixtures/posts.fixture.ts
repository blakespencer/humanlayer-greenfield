import { test as base, expect } from './auth.fixture'
import { createPost } from '../helpers/post-helpers'
import { Page } from '@playwright/test'

type MultiplePostsUser = {
  page: Page
  user: {
    id: string
    email: string
    name: string | null
  }
  posts: Array<{
    id: string
    title: string
    content: string
  }>
  cleanup: () => Promise<void>
}

export const test = base.extend<{ multiplePostsUser: MultiplePostsUser }>({
  multiplePostsUser: async ({ authenticatedUser }, use) => {
    const { page, user, cleanup: authCleanup } = authenticatedUser

    // Create multiple posts for the authenticated user
    const posts = await Promise.all([
      createPost(user.id, { title: 'Post 1', content: 'Content 1' }),
      createPost(user.id, { title: 'Post 2', content: 'Content 2' }),
      createPost(user.id, { title: 'Post 3', content: 'Content 3' })
    ])

    const cleanup = async () => {
      // Posts will be cleaned up via CASCADE when user is deleted
      await authCleanup()
    }

    await use({ page, user, posts, cleanup })

    await cleanup()
  }
})

export { expect } from '@playwright/test'
