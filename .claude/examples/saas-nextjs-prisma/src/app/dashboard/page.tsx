import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PostList from '@/components/PostList'

type DashboardPageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

/**
 * Dashboard Page Component
 *
 * Protected Server Component that displays user's posts with pagination
 */
export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams
  // Server-side authentication check
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Parse pagination parameters
  const page = parseInt(searchParams.page || '1')
  const limit = 10
  const skip = (page - 1) * limit

  // Fetch posts and total count
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
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
    }),
    prisma.post.count({
      where: { authorId: session.user.id }
    })
  ])

  const totalPages = Math.ceil(total / limit)
  const userName = session.user.name || 'User'

  // Serialize dates for client components
  const serializedPosts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString()
  }))

  const pagination = {
    page,
    limit,
    total,
    totalPages
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              👋 Welcome back, {userName}!
            </h1>
            <p className="text-gray-600">Manage your posts</p>
          </div>
          <Link
            href="/posts/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            + New Post
          </Link>
        </div>

        {/* Posts List Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📝 Your Posts
          </h2>
          <PostList posts={serializedPosts} pagination={pagination} />
        </section>
      </div>
    </div>
  )
}
