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
}: {
  children: ReactNode
  className?: string
  colors?: string[]
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`
  return (
    <span
      className={cn('inline-block animate-gradient-pan bg-clip-text text-transparent', className)}
      style={{ backgroundImage: gradient, backgroundSize: '300% 100%' }}
    >
      {children}
    </span>
  )
}
