import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

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

export default function proxy(request: NextRequest) {
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
  const isCms = pathname.startsWith('/admin') || pathname.startsWith('/api')
  const response = isCms ? NextResponse.next() : intl(request)

  if (process.env.SITE_INDEXABLE !== 'true') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return response
}

export const config = {
  // Alles außer Next-Interna und Dateien mit Endung (Bilder, Fonts, robots.txt, sitemap.xml …).
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
