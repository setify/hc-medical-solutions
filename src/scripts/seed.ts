/**
 * Testinhalte für Entwicklung und E2E-Tests: `pnpm seed` (idempotent), `pnpm seed --reset` (neu anlegen).
 * Legt bewusst KEINE echte Seitenstruktur an – die folgt aus dem Seitenkonzept von HC.
 */
import 'dotenv/config'

import { getPayload, type Payload } from 'payload'

import { revalidateRunningServer } from '../../scripts/revalidate'
import config from '../payload.config'
import type { Page } from '../payload-types'

type Locale = 'de' | 'en' | 'fr'
type Layout = NonNullable<Page['layout']>
const ctx = { disableRevalidate: true }
const TEST_SLUGS = ['start', 'unterseite', 'nur-deutsch', 'kontakt', 'karriere']

/** Minimaler Lexical-Inhalt aus Absätzen. */
function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [
          { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      })),
    },
  }
}

/**
 * Übernimmt IDs aus der bestehenden (deutschen) Struktur – auch in verschachtelten Listen.
 * Sonst ersetzt Payload beim Speichern einer Übersetzung die Einträge der anderen Sprachen.
 */
function withIds<T>(translated: T, current: unknown): T {
  if (Array.isArray(translated)) {
    const cur = Array.isArray(current) ? current : []
    return translated.map((item, i) => withIds(item, cur[i])) as T
  }
  if (translated && typeof translated === 'object') {
    const cur = (current && typeof current === 'object' ? current : {}) as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(translated)) out[k] = withIds(v, cur[k])
    if (typeof cur.id === 'string' && !('id' in out)) out.id = cur.id
    return out as T
  }
  return translated
}

/** Legt eine Seite auf Deutsch an und ergänzt weitere Sprachen mit derselben Struktur. */
async function createPage(
  payload: Payload,
  base: {
    slug: Record<string, string>
    title: Record<string, string>
    parent?: number
    layout?: (l: Locale) => Layout
  },
): Promise<number> {
  const langs = Object.keys(base.title) as Locale[]
  const created = await payload.create({
    collection: 'pages',
    locale: 'de',
    context: ctx,
    data: {
      title: base.title.de!,
      slug: base.slug.de,
      parent: base.parent,
      layout: base.layout?.('de'),
      _status: 'published',
    },
  })
  for (const locale of langs.filter((l) => l !== 'de')) {
    const current = await payload.findByID({
      collection: 'pages',
      id: created.id,
      locale: 'de',
      depth: 0,
    })
    const translated = base.layout?.(locale)
    await payload.update({
      collection: 'pages',
      id: created.id,
      locale,
      context: ctx,
      data: {
        title: base.title[locale]!,
        slug: base.slug[locale],
        // gleiche Struktur, übersetzte Felder: Block-IDs übernehmen
        layout: translated ? withIds(translated, current.layout) : undefined,
        _status: 'published',
      },
    })
  }
  return created.id
}

async function seed() {
  const payload = await getPayload({ config })
  const reset = process.argv.includes('--reset')

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { in: TEST_SLUGS } },
    locale: 'de',
    limit: 50,
    depth: 0,
  })
  if (existing.totalDocs && !reset) {
    payload.logger.info('Testinhalte existieren bereits – mit --reset neu anlegen.')
    return
  }
  for (const doc of existing.docs.sort((a, b) => (b.parent ? 1 : 0) - (a.parent ? 1 : 0))) {
    await payload.delete({ collection: 'pages', id: doc.id, context: ctx })
  }

  const t = (de: string, en: string, fr: string) => ({ de, en, fr })
  const pick = <T>(v: Record<Locale, T>, l: Locale) => v[l]

  const contactId = await createPage(payload, {
    slug: t('kontakt', 'contact', 'contact'),
    title: t('Kontakt (Test)', 'Contact (test)', 'Contact (test)'),
    layout: (l) => [
      {
        blockType: 'contactForm',
        title: pick(t('Schreiben Sie uns', 'Write to us', 'Écrivez-nous'), l),
        intro: pick(
          t(
            'Testformular. Anfragen landen lokal im Mailpit-Postfach.',
            'Test form. Enquiries go to the local Mailpit inbox.',
            'Formulaire de test. Les demandes arrivent dans la boîte Mailpit locale.',
          ),
          l,
        ),
        topics: [
          { label: pick(t('Allgemeine Anfrage', 'General enquiry', 'Demande générale'), l) },
          { label: pick(t('Projektanfrage', 'Project enquiry', 'Demande de projet'), l) },
        ],
        privacyText: pick(
          t(
            'Ich habe die Datenschutzhinweise gelesen.',
            'I have read the privacy notice.',
            'J’ai lu la politique de confidentialité.',
          ),
          l,
        ),
      },
    ],
  })

  const careerId = await createPage(payload, {
    slug: t('karriere', 'careers', 'carriere'),
    title: t('Karriere (Test)', 'Careers (test)', 'Carrière (test)'),
    layout: (l) => [
      {
        blockType: 'jobList',
        title: pick(t('Offene Stellen', 'Open positions', 'Postes ouverts'), l),
        intro: pick(
          t(
            'Live aus JOIN geladen, stündlich aktualisiert.',
            'Loaded live from JOIN, updated hourly.',
            'Chargés en direct depuis JOIN, mis à jour toutes les heures.',
          ),
          l,
        ),
      },
    ],
  })

  const subId = await createPage(payload, {
    slug: t('unterseite', 'subpage', 'sous-page'),
    title: t('Unterseite (Test)', 'Subpage (test)', 'Sous-page (test)'),
    layout: (l) => [
      {
        blockType: 'richText',
        content: richText(
          pick(
            t(
              'Beispielinhalt einer Unterseite.',
              'Example content of a subpage.',
              'Contenu d’exemple d’une sous-page.',
            ),
            l,
          ),
        ),
      },
    ],
  })

  const onlyDeId = await createPage(payload, {
    slug: { de: 'nur-deutsch' },
    title: { de: 'Nur Deutsch (Test)' },
    parent: subId,
    layout: () => [
      {
        blockType: 'richText',
        content: richText('Diese Seite existiert nur auf Deutsch. In EN/FR liefert sie 404.'),
      },
    ],
  })

  const homeId = await createPage(payload, {
    slug: t('start', 'start', 'start'),
    title: t('Startseite (Test)', 'Home (test)', 'Accueil (test)'),
    layout: (l) => [
      {
        blockType: 'hero',
        variant: 'slats',
        eyebrow: pick(t('Testinhalt', 'Test content', 'Contenu de test'), l),
        title: pick(
          t(
            'Seiten kommen jetzt aus dem CMS',
            'Pages now come from the CMS',
            'Les pages viennent désormais du CMS',
          ),
          l,
        ),
        lead: pick(
          t(
            'Platzhalter bis zum Seitenkonzept von HC.',
            'Placeholder until HC’s page concept.',
            'Espace réservé jusqu’au concept de HC.',
          ),
          l,
        ),
        actions: [
          {
            link: {
              type: 'page' as const,
              page: contactId,
              label: pick(t('Kontakt', 'Contact', 'Contact'), l),
            },
          },
          {
            link: {
              type: 'page' as const,
              page: careerId,
              label: pick(t('Karriere', 'Careers', 'Carrière'), l),
            },
          },
        ],
      },
      {
        blockType: 'teaserGrid',
        title: pick(t('Teaser-Raster', 'Teaser grid', 'Grille de teasers'), l),
        items: [
          {
            page: subId,
            text: pick(
              t('Verweis auf eine Unterseite.', 'Link to a subpage.', 'Lien vers une sous-page.'),
              l,
            ),
          },
          {
            page: careerId,
            text: pick(
              t(
                'Offene Stellen aus JOIN.',
                'Open positions from JOIN.',
                'Postes ouverts depuis JOIN.',
              ),
              l,
            ),
          },
        ],
      },
      {
        blockType: 'processSteps',
        title: pick(t('Ablauf', 'Process', 'Processus'), l),
        steps: [
          { title: pick(t('Schritt eins', 'Step one', 'Étape un'), l) },
          { title: pick(t('Schritt zwei', 'Step two', 'Étape deux'), l) },
          { title: pick(t('Schritt drei', 'Step three', 'Étape trois'), l) },
        ],
      },
      {
        blockType: 'faq',
        title: 'FAQ',
        items: [
          {
            question: pick(t('Beispielfrage?', 'Example question?', 'Question d’exemple ?'), l),
            answer: pick(t('Beispielantwort.', 'Example answer.', 'Réponse d’exemple.'), l),
          },
        ],
      },
      {
        blockType: 'callToAction',
        title: pick(t('Handlungsaufforderung', 'Call to action', 'Appel à l’action'), l),
        link: {
          type: 'page' as const,
          page: contactId,
          label: pick(t('Zum Kontakt', 'Get in touch', 'Nous contacter'), l),
        },
      },
    ],
  })

  await payload.updateGlobal({
    slug: 'settings',
    context: ctx,
    data: {
      homePage: homeId,
      organization: { name: 'HC Medical Solutions GmbH' },
      contactRecipient: 'anfragen@hc-test.local',
      joinWidgetToken: process.env.JOIN_WIDGET_TOKEN || null,
      joinCompanyUrl: 'https://join.com/companies/hc-consulting',
      matomoUrl: 'https://a.hc-medical-solutions.eu/',
      matomoSiteId: '3',
      matomoRespectDnt: true,
    },
  })

  for (const locale of ['de', 'en', 'fr'] as Locale[]) {
    const label = (v: Record<Locale, string>) => v[locale]
    const currentNav = await payload.findGlobal({ slug: 'navigation', locale: 'de', depth: 0 })
    await payload.updateGlobal({
      slug: 'navigation',
      locale,
      context: ctx,
      data: withIds(
        {
          items: [
            {
              link: {
                type: 'page' as const,
                page: subId,
                label: label(t('Unterseite', 'Subpage', 'Sous-page')),
              },
              // Struktur gilt für alle Sprachen; ohne Übersetzung der Zielseite wird der Punkt ausgeblendet.
              children: [
                {
                  link: {
                    type: 'page' as const,
                    page: onlyDeId,
                    label: label(t('Nur Deutsch', 'Only German', 'Allemand seulement')),
                  },
                },
              ],
            },
            {
              link: {
                type: 'page' as const,
                page: careerId,
                label: label(t('Karriere', 'Careers', 'Carrière')),
              },
              children: [],
            },
          ],
          cta: {
            enabled: true,
            link: {
              type: 'page' as const,
              page: contactId,
              label: label(t('Kontakt', 'Contact', 'Contact')),
            },
          },
        },
        currentNav,
      ),
    })
    const currentFooter = await payload.findGlobal({ slug: 'footer', locale: 'de', depth: 0 })
    await payload.updateGlobal({
      slug: 'footer',
      locale,
      context: ctx,
      data: withIds(
        {
          columns: [
            {
              title: label(t('Website', 'Website', 'Site')),
              links: [
                {
                  link: {
                    type: 'page' as const,
                    page: careerId,
                    label: label(t('Karriere', 'Careers', 'Carrière')),
                  },
                },
                {
                  link: {
                    type: 'page' as const,
                    page: contactId,
                    label: label(t('Kontakt', 'Contact', 'Contact')),
                  },
                },
              ],
            },
          ],
          legalLinks: [
            {
              link: {
                type: 'page' as const,
                page: subId,
                label: label(t('Impressum (Test)', 'Imprint (test)', 'Mentions légales (test)')),
              },
            },
          ],
        },
        currentFooter,
      ),
    })
  }

  payload.logger.info('Testinhalte angelegt: Start, Unterseite, Nur Deutsch, Kontakt, Karriere.')
  if (await revalidateRunningServer()) payload.logger.info('Cache des laufenden Servers geleert.')
  else
    payload.logger.warn(
      'Kein laufender Server erreichbar – Seiten-Cache kann veraltet sein. Nach dem Start einmal `pnpm seed` erneut ausführen oder den Server neu bauen.',
    )
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
