import { cn } from '@/lib/cn'

/**
 * Fließende Linienbündel (nach 21st.dev „Background Paths“ von kokonutd). Passt zum Leitmotiv „Die Linie“.
 *
 * Performance: Das Original animiert jeden Pfad einzeln (pathLength/pathOffset); das zwingt den Browser,
 * die ganze Fläche in jedem Frame neu zu zeichnen (gemessen ~12 fps). Hier sind die Pfade statisch und
 * nur zwei Ebenen driften per CSS-Transform – das übernimmt die GPU, ohne Neuzeichnen.
 * Ohne Bewegung (prefers-reduced-motion) stehen die Ebenen still.
 */
function Paths({ position }: { position: 1 | -1 }) {
  const paths = Array.from({ length: 24 }, (_, i) => {
    const k = i * 1.5
    const s = k * 5 * position
    return {
      id: i,
      d: `M-${380 - s} -${189 + k * 6}C-${380 - s} -${189 + k * 6} -${312 - s} ${216 - k * 6} ${152 - s} ${343 - k * 6}C${616 - s} ${470 - k * 6} ${684 - s} ${875 - k * 6} ${684 - s} ${875 - k * 6}`,
      width: 0.5 + k * 0.03,
      opacity: Math.round((0.06 + k * 0.012) * 100) / 100,
      // Statisch unterbrochene Linien wie im Original (dort per Animation) – kostet keine Frames.
      dash: `${(0.35 + (i % 5) * 0.12).toFixed(2)} 1`,
      offset: -((i % 7) * 0.13).toFixed(2),
    }
  })

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.width}
          strokeOpacity={p.opacity}
          pathLength={1}
          strokeDasharray={p.dash}
          strokeDashoffset={p.offset}
        />
      ))}
    </svg>
  )
}

export function BackgroundPaths({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute -inset-[6%] animate-[paths-drift_26s_ease-in-out_infinite_alternate] will-change-transform motion-reduce:animate-none">
        <Paths position={1} />
      </div>
      <div className="absolute -inset-[6%] animate-[paths-drift_34s_ease-in-out_infinite_alternate-reverse] will-change-transform motion-reduce:animate-none">
        <Paths position={-1} />
      </div>
    </div>
  )
}
