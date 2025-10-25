import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
