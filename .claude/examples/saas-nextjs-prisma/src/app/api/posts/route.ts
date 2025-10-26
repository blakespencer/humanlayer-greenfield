import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Posts API Routes
 *
 * GET /api/posts - List posts with pagination
 * POST /api/posts - Create a new post
 */

// Input validation schema for creating/updating posts
const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, 'Title is required'),
  content: z
    .string()
    .min(1, 'Content is required')
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, 'Content is required')
})

/**
 * GET /api/posts
 * List posts with pagination
 * Query params: page (default 1), limit (default 10)
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await prisma.post.count({
      where: { authorId: session.user.id }
    })

    // Get posts for current page
    const posts = await prisma.post.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching posts' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/posts
 * Create a new post
 * Body: { title: string, content: string }
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = postSchema.safeParse(body)

    if (!validation.success) {
      const errors = validation.error.errors.reduce(
        (acc, err) => {
          const field = err.path[0] as string
          acc[field] = err.message
          return acc
        },
        {} as Record<string, string>
      )

      return NextResponse.json({ errors }, { status: 400 })
    }

    const { title, content } = validation.data

    // Create post in database
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating the post' },
      { status: 500 }
    )
  }
}
