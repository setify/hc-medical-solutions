'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

/**
 * Zahl zählt beim Sichtbarwerden hoch (nach reactbits „Count Up“).
 * Server-HTML enthält bereits den Endwert – ohne JavaScript oder mit reduzierter Bewegung steht er sofort da.
 */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  locale = 'de-DE',
  className,
}: {
  to: number
  from?: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  locale?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const format = (v: number) =>
    `${prefix}${v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`

  useEffect(() => {
    if (!inView || reduce || !ref.current) return
    const el = ref.current
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {format(to)}
    </span>
  )
}
