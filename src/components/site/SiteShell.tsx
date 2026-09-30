import type { ReactNode } from 'react'

import type { Locale } from '@/i18n/routing'
import { getGlobals } from '@/lib/cms'

import { Footer } from './Footer'
import { Header } from './Header'

/** Header + Inhalt + Footer. Wird je Seite gerendert, weil der Sprachumschalter die lokalisierten Pfade der Seite braucht. */
export async function SiteShell({
  locale,
  current,
  alternates,
  children,
}: {
  locale: Locale
  current: string
  alternates: Partial<Record<Locale, string>>
  children: ReactNode
}) {
  const globals = await getGlobals(locale)
  return (
    <>
      <Header locale={locale} globals={globals} current={current} alternates={alternates} />
      <main id="main" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} globals={globals} alternates={alternates} />
    </>
  )
}
