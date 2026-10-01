import Image from 'next/image'
import type { CSSProperties } from 'react'

import { AccordionGallery } from '@/components/effects/AccordionGallery'
import { BounceCards } from '@/components/effects/BounceCards'

import { gallery, images, services } from '../_lib/data'
import { Chapter, Pad, Variant } from './Frame'
import { Coverflow, DragCarousel, SnapCarousel, StorySlideshow } from './fx/Carousels'
import { HorizontalScroll } from './fx/HorizontalScroll'
import { MasonryLightbox } from './fx/Lightbox'

export function ChGallery() {
  const bento = [images.meeting, images.road, images.papers, images.glasses, images.office]
  return (
    <Chapter
      id="galerien"
      no="05"
      title="Galerien"
      intro="Auf der alten Seite gab es keine Galerie. Sechs Formen für Bildstrecken: vom ruhigen Raster bis zur Bildreihe, die beim Scrollen seitwärts läuft."
    >
      <Variant code="G1" name="Masonry mit Großansicht" tags={['Interaktiv', 'Viele Bilder']}>
        <Pad>
          <MasonryLightbox items={gallery} />
        </Pad>
      </Variant>

      <Variant code="G2" name="Bento-Raster" tags={['Statisch', 'Hervorhebung']}>
        <Pad tone="muted">
          <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[13rem] md:grid-cols-4">
            {bento.map((im, i) => (
              <figure
                key={im.src}
                className={
                  [
                    'col-span-2 row-span-2',
                    'col-span-2 md:col-span-2',
                    'col-span-1',
                    'col-span-1',
                    'col-span-2 md:col-span-4 lg:col-span-2',
                  ][i] + ' group relative overflow-hidden rounded-lg'
                }
              >
                <Image
                  src={im.src}
                  alt={im.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
                <figcaption className="absolute bottom-0 left-0 m-3 rounded-full bg-surface px-4 py-1.5 text-caption text-ink">
                  {gallery[i]?.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </Pad>
      </Variant>

      <Variant
        code="G3"
        name="Akkordeon-Streifen"
        note="Bestand aus dem Styleguide"
        tags={['Interaktiv']}
      >
        <Pad>
          <AccordionGallery
            items={services.map((s, i) => ({ title: s.title, text: s.text, seed: i + 1 }))}
          />
        </Pad>
      </Variant>

      <Variant code="G4" name="Seitwärts beim Scrollen" tags={['Scroll', 'Wirkungsvoll']}>
        <div className="pt-16">
          <div className="container-page mb-4">
            <h3 className="text-h2 font-light">Bildreihe läuft seitwärts</h3>
          </div>
          <HorizontalScroll items={gallery.slice(0, 7)} />
        </div>
      </Variant>

      <Variant code="G5" name="Kachelreihe mit Fokus" tags={['Hover', 'Kompakt']}>
        <Pad>
          <ul className="group/row flex h-80 gap-2">
            {gallery.slice(0, 6).map((im) => (
              <li
                key={im.src}
                className="relative flex-1 overflow-hidden rounded-md transition-[flex-grow,opacity] duration-700 ease-out-expo group-hover/row:opacity-60 hover:!flex-[3] hover:!opacity-100"
              >
                <Image src={im.src} alt={im.alt} fill sizes="30vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Pad>
      </Variant>

      <Variant
        code="G6"
        name="Aufgefächerter Stapel"
        note="Bestand aus dem Styleguide"
        tags={['Hover', 'Verspielt']}
      >
        <Pad tone="muted" className="flex justify-center">
          <BounceCards label="Bildstapel" />
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChCarousel() {
  const withText = gallery.map((g) => ({ ...g, text: 'Kurzer beschreibender Satz zum Bild.' }))
  return (
    <Chapter
      id="karussells"
      no="06"
      title="Karussells"
      intro="Fünf Arten, mehrere Inhalte auf engem Raum zu zeigen. Alle lassen sich mit Tastatur bedienen; automatische Wechsel pausieren bei Hover und stehen still, wenn Bewegung reduziert ist."
    >
      <Variant code="K1" name="Wisch-Karussell mit Fortschritt" tags={['Touch', 'Ruhig']}>
        <Pad>
          <SnapCarousel items={withText} />
        </Pad>
      </Variant>
      <Variant code="K2" name="Coverflow" tags={['3D', 'Verspielt']}>
        <Pad tone="muted">
          <Coverflow items={gallery.slice(0, 7)} />
        </Pad>
      </Variant>
      <Variant code="K3" name="Endlose Bildbänder" tags={['Automatisch', 'Atmosphäre']}>
        <div
          className="flex flex-col gap-4 overflow-hidden py-20"
          aria-label="Bildband"
          role="group"
        >
          {[false, true].map((rev) => (
            <div key={String(rev)} className="mask-fade-x">
              <ul
                className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]"
                style={
                  {
                    '--marquee-duration': '60s',
                    animationDirection: rev ? 'reverse' : 'normal',
                  } as CSSProperties
                }
              >
                {[...gallery, ...gallery].map((im, i) => (
                  <li
                    key={i}
                    aria-hidden={i >= gallery.length || undefined}
                    className="relative h-44 w-64 shrink-0 overflow-hidden rounded-md md:h-56 md:w-80"
                  >
                    <Image
                      src={im.src}
                      alt={i >= gallery.length ? '' : im.alt}
                      fill
                      sizes="20rem"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Variant>
      <Variant code="K4" name="Zieh-Karussell mit Karten" tags={['Dunkel', 'Drag']}>
        <Pad tone="teal">
          <h3 className="mb-10 text-h2 font-light">Zum Ziehen</h3>
          <DragCarousel items={withText.map((w, i) => ({ ...w, title: services[i % 4]!.title }))} />
        </Pad>
      </Variant>
      <Variant code="K5" name="Diashow mit Fortschrittssegmenten" tags={['Automatisch', 'Bild']}>
        <Pad>
          <StorySlideshow items={withText.slice(0, 5)} />
        </Pad>
      </Variant>
    </Chapter>
  )
}
