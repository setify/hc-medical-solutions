'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import type { Img } from '../../_lib/data'

/** Links klebt das Bild, rechts laufen Textschritte durch; das Bild wechselt mit dem aktiven Schritt. */
export function StickySteps({ items }: { items: { title: string; text: string; image: Img }[] }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = items[active] ?? items[0]!

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="top-36 hidden h-[min(70dvh,40rem)] overflow-hidden rounded-lg lg:sticky lg:block">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.image.src}
            className="absolute inset-0"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-4 left-4 font-mono text-caption text-white">
          0{active + 1} / 0{items.length}
        </span>
      </div>
      <div className="flex flex-col">
        {items.map((it, i) => (
          <div
            key={it.title}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            className="flex min-h-[60dvh] flex-col justify-center gap-5 border-l border-line py-10 pl-8"
          >
            <span
              className={cn(
                '-ml-[calc(2rem+1px)] h-10 w-px transition-colors duration-500',
                active === i ? 'bg-accent' : 'bg-transparent',
              )}
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:hidden">
              <Image
                src={it.image.src}
                alt={it.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <h4
              className={cn(
                'text-h2 font-light transition-colors duration-500',
                active === i ? 'text-ink' : 'text-muted',
              )}
            >
              {it.title}
            </h4>
            <p className="max-w-[46ch] text-body text-muted">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
