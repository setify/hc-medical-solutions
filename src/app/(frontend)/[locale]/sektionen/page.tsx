import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { SiteShell } from '@/components/site/SiteShell'
import type { Locale } from '@/i18n/routing'

import { CatalogNav } from './_components/CatalogNav'
import { ChCta, ChFaq, ChNav } from './_components/ChClosing'
import { ChFeatures, ChProcess, ChStats } from './_components/ChFeatures'
import { ChCarousel, ChGallery } from './_components/ChGallery'
import { ChHeadlines } from './_components/ChHeadlines'
import { ChHero } from './_components/ChHero'
import { ChQuotes, ChTeam, ChTrust } from './_components/ChPeople'
import { ChBackgrounds, ChDividers } from './_components/ChSurfaces'
import { ChTemplate } from './_components/ChTemplate'
import { ChImage, ChText } from './_components/ChTextImage'

/**
 * Interne Sektionsbibliothek (nur Deutsch, nicht indexiert): Varianten zur Auswahl mit HC.
 * Alle Texte, Namen, Zitate und Zahlen sind Platzhalter.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'de' }]
}

export const metadata: Metadata = {
  title: 'Sektionsbibliothek',
  robots: { index: false, follow: false },
}

const chapters = [
  { id: 'vorlage', no: '00', label: 'Nach Vorlage', count: 9 },
  { id: 'hero', no: '01', label: 'Hero', count: 9 },
  { id: 'ueberschriften', no: '02', label: 'Überschriften', count: 16 },
  { id: 'text', no: '03', label: 'Text', count: 6 },
  { id: 'bild-text', no: '04', label: 'Bild & Text', count: 7 },
  { id: 'galerien', no: '05', label: 'Galerien', count: 6 },
  { id: 'karussells', no: '06', label: 'Karussells', count: 5 },
  { id: 'leistungen', no: '07', label: 'Leistungen', count: 6 },
  { id: 'ablauf', no: '08', label: 'Ablauf', count: 4 },
  { id: 'kennzahlen', no: '09', label: 'Kennzahlen', count: 3 },
  { id: 'stimmen', no: '10', label: 'Kundenstimmen', count: 5 },
  { id: 'team', no: '11', label: 'Team', count: 4 },
  { id: 'vertrauen', no: '12', label: 'Vertrauen', count: 3 },
  { id: 'faq', no: '13', label: 'FAQ', count: 2 },
  { id: 'aufrufe', no: '14', label: 'Aufrufe & Kontakt', count: 6 },
  { id: 'navigation', no: '15', label: 'Navigation', count: 1 },
  { id: 'hintergruende', no: '16', label: 'Hintergründe', count: 15 },
  { id: 'trenner', no: '17', label: 'Trenner', count: 15 },
]

const total = chapters.reduce((n, c) => n + c.count, 0)

export default async function SectionLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Interne Seite nur auf Deutsch; dynamicParams allein reicht neben der Catch-all-Route nicht.
  if (locale !== 'de') notFound()
  setRequestLocale(locale)

  return (
    <SiteShell
      locale={locale as Locale}
      current={`/${locale}/sektionen`}
      alternates={{ de: '/sektionen' }}
    >
      <header className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">Intern · zur Abstimmung mit HC</p>
          <h1 className="text-display font-light">Sektionsbibliothek</h1>
          <p className="max-w-[56ch] text-lead font-light text-muted">
            {total} Varianten in {chapters.length} Kapiteln. Jede Variante hat eine Kennung (z. B.
            H3, U7, D12), damit wir im Gespräch schnell auswählen können, was auf welche Seite
            kommt.
          </p>
        </div>
        <dl className="grid grid-cols-2 border-t border-line text-small">
          {[
            ['Alte Website', 'rund 12 Sektionstypen'],
            ['Diese Bibliothek', `${total} Varianten`],
            ['Inhalte', 'Platzhalter, Texte liefert HC'],
            ['Gestaltung', 'nach Kundenvorlage: Panels, runde Buttons, Teal'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 border-b border-line py-4 pr-4">
              <dt className="text-caption text-muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </header>
      <CatalogNav chapters={chapters} />
      <ChTemplate />
      <ChHero />
      <ChHeadlines />
      <ChText />
      <ChImage />
      <ChGallery />
      <ChCarousel />
      <ChFeatures />
      <ChProcess />
      <ChStats />
      <ChQuotes />
      <ChTeam />
      <ChTrust />
      <ChFaq />
      <ChCta />
      <ChNav />
      <ChBackgrounds />
      <ChDividers />
    </SiteShell>
  )
}
