import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Button mit umlaufendem Lichtpunkt am Rand (nach reactbits „Star Border“, reines CSS).
 * Für hervorgehobene Sekundär-Aktionen auf dunklem Grund.
 */
export function StarBorder({
  children,
  className,
  color = 'var(--color-blue-200)',
  speed = '5s',
  tone = 'dark',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  color?: string
  speed?: string
  tone?: 'dark' | 'light'
}) {
  const glow = { background: `radial-gradient(circle, ${color}, transparent 12%)` }

  return (
    <button
      type={type}
      className={cn(
        'group/star relative inline-flex overflow-hidden rounded-sm py-px transition-transform duration-300 ease-out-expo active:scale-[0.98]',
        className,
      )}
      style={{ '--star-speed': speed } as CSSProperties}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="absolute -right-[250%] -bottom-3 h-1/2 w-[300%] animate-star-bottom rounded-full opacity-80"
        style={glow}
      />
      <span
        aria-hidden="true"
        className="absolute -top-3 -left-[250%] h-1/2 w-[300%] animate-star-top rounded-full opacity-80"
        style={glow}
      />
      <span
        className={cn(
          'relative inline-flex h-12 items-center gap-2.5 rounded-sm border px-7 text-small font-normal transition-colors duration-300',
          tone === 'dark'
            ? 'border-petrol-600 bg-petrol-950 text-white group-hover/star:bg-petrol-900'
            : 'border-line bg-surface text-ink group-hover/star:bg-petrol-50',
        )}
      >
        {children}
      </span>
    </button>
  )
}
