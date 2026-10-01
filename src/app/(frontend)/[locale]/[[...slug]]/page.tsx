import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SiteShell } from '@/components/site/SiteShell'
import { locales, type Locale } from '@/i18n/routing'
import {
  getAllPages,
  getGlobals,
  getPage,
  getPageAlternates,
  homePageId,
  segmentsToPath,
} from '@/lib/cms'
import { breadcrumbJsonLd, jsonLdScript, organizationJsonLd } from '@/lib/jsonld'
import { buildAlternates } from '@/lib/seo'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ locale: Locale; slug?: string[] }> }

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  try {
    const pages = await getAllPages()
    return pages.map((p) => ({
      locale: p.locale,
      slug: p.path ? p.path.split('/').filter(Boolean) : [],
    }))
  } catch {
    // Ohne Datenbank (z. B. Build vor der Migration) entstehen Seiten beim ersten Aufruf.
    return locales.map((locale) => ({ locale, slug: [] }))
  }
}

async function load(params: Props['params']) {
  const { locale, slug } = await params
  const path = segmentsToPath(slug)
  const { isEnabled: draft } = await draftMode()
  const [page, globals] = await Promise.all([getPage(locale, path, { draft }), getGlobals(locale)])
  return { locale, path, draft, page, globals, homeId: homePageId(globals.settings) }
}

function ogImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') return undefined
  const media = image as Media
  return media.sizes?.og?.url ?? media.url ?? undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path, page, globals, homeId } = await load(params)

  if (!page) {
    if (path) return {}
    const t = await getTranslations({ locale, namespace: 'Meta' })
    return {
      title: { absolute: t('homeTitle') },
      description: t('homeDescription'),
      alternates: buildAlternates(baseUrl, locale),
    }
  }

  const isHome = page.id === homeId
  const alternates = await getPageAlternates(page.id, isHome)
  const meta = page.meta
  const ogImage = ogImageUrl(meta?.image) ?? ogImageUrl(globals.settings.defaultOgImage)
  const title = meta?.title || page.title

  return {
    title: isHome ? { absolute: title } : title,
    description: meta?.description || undefined,
    alternates: buildAlternates(baseUrl, locale, alternates),
    robots: page.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: meta?.description || undefined,
      locale,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function CmsPage({ params }: Props) {
  const { locale, path, draft, page, globals, homeId } = await load(params)
  setRequestLocale(locale)

  // Startseite ohne gepflegte Seite: Platzhalter, bis Inhalte freigegeben sind.
  if (!page && !path) return <Placeholder locale={locale} />
  if (!page) notFound()

  const isHome = page.id === homeId
  // Startseite nur unter /<sprache> erreichbar, nicht zusätzlich unter ihrem Slug.
  if (isHome && path) permanentRedirect(`/${locale}`)

  const alternates = await getPageAlternates(page.id, isHome)
  const jsonLd = isHome
    ? organizationJsonLd(globals.settings, baseUrl)
    : breadcrumbJsonLd(page.breadcrumbs, baseUrl, locale)
  const script = jsonLdScript(jsonLd)

  return (
    <SiteShell locale={locale} current={`/${locale}${path}`} alternates={alternates}>
      {draft ? (
        <div role="status" className="border-b border-line bg-warning-50 text-warning-700">
          <div className="container-page flex items-center justify-between gap-4 py-2 text-small">
            Vorschau: Entwurf, nicht veröffentlicht.
            <a
              href={`/next/exit-preview?path=${encodeURIComponent(`/${locale}${path}`)}`}
              className="underline underline-offset-4"
            >
              Vorschau beenden
            </a>
          </div>
        </div>
      ) : null}
      {script ? <script type="application/ld+json" dangerouslySetInnerHTML={script} /> : null}
      {page.layout?.[0]?.blockType === 'hero' ? null : (
        // Seitenkopf ohne Hero: helles Panel mit Titel (Kundenvorlage).
        <div className="panel mt-4 bg-surface-muted">
          <div className="container-page py-14 md:py-20">
            <h1 className="max-w-4xl text-h1 font-light">{page.title}</h1>
          </div>
        </div>
      )}
      <RenderBlocks
        blocks={page.layout}
        locale={locale}
        settings={globals.settings}
        homeId={homeId}
      />
    </SiteShell>
  )
}

async function Placeholder({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Home' })
  return (
    <SiteShell locale={locale} current={`/${locale}`} alternates={{ de: '', en: '', fr: '' }}>
      <section className="container-page flex flex-col gap-6 py-24 sm:py-32">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="max-w-3xl text-h1 font-light">{t('title')}</h1>
        <p className="max-w-2xl text-lead font-light text-muted">{t('text')}</p>
      </section>
    </SiteShell>
  )
}
