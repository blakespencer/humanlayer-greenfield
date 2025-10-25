import type { Metadata } from 'next'
import './globals.css'

/**
 * Root Layout Component
 *
 * This is the root layout for the entire application.
 * It wraps all pages and provides:
 * - Global styles (globals.css with Tailwind)
 * - HTML structure
 * - Metadata for SEO
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
        {children}
      </body>
    </html>
  )
}
