import { createHash, createHmac, timingSafeEqual } from 'crypto'

/*
 * Spamschutz ohne Drittanbieter:
 * 1. Honeypot-Feld (für Menschen unsichtbar), 2. signierte Zeitsperre (zu schnell/zu alt = Bot),
 * 3. einfaches Rate-Limit je gehashter IP (nur im Arbeitsspeicher, keine Speicherung).
 */

const MIN_MS = 3_000
const MAX_MS = 2 * 60 * 60 * 1000

function sign(value: string): string {
  return createHmac('sha256', process.env.PAYLOAD_SECRET || '')
    .update(`contact:${value}`)
    .digest('hex')
}

/** Token für das versteckte Feld: "<zeitstempel>.<signatur>". */
export function createFormToken(now = Date.now()): string {
  return `${now}.${sign(String(now))}`
}

export function checkFormToken(
  token: string | null | undefined,
  now = Date.now(),
): 'ok' | 'invalid' | 'tooFast' | 'expired' {
  const [ts, sig] = String(token ?? '').split('.')
  if (!ts || !sig) return 'invalid'
  const expected = Buffer.from(sign(ts))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid'
  const age = now - Number(ts)
  if (!Number.isFinite(age) || age < 0) return 'invalid'
  if (age < MIN_MS) return 'tooFast'
  if (age > MAX_MS) return 'expired'
  return 'ok'
}

const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

/** true = Anfrage erlaubt. IP wird nur gehasht und nur im Speicher dieser Instanz gehalten. */
export function allowRequest(ip: string, now = Date.now()): boolean {
  const key = createHash('sha256').update(ip).digest('hex').slice(0, 16)
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

/** Nur für Tests. */
export function resetRateLimit() {
  hits.clear()
}
