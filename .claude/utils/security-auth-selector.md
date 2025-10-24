# Security & Authentication Selector

**Version**: 2025.1
**Last Updated**: 2025-10-24

A comprehensive guide for selecting authentication methods, authorization patterns, and security strategies for greenfield MVP development.

---

## Table of Contents

1. [Authentication Methods](#authentication-methods)
2. [Authorization Patterns](#authorization-patterns)
3. [Security Checklist](#security-checklist)
4. [OWASP Top 10 (2025)](#owasp-top-10-2025)
5. [Compliance Considerations](#compliance-considerations)
6. [Recommended Auth Services](#recommended-auth-services)
7. [Decision Questions](#decision-questions)
8. [Code Examples](#code-examples)

---

## Authentication Methods

### JWT (JSON Web Tokens)

**Best for**: Stateless APIs, microservices, mobile apps, SPAs

**✅ Pros**:
- Stateless - no server-side session storage required
- Scalable - works across multiple servers without shared state
- Works across domains and subdomains
- Mobile-friendly - store in secure storage
- Self-contained - includes user claims

**❌ Cons**:
- Token revocation complexity - can't invalidate immediately
- Larger payload size - sent with every request
- Token theft risk - if stolen, valid until expiry
- Requires careful key management
- Can't force logout without additional mechanisms

**🎯 Use When**:
- Building API-first applications
- Need mobile app support
- Microservices architecture
- Cross-domain authentication required
- Stateless infrastructure preferred

**⚠️ Avoid If**:
- Need instant session termination
- Building traditional server-rendered apps
- Security requirements demand server-side control
- Token size is a bandwidth concern

**Implementation Libraries**:
- **TypeScript**: `jsonwebtoken`, `jose`, `passport-jwt`
- **Go**: `golang-jwt/jwt`, `lestrrat-go/jwx`
- **Python**: `PyJWT`, `python-jose`, `authlib`
- **Rust**: `jsonwebtoken` crate, `jwt-simple`

**Security Best Practices**:
- Use short expiration times (15-30 minutes for access tokens)
- Implement refresh token rotation
- Store tokens securely (httpOnly cookies or secure storage)
- Use strong signing algorithms (RS256, ES256)
- Never store sensitive data in JWT payload
- Implement token blacklisting for critical apps

---

### Session-Based (Cookies)

**Best for**: Traditional web apps, SSR applications, admin panels

**✅ Pros**:
- Simple to implement and understand
- Easy session revocation - just delete server-side
- Smaller payload - only session ID in cookie
- httpOnly cookies prevent XSS attacks
- Server has full control over sessions
- Built-in expiration and renewal

**❌ Cons**:
- Stateful - requires session storage (memory, Redis, database)
- Server memory usage grows with users
- CSRF attack concerns (requires protection)
- Doesn't work well across domains
- Scaling requires shared session store
- Not ideal for mobile apps

**🎯 Use When**:
- Building traditional web applications
- Using SSR frameworks (Next.js, Django, Rails)
- Need instant logout capability
- Security is paramount
- Single-domain application

**⚠️ Avoid If**:
- Building API-first applications
- Need cross-domain authentication
- Building mobile apps
- Prefer stateless architecture
- Microservices with many services

**Implementation Libraries**:
- **TypeScript**: `express-session`, `iron-session`, `cookie-session`
- **Go**: `gorilla/sessions`, `scs`
- **Python**: Django sessions (built-in), Flask-Session
- **Rust**: `actix-session`, `tower-sessions`

**Security Best Practices**:
- Use httpOnly and secure flags
- Implement SameSite cookie attribute
- Use CSRF tokens for state-changing operations
- Store sessions in Redis or database (not memory)
- Implement session timeout and renewal
- Regenerate session ID after login

---

### OAuth 2.0 / Social Login

**Best for**: Consumer apps, B2C products, quick onboarding

**✅ Pros**:
- Fast user signup - no password to remember
- Trusted providers - users feel secure
- Less liability - don't store passwords
- Pre-verified email addresses
- Reduced password reset burden
- Access to user profile data

**❌ Cons**:
- Dependency on third-party services
- Privacy concerns - data sharing
- Provider outages affect your app
- Limited control over auth flow
- May not work for enterprise users
- Requires API keys and setup

**🎯 Use When**:
- Building B2C consumer products
- Want fast user onboarding
- Targeting general public
- Need social graph access
- Want to reduce password management

**⚠️ Avoid If**:
- Building enterprise B2B apps
- Strict data sovereignty requirements
- Users don't trust social platforms
- Need custom authentication flow
- Privacy-first product positioning

**Popular Providers**:
- **Google** - Widest reach, trusted
- **GitHub** - Developer tools
- **Facebook** - Consumer apps
- **Apple** - iOS apps (required for App Store)
- **Microsoft** - Enterprise users
- **Twitter/X** - Social platforms

**Implementation Libraries**:
- **TypeScript**: `passport-google-oauth20`, `@auth/core`, `next-auth`
- **Go**: `golang.org/x/oauth2`, `goth`
- **Python**: `authlib`, `python-social-auth`, `django-allauth`
- **Rust**: `oauth2` crate, `openidconnect`

**Security Best Practices**:
- Validate OAuth state parameter (CSRF protection)
- Use PKCE for mobile apps
- Store tokens securely
- Request minimal scopes
- Implement account linking carefully
- Have fallback auth method

---

### Magic Links (Passwordless)

**Best for**: Modern SaaS, less security-critical apps, newsletters

**✅ Pros**:
- Great user experience - no password to remember
- No password reset flows needed
- Reduces password reuse issues
- Modern and innovative UX
- Email serves as second factor
- Simple implementation

**❌ Cons**:
- Depends on email reliability
- Slower than password login
- Email can be compromised
- Links can be intercepted
- Users may have email access issues
- Requires email infrastructure

**🎯 Use When**:
- Building modern SaaS products
- Email is reliable for your users
- Want to differentiate with UX
- Users check email frequently
- Security requirements are moderate

**⚠️ Avoid If**:
- Need instant access
- Email infrastructure unreliable
- High-security applications
- Users may not have email access
- Time-sensitive access required

**Implementation Libraries**:
- **TypeScript**: `next-auth` (email provider), `@supabase/auth-helpers`
- **Go**: Custom implementation with email service
- **Python**: `django-sesame`, custom with email
- **Rust**: Custom implementation

**Security Best Practices**:
- Use short expiration times (10-15 minutes)
- Single-use links only
- Include user context in link
- Rate limit link generation
- Log all authentication attempts
- Secure email delivery (SPF, DKIM, DMARC)

---

### Multi-Factor Authentication (MFA/2FA)

**Best for**: High-security apps, financial services, healthcare

**Common Methods**:
1. **TOTP** (Time-based One-Time Password) - Google Authenticator, Authy
2. **SMS** - Less secure, but familiar
3. **Email** - Backup method
4. **Biometric** - Fingerprint, Face ID
5. **Hardware Keys** - YubiKey (highest security)

**Implementation Libraries**:
- **TypeScript**: `otplib`, `speakeasy`, `@simplewebauthn/server`
- **Go**: `pquerna/otp`, `duo-labs/webauthn`
- **Python**: `pyotp`, `django-otp`, `py-webauthn`
- **Rust**: `totp-lite` crate

**When to Require MFA**:
- Financial transactions
- Admin/privileged accounts
- Healthcare/HIPAA compliance
- PCI-DSS requirements
- After suspicious activity

---

## Authorization Patterns

### Role-Based Access Control (RBAC)

**Best for**: Most MVPs, SaaS apps, clear hierarchies

**Concept**: Users assigned to roles, roles have permissions

**Common Roles**:
- **Admin** - Full system access
- **Manager/Editor** - Create, update content
- **Viewer/Member** - Read-only access
- **Guest** - Limited anonymous access

**✅ Pros**:
- Simple to implement and understand
- Easy to explain to users
- Scales well for most apps
- Clear audit trails
- Standard pattern

**❌ Cons**:
- Can become complex with many roles
- Less flexible than other patterns
- Role explosion problem
- May not fit complex scenarios

**🎯 Use When**:
- Clear organizational hierarchy
- Limited number of roles (< 10)
- Standard permission sets
- Building MVP or SaaS product

**Example Structure**:
```typescript
interface User {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

function canEditPost(user: User, post: Post): boolean {
  return user.role === 'admin' ||
         (user.role === 'editor' && post.authorId === user.id)
}
```

**Implementation Libraries**:
- **TypeScript**: `casbin`, `accesscontrol`, `casl`
- **Go**: `casbin`, custom middleware
- **Python**: `django-guardian`, `flask-principal`
- **Rust**: `casbin-rs`, custom implementation

---

### Attribute-Based Access Control (ABAC)

**Best for**: Complex permissions, enterprise apps, multi-tenant

**Concept**: Access based on attributes (user, resource, environment)

**Attributes Examples**:
- **User**: Department, clearance level, location
- **Resource**: Classification, owner, creation date
- **Environment**: Time of day, IP address, device type

**✅ Pros**:
- Extremely flexible
- Handles complex scenarios
- Centralized policy management
- Fine-grained control
- Scales to large organizations

**❌ Cons**:
- Complex to implement
- Harder to understand and debug
- Performance overhead
- Requires careful policy design
- Overkill for most MVPs

**🎯 Use When**:
- Enterprise applications
- Healthcare (HIPAA requirements)
- Financial services
- Government/defense
- Complex multi-tenant platforms

**Example Policy**:
```typescript
interface Policy {
  effect: 'allow' | 'deny'
  subject: { department: string, clearance: number }
  resource: { classification: string }
  action: string
  condition: { time: string, location: string }
}
```

**Implementation Libraries**:
- **TypeScript**: `casbin`, `oso`
- **Go**: `casbin`, `ory/ladon`
- **Python**: `py-abac`, `oso`
- **Rust**: `casbin-rs`

---

### Access Control Lists (ACL)

**Best for**: Document-level permissions, file sharing, collaboration tools

**Concept**: Each resource has a list of who can access it

**Common Patterns**:
- **Owner** - Full control
- **Shared with specific users** - Read or write
- **Shared with team/organization** - Group access
- **Public** - Anyone can access

**✅ Pros**:
- Very intuitive for users
- Perfect for document sharing
- Easy to implement per-resource
- Familiar pattern (Google Docs style)
- Clear ownership model

**❌ Cons**:
- Doesn't scale to thousands of resources
- Harder to audit across resources
- Can become complex with inheritance
- Performance issues with many ACL checks

**🎯 Use When**:
- Building collaboration tools
- Document/file sharing apps
- Project management tools
- Need per-resource permissions
- Users understand sharing concept

**Example Structure**:
```typescript
interface Document {
  id: string
  ownerId: string
  acl: Array<{
    userId: string
    permission: 'read' | 'write' | 'admin'
  }>
  publicAccess: 'none' | 'read' | 'write'
}
```

**Implementation Libraries**:
- **TypeScript**: `acl`, `node_acl`
- **Go**: Custom implementation
- **Python**: `django-guardian` (object permissions)
- **Rust**: Custom implementation

---

## Security Checklist

### MVP Security Essentials

**Authentication & Authorization**:
- [ ] HTTPS everywhere (SSL/TLS) - no exceptions
- [ ] Password hashing with bcrypt or Argon2 (never plain text)
- [ ] Secure session management (httpOnly, secure, SameSite cookies)
- [ ] Rate limiting on authentication endpoints (prevent brute force)
- [ ] Account lockout after failed login attempts (5-10 tries)
- [ ] Secure password reset flow (time-limited, single-use tokens)
- [ ] Implement proper logout (invalidate sessions/tokens)

**Input Validation & Sanitization**:
- [ ] Validate all user inputs on server-side
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Escape output to prevent XSS attacks
- [ ] Implement Content Security Policy (CSP) headers
- [ ] Validate file uploads (type, size, content)
- [ ] Sanitize HTML inputs if allowing rich text

**API Security**:
- [ ] CORS configuration (don't use `*` in production)
- [ ] API rate limiting (prevent abuse)
- [ ] Request size limits (prevent DoS)
- [ ] Proper error messages (don't leak system info)
- [ ] API authentication required
- [ ] Validate all API inputs

**Data Protection**:
- [ ] Environment variables for secrets (never in code)
- [ ] Encrypt sensitive data at rest
- [ ] Use secure random number generation
- [ ] Implement proper access controls
- [ ] Log security events (authentication, authorization failures)
- [ ] Regular security dependency updates

**CSRF Protection**:
- [ ] CSRF tokens for state-changing operations
- [ ] Verify origin/referer headers
- [ ] Use SameSite cookie attribute
- [ ] Double-submit cookie pattern (if needed)

**Infrastructure**:
- [ ] Keep dependencies up to date
- [ ] Use security headers (HSTS, X-Frame-Options, etc.)
- [ ] Disable unnecessary services
- [ ] Implement proper logging
- [ ] Regular backups
- [ ] Disaster recovery plan

---

## OWASP Top 10 (2025)

### 1. Broken Access Control

**Risk**: Users accessing resources they shouldn't

**Prevention**:
- Implement authorization checks on every endpoint
- Default deny access
- Disable directory listing
- Validate user permissions on server-side (not just client)
- Log access control failures

**Example Vulnerability**:
```typescript
// BAD - No authorization check
app.get('/api/users/:id', (req, res) => {
  const user = db.getUser(req.params.id)
  res.json(user)
})

// GOOD - Verify user can access this resource
app.get('/api/users/:id', requireAuth, (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  const user = db.getUser(req.params.id)
  res.json(user)
})
```

---

### 2. Cryptographic Failures

**Risk**: Sensitive data exposed due to weak encryption

**Prevention**:
- Use TLS 1.3 for data in transit
- Use strong encryption for data at rest (AES-256)
- Use bcrypt/Argon2 for password hashing
- Don't roll your own crypto
- Use established libraries
- Properly manage encryption keys

**Example**:
```typescript
// BAD - Plain text password
await db.saveUser({ password: userPassword })

// GOOD - Hashed password
import bcrypt from 'bcrypt'
const hashedPassword = await bcrypt.hash(userPassword, 10)
await db.saveUser({ password: hashedPassword })
```

---

### 3. Injection

**Risk**: Malicious code executed through user input

**Prevention**:
- Use parameterized queries (ORMs)
- Validate and sanitize all inputs
- Use allow-lists, not deny-lists
- Escape special characters
- Use safe APIs

**Example**:
```typescript
// BAD - SQL Injection vulnerable
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
db.query(query)

// GOOD - Parameterized query
db.query('SELECT * FROM users WHERE email = ?', [userEmail])

// BEST - Use ORM
await User.findOne({ where: { email: userEmail } })
```

---

### 4. Insecure Design

**Risk**: Fundamental design flaws in architecture

**Prevention**:
- Threat modeling during design
- Security requirements from the start
- Secure design patterns
- Principle of least privilege
- Defense in depth
- Fail securely

---

### 5. Security Misconfiguration

**Risk**: Default, incomplete, or ad-hoc configurations

**Prevention**:
- Disable default accounts and passwords
- Remove unnecessary features
- Keep software updated
- Implement security headers
- Error messages don't leak info
- Regular security scans

**Security Headers**:
```typescript
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
})
```

---

### 6. Vulnerable and Outdated Components

**Risk**: Using libraries with known vulnerabilities

**Prevention**:
- Regular dependency updates
- Use tools like `npm audit`, `snyk`, `dependabot`
- Remove unused dependencies
- Only use maintained libraries
- Subscribe to security advisories

**Commands**:
```bash
# Check for vulnerabilities
npm audit
pip-audit
cargo audit

# Update dependencies
npm update
pip install --upgrade
cargo update
```

---

### 7. Identification and Authentication Failures

**Risk**: Weak authentication mechanisms

**Prevention**:
- Implement MFA where possible
- Weak password checks
- Secure session management
- Rate limiting on auth endpoints
- Account lockout policies
- Secure password recovery

---

### 8. Software and Data Integrity Failures

**Risk**: Code and infrastructure updates without integrity verification

**Prevention**:
- Use digital signatures
- Verify CI/CD pipeline integrity
- Review code changes
- Use trusted registries
- Implement checksum verification

---

### 9. Security Logging and Monitoring Failures

**Risk**: Can't detect or respond to breaches

**Prevention**:
- Log all authentication events
- Log authorization failures
- Monitor for suspicious patterns
- Implement alerting
- Regular log reviews
- Secure log storage

**What to Log**:
```typescript
// Log authentication events
logger.info('User login', { userId, ip, timestamp, success: true })
logger.warn('Failed login attempt', { email, ip, timestamp })

// Log authorization failures
logger.warn('Unauthorized access attempt', { userId, resource, action })

// Log sensitive operations
logger.info('Password changed', { userId, ip, timestamp })
logger.info('Account deleted', { userId, ip, timestamp })
```

---

### 10. Server-Side Request Forgery (SSRF)

**Risk**: Application fetches remote resources without validation

**Prevention**:
- Validate and sanitize all URLs
- Use allow-lists for allowed domains
- Disable unused URL schemes
- Don't return raw responses to users
- Network segmentation

**Example**:
```typescript
// BAD - SSRF vulnerable
app.get('/fetch', async (req, res) => {
  const url = req.query.url
  const response = await fetch(url)
  res.send(await response.text())
})

// GOOD - Validate URL
const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com']

app.get('/fetch', async (req, res) => {
  const url = new URL(req.query.url)
  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    return res.status(400).json({ error: 'Invalid domain' })
  }
  const response = await fetch(url.toString())
  res.send(await response.text())
})
```

---

## Compliance Considerations

### GDPR (General Data Protection Regulation)

**Applies to**: EU users, regardless of where your company is located

**Key Requirements**:
- **Consent**: Get explicit consent to collect data
- **Right to Access**: Users can request their data
- **Right to Deletion**: Users can request data deletion ("Right to be forgotten")
- **Data Portability**: Export user data in machine-readable format
- **Privacy by Design**: Build privacy into the system from the start
- **Data Breach Notification**: Report breaches within 72 hours

**Implementation Checklist**:
- [ ] Cookie consent banner
- [ ] Privacy policy page
- [ ] Data export functionality
- [ ] Account deletion functionality
- [ ] Data retention policies
- [ ] Audit logging
- [ ] Appoint a DPO (if required)

**Code Example**:
```typescript
// Data export endpoint
app.get('/api/user/export', requireAuth, async (req, res) => {
  const userId = req.user.id
  const userData = await db.getAllUserData(userId)
  res.json(userData)
})

// Account deletion endpoint
app.delete('/api/user/account', requireAuth, async (req, res) => {
  const userId = req.user.id
  await db.anonymizeUserData(userId)
  await db.deleteUser(userId)
  res.json({ message: 'Account deleted successfully' })
})
```

---

### CCPA (California Consumer Privacy Act)

**Applies to**: California residents

**Key Requirements**:
- **Right to Know**: What data is collected
- **Right to Delete**: Request deletion
- **Right to Opt-Out**: Of data sale
- **Non-Discrimination**: Can't deny service for exercising rights

**Implementation**:
- [ ] "Do Not Sell My Personal Information" link
- [ ] Privacy policy disclosing data collection
- [ ] Data deletion request process

---

### HIPAA (Health Insurance Portability and Accountability Act)

**Applies to**: Healthcare apps handling PHI (Protected Health Information)

**Key Requirements**:
- **Encryption**: Data at rest and in transit
- **Access Controls**: Role-based, audit logs
- **BAA**: Business Associate Agreement with vendors
- **Breach Notification**: Notify affected users
- **Regular Audits**: Security assessments

**Implementation Checklist**:
- [ ] Encrypt all PHI
- [ ] Implement comprehensive access logging
- [ ] Regular security risk assessments
- [ ] Employee training on HIPAA
- [ ] Incident response plan
- [ ] BAA with all third parties

**⚠️ Note**: HIPAA compliance is complex. Consult with legal/compliance experts.

---

### SOC 2 (System and Organization Controls 2)

**Applies to**: SaaS companies handling customer data

**Five Trust Service Criteria**:
1. **Security**: System protected against unauthorized access
2. **Availability**: System is available for operation
3. **Processing Integrity**: System processing is complete and accurate
4. **Confidentiality**: Confidential information is protected
5. **Privacy**: Personal information is handled per privacy notice

**Implementation Checklist**:
- [ ] Document security policies
- [ ] Access control policies
- [ ] Encryption for sensitive data
- [ ] Regular vulnerability scans
- [ ] Incident response plan
- [ ] Vendor management
- [ ] Security awareness training
- [ ] Penetration testing
- [ ] Audit logging

**⚠️ Note**: SOC 2 is an audit, not a certification. Hire a qualified auditor.

---

### PCI-DSS (Payment Card Industry Data Security Standard)

**Applies to**: Apps that process credit cards

**Key Requirements**:
- **Don't store card data**: Use payment processors (Stripe, Square)
- **Use PCI-compliant hosting**
- **Network security**: Firewalls, encryption
- **Access controls**: Limit access to cardholder data

**Best Practice**: Use Stripe, PayPal, or other PCI-compliant processors. Don't handle card data directly.

---

## Recommended Auth Services

### For MVPs (Free or Low-Cost)

#### 1. Supabase Auth
- **Cost**: Free tier, then $25/mo
- **Best for**: Projects using Supabase (PostgreSQL)
- **Features**: Email, OAuth, magic links, MFA
- **Pros**: Integrated with Supabase DB, open source
- **Cons**: Tied to Supabase ecosystem

#### 2. Clerk
- **Cost**: Free tier (10K MAU), then $25-99/mo
- **Best for**: React/Next.js apps
- **Features**: Beautiful pre-built UI, social login, MFA
- **Pros**: Excellent DX, gorgeous UI components
- **Cons**: Newer player, some vendor lock-in

#### 3. NextAuth.js
- **Cost**: Free (self-hosted)
- **Best for**: Next.js applications
- **Features**: OAuth providers, credentials, JWT/sessions
- **Pros**: Free, flexible, good Next.js integration
- **Cons**: More setup required, self-hosted maintenance

#### 4. Firebase Auth
- **Cost**: Free (up to 10K verifications/month)
- **Best for**: Mobile apps, Google ecosystem
- **Features**: Email, social, phone, anonymous
- **Pros**: Reliable, global scale, good mobile SDKs
- **Cons**: Google ecosystem, limited customization

---

### For Production (Enterprise-Ready)

#### 1. Auth0
- **Cost**: Free tier, then $70-240/mo
- **Best for**: Enterprise apps, complex requirements
- **Features**: Everything, highly customizable
- **Pros**: Battle-tested, feature-rich, good docs
- **Cons**: Can be expensive, complex for simple needs

#### 2. AWS Cognito
- **Cost**: Pay per user ($0.05 per MAU after free tier)
- **Best for**: AWS-hosted apps
- **Features**: User pools, identity pools, OAuth
- **Pros**: Integrates with AWS, scalable
- **Cons**: AWS complexity, setup can be confusing

#### 3. Okta
- **Cost**: Enterprise pricing (contact sales)
- **Best for**: Large enterprises, B2B SaaS
- **Features**: SSO, SAML, MFA, provisioning
- **Pros**: Enterprise features, trusted brand
- **Cons**: Expensive, overkill for small apps

#### 4. Keycloak
- **Cost**: Free (self-hosted open source)
- **Best for**: Self-hosted, enterprise needs
- **Features**: SSO, SAML, OAuth, OpenID Connect
- **Pros**: Free, highly customizable, open source
- **Cons**: Requires self-hosting and maintenance

---

## Decision Questions

Use these questions to guide your authentication and security decisions:

### User & Use Case
1. **Who are your users?**
   - Consumers → Social login, magic links
   - Employees → SSO, enterprise auth
   - Developers → API keys, OAuth

2. **What's the sensitivity of data?**
   - Public → Basic security
   - Private → Standard security + MFA
   - Regulated (health, finance) → High security + compliance

3. **What's your user acquisition strategy?**
   - Fast onboarding → Social login, magic links
   - B2B sales → SSO, SAML
   - High security → Password + MFA

### Technical Requirements
4. **What's your architecture?**
   - Monolith → Session-based
   - Microservices → JWT
   - Mobile + API → JWT
   - SSR web app → Sessions

5. **Need social login?**
   - B2C → Yes (Google, Apple, etc.)
   - B2B → Maybe (Microsoft, Google Workspace)
   - Developer tools → GitHub

6. **Need multi-factor authentication?**
   - Financial → Yes (required)
   - Healthcare → Yes (HIPAA)
   - Admin accounts → Yes (recommended)
   - General users → Optional (good to have)

### Compliance & Security
7. **What compliance is required?**
   - EU users → GDPR
   - California → CCPA
   - Healthcare → HIPAA
   - Credit cards → PCI-DSS
   - Enterprise → SOC 2

8. **What's your security budget?**
   - Bootstrap → Self-hosted, open source
   - MVP → Managed service (Clerk, Supabase)
   - Growth → Enterprise auth (Auth0, Okta)

9. **What's your session lifetime?**
   - Banking → Short (15 min)
   - E-commerce → Medium (1-7 days)
   - Social → Long (30+ days)

### Team & Timeline
10. **What's your team's expertise?**
    - Experienced → Custom implementation
    - Mixed → Managed service with flexibility
    - Junior → Full-service managed (Clerk, Auth0)

11. **What's your timeline?**
    - Urgent (< 2 weeks) → Managed service
    - Normal (1-2 months) → Flexible
    - Long-term → Can build custom

---

## Code Examples

### TypeScript / Next.js

#### Next.js + NextAuth.js (OAuth + JWT)

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Email/password provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
```

#### Protected API Route
```typescript
// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Check role-based authorization
  if (session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }

  res.json({ data: 'Protected data', user: session.user })
}
```

---

### Python / FastAPI

#### FastAPI + JWT Authentication

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import BaseModel

# Configuration
SECRET_KEY = "your-secret-key-keep-it-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Models
class User(BaseModel):
    username: str
    email: str
    role: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Utilities
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Fetch user from database
    user = await get_user(username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

# Routes
@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/admin/users")
async def admin_only(current_user: User = Depends(get_current_admin_user)):
    return {"message": "Admin access granted", "user": current_user}
```

---

### Go

#### Go + JWT with Gin Framework

```go
package main

import (
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

// Configuration
var jwtSecret = []byte("your-secret-key-keep-it-secret")

// Models
type User struct {
    ID       string `json:"id"`
    Email    string `json:"email"`
    Password string `json:"-"`
    Role     string `json:"role"`
}

type Claims struct {
    UserID string `json:"user_id"`
    Role   string `json:"role"`
    jwt.RegisteredClaims
}

// Utilities
func hashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func checkPassword(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func generateToken(user User) (string, error) {
    claims := Claims{
        UserID: user.ID,
        Role:   user.Role,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(jwtSecret)
}

// Middleware
func authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
            c.Abort()
            return
        }

        tokenString := authHeader[len("Bearer "):]
        claims := &Claims{}

        token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
            return jwtSecret, nil
        })

        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        c.Set("userID", claims.UserID)
        c.Set("userRole", claims.Role)
        c.Next()
    }
}

func requireRole(role string) gin.HandlerFunc {
    return func(c *gin.Context) {
        userRole, exists := c.Get("userRole")
        if !exists || userRole != role {
            c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
            c.Abort()
            return
        }
        c.Next()
    }
}

// Handlers
func login(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Fetch user from database
    user, err := getUserByEmail(input.Email)
    if err != nil || !checkPassword(input.Password, user.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    token, err := generateToken(user)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token})
}

func protectedRoute(c *gin.Context) {
    userID, _ := c.Get("userID")
    c.JSON(http.StatusOK, gin.H{
        "message": "This is protected data",
        "userID":  userID,
    })
}

func adminOnlyRoute(c *gin.Context) {
    userID, _ := c.Get("userID")
    c.JSON(http.StatusOK, gin.H{
        "message": "Admin access granted",
        "userID":  userID,
    })
}

func main() {
    r := gin.Default()

    // Public routes
    r.POST("/login", login)
    r.POST("/register", register)

    // Protected routes
    authorized := r.Group("/api")
    authorized.Use(authMiddleware())
    {
        authorized.GET("/profile", protectedRoute)

        // Admin-only routes
        admin := authorized.Group("/admin")
        admin.Use(requireRole("admin"))
        {
            admin.GET("/users", adminOnlyRoute)
        }
    }

    r.Run(":8080")
}
```

---

### Rust

#### Rust + Axum + JWT

```rust
use axum::{
    extract::State,
    http::{Request, StatusCode},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tower_http::cors::CorsLayer;

// Configuration
const JWT_SECRET: &[u8] = b"your-secret-key-keep-it-secret";

// Models
#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: String,
    email: String,
    #[serde(skip_serializing)]
    password_hash: String,
    role: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String, // User ID
    role: String,
    exp: usize, // Expiration time
}

#[derive(Debug, Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Debug, Serialize)]
struct LoginResponse {
    token: String,
}

// State
#[derive(Clone)]
struct AppState {
    // Database connection, etc.
}

// Utilities
fn generate_token(user: &User) -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .unwrap()
        .timestamp() as usize;

    let claims = Claims {
        sub: user.id.clone(),
        role: user.role.clone(),
        exp: expiration,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(JWT_SECRET),
    )
}

fn verify_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::default(),
    )?;
    Ok(token_data.claims)
}

// Middleware
async fn auth_middleware<B>(
    mut req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok());

    let token = match auth_header {
        Some(header) if header.starts_with("Bearer ") => &header[7..],
        _ => return Err(StatusCode::UNAUTHORIZED),
    };

    let claims = verify_token(token).map_err(|_| StatusCode::UNAUTHORIZED)?;

    req.extensions_mut().insert(claims);
    Ok(next.run(req).await)
}

// Handlers
async fn login(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {
    // Fetch user from database and verify password
    // This is simplified - use proper password hashing (bcrypt)
    let user = User {
        id: "user123".to_string(),
        email: payload.email,
        password_hash: "hashed_password".to_string(),
        role: "user".to_string(),
    };

    let token = generate_token(&user).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(LoginResponse { token }))
}

async fn protected_route(
    req: Request<()>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let claims = req.extensions().get::<Claims>().unwrap();

    Ok(Json(serde_json::json!({
        "message": "Protected data",
        "user_id": claims.sub,
        "role": claims.role
    })))
}

async fn admin_only_route(
    req: Request<()>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let claims = req.extensions().get::<Claims>().unwrap();

    if claims.role != "admin" {
        return Err(StatusCode::FORBIDDEN);
    }

    Ok(Json(serde_json::json!({
        "message": "Admin access granted",
        "user_id": claims.sub
    })))
}

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState {});

    let app = Router::new()
        .route("/login", post(login))
        .route("/api/profile", get(protected_route))
        .route("/api/admin/users", get(admin_only_route))
        .route_layer(middleware::from_fn(auth_middleware))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();

    axum::serve(listener, app).await.unwrap();
}
```

---

## Quick Decision Matrix

| Scenario | Recommended Auth | Authorization | Services |
|----------|-----------------|---------------|----------|
| **Simple SaaS MVP** | Email + Password OR Magic Links | RBAC | Supabase, Clerk |
| **Consumer App** | Social Login (Google, Apple) | RBAC or ACL | Auth0, NextAuth |
| **Enterprise B2B** | SSO (SAML, OAuth) | RBAC or ABAC | Auth0, Okta |
| **Developer Tools** | API Keys + OAuth | RBAC | Custom JWT |
| **High Security** | Password + MFA | RBAC | Auth0, AWS Cognito |
| **Healthcare** | Password + MFA, Audit Logs | ABAC | Custom + HIPAA compliance |
| **Financial** | Password + MFA | RBAC + Audit | Custom, Okta |
| **Mobile App** | Social + JWT | RBAC | Firebase, Supabase |
| **Collaboration Tool** | Email + Social | ACL | Auth0, Clerk |

---

## Summary Recommendations

### For Most MVPs
1. **Start with email/password** using bcrypt hashing
2. **Use a managed service** (Clerk, Supabase, NextAuth)
3. **Implement RBAC** (3-5 roles max)
4. **Add social login** if B2C
5. **Plan for MFA** but don't build it yet
6. **Follow OWASP Top 10**
7. **Use HTTPS everywhere**

### Quick Wins
- ✅ Use established libraries (don't roll your own crypto)
- ✅ Implement rate limiting on auth endpoints
- ✅ Use environment variables for secrets
- ✅ Add basic logging for security events
- ✅ Keep dependencies updated

### What to Defer
- ⏸️ Complex authorization (ABAC) unless required
- ⏸️ MFA for all users (start with admins)
- ⏸️ Custom auth implementation (use services)
- ⏸️ Advanced compliance (unless in regulated industry)

---

**Last Updated**: 2025-10-24
**Version**: 2025.1
**Maintainer**: Humanlayer Greenfield Team
