import { describe, expect, it } from 'vitest'

import { buildAlternates, localizedUrl } from '@/lib/seo'

const base = 'https://www.example.com'

describe('localizedUrl', () => {
  it('setzt das Sprachpräfix und normalisiert Slashes', () => {
    expect(localizedUrl(base, 'de')).toBe('https://www.example.com/de')
    expect(localizedUrl(`${base}/`, 'en', '/karriere/')).toBe('https://www.example.com/en/karriere')
  })
})

describe('buildAlternates', () => {
  it('liefert canonical und hreflang für alle Sprachen inkl. x-default', () => {
    const alternates = buildAlternates(base, 'fr', 'kontakt')
    expect(alternates.canonical).toBe('https://www.example.com/fr/kontakt')
    expect(alternates.languages).toEqual({
      de: 'https://www.example.com/de/kontakt',
      en: 'https://www.example.com/en/kontakt',
      fr: 'https://www.example.com/fr/kontakt',
      'x-default': 'https://www.example.com/de/kontakt',
    })
  })

  it('unterstützt unterschiedliche Slugs je Sprache und lässt fehlende Sprachen weg', () => {
    const alternates = buildAlternates(base, 'en', { de: 'vorgehensweise', en: 'approach' })
    expect(alternates.canonical).toBe('https://www.example.com/en/approach')
    expect(alternates.languages).toEqual({
      de: 'https://www.example.com/de/vorgehensweise',
      en: 'https://www.example.com/en/approach',
      'x-default': 'https://www.example.com/de/vorgehensweise',
    })
  })
})
