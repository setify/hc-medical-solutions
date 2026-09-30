import { createHmac } from 'crypto'

/** Signiert einen Vorschau-Pfad, damit nur das CMS Entwürfe öffnen kann. */
export function previewToken(path: string): string {
  return createHmac('sha256', process.env.PAYLOAD_SECRET || '')
    .update(`preview:${path}`)
    .digest('hex')
    .slice(0, 32)
}

export function previewUrl(locale: string | undefined, path: string | undefined): string {
  const target = `/${locale || 'de'}${path && path !== '/' ? path : ''}`
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${base}/next/preview?path=${encodeURIComponent(target)}&token=${previewToken(target)}`
}
