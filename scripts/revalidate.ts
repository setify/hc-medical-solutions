import { previewToken } from '../src/lib/preview'

/** Ruft den Revalidierungs-Endpunkt des laufenden Servers auf (falls erreichbar). */
export async function revalidateRunningServer(): Promise<boolean> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${base}/next/revalidate?token=${previewToken('revalidate-all')}`, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
    })
    return res.ok
  } catch {
    return false
  }
}
