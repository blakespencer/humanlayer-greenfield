import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import PostForm from '@/components/PostForm'

/**
 * Create Post Page Component
 *
 * Protected page for creating new posts
 */
export default async function NewPostPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <PostForm mode="create" />
        </div>
      </div>
    </div>
  )
}
