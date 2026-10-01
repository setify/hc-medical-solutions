'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

import type { Img } from '../../_lib/data'

/**
 * Bild wächst beim Scrollen von der Karte zur vollen Fläche, die Überschrift teilt sich
 * (nach 21st.dev „Scroll Expansion Hero“). Ohne Bewegung: Bild sofort in voller Breite.
 */
export function ScrollExpandHero({
  image,
  first,
  second,
  lead,
}: {
  image: Img
  first: string
  second: string
  lead: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Zusammengesetzte Werte (clip-path) werden nicht begrenzt – Endwert deshalb bis 1 halten.
  const clip = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [
      'inset(22% 30% 22% 30% round 28px)',
      'inset(0% 1% 0% 1% round 28px)',
      'inset(0% 1% 0% 1% round 28px)',
    ],
  )
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.25, 1])
  const left = useTransform(scrollYProgress, [0, 0.6], ['0vw', '-18vw'])
  const right = useTransform(scrollYProgress, [0, 0.6], ['0vw', '18vw'])
  const textColor = useTransform(scrollYProgress, [0.25, 0.5], ['#061f33', '#ffffff'])
  const leadColor = useTransform(scrollYProgress, [0.25, 0.5], ['#4d5d64', '#cfeaf2'])
  const shade = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.55])

  return (
    <div ref={ref} className={reduce ? 'relative' : 'relative h-[240dvh]'}>
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden bg-canvas">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: clip }}>
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-blue-950"
            style={{ opacity: reduce ? 0.55 : shade }}
          />
        </motion.div>
        <div className="relative flex flex-col items-center gap-6 px-4 text-center">
          <h3 className="flex flex-col items-center text-display font-light md:flex-row md:gap-[0.3em]">
            <motion.span style={reduce ? { color: '#fff' } : { x: left, color: textColor }}>
              {first}
            </motion.span>
            <motion.span style={reduce ? { color: '#fff' } : { x: right, color: textColor }}>
              {second}
            </motion.span>
          </h3>
        </div>
        {/* Einleitung unterhalb des Bildausschnitts, damit sie am Anfang auf hellem Grund steht. */}
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-4 text-center md:bottom-10">
          <motion.p
            style={{ color: reduce ? '#cfeaf2' : leadColor }}
            className="max-w-[46ch] text-lead font-light"
          >
            {lead}
          </motion.p>
          <motion.p style={{ color: reduce ? '#cfeaf2' : leadColor }} className="text-caption">
            Weiterscrollen
          </motion.p>
        </div>
      </div>
    </div>
  )
}
