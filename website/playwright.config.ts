import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: process.env.CI ? 'http://localhost:4174' : 'http://localhost:5174',
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },

  /* Chromium-based only: this environment can't install Firefox/WebKit's
   * system deps without sudo. Covers desktop + the mobile viewport this
   * page is optimized for. */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],

  webServer: {
    command: process.env.CI ? 'npm run preview -- --port 4174' : 'npm run dev',
    port: process.env.CI ? 4174 : 5174,
    reuseExistingServer: !process.env.CI,
  },
})
