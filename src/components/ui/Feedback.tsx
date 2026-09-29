import { CheckCircle, Info, Warning, WarningOctagon, Plus } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type AlertTone = 'info' | 'success' | 'warning' | 'danger'

const alertTones: Record<AlertTone, { box: string; icon: ReactNode }> = {
  info: {
    box: 'bg-blue-50 text-blue-800 border-blue-600',
    icon: <Info weight="fill" className="size-5" />,
  },
  success: {
    box: 'bg-success-50 text-success-700 border-success-700',
    icon: <CheckCircle weight="fill" className="size-5" />,
  },
  warning: {
    box: 'bg-warning-50 text-warning-700 border-warning-700',
    icon: <Warning weight="fill" className="size-5" />,
  },
  danger: {
    box: 'bg-red-50 text-red-700 border-red-600',
    icon: <WarningOctagon weight="fill" className="size-5" />,
  },
}

/** Inline-Hinweis. `role="alert"` nur für Fehler, sonst `status`. */
export function Alert({
  tone = 'info',
  title,
  children,
}: {
  tone?: AlertTone
  title: string
  children?: ReactNode
}) {
  const t = alertTones[tone]
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-md border-l-2 p-4 pr-5', t.box)}
    >
      <span aria-hidden="true" className="mt-0.5 shrink-0">
        {t.icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-small font-normal">{title}</p>
        {children ? <div className="text-caption">{children}</div> : null}
      </div>
    </div>
  )
}

/** FAQ-Akkordeon mit nativem <details> – funktioniert ohne JavaScript, Höhe animiert per CSS. */
export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line [interpolate-size:allow-keywords]">
      {items.map((item) => (
        <details
          key={item.q}
          name="faq"
          className="group/acc [&::details-content]:h-0 [&::details-content]:overflow-clip [&::details-content]:transition-[height,content-visibility] [&::details-content]:transition-discrete [&::details-content]:duration-500 [&::details-content]:ease-out-expo open:[&::details-content]:h-auto"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-h4 text-ink transition-colors hover:text-petrol-700 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-open/acc:border-primary group-open/acc:bg-primary group-open/acc:text-white"
            >
              <Plus className="size-4 transition-transform duration-500 ease-out-expo group-open/acc:rotate-45" />
            </span>
          </summary>
          <div className="max-w-[65ch] pb-7 text-body text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  )
}

/** Prozess-Schritte (z. B. Seite „Vorgehensweise“) mit durchgehender Linie. */
export function ProcessSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-px bg-line md:top-5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="reveal-up relative flex gap-5 md:flex-col md:gap-6">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-primary bg-surface text-small font-normal text-primary tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-2 pt-1.5 md:pt-0 md:pr-6">
            <h3 className="text-h4">{step.title}</h3>
            <p className="text-small text-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Leerer Zustand, z. B. „Aktuell keine offenen Stellen“. */
export function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-5 rounded-xl border border-dashed border-line-strong p-10">
      <span aria-hidden="true" className="flex h-12 items-end gap-1.5">
        {[28, 44, 20, 36, 12].map((h, i) => (
          <span key={i} className="w-px rounded-full bg-petrol-200" style={{ height: h }} />
        ))}
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-h4">{title}</p>
        <p className="max-w-md text-small text-muted">{text}</p>
      </div>
      {action}
    </div>
  )
}

/** Brotkrumen-Navigation. */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Brotkrumen">
      <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="h-3 w-px bg-line-strong" /> : null}
            {item.href ? (
              <a href={item.href} className="underline-offset-4 hover:text-ink hover:underline">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
