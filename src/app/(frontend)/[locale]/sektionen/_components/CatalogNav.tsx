'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

/** Klebende Kapitelleiste unter dem Header mit Scroll-Spy und Fortschrittslinie. */
export function CatalogNav({
  chapters,
}: {
  chapters: { id: string; no: string; label: string }[]
}) {
  const [active, setActive] = useState(chapters[0]?.id)
  const listRef = useRef<HTMLOListElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })

    // Fortschritt direkt am DOM, ohne React-Render pro Scroll-Ereignis.
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? window.scrollY / max : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [chapters])

  // Aktives Kapitel in der Leiste sichtbar halten.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <nav
      aria-label="Kapitel der Sektionsbibliothek"
      className="sticky top-[5.25rem] z-30 mt-3 px-3 sm:px-4 lg:px-6"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-full border border-line/70 bg-surface/95 shadow-xs backdrop-blur-sm">
        <ol ref={listRef} className="flex [scrollbar-width:none] gap-1 overflow-x-auto p-1.5">
          {chapters.map((c) => {
            const isActive = c.id === active
            return (
              <li key={c.id} data-id={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex h-9 items-baseline gap-2 rounded-full px-4 pt-2 text-small whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-blue-950 text-white'
                      : 'text-muted hover:bg-surface-muted hover:text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-caption tabular-nums',
                      isActive && 'text-teal-300',
                    )}
                  >
                    {c.no}
                  </span>
                  {c.label}
                </a>
              </li>
            )
          })}
        </ol>
        <span
          ref={barRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-signal"
        />
      </div>
    </nav>
  )
}
