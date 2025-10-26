import { test as base, Page } from '@playwright/test'
import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

type AuthenticatedUser = {
  page: Page
  user: {
    id: string
    email: string
    name: string | null
  }
  cleanup: () => Promise<void>
}

export const test = base.extend<{ authenticatedUser: AuthenticatedUser }>({
  authenticatedUser: async ({ page }, use) => {
    // Create user with properly hashed password
    const email = `test-${crypto.randomUUID()}@example.com`
    const password = 'testpassword123'
    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name: 'Test User',
        password: hashedPassword
      }
    })

    // Perform real login flow (generates proper JWT token)
    // This is more robust than manually setting cookies
    await page.goto('/login')

    // Fill in login form
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', password)

    // Submit form and wait for redirect to dashboard
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard', { timeout: 10000 })

    const cleanup = async () => {
      // Cleanup user and all related data (cascading deletes)
      await prisma.user.delete({ where: { id: user.id } })
    }

    await use({ page, user, cleanup })

    // Cleanup after test
    await cleanup()
  }
})

export { expect } from '@playwright/test'
