'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * Providers Component
 *
 * Client Component wrapper that provides NextAuth session context
 * to all child components. This enables the use of useSession() hook
 * throughout the app for client-side authentication state.
 *
 * Why a separate Providers component?
 * - SessionProvider must be a Client Component ('use client')
 * - Root layout should be a Server Component for better performance
 * - This pattern separates concerns and follows Next.js 15 best practices
 *
 * @param children - React nodes to wrap with session provider
 *
 * @see https://next-auth.js.org/getting-started/client#sessionprovider
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
