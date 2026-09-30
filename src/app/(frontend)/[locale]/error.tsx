'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

/** Fehlerseite bei Laufzeitfehlern innerhalb einer Sprache. */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Error')
  return (
    <main
      id="main"
      className="container-page flex flex-1 flex-col items-start gap-6 py-24 md:py-32"
    >
      <h1 className="text-h1 font-light">{t('title')}</h1>
      <p className="max-w-xl text-lead font-light text-muted">{t('text')}</p>
      <Button variant="secondary" onClick={reset}>
        {t('retry')}
      </Button>
    </main>
  )
}
