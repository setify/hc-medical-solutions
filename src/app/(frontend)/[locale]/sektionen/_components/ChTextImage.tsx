import { Check } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { ScrollReveal } from '@/components/text/ScrollReveal'
import { LineButton } from '@/components/ui/LineButton'

import { features, images, lorem, services } from '../_lib/data'
import { Chapter, Kicker, Pad, Variant } from './Frame'
import { CompareSlider } from './fx/CompareSlider'
import { Hotspots } from './fx/Hotspots'
import { StickySteps } from './fx/StickySteps'

export function ChText() {
  return (
    <Chapter
      id="text"
      no="03"
      title="Textabschnitte"
      intro="Die alte Seite setzte Text meist als Block. Hier sechs Formen, die lange Inhalte gliedern, ohne in Kacheln zu zerfallen."
    >
      <Variant code="T1" name="Leitsatz mit Scroll-Einfärbung" tags={['Scroll', 'Typografisch']}>
        <Pad>
          <div className="max-w-5xl">
            <ScrollReveal text="Ein großer Leitsatz färbt sich Wort für Wort ein, während man scrollt. Er eignet sich für die Kernaussage einer Seite." />
          </div>
        </Pad>
      </Variant>

      <Variant code="T2" name="Klebende Überschrift mit Fließtext" tags={['Lange Texte']}>
        <Pad>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Kicker>Über uns</Kicker>
              <h3 className="mt-4 text-h1 font-light">Die Überschrift bleibt stehen</h3>
            </div>
            <div className="prose-hc">
              <p className="text-lead font-light text-ink">{lorem.short}</p>
              <p>{lorem.long}</p>
              <h3>Zwischenüberschrift</h3>
              <p>{lorem.medium}</p>
              <ul>
                <li>Aufzählung mit Linien-Marker</li>
                <li>Zweiter Punkt der Liste</li>
                <li>Dritter Punkt der Liste</li>
              </ul>
              <p>{lorem.long}</p>
            </div>
          </div>
        </Pad>
      </Variant>

      <Variant code="T3" name="Redaktionell mit Randzitat" tags={['Magazin']}>
        <Pad>
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_18rem]">
            <p className="text-body text-ink-soft first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:font-extralight first-letter:text-primary">
              {lorem.long}
            </p>
            <p className="text-body text-ink-soft">{lorem.long}</p>
            <blockquote className="border-l border-accent pl-6 text-h4 font-light text-ink md:col-span-2 lg:col-span-1">
              „Ein kurzer Satz aus dem Text, groß am Rand wiederholt.“
            </blockquote>
          </div>
        </Pad>
      </Variant>

      <Variant
        code="T4"
        name="Merkmale als Linienliste"
        note="ersetzt das Icon-Raster der alten Seite"
        tags={['Liste', 'Ruhig']}
      >
        <Pad tone="muted">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <h3 className="text-h2 font-light">Was wir zusichern</h3>
            <dl className="divide-y divide-line border-y border-line">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="grid gap-2 py-6 md:grid-cols-[3rem_1fr_1.2fr] md:gap-6"
                >
                  <dt className="flex items-baseline gap-6 text-h4 md:contents">
                    <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
                    <span>{f.title}</span>
                  </dt>
                  <dd className="text-body text-muted">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Pad>
      </Variant>

      <Variant
        code="T5"
        name="Checkliste zweispaltig"
        note="für die Vorteilsliste der alten Seite"
        tags={['Liste']}
      >
        <Pad>
          <div className="flex flex-col gap-10">
            <h3 className="max-w-2xl text-h2 font-light">Ihre Vorteile auf einen Blick</h3>
            <ul className="grid gap-x-16 gap-y-5 md:grid-cols-2">
              {[
                'Vorteil in einer Zeile',
                'Zweiter Vorteil, etwas länger formuliert',
                'Dritter Vorteil',
                'Vierter Vorteil mit Detail',
                'Fünfter Vorteil',
                'Sechster Vorteil',
              ].map((t) => (
                <li key={t} className="flex items-start gap-4 border-b border-line pb-5 text-body">
                  <Check
                    aria-hidden="true"
                    weight="bold"
                    className="mt-1 size-4 shrink-0 text-primary"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Pad>
      </Variant>

      <Variant code="T6" name="Text mit Randnotizen" tags={['Fachtext', 'MDR']}>
        <Pad>
          <div className="flex max-w-5xl flex-col gap-10">
            {[0, 1].map((k) => (
              <div key={k} className="grid gap-4 md:grid-cols-[1fr_14rem] md:gap-12">
                <p className="text-body text-ink-soft">{lorem.long}</p>
                <aside className="border-t border-accent pt-3 text-caption text-muted">
                  <span className="mb-1 block font-mono text-accent-strong">Hinweis {k + 1}</span>
                  Randnotiz, etwa ein Verweis auf eine Verordnung oder ein Dokument zum Download.
                </aside>
              </div>
            ))}
          </div>
        </Pad>
      </Variant>
    </Chapter>
  )
}

export function ChImage() {
  return (
    <Chapter
      id="bild-text"
      no="04"
      title="Bild und Text"
      intro="Die alte Seite kombinierte Bild und Text in einer Form. Hier sieben Kombinationen: versetzt, als Collage, klebend, als Band, mit Vergleich und mit erklärenden Markierungen."
    >
      <Variant code="B1" name="Überlappend versetzt" tags={['Hell', 'Statisch']}>
        <Pad>
          <div className="grid items-center lg:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <Image
                src={images.office.src}
                alt={images.office.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative -mt-16 mr-4 ml-4 flex flex-col gap-5 rounded-lg bg-surface p-8 shadow-lg lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:m-0 lg:p-12">
              <Kicker>Vorgehensweise</Kicker>
              <h3 className="text-h2 font-light">Textfläche überlappt das Bild</h3>
              <p className="text-body text-muted">{lorem.medium}</p>
              <LineButton href="#v-b1">Weiterlesen</LineButton>
            </div>
          </div>
        </Pad>
      </Variant>

      <Variant code="B2" name="Collage mit Parallaxe" tags={['Scroll', 'Bilder']}>
        <Pad>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col gap-5">
              <h3 className="text-h1 font-light">Drei Bilder, drei Tiefen</h3>
              <p className="max-w-[46ch] text-body text-muted">
                Die Bilder verschieben sich beim Scrollen unterschiedlich schnell im Rahmen.
              </p>
            </div>
            <div className="grid [height:clamp(24rem,50vw,36rem)] grid-cols-6 grid-rows-6 gap-4">
              <div className="relative col-span-4 row-span-4 overflow-hidden rounded-lg">
                <Image
                  src={images.meeting.src}
                  alt={images.meeting.alt}
                  fill
                  sizes="35vw"
                  className="parallax-y object-cover"
                />
              </div>
              <div className="relative col-span-2 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-lg">
                <Image
                  src={images.papers.src}
                  alt={images.papers.alt}
                  fill
                  sizes="20vw"
                  className="parallax-y object-cover [animation-direction:reverse]"
                />
              </div>
              <div className="relative col-span-3 col-start-2 row-span-2 row-start-5 overflow-hidden rounded-lg">
                <Image
                  src={images.road.src}
                  alt={images.road.alt}
                  fill
                  sizes="25vw"
                  className="parallax-y object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="col-span-1 col-start-6 row-span-2 row-start-5 h-full w-px self-start justify-self-center bg-accent"
              />
            </div>
          </div>
        </Pad>
      </Variant>

      <Variant code="B3" name="Klebendes Bild, laufende Schritte" tags={['Scroll', 'Erzählend']}>
        <Pad>
          <StickySteps
            items={services.map((s) => ({ title: s.title, text: s.text, image: s.image }))}
          />
        </Pad>
      </Variant>

      <Variant code="B4" name="Bildband mit Bildunterschrift" tags={['Vollbreite', 'Scroll']}>
        <figure>
          <div className="panel h-[70dvh]">
            <Image
              src={images.mountains.src}
              alt={images.mountains.alt}
              fill
              sizes="100vw"
              className="parallax-y object-cover"
            />
          </div>
          <figcaption className="container-page flex items-center gap-4 py-4 text-caption text-muted">
            <span aria-hidden="true" className="h-3 w-px bg-accent" />
            Bildunterschrift mit Ort oder Quelle
          </figcaption>
        </figure>
      </Variant>

      <Variant code="B5" name="Bildvergleich" tags={['Interaktiv']}>
        <Pad tone="muted">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-5">
              <h3 className="text-h2 font-light">Vorher und nachher</h3>
              <p className="text-body text-muted">
                Linie ziehen oder mit der Tastatur verschieben. Geeignet für Umbauten, Verpackungen
                oder Abläufe.
              </p>
            </div>
            <CompareSlider before={images.studio} after={images.office} />
          </div>
        </Pad>
      </Variant>

      <Variant code="B6" name="Zickzack" tags={['Klassisch', 'Lange Seiten']}>
        <Pad>
          <div className="flex flex-col gap-20 md:gap-28">
            {services.slice(0, 3).map((s, i) => (
              <div key={s.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div
                  className={`relative aspect-[5/4] overflow-hidden rounded-lg ${i % 2 ? 'md:order-2' : ''}`}
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="font-mono text-caption text-accent-strong">0{i + 1}</span>
                  <h3 className="text-h2 font-light">{s.title}</h3>
                  <p className="max-w-[46ch] text-body text-muted">{lorem.medium}</p>
                  <LineButton href="#v-b6">Mehr zu {s.title}</LineButton>
                </div>
              </div>
            ))}
          </div>
        </Pad>
      </Variant>

      <Variant code="B7" name="Bild mit Markierungen" tags={['Interaktiv', 'Erklärend']}>
        <Pad>
          <h3 className="mb-10 text-h2 font-light">Ablauf im Bild erklärt</h3>
          <Hotspots
            image={images.flatlay}
            spots={[
              {
                x: 22,
                y: 30,
                title: 'Wareneingang',
                text: 'Erklärung zum markierten Bereich in ein bis zwei Sätzen.',
              },
              {
                x: 58,
                y: 62,
                title: 'Prüfung',
                text: 'Erklärung zum markierten Bereich in ein bis zwei Sätzen.',
              },
              {
                x: 80,
                y: 28,
                title: 'Versand',
                text: 'Erklärung zum markierten Bereich in ein bis zwei Sätzen.',
              },
            ]}
          />
        </Pad>
      </Variant>
    </Chapter>
  )
}
