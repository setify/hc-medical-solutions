import {
  ArrowRight,
  DownloadSimple,
  EnvelopeSimple,
  Phone,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr'

import { MagneticButton } from '@/components/effects/MagneticButton'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink, roundIconClasses } from '@/components/ui/Button'
import { Checkbox, Field, Input, Radio, Select, Switch, Textarea } from '@/components/ui/Field'
import { LineButton } from '@/components/ui/LineButton'
import { StarBorder } from '@/components/ui/StarBorder'

import { SgSection, SgSub, Specimen } from './Sg'

export function SecButtons() {
  return (
    <SgSection
      id="buttons"
      no="06"
      title="Buttons & Links"
      intro="Vollrund nach Kundenvorlage, ruhige Farbflächen ohne Schatten. Blau ist die Primärfarbe, Teal die Zweitfarbe, vor allem auf dunklen Panels. Pro Bereich höchstens ein primärer Button. Beim Klicken gibt jeder Button mit leichtem Eindrücken (scale 0,98) Rückmeldung."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Specimen label="Varianten" code="<Button variant=… />" tone="plain">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primär</Button>
            <Button variant="signal">Teal</Button>
            <Button variant="dark">Tiefblau</Button>
            <Button variant="secondary">Sekundär</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Löschen</Button>
          </div>
        </Specimen>
        <Specimen label="Auf dunklem Grund" code='variant="signal" · "inverse"' tone="dark">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="signal" iconRight={<ArrowRight className="size-4" />}>
              Kontakt aufnehmen
            </Button>
            <Button variant="inverse">Weiß</Button>
            <LineButton href="#buttons" tone="light">
              Mehr erfahren
            </LineButton>
          </div>
        </Specimen>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
        <Specimen label="Größen sm · md · lg" code='size="sm|md|lg"'>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Klein</Button>
            <Button size="md">Mittel</Button>
            <Button size="lg">Groß</Button>
          </div>
        </Specimen>
        <Specimen label="Zustände" code="loading · disabled">
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Wird gesendet</Button>
            <Button disabled>Deaktiviert</Button>
          </div>
        </Specimen>
        <Specimen label="Mit Icon" code="iconLeft · iconRight">
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink
              href="#buttons"
              variant="secondary"
              iconLeft={<DownloadSimple className="size-4" />}
            >
              Broschüre (PDF)
            </ButtonLink>
            <Button variant="accent" iconRight={<ArrowUpRight className="size-4" />}>
              Zur Stelle
            </Button>
          </div>
        </Specimen>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Specimen
          label="Runde Pfeil-Buttons (Karten, Karussell)"
          code="roundIconClasses('dark' | 'light' | 'outline')"
        >
          <div className="flex flex-wrap items-center gap-3">
            <a href="#buttons" aria-label="Weiter (dunkel)" className={roundIconClasses('dark')}>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a href="#buttons" aria-label="Weiter (Rand)" className={roundIconClasses('outline')}>
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <span className="rounded-full bg-blue-950 p-1.5">
              <a href="#buttons" aria-label="Weiter (hell)" className={roundIconClasses('light')}>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </span>
          </div>
        </Specimen>
        <Specimen label="Kennzeichnung über Überschriften" code='className="eyebrow"'>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Über HC Medical Solutions</span>
            <span className="rounded-full bg-blue-950 p-2">
              <span className="eyebrow eyebrow-dark">Leistungen</span>
            </span>
          </div>
        </Specimen>
      </div>

      <SgSub
        title="Sekundäre, animierte Buttons"
        text="Für Stellen, die Aufmerksamkeit verdienen, ohne laut zu werden. Jeweils nur einmal pro Ansicht."
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <Specimen
            label="Star Border: Lichtpunkt läuft um den Rand"
            code="<StarBorder />"
            tone="dark"
            className="grid min-h-56 place-items-center"
          >
            <StarBorder>
              <EnvelopeSimple aria-hidden="true" className="size-4" /> Beratung anfragen
            </StarBorder>
          </Specimen>
          <div className="grid gap-6">
            <Specimen
              label="Linien-Button: Linie klappt zur Unterstreichung"
              code="<LineButton />"
              className="grid place-items-center"
            >
              <LineButton href="#buttons">Alle Leistungen ansehen</LineButton>
            </Specimen>
            <Specimen
              label="Magnetisch: folgt dem Mauszeiger"
              code="<MagneticButton />"
              className="grid place-items-center"
            >
              <MagneticButton>
                <Phone aria-hidden="true" className="size-4" /> Rückruf vereinbaren
              </MagneticButton>
            </Specimen>
          </div>
        </div>
      </SgSub>

      <SgSub title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge tone="teal">Teal</Badge>
          <Badge tone="accent" dot>
            Akzent
          </Badge>
          <Badge tone="success" dot>
            Stelle aktiv
          </Badge>
          <Badge tone="warning">Entwurf</Badge>
          <Badge tone="danger">Abgelaufen</Badge>
        </div>
      </SgSub>
    </SgSection>
  )
}

export function SecForms() {
  return (
    <SgSection
      id="formulare"
      no="07"
      title="Formulare"
      intro="Label über dem Feld, Pflichtfelder mit *, Hilfetext und Fehlermeldung darunter, per aria-describedby verknüpft. Kein externes Captcha; Spamschutz serverseitig."
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <Specimen label="Kontaktformular (Beispiel, ohne Versand)" tone="plain">
          <form className="grid gap-6 sm:grid-cols-2" noValidate>
            <Field label="Vorname" required>
              {({ id, describedBy }) => (
                <Input id={id} aria-describedby={describedBy} autoComplete="given-name" required />
              )}
            </Field>
            <Field label="Nachname" required>
              {({ id, describedBy }) => (
                <Input id={id} aria-describedby={describedBy} autoComplete="family-name" required />
              )}
            </Field>
            <Field label="E-Mail" required className="sm:col-span-2">
              {({ id, describedBy }) => (
                <Input
                  id={id}
                  type="email"
                  aria-describedby={describedBy}
                  autoComplete="email"
                  placeholder="name@unternehmen.de"
                  required
                />
              )}
            </Field>
            <Field label="Telefon" optionalLabel="optional">
              {({ id, describedBy }) => (
                <Input id={id} type="tel" aria-describedby={describedBy} autoComplete="tel" />
              )}
            </Field>
            <Field label="Anliegen" required>
              {({ id, describedBy }) => (
                <Select id={id} aria-describedby={describedBy} defaultValue="" required>
                  <option value="" disabled>
                    Bitte wählen
                  </option>
                  <option>Allgemeine Anfrage</option>
                  <option>Projektanfrage</option>
                  <option>Bewerbung</option>
                </Select>
              )}
            </Field>
            <Field
              label="Nachricht"
              required
              hint="Maximal 2.000 Zeichen."
              className="sm:col-span-2"
            >
              {({ id, describedBy }) => (
                <Textarea id={id} aria-describedby={describedBy} maxLength={2000} required />
              )}
            </Field>
            <Checkbox
              className="sm:col-span-2"
              required
              label="Ich habe die Datenschutzhinweise gelesen. *"
              description="Ihre Angaben werden nur zur Bearbeitung der Anfrage per E-Mail übermittelt und nicht gespeichert."
            />
            <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
              <p className="text-caption text-muted">* Pflichtfeld</p>
              <Button type="button" iconRight={<ArrowRight className="size-4" />}>
                Anfrage senden
              </Button>
            </div>
          </form>
        </Specimen>

        <div className="flex flex-col gap-8">
          <Specimen label="Zustände">
            <div className="flex flex-col gap-6">
              <Field
                label="Fehler"
                required
                error="Bitte geben Sie eine gültige E-Mail-Adresse ein."
              >
                {({ id, describedBy, invalid }) => (
                  <Input
                    id={id}
                    aria-describedby={describedBy}
                    invalid={invalid}
                    defaultValue="name@firma"
                  />
                )}
              </Field>
              <Field label="Erfolgreich geprüft" success="Adresse ist gültig.">
                {({ id, describedBy }) => (
                  <Input id={id} aria-describedby={describedBy} defaultValue="info@beispiel.de" />
                )}
              </Field>
              <Field label="Deaktiviert">
                {({ id }) => <Input id={id} disabled defaultValue="Nicht bearbeitbar" />}
              </Field>
            </div>
          </Specimen>
          <Specimen label="Auswahl">
            <div className="flex flex-col gap-5">
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-3 text-small text-ink">Bevorzugter Kontaktweg</legend>
                <Radio name="kontakt" label="E-Mail" defaultChecked />
                <Radio name="kontakt" label="Telefon" />
              </fieldset>
              <Checkbox label="Kopie an mich senden" defaultChecked />
              <Switch label="Rückruf gewünscht" />
            </div>
          </Specimen>
        </div>
      </div>
    </SgSection>
  )
}
