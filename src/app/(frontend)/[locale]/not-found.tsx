import { getLocale, getTranslations } from 'next-intl/server'

import { SiteShell } from '@/components/site/SiteShell'
import { ButtonLink } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'

export default async function NotFound() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations({ locale, namespace: 'NotFound' })

  return (
    <SiteShell locale={locale} current="" alternates={{ de: '', en: '', fr: '' }}>
      <section className="container-page flex flex-col items-start gap-6 py-24 md:py-32">
        <p className="text-small text-muted">404</p>
        <h1 className="text-h1 font-light">{t('title')}</h1>
        <p className="max-w-xl text-lead font-light text-muted">{t('text')}</p>
        <ButtonLink href={`/${locale}`} variant="secondary">
          {t('back')}
        </ButtonLink>
      </section>
    </SiteShell>
  )
}
