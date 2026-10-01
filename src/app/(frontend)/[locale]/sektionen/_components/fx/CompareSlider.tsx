'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import type { Img } from '../../_lib/data'

/** Zwei Bilder übereinander, getrennt durch eine verschiebbare Linie. Tastatur über den Schieberegler. */
export function CompareSlider({ before, after }: { before: Img; after: Img }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] touch-pan-y overflow-hidden rounded-lg select-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        fromPointer(e.clientX)
      }}
      onPointerMove={(e) => e.buttons === 1 && fromPointer(e.clientX)}
    >
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover grayscale"
        />
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-blue-950/80 px-3 py-1 text-caption text-white">
        Vorher
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-blue-950/80 px-3 py-1 text-caption text-white">
        Nachher
      </span>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-1/2 items-center justify-center gap-1 rounded-full bg-white shadow-md">
          <span className="h-5 w-px bg-primary" />
          <span className="h-5 w-px bg-primary" />
        </span>
      </div>
      <label className="sr-only" htmlFor="compare-range">
        Bildvergleich verschieben
      </label>
      <input
        id="compare-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
      />
    </div>
  )
}
