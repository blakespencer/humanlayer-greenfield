'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      setShowDeleteModal(false)
      router.refresh()
    } catch (error) {
      console.error('Error deleting post:', error)
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div
        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        data-testid={`post-card-${post.id}`}
      >
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/posts/${post.id}/edit`}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              data-testid={`edit-post-${post.id}`}
            >
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
              data-testid={`delete-post-${post.id}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          data-testid="confirm-modal"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Delete Post?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &ldquo;{post.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md disabled:bg-gray-400"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
