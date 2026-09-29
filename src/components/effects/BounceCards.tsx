'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { BrandArt } from '@/components/ui/BrandArt'

/** Aufgefächerter Kartenstapel, der beim Hover auseinanderspringt (nach reactbits „Bounce Cards“). */
const base = [
  { rotate: 10, x: -150 },
  { rotate: 5, x: -75 },
  { rotate: -3, x: 0 },
  { rotate: -10, x: 75 },
  { rotate: 2, x: 150 },
]

export function BounceCards({
  seeds = [0, 1, 2, 3, 5],
  label,
}: {
  seeds?: number[]
  label: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const reduce = useReducedMotion()
  // Auf schmalen Viewports enger auffächern (nach Mount, damit SSR und Client übereinstimmen).
  const [spread, setSpread] = useState(1)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setSpread(mq.matches ? 0.55 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto flex h-80 w-full max-w-xl items-center justify-center"
    >
      {seeds.slice(0, base.length).map((seed, i) => {
        const b = base[i]!
        const isHovered = hovered === i
        const push = hovered === null || isHovered ? 0 : i < hovered ? -60 : 60
        return (
          <motion.div
            key={seed}
            className="absolute aspect-[4/5] w-36 overflow-hidden rounded-xl border-[6px] border-white shadow-md sm:w-44"
            style={{ zIndex: isHovered ? 10 : i }}
            initial={false}
            animate={{
              rotate: isHovered ? 0 : b.rotate,
              x: b.x * spread + push * spread,
              y: isHovered ? -12 : 0,
            }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    type: 'spring',
                    stiffness: 220,
                    damping: 18,
                    delay: Math.abs((hovered ?? i) - i) * 0.03,
                  }
            }
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <BrandArt seed={seed} />
          </motion.div>
        )
      })}
    </div>
  )
}
