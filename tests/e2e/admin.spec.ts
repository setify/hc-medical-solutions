import { expect, test } from '@playwright/test'

test('CMS ist erreichbar und zeigt Login bzw. Ersteinrichtung', async ({ page }) => {
  // Erster Aufruf kompiliert das Admin-Panel im Dev-Modus – großzügiges Timeout.
  test.setTimeout(120_000)
  await page.goto('/admin', { waitUntil: 'commit' })
  await expect(page).toHaveURL(/\/admin\/(login|create-first-user)/, { timeout: 90_000 })
  await expect(page.locator('input[name="email"]').first()).toBeVisible({ timeout: 30_000 })
})
