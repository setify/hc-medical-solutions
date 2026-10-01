import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Schriftvergleich', () => {
  test.describe.configure({ timeout: 90_000 })

  test('zeigt drei Kombinationen und den Direktvergleich, nicht indexierbar', async ({ page }) => {
    await page.goto('/de/schriften')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Schriftvergleich')
    await expect(page.getByRole('tab')).toHaveCount(4)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)

    const tab = page.getByRole('tab', { name: 'C · Technisch & präzise' })
    await expect(async () => {
      await tab.click()
      await expect(tab).toHaveAttribute('aria-selected', 'true', { timeout: 1000 })
    }).toPass({ timeout: 20_000 })
    const family = await page
      .getByRole('tabpanel')
      .locator('.fh')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily)
    expect(family).toMatch(/spaceGrotesk|Space Grotesk/i)
  })

  test('gibt es nur auf Deutsch', async ({ page }) => {
    expect((await page.goto('/en/schriften'))?.status()).toBe(404)
  })

  test('hat keine Barrierefreiheitsverstöße (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/de/schriften')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
      ),
    ).toEqual([])
  })
})
