import localFont from 'next/font/local'

/*
 * Vergleichsschriften für die interne Seite /de/schriften (alle SIL Open Font License,
 * Lizenztexte in src/fonts/vergleich). Variable Fonts, Latin-Subset, lokal ausgeliefert.
 * Werden nur auf dieser Seite geladen – die Website nutzt weiterhin Lexend Deca.
 * next/font verlangt wörtliche Werte, daher keine gemeinsamen Konstanten in den Aufrufen.
 */
export const plusJakarta = localFont({
  src: '../../../../../fonts/vergleich/plus-jakarta-sans.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-jakarta',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const sourceSans = localFont({
  src: '../../../../../fonts/vergleich/source-sans-3.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-source-sans',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const spaceGrotesk = localFont({
  src: '../../../../../fonts/vergleich/space-grotesk.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-space-grotesk',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const plexSans = localFont({
  src: '../../../../../fonts/vergleich/ibm-plex-sans.woff2',
  weight: '100 700',
  display: 'swap',
  variable: '--font-plex-sans',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const compareFontVariables = [plusJakarta, sourceSans, spaceGrotesk, plexSans]
  .map((f) => f.variable)
  .join(' ')

export type FontVariant = {
  id: string
  label: string
  character: string
  head: { name: string; family: string; weight: number; tracking: string }
  body: { name: string; family: string; weight: number }
  notes: string[]
}

export const variants: FontVariant[] = [
  {
    id: 'a',
    label: 'A · Aktuell',
    character: 'Weich, rund, freundlich. Eine Schrift für alles, wie im Logoblatt.',
    head: {
      name: 'Lexend Deca',
      family: 'var(--font-lexend-deca)',
      weight: 300,
      tracking: 'inherit',
    },
    body: { name: 'Lexend Deca', family: 'var(--font-lexend-deca)', weight: 300 },
    notes: [
      'Hausschrift laut Logoblatt, daher ohne Abstimmung mit der Marke einsetzbar.',
      'Sehr gut lesbar, breite Laufweite; lange Texte wirken luftig, brauchen aber mehr Platz.',
      'Überschriften leicht (Light 300), Hierarchie über Größe und Farbe.',
    ],
  },
  {
    id: 'b',
    label: 'B · Klar & modern',
    character: 'Geometrische Überschriften mit Charakter, ruhiger Fließtext für lange Inhalte.',
    head: {
      name: 'Plus Jakarta Sans',
      family: 'var(--font-jakarta)',
      weight: 600,
      tracking: '-0.035em',
    },
    body: { name: 'Source Sans 3', family: 'var(--font-source-sans)', weight: 400 },
    notes: [
      'Überschriften kräftiger (SemiBold 600) und kompakter, wirkt selbstbewusster.',
      'Source Sans 3 ist schmaler als Lexend: mehr Text pro Zeile, sehr gute Lesbarkeit.',
      'Lexend Deca bliebe für das Logo und Drucksachen erhalten.',
    ],
  },
  {
    id: 'c',
    label: 'C · Technisch & präzise',
    character:
      'Markante Grotesk für Überschriften, sachlicher Fließtext. Betont Prozesse und Qualität.',
    head: {
      name: 'Space Grotesk',
      family: 'var(--font-space-grotesk)',
      weight: 500,
      tracking: '-0.03em',
    },
    body: { name: 'IBM Plex Sans', family: 'var(--font-plex-sans)', weight: 400 },
    notes: [
      'Space Grotesk hat eigenwillige Details (a, g, Ziffern): wirkt technisch und präzise.',
      'IBM Plex Sans ist nüchtern und klar, passt zu Regulatory und Dokumentation.',
      'Deutlichster Kontrast zur heutigen Hausschrift; bitte mit dem Logo zusammen prüfen.',
    ],
  },
]
