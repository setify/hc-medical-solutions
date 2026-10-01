import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { locales, type Locale } from '@/i18n/routing'
import type { Footer, Navigation, Page, Setting } from '@/payload-types'

/*
 * Zentrale Datenschicht für das Frontend (Payload Local API).
 * Veröffentlichte Inhalte werden mit Cache-Tags zwischengespeichert und über
 * Hooks in src/hooks/revalidate.ts invalidiert. Entwürfe (Vorschau) sind nie gecacht.
 */

export const getPayloadClient = () => getPayload({ config: configPromise })

export type Globals = { navigation: Navigation; footer: Footer; settings: Setting }

/** Pfad aus URL-Segmenten, z. B. ['unternehmen', 'vorgehensweise'] → '/unternehmen/vorgehensweise'. */
export function segmentsToPath(segments: string[] | undefined): string {
  const clean = (segments ?? []).map((s) => decodeURIComponent(s).toLowerCase()).filter(Boolean)
  return clean.length ? `/${clean.join('/')}` : ''
}

export const getGlobals = (locale: Locale): Promise<Globals> =>
  unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const [navigation, footer, settings] = await Promise.all([
        payload.findGlobal({ slug: 'navigation', locale, depth: 1 }),
        payload.findGlobal({ slug: 'footer', locale, depth: 1 }),
        payload.findGlobal({ slug: 'settings', locale, depth: 1 }),
      ])
      return { navigation, footer, settings }
    },
    ['globals', locale],
    { tags: ['globals', 'pages'] },
  )()

async function queryPage(locale: Locale, path: string, draft: boolean): Promise<Page | null> {
  const payload = await getPayloadClient()

  if (!path) {
    const settings = await payload.findGlobal({ slug: 'settings', depth: 0 })
    const homeId = typeof settings.homePage === 'object' ? settings.homePage?.id : settings.homePage
    if (!homeId) return null
    const page = await payload
      .findByID({ collection: 'pages', id: homeId, locale, depth: 2, draft, overrideAccess: draft })
      .catch(() => null)
    return page?.title && (draft || page._status === 'published') ? page : null
  }

  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    depth: 2,
    limit: 1,
    draft,
    overrideAccess: draft,
    where: { path: { equals: path } },
  })
  const page = docs[0]
  // fallback: false – ohne Titel existiert die Seite in dieser Sprache nicht.
  return page?.title ? page : null
}

export function getPage(
  locale: Locale,
  path: string,
  { draft = false } = {},
): Promise<Page | null> {
  if (draft) return queryPage(locale, path, true)
  return unstable_cache(() => queryPage(locale, path, false), ['page', locale, path], {
    tags: ['pages', 'globals'],
  })()
}

/** Pfade dieser Seite in allen Sprachen, in denen sie existiert (für hreflang und Sprachumschalter). */
export const getPageAlternates = (pageId: number, isHome: boolean) =>
  unstable_cache(
    async (): Promise<Partial<Record<Locale, string>>> => {
      const payload = await getPayloadClient()
      const result: Partial<Record<Locale, string>> = {}
      // Die Startseite ist in jeder Sprache erreichbar (ohne Übersetzung als Platzhalter).
      if (isHome) return Object.fromEntries(locales.map((l) => [l, ''])) as Record<Locale, string>
      await Promise.all(
        locales.map(async (locale) => {
          const page = await payload
            .findByID({ collection: 'pages', id: pageId, locale, depth: 0 })
            .catch(() => null)
          if (page?.title && page.path) result[locale] = isHome ? '' : page.path
        }),
      )
      return result
    },
    ['page-alternates', String(pageId)],
    { tags: ['pages', `page:${pageId}`] },
  )()

/** Alle veröffentlichten Seiten je Sprache – für generateStaticParams und Sitemap. */
export const getAllPages = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'settings', depth: 0 })
    const homeId = typeof settings.homePage === 'object' ? settings.homePage?.id : settings.homePage
    const entries: {
      locale: Locale
      path: string
      id: number
      noindex: boolean
      updatedAt: string
    }[] = []
    for (const locale of locales) {
      const { docs } = await payload.find({
        collection: 'pages',
        locale,
        depth: 0,
        limit: 1000,
        where: { _status: { equals: 'published' } },
      })
      for (const page of docs) {
        if (!page.title || !page.path) continue
        entries.push({
          locale,
          path: page.id === homeId ? '' : page.path,
          id: page.id,
          noindex: Boolean(page.noindex),
          updatedAt: page.updatedAt,
        })
      }
    }
    return entries
  },
  ['all-pages'],
  { tags: ['pages', 'globals'] },
)

/** Home-ID aus den Einstellungen. */
export function homePageId(settings: Setting): number | undefined {
  const home = settings.homePage
  return typeof home === 'object' ? home?.id : (home ?? undefined)
}
