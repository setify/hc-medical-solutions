import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/cms'
import { normalizePath, type RedirectMap } from '@/lib/redirects'

// Route selbst dynamisch; die Daten sind per Tag `redirects` gecacht und werden per Hook invalidiert.
export const dynamic = 'force-dynamic'

/** Liefert die Weiterleitungstabelle für den Proxy (gecacht, Tag `redirects`). */
const loadMap = unstable_cache(
  async (): Promise<RedirectMap> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'redirects', limit: 5000, depth: 1 })
    const map: RedirectMap = {}
    for (const r of docs) {
      let to = ''
      if (r.to?.type === 'reference' && typeof r.to.reference?.value === 'object') {
        const page = r.to.reference.value as { path?: string | null }
        to = `/de${page.path ?? ''}`
      } else if (r.to?.url) {
        to = r.to.url
      }
      if (r.from && to) map[normalizePath(r.from)] = { to, status: r.type === '302' ? 302 : 301 }
    }
    return map
  },
  ['redirect-map'],
  { tags: ['redirects'] },
)

export async function GET() {
  try {
    return Response.json(await loadMap())
  } catch {
    return Response.json({})
  }
}
