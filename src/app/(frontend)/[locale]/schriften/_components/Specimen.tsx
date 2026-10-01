import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  ListMagnifyingGlass,
  SealCheck,
} from '@phosphor-icons/react/dist/ssr'
import type { CSSProperties, ReactNode } from 'react'

import { Button, roundIconClasses } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Field'
import { cn } from '@/lib/cn'

import type { FontVariant } from '../_lib/fonts'

/*
 * Alle Beispieltexte stammen aus der finalen Übergabe von HC (Startseite, 30.09.2026),
 * damit die Schriften am echten Inhalt beurteilt werden.
 */

/** Setzt Überschrift- und Fließtextschrift einer Variante für alle Kinder. */
export function FontScope({
  v,
  children,
  className,
}: {
  v: FontVariant
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        '[&_.fh]:[font-family:var(--fh)] [&_.fh]:[font-weight:var(--wh)] [&_.fh]:[letter-spacing:var(--th)]',
        className,
      )}
      style={
        {
          '--fh': v.head.family,
          '--wh': v.head.weight,
          '--th': v.head.tracking,
          fontFamily: v.body.family,
          fontWeight: v.body.weight,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-sans text-caption font-normal text-muted">
      <span aria-hidden="true" className="h-3 w-px bg-accent" />
      {children}
    </p>
  )
}

/** Steckbrief der Kombination: Schriftnamen, Gewichte, Einordnung. */
function Profile({ v }: { v: FontVariant }) {
  return (
    <div className="grid gap-6 rounded-xl bg-surface p-6 ring-1 ring-line/60 ring-inset md:grid-cols-[1fr_1fr_1.3fr] md:p-8">
      <div className="flex flex-col gap-2">
        <p className="font-sans text-caption text-muted">Überschriften</p>
        <p className="fh text-h2">{v.head.name}</p>
        <p className="font-sans text-caption text-muted">Gewicht {v.head.weight}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-sans text-caption text-muted">Fließtext</p>
        <p className="text-h2">{v.body.name}</p>
        <p className="font-sans text-caption text-muted">Gewicht {v.body.weight}</p>
      </div>
      <ul className="flex flex-col gap-2 border-line font-sans text-small text-ink-soft md:border-l md:pl-6">
        <li className="text-ink">{v.character}</li>
        {v.notes.map((n) => (
          <li key={n} className="flex gap-2 text-muted">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  )
}

const features = [
  {
    icon: SealCheck,
    title: 'Originalprodukte',
    text: 'Wir liefern ausschließlich Original-Medizinprodukte namhafter Hersteller.',
  },
  {
    icon: Eye,
    title: 'Transparenz',
    text: 'Wöchentlicher Order Status und HC-Cloud geben Ihnen einen Überblick über Bestände, offene Bestellungen und voraussichtliche Liefertermine.',
  },
  {
    icon: ListMagnifyingGlass,
    title: 'Rückverfolgbarkeit',
    text: 'Produkt-, Chargen- und Lieferinformationen werden nachvollziehbar dokumentiert.',
  },
]

const scale: [string, string, string][] = [
  ['Display', 'text-display', 'Der zweite Kanal'],
  ['H1', 'text-h1', 'Unsere Vorgehensweise'],
  ['H2', 'text-h2', 'Mehr als ein guter Preis'],
  ['H3', 'text-h3', 'Wirtschaftlichkeit ohne Produktwechsel'],
  ['H4', 'text-h4', 'Rückruf- & Vorkommnismanagement'],
]

/** Vollständiges Muster einer Kombination: Hero, Abschnitte, Kacheln, Zitat, Skala, Details. */
export function Specimen({ v }: { v: FontVariant }) {
  return (
    <FontScope v={v} className="flex flex-col gap-16">
      <Profile v={v} />

      <section>
        <Label>Hero</Label>
        <div className="relative isolate overflow-hidden rounded-xl bg-blue-950 px-6 py-14 text-white md:px-12 md:py-20">
          <p className="eyebrow eyebrow-dark mb-6">Taking Partnership to the Next Level</p>
          <h2 className="fh max-w-4xl text-display">
            Der zweite Kanal <span className="text-signal">zum Original.</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-lead text-blue-100">
            HC eröffnet Krankenhäusern und medizinischen Einrichtungen einen zusätzlichen,
            unabhängigen Beschaffungskanal für Original-Medizinprodukte – mit Einsparpotenzialen,
            verlässlicher Versorgung und dokumentierter Rückverfolgbarkeit.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="signal" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Einkaufspotenzial prüfen
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white ring-1 ring-white/25 hover:bg-white/10"
            >
              Unsere Vorgehensweise
            </Button>
          </div>
        </div>
      </section>

      <section>
        <Label>Textabschnitte</Label>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="fh text-h1">Wirtschaftlichkeit ohne Produktwechsel</h3>
            <p className="text-body text-muted">
              Wir prüfen gemeinsam, bei welchen Original-Medizinprodukten ein Bezug über HC
              wirtschaftlich sinnvoll ist. So können Sie sparen, ohne auf ein anderes Produkt
              umzustellen.
            </p>
            <p className="border-l-2 border-signal pl-5 text-h4 text-ink">
              Ein guter Preis bringt Ihnen nur etwas, wenn die Ware auch verfügbar ist.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="fh text-h1">Versorgung im Blick</h3>
            <p className="text-body text-muted">
              Unser Auftrag endet nicht mit der ersten Lieferung.
            </p>
            <p className="text-body text-muted">
              Für vereinbarte Produkte bauen wir Lagerbestände auf und behalten Verfügbarkeit,
              tatsächlichen Bedarf und Rotation im Blick. Verändert sich der Bedarf oder die
              Lieferlage, sprechen wir Abweichungen früh an und stimmen die nächsten Schritte mit
              Ihnen ab.
            </p>
          </div>
        </div>
      </section>

      <section>
        <Label>Kacheln</Label>
        <h3 className="fh mb-8 text-h1">Warum HC?</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex flex-col gap-8 rounded-lg bg-surface p-7 ring-1 ring-line/70 ring-inset"
            >
              <span className="grid size-14 place-items-center rounded-full border border-line text-primary">
                <Icon aria-hidden="true" weight="light" className="size-6" />
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="fh text-h4">{title}</h4>
                <p className="text-small text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Label>Langer Text</Label>
          <h3 className="fh text-h2">Unsere Expertise</h3>
          <div className="mt-5 flex flex-col gap-4 text-body text-ink-soft">
            <p>
              Seit 2019 handeln und distribuieren wir Original-Medizinprodukte für Krankenhäuser und
              weitere medizinische Einrichtungen.
            </p>
            <p>
              Für Sie bündeln wir kommerzielle, regulatorische und operative Erfahrung. Vertrieb und
              strategischer Einkauf arbeiten eng mit Customer Service, Qualitätsmanagement,
              Regulatory Affairs, Controlling, Digitalisierung und Logistik zusammen.
            </p>
            <p>
              So können wir Einsparpotenziale realistisch bewerten, Ihre Versorgung im Alltag
              begleiten und Qualitäts- und Regulatory-Anforderungen berücksichtigen.
            </p>
          </div>
        </div>
        <div>
          <Label>Zitat</Label>
          <figure className="flex flex-col gap-5 rounded-xl bg-teal-900 p-8 text-white md:p-10">
            <blockquote className="fh text-h3">
              „Mir ist wichtig, Dinge klar anzusprechen, Entscheidungen zu treffen und Verantwortung
              für das Ergebnis zu übernehmen.“
            </blockquote>
            <figcaption className="text-small text-teal-100">
              Michael Trick, Geschäftsführer &amp; Gründer
            </figcaption>
          </figure>
        </div>
      </section>

      <section>
        <Label>Schriftgrößen der Website</Label>
        <ul className="divide-y divide-line border-y border-line">
          {scale.map(([name, cls, sample]) => (
            <li key={name} className="grid items-baseline gap-2 py-5 md:grid-cols-[6rem_1fr]">
              <span className="font-mono text-caption text-muted">{name}</span>
              <span className={cn('fh truncate', cls)}>{sample}</span>
            </li>
          ))}
          {(
            [
              [
                'Lead',
                'text-lead',
                'HC eröffnet Krankenhäusern einen zusätzlichen Beschaffungskanal.',
              ],
              [
                'Body',
                'text-body',
                'Wareneingänge prüfen wir auf Menge, Charge, Mindesthaltbarkeit und Zustand.',
              ],
              [
                'Small',
                'text-small',
                'Verfügbare Lagerartikel liefern wir in der Regel innerhalb von 1–2 Tagen.',
              ],
            ] as const
          ).map(([name, cls, sample]) => (
            <li key={name} className="grid items-baseline gap-2 py-5 md:grid-cols-[6rem_1fr]">
              <span className="font-mono text-caption text-muted">{name}</span>
              <span className={cls}>{sample}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <Label>Zahlen und Sonderzeichen</Label>
          <dl className="grid grid-cols-4 gap-4 border-y border-line py-6">
            {(
              [
                ['2019', 'Gründung'],
                ['25+', 'Jahre'],
                ['40+', 'Jahre'],
                ['1–2', 'Tage'],
              ] as const
            ).map(([n, l]) => (
              <div key={l + n} className="flex flex-col gap-1">
                <dt className="order-2 text-caption text-muted">{l}</dt>
                <dd className="fh text-h1 tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
          <p className="fh mt-6 text-h3">Ää Öö Üü ß € &amp; „Charge“ · ISO 9001:2015 · GDP</p>
          <p className="mt-2 text-body text-muted">0123456789 · Aa Bb Gg Qq Rr · (1) [2] {'{3}'}</p>
        </div>
        <div>
          <Label>Bedienelemente</Label>
          <div className="flex flex-col gap-6 rounded-xl bg-surface p-6 ring-1 ring-line/60 ring-inset">
            <div className="flex flex-wrap items-center gap-1 self-start rounded-full bg-surface-muted p-1 text-small">
              <span className="rounded-full bg-surface px-4 py-2 shadow-xs">Vorgehensweise</span>
              <span className="px-4 py-2 text-muted">Lagerlogistik</span>
              <span className="px-4 py-2 text-muted">Karriere</span>
            </div>
            <Field label="E-Mail-Adresse" hint="Wir antworten in der Regel am nächsten Werktag.">
              {({ id, describedBy }) => (
                <Input
                  id={id}
                  aria-describedby={describedBy}
                  type="email"
                  placeholder="name@klinik.de"
                />
              )}
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Anfrage senden</Button>
              <Button variant="secondary">Abbrechen</Button>
              <span className={roundIconClasses('dark')}>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </FontScope>
  )
}

/** Direktvergleich: derselbe Inhalt in allen drei Kombinationen nebeneinander. */
export function SideBySide({ variants }: { variants: FontVariant[] }) {
  return (
    <div className="flex flex-col gap-16">
      <section>
        <Label>Überschrift im Vergleich</Label>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {variants.map((v) => (
            <FontScope
              key={v.id}
              v={v}
              className="grid items-baseline gap-3 py-8 md:grid-cols-[12rem_1fr]"
            >
              <p className="font-sans text-small text-muted">
                {v.label}
                <br />
                <span className="text-caption">{v.head.name}</span>
              </p>
              <p className="fh text-display">
                Der zweite Kanal <span className="text-primary">zum Original.</span>
              </p>
            </FontScope>
          ))}
        </div>
      </section>

      <section>
        <Label>Abschnitt im Vergleich</Label>
        <div className="grid gap-4 lg:grid-cols-3">
          {variants.map((v) => (
            <FontScope
              key={v.id}
              v={v}
              className="flex flex-col gap-4 rounded-xl bg-surface p-7 ring-1 ring-line/60 ring-inset"
            >
              <p className="font-sans text-caption text-muted">
                {v.label} · {v.head.name} / {v.body.name}
              </p>
              <h3 className="fh text-h2">Mehr als ein guter Preis</h3>
              <p className="text-lead text-ink">
                Wirtschaftlichkeit, Versorgungssicherheit und Prozesssicherheit gehören für uns
                zusammen.
              </p>
              <p className="text-body text-muted">
                Deshalb verbinden wir Einsparpotenziale bei Originalprodukten mit Bestandssteuerung,
                transparenter Information, Rückverfolgbarkeit und definierten Qualitäts- und
                Regulatory-Prozessen.
              </p>
              <div className="mt-auto pt-2">
                <Button variant="primary" iconRight={<ArrowRight className="size-4" />}>
                  Einkaufspotenzial prüfen
                </Button>
              </div>
            </FontScope>
          ))}
        </div>
      </section>

      <section>
        <Label>Fließtext im Vergleich (gleiche Spaltenbreite)</Label>
        <div className="grid gap-8 lg:grid-cols-3">
          {variants.map((v) => (
            <FontScope key={v.id} v={v} className="flex flex-col gap-3">
              <p className="font-sans text-caption text-muted">
                {v.label} · {v.body.name}
              </p>
              <p className="text-body text-ink-soft">
                Für die ausgewählten Produkte definieren wir gemeinsam den benötigten Lagerbestand.
                Wir bauen den vereinbarten Bestand auf und starten anschließend mit der Belieferung.
                Für die vereinbarten Produkte überwachen wir Bestände, offene Bestellungen,
                Liefertermine, Rotation und Mindesthaltbarkeiten.
              </p>
            </FontScope>
          ))}
        </div>
      </section>
    </div>
  )
}
