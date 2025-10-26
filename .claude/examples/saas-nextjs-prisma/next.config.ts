import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable standalone output for Docker deployment
  // This creates a minimal standalone server that includes only necessary files
  output: 'standalone',
}

export default nextConfig
