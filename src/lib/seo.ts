import type { Metadata } from 'next'

import { defaultLocale, locales, type Locale } from '@/i18n/routing'

/** Normalisiert einen Pfad ohne Sprachpräfix, z. B. "" | "/" | "karriere" → "" | "" | "/karriere". */
function normalizePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}

export function localizedUrl(baseUrl: string, locale: Locale, path = ''): string {
  return `${baseUrl.replace(/\/+$/, '')}/${locale}${normalizePath(path)}`
}

/**
 * Canonical + hreflang-Alternates für eine Seite, die in allen Sprachen unter
 * demselben Pfad existiert. Sobald Slugs je Sprache abweichen, `paths` je Locale übergeben.
 */
export function buildAlternates(
  baseUrl: string,
  locale: Locale,
  paths: Partial<Record<Locale, string>> | string = '',
): NonNullable<Metadata['alternates']> {
  const pathFor = (l: Locale) => (typeof paths === 'string' ? paths : (paths[l] ?? null))

  const languages: Record<string, string> = {}
  for (const l of locales) {
    const p = pathFor(l)
    if (p !== null) languages[l] = localizedUrl(baseUrl, l, p)
  }
  const defaultPath = pathFor(defaultLocale)
  if (defaultPath !== null)
    languages['x-default'] = localizedUrl(baseUrl, defaultLocale, defaultPath)

  return {
    canonical: localizedUrl(baseUrl, locale, pathFor(locale) ?? ''),
    languages,
  }
}
