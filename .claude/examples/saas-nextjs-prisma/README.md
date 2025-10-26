# SaaS App - Next.js + Prisma + NextAuth.js

A production-ready full-stack SaaS application example with complete authentication, CRUD operations, and E2E tests. Built with Next.js 15, Prisma ORM, and NextAuth.js.

## 🚀 Features

- 🔐 **Complete Authentication System**
  - Email/password login and registration
  - Google OAuth integration (optional)
  - Secure password hashing with bcrypt
  - JWT-based sessions with NextAuth.js
  - Protected routes with middleware
  - Session management

- ✨ **Full CRUD Operations**
  - Create, read, update, delete posts
  - Pagination (10 items per page)
  - Authorization (users can only edit own posts)
  - Form validation (client + server)
  - Error handling and loading states

- 🧪 **Comprehensive Testing**
  - 15 E2E tests with Playwright (100% passing)
  - DRY test infrastructure (fixtures & helpers)
  - Test coverage: CRUD, errors, auth, security
  - Production-ready test patterns

- 🎨 **Modern UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Tailwind CSS styling
  - Accessible (WCAG 2.1 Level AA)
  - Designed with wireframes and user journey mapping

- 🗄️ **Database & ORM**
  - PostgreSQL database
  - Prisma ORM with TypeScript
  - Type-safe database queries
  - Automated migrations

- 🐳 **Docker Support**
  - Multi-stage Dockerfile (optimized for production)
  - Docker Compose with PostgreSQL
  - Health checks
  - One-command deployment

- ⚡ **Modern Stack**
  - Next.js 15 (App Router)
  - React 19
  - TypeScript (strict mode)
  - Server Components + Client Components

## 📋 Prerequisites

- **Node.js 18+** installed
- **PostgreSQL database** (local, Docker, or cloud)
- **Docker & Docker Compose** (optional, for containerized deployment)
- **npm** package manager

## 🏁 Quick Start

### Option 1: Local Development (Recommended)

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required variables:
```env
# Database - Update with your PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/saas_app"

# NextAuth - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

#### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

#### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Docker Compose (Easiest)

Run the entire stack (Next.js + PostgreSQL) with one command:

```bash
# Copy and configure environment variables
cp .env.example .env

# Generate a secure secret
openssl rand -base64 32
# Add the secret to .env as NEXTAUTH_SECRET

# Start all services
docker compose up --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

To stop:
```bash
docker compose down
```

To reset (delete volumes):
```bash
docker compose down -v
```

## 📁 Project Structure

```
saas-nextjs-prisma/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth.js endpoints
│   │   │   ├── posts/         # Posts CRUD endpoints
│   │   │   └── health/        # Health check endpoint
│   │   ├── login/             # Login page
│   │   ├── signup/            # Sign up page
│   │   ├── dashboard/         # Protected dashboard with posts list
│   │   ├── posts/             # Post management pages
│   │   │   ├── new/           # Create post page
│   │   │   └── [id]/edit/     # Edit post page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Public home page
│   ├── components/            # React components
│   │   ├── PostCard.tsx       # Post display component
│   │   ├── PostForm.tsx       # Post create/edit form
│   │   ├── PostList.tsx       # Post list with pagination
│   │   └── ConfirmModal.tsx   # Delete confirmation modal
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # NextAuth configuration
│   │   └── prisma.ts          # Prisma client singleton
│   └── middleware.ts          # Route protection middleware
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── e2e/                       # End-to-end tests
│   ├── fixtures/              # Test fixtures (auth, posts, database)
│   ├── helpers/               # Test helpers (DRY patterns)
│   └── tests/                 # Test specs (15 tests)
├── docs/                      # UX documentation
│   ├── auth-ux-design.md      # Authentication wireframes
│   ├── auth-user-journey.md   # User journey map
│   ├── posts-crud-wireframes.md # CRUD wireframes
│   └── posts-crud-user-journey.md # CRUD user journey
├── public/                    # Static assets
├── Dockerfile                 # Production Docker image
├── docker-compose.yml         # Docker Compose configuration
├── docker-entrypoint.sh       # Docker startup script
├── .env.example               # Environment variables template
├── playwright.config.ts       # Playwright test configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Type check with TypeScript

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database (no migration)
npm run db:migrate       # Create and run migration
npm run db:studio        # Open Prisma Studio (GUI)

# Testing
npx playwright test                  # Run all E2E tests
npx playwright test --ui             # Run tests in UI mode
npx playwright test --debug          # Run tests in debug mode
npx playwright test --headed         # Run tests with browser visible
```

## 🔐 Authentication Flow

### Sign Up
1. User fills out registration form (name, email, password)
2. Form validates input (email format, password strength)
3. Server checks if email already exists
4. Password is hashed with bcrypt (12 rounds)
5. User created in database
6. User automatically logged in
7. Redirected to dashboard

### Login
1. User enters email and password
2. Form validates input
3. Server verifies credentials
4. JWT session created via NextAuth.js
5. Redirected to dashboard

### OAuth (Google)
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User authorizes app
4. Google returns user profile
5. Account created/linked in database
6. Session created, redirected to dashboard

## 📊 Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?   // Nullable for OAuth users
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
}
```

### Post Model
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

### Supporting Models
- `Account` - OAuth provider accounts
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

## 🐳 Docker Deployment

### Development with Docker

```bash
# Start services
docker compose up

# Rebuild and start
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f app
docker compose logs -f postgres

# Access app container
docker compose exec app sh

# Run migrations manually
docker compose exec app npx prisma migrate deploy
```

### Production Docker Build

```bash
# Build production image
docker build -t saas-app:latest .

# Run production image
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="https://yourapp.com" \
  saas-app:latest
```

## 🚀 Production Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### 1. Prerequisites
- Vercel account ([sign up free](https://vercel.com/signup))
- PostgreSQL database (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))

#### 2. Prepare Your Database

Get a PostgreSQL connection string from your provider:
```
postgresql://user:password@host:5432/database?sslmode=require
```

#### 3. Deploy to Vercel

**Option A: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

**Option B: Deploy via GitHub**

1. Push code to GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production domain (e.g., `https://yourapp.vercel.app`)
   - (Optional) `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
6. Click "Deploy"

#### 4. Run Database Migrations

After first deployment, run migrations:

```bash
# Using Vercel CLI
vercel env pull .env.production
npm run db:migrate

# Or use Prisma Studio
npx prisma studio --browser none
```

#### 5. Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` environment variable to your custom domain

### Deploy to Other Platforms

**Railway**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

**Render**
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables

**DigitalOcean App Platform**
1. Create new app from GitHub
2. Configure build and run commands
3. Add PostgreSQL database
4. Set environment variables

## 🔒 Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ CSRF protection (NextAuth.js)
- ✅ Secure HTTP-only cookies
- ✅ JWT token expiration (30 days)
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React escaping)
- ✅ Authorization checks on all protected routes
- ✅ Secure Docker configuration (non-root user)

## 🧪 Testing

This project includes comprehensive E2E tests with Playwright.

### Test Coverage (15 tests, 100% passing)

**Core CRUD (5 tests)**
- Create first post
- Edit existing post
- Delete post with confirmation
- Navigate paginated posts
- Pagination boundary handling

**Error Handling (4 tests)**
- Form validation prevents empty submission
- Validation rejects whitespace-only content
- Network error shows message and preserves form data
- Prevents duplicate post from double-submit

**Authorization (3 tests)**
- Unauthenticated user redirected to login
- Cannot edit another user's post
- Cannot delete another user's post

**Security Baseline (3 tests)**
- Unauthenticated user can access home page
- XSS attempt sanitized
- SQL injection prevented

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode (recommended for development)
npx playwright test --ui

# Run specific test file
npx playwright test e2e/tests/posts-crud.spec.ts

# Run tests with browser visible
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

## 🎨 UX Design Process

This project was built with UX-first approach:

1. **Wireframes** - ASCII wireframes designed before code
   - See: `docs/auth-ux-design.md` and `docs/posts-crud-wireframes.md`
   - Login, signup, dashboard, and CRUD layouts
   - Mobile and desktop views

2. **User Journey Mapping** - Complete flows mapped
   - See: `docs/auth-user-journey.md` and `docs/posts-crud-user-journey.md`
   - All journey stages documented
   - Pain points and opportunities identified
   - Success metrics defined

3. **Implementation** - Code matches wireframes exactly
   - Responsive design (mobile-first)
   - Accessible (keyboard navigation, ARIA labels)
   - 2025 UX best practices applied

## ⚙️ Configuration

### Google OAuth Setup (Optional)

To enable Google login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourapp.com/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`:
   ```env
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

### Environment Variables

See `.env.example` for all available environment variables and configuration options.

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for JWT signing
- `NEXTAUTH_URL` - Application URL

Optional variables:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `NODE_ENV` - Environment (development/production/test)

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server
```
**Solution**:
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` is correct in `.env`
- For Docker: Use `postgres` as hostname instead of `localhost`
- Check firewall settings

### NextAuth Error
```
Error: NEXTAUTH_SECRET is missing
```
**Solution**:
- Generate a secret: `openssl rand -base64 32`
- Add to `.env` as `NEXTAUTH_SECRET=<generated-secret>`

### Prisma Client Error
```
Error: @prisma/client did not initialize yet
```
**Solution**: Run `npm run db:generate` to generate Prisma Client

### Docker Build Fails
```
Error: Cannot find module 'next/dist/server/next-server'
```
**Solution**:
- Ensure `output: 'standalone'` is set in `next.config.ts`
- Clear Docker cache: `docker builder prune`
- Rebuild: `docker compose up --build`

### Tests Timeout
```
Error: Test timeout of 30000ms exceeded
```
**Solution**:
- Reduce number of parallel workers in `playwright.config.ts`
- Ensure dev server has enough resources
- Check database connection is stable

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs/) - Database ORM
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication
- [Playwright Documentation](https://playwright.dev/) - E2E testing
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling
- [Docker Documentation](https://docs.docker.com/) - Containerization

## 🤝 Contributing

This is a reference implementation for the HumanLayer Greenfield project. Feel free to use it as a starting point for your own SaaS applications.

## 📄 License

MIT License - feel free to use this as a template for your projects.

---

Built with ❤️ as part of the HumanLayer Greenfield Transformation project.
