import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PostForm from '@/components/PostForm'

type EditPostPageProps = {
  params: Promise<{
    id: string
  }>
}

/**
 * Edit Post Page Component
 *
 * Protected page for editing existing posts
 * Only the post author can access this page
 */
export default async function EditPostPage(props: EditPostPageProps) {
  const params = await props.params
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  // Fetch the post
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true
    }
  })

  // Check if post exists
  if (!post) {
    notFound()
  }

  // Check if user owns the post
  if (post.authorId !== session.user.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forbidden
          </h1>
          <p className="text-gray-600 mb-4">
            You are not authorized to edit this post.
          </p>
          <a
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <PostForm
            mode="edit"
            postId={post.id}
            initialData={{
              title: post.title,
              content: post.content
            }}
          />
        </div>
      </div>
    </div>
  )
}
