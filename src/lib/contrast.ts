/** WCAG-2-Kontrastberechnung für Hex-Farben (#rrggbb). */
function luminance(hex: string): number {
  const v = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** Einstufung nach WCAG 2.2: AAA ≥ 7, AA ≥ 4,5, AA groß ≥ 3. */
export function rating(ratio: number): 'AAA' | 'AA' | 'AA groß' | '–' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA groß'
  return '–'
}

export const formatRatio = (ratio: number) => `${ratio.toFixed(2).replace('.', ',')} : 1`
