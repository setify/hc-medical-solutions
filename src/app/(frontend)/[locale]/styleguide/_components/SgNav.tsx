'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

/** Seitennavigation mit Scroll-Spy: markiert den sichtbaren Abschnitt. */
export function SgNav({ sections }: { sections: { id: string; no: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Styleguide-Abschnitte"
      className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto lg:block"
    >
      <ol className="relative flex flex-col border-l border-line">
        {sections.map((s) => {
          const isActive = s.id === active
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative -ml-px flex gap-4 border-l py-2 pl-5 text-small transition-colors duration-300',
                  isActive
                    ? 'border-accent text-ink'
                    : 'border-transparent text-muted hover:text-ink',
                )}
              >
                <span className="w-5 pt-0.5 text-caption tabular-nums">{s.no}</span>
                {s.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
