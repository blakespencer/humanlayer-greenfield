import { Page } from '@playwright/test'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type PostData = {
  title: string
  content: string
}

/**
 * Create a post directly in the database
 */
export async function createPost(authorId: string, data: PostData) {
  return prisma.post.create({
    data: {
      ...data,
      authorId
    }
  })
}

/**
 * Get a post by ID
 */
export async function getPost(postId: string) {
  return prisma.post.findUnique({
    where: { id: postId }
  })
}

/**
 * Get a post by title for a specific author
 */
export async function getPostByTitle(authorId: string, title: string) {
  return prisma.post.findFirst({
    where: {
      authorId,
      title
    }
  })
}

/**
 * Delete a post by ID
 */
export async function deletePost(postId: string) {
  return prisma.post.delete({
    where: { id: postId }
  })
}

/**
 * Fill the post form (create or edit)
 */
export async function fillPostForm(page: Page, data: PostData) {
  await page.fill('input[name="title"]', data.title)
  await page.fill('textarea[name="content"]', data.content)
}

/**
 * Submit the post form
 */
export async function submitPostForm(page: Page) {
  await page.click('button[type="submit"]')
}

/**
 * Navigate to create post page
 */
export async function goToCreatePost(page: Page) {
  await page.goto('/posts/new')
}

/**
 * Navigate to edit post page
 */
export async function goToEditPost(page: Page, postId: string) {
  await page.goto(`/posts/${postId}/edit`)
}

/**
 * Navigate to dashboard
 */
export async function goToDashboard(page: Page) {
  await page.goto('/dashboard')
}

/**
 * Get all posts for a user
 */
export async function getPostsByAuthor(authorId: string) {
  return prisma.post.findMany({
    where: { authorId },
    orderBy: { createdAt: 'desc' }
  })
}

/**
 * Count posts for a user
 */
export async function countPostsByAuthor(authorId: string) {
  return prisma.post.count({
    where: { authorId }
  })
}
