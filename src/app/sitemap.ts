import type { MetadataRoute } from 'next'

import type { Locale } from '@/i18n/routing'
import { getAllPages } from '@/lib/cms'
import { localizedUrl } from '@/lib/seo'

/** Alle veröffentlichten, indexierbaren Seiten je Sprache – mit hreflang-Alternativen. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  let pages: Awaited<ReturnType<typeof getAllPages>> = []
  try {
    pages = await getAllPages()
  } catch {
    return []
  }

  const byId = new Map<number, Partial<Record<Locale, string>>>()
  for (const p of pages) byId.set(p.id, { ...byId.get(p.id), [p.locale]: p.path })

  return pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const languages = Object.fromEntries(
        Object.entries(byId.get(p.id) ?? {}).map(([l, path]) => [
          l,
          localizedUrl(baseUrl, l as Locale, path),
        ]),
      )
      return {
        url: localizedUrl(baseUrl, p.locale, p.path),
        lastModified: p.updatedAt,
        alternates: { languages },
      }
    })
}
