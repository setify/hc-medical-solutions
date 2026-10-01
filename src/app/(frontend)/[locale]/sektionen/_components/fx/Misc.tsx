'use client'

import { ArrowRight, CaretDown } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Accordion } from '@/components/ui/Feedback'
import { cn } from '@/lib/cn'

import type { Img } from '../../_lib/data'

/** F2: FAQ mit Themenreitern. */
export function FaqTabs({
  groups,
}: {
  groups: { label: string; items: { q: string; a: ReactNode }[] }[]
}) {
  const [i, setI] = useState(0)
  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="FAQ-Themen"
        className="flex gap-6 overflow-x-auto border-b border-line"
      >
        {groups.map((g, k) => (
          <button
            key={g.label}
            role="tab"
            id={`faq-tab-${k}`}
            aria-selected={k === i}
            aria-controls="faq-panel"
            onClick={() => setI(k)}
            className={cn(
              'relative py-3 text-small whitespace-nowrap transition-colors',
              k === i ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            {g.label}
            {k === i ? (
              <motion.span
                layoutId="faq-line"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
              />
            ) : null}
          </button>
        ))}
      </div>
      <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${i}`}>
        <Accordion items={groups[i]!.items} />
      </div>
    </div>
  )
}

type MenuGroup = { label: string; items: { title: string; text: string }[]; image: Img }

/** N1: Mega-Menü mit Vorschau (nach 21st.dev „Navigation Menu“). Klick oder Hover öffnet. */
export function MegaMenu({ groups }: { groups: MenuGroup[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const g = open !== null ? groups[open] : null

  return (
    <nav
      ref={ref}
      aria-label="Beispiel Mega-Menü"
      className="relative"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="flex h-16 items-center justify-between gap-6 rounded-full border border-line bg-surface pr-2 pl-6">
        <span className="py-5 text-small font-medium">Logo</span>
        <ul className="flex items-center gap-1 rounded-full bg-surface-muted p-1">
          {groups.map((grp, k) => (
            <li key={grp.label}>
              <button
                type="button"
                aria-expanded={open === k}
                aria-controls="mega-panel"
                onClick={() => setOpen(open === k ? null : k)}
                onMouseEnter={() => setOpen(k)}
                className={cn(
                  'relative flex h-10 items-center gap-1.5 rounded-full px-4 text-small transition-colors',
                  open === k ? 'bg-surface text-ink shadow-xs' : 'text-muted hover:text-ink',
                )}
              >
                {grp.label}
                <CaretDown
                  aria-hidden="true"
                  className={cn(
                    'size-3.5 transition-transform duration-300',
                    open === k && 'rotate-180',
                  )}
                />
                {open === k ? (
                  <motion.span
                    layoutId="mega-line"
                    className="absolute inset-x-3 bottom-3 h-px bg-accent"
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="#v-n1"
          className="hidden h-12 items-center rounded-full bg-blue-950 px-6 text-small text-teal-300 hover:bg-blue-900 sm:inline-flex"
        >
          Kontakt
        </a>
      </div>
      <AnimatePresence>
        {g ? (
          <motion.div
            id="mega-panel"
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="absolute inset-x-0 top-full z-20 mt-3 overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
          >
            <motion.div layout className="grid gap-2 p-4 md:grid-cols-[1.3fr_1fr]">
              <ul className="grid gap-1 sm:grid-cols-2">
                {g.items.map((it, k) => (
                  <motion.li
                    key={g.label + it.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: k * 0.04 }}
                  >
                    <a
                      href="#v-n1"
                      className="group flex flex-col gap-1 rounded-md p-4 transition-colors hover:bg-surface-muted"
                    >
                      <span className="flex items-center gap-2 text-small text-ink">
                        {it.title}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 -translate-x-1 text-accent opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      <span className="text-caption text-muted">{it.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="relative hidden min-h-56 overflow-hidden rounded-md md:block">
                <Image src={g.image.src} alt="" fill sizes="30vw" className="object-cover" />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/90 to-transparent p-5 text-small text-white">
                  Hervorgehobener Inhalt im Menü
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}

/** C3: Richtungsbewusster Hover – die Fläche fährt von der Seite ein, von der die Maus kommt. */
export function DirectionalLink({ children, href }: { children: ReactNode; href: string }) {
  const [from, setFrom] = useState<'top' | 'bottom'>('bottom')
  const [on, setOn] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setFrom(e.clientY - r.top < r.height / 2 ? 'top' : 'bottom')
        setOn(true)
      }}
      onMouseLeave={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setFrom(e.clientY - r.top < r.height / 2 ? 'top' : 'bottom')
        setOn(false)
      }}
      className="group relative isolate flex items-center justify-between gap-6 overflow-hidden border-y border-line py-10 transition-colors duration-500 hover:text-white md:py-14"
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 bg-primary transition-transform duration-500 ease-out-expo',
          on ? 'translate-y-0' : from === 'top' ? '-translate-y-full' : 'translate-y-full',
        )}
      />
      <span className="px-4 text-display font-extralight md:px-8">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="mr-4 size-10 shrink-0 transition-transform duration-500 ease-out-expo group-hover:-rotate-45 md:mr-8"
      />
    </a>
  )
}
