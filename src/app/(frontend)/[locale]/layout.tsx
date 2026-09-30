import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import { Matomo } from '@/components/site/Matomo'
import { SkipLink } from '@/components/SkipLink'
import { lexendDeca } from '@/fonts'
import { routing } from '@/i18n/routing'
import { getGlobals } from '@/lib/cms'

import '../globals.css'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'Common' })

  // Matomo nur in Produktion (SITE_INDEXABLE) oder ausdrücklich aktiviert – nie auf Staging.
  const trackingEnabled =
    process.env.SITE_INDEXABLE === 'true' || process.env.MATOMO_ENABLED === 'true'
  const settings = trackingEnabled ? (await getGlobals(locale).catch(() => null))?.settings : null
  const matomo =
    settings?.matomoUrl && settings.matomoSiteId
      ? {
          url: settings.matomoUrl,
          siteId: settings.matomoSiteId,
          respectDnt: settings.matomoRespectDnt !== false,
        }
      : null

  return (
    // suppressHydrationWarning: Browser-Erweiterungen (z. B. LanguageTool, Grammarly) setzen
    // Attribute auf <html>/<body>, bevor React hydriert. Gilt nur für diese beiden Elemente.
    <html lang={locale} className={lexendDeca.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <NextIntlClientProvider>
          <SkipLink label={t('skipToContent')} />
          {children}
          {matomo ? <Matomo {...matomo} /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
