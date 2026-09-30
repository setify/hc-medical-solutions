import { revalidatePath, revalidateTag } from 'next/cache'

// Sofort ablaufen lassen. Das Profil 'max' würde einmal noch den alten Stand ausliefern (stale-while-revalidate).
const NOW = { expire: 0 }

import { previewToken } from '@/lib/preview'

/**
 * Leert den Seiten-Cache nach Änderungen außerhalb des CMS (z. B. Seed- oder Import-Skripte).
 * Abgesichert über ein aus PAYLOAD_SECRET abgeleitetes Token.
 */
export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  if (token !== previewToken('revalidate-all'))
    return new Response('Nicht erlaubt', { status: 401 })
  for (const tag of ['pages', 'globals', 'redirects', 'join-jobs']) revalidateTag(tag, NOW)
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true })
}
