/**
 * Inhalte für Entwicklung und E2E-Tests: `pnpm seed` (idempotent), `pnpm seed --reset` (neu anlegen).
 *
 * 1. Seitenstruktur nach „HC Website – Finale Übergabe an Philipp“ (Stand 30.09.2026), nur Deutsch.
 *    Texte wörtlich aus dem Dokument. Unterseiten bisher nur mit Seitenkopf.
 * 2. Testseiten mit EN/FR (Unterseite, Nur Deutsch) für die E2E-Tests von Sprachwechsel und 404.
 */
import 'dotenv/config'

import path from 'path'
import { fileURLToPath } from 'url'

import { getPayload, type Payload } from 'payload'

import { revalidateRunningServer } from '../../scripts/revalidate'
import config from '../payload.config'
import type { Page } from '../payload-types'

type Locale = 'de' | 'en' | 'fr'
type Layout = NonNullable<Page['layout']>
const ctx = { disableRevalidate: true }
const SEED_SLUGS = [
  'start',
  'vorgehensweise',
  'lagerlogistik',
  'qualitaet-regulatory',
  'karriere',
  'kontakt',
  'impressum',
  'datenschutz',
  'unterseite',
  'nur-deutsch',
]
const assetDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'seed-assets')

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
    where: { slug: { in: SEED_SLUGS } },
    locale: 'de',
    limit: 50,
    depth: 0,
  })
  if (existing.totalDocs && !reset) {
    payload.logger.info('Inhalte existieren bereits – mit --reset neu anlegen.')
    return
  }
  for (const doc of existing.docs.sort((a, b) => (b.parent ? 1 : 0) - (a.parent ? 1 : 0))) {
    await payload.delete({ collection: 'pages', id: doc.id, context: ctx })
  }

  const t = (de: string, en: string, fr: string) => ({ de, en, fr })
  const pick = <T>(v: Record<Locale, T>, l: Locale) => v[l]
  const de = (v: string) => ({ de: v })
  const pageLink = (page: number, label: string) => ({
    link: { type: 'page' as const, page, label },
  })

  /** Bild aus seed-assets in die Mediathek laden (einmalig, danach wiederverwenden). */
  async function media(file: string, alt: string): Promise<number> {
    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: file } },
      limit: 1,
      depth: 0,
    })
    if (found.docs[0]) return found.docs[0].id
    const doc = await payload.create({
      collection: 'media',
      locale: 'de',
      data: { alt },
      filePath: path.join(assetDir, file),
    })
    return doc.id
  }

  // ── Seitenstruktur (nur Deutsch, Texte aus der finalen Übergabe vom 30.09.2026) ──────────

  const contactId = await createPage(payload, {
    slug: de('kontakt'),
    title: de('Kontakt'),
    layout: () => [
      {
        blockType: 'contactForm',
        // Anliegen und Einwilligungstext sind Platzhalter, bis HC sie liefert.
        topics: [{ label: 'Allgemeine Anfrage' }, { label: 'Einkaufspotenzial prüfen' }],
        privacyText: 'Ich habe die Datenschutzhinweise gelesen.',
      },
    ],
  })

  const approachId = await createPage(payload, {
    slug: de('vorgehensweise'),
    title: de('Vorgehensweise'),
    layout: () => [
      {
        blockType: 'hero',
        variant: 'light',
        title: 'Unsere Vorgehensweise',
        lead: 'Wir begleiten Sie in fünf Schritten – von der Analyse Ihres Produktportfolios bis zur laufenden Versorgung.',
      },
    ],
  })

  const logisticsId = await createPage(payload, {
    slug: de('lagerlogistik'),
    title: de('Lagerlogistik'),
    layout: () => [
      {
        blockType: 'hero',
        variant: 'light',
        title: 'Unsere Lagerlogistik',
        lead: 'Verfügbarkeit entsteht nicht erst beim Versand. Sie beginnt mit kontrollierten Wareneingängen, sauberen Beständen und nachvollziehbaren Warenbewegungen.',
      },
    ],
  })

  const qualityId = await createPage(payload, {
    slug: de('qualitaet-regulatory'),
    title: de('Qualität & Regulatory'),
    layout: () => [
      {
        blockType: 'hero',
        variant: 'light',
        title: 'Qualität & Regulatory',
        lead: 'Originalprodukte. Nachvollziehbare Dokumentation. Definierte Prozesse.',
      },
    ],
  })

  const careerId = await createPage(payload, {
    slug: de('karriere'),
    title: de('Karriere'),
    layout: () => [
      {
        blockType: 'hero',
        variant: 'light',
        title: 'Arbeiten bei HC',
        lead: 'Du willst mitdenken, gestalten und Verantwortung übernehmen? Bei HC bekommst Du kurze Wege und den Freiraum, Deine Ideen einzubringen.',
      },
      {
        blockType: 'jobList',
        title: 'Offene Stellen',
        intro:
          'Bei HC gibt es Aufgaben in Vertrieb, Einkauf, Customer Service, Regulatory Affairs, Qualitätsmanagement, Controlling, Digitalisierung und Logistik. Unsere aktuell offenen Positionen findest Du unten. Wenn gerade nichts Passendes dabei ist, kannst Du Dich auch initiativ bewerben.',
      },
    ],
  })

  const imprintId = await createPage(payload, { slug: de('impressum'), title: de('Impressum') })
  const privacyId = await createPage(payload, { slug: de('datenschutz'), title: de('Datenschutz') })

  const michael = await media(
    'michael-trick.jpg',
    'Michael Trick, Geschäftsführer und Gründer von HC',
  )
  const bernhard = await media('bernhard-trick.jpg', 'Bernhard Trick, Mitgründer von HC')
  // Platzhalterbilder (neutrale Motive in Markenblau), bis HC eigene Fotos liefert.
  const imgEconomy = await media('platzhalter-beratung.webp', 'Besprechung am Tisch mit Unterlagen')
  const imgSupply = await media('platzhalter-versorgung.webp', 'Straße durch ein weites Tal')

  const homeId = await createPage(payload, {
    slug: de('start'),
    title: de('Startseite'),
    layout: () => [
      {
        blockType: 'hero',
        variant: 'lines',
        eyebrow: 'Taking Partnership to the Next Level',
        title: 'Der zweite Kanal zum Original.',
        titleHighlight: 'zum Original.',
        visual: 'channels',
        visualTags: [
          { label: 'Einsparpotenzial' },
          { label: 'Warenverfügbarkeit' },
          { label: 'Rückverfolgbarkeit' },
        ],
        lead: 'HC eröffnet Krankenhäusern und medizinischen Einrichtungen einen zusätzlichen, unabhängigen Beschaffungskanal für Original-Medizinprodukte – mit Einsparpotenzialen, verlässlicher Versorgung und dokumentierter Rückverfolgbarkeit.',
        actions: [
          pageLink(contactId, 'Einkaufspotenzial prüfen'),
          pageLink(approachId, 'Unsere Vorgehensweise'),
        ],
        quickLinks: [
          pageLink(approachId, 'Vorgehensweise'),
          pageLink(logisticsId, 'Lagerlogistik'),
          pageLink(qualityId, 'Qualität & Regulatory'),
        ],
      },
      {
        blockType: 'columns',
        layout: 'alternating',
        items: [
          {
            title: 'Wirtschaftlichkeit ohne Produktwechsel',
            text: 'Wir prüfen gemeinsam, bei welchen Original-Medizinprodukten ein Bezug über HC wirtschaftlich sinnvoll ist.\nSo können Sie sparen, ohne auf ein anderes Produkt umzustellen.',
            highlight: 'Ein guter Preis bringt Ihnen nur etwas, wenn die Ware auch verfügbar ist.',
            image: imgEconomy,
          },
          {
            title: 'Versorgung im Blick',
            image: imgSupply,
            text: 'Unser Auftrag endet nicht mit der ersten Lieferung.\nFür vereinbarte Produkte bauen wir Lagerbestände auf und behalten Verfügbarkeit, tatsächlichen Bedarf und Rotation im Blick. Verändert sich der Bedarf oder die Lieferlage, sprechen wir Abweichungen früh an und stimmen die nächsten Schritte mit Ihnen ab.',
          },
        ],
      },
      {
        blockType: 'features',
        title: 'Warum HC?',
        items: [
          {
            icon: 'original',
            title: 'Originalprodukte',
            text: 'Wir liefern ausschließlich Original-Medizinprodukte namhafter Hersteller.',
          },
          {
            icon: 'savings',
            title: 'Einsparpotenzial',
            text: 'Wir prüfen, bei welchen Originalprodukten ein Bezug über HC wirtschaftlich sinnvoll ist.',
          },
          {
            icon: 'stock',
            title: 'Warenverfügbarkeit',
            text: 'Wir halten vereinbarte Bestände vor und steuern sie laufend nach, um Ihre Versorgung verlässlich abzusichern.',
          },
          {
            icon: 'transparency',
            title: 'Transparenz',
            text: 'Wöchentlicher Order Status und HC-Cloud geben Ihnen einen Überblick über Bestände, offene Bestellungen und voraussichtliche Liefertermine.',
          },
          {
            icon: 'traceability',
            title: 'Rückverfolgbarkeit',
            text: 'Produkt-, Chargen- und Lieferinformationen werden nachvollziehbar dokumentiert.',
          },
        ],
        cta: {
          enabled: true,
          title: 'Der zweite Kanal zum Original.',
          link: { type: 'page' as const, page: contactId, label: 'Einkaufspotenzial prüfen' },
        },
      },
      {
        blockType: 'statement',
        tone: 'teal',
        title: 'Mehr als ein guter Preis',
        text: 'Wirtschaftlichkeit, Versorgungssicherheit und Prozesssicherheit gehören für uns zusammen.\nDeshalb verbinden wir Einsparpotenziale bei Originalprodukten mit Bestandssteuerung, transparenter Information, Rückverfolgbarkeit und definierten Qualitäts- und Regulatory-Prozessen.',
        tags: [
          { label: 'Wirtschaftlichkeit' },
          { label: 'Versorgungssicherheit' },
          { label: 'Prozesssicherheit' },
        ],
      },
      {
        blockType: 'statement',
        tone: 'plain',
        title: 'Unsere Expertise',
        text: 'Seit 2019 handeln und distribuieren wir Original-Medizinprodukte für Krankenhäuser und weitere medizinische Einrichtungen.\nFür Sie bündeln wir kommerzielle, regulatorische und operative Erfahrung. Vertrieb und strategischer Einkauf arbeiten eng mit Customer Service, Qualitätsmanagement, Regulatory Affairs, Controlling, Digitalisierung und Logistik zusammen.\nSo können wir Einsparpotenziale realistisch bewerten, Ihre Versorgung im Alltag begleiten und Qualitäts- und Regulatory-Anforderungen berücksichtigen.',
        tags: [
          'Vertrieb',
          'Strategischer Einkauf',
          'Customer Service',
          'Qualitätsmanagement',
          'Regulatory Affairs',
          'Controlling',
          'Digitalisierung',
          'Logistik',
        ].map((label) => ({ label })),
      },
      {
        // Zahlen aus den Texten abgeleitet; Beschriftungen sind ein Vorschlag zur Freigabe durch HC.
        blockType: 'stats',
        items: [
          { value: 2019, plain: true, label: 'Gründung von HC' },
          { value: 25, suffix: '+', label: 'Jahre im Healthcare-Bereich' },
          { value: 40, suffix: '+', label: 'Jahre Erfahrung aus Einkauf und Vertrieb' },
          { value: 8, label: 'Fachbereiche arbeiten eng zusammen' },
        ],
      },
      {
        blockType: 'team',
        members: [
          {
            name: 'Michael Trick',
            role: 'Geschäftsführer & Gründer',
            image: michael,
            bio: 'Michael Trick hat HC 2019 gegründet und aufgebaut. Als Geschäftsführer und Inhaber gestaltet er die strategische Entwicklung des Unternehmens.\nSeit mehr als 25 Jahren arbeitet er im Healthcare-Bereich. Auch heute ist er regelmäßig selbst bei Kunden – die Nähe zum Markt gehört für ihn zur Unternehmensführung.',
            quote:
              'Mir ist wichtig, Dinge klar anzusprechen, Entscheidungen zu treffen und Verantwortung für das Ergebnis zu übernehmen. Nicht jede Lösung passt zu jedem Kunden. Wenn etwas nicht passt, sollte man das offen sagen. Gibt es einen besseren Weg, möchte ich ihn finden.',
          },
          {
            name: 'Bernhard Trick',
            role: 'Mitgründer & Vertrieb',
            image: bernhard,
            bio: 'Bernhard Trick bringt mehr als 40 Jahre Erfahrung aus Einkauf und Vertrieb mit. Viele Jahre war er als Einkaufsleiter und Prokurist tätig und kennt professionelle Beschaffung aus eigener Praxis.\nBei HC unterstützt er insbesondere die Ansprache neuer Kunden und den Aufbau von Geschäftsbeziehungen.',
          },
        ],
      },
      {
        blockType: 'callToAction',
        variant: 'dark',
        title: 'Taking Partnership to the Next Level',
        link: { type: 'page' as const, page: contactId, label: 'Einkaufspotenzial prüfen' },
      },
    ],
  })

  // ── Testseiten für E2E (mit Übersetzungen, nicht in der Navigation) ──────────────────────

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

  await createPage(payload, {
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

  await payload.updateGlobal({
    slug: 'settings',
    context: ctx,
    data: {
      homePage: homeId,
      // Aus dem bisherigen Impressum – von HC zu bestätigen.
      organization: {
        name: 'HC-Healthcare Consulting GmbH',
        street: 'Akkermanstraße 6',
        postalCode: '73035',
        city: 'Göppingen',
        country: 'Deutschland',
        phone: '+49 2236 322 09 91',
        email: 'service@hc-medical-solutions.com',
      },
      contactRecipient: 'anfragen@hc-test.local',
      joinWidgetToken: process.env.JOIN_WIDGET_TOKEN || null,
      joinCompanyUrl: 'https://join.com/companies/hc-consulting',
      matomoUrl: 'https://a.hc-medical-solutions.eu/',
      matomoSiteId: '3',
      matomoRespectDnt: true,
    },
  })

  // Navigation und Footer bisher nur auf Deutsch – ohne Übersetzung werden Punkte ausgeblendet.
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'de',
    context: ctx,
    data: {
      items: [
        { ...pageLink(approachId, 'Vorgehensweise'), children: [] },
        { ...pageLink(logisticsId, 'Lagerlogistik'), children: [] },
        { ...pageLink(qualityId, 'Qualität & Regulatory'), children: [] },
        { ...pageLink(careerId, 'Karriere'), children: [] },
      ],
      cta: { enabled: true, ...pageLink(contactId, 'Einkaufspotenzial prüfen') },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'de',
    context: ctx,
    data: {
      columns: [
        {
          title: 'Leistungen',
          links: [
            pageLink(approachId, 'Vorgehensweise'),
            pageLink(logisticsId, 'Lagerlogistik'),
            pageLink(qualityId, 'Qualität & Regulatory'),
          ],
        },
        {
          title: 'Unternehmen',
          links: [pageLink(careerId, 'Karriere'), pageLink(contactId, 'Kontakt')],
        },
      ],
      legalLinks: [pageLink(imprintId, 'Impressum'), pageLink(privacyId, 'Datenschutz')],
    },
  })

  payload.logger.info('Seitenstruktur und Testseiten angelegt.')
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
