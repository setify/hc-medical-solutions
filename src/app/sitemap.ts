import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/routing'
import { buildAlternates, localizedUrl } from '@/lib/seo'

/**
 * Grundgerüst: aktuell nur die Startseiten je Sprache.
 * Wird um veröffentlichte Seiten und aktive Stellen aus Payload erweitert.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return locales.map((locale) => {
    const { languages } = buildAlternates(baseUrl, locale)
    return {
      url: localizedUrl(baseUrl, locale),
      alternates: { languages: languages as Record<string, string> },
    }
  })
}
