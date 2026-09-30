import { cn } from '@/lib/cn'

/**
 * Generative Platzhalter-Grafik im Linien-Motiv (keine externen Bilder).
 * Ersetzt Fotos in Demos, bis echtes Bildmaterial von HC vorliegt.
 */
const palettes = [
  { bg: '#00566b', line: '#5fb3cc' },
  { bg: '#061f33', line: '#0b8aa8' },
  { bg: '#007f9d', line: '#a0cce0' },
  { bg: '#0a3550', line: '#2a98b5' },
  { bg: '#a0cce0', line: '#0a3550' },
  { bg: '#006a84', line: '#cfeaf2' },
] as const

export function BrandArt({ seed = 0, className }: { seed?: number; className?: string }) {
  const p = palettes[seed % palettes.length]!
  const count = 18 + (seed % 4) * 4
  const phase = seed * 0.9

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block size-full', className)}
    >
      <rect width="400" height="500" fill={p.bg} />
      {Array.from({ length: count }, (_, i) => {
        // Gerundet, damit Server und Browser identisches Markup erzeugen (Hydration).
        const r = (v: number) => Math.round(v * 10) / 10
        const x = r((400 / count) * i + 400 / count / 2)
        const h = r(120 + Math.abs(Math.sin(i * 0.55 + phase)) * 300)
        const y = r(250 - h / 2 + Math.cos(i * 0.4 + phase) * 40)
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="1.5"
            height={h}
            rx="0.75"
            fill={p.line}
            opacity={[0.35, 0.55, 0.75][i % 3]}
          />
        )
      })}
    </svg>
  )
}
