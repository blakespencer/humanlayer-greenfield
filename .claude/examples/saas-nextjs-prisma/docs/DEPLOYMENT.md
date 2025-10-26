# Production Deployment Guide

This guide covers deploying the SaaS Next.js application to production platforms.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deploy to Vercel](#deploy-to-vercel-recommended)
- [Deploy to Railway](#deploy-to-railway)
- [Deploy to Render](#deploy-to-render)
- [Deploy to DigitalOcean](#deploy-to-digitalocean-app-platform)
- [Deploy with Docker](#deploy-with-docker)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, ensure you have:

### 1. Environment Variables

Generate secure values for production:

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Save this value - you'll need it for NEXTAUTH_SECRET
```

Required environment variables:
- ✅ `DATABASE_URL` - Production PostgreSQL connection string
- ✅ `NEXTAUTH_SECRET` - Secure random string (32+ characters)
- ✅ `NEXTAUTH_URL` - Your production domain (e.g., `https://yourapp.com`)
- ⚠️ `GOOGLE_CLIENT_ID` - (Optional) Google OAuth credentials
- ⚠️ `GOOGLE_CLIENT_SECRET` - (Optional) Google OAuth credentials

### 2. Database

- ✅ PostgreSQL database provisioned (version 14+)
- ✅ Database connection string obtained
- ✅ SSL/TLS enabled (add `?sslmode=require` to connection string)
- ✅ Database accessible from deployment platform

### 3. OAuth Configuration (If using Google OAuth)

- ✅ Google Cloud project created
- ✅ OAuth credentials created
- ✅ Production callback URL added:
  - `https://yourapp.com/api/auth/callback/google`
- ✅ Client ID and Secret saved securely

### 4. Code Preparation

```bash
# Run tests
npx playwright test

# Build locally to verify
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

All checks should pass before deploying.

---

## Deploy to Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

### Why Vercel?

- ✅ Zero configuration for Next.js
- ✅ Automatic deployments from Git
- ✅ Edge network (fast globally)
- ✅ Free SSL certificates
- ✅ Generous free tier
- ✅ Built by Next.js creators

### Deployment Steps

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: prepare for production deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Configure project:
     - **Framework Preset**: Next.js (auto-detected)
     - **Root Directory**: `.` (or path to saas-nextjs-prisma)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)

3. **Configure Environment Variables**

   Add these in Vercel dashboard:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `DATABASE_URL` | `postgresql://user:pass@host:5432/db?sslmode=require` | Your PostgreSQL connection string |
   | `NEXTAUTH_SECRET` | `<generated-secret>` | From `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | `https://yourapp.vercel.app` | Your Vercel domain (or custom domain) |
   | `GOOGLE_CLIENT_ID` | `<your-client-id>` | Optional - Google OAuth |
   | `GOOGLE_CLIENT_SECRET` | `<your-client-secret>` | Optional - Google OAuth |

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Vercel will provide a URL: `https://yourapp.vercel.app`

5. **Run Database Migrations**

   After first deployment:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Link to your project
   vercel link

   # Pull environment variables
   vercel env pull .env.production

   # Run migrations
   npm run db:migrate
   ```

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

### Custom Domain Setup

1. **Add Domain**
   - Go to Project Settings → Domains
   - Click "Add"
   - Enter your domain: `yourapp.com`

2. **Configure DNS**

   Add these DNS records at your domain provider:

   For `yourapp.com`:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   For `www.yourapp.com`:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Update Environment Variables**
   - Update `NEXTAUTH_URL` to `https://yourapp.com`
   - Update Google OAuth callback URL to `https://yourapp.com/api/auth/callback/google`

4. **Redeploy**
   - Vercel will auto-deploy after env variable changes
   - Or manually: `vercel --prod`

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Commits to `main` branch → `https://yourapp.com`
- **Preview**: Pull requests → `https://yourapp-<hash>.vercel.app`

This enables:
- Test changes before merging
- Share preview links with team
- Rollback to previous deployments easily

---

## Deploy to Railway

Railway offers simple deployment with built-in PostgreSQL.

### Steps

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd saas-nextjs-prisma
   railway init
   ```

4. **Add PostgreSQL**
   ```bash
   railway add postgresql
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set NEXTAUTH_SECRET="<your-secret>"
   railway variables set NEXTAUTH_URL="https://yourapp.up.railway.app"
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Get DATABASE_URL**
   ```bash
   railway variables
   # DATABASE_URL is automatically set by Railway
   ```

8. **Run Migrations**
   ```bash
   railway run npm run db:migrate
   ```

### Custom Domain

1. Go to Railway dashboard
2. Click on your project → Settings
3. Add custom domain
4. Configure DNS as instructed
5. Update `NEXTAUTH_URL` to custom domain

---

## Deploy to Render

Render provides free tier with PostgreSQL.

### Steps

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Dashboard → New → PostgreSQL
   - Choose free tier
   - Note the connection string

3. **Create Web Service**
   - Dashboard → New → Web Service
   - Connect GitHub repository
   - Configure:
     - **Name**: saas-nextjs-prisma
     - **Environment**: Node
     - **Build Command**: `npm install && npm run db:generate && npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Add Environment Variables**

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | (from Render PostgreSQL) |
   | `NEXTAUTH_SECRET` | `<your-secret>` |
   | `NEXTAUTH_URL` | `https://yourapp.onrender.com` |
   | `NODE_ENV` | `production` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build (5-10 minutes for free tier)

6. **Run Migrations**
   ```bash
   # Connect to Render shell
   # Or run locally with production DATABASE_URL
   npm run db:migrate
   ```

### Notes

- Free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Upgrade to paid tier for always-on service

---

## Deploy to DigitalOcean App Platform

DigitalOcean offers straightforward deployment with managed databases.

### Steps

1. **Create Account**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Sign up (get $200 credit with GitHub Student Pack)

2. **Create PostgreSQL Database**
   - Create → Databases → PostgreSQL
   - Choose plan (starts at $15/month)
   - Select region
   - Note connection details

3. **Create App**
   - Create → Apps
   - Connect GitHub repository
   - Configure:
     - **Branch**: main
     - **Source Directory**: (root or path to app)
     - **Build Command**: `npm install && npm run build`
     - **Run Command**: `npm start`

4. **Add Environment Variables**

   In app settings → Environment Variables:

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | `${db.DATABASE_URL}` (use database connection) |
   | `NEXTAUTH_SECRET` | `<your-secret>` |
   | `NEXTAUTH_URL` | `https://yourapp.ondigitalocean.app` |

5. **Deploy**
   - Click "Save" → "Deploy"
   - Wait for build

6. **Run Migrations**
   ```bash
   # Install doctl CLI
   brew install doctl

   # Authenticate
   doctl auth init

   # Get app ID
   doctl apps list

   # Create console session
   doctl apps create-deployment <app-id>

   # Or run locally with production DATABASE_URL
   npm run db:migrate
   ```

---

## Deploy with Docker

Deploy the Docker image to any container hosting platform.

### Build Production Image

```bash
# Build image
docker build -t saas-app:latest .

# Test locally
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  saas-app:latest
```

### Deploy to AWS ECS

1. **Push to ECR**
   ```bash
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

   # Tag image
   docker tag saas-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/saas-app:latest

   # Push
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/saas-app:latest
   ```

2. **Create ECS Task**
   - Use Fargate or EC2
   - Configure environment variables
   - Set up load balancer

### Deploy to Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/<project-id>/saas-app

# Deploy
gcloud run deploy saas-app \
  --image gcr.io/<project-id>/saas-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="..." \
  --set-env-vars NEXTAUTH_SECRET="..." \
  --set-env-vars NEXTAUTH_URL="https://saas-app-xyz.run.app"
```

---

## Database Setup

### Recommended Providers

**Neon** (Recommended for Vercel)
- Serverless PostgreSQL
- Free tier: 0.5 GB storage
- Automatic scaling
- Built-in connection pooling
- [neon.tech](https://neon.tech)

**Supabase**
- Free tier: 500 MB storage
- Built-in auth (can integrate with NextAuth)
- Real-time subscriptions
- [supabase.com](https://supabase.com)

**Railway**
- Simple PostgreSQL
- Free tier: 100 MB storage
- Integrated with Railway apps
- [railway.app](https://railway.app)

**AWS RDS**
- Production-grade PostgreSQL
- Starts at $15/month (db.t3.micro)
- Automatic backups
- High availability options

### Connection String Format

```
postgresql://username:password@host:port/database?sslmode=require
```

Example:
```
postgresql://myuser:mypassword@db.example.com:5432/mydb?sslmode=require
```

### SSL/TLS Configuration

Always use SSL in production:
- Add `?sslmode=require` to connection string
- Most managed databases enforce SSL by default

---

## Post-Deployment

### 1. Run Database Migrations

```bash
# Option 1: Using Vercel CLI
vercel env pull .env.production
npm run db:migrate

# Option 2: Using Prisma Studio
npx prisma studio --browser none
```

### 2. Verify Deployment

Check these endpoints:
- ✅ Home page: `https://yourapp.com/`
- ✅ Login: `https://yourapp.com/login`
- ✅ Signup: `https://yourapp.com/signup`
- ✅ Health check: `https://yourapp.com/api/health`

Expected health check response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-26T...",
  "database": "connected"
}
```

### 3. Test Core Functionality

1. Create account
2. Login
3. Create a post
4. Edit post
5. Delete post
6. Logout

### 4. Configure Monitoring

**Vercel**
- Built-in Analytics (free)
- Web Vitals tracking
- Error tracking

**External Monitoring** (Optional)
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://www.datadoghq.com) - Full-stack monitoring

---

## Monitoring & Maintenance

### Health Checks

Monitor the health endpoint:
```bash
curl https://yourapp.com/api/health
```

Set up automated checks:
- [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
- [Pingdom](https://www.pingdom.com) - Uptime and performance
- [Better Uptime](https://betteruptime.com) - Modern monitoring

### Database Backups

**Vercel/Neon**: Automatic daily backups included

**Self-hosted**:
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

Schedule automated backups:
- Daily full backups
- Weekly snapshots
- Retain for 30 days

### Log Monitoring

**Vercel Logs**:
```bash
vercel logs <deployment-url> --follow
```

**Application Logs**:
- Check for 500 errors
- Monitor slow queries
- Track auth failures

### Performance Monitoring

Monitor:
- Response times (target: <200ms)
- Database query performance
- API endpoint latency
- Core Web Vitals (LCP, FID, CLS)

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```
Error: Cannot find module '@/lib/auth'
```

**Solution**: Check TypeScript paths in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Database Connection Fails

**Error: Can't reach database server**

**Solution**:
1. Verify DATABASE_URL is correct
2. Check SSL mode: `?sslmode=require`
3. Ensure database allows connections from deployment platform
4. Check firewall rules

### NextAuth Error

**Error: NEXTAUTH_URL doesn't match**

**Solution**:
- Development: `http://localhost:3000`
- Production: `https://yourapp.com` (no trailing slash)
- Update environment variable and redeploy

### OAuth Callback Error

**Error: Redirect URI mismatch**

**Solution**:
1. Go to Google Cloud Console
2. Add production callback URL:
   - `https://yourapp.com/api/auth/callback/google`
3. Wait 5 minutes for changes to propagate
4. Clear browser cache and try again

### Prisma Client Error

**Error: Prisma Client not initialized**

**Solution**: Ensure build command includes:
```bash
npm run db:generate && npm run build
```

### Memory Issues

**Error: JavaScript heap out of memory**

**Solution**:
1. Increase Node memory in build command:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```
2. Or upgrade to larger instance size

---

## Security Checklist

Before going live:

- ✅ HTTPS enabled (automatic on most platforms)
- ✅ NEXTAUTH_SECRET is secure (32+ characters)
- ✅ Database connection uses SSL
- ✅ OAuth redirect URIs are correct
- ✅ CORS configured (if using separate frontend)
- ✅ Rate limiting enabled (consider Vercel Edge Config)
- ✅ Input validation on all forms
- ✅ SQL injection protection (Prisma provides this)
- ✅ XSS protection (React provides this)
- ✅ CSP headers configured (optional)

---

## Scaling Considerations

### Database

When you reach:
- **1,000 users**: Consider connection pooling (PgBouncer)
- **10,000 users**: Upgrade to larger database instance
- **100,000 users**: Consider read replicas

### Application

- **Vercel**: Auto-scales automatically (edge functions)
- **Docker**: Use container orchestration (Kubernetes, ECS)
- **Load balancing**: Use platform load balancer or Cloudflare

### Caching

Add caching layer:
- **Redis**: For session storage, API caching
- **Vercel Edge**: For static and dynamic content
- **CDN**: For static assets (images, JS, CSS)

---

## Cost Estimates

### Hobby/MVP (0-1,000 users)

- **Vercel**: Free (hobby plan)
- **Neon Database**: Free (0.5 GB)
- **Total**: $0/month

### Small Business (1,000-10,000 users)

- **Vercel**: $20/month (Pro plan)
- **Neon Database**: $19/month (Launch plan)
- **Total**: $39/month

### Growing Business (10,000-100,000 users)

- **Vercel**: $20-40/month
- **Database**: $50-200/month (AWS RDS or similar)
- **Monitoring**: $25/month (Sentry, Datadog)
- **Total**: $95-265/month

---

## Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Prisma Production Checklist](https://www.prisma.io/docs/guides/performance-and-optimization/production-checklist)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

**Questions or Issues?**

Check the main README.md troubleshooting section or create an issue in the repository.
