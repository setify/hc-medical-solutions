import { describe, expect, it } from 'vitest'

import { findRedirect, normalizePath, type RedirectMap } from '@/lib/redirects'

describe('normalizePath', () => {
  it.each([
    ['https://hc-medical-solutions.com/Karriere/', '/karriere'],
    ['/cart/?add-to-cart=1', '/cart'],
    ['unternehmen/lagerlogistik', '/unternehmen/lagerlogistik'],
    ['/', '/'],
    ['/qualit%C3%A4t/', '/qualität'],
  ])('%s → %s', (input, expected) => {
    expect(normalizePath(input)).toBe(expected)
  })
})

describe('findRedirect', () => {
  const map: RedirectMap = {
    '/cart': { to: '/de/kontakt', status: 301 },
    '/en/karriere': { to: '/en/careers', status: 301 },
    '/de/alt': { to: '/de/neu', status: 302 },
  }

  it('findet alte URL mit Trailing Slash und Großschreibung', () => {
    expect(findRedirect(map, '/Cart/')).toEqual({ to: '/de/kontakt', status: 301 })
  })

  it('findet deutsche Alt-URL auch mit /de-Präfix und umgekehrt', () => {
    expect(findRedirect(map, '/de/cart')).toEqual({ to: '/de/kontakt', status: 301 })
    expect(findRedirect(map, '/alt')).toEqual({ to: '/de/neu', status: 302 })
  })

  it('verwechselt englische URLs nicht mit deutschen', () => {
    expect(findRedirect(map, '/en/karriere/')).toEqual({ to: '/en/careers', status: 301 })
    expect(findRedirect(map, '/en/cart')).toBeNull()
  })

  it('verhindert Schleifen auf sich selbst', () => {
    expect(findRedirect({ '/a': { to: '/A/', status: 301 } }, '/a')).toBeNull()
  })
})
