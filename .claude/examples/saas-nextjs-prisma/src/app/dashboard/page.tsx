import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

/**
 * Dashboard Page Component
 *
 * This is a protected Server Component that displays the main dashboard
 * after successful authentication. It implements the dashboard wireframe
 * from docs/auth-ux-design.md.
 *
 * Features:
 * - Server-side authentication check using NextAuth
 * - Welcome message with user's name
 * - Quick stats cards (empty state for new users)
 * - Getting Started onboarding section
 * - Recent activity section (empty state)
 * - Redirects to /login if not authenticated
 *
 * @see /docs/auth-ux-design.md for wireframe design
 * @see /docs/auth-user-journey.md for user journey mapping
 */
export default async function DashboardPage() {
  // Server-side authentication check
  // getServerSession reads the session from cookies
  // Returns null if user is not authenticated
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  // This is a backup to middleware protection
  if (!session?.user) {
    redirect('/login')
  }

  // Extract user info from session
  const userName = session.user.name || 'User'
  const userEmail = session.user.email

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👋 Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your account today.
          </p>
        </div>

        {/* Quick Stats Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Quick Stats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Card 1: Total Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Total Items
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                0
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                Get started →
              </div>
            </div>

            {/* Stat Card 2: Active Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Active Tasks
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                0
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                Create one →
              </div>
            </div>

            {/* Stat Card 3: Team Members */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Team Members
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                1
              </div>
              <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                Invite more →
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🚀 Getting Started
          </h2>

          <div className="space-y-4">
            {/* Onboarding Card 1: Complete Profile */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Complete your profile
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Add profile picture, bio, and preferences
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Complete Profile →
              </button>
            </div>

            {/* Onboarding Card 2: Create First Project */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Create your first project
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Projects help you organize your work
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm">
                + New Project
              </button>
            </div>

            {/* Onboarding Card 3: Invite Team Members */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Invite team members
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Collaborate with others on your projects
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Send Invites →
              </button>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Recent Activity
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-2">
              No recent activity yet.
            </p>
            <p className="text-gray-600 text-sm">
              Start by creating your first project!
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
