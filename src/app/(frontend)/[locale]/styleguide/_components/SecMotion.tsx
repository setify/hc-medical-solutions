import { LogoLoop } from '@/components/effects/LogoLoop'
import MicroSlats from '@/components/effects/MicroSlats'
import { CountUp } from '@/components/text/CountUp'
import { CurvedLoop } from '@/components/text/CurvedLoop'
import { GradientText } from '@/components/text/GradientText'
import { RotatingText } from '@/components/text/RotatingText'
import { ScrollReveal } from '@/components/text/ScrollReveal'
import { ShinyText } from '@/components/text/ShinyText'

import { SgSection, SgSub, Specimen } from './Sg'

const marks = [
  <svg key="a" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="24" height="24" rx="6" />
    <path d="M12 4v24" />
  </svg>,
  <svg key="b" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="16" cy="16" r="12" />
    <path d="M16 4v24M4 16h24" />
  </svg>,
  <svg key="c" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 28 16 4l12 24z" />
    <path d="M10 20h12" />
  </svg>,
  <svg key="d" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 6h20v20H6z" />
    <path d="m6 26 20-20" />
  </svg>,
  <svg key="e" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 4v24M16 8v16M24 4v24" />
  </svg>,
  <svg key="f" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="16" r="7" />
    <circle cx="21" cy="16" r="7" />
  </svg>,
]
const partners = [
  'Lindgrund Medtech',
  'Vetorra Diagnostik',
  'Aurelstein Kliniken',
  'Holmquist Labor',
  'Talwerk Medical',
  'Ferrand & Oswald',
]

export function SecText() {
  return (
    <SgSection
      id="textanimation"
      no="11"
      title="Text in Bewegung"
      intro="Sparsam dosiert – höchstens ein bewegtes Textelement pro Bildschirm. Alle Effekte halten mit „Bewegung reduzieren“ an; Screenreader lesen den vollständigen Text."
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Specimen
          label="Rotating Text – wechselnde Begriffe"
          code="<RotatingText />"
          tone="plain"
          className="flex min-h-56 items-center"
        >
          <p className="text-h1 font-light">
            Ein System für{' '}
            <RotatingText
              words={['die Website', 'die Präsentation', 'den Flyer']}
              className="text-accent-strong"
            />
          </p>
        </Specimen>
        <div className="grid gap-6">
          <Specimen
            label="Shiny Text – Lichtreflex"
            code="<ShinyText />"
            className="grid place-items-center"
          >
            <p className="text-h3">
              <ShinyText>Neu: Karriere bei HC</ShinyText>
            </p>
          </Specimen>
          <Specimen
            label="Gradient Text – wandernder Verlauf"
            code="<GradientText outline />"
            className="grid place-items-center"
          >
            <GradientText outline className="text-small font-normal">
              Jetzt in drei Sprachen
            </GradientText>
          </Specimen>
        </div>
      </div>

      <SgSub
        title="Count Up – Kennzahlen"
        text="Zählt beim Sichtbarwerden hoch. Ohne JavaScript steht sofort der Endwert da. Werte sind Beispiele."
      >
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {[
            { v: 1284, l: 'Projekte (Beispiel)' },
            { v: 37.6, d: 1, s: ' %', l: 'kürzere Durchlaufzeit' },
            { v: 3, l: 'Sprachen' },
            { v: 48, s: ' h', l: 'Antwortzeit' },
          ].map((k, i) => (
            <div
              key={k.l}
              className={`flex flex-col gap-2 border-line py-8 ${i % 2 ? 'pl-6' : 'pr-6'} md:border-l md:px-8 md:first:border-l-0 md:first:pl-0`}
            >
              <dt className="order-2 text-small text-muted">{k.l}</dt>
              <dd className="text-h1 font-extralight">
                <CountUp to={k.v} decimals={k.d ?? 0} suffix={k.s ?? ''} />
              </dd>
            </div>
          ))}
        </dl>
      </SgSub>

      <SgSub
        title="Scroll Reveal"
        text="Wörter färben sich beim Scrollen von Grau zur Textfarbe – per CSS Scroll-Driven Animations, ohne JavaScript. Jeder Zwischenzustand erfüllt WCAG AA."
      >
        <ScrollReveal
          className="max-w-[26ch]"
          text="Gute Gestaltung macht Komplexes zugänglich, ohne es zu vereinfachen. Sie schafft Vertrauen, bevor das erste Wort gelesen ist."
        />
      </SgSub>

      <SgSub
        title="Curved Loop"
        text="Laufschrift auf einer Kurve – mit Maus oder Finger ziehen, um Richtung und Tempo zu ändern. Für Übergänge zwischen großen Abschnitten."
      >
        <div className="-mx-4 overflow-hidden bg-surface-muted py-6 sm:mx-0 sm:rounded-xl">
          <CurvedLoop text="Präzision · Qualität · Verantwortung" />
        </div>
      </SgSub>

      <SgSub
        title="Logo Loop"
        text="Endlose Leiste für Partner- oder Referenzlogos. Hält bei Hover und Tastaturfokus an. Logos und Namen sind Platzhalter."
      >
        <LogoLoop
          label="Partner (Platzhalter)"
          items={partners.map((name, i) => ({ name, mark: marks[i] }))}
        />
      </SgSub>
    </SgSection>
  )
}

export function SecBackgrounds() {
  return (
    <SgSection
      id="hintergruende"
      no="12"
      title="Hintergründe"
      intro="Micro Slats: ein Feld feiner Lamellen, das wie eine Oberfläche im Wind wogt – das Linien-Motiv als Bühne. WebGL, pausiert außerhalb des Sichtbereichs und bei „Bewegung reduzieren“."
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Specimen label="Micro Slats · Petrol (Standard)" code="<MicroSlats />" tone="none">
          <div className="relative h-96 overflow-hidden rounded-xl bg-petrol-950">
            <MicroSlats />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-8 text-white">
              <span className="eyebrow text-blue-200 before:bg-blue-200">Bühne</span>
              <p className="mt-3 max-w-md text-h2 font-light">
                Text liegt immer auf ruhiger Fläche.
              </p>
            </div>
          </div>
        </Specimen>
        <Specimen label="Micro Slats · Hell, Preset „tide“" code='preset="tide"' tone="none">
          <div className="relative h-96 overflow-hidden rounded-xl bg-petrol-50">
            <MicroSlats
              preset="tide"
              color="#7fb5c0"
              glintColor="#007f9d"
              backgroundColor="#eef6f7"
            />
          </div>
        </Specimen>
      </div>
    </SgSection>
  )
}

export function SecOpen() {
  return (
    <SgSection id="offen" no="13" title="Offene Punkte für HC">
      <ol className="prose-hc">
        <li>
          <strong>Logo-Blau weicht von den Hausfarben ab:</strong> Das Logo verwendet #48779E
          (Vektor) bzw. ca. #4D7AAA (PNG). Soll es so bleiben oder an Blau #007F9D angeglichen
          werden?
        </li>
        <li>
          <strong>Blau nicht validiert:</strong> CMYK 90/30/20/5 ergibt eher #3084AF als #007F9D.
          Für das Web gilt vorerst #007F9D.
        </li>
        <li>
          <strong>Rot</strong> erreicht auf Weiß nur 3,85 : 1 – freigegeben nur für große Schrift,
          Icons und Signale.
        </li>
        <li>
          <strong>Bildsprache fehlt:</strong> Bis Fotos vorliegen, nutzen Demos generierte Grafiken
          im Linien-Motiv.
        </li>
        <li>
          Erweiterte Skalen, Typo-Hierarchie und Bewegungsregeln sind Vorschläge und werden mit
          Michael abgestimmt.
        </li>
      </ol>
    </SgSection>
  )
}
