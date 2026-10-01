import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import { Logo } from '@/components/brand/Logo'
import { CurvedLoop } from '@/components/text/CurvedLoop'
import { cn } from '@/lib/cn'

import { images } from '../_lib/data'
import { Chapter, Variant } from './Frame'
import { BackgroundPaths } from '@/components/effects/BackgroundPaths'

function Swatch({
  code,
  name,
  className,
  dark,
  children,
  style,
}: {
  code: string
  name: string
  className?: string
  dark?: boolean
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <figure id={`v-${code.toLowerCase()}`} className="flex scroll-mt-40 flex-col gap-3">
      <div
        className={cn(
          'relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-lg p-8',
          dark && 'text-white',
          className,
        )}
        style={style}
      >
        {children}
        <p className={cn('relative text-h3 font-light')}>Überschrift</p>
        <p className={cn('relative text-small', dark ? 'text-white' : 'text-muted')}>
          Fließtext auf diesem Grund
        </p>
      </div>
      <figcaption className="flex items-baseline gap-3 text-small">
        <span className="font-mono font-medium text-accent-strong">{code}</span>
        {name}
      </figcaption>
    </figure>
  )
}

export function ChBackgrounds() {
  return (
    <Chapter
      id="hintergruende"
      no="16"
      title="Sektionshintergründe"
      intro="Vierzehn Flächen, aus denen sich der Rhythmus einer Seite ergibt. Faustregel: pro Seite höchstens zwei dunkle Flächen, Muster nur in ruhigen Sektionen."
    >
      <Variant
        code="HG"
        name="Flächen und Muster"
        note="jede Kachel einzeln wählbar"
        tags={['Farbe', 'Muster']}
      >
        <div className="container-page grid gap-x-6 gap-y-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
          <Swatch code="HG1" name="Weiß" className="border border-line bg-surface" />
          <Swatch code="HG2" name="Hellgrau" className="bg-surface-muted" />
          <Swatch code="HG3" name="Vertieft" className="bg-surface-sunken" />
          <Swatch code="HG4" name="Hellblau" className="bg-blue-50" />
          <Swatch code="HG5" name="Tiefblau (Standard dunkel)" className="bg-blue-950" dark />
          <Swatch code="HG6" name="Blau 900 (Abstufung)" className="bg-blue-900" dark />
          <Swatch code="HG7" name="Hausfarbe Blau" className="bg-primary" dark />
          <Swatch
            code="HG8"
            name="Verlauf tief zu Hausblau"
            className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700"
            dark
          />
          <Swatch
            code="HG9"
            name="Linienraster"
            className="bg-lines border border-line bg-surface"
            style={{ '--pattern-size': '3rem' } as CSSProperties}
          />
          <Swatch
            code="HG10"
            name="Kästchenraster"
            className="bg-grid bg-surface-muted"
            style={{ '--pattern': 'var(--color-n-200)', '--pattern-size': '2rem' } as CSSProperties}
          />
          <Swatch
            code="HG11"
            name="Punkteraster"
            className="bg-dots border border-line bg-surface"
          />
          <Swatch code="HG12" name="Lamellen dunkel" className="bg-slats bg-blue-950" dark />
          <Swatch code="HG13" name="Bild abgedunkelt" dark>
            <Image src={images.fog.src} alt="" fill sizes="33vw" className="-z-20 object-cover" />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-950 to-blue-950/30"
            />
          </Swatch>
          <Swatch code="HG14" name="Linienbündel animiert" className="bg-blue-950" dark>
            <BackgroundPaths className="-z-10 text-blue-300" />
          </Swatch>
          <Swatch
            code="HG15"
            name="Diagonaler Schnitt"
            className="bg-[linear-gradient(115deg,var(--color-blue-50)_0_58%,var(--color-blue-100)_58%_100%)]"
          />
        </div>
      </Variant>
    </Chapter>
  )
}

/** Zwei Flächen mit Übergang, damit ein Trenner im Zusammenhang sichtbar wird. */
function Demo({
  code,
  name,
  note,
  top,
  bottom,
  children,
}: {
  code: string
  name: string
  note?: string
  top: string
  bottom: string
  children: ReactNode
}) {
  return (
    <Variant code={code} name={name} note={note}>
      {/* Vorschau als gerahmtes Panel: zwei Sektionen mit dem Übergang dazwischen. */}
      <div className="panel bg-surface ring-1 ring-line/60 ring-inset">
        <div className={cn('h-24 md:h-32', top)} />
        {children}
        <div className={cn('h-24 md:h-32', bottom)} />
      </div>
    </Variant>
  )
}

export function ChDividers() {
  return (
    <Chapter
      id="trenner"
      no="17"
      title="Trenner und Übergänge"
      intro="Wie Sektionen ineinander übergehen, prägt die Seite genauso wie ihr Inhalt. Die Formen mit Schnitt und Linie greifen das Bildzeichen auf und passen am besten zur Marke."
    >
      <Demo code="D1" name="Haarlinie" top="bg-surface" bottom="bg-surface">
        <div className="container-page">
          <hr className="border-line" />
        </div>
      </Demo>

      <Demo
        code="D2"
        name="Linie mit Marke"
        note="Bildzeichen-Schnitt als Knoten"
        top="bg-surface"
        bottom="bg-surface"
      >
        <div className="container-page flex items-center gap-4" role="separator">
          <span className="h-px flex-1 bg-line" />
          <span className="h-6 w-px bg-accent" />
          <span className="h-px w-16 bg-line" />
        </div>
      </Demo>

      <Demo
        code="D3"
        name="Schräger Schnitt"
        note="passt zum Bildzeichen"
        top="bg-surface"
        bottom="bg-blue-950"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full md:h-28"
        >
          <polygon points="0,120 1440,0 1440,120" className="fill-blue-950" />
        </svg>
      </Demo>

      <Demo code="D4" name="Stufe" top="bg-surface-muted" bottom="bg-surface">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-12 w-full bg-surface md:h-20"
        >
          <polygon points="0,0 1440,0 1440,40 620,40 620,80 0,80" className="fill-surface-muted" />
        </svg>
      </Demo>

      <Demo code="D5" name="Sanfte Welle" top="bg-blue-950" bottom="bg-surface">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full bg-surface md:h-28"
        >
          <path
            d="M0,0 H1440 V40 C1200,120 960,120 720,70 C480,20 240,20 0,80 Z"
            className="fill-blue-950"
          />
        </svg>
      </Demo>

      <Demo code="D6" name="Bogen" top="bg-surface" bottom="bg-blue-50">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full md:h-28"
        >
          <path d="M0,120 Q720,-40 1440,120 Z" className="fill-blue-50" />
        </svg>
      </Demo>

      <Demo
        code="D7"
        name="Lamellen-Übergang"
        note="Leitmotiv Linie"
        top="bg-surface"
        bottom="bg-blue-950"
      >
        <div aria-hidden="true" className="flex h-24 items-end gap-[6px] overflow-hidden md:h-32">
          {Array.from({ length: 120 }, (_, i) => (
            <span
              key={i}
              className="w-[6px] shrink-0 bg-blue-950"
              style={{ height: `${Math.round(8 + ((Math.sin(i / 6) + 1) / 2) * 92)}%` }}
            />
          ))}
        </div>
      </Demo>

      <Demo code="D8" name="Punktlinie" top="bg-surface" bottom="bg-surface">
        <div className="container-page">
          <div role="separator" className="border-t-2 border-dotted border-n-400" />
        </div>
      </Demo>

      <Demo code="D9" name="Linie zeichnet sich beim Scrollen" top="bg-surface" bottom="bg-surface">
        <div className="container-page">
          <div role="separator" className="draw-x h-0.5 bg-primary" />
        </div>
      </Demo>

      <Variant code="D10" name="Karte über der Kante">
        <div className="panel bg-surface ring-1 ring-line/60 ring-inset">
          <div className="h-48 bg-blue-950" />
          <div className="relative bg-surface pb-24">
            <div className="container-page">
              <div className="-mt-24 grid gap-6 rounded-lg bg-surface p-8 shadow-lg md:grid-cols-3 md:p-10">
                {['Erster Punkt', 'Zweiter Punkt', 'Dritter Punkt'].map((t, i) => (
                  <div
                    key={t}
                    className="flex flex-col gap-2 md:border-l md:border-line md:pl-6 md:first:border-l-0 md:first:pl-0"
                  >
                    <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
                    <span className="text-h4">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Variant>

      <Demo code="D11" name="Weicher Verlauf" top="bg-blue-950" bottom="bg-surface-muted">
        <div aria-hidden="true" className="h-40 bg-gradient-to-b from-blue-950 to-surface-muted" />
      </Demo>

      <Demo code="D12" name="Bildzeichen auf der Linie" top="bg-surface" bottom="bg-surface">
        <div className="container-page flex items-center gap-6">
          <span className="h-px flex-1 bg-line" />
          <Logo format="hoch" decorative className="h-16 w-auto" />
          <span className="h-px flex-1 bg-line" />
        </div>
      </Demo>

      <Demo code="D13" name="Laufband als Trenner" top="bg-surface" bottom="bg-surface">
        <div className="overflow-hidden bg-primary py-4 text-white">
          <p className="sr-only">Qualität, Sicherheit, Verfügbarkeit, Transparenz</p>
          <div
            aria-hidden="true"
            className="flex w-max animate-marquee text-h4 font-light"
            style={{ '--marquee-duration': '40s' } as CSSProperties}
          >
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center gap-8 pr-8">
                {[
                  'Qualität',
                  'Sicherheit',
                  'Verfügbarkeit',
                  'Transparenz',
                  'Qualität',
                  'Sicherheit',
                  'Verfügbarkeit',
                  'Transparenz',
                ].map((w, i) => (
                  <span key={i} className="flex items-center gap-8">
                    {w}
                    <span className="h-4 w-px bg-blue-200" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </Demo>

      <Demo
        code="D14"
        name="Text auf Kurve"
        note="Bestand aus dem Styleguide"
        top="bg-surface"
        bottom="bg-surface"
      >
        <CurvedLoop text="Medizinprodukte für Europa · " />
      </Demo>

      <Variant code="D15" name="Linie läuft durch die Sektionen" note="Leitmotiv über die Kante">
        <div className="panel bg-surface ring-1 ring-line/60 ring-inset">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-6 w-px bg-accent md:left-10"
          />
          <div className="bg-surface py-20">
            <div className="container-page pl-10 md:pl-16">
              <p className="text-h3 font-light">Sektion A</p>
            </div>
          </div>
          <div className="bg-surface-muted py-20">
            <div className="container-page pl-10 md:pl-16">
              <p className="text-h3 font-light">Sektion B</p>
            </div>
          </div>
          <div className="bg-blue-950 py-20 text-white">
            <div className="container-page pl-10 md:pl-16">
              <p className="text-h3 font-light">Sektion C</p>
            </div>
          </div>
        </div>
      </Variant>
    </Chapter>
  )
}
