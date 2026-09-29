import { Alert, Accordion, Breadcrumb, EmptyState, ProcessSteps } from '@/components/ui/Feedback'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Field, Input } from '@/components/ui/Field'
import { Tabs } from '@/components/ui/Tabs'
import { ToastDemo } from '@/components/ui/ToastDemo'

import { SgSection, SgSub, Specimen } from './Sg'

export function SecFeedback() {
  return (
    <SgSection
      id="dialoge"
      no="09"
      title="Dialoge & Rückmeldungen"
      intro="Natives <dialog>: Fokusfalle, Escape und Fokus-Rückgabe liefert der Browser. Rückmeldungen erklären, was passiert ist und was zu tun ist."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
        <Specimen
          label="Dialog"
          code="<Dialog />"
          className="flex min-h-56 flex-wrap items-center justify-center gap-3"
        >
          <Dialog
            triggerLabel="Dialog öffnen"
            title="Rückruf vereinbaren"
            description="Beispiel-Dialog: Wir rufen Sie zu Ihrer Wunschzeit zurück."
            footer={
              <>
                <Button variant="ghost" type="submit">
                  Abbrechen
                </Button>
                <Button type="submit">Rückruf anfragen</Button>
              </>
            }
          >
            <Field label="Telefonnummer" required>
              {({ id, describedBy }) => (
                <Input id={id} type="tel" aria-describedby={describedBy} autoComplete="tel" />
              )}
            </Field>
          </Dialog>
          <Dialog
            triggerLabel="Bestätigung"
            triggerVariant="secondary"
            size="sm"
            title="Eintrag entfernen?"
            description="Diese Aktion kann nicht rückgängig gemacht werden."
            footer={
              <>
                <Button variant="secondary" type="submit">
                  Behalten
                </Button>
                <Button variant="danger" type="submit">
                  Entfernen
                </Button>
              </>
            }
          />
        </Specimen>
        <Specimen label="Toast – nach dem Absenden" code='aria-live="polite"'>
          <ToastDemo />
        </Specimen>
      </div>

      <SgSub title="Hinweise">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert title="Hinweis">Ihre Nachricht wird ausschließlich per E-Mail übermittelt.</Alert>
          <Alert tone="success" title="Nachricht gesendet">
            Wir melden uns innerhalb von zwei Werktagen.
          </Alert>
          <Alert tone="warning" title="Übersetzung ausstehend">
            Diese Seite ist noch nicht auf Französisch verfügbar.
          </Alert>
          <Alert tone="danger" title="Senden fehlgeschlagen">
            Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.
          </Alert>
        </div>
      </SgSub>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <SgSub
          title="Ladezustand"
          text="Skeletons in der Form des späteren Inhalts – keine Drehkreisel."
        >
          <div
            className="flex flex-col gap-4 rounded-xl border border-line p-6"
            role="status"
            aria-busy="true"
            aria-label="Inhalt wird geladen"
          >
            <div className="skeleton aspect-[16/9] rounded-lg" />
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
          </div>
        </SgSub>
        <SgSub title="Leerer Zustand">
          <EmptyState
            title="Aktuell keine offenen Stellen"
            text="Initiativbewerbungen sind jederzeit willkommen. Wir melden uns, sobald eine passende Position frei wird."
            action={<Button variant="secondary">Initiativ bewerben</Button>}
          />
        </SgSub>
      </div>
    </SgSection>
  )
}

export function SecNavigation() {
  return (
    <SgSection
      id="navigation"
      no="10"
      title="Navigation & Struktur"
      intro="Orientierung in wenigen Blicken: Brotkrumen, Tabs mit Tastatursteuerung, Akkordeon ohne JavaScript und Prozess-Schritte für die Seite „Vorgehensweise“."
    >
      <Specimen label="Brotkrumen" code="<Breadcrumb />">
        <Breadcrumb
          items={[
            { label: 'Start', href: '#navigation' },
            { label: 'Karriere', href: '#navigation' },
            { label: 'Offene Stellen' },
          ]}
        />
      </Specimen>

      <SgSub
        title="Tabs"
        text="Pfeiltasten wechseln, Pos1/Ende springen. Der Indikator gleitet mit Federphysik."
      >
        <Tabs
          tabs={[
            {
              label: 'Überblick',
              content: (
                <p className="max-w-[62ch] text-body text-muted">
                  Beispieltext Überblick. Tabs eignen sich für gleichrangige, kurze Inhalte.
                </p>
              ),
            },
            {
              label: 'Ablauf',
              content: (
                <p className="max-w-[62ch] text-body text-muted">
                  Beispieltext Ablauf. Maximal fünf Tabs, kurze Beschriftungen.
                </p>
              ),
            },
            {
              label: 'Kontakt',
              content: (
                <p className="max-w-[62ch] text-body text-muted">
                  Beispieltext Kontakt. Für lange Inhalte besser ein Akkordeon nutzen.
                </p>
              ),
            },
          ]}
        />
      </SgSub>

      <SgSub
        title="Akkordeon (FAQ)"
        text="Natives <details>: funktioniert ohne JavaScript, nur ein Eintrag gleichzeitig offen."
      >
        <Accordion
          items={[
            {
              q: 'Wie schnell erhalte ich eine Antwort?',
              a: 'Beispielantwort: In der Regel innerhalb von zwei Werktagen.',
            },
            {
              q: 'In welchen Sprachen beraten Sie?',
              a: 'Beispielantwort: Deutsch, Englisch und Französisch.',
            },
            {
              q: 'Werden meine Angaben gespeichert?',
              a: 'Beispielantwort: Nein. Anfragen werden ausschließlich per E-Mail übermittelt.',
            },
          ]}
        />
      </SgSub>

      <SgSub
        title="Prozess-Schritte"
        text="Vorlage für die Seite „Vorgehensweise“. Eine durchgehende Linie verbindet die Schritte."
      >
        <ProcessSteps
          steps={[
            { title: 'Erstgespräch', text: 'Beispieltext: Anliegen und Rahmen klären.' },
            { title: 'Angebot', text: 'Beispieltext: Umfang, Zeitplan und Kosten festlegen.' },
            { title: 'Umsetzung', text: 'Beispieltext: Arbeiten mit festen Prüfpunkten.' },
            { title: 'Abschluss', text: 'Beispieltext: Übergabe und Dokumentation.' },
          ]}
        />
      </SgSub>
    </SgSection>
  )
}
