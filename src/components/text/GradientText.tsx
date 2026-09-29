import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Langsam wandernder Farbverlauf in den Hausfarben (nach reactbits „Gradient Text“).
 * Sparsam einsetzen: einzelne Wörter, keine ganzen Überschriften.
 */
export function GradientText({
  children,
  className,
  colors = ['#004e5c', '#007f9d', '#4a92a0', '#004e5c'],
  outline,
}: {
  children: ReactNode
  className?: string
  colors?: string[]
  /** Zusätzlich als Pill mit Verlaufsrand darstellen. */
  outline?: boolean
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`
  const text = (
    <span
      className={cn('inline-block animate-gradient-pan bg-clip-text text-transparent', className)}
      style={{ backgroundImage: gradient, backgroundSize: '300% 100%' }}
    >
      {children}
    </span>
  )
  if (!outline) return text
  return (
    <span className="relative inline-flex rounded-full p-px">
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-gradient-pan rounded-full"
        style={{ backgroundImage: gradient, backgroundSize: '300% 100%' }}
      />
      <span className="relative rounded-full bg-surface px-4 py-1.5">{text}</span>
    </span>
  )
}
