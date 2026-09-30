'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Card, deren Rand dort aufleuchtet, wo sich der Mauszeiger dem Rand nähert
 * (nach reactbits „Border Glow“). Werte laufen über CSS-Variablen, ohne Re-Render.
 */
export function BorderGlowCard({
  children,
  className,
  colors = ['#a0cce0', '#5fb3cc', '#a0cce0'],
}: {
  children: ReactNode
  className?: string
  colors?: [string, string, string]
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const dx = x - r.width / 2
    const dy = y - r.height / 2
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
    const proximity = Math.min(
      1,
      Math.max(Math.abs(dx) / (r.width / 2), Math.abs(dy) / (r.height / 2)),
    )
    el.style.setProperty('--glow-x', `${x}px`)
    el.style.setProperty('--glow-y', `${y}px`)
    el.style.setProperty('--glow-angle', `${angle}deg`)
    el.style.setProperty('--glow-edge', String(Math.max(0, (proximity - 0.35) / 0.65)))
  }

  function onLeave() {
    ref.current?.style.setProperty('--glow-edge', '0')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn('group/glow relative isolate rounded-lg bg-blue-950 p-8 text-white', className)}
      style={{ ['--glow-edge' as string]: 0 }}
    >
      {/* Leuchtender Rand: konischer Verlauf, per Maske auf 1,5 px beschränkt */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-[1.5px] transition-opacity duration-300"
        style={{
          opacity: 'calc(0.25 + var(--glow-edge) * 0.75)',
          background: `conic-gradient(from calc(var(--glow-angle, 45deg) - 60deg), transparent 0deg, ${colors[0]} 40deg, ${colors[1]} 70deg, ${colors[2]} 95deg, transparent 130deg, transparent 360deg), linear-gradient(rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.1))`,
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box xor, linear-gradient(#000 0 0)',
        }}
      />
      {/* Weiches Innenlicht am Cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgb(0 127 157 / 0.14), transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}
