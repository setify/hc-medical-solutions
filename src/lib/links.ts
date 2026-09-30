import type { Locale } from '@/i18n/routing'
import type { Document, Page } from '@/payload-types'

/** Struktur des Link-Felds aus src/fields/link.ts. */
export type CmsLink = {
  type?: ('page' | 'document' | 'external') | null
  label: string
  page?: number | Page | null
  document?: number | Document | null
  url?: string | null
  newTab?: boolean | null
}

export type ResolvedLink = { href: string; label: string; external: boolean; newTab: boolean }

/** Wandelt ein CMS-Link-Feld in eine URL der aktuellen Sprache um. */
export function resolveLink(
  link: CmsLink | null | undefined,
  locale: Locale,
  homeId?: number,
): ResolvedLink | null {
  if (!link?.label) return null
  const base = { label: link.label, newTab: Boolean(link.newTab) }

  if (link.type === 'external' && link.url) {
    return { ...base, href: link.url, external: /^https?:\/\//.test(link.url) }
  }
  if (link.type === 'document' && typeof link.document === 'object' && link.document?.url) {
    return { ...base, href: link.document.url, external: false }
  }
  if (typeof link.page === 'object' && link.page) {
    const isHome = link.page.id === homeId
    // Zielseite existiert in dieser Sprache nicht (fallback: false) → Link ausblenden.
    if (!isHome && !link.page.path) return null
    return { ...base, href: `/${locale}${isHome ? '' : link.page.path}`, external: false }
  }
  return null
}
