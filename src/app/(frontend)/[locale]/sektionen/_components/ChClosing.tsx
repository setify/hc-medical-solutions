import { ArrowRight, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { MagneticButton } from '@/components/effects/MagneticButton'
import { ButtonLink } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Feedback'
import { LineButton } from '@/components/ui/LineButton'

import { faqs, images, lorem, people, services } from '../_lib/data'
import { Chapter, Kicker, Pad, Variant } from './Frame'
import { BackgroundPaths } from '@/components/effects/BackgroundPaths'
import { Globe } from './fx/Globe'
import { DirectionalLink, FaqTabs, MegaMenu } from './fx/Misc'
import { ContactPerson } from './fx/People'

export function ChFaq() {
  return (
    <Chapter
      id="faq"
      no="13"
      title="Fragen und Antworten"
      intro="Die alte Seite nutzte ein Akkordeon für Rückrufe und Vorkommnisse. Zwei Varianten: klassisch mit klebender Überschrift und nach Themen gegliedert."
    >
      <Variant code="F1" name="Klebende Überschrift mit Akkordeon" tags={['Ohne JavaScript']}>
        <Pad>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col gap-4 lg:sticky lg:top-36 lg:self-start">
              <Kicker>FAQ</Kicker>
              <h3 className="text-h1 font-light">Häufige Fragen</h3>
              <LineButton href="#v-f1">Frage nicht dabei? Kontakt</LineButton>
            </div>
            <Accordion items={faqs} />
          </div>
        </Pad>
      </Variant>
      <Variant code="F2" name="Nach Themen" tags={['Viele Fragen']}>
        <Pad tone="muted">
          <FaqTabs
            groups={[
              { label: 'Bestellung', items: faqs.slice(0, 3) },
              { label: 'Lieferung', items: faqs.slice(1, 4) },
              { label: 'Qualität', items: faqs.slice(0, 2) },
              { label: 'Rücksendung', items: faqs.slice(2, 4) },
            ].map((g) => ({
              ...g,
              items: g.items.map((f) => ({ ...f, q: `${f.q.replace('?', '')} (${g.label})?` })),
            }))}
          />
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChCta() {
  return (
    <Chapter
      id="aufrufe"
      no="14"
      title="Handlungsaufrufe"
      intro="Am Ende jeder Seite steht ein klarer nächster Schritt. Die alte Seite endete mit der Adresse. Hier fünf Abschlüsse, dazu ein Kontaktblock."
    >
      <Variant code="C1" name="Dunkles Band mit Linien" tags={['Dunkel', 'Animiert']}>
        <div className="panel bg-blue-950 text-white">
          <BackgroundPaths className="text-blue-400 opacity-60" />
          <div className="container-page relative grid gap-10 py-24 md:grid-cols-[2fr_1fr] md:items-end md:py-32">
            <h3 className="text-h1 font-light">Sprechen wir über Ihren Bedarf</h3>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <ButtonLink href="#v-c1" variant="signal" size="lg" iconRight={<ArrowRight />}>
                Kontakt aufnehmen
              </ButtonLink>
            </div>
          </div>
        </div>
      </Variant>

      <Variant code="C2" name="Mit Ansprechperson" tags={['Persönlich']}>
        <Pad tone="muted">
          <div className="grid items-center gap-12 rounded-xl bg-surface p-8 shadow-sm md:grid-cols-2 md:p-14">
            <div className="flex flex-col gap-4">
              <h3 className="text-h2 font-light">Fragen zu Produkten oder Lieferung?</h3>
              <p className="text-body text-muted">{lorem.short}</p>
            </div>
            <div className="md:border-l md:border-line md:pl-12">
              <ContactPerson person={people[0]!} />
            </div>
          </div>
        </Pad>
      </Variant>

      <Variant code="C3" name="Große Linkzeile" tags={['Typografisch', 'Hover']}>
        <div className="container-page py-16">
          <DirectionalLink href="#v-c3">Anfrage stellen</DirectionalLink>
          <DirectionalLink href="#v-c3">Offene Stellen</DirectionalLink>
        </div>
      </Variant>

      <Variant code="C4" name="Zwei Wege" tags={['Bild', 'Verzweigung']}>
        <div className="panel grid gap-3 overflow-visible md:grid-cols-2 [&>a]:rounded-xl">
          {[
            {
              title: 'Für Kunden',
              text: 'Anfrage zu Produkten und Lieferung.',
              image: images.meeting,
            },
            {
              title: 'Für Bewerbende',
              text: 'Offene Stellen und Initiativbewerbung.',
              image: images.office,
            },
          ].map((c) => (
            <a
              key={c.title}
              href="#v-c4"
              className="group relative isolate flex min-h-[26rem] flex-col justify-end gap-3 overflow-hidden p-8 text-white md:p-12"
            >
              <Image
                src={c.image.src}
                alt=""
                fill
                sizes="50vw"
                className="-z-20 object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-blue-950/70 transition-colors duration-500 group-hover:bg-blue-900/80"
              />
              <span
                aria-hidden="true"
                className="h-10 w-px origin-bottom bg-blue-200 transition-transform duration-500 ease-out-expo group-hover:scale-y-150"
              />
              <span className="text-h2 font-light">{c.title}</span>
              <span className="flex items-center gap-2 text-small text-blue-100">
                {c.text}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                />
              </span>
            </a>
          ))}
        </div>
      </Variant>

      <Variant
        code="C5"
        name="Schlicht mit magnetischem Button"
        note="Button aus dem Styleguide"
        tags={['Hell', 'Minimal']}
      >
        <Pad>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <h3 className="max-w-2xl text-h1 font-light">Bereit für den nächsten Schritt?</h3>
            <MagneticButton size="lg">Termin vereinbaren</MagneticButton>
          </div>
        </Pad>
      </Variant>

      <Variant code="O1" name="Kontaktblock mit Globus" tags={['Dunkel', 'Kontakt']}>
        <div className="panel bg-teal-900 text-white">
          <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-8">
              <h3 className="text-h1 font-light">Kontakt</h3>
              <ul className="flex flex-col divide-y divide-white/15 border-y border-white/15">
                {[
                  [MapPin, 'Straße und Hausnummer, PLZ Ort'],
                  [Phone, 'Telefonnummer'],
                  [EnvelopeSimple, 'E-Mail-Adresse'],
                ].map(([Icon, t]) => {
                  const I = Icon as typeof MapPin
                  return (
                    <li key={t as string} className="flex items-center gap-4 py-5 text-body">
                      <I aria-hidden="true" weight="light" className="size-6 text-blue-200" />
                      {t as string}
                    </li>
                  )
                })}
              </ul>
              <LineButton href="#v-o1" tone="light">
                Zum Kontaktformular
              </LineButton>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Globe />
            </div>
          </div>
        </div>
      </Variant>
    </Chapter>
  )
}

export function ChNav() {
  return (
    <Chapter
      id="navigation"
      no="15"
      title="Navigation"
      intro="Für den Menüpunkt Unternehmen mit Unterseiten. Ein Mega-Menü zeigt Unterpunkte mit kurzer Erklärung und einem hervorgehobenen Inhalt."
    >
      <Variant
        code="N1"
        name="Mega-Menü"
        note="nach 21st.dev Navigation Menu"
        tags={['Interaktiv']}
      >
        <Pad tone="muted" className="min-h-[32rem]">
          <MegaMenu
            groups={[
              {
                label: 'Unternehmen',
                image: images.meeting,
                items: services
                  .slice(0, 3)
                  .map((s) => ({ title: s.title, text: 'Eine Zeile Erklärung.' }))
                  .concat({ title: 'Partner', text: 'Eine Zeile Erklärung.' }),
              },
              {
                label: 'Leistungen',
                image: images.road,
                items: ['Beschaffung', 'Lagerung', 'Versand', 'Dokumentation'].map((t) => ({
                  title: t,
                  text: 'Eine Zeile Erklärung.',
                })),
              },
              {
                label: 'Karriere',
                image: images.office,
                items: ['Offene Stellen', 'Arbeiten bei HC', 'Initiativbewerbung'].map((t) => ({
                  title: t,
                  text: 'Eine Zeile Erklärung.',
                })),
              },
            ]}
          />
        </Pad>
      </Variant>
    </Chapter>
  )
}
