import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

/*
 * Voraussetzung: `pnpm seed` (Testseiten) und lokale Supabase inkl. Mailpit (Port 55424).
 * Die Stellenliste nutzt echte JOIN-Daten, sofern JOIN_FIXTURE nicht gesetzt ist.
 */

/** Öffnet das Kontaktformular und wartet Token + Zeitsperre (3 s) ab. */
async function openContactForm(page: Page) {
  await page.goto('/de/kontakt')
  await expect(page.locator('input[name="token"]')).not.toHaveValue('', { timeout: 20000 })
  await page.waitForTimeout(3200)
}

const axe = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

test.describe('Seiten aus dem CMS', () => {
  test('Startseite rendert Hero, Navigation und Footer aus dem CMS', async ({ page }) => {
    await page.goto('/de')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Seiten kommen jetzt aus dem CMS',
    )
    // Auf schmalen Viewports liegt die Navigation im Mobilmenü.
    const menuButton = page.getByRole('button', { name: 'Menü', exact: true })
    if (await menuButton.isVisible()) {
      await menuButton.click()
      await expect(page.getByRole('dialog')).toBeVisible()
    }
    const nav = page.getByRole('navigation', { name: 'Hauptnavigation' }).filter({ visible: true })
    await expect(nav.getByRole('link', { name: 'Karriere' })).toBeVisible()
    if (await menuButton.isVisible()) await page.keyboard.press('Escape')
    await expect(page.getByRole('contentinfo')).toContainText('HC Medical Solutions GmbH')
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(jsonLd).toContain('"Organization"')
  })

  test('Sprachwechsel führt auf den lokalisierten Slug', async ({ page }) => {
    await page.goto('/de/unterseite')
    await page.getByRole('link', { name: 'English' }).first().click()
    await expect(page).toHaveURL(/\/en\/subpage$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
      'href',
      /\/fr\/sous-page$/,
    )
  })

  test('Seite ohne Übersetzung liefert 404 statt Ersatzsprache', async ({ page }) => {
    expect((await page.goto('/de/unterseite/nur-deutsch'))?.status()).toBe(200)
    expect((await page.goto('/en/subpage/nur-deutsch'))?.status()).toBe(404)
  })

  test('Startseite ist nicht doppelt unter ihrem Slug erreichbar', async ({ request }) => {
    const res = await request.get('/de/start', { maxRedirects: 0 })
    expect([301, 308]).toContain(res.status())
    expect(res.headers().location).toMatch(/\/de$/)
  })

  test('Sitemap enthält Seiten aller Sprachen', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    for (const path of ['/de/unterseite', '/en/subpage', '/fr/sous-page', '/de/kontakt']) {
      expect(xml).toContain(path)
    }
  })

  test('Matomo wird lokal nicht geladen', async ({ page }) => {
    const matomo: string[] = []
    page.on('request', (r) => r.url().includes('matomo') && matomo.push(r.url()))
    await page.goto('/de')
    await page.waitForLoadState('networkidle')
    expect(matomo).toEqual([])
  })

  test('Abschließender Slash führt mit einer Weiterleitung zur kanonischen URL', async ({
    request,
  }) => {
    const res = await request.get('/de/kontakt/', { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers().location).toMatch(/\/de\/kontakt$/)
  })

  for (const path of ['/de', '/de/unterseite', '/de/kontakt', '/de/karriere']) {
    test(`${path} hat keine Barrierefreiheitsverstöße`, async ({ page }) => {
      await page.goto(path)
      const results = await axe(page)
      expect(
        results.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
        ),
      ).toEqual([])
    })
  }
})

test.describe('Karriere (JOIN)', () => {
  test('zeigt Stellen im HC-Design ohne Skript von join.com', async ({ page }) => {
    const joinRequests: string[] = []
    page.on('request', (r) => r.url().includes('join.com') && joinRequests.push(r.url()))
    await page.goto('/de/karriere')
    const first = page.locator('article h3 a').first()
    await expect(first).toHaveAttribute('href', /^https:\/\/join\.com\/companies\/hc-consulting\//)
    await expect(first).toHaveAttribute('target', '_blank')
    expect(joinRequests).toEqual([])
  })
})

test.describe('Kontaktformular', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('http://127.0.0.1:55424/api/v1/messages').catch(() => null)
  })

  test('zeigt Feldfehler und setzt den Fokus auf das erste Feld', async ({ page }) => {
    await openContactForm(page)
    await page.getByRole('button', { name: 'Anfrage senden' }).click()
    await expect(
      page.getByRole('alert').filter({ hasText: 'Bitte prüfen Sie die markierten Felder' }),
    ).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Vorname' })).toBeFocused()
    await expect(page.getByRole('textbox', { name: 'Vorname' })).toHaveAccessibleDescription(
      /Feld aus/,
    )
  })

  test('sendet eine gültige Anfrage per E-Mail', async ({ page, request }) => {
    await openContactForm(page)
    await page.getByRole('textbox', { name: 'Vorname' }).fill('Mirjam')
    await page.getByRole('textbox', { name: 'Nachname' }).fill('Aufdermauer')
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('mirjam@example.org')
    await page.getByRole('combobox', { name: 'Anliegen' }).selectOption({ index: 1 })
    await page.getByRole('textbox', { name: 'Nachricht' }).fill('Testanfrage aus der E2E-Suite.')
    await page.getByRole('checkbox', { name: /Datenschutzhinweise/ }).check()
    await page.getByRole('button', { name: 'Anfrage senden' }).click()
    await expect(page.getByRole('status').filter({ hasText: 'Vielen Dank' })).toBeVisible({
      timeout: 15000,
    })

    const mails = await (await request.get('http://127.0.0.1:55424/api/v1/messages')).json()
    expect(mails.total).toBe(1)
    expect(mails.messages[0].Subject).toBe('Kontaktanfrage (DE): Allgemeine Anfrage')
    expect(mails.messages[0].ReplyTo[0].Address).toBe('mirjam@example.org')
  })

  test('verwirft Absenden durch Bots (Honeypot)', async ({ page, request }) => {
    await openContactForm(page)
    await page
      .locator('input[name="website"]')
      .evaluate((el: HTMLInputElement) => (el.value = 'spam'))
    await page.getByRole('textbox', { name: 'Vorname' }).fill('Bot')
    await page.getByRole('textbox', { name: 'Nachname' }).fill('Bot')
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('bot@example.org')
    await page.getByRole('combobox', { name: 'Anliegen' }).selectOption({ index: 1 })
    await page.getByRole('textbox', { name: 'Nachricht' }).fill('Spam')
    await page.getByRole('checkbox', { name: /Datenschutzhinweise/ }).check()
    await page.getByRole('button', { name: 'Anfrage senden' }).click()
    await expect(
      page.getByRole('alert').filter({ hasText: 'konnte nicht gesendet werden' }),
    ).toBeVisible()
    const mails = await (await request.get('http://127.0.0.1:55424/api/v1/messages')).json()
    expect(mails.total).toBe(0)
  })
})
