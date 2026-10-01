'use client'

import { Plus } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/cn'

import type { Img } from '../../_lib/data'

type Spot = { x: number; y: number; title: string; text: string }

/** Bild mit Markierungen, die per Klick eine Erklärung zeigen (z. B. Lagerablauf). */
export function Hotspots({ image, spots }: { image: Img; spots: Spot[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {spots.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-pressed={open === i}
            aria-label={`Markierung ${i + 1}: ${s.title}`}
            onClick={() => setOpen(open === i ? null : i)}
            className={cn(
              'absolute flex size-9 -translate-1/2 items-center justify-center rounded-full border transition-colors duration-300',
              open === i
                ? 'border-white bg-signal text-blue-950'
                : 'border-white/70 bg-blue-950/70 text-white hover:bg-primary',
            )}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-breathe rounded-full border border-white/60"
            />
            <Plus
              aria-hidden="true"
              className={cn(
                'size-4 transition-transform duration-500 ease-out-expo',
                open === i && 'rotate-45',
              )}
            />
          </button>
        ))}
      </div>
      <ol className="flex flex-col divide-y divide-line border-y border-line">
        {spots.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={cn(
                'flex w-full flex-col gap-2 py-5 text-left transition-colors',
                open === i ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              <span className="flex items-baseline gap-3 text-h4">
                <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
                {s.title}
              </span>
              <span
                className={cn(
                  'grid transition-[grid-template-rows] duration-500 ease-out-expo',
                  open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <span className="overflow-hidden text-small text-muted">{s.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
