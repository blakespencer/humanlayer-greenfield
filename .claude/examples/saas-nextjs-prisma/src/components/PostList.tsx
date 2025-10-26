'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import PostCard from './PostCard'

type Post = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

type PostListProps = {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function PostList({ posts, pagination }: PostListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = pagination.page

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/dashboard?${params.toString()}`)
  }

  if (posts.length === 0) {
    return (
      <div
        className="text-center py-12 empty-state"
        data-testid="empty-state"
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
        <p className="text-gray-500">Create your first post to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div
          className="flex justify-center items-center gap-4 pt-6 pagination"
          data-testid="pagination"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
