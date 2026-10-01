import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** Kapitel der Bibliothek (z. B. „Hero“) mit Nummer und kurzer Einordnung. */
export function Chapter({
  id,
  no,
  title,
  intro,
  children,
}: {
  id: string
  no: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-40">
      <div className="panel mt-6 bg-surface-muted">
        <div className="container-page grid gap-6 py-16 md:grid-cols-[1fr_2fr] md:py-24">
          <div className="flex min-w-0 items-baseline gap-4">
            <span className="font-mono text-caption text-accent-strong tabular-nums">{no}</span>
            <h2 id={`${id}-h`} className="min-w-0 text-h1 font-light break-words hyphens-auto">
              {title}
            </h2>
          </div>
          <p className="max-w-[58ch] self-end text-lead font-light text-muted">{intro}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

/**
 * Eine Variante mit Kennung zum Auswählen im Kundengespräch. Die Beschriftung liegt
 * als schmale Leiste über der Sektion, damit die Sektion selbst randlos bleibt.
 */
export function Variant({
  code,
  name,
  note,
  tags = [],
  children,
  className,
}: {
  code: string
  name: string
  note?: string
  tags?: string[]
  children: ReactNode
  className?: string
}) {
  return (
    <article
      id={`v-${code.toLowerCase()}`}
      aria-label={`${code} ${name}`}
      className={cn('scroll-mt-40', className)}
    >
      <div>
        <div className="container-page flex flex-wrap items-center gap-x-4 gap-y-1 pt-12 pb-4">
          <span className="inline-flex h-7 items-center rounded-full bg-blue-950 px-3 font-mono text-caption font-medium text-teal-300">
            {code}
          </span>
          <span className="text-small text-ink">{name}</span>
          {note ? <span className="text-caption text-muted">{note}</span> : null}
          {tags.length ? (
            <span className="ml-auto flex flex-wrap gap-3 text-caption text-muted">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex h-7 items-center rounded-full border border-line px-3"
                >
                  {t}
                </span>
              ))}
            </span>
          ) : null}
        </div>
      </div>
      {children}
    </article>
  )
}

/** Standard-Innenabstand einer Sektion. */
export function Pad({
  children,
  className,
  tone = 'plain',
}: {
  children: ReactNode
  className?: string
  tone?: 'plain' | 'muted' | 'dark' | 'deep' | 'teal'
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden',
        tone !== 'plain' && 'panel',
        tone === 'muted' && 'bg-surface-muted',
        tone === 'dark' && 'bg-blue-950 text-white',
        tone === 'deep' && 'bg-blue-900 text-white',
        tone === 'teal' && 'bg-teal-900 text-white',
      )}
    >
      <div className={cn('container-page py-20 md:py-28', className)}>{children}</div>
    </div>
  )
}

/** Einheitlicher Sektionskopf für die Beispiele. */
export function Kicker({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <p className={cn('eyebrow', dark && 'eyebrow-dark')}>{children}</p>
}
