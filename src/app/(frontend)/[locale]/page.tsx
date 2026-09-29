import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/i18n/routing'
import { buildAlternates } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return {
    title: { absolute: t('homeTitle') },
    description: t('homeDescription'),
    alternates: buildAlternates(baseUrl, locale),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      siteName: t('siteName'),
      locale,
      type: 'website',
    },
  }
}

/** Statische Platzhalter-Startseite bis Design und Inhalte freigegeben sind. */
export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Home')

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-24 sm:px-6 sm:py-32">
      <p className="text-sm font-medium tracking-widest text-accent uppercase">{t('eyebrow')}</p>
      <h1 className="max-w-3xl text-4xl leading-tight font-semibold text-balance sm:text-5xl">
        {t('title')}
      </h1>
      <p className="max-w-2xl text-lg text-muted">{t('text')}</p>
    </section>
  )
}
