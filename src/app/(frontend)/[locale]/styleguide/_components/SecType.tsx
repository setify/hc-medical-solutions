import { SgSection, SgSub, Specimen } from './Sg'

const scale = [
  ['display', 'clamp 44 → 84 px', 'text-display font-light', 'Klarheit'],
  ['h1', 'clamp 36 → 60 px', 'text-h1 font-light', 'Seitentitel in Light'],
  ['h2', 'clamp 28 → 44 px', 'text-h2', 'Abschnittsüberschrift'],
  ['h3', 'clamp 22 → 28 px', 'text-h3', 'Unterabschnitt oder Card-Titel'],
  ['h4', '20 px', 'text-h4', 'Kleinste Überschrift'],
  [
    'lead',
    'clamp 18 → 22 px',
    'text-lead font-light',
    'Einleitender Absatz – etwas größer, in Light, maximal drei Zeilen.',
  ],
  [
    'body',
    '17 px / 1,7',
    'text-body font-light',
    'Fließtext in Lexend Deca Light. Lexend wurde für Lesbarkeit entwickelt und bleibt auch in längeren Absätzen ruhig.',
  ],
  ['small', '15 px', 'text-small', 'Beschriftungen, Buttons, Metaangaben'],
  ['caption', '13 px', 'text-caption', 'Bildunterschriften, Hilfetexte unter Feldern'],
  ['overline', '12 px · +16 % Laufweite', 'text-overline uppercase', 'Kategorie · Rubrik'],
] as const

export function SecType() {
  return (
    <SgSection
      id="typografie"
      no="04"
      title="Typografie"
      intro="Hausschrift Lexend Deca als variabler Font (100–900), lokal ausgeliefert. Große Größen in Light, Hierarchie über Gewicht und Farbe – nicht über schiere Größe."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative flex min-h-80 flex-col justify-between overflow-hidden rounded-xl bg-petrol-950 p-10 text-white">
          <span className="text-overline text-blue-200 uppercase">Lexend Deca · Variable</span>
          <span
            aria-hidden="true"
            className="text-[11rem] leading-none font-extralight tracking-tighter"
          >
            Aa
          </span>
          <span className="text-caption text-petrol-100">
            SIL Open Font License · Latin (DE/EN/FR)
          </span>
        </div>
        <div className="flex flex-col justify-center gap-8">
          {[
            ['Light 300', 'font-light', 'Überschriften & Fließtext'],
            ['Regular 400', 'font-normal', 'UI, Labels, Hervorhebung'],
            ['SemiBold 600', 'font-semibold', 'Fettung im Text (strong)'],
            ['Bold 700', 'font-bold', 'Nur für kurze Auszeichnungen'],
          ].map(([name, cls, use]) => (
            <div
              key={name}
              className="grid gap-2 border-b border-line pb-6 sm:grid-cols-[9rem_1fr]"
            >
              <span className="pt-2 text-caption text-muted">
                {name}
                <br />
                {use}
              </span>
              <span className={`${cls} text-h3 break-words`}>Äußerst präzise – « 1.284 € »</span>
            </div>
          ))}
        </div>
      </div>

      <SgSub
        title="Schriftskala"
        text="Fluid zwischen 375 und 1440 px Viewport. Tailwind-Klassen text-display bis text-overline."
      >
        <dl className="flex flex-col">
          {scale.map(([token, size, cls, sample]) => (
            <div
              key={token}
              className="grid items-baseline gap-2 border-t border-line py-6 md:grid-cols-[7rem_10rem_1fr] md:gap-8"
            >
              <dt className="font-mono text-small text-ink">{token}</dt>
              <dd className="text-caption text-muted">{size}</dd>
              <dd className={`${cls} max-w-[40ch] break-words`}>{sample}</dd>
            </div>
          ))}
        </dl>
      </SgSub>

      <SgSub
        title="Textblöcke"
        text="Klasse .prose-hc für Inhalte aus dem CMS (Rich Text). Listen und Zitate nutzen das Linien-Motiv."
      >
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Specimen label="Rich Text" code='className="prose-hc"' tone="plain">
            <div className="prose-hc">
              <p className="text-lead font-light text-ink">
                Beispieltext: Gute Gestaltung macht komplexe Inhalte zugänglich – ohne sie zu
                vereinfachen.
              </p>
              <h2>Zwischenüberschrift</h2>
              <p>
                Fließtext mit <strong>Hervorhebung</strong> und einem{' '}
                <a href="#typografie">Textlink</a>. Absätze bleiben unter 68 Zeichen Zeilenlänge,
                damit das Auge sicher in die nächste Zeile findet.
              </p>
              <ul>
                <li>Aufzählung mit senkrechter Linie als Marker</li>
                <li>Kurze, parallele Formulierungen</li>
                <li>Maximal sieben Punkte</li>
              </ul>
              <ol>
                <li>Nummerierte Schritte mit führender Null</li>
                <li>Für Abläufe und Anleitungen</li>
              </ol>
              <blockquote>
                „Zitate stehen an einer Linie – leicht, ruhig und gut lesbar.“
              </blockquote>
            </div>
          </Specimen>
          <div className="flex flex-col gap-10">
            <Specimen label="Zitat mit Quelle" tone="none">
              <figure className="flex flex-col gap-6">
                <span
                  aria-hidden="true"
                  className="text-[5rem] leading-[0.5] font-extralight text-accent"
                >
                  „
                </span>
                <blockquote className="text-h3 font-light">
                  Beispielzitat: Die Zusammenarbeit war strukturiert, schnell und jederzeit
                  nachvollziehbar.
                </blockquote>
                <figcaption className="flex items-center gap-3 text-small text-muted">
                  <span className="h-4 w-px bg-accent" /> Dr. Mirjam Aufdermauer, Beispielkundin
                </figcaption>
              </figure>
            </Specimen>
            <Specimen label="Eyebrow + Überschrift + Lead" code=".eyebrow" tone="none">
              <div className="flex flex-col gap-4">
                <span className="eyebrow">Vorgehensweise</span>
                <p className="text-h2 font-light">Vom ersten Gespräch zur Freigabe</p>
                <p className="text-lead font-light text-muted">
                  Ein klarer Ablauf in vier Schritten.
                </p>
              </div>
            </Specimen>
          </div>
        </div>
      </SgSub>
    </SgSection>
  )
}
