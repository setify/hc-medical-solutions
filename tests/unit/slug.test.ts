import { describe, expect, it } from 'vitest'

import { slugify } from '@/fields/slug'

describe('slugify', () => {
  it.each([
    ['Über uns', 'ueber-uns'],
    ['Qualitätsmanagement & Prüfung', 'qualitaetsmanagement-pruefung'],
    ['À propos de nous', 'a-propos-de-nous'],
    ['  Karriere / Jobs  ', 'karriere-jobs'],
    ['Straße', 'strasse'],
  ])('%s → %s', (input, expected) => {
    expect(slugify(input)).toBe(expected)
  })
})
