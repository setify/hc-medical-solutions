import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Endlos laufende Logo-Leiste (nach reactbits „Logo Loop“, reines CSS).
 * Pausiert bei Hover und Fokus; Duplikat ist für Screenreader ausgeblendet.
 */
export function LogoLoop({
  items,
  duration = 32,
  className,
  label,
}: {
  items: { name: string; mark: ReactNode }[]
  duration?: number
  className?: string
  label: string
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-center gap-3 whitespace-nowrap text-n-600 transition-colors duration-300 hover:text-primary-strong"
        >
          <span className="size-8">{item.mark}</span>
          <span className="text-h4 font-normal tracking-tight">{item.name}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label={label} className={cn('group/loop mask-fade-x overflow-hidden', className)}>
      <div
        className="flex w-max animate-marquee group-focus-within/loop:[animation-play-state:paused] group-hover/loop:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
