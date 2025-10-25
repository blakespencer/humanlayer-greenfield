import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcryptjs'
import { prisma } from './prisma'

/**
 * NextAuth.js Configuration
 *
 * This file configures authentication for the application including:
 * - Database adapter (Prisma)
 * - Authentication providers (Email/Password, Google OAuth)
 * - Session strategy (JWT)
 * - Callbacks for customizing behavior
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter for database sessions
  adapter: PrismaAdapter(prisma),

  // Use JWT for sessions (stateless, faster than database sessions)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Configure authentication pages
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login', // Redirect to login on error
    // verifyRequest: '/verify-email', // Email verification page (optional)
    newUser: '/dashboard', // Redirect new users to dashboard
  },

  // Authentication providers
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // Check if user exists and has a password (not OAuth-only)
        if (!user || !user.password) {
          throw new Error('Invalid email or password')
        }

        // Verify password
        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        // Return user object (will be stored in JWT)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),

    // Google OAuth provider (optional)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true, // Allow linking Google account to existing email
    }),
  ],

  // Callbacks to customize behavior
  callbacks: {
    /**
     * JWT Callback
     * Called whenever a JWT is created or updated
     * Add custom fields to the JWT here
     */
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id
      }

      // OAuth sign in
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },

    /**
     * Session Callback
     * Called whenever session is checked
     * Add custom fields to the session here
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },

    /**
     * Redirect Callback
     * Called anytime the user is redirected
     * Useful for customizing redirect logic
     */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  // Events for logging and analytics
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('User signed in:', user.email)
      if (isNewUser) {
        console.log('New user created:', user.email)
      }
    },
    async signOut({ session }) {
      console.log('User signed out')
    },
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
}
