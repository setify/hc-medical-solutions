import type { Locale } from '@/i18n/routing'
import { resolveLink, type ResolvedLink } from '@/lib/links'
import type { Navigation } from '@/payload-types'

export type NavItem = ResolvedLink & { children: ResolvedLink[] }

/** Navigation aus dem CMS in aufgelöste Links umwandeln (leere/ungültige Einträge entfallen). */
export function buildNav(nav: Navigation, locale: Locale, homeId?: number): NavItem[] {
  return (nav.items ?? [])
    .map((item) => {
      const link = resolveLink(item.link, locale, homeId)
      if (!link) return null
      const children = (item.children ?? [])
        .map((c) => resolveLink(c.link, locale, homeId))
        .filter((c): c is ResolvedLink => c !== null)
      return { ...link, children }
    })
    .filter((i): i is NavItem => i !== null)
}

/** Aktiv, wenn der aktuelle Pfad dem Link entspricht oder darunter liegt. */
export function isActive(href: string, current: string): boolean {
  if (href === current) return true
  const depth = href.split('/').filter(Boolean).length
  return depth > 1 && current.startsWith(`${href}/`)
}
