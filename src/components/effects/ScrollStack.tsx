'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Karten bleiben beim Scrollen oben kleben und schieben sich übereinander
 * (nach reactbits „Scroll Stack“, ohne Scroll-Hijacking: native Scrollposition bleibt erhalten).
 */
export function ScrollStack({ items }: { items: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative flex flex-col gap-6">
      {items.map((item, i) => (
        <StackItem key={i} index={i} total={items.length} progress={scrollYProgress}>
          {item}
        </StackItem>
      ))}
    </div>
  )
}

function StackItem({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const start = index / total
  const targetScale = 1 - (total - 1 - index) * 0.04
  const scale = useTransform(progress, [start, 1], [1, targetScale])
  const brightness = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.08])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div className="sticky" style={{ top: `calc(6rem + ${index * 1.25}rem)` }}>
      <motion.div
        style={reduce ? undefined : { scale, filter }}
        className="origin-top will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
