import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'

/**
 * Root Layout Component
 *
 * This is the root layout for the entire application.
 * It wraps all pages and provides:
 * - Global styles (globals.css with Tailwind)
 * - HTML structure
 * - Metadata for SEO
 * - NextAuth session provider (via Providers component)
 * - Navigation header (via Navbar component)
 *
 * Architecture:
 * - This remains a Server Component for performance
 * - Providers wraps children with SessionProvider (Client Component)
 * - Navbar uses useSession hook for client-side auth state
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */

export const metadata: Metadata = {
  title: 'SaaS App - Next.js + Prisma Example',
  description: 'A full-stack SaaS application with authentication, built with Next.js 15, Prisma, and NextAuth.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
