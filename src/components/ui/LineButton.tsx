import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Sekundärer Text-Button mit Linien-Motiv: Die senkrechte Linie aus dem Bildzeichen
 * klappt beim Hover zur Unterstreichung um, der Pfeil läuft nach rechts aus.
 */
export function LineButton({
  children,
  className,
  tone = 'dark',
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <a
      className={cn(
        'group/line relative inline-flex items-center gap-3 py-2 text-small font-normal',
        tone === 'dark' ? 'text-ink' : 'text-white',
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-4 w-px origin-bottom transition-transform duration-500 ease-out-expo group-hover/line:scale-y-0',
          tone === 'dark' ? 'bg-accent' : 'bg-blue-200',
        )}
      />
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover/line:scale-x-100',
            tone === 'dark' ? 'bg-accent' : 'bg-blue-200',
          )}
        />
      </span>
      <span aria-hidden="true" className="relative inline-flex h-4 w-5 overflow-hidden">
        <svg
          viewBox="0 0 20 16"
          className="absolute inset-0 size-full transition-transform duration-500 ease-out-expo group-hover/line:translate-x-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 8h17M12 2l6 6-6 6" />
        </svg>
        <svg
          viewBox="0 0 20 16"
          className="absolute inset-0 size-full -translate-x-full transition-transform duration-500 ease-out-expo group-hover/line:translate-x-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 8h17M12 2l6 6-6 6" />
        </svg>
      </span>
    </a>
  )
}
