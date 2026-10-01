import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { SiteShell } from '@/components/site/SiteShell'
import { Tabs } from '@/components/ui/Tabs'
import type { Locale } from '@/i18n/routing'

import { SideBySide, Specimen } from './_components/Specimen'
import { compareFontVariables, variants } from './_lib/fonts'

/**
 * Interne Vergleichsseite für Schriftkombinationen (nur Deutsch, nicht indexiert).
 * Grundlage für die Abstimmung mit HC; die Website nutzt weiterhin Lexend Deca.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'de' }]
}

export const metadata: Metadata = {
  title: 'Schriftvergleich',
  robots: { index: false, follow: false },
}

export default async function FontComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // Interne Seite nur auf Deutsch; dynamicParams allein reicht neben der Catch-all-Route nicht.
  if (locale !== 'de') notFound()
  setRequestLocale(locale)

  return (
    <SiteShell
      locale={locale as Locale}
      current={`/${locale}/schriften`}
      alternates={{ de: '/schriften' }}
    >
      <div className={compareFontVariables}>
        <header className="panel mt-4 bg-surface-muted">
          <div className="container-page grid gap-8 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">Intern · zur Abstimmung mit HC</p>
              <h1 className="text-h1 font-light">Schriftvergleich</h1>
              <p className="max-w-[56ch] text-lead font-light text-muted">
                Drei serifenlose Kombinationen aus Überschrift- und Fließtextschrift, gesetzt mit
                den finalen Texten der Startseite. Umschalten über die Reiter, „Direktvergleich“
                zeigt alle drei nebeneinander.
              </p>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-small">
              {variants.map((v) => (
                <div
                  key={v.id}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
                >
                  <dt className="text-ink">{v.label}</dt>
                  <dd className="text-right text-muted">
                    {v.head.name}
                    {v.head.name !== v.body.name ? ` / ${v.body.name}` : ''}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-caption text-muted lg:col-start-2">
              Alle Schriften unter SIL Open Font License, lokal eingebunden (keine Google Fonts).
            </p>
          </div>
        </header>

        <div className="container-page py-12 md:py-16">
          <Tabs
            tabs={[
              ...variants.map((v) => ({ label: v.label, content: <Specimen v={v} /> })),
              { label: 'Direktvergleich', content: <SideBySide variants={variants} /> },
            ]}
          />
        </div>
      </div>
    </SiteShell>
  )
}
