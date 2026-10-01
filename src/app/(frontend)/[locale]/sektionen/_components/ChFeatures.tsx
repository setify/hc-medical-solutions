import {
  ArrowCounterClockwise,
  ClipboardText,
  FileText,
  Package,
  ShieldCheck,
  Truck,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import { ScrollStack } from '@/components/effects/ScrollStack'
import { CountUp } from '@/components/text/CountUp'
import { ServiceCard } from '@/components/ui/Card'
import { ProcessSteps } from '@/components/ui/Feedback'

import { features, images, lorem, services, steps } from '../_lib/data'
import { Chapter, Kicker, Pad, Variant } from './Frame'
import {
  HoverPreviewList,
  Lifeline,
  LiveStatus,
  SortingList,
  TabsImage,
  TypingSearch,
} from './fx/Features'

const icons = [ClipboardText, FileText, Package, ShieldCheck, Truck, ArrowCounterClockwise]

function Tile({
  title,
  text,
  children,
  className,
}: {
  title: string
  text: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-5 ${className ?? ''}`}>
      <div className="flex min-h-52 flex-1 flex-col justify-center rounded-lg border border-line bg-surface p-8">
        {children}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-h4">{title}</h4>
        <p className="text-small text-muted">{text}</p>
      </div>
    </div>
  )
}

export function ChFeatures() {
  return (
    <Chapter
      id="leistungen"
      no="07"
      title="Leistungen und Merkmale"
      intro="Die alte Seite zeigte Leistungen als Icon-Raster mit vier und sechs Kacheln. Hier sechs Alternativen, die mehr erzählen und weniger nach Baukasten aussehen."
    >
      <Variant
        code="L1"
        name="Linienraster mit Symbolen"
        note="Weiterentwicklung des alten Rasters"
        tags={['Ruhig', 'Übersicht']}
      >
        <Pad>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = icons[i]!
              return (
                <li
                  key={f.title}
                  className="group relative flex flex-col gap-10 overflow-hidden rounded-lg border border-line bg-surface p-8 transition-colors duration-500 hover:border-blue-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <Icon aria-hidden="true" weight="light" className="size-9 text-primary" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h4">{f.title}</h3>
                    <p className="text-small text-muted">{f.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Pad>
      </Variant>

      <Variant code="L2" name="Bento mit Mikroanimationen" tags={['Lebendig', 'Digital']}>
        <Pad tone="muted">
          <div className="grid gap-8 md:grid-cols-3">
            <Tile title="Chargen im Blick" text="Liste sortiert sich laufend um.">
              <SortingList />
            </Tile>
            <Tile title="Dokumente finden" text="Suchfeld mit wechselnden Beispielen.">
              <TypingSearch />
            </Tile>
            <Tile title="Verfügbarkeit" text="Status mit auftauchender Meldung.">
              <LiveStatus />
            </Tile>
            <div className="flex flex-col gap-5 md:col-span-2">
              <div className="relative flex min-h-52 flex-1 items-center overflow-hidden rounded-lg bg-blue-950 text-white">
                <ul
                  className="flex w-max animate-marquee gap-3 pl-3"
                  style={{ '--marquee-duration': '28s' } as CSSProperties}
                >
                  {[...Array(2)].flatMap((_, k) =>
                    [
                      'Konformitätserklärung',
                      'Gebrauchsanweisung',
                      'Sicherheitsdatenblatt',
                      'Zertifikat',
                      'Lieferschein',
                      'Prüfbericht',
                    ].map((d) => (
                      <li
                        key={d + k}
                        aria-hidden={k === 1 || undefined}
                        className="flex shrink-0 items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-small"
                      >
                        <FileText aria-hidden="true" className="size-4 text-blue-200" />
                        {d}
                      </li>
                    )),
                  )}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-h4">Dokumente als Laufband</h4>
                <p className="text-small text-muted">Endlose Reihe, pausiert bei Hover.</p>
              </div>
            </div>
            <Tile title="Bildkachel" text="Ruhiger Gegenpol im Raster." className="[&>div]:p-0">
              <div className="relative size-full min-h-52 overflow-hidden rounded-lg">
                <Image
                  src={images.detail.src}
                  alt={images.detail.alt}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            </Tile>
          </div>
        </Pad>
      </Variant>

      <Variant code="L3" name="Reiter mit Bildwechsel" tags={['Interaktiv', 'Kompakt']}>
        <Pad>
          <TabsImage
            items={services.map((s) => ({ title: s.title, text: lorem.medium, image: s.image }))}
          />
        </Pad>
      </Variant>

      <Variant
        code="L4"
        name="Klebender Kartenstapel"
        note="Bestand aus dem Styleguide"
        tags={['Scroll']}
      >
        <Pad tone="muted">
          <ScrollStack
            items={services.map((s, i) => (
              <div
                key={s.title}
                className="grid min-h-[24rem] overflow-hidden rounded-lg bg-surface shadow-md md:grid-cols-2"
              >
                <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
                  <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-h2 font-light">{s.title}</h3>
                    <p className="text-body text-muted">{s.text}</p>
                  </div>
                </div>
                <div className="relative min-h-56">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          />
        </Pad>
      </Variant>

      <Variant code="L5" name="Liste mit Vorschaubild am Zeiger" tags={['Hover', 'Typografisch']}>
        <Pad>
          <HoverPreviewList
            items={services.map((s) => ({ title: s.title, text: s.text, image: s.image }))}
          />
        </Pad>
      </Variant>

      <Variant
        code="L6"
        name="Leistungskarten asymmetrisch"
        note="Karte aus dem Styleguide"
        tags={['Klassisch']}
      >
        <Pad tone="muted">
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="relative min-h-80 overflow-hidden rounded-lg md:row-span-2">
              <Image
                src={images.meeting.src}
                alt={images.meeting.alt}
                fill
                sizes="55vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/90 to-transparent p-8 text-white">
                <p className="text-h3 font-light">Bild als Einstieg in die Leistungen</p>
              </div>
            </div>
            {services.slice(0, 2).map((s, i) => (
              <ServiceCard
                key={s.title}
                index={`0${i + 1}`}
                title={s.title}
                text={s.text}
                href="#v-l6"
              />
            ))}
          </div>
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChProcess() {
  return (
    <Chapter
      id="ablauf"
      no="08"
      title="Ablauf und Zeitleiste"
      intro="Für die Seite Vorgehensweise und für die Firmengeschichte. Die alte Seite erklärte den Ablauf nur im Text."
    >
      <Variant
        code="A1"
        name="Lebenslinie"
        note="nach 21st.dev Lifeline"
        tags={['Scroll', 'Die Linie']}
      >
        <Pad>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Kicker>Vorgehensweise</Kicker>
              <h3 className="mt-4 text-h1 font-light">Schritt für Schritt</h3>
            </div>
            <Lifeline items={steps} />
          </div>
        </Pad>
      </Variant>

      <Variant
        code="A2"
        name="Zeitleiste wechselseitig"
        note="nach 21st.dev Timeline"
        tags={['Geschichte']}
      >
        <Pad tone="muted">
          <ol className="relative mx-auto flex max-w-5xl flex-col gap-12 md:gap-0">
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-2 w-px bg-line-strong md:left-1/2"
            />
            {steps.slice(0, 4).map((s, i) => (
              <li
                key={s.title}
                className={`relative grid pl-10 md:grid-cols-2 md:pl-0 ${i % 2 ? '' : 'md:[&>div]:col-start-2'}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-[3px] size-[11px] rounded-full bg-signal ring-4 ring-surface-muted md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={`flex flex-col gap-2 md:py-10 ${i % 2 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                >
                  <span className="font-mono text-caption text-accent-strong">Jahr 20XX</span>
                  <h3 className="text-h3 font-light">{s.title}</h3>
                  <p className="text-body text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Pad>
      </Variant>

      <Variant code="A3" name="Waagerechte Schritte" tags={['Kompakt']}>
        <Pad>
          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary font-mono text-small text-primary-strong">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="draw-x hidden h-px flex-1 bg-primary md:block"
                    />
                  ) : null}
                </div>
                <h3 className="text-h4">{s.title}</h3>
                <p className="text-small text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Pad>
      </Variant>

      <Variant code="A4" name="Prozessliste" note="Bestand aus dem Styleguide" tags={['Klassisch']}>
        <Pad tone="muted">
          <div className="max-w-3xl">
            <ProcessSteps steps={steps.slice(0, 4)} />
          </div>
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChStats() {
  // Platzhalterwerte – echte Zahlen liefert HC.
  const stats = [
    { to: 48, label: 'Kennzahl eins', suffix: '' },
    { to: 97, label: 'Kennzahl zwei', suffix: ' %' },
    { to: 12, label: 'Kennzahl drei', suffix: '' },
    { to: 3400, label: 'Kennzahl vier', suffix: '' },
  ]

  return (
    <Chapter
      id="kennzahlen"
      no="09"
      title="Kennzahlen"
      intro="Zahlen wirken nur, wenn sie stimmen. Alle Werte hier sind Platzhalter; HC liefert echte, belegbare Zahlen oder wir lassen den Baustein weg."
    >
      <Variant code="Z1" name="Große Zahlen auf Linien" tags={['Hell', 'Zählt hoch']}>
        <Pad>
          <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-3 border-b border-line py-8 sm:pr-8 lg:border-r lg:border-b-0 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="text-small text-muted">{s.label} (Platzhalter)</dt>
                <dd className="text-display font-extralight tabular-nums">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Pad>
      </Variant>

      <Variant code="Z2" name="Zahlenband mit Lamellen" tags={['Dunkel']}>
        <div className="panel bg-slats bg-teal-900 text-white">
          <div className="container-page grid gap-10 py-20 md:grid-cols-[1fr_2fr] md:items-end">
            <h3 className="text-h2 font-light">Eine Aussage, belegt durch Zahlen</h3>
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-l border-blue-300/40 pl-5">
                  <dt className="text-caption text-blue-200">{s.label}</dt>
                  <dd className="text-h1 font-extralight tabular-nums">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Variant>

      <Variant code="Z3" name="Zahlen mit Balken" tags={['Vergleich', 'Scroll']}>
        <Pad>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col gap-4">
              <h3 className="text-h2 font-light">Anteile sichtbar machen</h3>
              <p className="text-body text-muted">
                Balken zeichnen sich beim Scrollen. Werte sind Platzhalter.
              </p>
            </div>
            <ul className="flex flex-col gap-6">
              {[
                ['Bereich A', 82],
                ['Bereich B', 64],
                ['Bereich C', 41],
                ['Bereich D', 23],
              ].map(([l, v]) => (
                <li key={l} className="flex flex-col gap-2">
                  <div className="flex justify-between text-small">
                    <span>{l}</span>
                    <span className="font-mono text-muted">{v} %</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-sunken">
                    <div
                      className="draw-x h-full rounded-full bg-gradient-to-r from-blue-950 via-primary to-signal"
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Pad>
      </Variant>
    </Chapter>
  )
}
