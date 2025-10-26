# Test-First Development Workflow

**Purpose**: This workflow ensures AI-generated code meets requirements through comprehensive testing guardrails. Tests are written BEFORE implementation to serve as specifications and prevent bugs.

**Philosophy**: Tests are the specification. Code makes tests pass.

**🔒 MANDATORY**: All tests must follow `.claude/standards/testing-standards.md`:
- ✅ DRY testing with fixtures and helpers
- ✅ No vanity tests (every test catches real bugs)
- ✅ Context engineering for token efficiency
- ✅ Language-agnostic patterns (TypeScript, Go, Python, Rust)

---

## 🎯 Testing Hierarchy (Outside-In)

**Priority Order** (highest to lowest value):

1. **E2E Tests** → User flows, full stack, no mocking (acceptance criteria)
2. **Integration Tests** → Multi-component, real APIs when appropriate
3. **Component/Hook Tests** → Frontend behavior, real APIs preferred
4. **Unit Tests** → Only when absolutely necessary (mocking is expensive)

**Key Principle**: Focus on high-value tests (E2E) over low-value tests (unit). Avoid mocking when possible—it's expensive and brittle.

---

## 📋 The Workflow

### Phase 1: Design (UX First)

**Input**: User requirements, problem description

**Steps**:
1. Create wireframes (use `.claude/utils/wireframe-templates.md`)
2. Map user journeys (use `.claude/utils/user-journey-template.md`)
3. Document expected behaviors and edge cases

**Output**: Wireframes + User journeys

**Who**: AI creates, User reviews and approves

---

### Phase 2: E2E Test Specifications (HUMAN REVIEW GATE 🚦)

**Input**: User journeys from Phase 1

**Steps**:
1. Convert each user journey into E2E test descriptions
2. Include baseline tests (network errors, concurrency, auth, etc.)
3. Specify what to check:
   - **UI state** (what user sees)
   - **Backend state** (database, cache, API responses)
   - **Side effects** (emails sent, webhooks fired, etc.)

**Output**: E2E test descriptions (plain English or pseudocode)

**Who**: AI creates → **USER REVIEWS AND APPROVES** ✋

**Example**:
```markdown
## E2E Test: User places a bid

### Setup
- User is authenticated
- Auction exists with ID 123
- User has sufficient balance

### Test Flow
1. Navigate to auction page /auction/123
2. Enter bid amount $100
3. Click "Place Bid" button

### Assertions - UI State
- Success message appears: "Bid placed successfully"
- Bid amount updates to show $100
- User's bid appears in bid history list

### Assertions - Backend State
- Database: New bid record created with user_id, auction_id, amount
- Database: Auction.current_bid = $100
- Cache: Auction cache invalidated
- Event: "bid_placed" event published to queue
```

---

### Phase 3: Implement E2E Tests

**Input**: Approved E2E test descriptions from Phase 2

**Steps**:
1. Implement E2E tests using Playwright
2. Tests should FAIL initially (no code exists yet)
3. Use real database, real API, no mocking
4. Include baseline tests (see templates)

**Output**: Runnable E2E tests (all failing)

**Who**: AI implements

---

### Phase 4: Integration/Component Test Design

**Input**: E2E tests + wireframes

**Steps**:
1. Identify integration points (API routes, database queries)
2. Design integration tests (optional, only when valuable)
3. Design component tests (frontend only)
4. Real APIs preferred, mock only when necessary

**Output**: Integration/component test outlines

**Who**: AI designs

---

### Phase 5: Unit Test Design (Minimal)

**Input**: Implementation requirements

**Steps**:
1. Identify critical business logic that needs unit tests
2. Design unit tests ONLY for:
   - Complex algorithms
   - Edge cases not covered by E2E
   - Pure functions with many branches

**Output**: Unit test outlines (very few)

**Who**: AI designs

**Note**: Most "unit" tests should actually be integration tests with real dependencies. Mocking is expensive—avoid unless necessary.

---

### Phase 6: Implementation

**Input**: All test specs from Phases 2-5

**Steps**:
1. Implement code to make E2E tests pass
2. Implement component tests alongside UI code
3. Implement integration tests alongside API code
4. Implement unit tests last (if any)
5. All tests must pass before completion

**Output**: Working code + passing tests

**Who**: AI implements

---

### Phase 7: Verification

**Input**: Implementation from Phase 6

**Steps**:
1. Run full test suite
2. Verify all tests pass
3. Check test coverage (E2E coverage is most important)
4. User manually tests if desired

**Output**: Verified working feature

**Who**: AI runs tests, User approves

---

## 🛡️ Baseline Tests (Every App Needs These)

These tests should be included by default in every project:

### Network & Infrastructure
- [ ] Network timeout handling
- [ ] Network error (500, 503) handling
- [ ] Offline behavior (if applicable)
- [ ] Slow network simulation

### Authentication & Authorization
- [ ] Unauthenticated user cannot access protected routes
- [ ] Authenticated user can access protected routes
- [ ] User logout clears session
- [ ] Expired token/session handling

### Concurrency & Race Conditions
- [ ] Multiple simultaneous requests handled correctly
- [ ] Race condition in critical paths (e.g., double-submit prevention)
- [ ] Database transaction isolation

### Data Validation
- [ ] Required fields validated
- [ ] Input sanitization (XSS prevention)
- [ ] SQL injection prevention (if using SQL)

### Error Handling
- [ ] User-friendly error messages
- [ ] No sensitive data in error messages
- [ ] Errors logged properly

### Performance (Optional but Recommended)
- [ ] Page load under 3 seconds
- [ ] API response under 200ms (or appropriate threshold)

---

## 🧪 Testing Stack (2025 Recommendations)

### E2E Testing
**Tool**: Playwright
- Cross-browser support (Chrome, Firefox, Safari)
- Parallel execution (10-20x faster)
- Advanced network interception
- Built-in video/screenshot on failure

**When to use**: Every user-facing feature

**Example**:
```typescript
// e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test'

test('user can sign up and access dashboard', async ({ page }) => {
  // Navigate to signup
  await page.goto('/signup')

  // Fill form
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'SecurePass123!')
  await page.click('button[type="submit"]')

  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Welcome')

  // Check backend state (via API)
  const response = await page.request.get('/api/user/me')
  const user = await response.json()
  expect(user.email).toBe('test@example.com')
})
```

---

### Component Testing (Frontend)
**Tools**: Vitest + React Testing Library

**When to use**:
- Interactive components (forms, buttons, modals)
- Complex state management
- Conditional rendering logic

**Example**:
```typescript
// src/components/__tests__/BidForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BidForm from '../BidForm'

describe('BidForm', () => {
  it('submits bid with valid amount', async () => {
    const onSubmit = vi.fn()
    render(<BidForm onSubmit={onSubmit} minBid={50} />)

    // Enter bid
    fireEvent.change(screen.getByLabelText('Bid Amount'), {
      target: { value: '100' }
    })

    // Submit
    fireEvent.click(screen.getByText('Place Bid'))

    // Verify
    expect(onSubmit).toHaveBeenCalledWith(100)
  })

  it('shows error for bid below minimum', () => {
    render(<BidForm minBid={50} />)

    fireEvent.change(screen.getByLabelText('Bid Amount'), {
      target: { value: '25' }
    })

    expect(screen.getByText(/minimum bid is \$50/i)).toBeInTheDocument()
  })
})
```

---

### Integration Testing (Backend)
**Tools**:
- **TypeScript/Node**: Vitest with real database
- **Go**: Standard testing + testify with real database

**When to use**:
- API routes
- Database queries
- Business logic with external dependencies

**Philosophy**: Use real database (PostgreSQL test instance or sqlite in-memory). Mock external APIs only.

**Example (TypeScript)**:
```typescript
// src/api/__tests__/bids.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { createTestDatabase, clearDatabase } from '../test-utils'
import { placeBid } from '../bids'

describe('POST /api/bids', () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  it('creates bid and updates auction', async () => {
    // Setup
    const auction = await createAuction({ id: 123, currentBid: 50 })
    const user = await createUser({ id: 1, balance: 1000 })

    // Execute
    const bid = await placeBid({
      auctionId: 123,
      userId: 1,
      amount: 100
    })

    // Verify database state
    expect(bid.amount).toBe(100)
    expect(bid.userId).toBe(1)

    const updatedAuction = await getAuction(123)
    expect(updatedAuction.currentBid).toBe(100)
  })
})
```

**Example (Go)**:
```go
// api/bids_test.go
package api

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestPlaceBid(t *testing.T) {
	// Setup test database
	db := setupTestDB(t)
	defer db.Close()

	// Table-driven tests
	tests := []struct {
		name      string
		auctionID int
		userID    int
		amount    float64
		wantErr   bool
	}{
		{
			name:      "valid bid",
			auctionID: 123,
			userID:    1,
			amount:    100.0,
			wantErr:   false,
		},
		{
			name:      "bid below minimum",
			auctionID: 123,
			userID:    1,
			amount:    10.0,
			wantErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bid, err := PlaceBid(db, tt.auctionID, tt.userID, tt.amount)

			if tt.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.amount, bid.Amount)
			}
		})
	}
}
```

---

### Unit Testing (Minimal - Use Sparingly)
**Tools**: Same as integration (Vitest or Go testing)

**When to use ONLY**:
- Pure functions with complex logic
- Algorithm implementations
- Utility functions with many edge cases

**When NOT to use**:
- Don't mock database for "unit" tests → use integration tests instead
- Don't mock APIs internally → use real APIs or integration tests
- Don't test trivial getters/setters

**Example** (rare case where unit test makes sense):
```typescript
// src/lib/__tests__/bidCalculator.test.ts
import { describe, it, expect } from 'vitest'
import { calculateMinimumBid } from '../bidCalculator'

describe('calculateMinimumBid', () => {
  // Pure function, complex logic, many edge cases = good unit test
  it.each([
    [0, 1],
    [1, 2],
    [10, 15],
    [100, 110],
    [1000, 1100],
  ])('calculates minimum bid for current bid %d', (current, expected) => {
    expect(calculateMinimumBid(current)).toBe(expected)
  })
})
```

---

## 📁 Test File Structure (Option C)

```
project/
├── e2e/                           # E2E tests (separate)
│   ├── auth-flow.spec.ts
│   ├── bid-placement.spec.ts
│   └── auction-lifecycle.spec.ts
│
├── src/
│   ├── components/
│   │   ├── BidForm.tsx
│   │   └── __tests__/           # Component tests (co-located)
│   │       └── BidForm.test.tsx
│   │
│   ├── api/
│   │   ├── bids.ts
│   │   └── __tests__/           # Integration tests (co-located)
│   │       └── bids.test.ts
│   │
│   └── lib/
│       ├── bidCalculator.ts
│       └── __tests__/           # Unit tests (co-located)
│           └── bidCalculator.test.ts
│
└── tests/
    └── utils/                    # Shared test utilities
        ├── test-db.ts
        └── fixtures.ts
```

---

## 🚦 Review Gates

### Gate 1: E2E Test Descriptions (MANDATORY HUMAN REVIEW)
**Who**: User must review and approve
**What**: Test descriptions in plain English
**Why**: Ensures AI understands requirements correctly
**Format**: Markdown or pseudocode (see Phase 2 example)

### Gate 2: Implementation Complete (OPTIONAL HUMAN REVIEW)
**Who**: User can manually test if desired
**What**: Working code with passing tests
**Why**: Confidence before deployment

---

## ⚠️ Common Mistakes to Avoid

### ❌ Don't Do This
- Writing code before E2E tests
- Over-mocking in tests (makes tests brittle)
- Testing implementation details instead of behavior
- Writing unit tests for everything
- Ignoring baseline tests

### ✅ Do This Instead
- E2E test descriptions → E2E tests → Implementation
- Use real dependencies when possible
- Test user-visible behavior
- Focus on E2E and integration tests
- Include baseline tests in every project

---

## 🎯 Success Metrics

**Good test suite has**:
- High E2E coverage of user flows (most important)
- Integration tests for critical paths
- Few unit tests (only where truly needed)
- Fast feedback (< 5 min for CI)
- Reliable (no flaky tests)

**Bad test suite has**:
- Low E2E coverage
- 100% unit test coverage with heavy mocking
- Slow (> 15 min for CI)
- Flaky tests that fail randomly

---

## 🔗 Related Resources

- `.claude/utils/wireframe-templates.md` - Design wireframes
- `.claude/utils/user-journey-template.md` - Map user journeys
- `.claude/templates/playwright/` - E2E test templates
- `.claude/templates/vitest/` - Component/integration test templates
- `.claude/utils/baseline-tests.md` - Default tests every app needs

---

## 📚 Further Reading

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Vitest Guide](https://vitest.dev/guide/)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles)
- [Go Table-Driven Tests](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests)

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
