import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Ship/)
  })

  test('should have Ship heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Ship/i })).toBeVisible()
  })

  test('should have Get Started button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Get Started/i })).toBeVisible()
  })

  test('should navigate to login', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Get Started/i }).click()
    await expect(page).toHaveURL(/login/)
  })
})
