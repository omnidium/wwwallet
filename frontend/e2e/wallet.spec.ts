import { test, expect } from '@playwright/test'

// Covers the app's core, novel path: a fully client-side encrypted vault with
// no server-side account concept. Deliberately doesn't require the backend to
// be reachable — account-detail page balance fetches are allowed to fail
// (caught and toasted, not asserted on here) since that's provider/API-key
// dependent and orthogonal to what this test verifies.

const PASSPHRASE = 'a reasonably long test passphrase 123'
const KEYSTORE_PASSWORD = 'keystore-password-1'

// The real quick-unlock methods (WebAuthn passkey / TOTP) can't be driven
// through a headless browser without a virtual authenticator, so these tests
// deliberately skip setup — exercising the recovery-passphrase-only path,
// which the app must always support as documented in the skip-warning dialog.
async function createVaultSkippingQuickUnlock(page: import('@playwright/test').Page) {
  await page.getByRole('textbox', { name: 'Recovery passphrase', exact: true }).fill(PASSPHRASE)
  await page.getByRole('textbox', { name: 'Confirm recovery passphrase' }).fill(PASSPHRASE)
  await page.getByRole('button', { name: 'Create vault' }).click()

  await expect(page.getByRole('button', { name: 'Done' })).toBeVisible()
  await page.getByRole('button', { name: 'Done' }).click()

  // Neither passkey nor TOTP was set up — confirm the skip-warning dialog.
  await expect(page.getByRole('button', { name: 'Continue anyway' })).toBeVisible()
  await page.getByRole('button', { name: 'Continue anyway' }).click()
  await expect(page).toHaveURL(/\/$/)
}

test('create a vault, add a wallet, and confirm it survives a reload', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/vault\/setup$/)

  await createVaultSkippingQuickUnlock(page)

  await page.getByRole('link', { name: 'Add account' }).click()
  await expect(page).toHaveURL(/\/accounts\/new$/)

  await page.getByRole('textbox', { name: 'Label' }).fill('E2E Test Wallet')
  await page.getByRole('textbox', { name: 'Keystore password', exact: true }).fill(KEYSTORE_PASSWORD)
  await page.getByRole('textbox', { name: 'Confirm keystore password' }).fill(KEYSTORE_PASSWORD)
  await page.getByRole('button', { name: 'Add account' }).click()

  await expect(page).toHaveURL(/\/$/)
  const accountLink = page.getByRole('link', { name: /E2E Test Wallet/ })
  await expect(accountLink).toBeVisible()

  // Reload: the vault must lock (session key is memory-only) and require the passphrase again.
  await page.reload()
  await expect(page).toHaveURL(/\/vault\/unlock$/)

  await page.getByRole('textbox', { name: 'Recovery passphrase' }).fill(PASSPHRASE)
  await page.getByRole('button', { name: 'Unlock' }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('link', { name: /E2E Test Wallet/ })).toBeVisible()
})

test('rejects the wrong passphrase on unlock', async ({ page }) => {
  await page.goto('/')
  await createVaultSkippingQuickUnlock(page)

  await page.reload()
  await expect(page).toHaveURL(/\/vault\/unlock$/)

  await page.getByRole('textbox', { name: 'Recovery passphrase' }).fill('definitely the wrong passphrase')
  await page.getByRole('button', { name: 'Unlock' }).click()

  // Still locked — the wrong passphrase must not unlock the vault.
  await expect(page).toHaveURL(/\/vault\/unlock$/)
})

test('account detail page shows send/receive/swap/transactions actions', async ({ page }) => {
  await page.goto('/')
  await createVaultSkippingQuickUnlock(page)

  await page.getByRole('link', { name: 'Add account' }).click()
  await expect(page).toHaveURL(/\/accounts\/new$/)
  await page.getByRole('textbox', { name: 'Label' }).fill('E2E Test Wallet')
  await page.getByRole('textbox', { name: 'Keystore password', exact: true }).fill(KEYSTORE_PASSWORD)
  await page.getByRole('textbox', { name: 'Confirm keystore password' }).fill(KEYSTORE_PASSWORD)
  await page.getByRole('button', { name: 'Add account' }).click()
  await expect(page).toHaveURL(/\/$/)

  await page.getByRole('link', { name: /E2E Test Wallet/ }).click()
  await expect(page.getByRole('link', { name: 'Send crypto' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Receive crypto' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Swap' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Transactions' })).toBeVisible()
})
