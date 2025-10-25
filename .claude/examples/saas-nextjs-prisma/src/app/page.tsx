import Link from 'next/link'

/**
 * Home Page Component
 *
 * This is the landing page of the application.
 * Shows:
 * - Welcome message
 * - Links to sign up and log in
 * - Brief description of the app
 *
 * @returns Landing page with authentication links
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-2xl">
        {/* Logo / Brand */}
        <div className="text-center sm:text-left w-full">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to SaaS App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A full-stack authentication example built with Next.js 15, Prisma, and NextAuth.js
          </p>
        </div>

        {/* Features List */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔐 Secure authentication with NextAuth.js</li>
            <li>📧 Email/password and OAuth (Google) login</li>
            <li>🗄️ PostgreSQL database with Prisma ORM</li>
            <li>🎨 Modern UI with Tailwind CSS</li>
            <li>📱 Fully responsive design</li>
            <li>♿ Accessible and keyboard-navigable</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row w-full">
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium transition-colors w-full sm:w-auto text-center"
          >
            Get Started →
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 text-lg font-medium transition-colors w-full sm:w-auto text-center"
          >
            Sign In
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left w-full">
          <p>
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>
          Built with Next.js 15, Prisma, and NextAuth.js
        </p>
      </footer>
    </div>
  )
}
