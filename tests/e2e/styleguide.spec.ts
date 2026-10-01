import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Styleguide', () => {
  // Umfangreiche Seite (WebGL, viele Komponenten) – im Dev-Server dauert der erste Aufruf länger.
  test.describe.configure({ timeout: 90_000 })

  test.beforeEach(async ({ page }) => {
    await page.goto('/de/styleguide')
  })

  test('zeigt alle Abschnitte, Hausschrift und ist nicht indexierbar', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Designsystem')
    await expect(page.locator('section[id]')).toHaveCount(14)
    for (const hex of ['#004E5C', '#007F9D', '#E9483D', '#A0CCE0']) {
      await expect(page.getByText(hex, { exact: true }).first()).toBeVisible()
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    const fontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
    expect(fontFamily).toMatch(/lexend/i)
  })

  test('Dialog öffnet modal, schließt per Escape und gibt den Fokus zurück', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Dialog öffnen' })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Rückruf vereinbaren' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('Tabs lassen sich per Pfeiltaste bedienen', async ({ page }) => {
    const first = page.getByRole('tab', { name: 'Überblick' })
    const second = page.getByRole('tab', { name: 'Ablauf' })
    // Bis zur Hydration reagiert der Tab nicht auf Tasten – deshalb wiederholen.
    await expect(async () => {
      await first.click()
      await page.keyboard.press('ArrowRight')
      await expect(second).toHaveAttribute('aria-selected', 'true', { timeout: 1000 })
    }).toPass({ timeout: 20_000 })
    await expect(page.getByRole('tabpanel')).toContainText('Beispieltext Ablauf')
  })

  test('Formularfelder haben Label und verknüpfte Fehlermeldung', async ({ page }) => {
    await expect(page.getByLabel('E-Mail').first()).toBeVisible()
    const invalid = page.locator('input[aria-invalid="true"]')
    await expect(invalid).toHaveAccessibleDescription(/gültige E-Mail-Adresse/)
  })

  test('gibt es nur auf Deutsch', async ({ page }) => {
    const response = await page.goto('/en/styleguide')
    expect(response?.status()).toBe(404)
  })

  test('hat keine Barrierefreiheitsverstöße (WCAG 2.2 AA)', async ({ page }) => {
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
