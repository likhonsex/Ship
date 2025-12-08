import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText(/Sign in/i)).toBeVisible()
  })

  test('should have Google sign in button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('button', { name: /Google/i })).toBeVisible()
  })

  test('should have email input', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByPlaceholder(/email/i)).toBeVisible()
  })

  test('should have password input', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByPlaceholder(/password/i)).toBeVisible()
  })
})
