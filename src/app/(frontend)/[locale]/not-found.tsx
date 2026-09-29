import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold">{t('title')}</h1>
      <p className="text-muted">{t('text')}</p>
      <p>
        <Link href="/" className="text-accent underline underline-offset-4">
          {t('back')}
        </Link>
      </p>
    </section>
  )
}
