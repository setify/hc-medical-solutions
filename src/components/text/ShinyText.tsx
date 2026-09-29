import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Lichtreflex, der über den Text läuft (nach reactbits „Shiny Text“, reines CSS).
 * Grundfarbe bleibt kontraststark; der Glanz ist nur Zierde.
 */
export function ShinyText({
  children,
  className,
  tone = 'dark',
}: {
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light'
}) {
  const [base, shine] = tone === 'dark' ? ['#38464c', '#a0cce0'] : ['#b0d3d9', '#ffffff']
  return (
    <span
      className={cn('inline-block animate-shine bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(110deg, ${base} 0%, ${base} 38%, ${shine} 50%, ${base} 62%, ${base} 100%)`,
        backgroundSize: '200% auto',
      }}
    >
      {children}
    </span>
  )
}
