'use client'

import { useState } from 'react'

import { BrandArt } from '@/components/ui/BrandArt'
import { cn } from '@/lib/cn'

export type GalleryItem = { title: string; text: string; seed: number }

/**
 * Bildstreifen, die sich bei Hover, Fokus oder Klick auffächern (nach reactbits „Accordion Gallery“).
 * Tastatur: Tab fokussiert, Enter/Leertaste öffnet. Auf Mobilgeräten vertikal gestapelt.
 */
export function AccordionGallery({
  items,
  defaultIndex = 1,
}: {
  items: GalleryItem[]
  defaultIndex?: number
}) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className="flex h-[34rem] flex-col gap-2 md:h-[28rem] md:flex-row">
      {items.map((item, i) => {
        const isActive = i === active
        return (
          <button
            key={item.title}
            type="button"
            aria-expanded={isActive}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={cn(
              'group/ag relative min-h-16 min-w-0 overflow-hidden rounded-lg text-left transition-[flex-grow] duration-700 ease-out-expo md:min-h-0 md:min-w-16',
              isActive ? 'grow-[5]' : 'grow',
            )}
          >
            <span
              className={cn(
                'absolute inset-0 transition-[filter,transform] duration-700 ease-out-expo',
                isActive ? 'scale-100 grayscale-0' : 'scale-110 grayscale',
              )}
            >
              <BrandArt seed={item.seed} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-transparent to-transparent" />
            <span
              className={cn(
                'absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white transition-[opacity,transform] duration-500 ease-out-expo',
                isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0',
              )}
            >
              <span className="h-8 w-px bg-blue-200" aria-hidden="true" />
              <span className="text-h4">{item.title}</span>
              <span className="max-w-sm text-small text-white/85">{item.text}</span>
            </span>
            <span
              className={cn(
                'absolute top-5 left-5 text-caption font-normal text-white/80 tabular-nums transition-opacity',
                isActive ? 'opacity-0' : 'opacity-100',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
