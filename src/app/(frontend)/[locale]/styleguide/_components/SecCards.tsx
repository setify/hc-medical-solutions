import { ArrowRight, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

import { AccordionGallery } from '@/components/effects/AccordionGallery'
import { BorderGlowCard } from '@/components/effects/BorderGlowCard'
import { BounceCards } from '@/components/effects/BounceCards'
import { ScrollStack } from '@/components/effects/ScrollStack'
import { BrandArt } from '@/components/ui/BrandArt'
import { Card, GlareCard, JobCard, ServiceCard } from '@/components/ui/Card'
import { LineButton } from '@/components/ui/LineButton'

import { SgSection, SgSub, Specimen } from './Sg'

const stack = [
  {
    no: '01',
    t: 'Analyse',
    d: 'Ausgangslage, Anforderungen und Ziele werden gemeinsam aufgenommen.',
    seed: 0,
  },
  {
    no: '02',
    t: 'Konzept',
    d: 'Aus den Anforderungen entsteht ein belastbarer, abgestimmter Plan.',
    seed: 1,
  },
  { no: '03', t: 'Umsetzung', d: 'Schrittweise Realisierung mit festen Prüfpunkten.', seed: 5 },
  { no: '04', t: 'Freigabe', d: 'Abnahme, Dokumentation und Übergabe.', seed: 3 },
]

export function SecCards() {
  return (
    <SgSection
      id="cards"
      no="08"
      title="Cards"
      intro="Cards nur dort, wo Erhöhung Hierarchie ausdrückt. Sonst gliedern Linien und Weißraum. Alle Inhalte hier sind Beispieltexte."
    >
      <SgSub title="Grundformen" text="plain · muted · outline · inverse">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <Card>
            <p className="text-h4">Plain</p>
            <p className="mt-2 text-small text-muted">Weiß mit feiner Linie, ohne Schatten.</p>
          </Card>
          <Card tone="muted">
            <p className="text-h4">Muted</p>
            <p className="mt-2 text-small text-muted">Fläche ohne Rand.</p>
          </Card>
          <Card tone="outline">
            <p className="text-h4">Outline</p>
            <p className="mt-2 text-small text-muted">Nur Kontur.</p>
          </Card>
          <Card tone="inverse">
            <ShieldCheck aria-hidden="true" className="size-7 text-blue-200" />
            <p className="mt-6 text-h4">Inverse</p>
            <p className="mt-2 text-small text-petrol-100">Für Hervorhebungen auf hellen Seiten.</p>
          </Card>
        </div>
      </SgSub>

      <SgSub
        title="Leistungs-Cards"
        text="Linie wächst beim Hover, gesamte Fläche ist klickbar, Fokusrahmen sichtbar."
      >
        <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
          <ServiceCard
            index="01"
            title="Regulatorische Beratung"
            text="Beispieltext: Begleitung von der Klassifizierung bis zur Einreichung."
          />
          <div className="grid gap-4">
            <ServiceCard
              index="02"
              title="Qualitätsmanagement"
              text="Beispieltext: Aufbau und Pflege von QM-Systemen."
            />
          </div>
        </div>
      </SgSub>

      <SgSub
        title="Stellenanzeigen"
        text="Für die Karriereseite: Status, Ort und Umfang auf einen Blick. Inaktive Stellen erscheinen nicht."
      >
        <div className="border-t border-line">
          <JobCard
            title="Regulatory Affairs Manager (m/w/d)"
            meta={[
              { icon: 'location', text: 'Region Stuttgart' },
              { icon: 'workplace', text: 'Hybrid' },
              { icon: 'type', text: 'Vollzeit' },
            ]}
            badge="Neu"
          />
          <JobCard
            title="Werkstudent Qualitätssicherung (m/w/d)"
            meta={[
              { icon: 'location', text: 'Köln' },
              { icon: 'type', text: 'Teilzeit, 16–20 h' },
            ]}
          />
        </div>
      </SgSub>

      <SgSub title="Animierte Cards">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Specimen label="Glare: Lichtreflex beim Hover" code="<GlareCard />" tone="none">
            <GlareCard className="flex min-h-72 flex-col justify-between">
              <span className="eyebrow text-blue-200 before:bg-blue-200">Kontrast</span>
              <div>
                <p className="text-display font-extralight">
                  9,36<span className="text-h2 text-blue-200"> : 1</span>
                </p>
                <p className="mt-2 text-small text-petrol-100">Weiß auf Petrol 700, erfüllt AAA</p>
              </div>
            </GlareCard>
          </Specimen>
          <Specimen
            label="Border Glow: Rand leuchtet zum Cursor hin"
            code="<BorderGlowCard />"
            tone="none"
          >
            <BorderGlowCard className="flex min-h-72 flex-col justify-between">
              <span className="eyebrow text-blue-200 before:bg-blue-200">Fokus</span>
              <div className="flex flex-col gap-3">
                <p className="text-h3">Mit der Maus an den Rand fahren</p>
                <p className="max-w-sm text-small text-petrol-100">
                  Der Schein folgt dem Zeiger und wird zur Kante hin stärker. Ohne React-Re-Render.
                </p>
              </div>
            </BorderGlowCard>
          </Specimen>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Specimen
            label="Bounce Cards: Stapel fächert beim Hover auf"
            code="<BounceCards />"
            className="overflow-hidden"
          >
            <BounceCards label="Fünf Beispielgrafiken im Linien-Motiv, aufgefächert" />
          </Specimen>
          <Specimen label="Bild-Card mit Zoom" tone="none">
            <a href="#cards" className="group/img relative block overflow-hidden rounded-lg">
              <div className="aspect-[4/3] transition-transform duration-700 ease-out-expo group-hover/img:scale-105">
                <BrandArt seed={2} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-petrol-950/90 to-transparent p-7 text-white">
                <span className="text-caption text-blue-100">Beispiel · Bericht</span>
                <span className="mt-1 flex items-center gap-2 text-h4">
                  Einblick in ein Projekt{' '}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover/img:translate-x-1"
                  />
                </span>
              </div>
            </a>
          </Specimen>
        </div>
      </SgSub>

      <SgSub
        title="Accordion Gallery"
        text="Streifen öffnen sich bei Hover, Fokus oder Tipp. Auf Mobilgeräten gestapelt."
      >
        <AccordionGallery
          items={[
            { title: 'Beratung', text: 'Beispieltext zum Leistungsbereich Beratung.', seed: 0 },
            { title: 'Qualität', text: 'Beispieltext zum Leistungsbereich Qualität.', seed: 2 },
            { title: 'Zulassung', text: 'Beispieltext zum Leistungsbereich Zulassung.', seed: 1 },
            { title: 'Schulung', text: 'Beispieltext zum Leistungsbereich Schulung.', seed: 3 },
            { title: 'Service', text: 'Beispieltext zum Leistungsbereich Service.', seed: 5 },
          ]}
        />
      </SgSub>

      <SgSub
        title="Scroll Stack"
        text="Karten kleben beim Scrollen oben und schieben sich übereinander. Kein Scroll-Hijacking, das Scrollverhalten bleibt nativ."
      >
        <ScrollStack
          items={stack.map((s) => (
            <div
              key={s.no}
              className="grid min-h-80 overflow-hidden rounded-lg bg-petrol-900 text-white md:grid-cols-[1.2fr_1fr]"
            >
              <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
                <span className="text-caption text-blue-200 tabular-nums">{s.no} / 04</span>
                <div className="flex flex-col gap-3">
                  <p className="text-h2 font-light">{s.t}</p>
                  <p className="max-w-sm text-small text-petrol-100">{s.d}</p>
                </div>
                <LineButton href="#cards" tone="light">
                  Beispiel-Link
                </LineButton>
              </div>
              <div className="hidden md:block">
                <BrandArt seed={s.seed} />
              </div>
            </div>
          ))}
        />
      </SgSub>
    </SgSection>
  )
}
