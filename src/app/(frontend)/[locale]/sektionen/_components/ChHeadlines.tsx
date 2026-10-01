import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import { GradientText } from '@/components/text/GradientText'
import { RotatingText } from '@/components/text/RotatingText'
import { cn } from '@/lib/cn'

import { images } from '../_lib/data'
import { Chapter, Variant } from './Frame'

function Row({
  code,
  name,
  children,
  dark,
}: {
  code: string
  name: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div
      id={`v-${code.toLowerCase()}`}
      className={cn(
        'scroll-mt-40 border-b',
        dark ? 'panel my-6 border-0 bg-blue-950 text-white' : 'border-line',
      )}
    >
      <div className="container-page grid gap-6 py-14 md:grid-cols-[10rem_1fr] md:py-20">
        <p
          className={cn('flex flex-col gap-1 text-caption', dark ? 'text-blue-200' : 'text-muted')}
        >
          <span
            className={cn(
              'font-mono text-small font-medium',
              dark ? 'text-white' : 'text-accent-strong',
            )}
          >
            {code}
          </span>
          {name}
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}

/** Buchstaben steigen gestaffelt aus der Maske, gesteuert vom Scrollen (CSS). */
function VerticalCut({ text }: { text: string }) {
  return (
    <span>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, w, words) => {
        const before = words.slice(0, w).join('').length
        return (
          <span
            key={w}
            aria-hidden="true"
            className="inline-flex overflow-hidden pb-[0.1em] align-bottom"
          >
            {word.split('').map((ch, c) => (
              <span
                key={c}
                className="reveal-cut inline-block"
                style={
                  {
                    animationRange: `entry ${5 + (before + c) * 1.2}% cover ${28 + (before + c) * 1.2}%`,
                  } as CSSProperties
                }
              >
                {ch}
              </span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        )
      })}
    </span>
  )
}

export function ChHeadlines() {
  return (
    <Chapter
      id="ueberschriften"
      no="02"
      title="Überschriften"
      intro="Die alte Seite nutzte eine Überschriftenart. Hier sechzehn Typen: mit Linie, Verlauf, Kontur, Markierung, Bild im Satz, Bewegung und Kombinationen aus Thema und Aussage."
    >
      <Variant
        code="U"
        name="Überschriftentypen"
        note="jede Zeile einzeln wählbar"
        tags={['Typografie']}
      >
        <Row code="U1" name="Klassisch mit Linie">
          <p className="eyebrow mb-4">Qualitätsversprechen</p>
          <h3 className="text-h1 font-light">Eine Überschrift, eine Aussage</h3>
        </Row>
        <Row code="U2" name="Wandernder Verlauf im Wort">
          <h3 className="text-h1 font-light">
            Überschrift mit{' '}
            <GradientText colors={['#00566b', '#007f9d', '#5fb3cc', '#00566b']}>
              Verlauf
            </GradientText>{' '}
            im Schlüsselwort
          </h3>
        </Row>
        <Row code="U3" name="Verlauf über die ganze Zeile">
          <h3 className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-400 bg-clip-text pb-2 text-display font-light text-transparent">
            Von tief nach hell
          </h3>
        </Row>
        <Row code="U4" name="Kontur und Fläche kombiniert">
          <h3 className="text-display font-normal">
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]">
              Kontur
            </span>{' '}
            <span className="text-ink">trifft Fläche</span>
          </h3>
        </Row>
        <Row code="U5" name="Zwei Gewichte, zwei Farben">
          <h3 className="text-h1">
            <span className="font-extralight text-muted">Wir liefern Medizinprodukte</span>{' '}
            <span className="font-normal text-ink">für den europäischen Markt</span>
          </h3>
        </Row>
        <Row code="U6" name="Nummeriert">
          <div className="flex items-start gap-6 md:gap-10">
            <span
              aria-hidden="true"
              className="text-display leading-none font-extralight text-transparent tabular-nums [-webkit-text-stroke:1px_var(--color-blue-300)]"
            >
              03
            </span>
            <div className="flex flex-col gap-3 pt-2">
              <h3 className="text-h2">Nummer als Gliederung</h3>
              <p className="max-w-[48ch] text-body text-muted">
                Passt zu Abläufen und Kapiteln einer langen Seite.
              </p>
            </div>
          </div>
        </Row>
        <Row code="U7" name="Markierung beim Scrollen">
          <h3 className="text-h1 font-light">
            Ein Begriff wird{' '}
            <span className="mark-sweep bg-gradient-to-r from-blue-100 to-blue-100 [background-size:100%_100%] bg-left bg-no-repeat px-1">
              hervorgehoben
            </span>
          </h3>
        </Row>
        <Row code="U8" name="Unterstrich zeichnet sich">
          <h3 className="text-h1 font-light">
            Die Linie{' '}
            <span className="relative inline-block">
              unterstreicht
              <span
                aria-hidden="true"
                className="draw-x absolute -bottom-1 left-0 h-0.5 w-full bg-accent"
              />
            </span>{' '}
            das Wichtige
          </h3>
        </Row>
        <Row code="U9" name="Wechselwort">
          <h3 className="text-h1 font-light">
            Für{' '}
            <RotatingText
              words={['Kliniken', 'Praxen', 'Apotheken', 'den Handel']}
              className="font-normal text-primary"
            />
          </h3>
        </Row>
        <Row code="U10" name="Bild im Satz">
          <h3 className="text-h1 leading-[1.2] font-light">
            Menschen{' '}
            <span className="relative inline-block h-[0.8em] w-[1.7em] overflow-hidden rounded-full align-[-0.05em]">
              <Image src={images.meeting.src} alt="" fill sizes="10rem" className="object-cover" />
            </span>{' '}
            und Prozesse{' '}
            <span className="relative inline-block h-[0.8em] w-[1.7em] overflow-hidden rounded-full align-[-0.05em]">
              <Image src={images.papers.src} alt="" fill sizes="10rem" className="object-cover" />
            </span>{' '}
            gehören zusammen
          </h3>
        </Row>
        <Row code="U11" name="Vertikaler Schnitt">
          <h3 className="text-display font-light">
            <VerticalCut text="Buchstabe für Buchstabe" />
          </h3>
          <p className="mt-3 text-caption text-muted">
            nach 21st.dev Vertical Cut Reveal, hier rein per CSS gesteuert
          </p>
        </Row>
        <Row code="U12" name="Mit Randnotiz">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_16rem]">
            <h3 className="text-display font-light">Große Aussage</h3>
            <p className="border-l border-accent pl-4 text-small text-muted">
              Randnotiz, die die Überschrift einordnet oder auf eine Quelle verweist.
            </p>
          </div>
        </Row>
        <Row code="U13" name="Kontur zeichnet sich">
          <svg
            viewBox="0 0 900 120"
            className="h-auto w-full max-w-4xl"
            role="img"
            aria-label="Präzision"
          >
            <defs>
              <linearGradient id="u13g" x1="0" x2="1">
                <stop offset="0%" stopColor="#061f33" />
                <stop offset="60%" stopColor="#007f9d" />
                <stop offset="100%" stopColor="#5fb3cc" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="100"
              className="draw-stroke font-sans"
              fontSize="118"
              fontWeight="300"
              fill="url(#u13g)"
              stroke="url(#u13g)"
              strokeWidth="1.2"
              strokeDasharray="1600"
              style={{ '--dash': 1600 } as CSSProperties}
            >
              Präzision
            </text>
          </svg>
        </Row>
        <Row code="U14" name="Farbfeld hinter dem Wort">
          <h3 className="text-h1 font-light">
            Wir machen{' '}
            <span className="rounded-full bg-signal [box-decoration-break:clone] px-4 text-blue-950">
              Abläufe sichtbar
            </span>
          </h3>
        </Row>
        <Row code="U15" name="Kombiniert: Thema und Aussage">
          <a href="#v-u15" className="group flex flex-col gap-2">
            <span className="text-h4 font-medium text-primary-strong">Lagerlogistik</span>
            <span className="flex items-end gap-4 text-display font-extralight">
              Alles an seinem Platz
              <ArrowUpRight
                aria-hidden="true"
                className="mb-3 size-10 shrink-0 text-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </a>
        </Row>
        <Row code="U16" name="Laufband-Überschrift" dark>
          <div className="-mx-4 overflow-hidden sm:-mx-6 md:mx-0 lg:-mx-10">
            <span className="sr-only">Qualität, Sicherheit, Verfügbarkeit</span>
            <p
              aria-hidden="true"
              className="flex w-max animate-marquee text-display font-extralight whitespace-nowrap"
              style={{ '--marquee-duration': '26s' } as CSSProperties}
            >
              {[0, 1].map((k) => (
                <span key={k} className="flex items-center gap-10 pr-10">
                  <span>Qualität</span>
                  <span className="h-[0.6em] w-px bg-blue-300" />
                  <span className="text-transparent [-webkit-text-stroke:1px_var(--color-blue-200)]">
                    Sicherheit
                  </span>
                  <span className="h-[0.6em] w-px bg-blue-300" />
                  <span>Verfügbarkeit</span>
                  <span className="h-[0.6em] w-px bg-blue-300" />
                </span>
              ))}
            </p>
          </div>
        </Row>
      </Variant>
    </Chapter>
  )
}
