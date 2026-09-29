import { ArrowUpRight, MapPin, Clock } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

type Tone = 'plain' | 'muted' | 'inverse' | 'outline'

const tones: Record<Tone, string> = {
  plain: 'bg-surface shadow-sm ring-1 ring-line/70',
  muted: 'bg-surface-muted',
  inverse: 'bg-petrol-950 text-white shadow-edge',
  outline: 'border border-line',
}

export function Card({
  children,
  tone = 'plain',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return <div className={cn('rounded-xl p-8', tones[tone], className)}>{children}</div>
}

/** Leistungs-Card mit Index und wachsender Linie (Linien-Motiv). */
export function ServiceCard({
  index,
  title,
  text,
  href = '#',
}: {
  index: string
  title: string
  text: string
  href?: string
}) {
  return (
    <article className="group/svc relative flex min-h-72 flex-col justify-between overflow-hidden rounded-xl bg-surface p-8 shadow-sm ring-1 ring-line/70 transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lg hover:ring-petrol-200">
      <span
        aria-hidden="true"
        className="absolute top-0 left-8 h-10 w-px origin-top bg-accent transition-transform duration-700 ease-out-expo group-hover/svc:scale-y-[3]"
      />
      <span className="pt-6 text-caption font-normal text-muted tabular-nums">{index}</span>
      <div className="flex flex-col gap-3">
        <h3 className="text-h4 text-ink">
          <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </a>
        </h3>
        <p className="text-small text-muted">{text}</p>
      </div>
      <span
        aria-hidden="true"
        className="absolute top-8 right-8 grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover/svc:border-primary group-hover/svc:bg-primary group-hover/svc:text-white"
      >
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/svc:rotate-45" />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent group-has-[:focus-visible]/svc:ring-focus" />
    </article>
  )
}

/** Stellenanzeige für die Karriereseite. Die ganze Karte ist klickbar. */
export function JobCard({
  title,
  location,
  type,
  href = '#',
  isNew,
}: {
  title: string
  location: string
  type: string
  href?: string
  isNew?: boolean
}) {
  return (
    <article className="group/job relative grid gap-4 border-b border-line px-2 py-7 transition-colors duration-300 hover:border-petrol-300 hover:bg-petrol-50/60 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success" live>
            Aktiv
          </Badge>
          {isNew ? <Badge tone="accent">Neu</Badge> : null}
        </div>
        <h3 className="text-h4 text-ink">
          <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </a>
        </h3>
        <p className="flex flex-wrap gap-x-6 gap-y-1 text-small text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4" /> {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4" /> {type}
          </span>
        </p>
      </div>
      <span
        aria-hidden="true"
        className="inline-flex items-center gap-2 text-small font-normal text-ink transition-colors group-hover/job:text-accent-strong"
      >
        Details
        <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-expo group-hover/job:translate-x-1 group-hover/job:-translate-y-1" />
      </span>
      <span className="pointer-events-none absolute inset-0 ring-2 ring-transparent group-has-[:focus-visible]/job:ring-focus" />
    </article>
  )
}

/** Card mit Lichtreflex beim Hover (nach reactbits „Glare Hover“, reines CSS). */
export function GlareCard({
  children,
  className,
  tone = 'inverse',
}: {
  children: ReactNode
  className?: string
  tone?: 'inverse' | 'light'
}) {
  return (
    <div
      className={cn(
        'group/glare relative isolate overflow-hidden rounded-xl p-8',
        tone === 'inverse'
          ? 'bg-petrol-900 text-white ring-1 ring-white/10'
          : 'bg-surface ring-1 ring-line',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[length:250%_250%] bg-[position:-100%_-100%] bg-no-repeat transition-[background-position] duration-[900ms] ease-out-expo group-hover/glare:bg-[position:100%_100%]"
        style={{
          backgroundImage: `linear-gradient(-45deg, transparent 60%, ${tone === 'inverse' ? 'rgb(160 204 224 / 0.35)' : 'rgb(0 127 157 / 0.14)'} 70%, transparent 100%)`,
        }}
      />
      {children}
    </div>
  )
}
