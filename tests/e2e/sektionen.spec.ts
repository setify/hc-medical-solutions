import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Sektionsbibliothek', () => {
  // Sehr lange Seite mit vielen Animationen – der erste Aufruf dauert im Dev-Server länger.
  test.describe.configure({ timeout: 120_000 })

  test('zeigt alle Kapitel, Variantenkennungen und ist nicht indexierbar', async ({ page }) => {
    await page.goto('/de/sektionen')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sektionsbibliothek')
    await expect(page.locator('main section[id]')).toHaveCount(18)
    for (const code of ['VL1', 'VL9', 'H1', 'U16', 'B7', 'K5', 'R2', 'D15']) {
      await expect(page.locator(`#v-${code.toLowerCase()}`)).toHaveCount(1)
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('gibt es nur auf Deutsch', async ({ page }) => {
    expect((await page.goto('/en/sektionen'))?.status()).toBe(404)
  })

  test('Galerie öffnet die Großansicht und schließt per Escape', async ({ page }) => {
    await page.goto('/de/sektionen#v-g1')
    const first = page.locator('#v-g1 ul button').first()
    await first.click()
    const dialog = page.getByRole('dialog', { name: /Bild:/ })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(dialog).toHaveAccessibleName('Bild: Dokumentation')
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('hat keine Barrierefreiheitsverstöße (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/de/sektionen')
    // Scroll-gesteuerte Einblendungen abschließen, damit Zwischenzustände nicht gemessen werden.
    await page.emulateMedia({ reducedMotion: 'reduce' })
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
