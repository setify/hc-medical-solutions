import type { Setting } from '@/payload-types'

/** JSON-LD für die Organisation (Startseite). */
export function organizationJsonLd(settings: Setting, baseUrl: string) {
  const org = settings.organization
  if (!org?.name) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/hc-logo-quer-hausfarbe.svg`,
    email: org.email || undefined,
    telephone: org.phone || undefined,
    address:
      org.street || org.city
        ? {
            '@type': 'PostalAddress',
            streetAddress: org.street || undefined,
            postalCode: org.postalCode || undefined,
            addressLocality: org.city || undefined,
            addressCountry: org.country || undefined,
          }
        : undefined,
  }
}

/** JSON-LD Breadcrumbs aus den Nested-Docs-Breadcrumbs einer Seite. */
export function breadcrumbJsonLd(
  crumbs: { label?: string | null; url?: string | null }[] | null | undefined,
  baseUrl: string,
  locale: string,
) {
  const items = (crumbs ?? []).filter((c) => c.label && c.url)
  if (items.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${baseUrl}/${locale}${c.url}`,
    })),
  }
}

/** Sicheres Einbetten von JSON-LD (verhindert einen Ausbruch aus dem <script>-Tag). */
export function jsonLdScript(data: object | null) {
  if (!data) return null
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}
