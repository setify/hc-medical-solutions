import { z } from 'zod'

/*
 * Offene Stellen aus JOIN (join.com), serverseitig abgerufen.
 * Nutzt denselben Endpunkt wie das offizielle JOIN-Widget – im Browser wird kein Skript von
 * join.com geladen. Detailansicht und Bewerbung bleiben auf JOIN.
 */

const JOIN_ENDPOINT = 'https://join.com/api/widget/jobs'

const jobSchema = z.object({
  title: z.string(),
  url: z.url(),
  place: z.string().nullish(),
  employmentType: z.string().nullish(),
  category: z.string().nullish(),
  workplaceType: z.string().nullish(),
  city: z.object({ cityName: z.string().nullish(), countryName: z.string().nullish() }).nullish(),
})

const responseSchema = z.object({
  jobs: z.array(jobSchema),
  pagination: z.object({ rowCount: z.number() }).partial().optional(),
})

export type JoinJob = z.infer<typeof jobSchema>

/** Parst eine JOIN-Antwort; unbrauchbare Einträge werden verworfen statt die Seite zu brechen. */
export function parseJoinResponse(input: unknown): JoinJob[] | null {
  const result = responseSchema.safeParse(input)
  return result.success ? result.data.jobs : null
}

/**
 * Lädt alle Stellen. Ergebnis wird eine Stunde gecacht (Tag `join-jobs`).
 * Rückgabe `null` bei Fehlern, damit die Seite einen Fehlerhinweis statt eines Absturzes zeigt.
 */
export async function getJoinJobs(token: string | null | undefined): Promise<JoinJob[] | null> {
  if (process.env.JOIN_FIXTURE === '1') {
    const fixture = await import('../../tests/fixtures/join-jobs.json')
    return parseJoinResponse(fixture.default)
  }
  const accessToken = token || process.env.JOIN_WIDGET_TOKEN
  if (!accessToken) return null

  try {
    const res = await fetch(`${JOIN_ENDPOINT}?page=1&pageSize=100`, {
      headers: { 'access-token': accessToken, Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600, tags: ['join-jobs'] },
    })
    if (!res.ok) return null
    return parseJoinResponse(await res.json())
  } catch {
    return null
  }
}

/** Arbeitsort-Art in Klartext; JOIN liefert HYBRID / REMOTE / ONSITE. */
export function workplaceKey(
  type: string | null | undefined,
): 'hybrid' | 'remote' | 'onsite' | null {
  switch (type?.toUpperCase()) {
    case 'HYBRID':
      return 'hybrid'
    case 'REMOTE':
      return 'remote'
    case 'ONSITE':
      return 'onsite'
    default:
      return null
  }
}
