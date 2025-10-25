'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

/**
 * Navbar Component
 *
 * Main navigation header for the application.
 * Implements the navigation design from docs/auth-ux-design.md.
 *
 * Features:
 * - Logo and app name
 * - Navigation links (Dashboard, Projects, Settings)
 * - User dropdown menu with profile links and sign out
 * - Mobile-responsive hamburger menu
 * - Shows Sign In/Sign Up when not authenticated
 * - Uses NextAuth's useSession for client-side session access
 *
 * This is a Client Component because it needs:
 * - useState for dropdown/menu toggle
 * - useSession for client-side auth state
 * - onClick handlers for interactivity
 *
 * @see /docs/auth-ux-design.md for navigation wireframe
 */
export default function Navbar() {
  // Get session data using NextAuth's useSession hook
  // This hook provides client-side access to the session
  const { data: session, status } = useSession()

  // State for dropdown and mobile menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle sign out
  // signOut() clears the session and redirects to home page
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Section: Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span className="text-2xl">📦</span>
              <span>SaaS App</span>
            </Link>

            {/* Navigation Links (Desktop) - Only show when authenticated */}
            {session && (
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/projects"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Projects
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>

          {/* Right Section: User Menu or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              // Loading state
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              // Authenticated: Show user dropdown
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  {/* User Name (Desktop) */}
                  <span className="hidden md:block text-gray-700 font-medium">
                    {session.user?.name || 'User'}
                  </span>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="font-semibold text-gray-900">
                        {session.user?.name || 'User'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.user?.email}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="mr-2">👤</span>
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="mr-2">⚙️</span>
                        Settings
                      </Link>
                      <Link
                        href="/usage"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="mr-2">📊</span>
                        Usage
                      </Link>
                      <Link
                        href="/help"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="mr-2">❓</span>
                        Help
                      </Link>
                    </div>

                    {/* Sign Out Button */}
                    <div className="border-t border-gray-200 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <span className="mr-2">🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not authenticated: Show Sign In / Sign Up buttons
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button (Hamburger) */}
            {session && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu (slides down when hamburger is clicked) */}
        {isMobileMenuOpen && session && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/projects"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📁 Projects
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ⚙️ Settings
            </Link>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <Link
                href="/help"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ❓ Help
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
