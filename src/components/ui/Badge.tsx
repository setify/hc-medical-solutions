import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'petrol' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse'

const tones: Record<Tone, string> = {
  neutral: 'bg-n-100 text-n-700',
  petrol: 'bg-petrol-50 text-petrol-800 ring-1 ring-inset ring-petrol-100',
  accent: 'bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-100',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-red-50 text-red-700',
  inverse: 'bg-white/10 text-white ring-1 ring-inset ring-white/15',
}

export function Badge({
  children,
  tone = 'neutral',
  dot,
  live,
  className,
}: {
  children: ReactNode
  tone?: Tone
  dot?: boolean
  /** Pulsierender Punkt, z. B. „Stelle aktiv“. */
  live?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-2 rounded-full px-3 text-caption font-normal',
        tones[tone],
        className,
      )}
    >
      {dot || live ? (
        <span aria-hidden="true" className="relative flex size-1.5">
          {live ? (
            <span className="absolute inset-0 animate-breathe rounded-full bg-current" />
          ) : null}
          <span className="relative size-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {children}
    </span>
  )
}
