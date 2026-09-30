/*
 * Weiterleitungen alter URLs (z. B. der WordPress-Seite) auf neue Seiten.
 * Die Tabelle kommt aus der CMS-Collection „Weiterleitungen“ und wird im Proxy ausgewertet,
 * damit Besucher und Suchmaschinen genau eine 301 erhalten.
 */

export type RedirectMap = Record<string, { to: string; status: 301 | 302 }>

/** Vereinheitlicht Pfade: Kleinschreibung, ohne Domain, ohne Query, ohne abschließenden Slash. */
export function normalizePath(input: string): string {
  let path = input.trim()
  try {
    if (/^https?:\/\//i.test(path)) path = new URL(path).pathname
  } catch {
    // ungültige URL – als Pfad weiterverarbeiten
  }
  path = path.split(/[?#]/)[0] ?? ''
  try {
    path = decodeURI(path)
  } catch {
    // ungültige Kodierung – unverändert lassen
  }
  path = `/${path.replace(/^\/+/, '')}`.replace(/\/+$/, '').toLowerCase()
  return path || '/'
}

/** Sucht eine Weiterleitung; alte deutsche URLs ohne Sprachpräfix werden auch mit /de gefunden und umgekehrt. */
export function findRedirect(
  map: RedirectMap,
  pathname: string,
): { to: string; status: 301 | 302 } | null {
  const path = normalizePath(pathname)
  const candidates = [path]
  if (path.startsWith('/de/')) candidates.push(path.slice(3))
  else if (!/^\/(en|fr)(\/|$)/.test(path)) candidates.push(`/de${path === '/' ? '' : path}`)
  for (const c of candidates) {
    const hit = map[c]
    if (hit && normalizePath(hit.to) !== path) return hit
  }
  return null
}
