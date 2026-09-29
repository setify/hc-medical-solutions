import { Check, X } from '@phosphor-icons/react/dist/ssr'

import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'

import { SgSection, SgSub, Specimen } from './Sg'

/* ───────────────────────── 00 Audit ───────────────────────── */

const audit = [
  [
    'Kein Komponenten-System',
    'Nur Logo, Farben, Schrift dokumentiert – keine Bausteine für Seiten.',
    'Vollständige Bibliothek: Buttons, Formulare, Cards, Dialoge, Feedback, Navigation, Bewegung.',
  ],
  [
    'Farben ohne Abstufungen',
    'Vier Hausfarben, keine Hover-, Flächen- oder Linientöne.',
    'Skalen 50–950 für Petrol, Blau, Neutral; semantische Tokens statt Hex-Werten im Code.',
  ],
  [
    'Graue Texte nicht geprüft',
    'Neutraltöne frei gewählt, Kontrast unklar.',
    'Petrol-getönte Neutralskala, jede Textfarbe ≥ 4,5 : 1 (WCAG 2.2 AA) rechnerisch geprüft.',
  ],
  [
    'Starre Schriftgrößen',
    'Feste px-Werte, auf Mobilgeräten zu groß oder zu klein.',
    'Fluide Typo-Skala mit clamp() von 375 bis 1440 px Viewport.',
  ],
  [
    'Tailwind-Standardfarben aktiv',
    'Beliebige Fremdfarben (purple, green …) jederzeit nutzbar.',
    'Standardpalette abgeschaltet – nur Markenfarben verfügbar.',
  ],
  [
    'Keine Bewegungsregeln',
    'Animationen ohne Vorgaben, kein Umgang mit „Bewegung reduzieren“.',
    'Easing- und Dauer-Tokens; jede Animation respektiert prefers-reduced-motion.',
  ],
  [
    'Kein gestalterisches Leitmotiv',
    'Auftritt austauschbar.',
    '„Die Linie“ aus dem HC-Bildzeichen als roter Faden in allen Komponenten.',
  ],
] as const

export function SecAudit() {
  return (
    <SgSection
      id="audit"
      no="00"
      title="Audit des ersten Entwurfs"
      intro="Der erste Styleguide hat nur das Logoblatt abgebildet. Für eine Website fehlte fast alles. Das hier ist das Ergebnis der Prüfung – und was daraus wurde."
    >
      <div className="divide-y divide-line border-y border-line">
        {audit.map(([title, before, after], i) => (
          <div key={title} className="grid gap-4 py-6 md:grid-cols-[3rem_1fr_1fr_1.2fr] md:gap-8">
            <span className="pt-1 text-caption text-muted tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-small font-normal text-ink">{title}</p>
            <p className="flex gap-2 text-small text-muted">
              <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-red-600" />
              <span>
                <span className="sr-only">Vorher: </span>
                {before}
              </span>
            </p>
            <p className="flex gap-2 text-small text-ink-soft">
              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-success-700" />
              <span>
                <span className="sr-only">Jetzt: </span>
                {after}
              </span>
            </p>
          </div>
        ))}
      </div>
    </SgSection>
  )
}

/* ─────────────────────── 01 Prinzipien ─────────────────────── */

const principles = [
  {
    t: 'Die Linie',
    d: 'Der senkrechte Schnitt im HC-Zeichen wird zum Werkzeug: Trenner, Aufzählungszeichen, Fokus- und Hover-Zustände, Lamellen im Hintergrund.',
  },
  {
    t: 'Klarheit vor Effekt',
    d: 'Medizinisches Umfeld verlangt Vertrauen. Effekte begleiten Inhalte, sie ersetzen sie nie.',
  },
  {
    t: 'Zugänglich als Standard',
    d: 'Kontraste, Tastaturbedienung und Screenreader sind in jede Komponente eingebaut – nicht nachträglich.',
  },
  {
    t: 'Ruhige Bewegung',
    d: 'Weiche, gedämpfte Kurven, kurze Wege. Wer „Bewegung reduzieren“ wählt, sieht einen ruhigen, vollständigen Auftritt.',
  },
]

export function SecPrinciples() {
  return (
    <SgSection
      id="prinzipien"
      no="01"
      title="Prinzipien"
      intro="Vier Regeln, an denen sich jede gestalterische Entscheidung messen lässt."
    >
      <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-[1.3fr_1fr]">
        {principles.map((p, i) => (
          <div
            key={p.t}
            className={cn(
              'flex flex-col gap-4 p-8 sm:p-10',
              i === 0
                ? 'min-h-96 bg-petrol-950 text-white md:row-span-3 md:justify-end'
                : 'bg-surface',
            )}
          >
            {i === 0 ? (
              <span aria-hidden="true" className="mb-auto flex h-32 items-end gap-3">
                {[64, 112, 40, 88, 128, 56, 96].map((h, k) => (
                  <span key={k} className="w-px bg-blue-200/70" style={{ height: h }} />
                ))}
              </span>
            ) : null}
            <h3 className={cn(i === 0 ? 'text-h2' : 'text-h4')}>{p.t}</h3>
            <p className={cn('max-w-md text-small', i === 0 ? 'text-petrol-100' : 'text-muted')}>
              {p.d}
            </p>
          </div>
        ))}
      </div>
    </SgSection>
  )
}

/* ───────────────────────── 02 Marke ───────────────────────── */

export function SecBrand() {
  return (
    <SgSection
      id="marke"
      no="02"
      title="Marke & Logo"
      intro="Querformat ist Standard, Hochformat für schmale Flächen. Vektordaten aus dem Logoblatt, Farbe über currentColor."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Specimen
          label="Querformat · Hausfarbe"
          code='<Logo format="quer" />'
          tone="plain"
          className="grid min-h-72 place-items-center"
        >
          <Logo className="h-20 w-auto sm:h-24" />
        </Specimen>
        <div className="grid grid-cols-2 gap-6">
          <Specimen
            label="Hochformat · Strich"
            code='variant="strich"'
            tone="plain"
            className="grid min-h-72 place-items-center"
          >
            <Logo format="hoch" variant="strich" className="h-36 w-auto" />
          </Specimen>
          <Specimen
            label="Hochformat · Weiß"
            code='variant="weiss"'
            tone="dark"
            className="grid min-h-72 place-items-center bg-petrol-700"
          >
            <Logo format="hoch" variant="weiss" className="h-36 w-auto" />
          </Specimen>
        </div>
      </div>

      <SgSub
        title="Schutzzone und Mindestgröße"
        text="Rundum frei bleibt mindestens die Höhe des „C“ (≈ ½ Bildzeichen). Querformat nicht kleiner als 120 px Breite (Web) bzw. 30 mm (Druck)."
      >
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="grid place-items-center rounded-xl bg-surface-muted p-10">
            <div className="relative p-[clamp(1.25rem,4vw,2.5rem)] outline outline-1 outline-offset-0 outline-blue-400 outline-dashed">
              <span
                aria-hidden="true"
                className="absolute inset-[clamp(1.25rem,4vw,2.5rem)] outline outline-1 outline-blue-200"
              />
              <Logo className="relative h-16 w-auto sm:h-20" />
            </div>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6 rounded-xl bg-surface-muted p-8">
            {[120, 160, 200].map((w) => (
              <div key={w} className="flex flex-col items-center gap-3">
                <div style={{ width: w }}>
                  <Logo decorative className="h-auto w-full" />
                </div>
                <span className="text-caption text-muted tabular-nums">{w} px</span>
              </div>
            ))}
          </div>
        </div>
      </SgSub>

      <SgSub title="Nicht erlaubt">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { l: 'Verzerren', c: 'scale-x-150' },
            { l: 'Umfärben', c: '[&_svg]:text-red-500' },
            { l: 'Drehen', c: '-rotate-12' },
            {
              l: 'Unruhiger Grund',
              c: 'bg-[repeating-linear-gradient(45deg,#a0cce0_0_8px,#007f9d_8px_16px)]',
            },
          ].map((d) => (
            <figure key={d.l} className="flex flex-col gap-3">
              <div
                className={cn(
                  'relative grid aspect-[4/3] place-items-center overflow-hidden rounded-lg bg-surface-muted',
                  d.l === 'Unruhiger Grund' && d.c,
                )}
              >
                <div className={cn(d.l !== 'Unruhiger Grund' && d.c)}>
                  <Logo decorative className="h-8 w-auto" />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.75px),#c9342a_calc(50%-0.75px),#c9342a_calc(50%+0.75px),transparent_calc(50%+0.75px))]"
                />
              </div>
              <figcaption className="flex items-center gap-2 text-small text-ink">
                <X aria-hidden="true" className="size-4 text-red-600" /> {d.l}
              </figcaption>
            </figure>
          ))}
        </div>
      </SgSub>
    </SgSection>
  )
}
