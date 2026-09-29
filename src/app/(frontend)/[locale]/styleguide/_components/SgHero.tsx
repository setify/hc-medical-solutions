import MicroSlats from '@/components/effects/MicroSlats'
import { Logo } from '@/components/brand/Logo'
import { RotatingText } from '@/components/text/RotatingText'

/** Bühne des Styleguides: Lamellen-Hintergrund, asymmetrischer Aufbau. */
export function SgHero() {
  return (
    <header className="relative isolate overflow-hidden bg-petrol-950 text-white">
      <div className="absolute inset-0 -z-10 opacity-90">
        <MicroSlats />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-petrol-950 via-petrol-950/80 to-transparent" />
      <div className="container-page grid min-h-[min(88dvh,52rem)] gap-12 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:py-28">
        <div className="flex flex-col gap-8">
          <span className="eyebrow text-blue-200 before:bg-blue-200">
            HC Medical Solutions · Designsystem 1.0
          </span>
          <h1 className="text-display font-extralight">
            Eine Linie.
            <br />
            <span className="text-blue-200">Ein System.</span>
          </h1>
          <p className="max-w-[46ch] text-lead font-light text-petrol-100">
            Designsystem für{' '}
            <RotatingText
              words={['die Website', 'die Präsentation', 'den Flyer']}
              className="text-white"
            />{' '}
            – abgeleitet aus dem Logoblatt, erweitert um alles, was eine barrierearme, dreisprachige
            Website braucht.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-xl bg-white/10 text-white backdrop-blur-md">
          {[
            ['Tokens', 'Farbe · Typo · Raum'],
            ['Komponenten', '30+'],
            ['Standard', 'WCAG 2.2 AA'],
            ['Sprachen', 'DE · EN · FR'],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 bg-petrol-950/60 p-5">
              <dt className="text-caption text-petrol-200">{k}</dt>
              <dd className="text-small">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="container-page flex items-center justify-between border-t border-white/10 py-5">
        <Logo variant="weiss" className="h-7 w-auto" />
        <span className="text-caption text-petrol-200">
          Intern · nicht indexiert · Stand {new Date().getFullYear()}
        </span>
      </div>
    </header>
  )
}
