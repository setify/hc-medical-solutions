/**
 * Importiert freigegebene Zeilen aus docs/url-mapping.csv in die CMS-Collection „Weiterleitungen“.
 * Nur Zeilen mit freigabe = "freigegeben" und gesetztem Ziel. Bestehende Einträge mit gleicher
 * Quelle werden aktualisiert. Aufruf: pnpm redirects:import [--dry-run]
 */
import 'dotenv/config'

import { readFileSync } from 'fs'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { normalizePath } from '../src/lib/redirects'
import { revalidateRunningServer } from './revalidate'

/** Minimaler CSV-Parser für die von crawl-old-site.ts erzeugte Datei (alle Felder in Anführungszeichen). */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (c !== '\r') field += c
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  const [header, ...data] = rows
  return data
    .filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(header!.map((h, i) => [h, r[i] ?? ''])))
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const rows = parseCsv(readFileSync('docs/url-mapping.csv', 'utf8')).filter(
    (r) => r.freigabe === 'freigegeben' && r.ziel_vorschlag,
  )
  if (!rows.length) {
    console.log('Keine freigegebenen Zeilen in docs/url-mapping.csv.')
    return
  }

  const payload = await getPayload({ config })
  let created = 0
  let updated = 0
  for (const r of rows) {
    const from = normalizePath(r.alte_url!)
    const data = {
      from,
      type: '301' as const,
      to: { type: 'custom' as const, url: r.ziel_vorschlag! },
    }
    const existing = await payload.find({
      collection: 'redirects',
      where: { from: { equals: from } },
      limit: 1,
    })
    if (dryRun) {
      console.log(
        `${existing.docs.length ? 'aktualisieren' : 'anlegen'}: ${from} → ${r.ziel_vorschlag}`,
      )
      continue
    }
    if (existing.docs[0]) {
      await payload.update({ collection: 'redirects', id: existing.docs[0].id, data })
      updated++
    } else {
      await payload.create({ collection: 'redirects', data })
      created++
    }
  }
  console.log(`${created} angelegt, ${updated} aktualisiert${dryRun ? ' (Probelauf)' : ''}.`)
  if (!dryRun && (await revalidateRunningServer()))
    console.log('Cache des laufenden Servers geleert.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
