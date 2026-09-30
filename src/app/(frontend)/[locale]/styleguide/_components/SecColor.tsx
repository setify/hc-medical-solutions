import { contrast, formatRatio, rating } from '@/lib/contrast'
import { cn } from '@/lib/cn'

import { SgSection, SgSub } from './Sg'

const house = [
  {
    name: 'Blau',
    token: 'brand-blue · blue-600 · primary',
    hex: '#007F9D',
    rgb: '0 · 127 · 157',
    cmyk: '90 · 30 · 20 · 5 *',
    role: 'Primär- und Akzentfarbe: Buttons, Links, Fokus, Markierungen.',
    cls: 'bg-brand-blue text-white',
    big: true,
  },
  {
    name: 'Petrol',
    token: 'brand-petrol · petrol-700',
    hex: '#004E5C',
    rgb: '0 · 78 · 91',
    cmyk: '95 · 50 · 40 · 20',
    role: 'Ergänzungsfarbe, sparsam. Dunkle Flächen sind Blau 950.',
    cls: 'bg-brand-petrol text-white',
  },
  {
    name: 'Hellblau',
    token: 'brand-sky · blue-200',
    hex: '#A0CCE0',
    rgb: '160 · 204 · 224',
    cmyk: '43 · 10 · 5 · 0',
    role: 'Flächen, Linien auf dunklem Grund.',
    cls: 'bg-brand-sky text-blue-950',
  },
  {
    name: 'Rot',
    token: 'brand-red · red-500',
    hex: '#E9483D',
    rgb: '233 · 72 · 61',
    cmyk: '0 · 88 · 80 · 0',
    role: 'Signal: sparsam, nie für Fließtext.',
    cls: 'bg-brand-red text-n-950 md:col-span-2',
  },
]

const scales: { name: string; steps: [string, string][] }[] = [
  {
    name: 'Petrol',
    steps: [
      ['50', '#eef6f7'],
      ['100', '#d6e9ec'],
      ['200', '#b0d3d9'],
      ['300', '#7fb5c0'],
      ['400', '#4a92a0'],
      ['500', '#1d6f7f'],
      ['600', '#085d6c'],
      ['700', '#004e5c'],
      ['800', '#033f4a'],
      ['900', '#062f37'],
      ['950', '#031f25'],
    ],
  },
  {
    name: 'Blau',
    steps: [
      ['50', '#e8f5f9'],
      ['100', '#cfeaf2'],
      ['200', '#a0cce0'],
      ['300', '#5fb3cc'],
      ['400', '#2a98b5'],
      ['500', '#0b8aa8'],
      ['600', '#007f9d'],
      ['700', '#006a84'],
      ['800', '#00566b'],
      ['900', '#0a3550'],
      ['950', '#061f33'],
    ],
  },
  {
    name: 'Neutral',
    steps: [
      ['25', '#f8fafb'],
      ['50', '#f2f6f7'],
      ['100', '#e6ecee'],
      ['200', '#d3dde0'],
      ['300', '#b3c1c5'],
      ['400', '#8a9aa0'],
      ['500', '#667880'],
      ['600', '#4d5d64'],
      ['700', '#38464c'],
      ['800', '#243034'],
      ['900', '#152226'],
      ['950', '#0c171a'],
    ],
  },
  {
    name: 'Rot',
    steps: [
      ['50', '#fdecea'],
      ['100', '#fbd5d1'],
      ['500', '#e9483d'],
      ['600', '#c9342a'],
      ['700', '#a62a22'],
    ],
  },
]

const semantic = [
  ['ink', 'n-950', 'Haupttext, Überschriften'],
  ['ink-soft', 'n-800', 'Fließtext im Rich Text'],
  ['muted', 'n-600', 'Nebentexte, Hilfetexte (≥ 6,8 : 1)'],
  ['line / line-strong', 'n-200 / n-300', 'Trennlinien, Feldränder'],
  ['surface / -muted / -sunken', 'weiß / n-50 / n-100', 'Hintergründe in drei Ebenen'],
  ['surface-inverse', 'blue-950', 'Dunkle Flächen: Hero, Footer, Aufrufe'],
  ['primary / -strong', 'blue-600 / 700', 'Primäre Aktionen (Buttons, Auswahl)'],
  ['accent / -strong', 'blue-600 / 700', 'Links, Akzente, Fokus'],
  ['danger', 'red-700', 'Fehlertexte (7,06 : 1)'],
]

const onWhite = (hex: string) => contrast(hex, '#ffffff')

export function SecColor() {
  return (
    <SgSection
      id="farbe"
      no="03"
      title="Farbe"
      intro="Vier Hausfarben aus dem Logoblatt, erweitert zu vollständigen Skalen. Im Code stehen ausschließlich Tokens, nie Hex-Werte."
    >
      <div className="grid gap-3 md:h-[28rem] md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2">
        {house.map((c) => (
          <div
            key={c.name}
            className={cn(
              'flex min-h-52 flex-col justify-between rounded-lg p-7',
              c.cls,
              c.big && 'md:row-span-2 md:p-10',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span className={cn(c.big ? 'text-h2' : 'text-h4')}>{c.name}</span>
              <span className="font-mono text-caption">{c.hex}</span>
            </div>
            <div className="flex flex-col gap-1 text-caption">
              <span>{c.role}</span>
              <span className="font-mono">RGB {c.rgb}</span>
              <span className="font-mono">CMYK {c.cmyk}</span>
              <span className="font-mono">{c.token}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="-mt-10 text-caption text-muted">
        * CMYK-Wert laut Logoblatt noch nicht validiert.
      </p>

      <SgSub
        title="Skalen"
        text="Kontrast jeder Stufe gegen Weiß. Markiert ist die Stufe der Hausfarbe."
      >
        <div className="flex flex-col gap-8">
          {scales.map((s) => (
            <div key={s.name} className="grid gap-3 md:grid-cols-[6rem_1fr] md:items-center">
              <span className="text-small text-ink">{s.name}</span>
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-12">
                {s.steps.map(([step, hex]) => {
                  const ratio = onWhite(hex)
                  const dark = ratio > 4.5
                  const isHouse = ['#004e5c', '#007f9d', '#e9483d', '#a0cce0'].includes(hex)
                  return (
                    <div
                      key={step}
                      className={cn(
                        'flex aspect-[4/5] flex-col justify-between rounded-md p-2.5',
                        isHouse && 'ring-2 ring-ink ring-offset-2',
                      )}
                      style={{ background: hex, color: dark ? '#fff' : '#0c171a' }}
                    >
                      <span className="text-caption font-normal">{step}</span>
                      <span className="flex flex-col text-[0.6875rem] leading-tight">
                        <span className="font-mono">{hex.toUpperCase()}</span>
                        <span>
                          {rating(ratio) === '–' ? 'Fläche' : rating(ratio)} ·{' '}
                          {ratio.toFixed(1).replace('.', ',')}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </SgSub>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <SgSub
          title="Semantische Tokens"
          text="Komponenten verwenden Bedeutungen, keine Farbstufen. So bleibt ein späteres Nachjustieren an einer Stelle."
        >
          <dl className="divide-y divide-line border-y border-line">
            {semantic.map(([token, value, use]) => (
              <div
                key={token}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[11rem_8rem_1fr]"
              >
                <dt className="font-mono text-small text-ink">{token}</dt>
                <dd className="font-mono text-caption text-muted sm:text-small">{value}</dd>
                <dd className="col-span-2 text-caption text-muted sm:col-span-1 sm:text-small">
                  {use}
                </dd>
              </div>
            ))}
          </dl>
        </SgSub>

        <SgSub title="Freigegebene Kombinationen" text="Text auf Fläche, mit berechnetem Kontrast.">
          <div className="grid gap-2">
            {[
              ['Weiß auf Blau 950', '#ffffff', '#061f33'],
              ['Blau 950 auf Hellblau', '#061f33', '#a0cce0'],
              ['Weiß auf Blau 600', '#ffffff', '#007f9d'],
              ['Hellblau auf Blau 950', '#a0cce0', '#061f33'],
              ['Petrol 700 auf Neutral 50', '#004e5c', '#f2f6f7'],
              ['Rot 500 auf Weiß, nur groß', '#e9483d', '#ffffff'],
            ].map(([label, fg, bg]) => {
              const r = contrast(fg!, bg!)
              return (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md px-5 py-4 ring-1 ring-line/60"
                  style={{ color: fg, background: bg }}
                >
                  <span className={cn(r < 4.5 ? 'text-2xl font-normal' : 'text-small')}>
                    {label}
                  </span>
                  <span className={cn('font-mono text-caption', r < 4.5 && 'text-ink')}>
                    {formatRatio(r)} · {rating(r)}
                  </span>
                </div>
              )
            })}
          </div>
        </SgSub>
      </div>
    </SgSection>
  )
}
