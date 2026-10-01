import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Startseite: Deutsch aus dem CMS (pnpm seed); EN/FR zeigen bis zur Übersetzung den Platzhalter.
const locales = [
  { code: 'de', heading: 'Der zweite Kanal zum Original.' },
  { code: 'en', heading: 'The new HC Medical Solutions website is on its way.' },
  { code: 'fr', heading: 'Le nouveau site de HC Medical Solutions est en cours de création.' },
] as const

test('Startseite "/" leitet auf /de um', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/de$/)
})

for (const { code, heading } of locales) {
  test(`/${code} rendert in der richtigen Sprache mit hreflang`, async ({ page }) => {
    await page.goto(`/${code}`)
    await expect(page.locator('html')).toHaveAttribute('lang', code)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)

    for (const alt of ['de', 'en', 'fr', 'x-default']) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${alt}"]`)).toHaveCount(1)
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`/${code}$`),
    )
  })
}

test('Sprachwechsel bleibt auf der Seite', async ({ page }) => {
  await page.goto('/de')
  await page.getByRole('link', { name: 'Français' }).first().click()
  await expect(page).toHaveURL(/\/fr$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
})

test('Unbekannte Seite liefert 404 mit lokalisierter Meldung', async ({ page }) => {
  const response = await page.goto('/en/gibt-es-nicht')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
})

test('Staging ist von der Indexierung ausgeschlossen', async ({ page, request }) => {
  const response = await page.goto('/de')
  expect(response?.headers()['x-robots-tag']).toContain('noindex')
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('Disallow: /')
})

for (const { code } of locales) {
  test(`/${code} hat keine Barrierefreiheitsverstöße (WCAG 2.2 AA)`, async ({ page }) => {
    await page.goto(`/${code}`)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
      ),
    ).toEqual([])
  })
}
