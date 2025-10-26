import { Page, expect } from '@playwright/test'

/**
 * Assert that a post appears in the list by title
 */
export async function expectPostInList(page: Page, title: string) {
  // Use a more specific selector to avoid finding the title in multiple places
  // (e.g., in post card AND in delete modal)
  const postCard = page.locator('[data-testid^="post-card-"]').filter({ hasText: title })
  await expect(postCard.first()).toBeVisible()
}

/**
 * Assert that a post does NOT appear in the list
 */
export async function expectPostNotInList(page: Page, title: string) {
  const postCard = page.locator('[data-testid^="post-card-"]').filter({ hasText: title })
  await expect(postCard.first()).not.toBeVisible()
}

/**
 * Assert that a validation error is shown for a field
 */
export async function expectValidationError(
  page: Page,
  field: string,
  message?: string
) {
  const errorSelector = `[data-testid="error-${field}"], .error-${field}, .field-error`
  const errorElement = page.locator(errorSelector).first()

  await expect(errorElement).toBeVisible()

  if (message) {
    await expect(errorElement).toContainText(message)
  }
}

/**
 * Assert that empty state is shown
 */
export async function expectEmptyState(page: Page, message?: string) {
  const emptyStateSelector = '[data-testid="empty-state"], .empty-state'
  const emptyState = page.locator(emptyStateSelector).first()

  await expect(emptyState).toBeVisible()

  if (message) {
    await expect(emptyState).toContainText(message)
  }
}

/**
 * Assert that a success message is shown
 */
export async function expectSuccessMessage(page: Page, message?: string) {
  const successSelector = '[data-testid="success-message"], .success-message, .toast-success'
  const successElement = page.locator(successSelector).first()

  await expect(successElement).toBeVisible()

  if (message) {
    await expect(successElement).toContainText(message)
  }
}

/**
 * Assert that an error message is shown
 */
export async function expectErrorMessage(page: Page, message?: string) {
  const errorSelector = '[data-testid="error-message"], .error-message, .toast-error, .alert-error'
  const errorElement = page.locator(errorSelector).first()

  await expect(errorElement).toBeVisible()

  if (message) {
    await expect(errorElement).toContainText(message)
  }
}

/**
 * Assert that confirmation modal is shown
 */
export async function expectConfirmationModal(page: Page, message?: string) {
  const modalSelector = '[data-testid="confirm-modal"], [role="dialog"], .modal'
  const modal = page.locator(modalSelector).first()

  await expect(modal).toBeVisible()

  if (message) {
    await expect(modal).toContainText(message)
  }
}

/**
 * Assert that pagination shows correct info
 */
export async function expectPaginationInfo(
  page: Page,
  currentPage: number,
  totalPages: number
) {
  const paginationSelector = '[data-testid="pagination"], .pagination'
  const pagination = page.locator(paginationSelector).first()

  await expect(pagination).toBeVisible()
  await expect(pagination).toContainText(`Page ${currentPage}`)

  if (totalPages > 1) {
    await expect(pagination).toContainText(`of ${totalPages}`)
  }
}

/**
 * Assert that a post has specific content
 */
export async function expectPostContent(
  page: Page,
  title: string,
  content: string
) {
  await expect(page.getByText(title)).toBeVisible()
  await expect(page.getByText(content)).toBeVisible()
}

/**
 * Assert that submit button is disabled
 */
export async function expectSubmitDisabled(page: Page) {
  const submitButton = page.locator('button[type="submit"]')
  await expect(submitButton).toBeDisabled()
}

/**
 * Assert that submit button is enabled
 */
export async function expectSubmitEnabled(page: Page) {
  const submitButton = page.locator('button[type="submit"]')
  await expect(submitButton).toBeEnabled()
}
