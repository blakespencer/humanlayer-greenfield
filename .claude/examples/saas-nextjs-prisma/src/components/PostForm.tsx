'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type PostFormProps = {
  initialData?: {
    title: string
    content: string
  }
  postId?: string
  mode: 'create' | 'edit'
}

export default function PostForm({ initialData, postId, mode }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setErrors({})
    setGeneralError('')

    // Prevent double submission
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const url = mode === 'create' ? '/api/posts' : `/api/posts/${postId}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setGeneralError(data.error || 'An error occurred')
        }
        setIsSubmitting(false)
        return
      }

      // Success - redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error submitting form:', error)
      setGeneralError('Network error. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && (
        <div
          className="error-message alert-error rounded-md bg-red-50 p-4 text-red-800"
          data-testid="error-message"
        >
          {generalError}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p
            className="error-title mt-1 text-sm text-red-600"
            data-testid="error-title"
          >
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
        />
        {errors.content && (
          <p
            className="error-content mt-1 text-sm text-red-600"
            data-testid="error-content"
          >
            {errors.content}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
