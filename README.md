# HC Medical Solutions – Website

Dreisprachige Unternehmenswebsite (Deutsch, Englisch, Französisch) mit eigenem CMS.

## Stack

| Bereich       | Technik                                                                         |
| ------------- | ------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, TypeScript strict)                                      |
| CMS           | Payload CMS 3 (läuft in derselben Next.js-App unter `/admin`)                   |
| Datenbank     | PostgreSQL – lokal über Supabase CLI, später Supabase (EU)                      |
| Datei-Storage | Supabase Storage über S3-Protokoll (`@payloadcms/storage-s3`), Bucket `uploads` |
| Mehrsprachig  | next-intl (Routing `/de`, `/en`, `/fr`) + Payload-Localization ohne Fallback    |
| Styling       | Tailwind CSS v4 (Design-Tokens in `src/app/(frontend)/globals.css`)             |
| Tests         | Vitest (Unit), Playwright + axe-core (E2E, Barrierefreiheit)                    |
| Hosting       | Vercel (noch nicht angebunden)                                                  |

## Voraussetzungen

- Node.js 24 (`.nvmrc`), pnpm 10
- Docker (für die lokale Supabase)
- Supabase CLI (`brew install supabase/tap/supabase`)

## Lokales Setup

```bash
pnpm install
cp .env.example .env          # PAYLOAD_SECRET setzen, S3-Keys aus `pnpm db:status`
pnpm db:start                 # Supabase lokal starten + Bucket anlegen
pnpm migrate                  # Datenbankschema anlegen
pnpm dev                      # http://localhost:3000
```

Beim ersten Aufruf von `/admin` wird das erste Benutzerkonto angelegt – es erhält automatisch die Rolle **Administrator**.

Die lokale Supabase nutzt die Ports **554xx** (API 55421, DB 55422, Studio 55423), damit sie parallel zu anderen Supabase-Projekten laufen kann.

## Scripts

| Befehl                         | Zweck                                             |
| ------------------------------ | ------------------------------------------------- |
| `pnpm dev`                     | Entwicklungsserver                                |
| `pnpm build` / `pnpm start`    | Produktions-Build / -Server                       |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript                               |
| `pnpm format`                  | Prettier (inkl. Tailwind-Klassensortierung)       |
| `pnpm test`                    | Unit-Tests (Vitest)                               |
| `pnpm test:e2e`                | E2E- und Barrierefreiheitstests (Port 3100)       |
| `pnpm generate:types`          | Payload-Typen nach Schemaänderung neu erzeugen    |
| `pnpm generate:importmap`      | Payload-Importmap nach Admin-Komponenten-Änderung |
| `pnpm migrate:create <name>`   | Neue Migration aus Schemaänderung erzeugen        |
| `pnpm migrate`                 | Offene Migrationen ausführen                      |
| `pnpm db:start` / `db:stop`    | Lokale Supabase starten / stoppen                 |

## Struktur

```
src/
  app/(frontend)/[locale]/   Öffentliche Website je Sprache
  app/(payload)/             Payload-Admin und API (generiert, nicht anfassen)
  app/robots.ts, sitemap.ts  SEO-Grundlagen
  collections/               Pages, Jobs, Media, Documents, Users
  globals/                   Navigation, Footer, Settings
  access/                    Zugriffsregeln (Rollen: admin, editor)
  fields/                    Wiederverwendbare Felder (Slug, Link)
  i18n/, messages/           Sprachrouting und UI-Texte
  lib/                       Env-Validierung, SEO-Helfer (canonical, hreflang)
  migrations/                Payload-Datenbankmigrationen
  proxy.ts                   Sprachrouting, Staging-Basic-Auth, noindex-Header
supabase/                    Lokale Supabase-Konfiguration
tests/unit, tests/e2e        Tests
```

## Corporate Design

Designsystem unter [`/de/styleguide`](http://localhost:3000/de/styleguide) (intern, nicht indexiert): Audit, Prinzipien, Logo, Farbskalen mit Kontrastwerten, fluide Typografie, Raster, Bewegung sowie alle Komponenten (Buttons, Formulare, Cards, Dialoge, Feedback, Navigation, Textanimationen, WebGL-Hintergrund).

- Tokens: `src/app/(frontend)/globals.css` (nur Markenfarben, Tailwind-Standardpalette deaktiviert)
- Komponenten: `src/components/ui/`, `src/components/effects/`, `src/components/text/`
- Animationen: `motion`; `ogl` nur für „Micro Slats“. Effekte nach [React Bits](https://reactbits.dev) (MIT + Commons Clause), überwiegend neu umgesetzt.

## Datenbank-Schema und Sicherheit

Payload speichert alle Tabellen im Postgres-Schema **`payload`**, nicht in `public`. Supabase stellt über seine REST-/GraphQL-API nur `public` bereit – Payload-Daten (inkl. Benutzer und Passwort-Hashes) sind damit über den Supabase-API-Key nicht erreichbar. Zugriff erfolgt ausschließlich serverseitig über `DATABASE_URL`.

In der Supabase-Cloud das Schema `payload` **nicht** unter „API Settings → Exposed schemas“ eintragen.

## Umgebungen und Indexierung

- `SITE_INDEXABLE=true` nur in Produktion. Sonst: `robots.txt` sperrt alles, jede Antwort trägt `X-Robots-Tag: noindex`.
- `STAGING_BASIC_AUTH_USER` + `STAGING_BASIC_AUTH_PASSWORD` gesetzt → Basic-Auth vor der gesamten Staging-Website.
- Ohne S3-Variablen speichert Payload Uploads im lokalen Dateisystem (nur Entwicklung/CI).

## Noch offen

- Anbindung Vercel (Produktion + Staging) und Supabase-Cloud (Region Frankfurt), Build mit `pnpm migrate && pnpm build`
- Design und Inhaltsblöcke nach Freigabe
- Kontaktformular (Versand per SMTP, keine Speicherung), Matomo-Einbindung
- Sitemap aus veröffentlichten Seiten und aktiven Stellen, dynamische Seiten-Routen
