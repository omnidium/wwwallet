import { test, expect } from '@playwright/test'

test('loads and shows the hero heading', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Your keys.')
})

test('nav links scroll to their section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation').getByRole('link', { name: 'FAQs', exact: true }).click()
  await expect(page.locator('#faqs')).toBeInViewport()
})

test('theme choice persists across reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Settings' }).click()
  await page.getByRole('radio', { name: 'Dark', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('Launch button links out to the wallet app', async ({ page }) => {
  await page.goto('/')
  const launchLink = page.getByRole('link', { name: 'Launch wwwallet' }).first()
  await expect(launchLink).toHaveAttribute('href', /^https?:\/\//)
})
