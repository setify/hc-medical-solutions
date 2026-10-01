'use client'

import { ArrowRight } from '@phosphor-icons/react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import type { Img } from '../../_lib/data'

/** L3: Reiter links, Bild und Text wechseln rechts (mit geteiltem Unterstrich). */
export function TabsImage({ items }: { items: { title: string; text: string; image: Img }[] }) {
  const [active, setActive] = useState(0)
  const it = items[active]!
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
      <div
        role="tablist"
        aria-label="Leistungen"
        aria-orientation="vertical"
        className="flex flex-col border-l border-line"
      >
        {items.map((t, i) => (
          <button
            key={t.title}
            role="tab"
            id={`ti-tab-${i}`}
            aria-selected={i === active}
            aria-controls="ti-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') setActive((active + 1) % items.length)
              if (e.key === 'ArrowUp') setActive((active - 1 + items.length) % items.length)
            }}
            className={cn(
              'relative py-5 pl-6 text-left text-h3 font-light transition-colors',
              i === active ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            {i === active ? (
              <motion.span
                layoutId="ti-line"
                className="absolute top-0 -left-px h-full w-0.5 bg-primary"
              />
            ) : null}
            {t.title}
          </button>
        ))}
      </div>
      <div
        id="ti-panel"
        role="tabpanel"
        aria-labelledby={`ti-tab-${active}`}
        className="flex flex-col gap-6"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <AnimatePresence initial={false}>
            <motion.div
              key={it.image.src}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0%)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={it.image.src}
                alt={it.image.alt}
                fill
                sizes="60vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="max-w-[52ch] text-body text-muted">{it.text}</p>
      </div>
    </div>
  )
}

/** L5: Zeilenliste; beim Hover folgt ein Vorschaubild dem Mauszeiger (nur Zeigergeräte). */
export function HoverPreviewList({
  items,
}: {
  items: { title: string; text: string; image: Img }[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22 })
  const sy = useSpring(y, { stiffness: 180, damping: 22 })

  return (
    <div
      ref={ref}
      className="relative"
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onPointerLeave={() => setHover(null)}
    >
      <ul className="divide-y divide-line border-y border-line">
        {items.map((it, i) => (
          <li key={it.title}>
            <a
              href="#v-l5"
              onPointerEnter={() => setHover(i)}
              className="group grid items-baseline gap-2 py-7 md:grid-cols-[4rem_1fr_1fr_2rem] md:gap-6"
            >
              <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
              <span className="text-h2 font-light transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                {it.title}
              </span>
              <span className="text-small text-muted">{it.text}</span>
              <ArrowRight
                aria-hidden="true"
                className="hidden size-5 text-accent opacity-0 transition-opacity group-hover:opacity-100 md:block"
              />
            </a>
          </li>
        ))}
      </ul>
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute top-0 left-0 hidden [@media(hover:hover)]:block"
      >
        <AnimatePresence>
          {hover !== null ? (
            <motion.div
              key={hover}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative -mt-28 ml-6 h-44 w-64 overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={items[hover]!.image.src}
                alt=""
                fill
                sizes="16rem"
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/** L2 Bento-Kachel: Liste sortiert sich endlos um (layout-Animation). */
export const SortingList = memo(function SortingList() {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState([
    'Charge 2417-A',
    'Charge 0932-C',
    'Charge 1188-B',
    'Charge 3051-D',
  ])
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => setOrder((o) => [o[o.length - 1]!, ...o.slice(0, -1)]),
      2400,
    )
    return () => window.clearInterval(id)
  }, [reduce])
  return (
    <ul className="flex flex-col gap-2">
      {order.map((c, i) => (
        <motion.li
          key={c}
          layout
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className={cn(
            'flex items-center justify-between rounded-full border px-4 py-2 text-small',
            i === 0 ? 'border-primary bg-blue-50 text-ink' : 'border-line bg-surface text-muted',
          )}
        >
          {c}
          <span className="font-mono text-caption">{i === 0 ? 'geprüft' : 'wartet'}</span>
        </motion.li>
      ))}
    </ul>
  )
})

/** L2 Bento-Kachel: atmender Statuspunkt mit auftauchender Meldung. */
export const LiveStatus = memo(function LiveStatus() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setShow((s) => !s), 3000)
    return () => window.clearInterval(id)
  }, [reduce])
  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-3 text-small">
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 animate-breathe rounded-full bg-success-700" />
          <span className="relative size-2.5 rounded-full bg-success-700" />
        </span>
        Lager verfügbar
      </div>
      <div className="h-12">
        <AnimatePresence>
          {show ? (
            <motion.p
              initial={{ y: 12, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-4 py-2 text-caption text-white"
            >
              <span className="h-3 w-px bg-blue-300" />
              Beispielmeldung: Lieferung versendet
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
})

/** L2 Bento-Kachel: Suchzeile mit Schreibmaschinen-Effekt. */
export const TypingSearch = memo(function TypingSearch() {
  const reduce = useReducedMotion()
  const phrases = ['Chargennummer suchen', 'Sicherheitsdatenblatt', 'Konformitätserklärung']
  const [text, setText] = useState(phrases[0]!)
  useEffect(() => {
    if (reduce) return
    let p = 0
    let c = 0
    let del = false
    const id = window.setInterval(() => {
      const word = phrases[p]!
      c += del ? -1 : 1
      setText(word.slice(0, c))
      if (!del && c === word.length + 12) del = true
      if (del && c === 0) {
        del = false
        p = (p + 1) % phrases.length
      }
    }, 70)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])
  return (
    <div className="flex items-center gap-3 rounded-full border border-line-strong bg-surface px-5 py-3 text-small">
      <span className="h-4 w-px bg-accent" />
      <span className="text-ink">{text}</span>
      <span aria-hidden="true" className="-ml-2 h-4 w-0.5 animate-pulse bg-ink" />
    </div>
  )
})

/** A1: Lebenslinie – senkrechte Linie füllt sich beim Scrollen, Knoten leuchten auf (nach 21st.dev „Lifeline“). */
export function Lifeline({ items }: { items: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 50%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [reached, setReached] = useState(-1)
  useEffect(
    () =>
      scrollYProgress.on('change', (v) => {
        setReached(Math.floor(v * items.length * 0.999 + 0.35) - 1)
      }),
    [scrollYProgress, items.length],
  )
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <ol ref={ref} className="relative flex flex-col gap-16 pl-12 md:pl-16">
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[7px]"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY, opacity: glow }}
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-primary md:left-[7px]"
      />
      {items.map((it, i) => (
        <li key={it.title} className="relative flex flex-col gap-2">
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-2 -left-12 size-[11px] rounded-full border transition-colors duration-500 md:-left-16 md:size-[15px]',
              i <= reached ? 'border-primary bg-primary' : 'border-line-strong bg-surface',
            )}
          />
          <span className="font-mono text-caption text-accent-strong">Schritt {i + 1}</span>
          <h4
            className={cn(
              'text-h3 font-light transition-colors duration-500',
              i <= reached ? 'text-ink' : 'text-muted',
            )}
          >
            {it.title}
          </h4>
          <p className="max-w-[52ch] text-body text-muted">{it.text}</p>
        </li>
      ))}
    </ol>
  )
}
