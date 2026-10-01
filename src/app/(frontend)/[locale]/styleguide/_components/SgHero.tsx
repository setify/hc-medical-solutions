import MicroSlats from '@/components/effects/MicroSlats'

const meta = [
  ['Grundlage', 'Logoblatt Honegger&Bregenzer, 09/2023'],
  ['Version', '1.2 · nach Kundenvorlage'],
  ['Geltung', 'Website, Präsentation, Flyer'],
  ['Standard', 'WCAG 2.2 AA, DE · EN · FR'],
]

/** Bühne des Styleguides: Lamellen-Hintergrund, Titel links, Metadaten auf Linien. */
export function SgHero() {
  return (
    <header className="panel mt-4 bg-blue-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <MicroSlats />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 from-35% via-blue-950/70 to-transparent"
      />
      <div className="container-page flex min-h-[min(80dvh,46rem)] flex-col justify-end gap-14 py-16 md:py-24">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="text-small text-blue-200">HC Medical Solutions</p>
          <h1 className="text-display font-light">Designsystem</h1>
          <p className="max-w-[52ch] text-lead font-light text-blue-100">
            Logo, Farben und Schrift aus dem Logoblatt, erweitert um die Bausteine einer
            barrierearmen, dreisprachigen Website.
          </p>
        </div>
        <dl className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-1 border-b border-white/15 py-4 sm:pr-6 lg:border-b-0"
            >
              <dt className="text-caption text-blue-200">{k}</dt>
              <dd className="text-small">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
