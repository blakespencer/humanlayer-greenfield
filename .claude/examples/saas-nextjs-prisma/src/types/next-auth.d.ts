import 'next-auth'
import 'next-auth/jwt'

/**
 * Type Extensions for NextAuth.js
 *
 * This file extends the default NextAuth types to include custom fields
 * that we add to the session and JWT token.
 *
 * Without these extensions, TypeScript will complain when we try to
 * access custom fields like `session.user.id` or `token.id`.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module 'next-auth' {
  /**
   * Extend the default Session interface
   * Adds custom fields to the session.user object
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  /**
   * Extend the default User interface
   * Adds custom fields to the user object returned by database
   */
  interface User {
    id: string
    name?: string | null
    email: string
    emailVerified?: Date | null
    image?: string | null
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the default JWT interface
   * Adds custom fields to the JWT token
   */
  interface JWT {
    id: string
    email?: string | null
  }
}
