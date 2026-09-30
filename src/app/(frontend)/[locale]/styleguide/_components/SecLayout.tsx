import { cn } from '@/lib/cn'

import { SgSection, SgSub } from './Sg'

const spacing = [
  ['1', 4],
  ['2', 8],
  ['3', 12],
  ['4', 16],
  ['6', 24],
  ['8', 32],
  ['10', 40],
  ['12', 48],
  ['16', 64],
  ['20', 80],
  ['28', 112],
] as const

const radii = [
  ['xs', '2 px', 'rounded-xs', 'Badges, Checkbox'],
  ['sm', '4 px', 'rounded-sm', 'Buttons, Felder'],
  ['md', '6 px', 'rounded-md', 'Swatches, Toasts'],
  ['lg', '8 px', 'rounded-lg', 'Cards, Dialoge'],
  ['xl', '12 px', 'rounded-xl', 'Große Medien'],
] as const

const shadows = [
  ['xs', 'shadow-xs', 'Felder'],
  ['sm', 'shadow-sm', 'Schalter-Knopf'],
  ['md', 'shadow-md', 'Toasts'],
  ['lg', 'shadow-lg', 'Dialoge'],
] as const

const easings = [
  [
    'out-expo',
    'cubic-bezier(0.16, 1, 0.3, 1)',
    'ease-out-expo',
    'Standard: Einblenden, Hover, Layout',
  ],
  [
    'out-back',
    'cubic-bezier(0.34, 1.4, 0.64, 1)',
    'ease-out-back',
    'Kleine Bestätigungen (Checkbox, Switch)',
  ],
  [
    'in-out-soft',
    'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-in-out-soft',
    'Endlos-Schleifen (Verläufe, Skeleton)',
  ],
] as const

export function SecLayout() {
  return (
    <SgSection
      id="raster"
      no="05"
      title="Raster, Abstände & Tiefe"
      intro="4-px-Grundraster, Seitencontainer bis 1400 px, Radien abgeleitet vom abgerundeten Bildzeichen, Schatten petrol-getönt."
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <SgSub title="Abstände" text="Tailwind-Skala, Vielfache von 4 px.">
          <div className="flex flex-col gap-2">
            {spacing.map(([t, px]) => (
              <div key={t} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-4">
                <span className="font-mono text-caption text-ink">{t}</span>
                <span className="text-caption text-muted tabular-nums">{px} px</span>
                <span className="h-3 rounded-xs bg-blue-200" style={{ width: px * 2 }} />
              </div>
            ))}
          </div>
        </SgSub>
        <SgSub
          title="Seitenraster"
          text="12 Spalten ab lg, darunter einspaltig. Rand 16 / 24 / 40 px."
        >
          <div className="grid h-56 grid-cols-4 gap-2 rounded-lg bg-surface-muted p-4 sm:grid-cols-6 lg:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'rounded-xs bg-blue-100',
                  i >= 4 && 'hidden sm:block',
                  i >= 6 && 'sm:hidden lg:block',
                )}
              />
            ))}
          </div>
          <p className="font-mono text-caption text-muted">
            .container-page → max-w-[1400px] · px-4 sm:px-6 lg:px-10
          </p>
        </SgSub>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <SgSub
          title="Radien"
          text="Abgeleitet vom Bildzeichen: Eckradius ≈ 10 % der Kantenlänge, Flächen bei 8 px gedeckelt. Keine Pillenformen; rounded-full nur für Radio, Schalter und Statuspunkte."
        >
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {radii.map(([t, v, cls, use]) => (
              <div key={t} className="flex flex-col gap-2">
                <span className={cn('aspect-square bg-primary', cls)} />
                <span className="font-mono text-caption text-ink">{t}</span>
                <span className="text-caption text-muted">
                  {v} · {use}
                </span>
              </div>
            ))}
          </div>
        </SgSub>
        <SgSub
          title="Schatten"
          text="Nur für schwebende Ebenen. Cards liegen flach und grenzen sich über Linie oder Fläche ab."
        >
          <div className="grid grid-cols-2 gap-6 rounded-lg bg-surface-muted p-8 sm:grid-cols-4">
            {shadows.map(([t, cls, use]) => (
              <div key={t} className="flex flex-col gap-3">
                <span className={cn('aspect-square rounded-lg bg-surface', cls)} />
                <span className="font-mono text-caption text-ink">{t}</span>
                <span className="text-caption text-muted">{use}</span>
              </div>
            ))}
          </div>
        </SgSub>
      </div>

      <SgSub
        title="Bewegung"
        text="Fahre über eine Zeile, um die Kurve zu sehen. Dauer: 200 ms (Mikro), 300–500 ms (Hover, Einblenden), 700 ms (Layout). Mit „Bewegung reduzieren“ entfallen alle Animationen."
      >
        <div className="divide-y divide-line border-y border-line">
          {easings.map(([t, curve, cls, use]) => (
            <div
              key={t}
              className="group/ease grid items-center gap-4 py-5 md:grid-cols-[9rem_1fr_16rem]"
            >
              <span className="font-mono text-small text-ink">{t}</span>
              <div className="@container relative h-10 overflow-hidden rounded-sm bg-n-100">
                <span
                  className={cn(
                    'absolute top-1 left-1 size-8 rounded-full bg-primary shadow-sm transition-transform duration-[1200ms] group-hover/ease:translate-x-[calc(100cqw-2.5rem)]',
                    cls,
                  )}
                />
              </div>
              <span className="text-caption text-muted">
                {use}
                <br />
                <span className="font-mono">{curve}</span>
              </span>
            </div>
          ))}
        </div>
      </SgSub>
    </SgSection>
  )
}
