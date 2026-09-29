import localFont from 'next/font/local'

/**
 * Hausschrift Lexend Deca (SIL Open Font License, siehe OFL.txt).
 * Variable Font 100–900, Latin-Subset (deckt DE/EN/FR inkl. € und «»„“ ab).
 * Wird lokal vom eigenen Server ausgeliefert – keine Anfrage an Google.
 */
export const lexendDeca = localFont({
  src: './lexend-deca/LexendDeca-latin-wght.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-lexend-deca',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})
