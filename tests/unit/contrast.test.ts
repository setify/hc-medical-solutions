import { describe, expect, it } from 'vitest'

import { contrast, rating } from '@/lib/contrast'

describe('contrast', () => {
  it('berechnet Schwarz/Weiß mit 21 : 1', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 1)
  })

  it('stuft die Hausfarben gegen Weiß korrekt ein', () => {
    expect(rating(contrast('#004e5c', '#ffffff'))).toBe('AAA')
    expect(rating(contrast('#007f9d', '#ffffff'))).toBe('AA')
    expect(rating(contrast('#e9483d', '#ffffff'))).toBe('AA groß')
    expect(rating(contrast('#a0cce0', '#ffffff'))).toBe('–')
  })

  it('alle Text-Tokens erfüllen mindestens AA auf Weiß', () => {
    for (const token of [
      '#0c171a',
      '#243034',
      '#4d5d64',
      '#006a84',
      '#a62a22',
      '#16704a',
      '#8a5a00',
    ]) {
      expect(contrast(token, '#ffffff')).toBeGreaterThanOrEqual(4.5)
    }
  })
})
