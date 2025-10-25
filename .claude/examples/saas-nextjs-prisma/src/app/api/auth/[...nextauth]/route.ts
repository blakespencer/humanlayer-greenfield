import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * NextAuth.js API Route Handler
 *
 * This file creates the authentication API endpoints:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback
 * - /api/auth/session
 * - etc.
 *
 * All handled automatically by NextAuth.js
 *
 * @see https://next-auth.js.org/configuration/initialization#route-handlers-app
 */

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
