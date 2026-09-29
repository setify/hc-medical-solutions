import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** Abschnitt im Styleguide mit Nummer und Linien-Motiv. */
export function SgSection({
  id,
  no,
  title,
  intro,
  children,
}: {
  id: string
  no: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-8 border-t border-line py-20 first:border-t-0 first:pt-4 md:py-28"
    >
      <div className="grid gap-6 md:grid-cols-[5rem_1fr]">
        <span
          aria-hidden="true"
          className="flex items-start gap-3 pt-3 text-caption font-normal text-accent-strong tabular-nums"
        >
          <span className="mt-0.5 h-3.5 w-px bg-accent" />
          {no}
        </span>
        <div className="flex flex-col gap-4">
          <h2 id={`${id}-h`} className="text-h2">
            {title}
          </h2>
          {intro ? (
            <div className="max-w-[62ch] text-lead font-light text-muted">{intro}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-16">{children}</div>
    </section>
  )
}

/** Unterüberschrift innerhalb eines Abschnitts. */
export function SgSub({
  title,
  text,
  children,
}: {
  title: string
  text?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h4">{title}</h3>
        {text ? <p className="max-w-[62ch] text-small text-muted">{text}</p> : null}
      </div>
      {children}
    </div>
  )
}

/** Präsentationsrahmen – Beschriftung liegt darunter (Galerie-Prinzip). */
export function Specimen({
  label,
  code,
  children,
  className,
  tone = 'muted',
}: {
  label: string
  code?: string
  children: ReactNode
  className?: string
  tone?: 'muted' | 'plain' | 'dark' | 'none'
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div
        className={cn(
          'relative rounded-xl',
          tone === 'muted' && 'bg-surface-muted p-8 sm:p-10',
          tone === 'plain' && 'p-8 ring-1 ring-line sm:p-10',
          tone === 'dark' && 'bg-petrol-950 p-8 text-white sm:p-10',
          className,
        )}
      >
        {children}
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-small text-ink">{label}</span>
        {code ? <code className="font-mono text-caption text-muted">{code}</code> : null}
      </figcaption>
    </figure>
  )
}
