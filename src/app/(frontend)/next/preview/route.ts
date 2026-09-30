import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { previewToken } from '@/lib/preview'

/** Aktiviert die Entwurfsvorschau – nur mit gültigem Token aus dem CMS. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') ?? ''
  const token = searchParams.get('token') ?? ''

  if (!path.startsWith('/') || path.startsWith('//') || token !== previewToken(path)) {
    return new Response('Ungültiger Vorschau-Link', { status: 401 })
  }
  ;(await draftMode()).enable()
  redirect(path)
}
