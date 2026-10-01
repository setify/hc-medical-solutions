import {
  ArrowRight,
  ArrowUpRight,
  ClipboardText,
  FileText,
  Package,
  Play,
  ShieldCheck,
  Truck,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { Logo } from '@/components/brand/Logo'
import { ButtonLink, roundIconClasses } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { cn } from '@/lib/cn'

import { features, images, lorem, people, quotes, services } from '../_lib/data'
import { Chapter, Variant } from './Frame'
import { FanCarousel, SpecialistCarousel } from './fx/TemplateFx'

const icons = [ClipboardText, FileText, Package, ShieldCheck, Truck]

/** Symbol im Kreis mit Linie (Kundenvorlage). */
function IconRing({ icon: Icon, dark }: { icon: typeof Package; dark?: boolean }) {
  return (
    <span
      className={cn(
        'grid size-14 place-items-center rounded-full border',
        dark ? 'border-white/15 bg-white/5 text-teal-300' : 'border-line bg-surface text-primary',
      )}
    >
      <Icon aria-hidden="true" weight="light" className="size-6" />
    </span>
  )
}

/** Halbkreis-Anzeige aus Strichen (Platzhalterwert). */
function Gauge({ value }: { value: number }) {
  const ticks = 28
  return (
    <svg viewBox="0 0 120 70" className="w-full" aria-hidden="true">
      {Array.from({ length: ticks }, (_, i) => {
        const a = Math.PI - (i / (ticks - 1)) * Math.PI
        const on = i / (ticks - 1) <= value / 100
        const r1 = 44
        const r2 = 56
        const f = (n: number) => Math.round(n * 100) / 100
        return (
          <line
            key={i}
            x1={f(60 + Math.cos(a) * r1)}
            y1={f(64 - Math.sin(a) * r1)}
            x2={f(60 + Math.cos(a) * r2)}
            y2={f(64 - Math.sin(a) * r2)}
            stroke={on ? '#061f33' : '#92ebe3'}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export function ChTemplate() {
  return (
    <Chapter
      id="vorlage"
      no="00"
      title="Nach Kundenvorlage"
      intro="Die Gestaltungselemente der Vorlage in HC-Farben: Flächen als gerundete Panels auf hellem Graublau, vollrunde Buttons, Pillen-Navigation, runde Pfeil-Buttons, Symbole im Kreis und Teal als Zweitfarbe. Texte und Werte sind Platzhalter."
    >
      <Variant
        code="VL1"
        name="Panel-Hero mit schwebenden Karten und Logoleiste"
        tags={['Dunkel', 'Bild', 'Vorlage']}
      >
        <div className="panel bg-blue-950 text-white">
          <div className="relative isolate min-h-[38rem] md:min-h-[42rem]">
            <Image
              src={images.mountains.src}
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/60 to-blue-950/10"
            />
            <div className="container-page grid min-h-[38rem] items-center gap-10 py-16 md:min-h-[42rem] lg:grid-cols-[1.4fr_1fr]">
              <div className="flex max-w-2xl flex-col gap-6">
                <h3 className="text-display font-light text-teal-50">
                  Medizinprodukte <span className="text-signal">für Europa</span>
                </h3>
                <p className="max-w-[48ch] text-lead font-light text-blue-100">{lorem.short}</p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <ButtonLink href="#v-vl1" variant="signal" size="lg" iconRight={<ArrowRight />}>
                    Anfrage stellen
                  </ButtonLink>
                  <a
                    href="#v-vl1"
                    className="inline-flex h-14 items-center gap-3 rounded-full bg-white/10 py-2 pr-5 pl-2 text-small backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <span className="flex -space-x-3">
                      {people.slice(0, 3).map((p) => (
                        <span
                          key={p.src}
                          className="relative size-10 overflow-hidden rounded-full ring-2 ring-blue-950"
                        >
                          <Image src={p.src} alt="" fill sizes="2.5rem" className="object-cover" />
                        </span>
                      ))}
                    </span>
                    Kundenstimmen ansehen
                  </a>
                </div>
              </div>
              <div className="hidden w-60 flex-col gap-3 justify-self-end text-ink lg:flex">
                <div className="flex flex-col gap-6 rounded-lg bg-surface/95 p-4">
                  <p className="text-small underline underline-offset-4">Nächster Termin</p>
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-caption text-muted">Platzhalter für eine Ankündigung</p>
                    <span className={roundIconClasses('dark', 'size-8')}>
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 p-4">
                  <span className="self-start rounded-full border border-teal-300 px-3 py-1 text-caption">
                    Kennzahl
                  </span>
                  <div className="relative px-2">
                    <Gauge value={72} />
                    <p className="absolute inset-x-0 bottom-0 text-center text-h3 font-light tabular-nums">
                      00 %
                    </p>
                  </div>
                  <p className="text-caption">Wert folgt von HC</p>
                </div>
                <div className="flex items-end justify-between gap-3 rounded-lg bg-surface/95 p-4">
                  <div className="flex flex-col gap-3">
                    <span className="self-start rounded-full border border-line px-3 py-1 text-caption">
                      Dokumente
                    </span>
                    <p className="text-caption text-muted">Zertifikate und Nachweise</p>
                  </div>
                  <span className={roundIconClasses('dark', 'size-8')}>
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ul className="container-page grid grid-cols-2 items-center gap-6 py-8 text-h4 font-normal text-white/85 sm:grid-cols-3 lg:grid-cols-5">
            {['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5'].map((l) => (
              <li
                key={l}
                className="flex items-center gap-3 lg:justify-center lg:first:justify-start lg:last:justify-end"
              >
                <span aria-hidden="true" className="size-6 rounded-full border border-current" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Variant>

      <Variant code="VL2" name="Über uns mit Fortschrittsbalken" tags={['Hell', 'Vorlage']}>
        <div className="container-page flex flex-col gap-12 py-16 md:py-24">
          <div className="flex max-w-4xl flex-col gap-6">
            <p className="eyebrow">Über HC Medical Solutions</p>
            <h3 className="text-h1 font-light">
              Eine Aussage über das Unternehmen, die mit einer{' '}
              <span className="text-primary">Hervorhebung</span> endet.
            </h3>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <p className="max-w-[52ch] text-body text-muted">{lorem.medium}</p>
            <ul className="flex flex-col gap-7">
              {[
                ['Bereich A', 72],
                ['Bereich B', 85],
                ['Bereich C', 91],
              ].map(([label, v]) => (
                <li key={label} className="flex flex-col gap-3">
                  <div className="flex justify-between text-h4">
                    <span>{label}</span>
                    <span className="tabular-nums">00 %</span>
                  </div>
                  <div className="flex h-2.5 items-center gap-[3px]">
                    <span
                      className="draw-x h-full rounded-full bg-gradient-to-r from-blue-950 via-primary to-signal"
                      style={{ width: `${v}%` }}
                    />
                    <span
                      aria-hidden="true"
                      className="h-full flex-1 bg-[repeating-linear-gradient(90deg,var(--color-teal-200)_0_2px,transparent_2px_6px)]"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Variant>

      <Variant code="VL3" name="Auswahlkarten im Panel" tags={['Hell', 'Bild', 'Vorlage']}>
        <div className="panel bg-surface-muted">
          <div className="container-page flex flex-col gap-12 py-16 md:py-20">
            <h3 className="text-center text-h2 font-light">Wählen Sie Ihren Bereich</h3>
            <ul className="grid gap-5 md:grid-cols-3">
              {services.slice(0, 3).map((s) => (
                <li key={s.title}>
                  <a
                    href="#v-vl3"
                    className="group relative block overflow-hidden rounded-lg bg-surface"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={s.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent"
                      />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
                      <span className="text-h3 font-light">{s.title}</span>
                      <span
                        className={roundIconClasses(
                          'dark',
                          'group-hover:bg-primary group-hover:text-white',
                        )}
                      >
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-500 group-hover:rotate-45"
                        />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Variant>

      <Variant
        code="VL4"
        name="Leistungsraster mit Aktionskarte"
        tags={['Hell', 'Symbole im Kreis', 'Vorlage']}
      >
        <div className="container-page flex flex-col items-center gap-12 py-16 md:py-24">
          <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
            <p className="eyebrow self-center">Leistungen</p>
            <h3 className="text-h1 font-light">
              Was wir für <span className="text-primary">Kliniken und Praxen</span> leisten
            </h3>
            <p className="text-body text-muted">{lorem.short}</p>
          </div>
          <ul className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 5).map((f, i) => {
              const card = (
                <li
                  key={f.title}
                  className="flex flex-col gap-8 rounded-lg border border-line bg-surface p-7"
                >
                  <IconRing icon={icons[i]!} />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-h4">{f.title}</h4>
                    <p className="text-small text-muted">{lorem.short}</p>
                  </div>
                </li>
              )
              if (i !== 4) return card
              return [
                <li
                  key="cta"
                  className="flex flex-col items-center justify-center gap-5 rounded-lg bg-blue-950 p-7 text-center text-white"
                >
                  <h4 className="text-h3 font-light">Termin vereinbaren</h4>
                  <p className="text-small text-blue-100">
                    Kurzer Satz, warum sich ein Gespräch lohnt.
                  </p>
                  <ButtonLink href="#v-vl4" variant="signal" iconRight={<ArrowRight />}>
                    Kontakt aufnehmen
                  </ButtonLink>
                </li>,
                card,
              ]
            })}
          </ul>
        </div>
      </Variant>

      <Variant
        code="VL5"
        name="Teal-Panel mit Video und Vorteilen"
        tags={['Teal', 'Bild', 'Vorlage']}
      >
        <div className="panel bg-teal-900 text-white">
          <div className="container-page flex flex-col gap-12 py-16 md:py-20">
            <h3 className="mx-auto max-w-3xl text-center text-h1 font-light text-teal-50">
              Abläufe, die man <span className="text-signal">sehen kann</span>
            </h3>
            <div className="relative aspect-[16/7] overflow-hidden rounded-lg">
              <Image
                src={images.office.src}
                alt={images.office.alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full bg-blue-950/90 text-signal"
              >
                <Play weight="fill" className="size-7" />
              </span>
            </div>
            <ul className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
              {features.slice(0, 3).map((f, i) => (
                <li
                  key={f.title}
                  className="flex flex-col gap-5 md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <IconRing icon={icons[i]!} dark />
                  <h4 className="text-h4 text-teal-50">{f.title}</h4>
                  <p className="text-small text-teal-100">{lorem.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Variant>

      <Variant code="VL6" name="Bild und Text gerundet" tags={['Hell', 'Vorlage']}>
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src={images.meeting.src}
              alt={images.meeting.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-h1 font-light">
              Über die <span className="text-primary">Zusammenarbeit</span> mit unserem Team
              sprechen
            </h3>
            <p className="max-w-[48ch] text-body text-muted">{lorem.medium}</p>
            <ButtonLink
              href="#v-vl6"
              variant="dark"
              iconRight={<ArrowRight />}
              className="self-start"
            >
              Gespräch beginnen
            </ButtonLink>
          </div>
        </div>
      </Variant>

      <Variant code="VL7" name="Karten-Karussell im Panel" tags={['Hell', 'Karussell', 'Vorlage']}>
        <div className="panel bg-surface-muted">
          <div className="container-page flex flex-col gap-12 py-16 md:py-20">
            <h3 className="text-center text-h2 font-light">Ihre Ansprechpartner</h3>
            <SpecialistCarousel people={people} />
          </div>
        </div>
      </Variant>

      <Variant
        code="VL8"
        name="Fächer-Karussell für Zitate"
        tags={['Hell', 'Karussell', 'Vorlage']}
      >
        <div className="container-page flex flex-col items-center gap-10 py-16 md:py-24">
          <p className="eyebrow self-center">Kundenstimmen</p>
          <h3 className="max-w-3xl text-center text-h1 font-light">
            Zufriedene Kunden sind <span className="text-primary">unser Maßstab</span>
          </h3>
          <FanCarousel quotes={quotes.slice(0, 5)} />
        </div>
      </Variant>

      <Variant
        code="VL9"
        name="Footer-Panel mit Newsletter und großem Logo"
        tags={['Dunkel', 'Footer', 'Vorlage']}
      >
        <div className="panel bg-blue-950 text-white">
          <div className="container-page flex flex-col gap-12 py-10 md:py-12">
            <div className="flex flex-col items-center gap-5 rounded-lg bg-gradient-to-br from-frost-50 to-teal-50 px-6 py-12 text-center text-ink">
              <h4 className="text-h2 font-light">In Kontakt bleiben</h4>
              <p className="max-w-[46ch] text-small text-muted">
                Platzhalter für eine Einladung zum Newsletter oder zu Neuigkeiten.
              </p>
              <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-line bg-surface p-1.5">
                <label htmlFor="vl9-mail" className="sr-only">
                  E-Mail-Adresse
                </label>
                <Input
                  id="vl9-mail"
                  type="email"
                  placeholder="E-Mail-Adresse"
                  className="h-11 border-0 shadow-none focus:ring-0"
                />
                <ButtonLink href="#v-vl9" variant="dark" className="shrink-0">
                  Anmelden
                </ButtonLink>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 border-y border-white/10 py-6">
              {[
                'Unternehmen',
                'Vorgehensweise',
                'Qualität',
                'Lagerlogistik',
                'Karriere',
                'Kontakt',
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#v-vl9"
                    className="inline-flex h-11 items-center rounded-full bg-white/5 px-5 text-small transition-colors hover:bg-white/10"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <Logo variant="weiss" decorative className="h-auto w-full opacity-[0.12]" />
            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-caption text-blue-200 sm:flex-row sm:justify-between">
              <span>© HC Medical Solutions</span>
              <span className="flex gap-4">
                <a href="#v-vl9" className="hover:text-white">
                  Impressum
                </a>
                <a href="#v-vl9" className="hover:text-white">
                  Datenschutz
                </a>
              </span>
            </div>
          </div>
        </div>
      </Variant>
    </Chapter>
  )
}
