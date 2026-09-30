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
      className={cn('flex gap-3 rounded-sm border-l-2 p-4 pr-5', t.box)}
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
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-h4 text-ink transition-colors hover:text-primary-strong [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-[transform,color] duration-500 ease-out-expo group-open/acc:rotate-45 group-open/acc:text-accent-strong"
            />
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
    <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="reveal-up relative flex flex-col gap-4 border-l border-line pl-6 md:border-t md:border-l-0 md:pt-6 md:pl-0"
        >
          <span
            aria-hidden="true"
            className="absolute -top-px -left-px h-10 w-px bg-accent md:h-px md:w-10"
          />
          <span className="text-caption font-normal text-accent-strong tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-2 md:pr-6">
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
    <div className="flex flex-col items-start gap-5 border-l border-line-strong py-2 pl-8">
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
