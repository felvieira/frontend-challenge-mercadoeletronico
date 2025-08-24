import { test, expect } from '@playwright/test'

test('loads order details page', async ({ page }) => {
  await page.goto('/orders/1')
  
  await expect(page.getByText('Pre-Order')).toBeVisible()
  await expect(page.getByText('Need to confirm')).toBeVisible()
  await expect(page.getByText('4510001114')).toBeVisible()
})

test('navigates back to orders list', async ({ page }) => {
  await page.goto('/orders/1')
  
  await page.click('text=Back to Orders')
  await expect(page).toHaveURL('/orders')
})