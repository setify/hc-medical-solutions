import { ArrowDown, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import MicroSlats from '@/components/effects/MicroSlats'
import { RotatingText } from '@/components/text/RotatingText'
import { ButtonLink } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Feedback'
import { LineButton } from '@/components/ui/LineButton'

import { images, lorem, services } from '../_lib/data'
import { Chapter, Kicker, Variant } from './Frame'
import { BackgroundPaths } from '@/components/effects/BackgroundPaths'
import { Globe } from './fx/Globe'
import { ScrollExpandHero } from './fx/ScrollExpandHero'

/** Wörter einzeln aus der Maske steigen lassen (CSS, ohne JavaScript). */
function CutWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className="cut-in inline-block"
            style={{ '--i': i + offset } as React.CSSProperties}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </>
  )
}

export function ChHero() {
  return (
    <Chapter
      id="hero"
      no="01"
      title="Hero & Seitenköpfe"
      intro="Der erste Eindruck jeder Seite. Die alte Website hatte einen Textkopf und ein Vollbild. Hier neun Varianten von ruhig bis bewegt, dazu zwei Köpfe für Unterseiten."
    >
      <Variant code="H1" name="Geteilt mit Bildkante" tags={['Hell', 'Bild', 'Statisch']}>
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-8">
            <Kicker>Medizinprodukte für Europa</Kicker>
            <h3 className="text-display font-light">
              Überschrift mit <span className="text-primary">klarer Aussage</span> in zwei Zeilen
            </h3>
            <p className="max-w-[48ch] text-lead font-light text-muted">{lorem.short}</p>
            <div className="flex flex-wrap items-center gap-6">
              <ButtonLink href="#v-h1" size="lg" iconRight={<ArrowRight />}>
                Kontakt aufnehmen
              </ButtonLink>
              <LineButton href="#v-h1">Mehr erfahren</LineButton>
            </div>
          </div>
          <div className="relative pl-6 md:pl-12">
            <span aria-hidden="true" className="absolute top-12 bottom-24 left-0 w-px bg-accent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={images.meeting.src}
                alt={images.meeting.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-8 -left-2 max-w-60 rounded-lg bg-surface p-5 shadow-md md:-left-10">
              <p className="text-caption text-muted">Bildunterschrift</p>
              <p className="text-small text-ink">Kurzer Hinweis zum Bild oder ein Verweis.</p>
            </div>
          </div>
        </div>
      </Variant>

      <Variant
        code="H2"
        name="Linienbündel"
        note="nach 21st.dev Background Paths"
        tags={['Dunkel', 'Animiert', 'Die Linie']}
      >
        <div className="panel bg-blue-950 text-white">
          <BackgroundPaths className="text-blue-300" />
          <div className="container-page relative flex min-h-[80dvh] flex-col justify-end gap-8 py-20">
            <Kicker dark>Die Linie als Leitmotiv</Kicker>
            <h3 className="max-w-5xl text-display font-light">
              <CutWords text="Wörter steigen einzeln aus einer Maske" />
            </h3>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="#v-h2" variant="signal" size="lg">
                Primäre Aktion
              </ButtonLink>
              <ButtonLink
                href="#v-h2"
                variant="ghost"
                size="lg"
                className="border border-white/25 text-white hover:bg-white/10"
              >
                Sekundär
              </ButtonLink>
            </div>
          </div>
        </div>
      </Variant>

      <Variant
        code="H3"
        name="Scroll-Expansion"
        note="nach 21st.dev Scroll Expansion Hero"
        tags={['Scroll', 'Bild', 'Wirkungsvoll']}
      >
        <ScrollExpandHero
          image={images.road}
          first="Bild"
          second="öffnet sich"
          lead={lorem.short}
        />
      </Variant>

      <Variant
        code="H4"
        name="Wechselwort auf Linienraster"
        tags={['Hell', 'Animiert', 'Typografisch']}
      >
        <div
          className="bg-lines relative"
          style={{ '--pattern-size': '8rem' } as React.CSSProperties}
        >
          <div className="container-page grid min-h-[70dvh] items-end gap-10 py-20 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-8 bg-surface/80 py-4">
              <h3 className="text-display font-light">
                Wir liefern
                <br />
                <RotatingText
                  words={['Qualität', 'Sicherheit', 'Verfügbarkeit', 'Transparenz']}
                  className="text-primary"
                />
              </h3>
              <p className="max-w-[46ch] text-lead font-light text-muted">
                Begriffe aus dem alten Leistungsraster wechseln sich ab. Screenreader lesen alle
                Wörter als Liste.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[images.detail, images.glasses, images.flatlay, images.papers].map((im, i) => (
                <div
                  key={im.src}
                  className={`relative aspect-square overflow-hidden rounded-md ${i % 2 ? 'translate-y-8' : ''}`}
                >
                  <Image src={im.src} alt="" fill sizes="15vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Variant>

      <Variant
        code="H5"
        name="Vollbild mit Verlauf und Schnellzugriff"
        tags={['Dunkel', 'Bild', 'Navigation']}
      >
        <div className="panel flex min-h-[85dvh] flex-col justify-end text-white">
          <Image
            src={images.network.src}
            alt={images.network.alt}
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/75 to-blue-950/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-blue-950 to-transparent"
          />
          <div className="container-page flex flex-col gap-8 pt-32">
            <h3 className="max-w-3xl text-display font-light">Großes Bild, Text links unten</h3>
            <p className="max-w-[48ch] text-lead font-light text-blue-100">{lorem.short}</p>
          </div>
          <ul className="container-page mt-16 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="border-b border-white/15 sm:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <a
                  href="#v-h5"
                  className="group flex items-center justify-between gap-4 py-6 pr-6 transition-colors hover:text-blue-200"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-caption text-blue-200">0{i + 1}</span>
                    {s.title}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Variant>

      <Variant
        code="H6"
        name="Interaktiver Globus"
        note="nach 21st.dev Interactive Globe"
        tags={['Dunkel', 'Interaktiv', 'Europa']}
      >
        <div className="panel bg-teal-900 text-white">
          <div className="container-page grid min-h-[80dvh] items-center gap-8 py-16 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <Kicker dark>Für den europäischen Markt</Kicker>
              <h3 className="text-display font-light">Ein Netz, viele Ziele</h3>
              <p className="max-w-[46ch] text-lead font-light text-blue-100">
                Punkt-Globus zum Drehen mit der Maus. Die Markierungen sind Beispielorte, keine
                Standorte.
              </p>
              <LineButton href="#v-h6" tone="light">
                Liefergebiete ansehen
              </LineButton>
            </div>
            <div className="relative aspect-square w-full max-w-[40rem] justify-self-center">
              <Globe />
            </div>
          </div>
        </div>
      </Variant>

      <Variant
        code="H7"
        name="Lamellen (WebGL)"
        note="Bestand aus dem Styleguide"
        tags={['Dunkel', 'Animiert', 'Die Linie']}
      >
        <div className="panel bg-blue-950 text-white">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <MicroSlats />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 from-30% via-blue-950/60 to-transparent"
          />
          <div className="container-page flex min-h-[75dvh] flex-col justify-center gap-8 py-20">
            <h3 className="max-w-2xl text-display font-light">Ruhige Bewegung im Hintergrund</h3>
            <p className="max-w-[46ch] text-lead font-light text-blue-100">{lorem.short}</p>
            <a
              href="#v-h8"
              className="group inline-flex items-center gap-3 text-small text-blue-200"
            >
              <span className="relative h-10 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[marquee-y_1.8s_linear_infinite] bg-white" />
              </span>
              Nach unten
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </Variant>

      <Variant code="H8" name="Unterseitenkopf mit Sprungmarken" tags={['Hell', 'Unterseite']}>
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <Breadcrumb
              items={[
                { label: 'Start', href: '#v-h8' },
                { label: 'Unternehmen', href: '#v-h8' },
                { label: 'Qualitätsversprechen' },
              ]}
            />
            <h3 className="text-h1 font-light">Qualitätsversprechen</h3>
            <p className="max-w-[56ch] text-lead font-light text-muted">{lorem.medium}</p>
          </div>
          <div className="self-end border-l border-line pl-6">
            <p className="mb-3 text-caption text-muted">Auf dieser Seite</p>
            <ul className="flex flex-col gap-2 text-small">
              {['Rückverfolgbarkeit', 'MDR-Anforderungen', 'Rückrufe', 'Kontakt'].map((t) => (
                <li key={t}>
                  <a
                    href="#v-h8"
                    className="text-ink underline-offset-4 hover:text-primary-strong hover:underline"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Variant>

      <Variant
        code="H9"
        name="Unterseitenkopf mit Bildblende"
        tags={['Hell', 'Scroll', 'Unterseite']}
      >
        <div className="container-page flex flex-col gap-10 py-16 md:py-20">
          <div className="grid items-end gap-6 md:grid-cols-2">
            <h3 className="text-h1 font-light">Lagerlogistik</h3>
            <p className="max-w-[48ch] text-lead font-light text-muted">{lorem.short}</p>
          </div>
          <div className="reveal-clip relative aspect-[21/8] overflow-hidden rounded-xl">
            <Image
              src={images.fog.src}
              alt={images.fog.alt}
              fill
              sizes="100vw"
              className="parallax-y object-cover"
            />
          </div>
        </div>
      </Variant>
    </Chapter>
  )
}
