'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import type { Img } from '../../_lib/data'

/**
 * Senkrechtes Scrollen schiebt die Bildreihe waagerecht (Horizontal Scroll Hijack).
 * Ohne Bewegung und auf Touch-Geräten: normale waagerechte Scroll-Leiste.
 */
export function HorizontalScroll({ items }: { items: (Img & { title: string })[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useEffect(() => {
    const measure = () => {
      if (track.current)
        setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const cards = items.map((it, i) => (
    <figure key={it.src} className="flex w-[78vw] shrink-0 flex-col gap-3 sm:w-[46vw] lg:w-[32vw]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <Image
          src={it.src}
          alt={it.alt}
          fill
          sizes="(min-width: 1024px) 32vw, 78vw"
          className="object-cover"
        />
      </div>
      <figcaption className="flex items-baseline gap-3 text-small">
        <span className="font-mono text-caption text-accent-strong">
          {String(i + 1).padStart(2, '0')}
        </span>
        {it.title}
      </figcaption>
    </figure>
  ))

  if (reduce) {
    return (
      <div
        role="region"
        aria-label="Bildreihe, waagerecht scrollbar"
        tabIndex={0}
        className="flex gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-10"
      >
        {cards}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[300dvh]">
      <div className="sticky top-28 flex h-[calc(100dvh-7rem)] items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex gap-6 px-4 sm:px-6 lg:px-10">
          {cards}
        </motion.div>
      </div>
    </div>
  )
}
