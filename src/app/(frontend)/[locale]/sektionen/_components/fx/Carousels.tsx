'use client'

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import type { Img } from '../../_lib/data'

type Item = Img & { title: string; text?: string }

function Arrows({
  onPrev,
  onNext,
  dark,
}: {
  onPrev: () => void
  onNext: () => void
  dark?: boolean
}) {
  const cls = cn(
    'flex size-11 items-center justify-center rounded-full border transition-colors active:scale-[0.97]',
    dark
      ? 'border-white/25 text-white hover:bg-white/10'
      : 'border-line-strong text-ink hover:border-primary hover:text-primary-strong',
  )
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onPrev} className={cls} aria-label="Zurück">
        <ArrowLeft aria-hidden="true" />
      </button>
      <button type="button" onClick={onNext} className={cls} aria-label="Weiter">
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  )
}

/** K1: Scroll-Snap-Karussell mit Fortschrittslinie. Wischen, Pfeile oder Tastatur. */
export function SnapCarousel({ items }: { items: Item[] }) {
  const track = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      const p = max > 0 ? el.scrollLeft / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${0.12 + p * 0.88})`
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const by = (dir: number) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (el && first) el.scrollBy({ left: dir * (first.offsetWidth + 24), behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-8">
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Karussell, mit Pfeiltasten scrollen"
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((it, i) => (
          <li key={it.src} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[30%]">
            <figure className="group flex flex-col gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex flex-col gap-1">
                <span className="font-mono text-caption text-accent-strong">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-h4">{it.title}</span>
                {it.text ? <span className="text-small text-muted">{it.text}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-8">
        <span className="relative h-px flex-1 bg-line">
          <span
            ref={bar}
            className="absolute inset-0 origin-left scale-x-[0.12] bg-primary transition-transform duration-300"
          />
        </span>
        <Arrows onPrev={() => by(-1)} onNext={() => by(1)} />
      </div>
    </div>
  )
}

/** K2: Coverflow – Mitte vorn, Ränder gekippt. */
export function Coverflow({ items }: { items: Item[] }) {
  const [active, setActive] = useState(2)
  const reduce = useReducedMotion()
  const n = items.length
  const go = (d: number) => setActive((a) => (a + d + n) % n)

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className="relative h-[clamp(16rem,40vw,26rem)] w-full [perspective:1400px]"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
      >
        {items.map((it, i) => {
          let off = i - active
          if (off > n / 2) off -= n
          if (off < -n / 2) off += n
          const abs = Math.abs(off)
          return (
            <motion.button
              key={it.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${it.title} anzeigen`}
              aria-current={off === 0 ? 'true' : undefined}
              tabIndex={abs > 2 ? -1 : 0}
              className="absolute top-0 left-1/2 aspect-[3/4] h-full -translate-x-1/2 overflow-hidden rounded-lg shadow-lg"
              animate={{
                x: `${off * 62}%`,
                rotateY: off * -38,
                scale: 1 - abs * 0.12,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1,
                filter: `brightness(${1 - abs * 0.18})`,
              }}
              transition={
                reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }
              }
            >
              <Image src={it.src} alt={it.alt} fill sizes="30vw" className="object-cover" />
            </motion.button>
          )
        })}
      </div>
      <div className="flex items-center gap-8">
        <p aria-live="polite" className="min-w-40 text-center text-h4">
          {items[active]?.title}
        </p>
        <Arrows onPrev={() => go(-1)} onNext={() => go(1)} />
      </div>
    </div>
  )
}

/** K4: Zieh-Karussell mit Trägheit (motion drag). */
export function DragCarousel({ items }: { items: Item[] }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (outer.current && inner.current)
        setLeft(Math.min(0, outer.current.offsetWidth - inner.current.scrollWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div ref={outer} className="cursor-grab overflow-hidden active:cursor-grabbing">
      <motion.div
        ref={inner}
        drag="x"
        dragConstraints={{ left, right: 0 }}
        dragElastic={0.08}
        className="flex w-max gap-5"
      >
        {items.map((it, i) => (
          <article
            key={it.src}
            className="flex w-72 shrink-0 flex-col justify-between gap-16 rounded-lg border border-white/15 bg-white/5 p-7 text-white select-none md:w-80"
          >
            <span className="font-mono text-caption text-blue-200">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-3">
              <span aria-hidden="true" className="h-8 w-px bg-blue-300" />
              <h4 className="text-h3 font-light">{it.title}</h4>
              <p className="text-small text-blue-100">{it.text ?? 'Kurzer Text zur Karte.'}</p>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  )
}

/** K5: Diashow mit Fortschrittssegmenten (Story-Prinzip), pausiert bei Hover und Fokus. */
export function StorySlideshow({ items, duration = 5000 }: { items: Item[]; duration?: number }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const next = useCallback(() => setI((v) => (v + 1) % items.length), [items.length])

  useEffect(() => {
    if (paused || reduce) return
    const id = window.setTimeout(next, duration)
    return () => window.clearTimeout(id)
  }, [i, paused, reduce, next, duration])

  const it = items[i]!
  return (
    <div
      className="relative isolate aspect-[4/5] overflow-hidden rounded-lg bg-blue-950 text-white sm:aspect-[16/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={it.src}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={it.src}
            alt={it.alt}
            fill
            sizes="(min-width: 1400px) 1320px, 100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-blue-950/40"
      />
      <div className="absolute inset-x-0 top-0 flex gap-2 p-5">
        {items.map((s, k) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Bild ${k + 1}: ${s.title}`}
            aria-current={k === i ? 'true' : undefined}
            className="relative h-6 flex-1"
          >
            <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden bg-white/25">
              <span
                className={cn(
                  'absolute inset-0 origin-left bg-white',
                  k < i ? 'scale-x-100' : 'scale-x-0',
                )}
                style={
                  k === i && !reduce
                    ? {
                        animation: `draw-x ${duration}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }
                    : k === i
                      ? { transform: 'scaleX(1)' }
                      : undefined
                }
              />
            </span>
          </button>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10">
        <p aria-live="polite" className="text-h2 font-light">
          {it.title}
        </p>
        <p className="max-w-[46ch] text-small text-blue-100">
          {it.text ?? 'Kurzer Text zum Bild.'}
        </p>
      </div>
    </div>
  )
}
