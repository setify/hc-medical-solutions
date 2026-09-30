import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'
import { findRedirect, type RedirectMap } from './lib/redirects'

const intl = createIntlMiddleware(routing)

function isAuthorized(request: NextRequest, user: string, password: string): boolean {
  const header = request.headers.get('authorization')
  if (!header?.startsWith('Basic ')) return false
  try {
    const [u, ...rest] = atob(header.slice(6)).split(':')
    return u === user && rest.join(':') === password
  } catch {
    return false
  }
}

// Weiterleitungstabelle aus dem CMS, 60 Sekunden im Speicher gehalten.
const REDIRECT_TTL_MS = 60 * 1000
let redirectCache: { map: RedirectMap; at: number } | null = null

async function redirectMap(request: NextRequest): Promise<RedirectMap> {
  if (redirectCache && Date.now() - redirectCache.at < REDIRECT_TTL_MS) return redirectCache.map
  try {
    const res = await fetch(new URL('/next/redirects', request.url), {
      signal: AbortSignal.timeout(2000),
    })
    const map = res.ok ? ((await res.json()) as RedirectMap) : {}
    redirectCache = { map, at: Date.now() }
    return map
  } catch {
    return redirectCache?.map ?? {}
  }
}

export default async function proxy(request: NextRequest) {
  // Staging-Schutz: aktiv, sobald beide Variablen gesetzt sind.
  const user = process.env.STAGING_BASIC_AUTH_USER
  const password = process.env.STAGING_BASIC_AUTH_PASSWORD
  if (user && password && !isAuthorized(request, user, password)) {
    return new NextResponse('Authentifizierung erforderlich', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="HC Staging", charset="UTF-8"' },
    })
  }

  const { pathname } = request.nextUrl
  const isInternal = /^\/(admin|api|next)(\/|$)/.test(pathname)

  // Alte URLs (z. B. der WordPress-Seite) direkt mit einer einzigen 301 weiterleiten.
  if (!isInternal) {
    const hit = findRedirect(await redirectMap(request), pathname)
    if (hit) return NextResponse.redirect(new URL(hit.to, request.url), hit.status)

    // Abschließenden Slash entfernen (ersetzt die eingebaute Next-Weiterleitung, siehe next.config.ts).
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const url = new URL(request.url)
      url.pathname = pathname.replace(/\/+$/, '')
      return NextResponse.redirect(url, 308)
    }
  }

  const response = isInternal ? NextResponse.next() : intl(request)

  if (process.env.SITE_INDEXABLE !== 'true') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return response
}

export const config = {
  // Alles außer Next-Interna und Dateien mit Endung (Bilder, Fonts, robots.txt, sitemap.xml …).
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
