import { describe, expect, it } from 'vitest'

import { validateContact } from '@/lib/contact-schema'
import { allowRequest, checkFormToken, createFormToken, resetRateLimit } from '@/lib/spam-guard'

const valid = {
  firstName: 'Mirjam',
  lastName: 'Aufdermauer',
  email: 'mirjam@example.org',
  phone: '',
  topic: 'Allgemeine Anfrage',
  message: 'Bitte um Rückruf.',
  consent: 'on',
}

describe('validateContact', () => {
  it('akzeptiert eine vollständige Anfrage', () => {
    expect(validateContact(valid).ok).toBe(true)
  })

  it('meldet Pflichtfelder, ungültige E-Mail und fehlende Einwilligung als Schlüssel', () => {
    const result = validateContact({
      ...valid,
      firstName: ' ',
      email: 'kein-at',
      consent: undefined,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.fields.firstName).toBe('required')
      expect(result.fields.email).toBe('email')
      expect(result.fields.consent).toBe('consent')
    }
  })

  it('begrenzt die Nachrichtenlänge', () => {
    const result = validateContact({ ...valid, message: 'x'.repeat(2001) })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields.message).toBe('tooLong')
  })
})

describe('Zeitsperre', () => {
  it('lehnt zu schnelles, abgelaufenes und manipuliertes Absenden ab', () => {
    const t0 = 1_700_000_000_000
    const token = createFormToken(t0)
    expect(checkFormToken(token, t0 + 1000)).toBe('tooFast')
    expect(checkFormToken(token, t0 + 10_000)).toBe('ok')
    expect(checkFormToken(token, t0 + 3 * 60 * 60 * 1000)).toBe('expired')
    expect(checkFormToken(token.replace(/.$/, '0'), t0 + 10_000)).not.toBe('ok')
    expect(checkFormToken('', t0)).toBe('invalid')
  })
})

describe('Rate-Limit', () => {
  it('erlaubt fünf Anfragen je zehn Minuten', () => {
    resetRateLimit()
    const now = Date.now()
    for (let i = 0; i < 5; i++) expect(allowRequest('203.0.113.7', now)).toBe(true)
    expect(allowRequest('203.0.113.7', now)).toBe(false)
    expect(allowRequest('203.0.113.8', now)).toBe(true)
    expect(allowRequest('203.0.113.7', now + 11 * 60 * 1000)).toBe(true)
  })
})
