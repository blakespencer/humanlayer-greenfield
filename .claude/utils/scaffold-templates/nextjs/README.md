# Next.js 15 + TypeScript Template

Full-stack React framework with Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes.

## Initialization

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

## What's Included

- ✅ Next.js 15 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS for styling
- ✅ `src/` directory structure
- ✅ ESLint configuration
- ✅ Hot reload development server

## Project Structure

```
nextjs-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── api/              # API routes
│   ├── components/           # Reusable components
│   ├── lib/                  # Utility functions
│   └── styles/               # Global styles
├── public/                   # Static assets
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Auth (example with NextAuth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# API Keys
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

## Recommended Packages

### Data Fetching & State
```bash
npm install @tanstack/react-query axios
npm install swr  # Alternative to react-query
```

### Forms & Validation
```bash
npm install react-hook-form zod @hookform/resolvers
```

### UI Components
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install class-variance-authority clsx tailwind-merge
```

### Auth
```bash
npm install next-auth
```

### Database (if using Next.js as full-stack)
```bash
npm install prisma @prisma/client
npm install -D prisma
```

## Best Practices

1. **Use Server Components** by default (App Router)
2. **Client Components** only when needed (interactivity, hooks)
3. **API Routes** in `src/app/api/` for backend logic
4. **Environment Variables** prefix with `NEXT_PUBLIC_` for client-side access
5. **Image Optimization** use `next/image` component
6. **Metadata** define in layout.tsx or page.tsx
7. **Loading States** use loading.tsx files
8. **Error Handling** use error.tsx files

## Example API Route

```typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Fetch data from database
  const users = await fetchUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  // Create user in database
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}
```

## Testing Setup

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jest-environment-jsdom
```

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [App Router Guide](https://nextjs.org/docs/app)
- [Deployment Guide](https://nextjs.org/docs/deployment)
