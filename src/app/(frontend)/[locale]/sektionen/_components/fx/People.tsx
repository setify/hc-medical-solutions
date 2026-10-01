'use client'

import { ArrowLeft, ArrowRight, EnvelopeSimple, Phone } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

type Quote = { text: string; name: string; org: string; portrait: string }
type Person = { name: string; role: string; src: string }

const btn =
  'flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary-strong active:scale-[0.97]'

/** R1: Porträtstapel dreht sich, Zitat blendet Wort für Wort ein (nach 21st.dev „Animated Testimonials“). */
export function AnimatedTestimonials({
  quotes,
  autoplay = true,
}: {
  quotes: Quote[]
  autoplay?: boolean
}) {
  const [i, setI] = useState(0)
  // Erst nach dem ersten Wechsel einblenden: Der Server-HTML-Text ist sofort lesbar.
  const [changed, setChanged] = useState(false)
  const reduce = useReducedMotion()
  const n = quotes.length
  const go = (d: number) => {
    setChanged(true)
    setI((v) => (v + d + n) % n)
  }
  const next = () => go(1)
  const prev = () => go(-1)

  useEffect(() => {
    if (!autoplay || reduce) return
    const id = window.setInterval(() => {
      setChanged(true)
      setI((v) => (v + 1) % n)
    }, 6000)
    return () => window.clearInterval(id)
  }, [autoplay, reduce, n, i])

  // Feste Drehwinkel je Karte (kein Zufall → kein Hydration-Mismatch)
  const rot = (k: number) => ((k * 37) % 21) - 10
  const q = quotes[i]!

  return (
    <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        <AnimatePresence>
          {quotes.map((t, k) => {
            const active = k === i
            return (
              <motion.div
                key={t.portrait + k}
                className="absolute inset-0 origin-bottom overflow-hidden rounded-lg"
                initial={false}
                animate={{
                  opacity: active ? 1 : 0.7,
                  scale: active ? 1 : 0.94,
                  rotate: active || reduce ? 0 : rot(k),
                  zIndex: active ? 40 : n - Math.abs(k - i),
                  y: active && !reduce ? [0, -60, 0] : 0,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Image src={t.portrait} alt="" fill sizes="24rem" className="object-cover" />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-8">
        <figure className="flex min-h-64 flex-col gap-6" aria-live="polite">
          <blockquote key={i} className="text-h3 font-light text-ink">
            {q.text.split(' ').map((w, k) => (
              <motion.span
                key={k}
                className="inline-block"
                initial={reduce || !changed ? false : { filter: 'blur(8px)', y: 5 }}
                animate={{ filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.02 * k }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </blockquote>
          <figcaption className="flex flex-col">
            <span className="text-h4">{q.name}</span>
            <span className="text-small text-muted">{q.org}</span>
          </figcaption>
        </figure>
        <div className="flex gap-2">
          <button type="button" onClick={prev} className={btn} aria-label="Vorheriges Zitat">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={next} className={btn} aria-label="Nächstes Zitat">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

/** R4: Zitat-Wechsel mit großem Anführungszeichen und Nummernleiste. */
export function QuoteSlider({ quotes }: { quotes: Quote[] }) {
  const [i, setI] = useState(0)
  const q = quotes[i]!
  return (
    <div className="grid gap-10 md:grid-cols-[6rem_1fr]">
      <span aria-hidden="true" className="text-[8rem] leading-[0.7] font-extralight text-blue-300">
        „
      </span>
      <div className="flex flex-col gap-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={i}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex flex-col gap-6"
          >
            <blockquote className="text-h2 font-light text-white">{q.text}</blockquote>
            <figcaption className="text-small text-blue-200">
              {q.name}, {q.org}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <ol className="flex gap-6">
          {quotes.map((_, k) => (
            <li key={k}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-label={`Zitat ${k + 1}`}
                aria-current={k === i ? 'true' : undefined}
                className={cn(
                  'relative py-2 font-mono text-caption transition-colors',
                  k === i ? 'text-white' : 'text-blue-200 hover:text-white',
                )}
              >
                {String(k + 1).padStart(2, '0')}
                {k === i ? (
                  <motion.span
                    layoutId="qs-line"
                    className="absolute inset-x-0 bottom-0 h-px bg-white"
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/** P2: Ausgewählte Person groß, Liste daneben (nach 21st.dev „Team Section“). */
export function TeamFeatured({ people }: { people: Person[] }) {
  const [i, setI] = useState(0)
  const p = people[i]!
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg lg:aspect-auto lg:min-h-[34rem]">
        <AnimatePresence initial={false}>
          <motion.div
            key={p.src}
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={p.src}
              alt={`Porträt ${p.name}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-blue-950/90 to-transparent p-8 text-white">
          <p className="text-h3 font-light">{p.name}</p>
          <p className="text-small text-blue-100">{p.role}</p>
        </div>
      </div>
      <ul className="flex flex-col divide-y divide-line self-center border-y border-line">
        {people.map((q, k) => (
          <li key={q.src}>
            <button
              type="button"
              onClick={() => setI(k)}
              onMouseEnter={() => setI(k)}
              aria-pressed={k === i}
              className={cn(
                'flex w-full items-center justify-between gap-4 py-5 text-left transition-colors',
                k === i ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-caption text-accent-strong">
                  {String(k + 1).padStart(2, '0')}
                </span>
                <span className="text-h4">{q.name}</span>
              </span>
              <span className="text-small">{q.role}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** P4: Ansprechperson mit direkter Kontaktmöglichkeit. */
export function ContactPerson({ person, dark }: { person: Person; dark?: boolean }) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-md">
        <Image
          src={person.src}
          alt={`Porträt ${person.name}`}
          fill
          sizes="6rem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-h4">{person.name}</p>
        <p className={cn('text-small', dark ? 'text-blue-200' : 'text-muted')}>{person.role}</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-small">
          <a
            href="#v-p4"
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
          >
            <Phone aria-hidden="true" className="size-4" />
            Telefon
          </a>
          <a
            href="#v-p4"
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
          >
            <EnvelopeSimple aria-hidden="true" className="size-4" />
            E-Mail
          </a>
        </p>
      </div>
    </div>
  )
}
