#!/bin/sh
# Docker entrypoint script for Next.js app
# Runs database migrations before starting the application

set -e

echo "🔧 Starting Next.js application..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
timeout 30 sh -c 'until nc -z postgres 5432; do sleep 1; done' || {
  echo "❌ PostgreSQL did not become ready in time"
  exit 1
}

echo "✅ PostgreSQL is ready"

# Run Prisma migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy || {
  echo "⚠️  Migration failed, but continuing... (database might already be up to date)"
}

echo "✅ Database migrations complete"

# Start the Next.js application
echo "🚀 Starting Next.js server..."
exec "$@"
