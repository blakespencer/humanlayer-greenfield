import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Individual Post API Routes
 *
 * GET /api/posts/[id] - Get a single post
 * PUT /api/posts/[id] - Update a post
 * DELETE /api/posts/[id] - Delete a post
 */

// Input validation schema for updating posts
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

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/posts/[id]
 * Get a single post by ID
 */
export async function GET(request: Request, context: RouteContext) {
  const params = await context.params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if user owns the post
    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the post' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/posts/[id]
 * Update a post
 * Body: { title: string, content: string }
 */
export async function PUT(request: Request, context: RouteContext) {
  const params = await context.params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if post exists and user owns it
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true }
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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

    // Update post in database
    const post = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the post' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/posts/[id]
 * Delete a post
 */
export async function DELETE(request: Request, context: RouteContext) {
  const params = await context.params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if post exists and user owns it
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      select: { authorId: true }
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete post from database
    await prisma.post.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'An error occurred while deleting the post' },
      { status: 500 }
    )
  }
}
