'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { locales } from '@/i18n/routing'

/** Sprachwechsel als einfache Linkliste: funktioniert ohne JavaScript und bleibt auf der aktuellen Unterseite. */
export function LanguageSwitcher() {
  const t = useTranslations('Common')
  const pathname = usePathname()
  const current = useLocale()

  return (
    <nav aria-label={t('languageSwitcher')}>
      <ul className="flex gap-1 text-sm">
        {locales.map((locale) => {
          const isCurrent = locale === current
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? 'page' : undefined}
                className={`inline-block rounded px-2 py-1 uppercase ${
                  isCurrent ? 'bg-ink text-surface' : 'text-ink hover:bg-line'
                }`}
              >
                <span aria-hidden="true">{locale}</span>
                <span className="sr-only">{t(`languages.${locale}`)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
