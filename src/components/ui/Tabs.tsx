'use client'

import { motion } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** Tabs nach WAI-ARIA-Muster (Pfeiltasten, Pos1/Ende) mit gleitendem Indikator. */
export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKey(e: KeyboardEvent) {
    const last = tabs.length - 1
    const next =
      e.key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : e.key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className="inline-flex gap-1 rounded-full bg-n-100 p-1"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'relative h-10 rounded-full px-5 text-small font-normal transition-colors',
              i === active ? 'text-white' : 'text-n-700 hover:text-ink',
            )}
          >
            {i === active ? (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-primary shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-8 focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
