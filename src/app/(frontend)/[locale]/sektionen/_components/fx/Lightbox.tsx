'use client'

import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import type { Img } from '../../_lib/data'

/** Masonry-Galerie; Klick öffnet das Bild groß im nativen <dialog> mit Pfeiltasten-Navigation. */
export function MasonryLightbox({ items }: { items: (Img & { title: string })[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const ratios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[4/5]', 'aspect-[16/10]']

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  const step = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length))
  const current = index !== null ? items[index] : null

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((it, i) => (
          <li key={it.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative block w-full overflow-hidden rounded-lg ${ratios[i % ratios.length]}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-3 bg-gradient-to-t from-blue-950/85 to-transparent p-5 text-small text-white transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <span aria-hidden="true" className="h-4 w-px bg-blue-200" />
                {it.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        aria-label={current ? `Bild: ${current.title}` : 'Bild'}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        className="m-auto max-h-[92dvh] w-[min(72rem,94vw)] overflow-hidden rounded-lg bg-blue-950 p-0 text-white backdrop:bg-blue-950/85"
      >
        {current ? (
          <figure className="flex flex-col">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="94vw"
                className="object-contain"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 p-4">
              <span className="text-small">
                <span className="mr-3 font-mono text-caption text-blue-200">
                  {String((index ?? 0) + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')}
                </span>
                {current.title}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Vorheriges Bild"
                >
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Nächstes Bild"
                >
                  <ArrowRight aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(null)}
                  className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Schließen"
                >
                  <X aria-hidden="true" />
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  )
}
