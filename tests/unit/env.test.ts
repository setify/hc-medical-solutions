import { describe, expect, it } from 'vitest'

import { hasS3, parseEnv } from '@/lib/env'

const valid = {
  DATABASE_URL: 'postgresql://postgres:postgres@127.0.0.1:55422/postgres',
  PAYLOAD_SECRET: 'x'.repeat(32),
}

describe('parseEnv', () => {
  it('akzeptiert eine minimale gültige Konfiguration mit Defaults', () => {
    const env = parseEnv(valid)
    expect(env.NEXT_PUBLIC_SERVER_URL).toBe('http://localhost:3000')
    expect(env.SITE_INDEXABLE).toBe(false)
    expect(hasS3(env)).toBe(false)
  })

  it('wirft bei fehlenden Pflichtwerten eine lesbare Meldung', () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL/)
  })

  it('aktiviert S3 nur mit vollständigen Zugangsdaten', () => {
    const env = parseEnv({
      ...valid,
      S3_ENDPOINT: 'http://127.0.0.1:55421/storage/v1/s3',
      S3_ACCESS_KEY_ID: 'key',
      S3_SECRET_ACCESS_KEY: 'secret',
    })
    expect(hasS3(env)).toBe(true)
  })
})
