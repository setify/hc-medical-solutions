import { describe, expect, it } from 'vitest'

import fixture from '../fixtures/join-jobs.json'

import { parseJoinResponse, workplaceKey } from '@/lib/join'

describe('parseJoinResponse', () => {
  it('liest die Stellen aus einer JOIN-Antwort', () => {
    const jobs = parseJoinResponse(fixture)
    expect(jobs).toHaveLength(2)
    expect(jobs?.[0]?.title).toBe('Teststelle Einkauf (m/w/d)')
    expect(jobs?.[0]?.city?.cityName).toBe('Köln')
  })

  it('liefert null bei unerwartetem Format', () => {
    expect(parseJoinResponse({ foo: 'bar' })).toBeNull()
    expect(parseJoinResponse({ jobs: [{ title: 'ohne URL' }] })).toBeNull()
  })
})

describe('workplaceKey', () => {
  it.each([
    ['HYBRID', 'hybrid'],
    ['remote', 'remote'],
    ['ONSITE', 'onsite'],
    [undefined, null],
  ])('%s → %s', (input, expected) => {
    expect(workplaceKey(input)).toBe(expected)
  })
})
