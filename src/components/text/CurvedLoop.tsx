'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

/**
 * Endlos-Laufschrift entlang einer Kurve (nach reactbits „Curved Loop“).
 * Ziehen mit Maus/Finger ändert Richtung und Tempo. Rein dekorativ – Text ist zusätzlich als sr-only vorhanden.
 */
export function CurvedLoop({
  text,
  speed = 1.2,
  curve = 90,
  className,
}: {
  text: string
  speed?: number
  curve?: number
  className?: string
}) {
  const pathId = useId().replace(/:/g, '')
  const measureRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const [spacing, setSpacing] = useState(0)
  const reduce = useReducedMotion()
  const drag = useRef({ active: false, lastX: 0, velocity: 0, dir: -1 })
  const phrase = `${text.trim()}  —  `

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength())
  }, [phrase])

  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const tp = textPathRef.current
    let offset = -spacing
    let frame = 0
    const step = () => {
      if (!drag.current.active && !reduce) {
        offset += speed * drag.current.dir
        if (offset <= -spacing * 2) offset += spacing
        if (offset > 0) offset -= spacing
        tp.setAttribute('startOffset', `${offset}px`)
      }
      frame = requestAnimationFrame(step)
    }
    tp.setAttribute('startOffset', `${offset}px`)
    frame = requestAnimationFrame(step)
    const onDrag = (dx: number) => {
      offset += dx
      if (offset <= -spacing * 2) offset += spacing
      if (offset > 0) offset -= spacing
      tp.setAttribute('startOffset', `${offset}px`)
    }
    ;(tp as unknown as { __drag: (dx: number) => void }).__drag = onDrag
    return () => cancelAnimationFrame(frame)
  }, [spacing, speed, reduce])

  const repeats = spacing ? Math.ceil(3000 / spacing) + 2 : 4
  const content = Array.from({ length: repeats }, () => phrase).join('')

  return (
    <div
      className={cn('w-full cursor-grab touch-pan-y select-none active:cursor-grabbing', className)}
      onPointerDown={(e) => {
        drag.current.active = true
        drag.current.lastX = e.clientX
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!drag.current.active) return
        const dx = e.clientX - drag.current.lastX
        drag.current.lastX = e.clientX
        drag.current.velocity = dx
        ;(textPathRef.current as unknown as { __drag?: (dx: number) => void })?.__drag?.(dx)
      }}
      onPointerUp={() => {
        drag.current.active = false
        if (drag.current.velocity !== 0) drag.current.dir = drag.current.velocity > 0 ? 1 : -1
      }}
    >
      <span className="sr-only">{text}</span>
      <svg aria-hidden="true" viewBox="0 0 1440 220" className="block w-full overflow-visible">
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className="text-[5.5rem] font-light"
          style={{ visibility: 'hidden' }}
        >
          {phrase}
        </text>
        <defs>
          <path
            id={pathId}
            d={`M-100,${60 + curve / 2} Q720,${60 + curve * 1.6} 1540,${60 + curve / 2}`}
            fill="none"
          />
        </defs>
        {spacing > 0 ? (
          <text
            xmlSpace="preserve"
            className="fill-blue-600 text-[5.5rem] font-light tracking-tight"
          >
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {content}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  )
}
