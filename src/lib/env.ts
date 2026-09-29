import { z } from 'zod'

const boolFromString = z
  .enum(['true', 'false', ''])
  .optional()
  .transform((value) => value === 'true')

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL fehlt'),
  PAYLOAD_SECRET: z.string().min(16, 'PAYLOAD_SECRET fehlt oder ist zu kurz'),
  NEXT_PUBLIC_SERVER_URL: z.url().default('http://localhost:3000'),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  SITE_INDEXABLE: boolFromString,
})

export type Env = z.infer<typeof envSchema>

/** Validiert die Server-Umgebungsvariablen. Wirft mit lesbarer Meldung bei Fehlern. */
export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source)
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
    throw new Error(`Ungültige Umgebungsvariablen:\n${issues.join('\n')}`)
  }
  return result.data
}

/** S3-Storage ist nur aktiv, wenn alle Zugangsdaten gesetzt sind. */
export function hasS3(env: Env): boolean {
  return Boolean(env.S3_ENDPOINT && env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY)
}
