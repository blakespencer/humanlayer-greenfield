import { Page } from '@playwright/test'

/**
 * Mock a network error for a specific endpoint
 */
export async function mockNetworkError(page: Page, endpoint: string) {
  await page.route(endpoint, (route) => {
    route.abort('failed')
  })
}

/**
 * Mock a 500 server error response
 */
export async function mockServerError(page: Page, endpoint: string, status = 500) {
  await page.route(endpoint, (route) => {
    route.fulfill({
      status,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' }
    })
  })
}

/**
 * Mock a 403 forbidden response
 */
export async function mockForbiddenError(page: Page, endpoint: string) {
  await page.route(endpoint, (route) => {
    route.fulfill({
      status: 403,
      body: JSON.stringify({ error: 'Forbidden' }),
      headers: { 'Content-Type': 'application/json' }
    })
  })
}

/**
 * Mock a slow network response (timeout simulation)
 */
export async function mockSlowResponse(page: Page, endpoint: string, delayMs = 5000) {
  await page.route(endpoint, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    route.continue()
  })
}

/**
 * Mock successful response with custom data
 */
export async function mockSuccessResponse(
  page: Page,
  endpoint: string,
  data: any,
  status = 200
) {
  await page.route(endpoint, (route) => {
    route.fulfill({
      status,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
  })
}

/**
 * Clear all route mocks
 */
export async function clearMocks(page: Page) {
  await page.unroute('**/*')
}

/**
 * Mock validation error response
 */
export async function mockValidationError(
  page: Page,
  endpoint: string,
  errors: Record<string, string>
) {
  await page.route(endpoint, (route) => {
    route.fulfill({
      status: 400,
      body: JSON.stringify({ errors }),
      headers: { 'Content-Type': 'application/json' }
    })
  })
}

/**
 * Wait for API request to complete
 */
export async function waitForApiRequest(page: Page, endpoint: string) {
  return page.waitForRequest((request) => request.url().includes(endpoint))
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, endpoint: string) {
  return page.waitForResponse((response) => response.url().includes(endpoint))
}
