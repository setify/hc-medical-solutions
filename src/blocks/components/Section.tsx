import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** Einheitlicher Abschnittsrahmen für Blöcke: Container, Abstand, optionale Überschrift + Einleitung. */
export function Section({
  title,
  intro,
  children,
  className,
  tone = 'plain',
}: {
  title?: string | null
  intro?: string | null
  children: ReactNode
  className?: string
  tone?: 'plain' | 'muted' | 'dark'
}) {
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        tone === 'muted' && 'bg-surface-muted',
        tone === 'dark' && 'bg-petrol-950 text-white',
        className,
      )}
    >
      <div className="container-page">
        {title || intro ? (
          <header className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
            {title ? <h2 className="text-h2">{title}</h2> : null}
            {intro ? (
              <p
                className={cn(
                  'text-lead font-light',
                  tone === 'dark' ? 'text-petrol-100' : 'text-muted',
                )}
              >
                {intro}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  )
}
