import { test as base } from '@playwright/test'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const test = base.extend<{ cleanDb: PrismaClient }>({
  cleanDb: async ({}, use) => {
    // Clean database before test
    await prisma.post.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()

    await use(prisma)

    // Cleanup after test
    await prisma.post.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()
  }
})

export { expect } from '@playwright/test'
