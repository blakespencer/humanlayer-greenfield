# Cost Calculator Utility

## Purpose
Help users understand the financial implications of tech stack decisions.

## Cost Categories

### Hosting Costs (Monthly Estimates - 2025 Pricing)

**Serverless/PaaS Options**:
- **Vercel**: $20 Pro (for serious apps) or $0 Hobby
- **Netlify**: $0-19/month (Pro for teams)
- **Railway**: $5-20 (usage-based, $5 minimum)
- **Render**: $0-7/month (free tier, then $7/service)
- **Fly.io**: $0-50 (depending on scale, generous free tier)

**Traditional Cloud (More Control)**:
- **AWS**: $50-200 (t3.medium + RDS) - highly variable
- **Digital Ocean**: $12-48 (droplets + managed DB)
- **Linode/Akamai**: $10-40 (similar to DO)
- **Google Cloud Run**: Pay per use (can be $0-100)
- **Azure**: $50-150 (comparable to AWS)

**VPS/Dedicated**:
- **Hetzner**: $5-20 (great EU option)
- **OVH**: $8-30 (Europe-focused)

### Database Costs (Monthly)

**PostgreSQL**:
- **Supabase**: $0 (free tier), $25 (Pro, 8GB)
- **Railway**: $5-20 (usage-based)
- **Neon**: $0 (generous free), $19+ (paid)
- **Digital Ocean Managed**: $15-100
- **AWS RDS**: $15-100 (t3.micro to t3.medium)
- **Self-hosted**: Server costs only ($5-20)

**MongoDB**:
- **MongoDB Atlas**: $0 (M0 free 512MB), $9 (M2 shared 2GB), $57 (M10 dedicated 10GB)
- **Self-hosted**: Server costs only

**DynamoDB/Serverless**:
- **AWS DynamoDB**: Pay per use ($0-1000+ depending on traffic)
- **Google Firestore**: $0-500+ (generous free tier)

**Redis/Caching**:
- **Upstash**: $0 (free tier), $10+ (paid)
- **Redis Cloud**: $0-7 (free 30MB, then paid)
- **Railway Redis**: $5-10

### Developer Tools & Services

**Monitoring & Error Tracking**:
- **Sentry**: $0 (5k events), $26 (50k events), $80 (500k)
- **Datadog**: $15/host/month (free trial)
- **New Relic**: $0-99/month
- **LogRocket**: $0-99/month (session replay)
- **UptimeRobot**: $0 (50 monitors), $7 (unlimited)

**CI/CD**:
- **GitHub Actions**: 2000 min free, then $0.008/min
- **GitLab CI**: 400 min free, then pay per use
- **CircleCI**: 6000 min free, then paid tiers

**Authentication Services**:
- **Auth0**: $0 (7k MAU), $35 (500 MAU), $240 (enterprise)
- **Clerk**: $0 (10k MAU), $25 (unlimited)
- **Supabase Auth**: $0 (included with DB)
- **Firebase Auth**: $0 (generous free tier)

**Email Services**:
- **SendGrid**: $0 (100/day), $15 (40k/month), $90 (100k)
- **Mailgun**: $0 (1k/month), $35 (50k)
- **AWS SES**: $0.10 per 1000 emails
- **Postmark**: $0 (100/month), $15 (10k)

### Hidden/Ancillary Costs

**SSL Certificates**:
- Free with Let's Encrypt (most platforms include this)
- Paid options: $50-200/year (if needed for EV/OV certs)

**CDN**:
- **Cloudflare**: $0 (free tier excellent), $20+ (Pro/Business)
- **BunnyCDN**: $0.01/GB (very affordable)
- **AWS CloudFront**: Pay per use ($0.085/GB)
- Most hosting platforms include CDN free

**Domain Names**:
- $10-15/year (.com, .io, .dev)
- $50-100/year (premium domains)

**Backup/Storage**:
- **AWS S3**: $0.023/GB/month
- **Backblaze B2**: $0.005/GB/month
- Most managed DBs include backups

## Total Cost Estimates by Stack & Stage

### Minimal MVP (Month 1-3) - Validate Idea
**Goal**: $0-10/month, validate product-market fit

**Option 1: Full Serverless**
- Next.js on Vercel Hobby: $0
- PostgreSQL on Supabase free tier: $0
- Auth via Supabase: $0
- Storage on Vercel/Cloudflare: $0
- **Total: $0/month** ✨

**Option 2: Traditional Free Tier**
- Vite+React on Netlify: $0
- FastAPI on Render free: $0
- PostgreSQL on Neon free: $0
- **Total: $0/month** ✨

**Option 3: Minimal Paid**
- Next.js on Vercel Hobby: $0
- PostgreSQL on Railway: $5
- **Total: $5/month**

### Early Traction (First 100-1000 users)
**Goal**: $20-50/month, grow sustainably

**Option 1: Vercel + Railway**
- Next.js on Vercel Pro: $20
- PostgreSQL on Railway: $10
- Redis on Upstash free: $0
- Monitoring (Sentry free): $0
- Email (SendGrid free tier): $0
- **Total: $30/month**

**Option 2: All Railway**
- Frontend on Railway: $5
- Backend on Railway: $5
- PostgreSQL on Railway: $10
- Redis on Railway: $5
- **Total: $25/month**

### Production SaaS (1000-10k users)
**Goal**: $80-150/month, professional setup

**Recommended Stack**:
- Next.js on Vercel Pro: $20
- PostgreSQL on Railway/Neon Pro: $25
- Redis on Upstash: $10
- Monitoring (Sentry): $26
- Email (SendGrid): $15
- Domain + SSL: $1
- Uptime monitoring: $0 (UptimeRobot free)
- **Total: $97/month**

**Alternative (More control)**:
- Digital Ocean Droplet (4GB): $24
- DO Managed PostgreSQL: $15
- Redis on same droplet: $0
- Cloudflare CDN: $0
- Monitoring (self-hosted): $0
- **Total: $39/month** (but more DevOps work)

### High-Traffic API (10k-100k users)
**Goal**: $150-400/month, scales well

**Option 1: Optimized Performance**
- Go/Rust API on Fly.io: $30-60
- PostgreSQL managed (Railway/Neon): $50
- Redis (Upstash): $20
- CDN (Cloudflare): $0-20
- Monitoring (Datadog): $15
- Email: $35
- **Total: $150-200/month**

**Option 2: AWS/Cloud Native**
- AWS ECS (2 containers): $60
- RDS PostgreSQL (t3.medium): $70
- ElastiCache Redis: $15
- CloudWatch: $10
- SES (email): $5
- **Total: $160/month**

### Scale (100k+ users)
**Goal**: $500-2000/month, enterprise-grade

**Typical Breakdown**:
- Application hosting: $200-400
- Database (replicas, backups): $150-300
- Caching layer: $50-100
- Monitoring & logging: $50-150
- CDN & bandwidth: $50-200
- Email & communication: $50-100
- Backup & disaster recovery: $30-50
- **Total: $580-1300/month**

## Decision Impact Matrix

| Choice | Cost Impact | When it Matters | Monthly Difference |
|--------|-------------|-----------------|-------------------|
| Serverless vs Server | 2-3x at scale | After 10k users | $50-150 |
| Managed vs Self-hosted DB | 2-5x difference | Immediate | $10-50 |
| TypeScript vs Go/Rust | Same hosting, 30-50% less compute | At scale (>50k users) | $30-100 savings |
| Vercel vs AWS | 2-5x difference | After free tier exhausted | $50-200 |
| Monolith vs Microservices | 3-5x infrastructure | Always | $100-400 |
| Cloud provider choice | 1-2x difference | Immediate | AWS most expensive, Hetzner cheapest |
| Auth service vs DIY | $0-50/month | Security matters | $25 average |

## Cost Optimization Strategies

### Early Stage (Pre-PMF)
1. **Maximize free tiers**: Vercel + Supabase = $0
2. **Use serverless**: Pay only for what you use
3. **Avoid paid monitoring**: Use free tiers (Sentry 5k events)
4. **Single region**: Don't over-engineer for global scale yet
5. **Shared resources**: One database for everything

### Growth Stage
1. **Optimize before scaling**: Profile and fix inefficiencies
2. **Use CDN aggressively**: Reduce server load (Cloudflare free)
3. **Right-size databases**: Don't over-provision
4. **Consider PostgreSQL over MongoDB**: Usually cheaper at scale
5. **Batch operations**: Reduce API call costs

### Scale Stage
1. **Reserved instances**: 40-60% savings on AWS/GCP
2. **Caching layer**: Redis can reduce DB costs 10x
3. **Auto-scaling**: Only pay for what you need
4. **CDN for static assets**: Massively reduce bandwidth costs
5. **Monitor costs**: Set up billing alerts

## Regional Cost Considerations

### US/North America
- **Best for**: Global reach, most provider options
- **Typical costs**: Baseline (100%)
- **Top choices**: Vercel, AWS, Railway, Fly.io

### Europe
- **Best for**: GDPR compliance, EU customers
- **Typical costs**: 90-110% of US (Hetzner cheaper!)
- **Top choices**: Hetzner, Railway EU, Fly.io EU, Render

### Asia-Pacific
- **Best for**: Asian markets
- **Typical costs**: 110-130% of US
- **Top choices**: AWS Singapore, GCP Tokyo, Alibaba Cloud

## Break-Even Analysis

### When to Switch from Free Tier

**Vercel Hobby → Pro ($20/month)**
- Switch at: 100 GB bandwidth, need staging environments, team collaboration
- Worth it if: Saving >2 hours/month on deployment workflow

**Supabase Free → Pro ($25/month)**
- Switch at: 500MB database, 2GB bandwidth, need daily backups
- Worth it if: Database >500MB or need point-in-time recovery

**Railway Hobby → Developer ($5/month)**
- Switch at: Need more than 512MB RAM or $5 execution time
- Worth it if: Actually using the service regularly

### When to Self-Host

**Self-hosting makes sense when**:
- Monthly costs >$200 on managed services
- You have DevOps expertise in-house
- Very predictable, steady traffic
- Cost savings >$100/month (worth the complexity)

**Self-hosting is premature when**:
- Team <5 developers
- Pre-PMF or early traction stage
- No dedicated DevOps person
- Managed service costs <$100/month

## Cost by Tech Stack (Production SaaS Level)

### Next.js + PostgreSQL
- Hosting: $20 (Vercel)
- Database: $25 (Railway/Neon)
- Redis: $10
- Monitoring: $26
- **Total: $81/month**

### Vite+React + NestJS + PostgreSQL
- Frontend: $0 (Netlify)
- Backend: $20 (Railway 2GB)
- Database: $25
- Redis: $10
- Monitoring: $26
- **Total: $81/month**

### Vite+React + Go/Gin + PostgreSQL
- Frontend: $0 (Netlify)
- Backend: $10 (Fly.io, smaller instance)
- Database: $25
- Redis: $10
- Monitoring: $15 (simpler stack)
- **Total: $60/month** (20-30% cheaper due to Go efficiency)

### Next.js + Python/FastAPI + PostgreSQL
- Frontend: $20 (Vercel)
- Backend: $20 (Railway)
- Database: $25
- Redis: $10
- Monitoring: $26
- **Total: $101/month**

### Rust + PostgreSQL (API-only)
- Backend: $10 (Fly.io, very small instance)
- Database: $25
- Redis: $10
- Monitoring: $15
- **Total: $60/month** (most efficient runtime)

## Quick Reference: Monthly Costs Summary

| Stage | Users | Bare Minimum | Recommended | Premium |
|-------|-------|--------------|-------------|---------|
| MVP | 0-100 | $0 | $5-30 | $50 |
| Early Traction | 100-1k | $5-25 | $30-80 | $100 |
| Production | 1k-10k | $30-80 | $80-150 | $300 |
| Scale | 10k-100k | $150-300 | $300-600 | $1000 |
| Enterprise | 100k+ | $500+ | $1000-2000 | $5000+ |

## Cost Questions to Ask User

Use these to understand cost constraints and make recommendations:

1. **Budget constraints**: What's your monthly hosting budget for the MVP? ($0, $50, $100, $500+)
2. **Growth expectations**: When do you expect to reach 1,000 users? (1 month, 6 months, 12 months)
3. **Cost sensitivity**: Are you optimizing for lowest cost or developer velocity?
4. **Existing cloud credits**: Do you have AWS/GCP/Azure credits? (Common for startups)
5. **DevOps capacity**: Can you manage infrastructure or need fully managed?

## Integration with Tech Selection

When presenting tech stack options, include cost implications:

```markdown
**Next.js on Vercel**
✅ Pros: Fastest development, great DX, zero config
❌ Cons: Can get expensive at scale, vendor lock-in
💰 Cost: $0 (MVP), $20-50 (production), $200+ (scale)
🎯 Best for: When developer time is more valuable than hosting costs

**Vite+React + Go API**
✅ Pros: Very efficient, lower hosting costs, great performance
❌ Cons: More initial setup, separate deploy pipelines
💰 Cost: $0 (MVP), $10-30 (production), $100+ (scale)
🎯 Best for: When hosting budget is tight or high-traffic expected
```

## Tools for Cost Estimation

**Free Cost Calculators**:
- AWS Pricing Calculator: https://calculator.aws
- GCP Pricing Calculator: https://cloud.google.com/products/calculator
- Azure Pricing Calculator: https://azure.microsoft.com/pricing/calculator

**Cost Monitoring** (Recommended for production):
- CloudWatch (AWS)
- Google Cloud Billing Reports
- Datadog Cost Management
- Infracost (IaC cost estimation)

---

**Note**: All prices are 2025 estimates and may vary. Always check current pricing from providers. Prices typically increase 0-10% per year, but competition can drive costs down.
