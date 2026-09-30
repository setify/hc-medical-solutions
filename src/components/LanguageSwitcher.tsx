import { getTranslations } from 'next-intl/server'

import { locales, type Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

/**
 * Sprachwechsel als Linkliste – funktioniert ohne JavaScript.
 * `alternates` enthält die Pfade dieser Seite je Sprache (lokalisierte Slugs);
 * fehlt eine Übersetzung, führt der Link zur Startseite der Sprache.
 */
export async function LanguageSwitcher({
  locale,
  alternates,
  tone = 'dark',
}: {
  locale: Locale
  alternates: Partial<Record<Locale, string>>
  tone?: 'dark' | 'light'
}) {
  const t = await getTranslations({ locale, namespace: 'Common' })

  return (
    <nav aria-label={t('languageSwitcher')}>
      <ul className="flex gap-1 text-sm">
        {locales.map((l) => {
          const isCurrent = l === locale
          const href = `/${l}${alternates[l] ?? ''}`
          return (
            <li key={l}>
              <a
                href={href}
                hrefLang={l}
                lang={l}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'relative inline-block px-1.5 py-2 uppercase transition-colors',
                  isCurrent
                    ? cn(
                        'after:absolute after:inset-x-1.5 after:bottom-0.5 after:h-px',
                        tone === 'dark'
                          ? 'text-ink after:bg-accent'
                          : 'text-white after:bg-blue-200',
                      )
                    : tone === 'dark'
                      ? 'text-muted hover:text-ink'
                      : 'text-petrol-200 hover:text-white',
                )}
              >
                <span aria-hidden="true">{l}</span>
                <span className="sr-only">{t(`languages.${l}`)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
