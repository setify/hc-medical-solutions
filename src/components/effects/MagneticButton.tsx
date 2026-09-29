'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { buttonClasses, type ButtonSize, type ButtonVariant } from '@/components/ui/Button'

/** Button, der sich leicht zum Mauszeiger zieht. Bewegung außerhalb des React-Renderzyklus. */
export function MagneticButton({
  children,
  variant = 'primary',
  size = 'lg',
  strength = 0.3,
  className,
}: {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 160, damping: 16, mass: 0.4 })

  function onMove(e: PointerEvent<HTMLButtonElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      type="button"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={buttonClasses({ variant, size, className })}
    >
      <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2.5">
        {children}
      </motion.span>
    </motion.button>
  )
}
