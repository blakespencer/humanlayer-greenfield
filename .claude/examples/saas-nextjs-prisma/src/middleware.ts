import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

/**
 * Middleware for Route Protection
 *
 * This middleware protects routes from unauthenticated access.
 * It uses NextAuth's withAuth wrapper to check authentication status.
 *
 * How it works:
 * 1. Runs on every request that matches the matcher config
 * 2. Checks if user has a valid session token
 * 3. If authenticated: allows request to proceed
 * 4. If not authenticated: redirects to login page
 *
 * Protected Routes:
 * - /dashboard - Main dashboard (requires auth)
 * - /profile - User profile page (requires auth)
 * - /settings - Settings page (requires auth)
 * - /projects - Projects page (requires auth)
 * - /usage - Usage stats page (requires auth)
 *
 * Public Routes (not protected):
 * - / - Home page
 * - /login - Login page
 * - /signup - Registration page
 * - /api/auth/* - NextAuth API routes
 * - /api/auth/signup - Custom signup endpoint
 *
 * Architecture Notes:
 * - Uses NextAuth's getToken() to verify JWT session
 * - Runs at the edge for fast authentication checks
 * - Prevents unauthorized access before page loads
 * - Works alongside server-side checks in components
 *
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 */

export default withAuth(
  // This function runs if user is authenticated
  function middleware(req) {
    // User is authenticated, allow request to proceed
    return NextResponse.next()
  },
  {
    callbacks: {
      /**
       * Authorized Callback
       *
       * This callback determines if the request should be allowed to proceed.
       * Returns true if user should have access, false otherwise.
       *
       * @param token - The JWT token from the session (null if not authenticated)
       * @returns boolean - true to allow access, false to redirect to login
       */
      authorized: ({ token }) => {
        // If token exists, user is authenticated
        // If token is null, user is not authenticated
        return !!token
      },
    },
    pages: {
      // Redirect unauthenticated users to login page
      signIn: '/login',
    },
  }
)

/**
 * Matcher Configuration
 *
 * Defines which routes this middleware should run on.
 * Uses explicit path matching for clarity and correctness.
 *
 * Protected paths (require authentication):
 * - /dashboard/:path* - Dashboard and all sub-routes
 * - /profile/:path* - Profile and all sub-routes
 * - /settings/:path* - Settings and all sub-routes
 * - /projects/:path* - Projects and all sub-routes
 * - /usage/:path* - Usage and all sub-routes
 *
 * Public paths (not matched by this middleware):
 * - / - Home page
 * - /login - Login page
 * - /signup - Signup page
 * - /api/auth/* - NextAuth API routes
 * - /_next/* - Next.js internal routes
 * - /favicon.ico - Favicon
 *
 * Using explicit matchers prevents regex edge cases and makes the
 * protected routes crystal clear.
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/projects/:path*',
    '/usage/:path*',
  ],
}
