import { defineConfig, devices } from '@playwright/test'

// Eigener Port, damit parallel laufende Dev-Server (Port 3000) nicht stören.
const port = Number(process.env.E2E_PORT ?? 3100)
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // In CI gegen den Produktions-Build, lokal gegen den Dev-Server.
    command: process.env.CI ? `pnpm start -p ${port}` : `pnpm dev -p ${port}`,
    url: `${baseURL}/de`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
