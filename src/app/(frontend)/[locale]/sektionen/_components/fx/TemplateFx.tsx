'use client'

import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { roundIconClasses } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Quote = { text: string; name: string; org: string; portrait: string }
type Person = { name: string; role: string; src: string }

/** Punkt-Navigation: aktiver Punkt wird zur Pille. */
function Dots({
  count,
  active,
  onSelect,
  label,
}: {
  count: number
  active: number
  onSelect: (i: number) => void
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`${label} ${i + 1}`}
          aria-current={i === active ? 'true' : undefined}
          className="grid h-6 min-w-6 place-items-center"
        >
          <span
            className={cn(
              'block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo',
              i === active ? 'w-7 bg-blue-950' : 'w-3 bg-frost-300 hover:bg-n-400',
            )}
          />
        </button>
      ))}
    </div>
  )
}

/** VL7: Karten-Karussell mit Scroll-Snap, runden Pfeilen und Punkt-Navigation. */
export function SpecialistCarousel({ people }: { people: Person[] }) {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      setActive(Math.round(el.scrollLeft / (first.offsetWidth + 20)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = (i: number) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (el && first) el.scrollTo({ left: i * (first.offsetWidth + 20), behavior: 'smooth' })
  }
  const max = people.length - 1

  return (
    <div className="flex flex-col gap-10">
      <ul
        ref={track}
        className="-mx-1 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-1 pb-2"
      >
        {people.map((p) => (
          <li key={p.src} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <article className="group relative overflow-hidden rounded-lg bg-surface shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={p.src}
                  alt={`Porträt ${p.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 78vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface via-surface/80 to-transparent"
                />
              </div>
              <div className="relative -mt-20 flex items-end justify-between gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <h4 className="text-h4">{p.name}</h4>
                  <p className="text-small text-muted">{p.role}</p>
                  <p className="mt-1 flex items-center gap-2 text-caption text-muted">
                    Erfahrung <span className="h-3 w-px bg-line-strong" /> Platzhalter
                  </p>
                </div>
                <a
                  href="#v-vl7"
                  aria-label={`Profil ${p.name}`}
                  className={roundIconClasses('dark')}
                >
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(Math.max(0, active - 1))}
          className={roundIconClasses('outline')}
          aria-label="Zurück"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
        </button>
        <Dots count={people.length} active={Math.min(active, max)} onSelect={go} label="Karte" />
        <button
          type="button"
          onClick={() => go(Math.min(max, active + 1))}
          className={roundIconClasses('outline')}
          aria-label="Weiter"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}

/** VL8: Fächer-Karussell – mittlere Karte dunkel und gerade, die übrigen gedreht und versetzt. */
export function FanCarousel({ quotes }: { quotes: Quote[] }) {
  const [active, setActive] = useState(Math.floor(quotes.length / 2))
  const reduce = useReducedMotion()
  const n = quotes.length

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="mask-fade-x relative h-[23rem] w-full overflow-hidden md:h-[25rem]">
        {quotes.map((q, i) => {
          // Ringförmig: links und rechts liegen immer gleich viele Karten.
          let off = i - active
          if (off > n / 2) off -= n
          if (off < -n / 2) off += n
          const abs = Math.abs(off)
          const isActive = off === 0
          return (
            <motion.figure
              key={q.name}
              aria-hidden={!isActive || undefined}
              className={cn(
                'absolute top-6 left-1/2 -ml-32 flex h-64 w-64 flex-col justify-between rounded-lg p-6 md:-ml-36 md:h-72 md:w-72',
                isActive ? 'bg-blue-950 text-white shadow-lg' : 'bg-surface-sunken text-ink',
              )}
              animate={{
                x: `${off * 106}%`,
                y: abs * abs * 14,
                rotate: reduce ? 0 : off * 7,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1,
              }}
              transition={
                reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 20 }
              }
            >
              <span
                className={cn(
                  'self-start rounded-full border px-3 py-1 text-caption',
                  isActive ? 'border-white/20 text-teal-300' : 'border-line-strong text-muted',
                )}
              >
                Thema
              </span>
              <blockquote className="text-small">{q.text}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="relative size-10 overflow-hidden rounded-full">
                  <Image src={q.portrait} alt="" fill sizes="2.5rem" className="object-cover" />
                </span>
                <span className="flex flex-col text-caption">
                  <span className={isActive ? 'text-white' : 'text-ink'}>{q.name}</span>
                  <span className={isActive ? 'text-blue-200' : 'text-muted'}>{q.org}</span>
                </span>
              </figcaption>
            </motion.figure>
          )
        })}
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => setActive((a) => (a - 1 + n) % n)}
          className={roundIconClasses('outline')}
          aria-label="Vorheriges Zitat"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
        </button>
        <Dots count={n} active={active} onSelect={setActive} label="Zitat" />
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % n)}
          className={roundIconClasses('outline')}
          aria-label="Nächstes Zitat"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}
