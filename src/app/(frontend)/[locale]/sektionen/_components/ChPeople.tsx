import { Certificate, LockSimple, MapPin, Truck } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import type { CSSProperties } from 'react'

import { LogoLoop } from '@/components/effects/LogoLoop'

import { images, people, quotes } from '../_lib/data'
import { Chapter, Kicker, Pad, Variant } from './Frame'
import { AnimatedTestimonials, ContactPerson, QuoteSlider, TeamFeatured } from './fx/People'

function QuoteCard({ q }: { q: (typeof quotes)[number] }) {
  return (
    <figure className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-6">
      <blockquote className="text-small text-ink-soft">{q.text}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image src={q.portrait} alt="" fill sizes="2.5rem" className="object-cover" />
        </span>
        <span className="flex flex-col">
          <span className="text-small text-ink">{q.name}</span>
          <span className="text-caption text-muted">{q.org}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function ChQuotes() {
  const cols = [quotes.slice(0, 3), quotes.slice(3, 6), [quotes[1]!, quotes[4]!, quotes[0]!]]
  return (
    <Chapter
      id="stimmen"
      no="10"
      title="Kundenstimmen"
      intro="Die alte Seite hatte keine Zitate. Stimmen von Kliniken, Praxen oder Partnern schaffen Vertrauen, wenn sie echt und freigegeben sind. Alle Zitate hier sind Platzhalter."
    >
      <Variant
        code="R1"
        name="Porträtstapel mit Zitat"
        note="nach 21st.dev Animated Testimonials"
        tags={['Animiert', 'Persönlich']}
      >
        <Pad>
          <AnimatedTestimonials quotes={quotes.slice(0, 4)} />
        </Pad>
      </Variant>

      <Variant
        code="R2"
        name="Laufende Spalten"
        note="nach 21st.dev Testimonials Columns"
        tags={['Viele Stimmen', 'Automatisch']}
      >
        <Pad tone="muted">
          <div className="mb-12 flex flex-col gap-4">
            <Kicker>Stimmen</Kicker>
            <h3 className="text-h1 font-light">Was andere sagen</h3>
          </div>
          <div className="mask-fade-y grid h-[38rem] gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {cols.map((col, c) => (
              <div
                key={c}
                className={c === 1 ? 'hidden md:block' : c === 2 ? 'hidden lg:block' : ''}
              >
                <div
                  className="marquee-y flex flex-col gap-6 hover:[animation-play-state:paused]"
                  style={{ '--marquee-duration': `${[34, 44, 38][c]}s` } as CSSProperties}
                >
                  {[...col, ...col].map((q, k) => (
                    <div key={k} aria-hidden={k >= col.length || undefined}>
                      <QuoteCard q={q} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Pad>
      </Variant>

      <Variant code="R3" name="Großes Einzelzitat" tags={['Ruhig', 'Typografisch']}>
        <Pad>
          <figure className="grid gap-10 md:grid-cols-[1fr_3fr]">
            <div className="relative aspect-[4/5] max-w-60 overflow-hidden rounded-lg">
              <Image src={quotes[2]!.portrait} alt="" fill sizes="15rem" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-10 border-l border-accent pl-8 md:pl-12">
              <blockquote className="text-h1 font-extralight">„{quotes[2]!.text}“</blockquote>
              <figcaption className="text-small text-muted">
                <span className="text-ink">{quotes[2]!.name}</span>, {quotes[2]!.org}
              </figcaption>
            </div>
          </figure>
        </Pad>
      </Variant>

      <Variant code="R4" name="Zitat-Wechsel dunkel" tags={['Dunkel', 'Interaktiv']}>
        <Pad tone="dark">
          <QuoteSlider quotes={quotes.slice(0, 5)} />
        </Pad>
      </Variant>

      <Variant code="R5" name="Zitat im Bild" tags={['Bild', 'Wirkungsvoll']}>
        <div className="panel flex min-h-[70dvh] items-end text-white">
          <Image
            src={images.meeting.src}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent"
          />
          <figure className="container-page flex max-w-5xl flex-col gap-6 py-16 md:py-24">
            <blockquote className="text-h1 font-light">„{quotes[0]!.text}“</blockquote>
            <figcaption className="text-small text-blue-100">
              {quotes[0]!.name}, {quotes[0]!.org}
            </figcaption>
          </figure>
        </div>
      </Variant>
    </Chapter>
  )
}

export function ChTeam() {
  return (
    <Chapter
      id="team"
      no="11"
      title="Team und Ansprechpartner"
      intro="Die alte Seite stellte die Geschäftsführung in zwei Spalten vor. Hier vier Varianten, vom Raster bis zur direkten Ansprechperson. Fotos sind Platzhalter."
    >
      <Variant
        code="P1"
        name="Raster mit Hover-Profil"
        note="nach 21st.dev Team 1"
        tags={['Hover', 'Übersicht']}
      >
        <Pad>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {people.slice(0, 4).map((p, i) => (
              <li key={p.src} className={i % 2 ? 'lg:translate-y-12' : ''}>
                <figure className="group flex flex-col gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={p.src}
                      alt={`Porträt ${p.name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-blue-950/90 p-5 text-small text-blue-100 transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                      Zwei Sätze zur Person, zum Beispiel Aufgaben und Erfahrung.
                    </div>
                  </div>
                  <figcaption className="flex flex-col">
                    <span className="text-h4">{p.name}</span>
                    <span className="text-small text-muted">{p.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Pad>
      </Variant>

      <Variant
        code="P2"
        name="Hervorgehobene Person mit Liste"
        note="nach 21st.dev Team Section"
        tags={['Interaktiv']}
      >
        <Pad tone="muted">
          <TeamFeatured people={people} />
        </Pad>
      </Variant>

      <Variant
        code="P3"
        name="Geschäftsführung zweispaltig"
        note="Neuauflage der alten Seite"
        tags={['Klassisch']}
      >
        <Pad>
          <div className="grid gap-16 md:grid-cols-2">
            {people.slice(0, 2).map((p) => (
              <article key={p.src} className="flex flex-col gap-6">
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                  <Image
                    src={p.src}
                    alt={`Porträt ${p.name}`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h3 font-light">{p.name}</h3>
                  <p className="text-small text-accent-strong">{p.role}</p>
                </div>
                <p className="max-w-[52ch] text-body text-muted">
                  Kurzbiografie mit Werdegang und Schwerpunkten, drei bis vier Sätze. Der Text kommt
                  von HC.
                </p>
              </article>
            ))}
          </div>
        </Pad>
      </Variant>

      <Variant code="P4" name="Ansprechpersonen" tags={['Kontakt', 'Kompakt']}>
        <Pad tone="muted">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <h3 className="text-h2 font-light">Direkt erreichbar</h3>
            <div className="grid gap-8 sm:grid-cols-2">
              {people.slice(2, 6).map((p) => (
                <ContactPerson key={p.src} person={p} />
              ))}
            </div>
          </div>
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChTrust() {
  const marks = Array.from({ length: 7 }, (_, i) => ({
    name: `Logo ${i + 1}`,
    mark: <span className="block size-8 rounded-full border border-current" />,
  }))
  return (
    <Chapter
      id="vertrauen"
      no="12"
      title="Vertrauen und Nachweise"
      intro="Die alte Seite zeigte Zahlungs- und Versandlogos im Footer. Hier drei Formen für Partner, Zertifikate und Zusagen. Logos und Nachweise liefert HC."
    >
      <Variant
        code="V1"
        name="Logo-Laufband"
        note="Bestand aus dem Styleguide"
        tags={['Automatisch']}
      >
        <Pad>
          <p className="mb-8 text-small text-muted">Partner und Hersteller (Platzhalter)</p>
          <LogoLoop items={marks} label="Partnerlogos" />
        </Pad>
      </Variant>

      <Variant code="V2" name="Nachweise im Raster" tags={['Ruhig', 'MDR']}>
        <Pad tone="muted">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-4">
              <h3 className="text-h2 font-light">Geprüft und dokumentiert</h3>
              <p className="text-body text-muted">
                Zertifikate, Normen und Mitgliedschaften mit Verweis auf das Dokument.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
              {['MDR (EU) 2017/745', 'Zertifikat', 'Norm', 'Mitgliedschaft'].map((t) => (
                <li key={t} className="flex aspect-square flex-col justify-between bg-surface p-5">
                  <Certificate aria-hidden="true" weight="light" className="size-8 text-primary" />
                  <span className="text-small">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Pad>
      </Variant>

      <Variant
        code="V3"
        name="Zusagen als Leiste"
        note="ersetzt die Siegel-Reihe im alten Footer"
        tags={['Kompakt']}
      >
        <div className="panel bg-surface">
          <ul className="container-page grid divide-line py-2 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
            {[
              [Truck, 'Versand mit Sendungsverfolgung'],
              [MapPin, 'Server in Deutschland'],
              [LockSimple, 'Verschlüsselte Verbindung'],
              [Certificate, 'Dokumentierte Chargen'],
            ].map(([Icon, t]) => {
              const I = Icon as typeof Truck
              return (
                <li
                  key={t as string}
                  className="flex items-center gap-4 py-6 lg:px-8 lg:first:pl-0"
                >
                  <I aria-hidden="true" weight="light" className="size-7 shrink-0 text-primary" />
                  <span className="text-small">{t as string}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Variant>
    </Chapter>
  )
}
