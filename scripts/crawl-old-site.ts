/**
 * Erfasst alle URLs der alten WordPress-Seite und schlägt Weiterleitungsziele vor.
 * Ergebnis: docs/url-mapping.csv – wird von HC geprüft; freigegebene Zeilen importiert
 * `pnpm redirects:import`.
 *
 * Aufruf: pnpm crawl:old [--base https://hc-medical-solutions.com]
 */
import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'

const argBase = process.argv.indexOf('--base')
const BASE = (
  argBase > -1 ? process.argv[argBase + 1] : 'https://hc-medical-solutions.com'
)!.replace(/\/$/, '')
const LANGS = ['en', 'fr'] as const

type Row = {
  from: string
  lang: 'de' | 'en' | 'fr'
  status: number | string
  title: string
  category: string
  to: string
  note: string
}

async function fetchText(url: string): Promise<{ status: number; text: string }> {
  try {
    const res = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) })
    return { status: res.status, text: res.status === 200 ? await res.text() : '' }
  } catch {
    return { status: 0, text: '' }
  }
}

async function sitemapUrls(): Promise<string[]> {
  const index = await fetchText(`${BASE}/sitemap_index.xml`)
  const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.trim())
  const sitemaps = locs(index.text)
  const urls = new Set<string>()
  for (const sm of sitemaps) {
    for (const u of locs((await fetchText(sm)).text)) {
      if (!/\.(jpe?g|png|webp|gif|svg|pdf)$/i.test(u)) urls.add(u)
    }
  }
  return [...urls]
}

/** Regeln für Vorschläge. Ziele sind Platzhalter bis zum Seitenkonzept von HC. */
function classify(pathname: string, lang: Row['lang']): Pick<Row, 'category' | 'to' | 'note'> {
  const p = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '').replace(/\/$/, '') || '/'
  const L = `/${lang}`
  const rules: [RegExp, string, string, string][] = [
    [/^\/$/, 'Startseite', `${L}`, ''],
    [
      /^\/(shop|cart|checkout|login|registrierung(\/.*)?|versandarten|bezahlmoeglichkeiten|widerrufsbelehrung|hilfe|neue-eingetroffen)$/,
      'Shop/Konto (entfällt)',
      `${L}/kontakt`,
      'Shop entfällt laut Entscheidung',
    ],
    [
      /^\/(agb|allgemeine-verkaufsbedingungen-hc(-eu)?|algemene-verkoop-en-leveriingsvoorwarden-hc|conditions-generales-hc|terms-and-conditions-hc)$/,
      'AGB-Variante',
      `${L}/agb`,
      'Welche AGB-Fassung gilt künftig? (HC)',
    ],
    [/^\/(impressum)$/i, 'Rechtliches', `${L}/impressum`, ''],
    [/^\/(datenschutz)$/i, 'Rechtliches', `${L}/datenschutz`, ''],
    [/^\/(karriere|jobs)(\/.*)?$/i, 'Karriere', `${L}/karriere`, 'Stellen kommen künftig aus JOIN'],
    [/^\/kontakt$/, 'Kontakt', `${L}/kontakt`, ''],
    [
      /^\/danke$/,
      'Formular-Danke (entfällt)',
      `${L}/kontakt`,
      'Bestätigung erscheint künftig inline',
    ],
    [/^\/partners$/, 'Unternehmen', `${L}/partner`, 'Zielpfad nach Seitenkonzept prüfen'],
    [
      /^\/unternehmen\/vorgehensweise-medizinprodukte$/,
      'Unternehmen',
      `${L}/unternehmen/vorgehensweise`,
      'Zielpfad nach Seitenkonzept prüfen',
    ],
    [
      /^\/unternehmen\/(qualitaetsversprechen|lagerlogistik)$/,
      'Unternehmen',
      `${L}${p}`,
      'Zielpfad nach Seitenkonzept prüfen',
    ],
    [/^\/(blog|allgemein)(\/.*)?$|^\/__trashed$/, 'Blog/Archiv (entfällt)', `${L}`, ''],
  ]
  for (const [re, category, to, note] of rules) if (re.test(p)) return { category, to, note }
  return { category: 'Ungeklärt', to: '', note: 'Ziel festlegen' }
}

const csv = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`

async function main() {
  const deUrls = await sitemapUrls()
  const candidates: { url: string; lang: Row['lang'] }[] = deUrls.map((url) => ({
    url,
    lang: 'de',
  }))
  for (const url of deUrls) {
    const u = new URL(url)
    for (const lang of LANGS) candidates.push({ url: `${u.origin}/${lang}${u.pathname}`, lang })
  }

  const rows: Row[] = []
  for (const { url, lang } of candidates) {
    const { status, text } = await fetchText(url)
    if (lang !== 'de' && status !== 200) continue // Übersetzung existiert nicht
    const title = (text.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '').replace(/\s+/g, ' ').trim()
    const pathname = new URL(url).pathname
    rows.push({ from: pathname, lang, status, title, ...classify(pathname, lang) })
    process.stdout.write('.')
  }
  rows.sort((a, b) => a.lang.localeCompare(b.lang) || a.from.localeCompare(b.from))

  const header = [
    'alte_url',
    'sprache',
    'http_status',
    'titel',
    'kategorie',
    'ziel_vorschlag',
    'freigabe',
    'hinweis',
  ]
  const lines = rows.map((r) =>
    [r.from, r.lang, r.status, r.title, r.category, r.to, 'offen', r.note].map(csv).join(','),
  )
  const out = path.resolve('docs/url-mapping.csv')
  mkdirSync(path.dirname(out), { recursive: true })
  writeFileSync(out, `${header.join(',')}\n${lines.join('\n')}\n`)
  console.log(`\n${rows.length} URLs → ${out}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
