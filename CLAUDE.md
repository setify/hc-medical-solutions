# CLAUDE.md – HC Medical Solutions Website

Payload-Referenz: `.claude/skills/payload/SKILL.md` (Details in `.claude/skills/payload/reference/`).
Setup, Scripts und Struktur: `README.md`.

## Projektrahmen (aus dem Kundenbriefing – verbindlich)

- **Freigabe:** Michael Trick (HC) gibt Inhalte, Design, Staging und Launch frei. Texte nie eigenmächtig ändern oder erfinden; Abweichungen nur als Vorschlag.
- **Keine Texterstellung/Übersetzung:** Deutsche Texte sowie EN/FR-Übersetzungen liefert HC. Keine Maschinenübersetzung. Payload-Localization bleibt auf `fallback: false`.
- **Sprachen:** de (Standard), en, fr. URLs immer mit Präfix `/de`, `/en`, `/fr`. Sprachwechsel bleibt auf der gleichen Unterseite. hreflang + canonical über `src/lib/seo.ts`.
- **Keine externen Skripte oder Dienste** ohne Abstimmung (kein Google Fonts, kein CDN, kein externes Captcha, keine Einbettungen). Einzige Ausnahme: HC-eigene Matomo-Instanz, nur Besuchszählung, keine Events.
- **Schriften lokal:** Hausschrift Lexend Deca liegt in `src/fonts/` und wird über `next/font/local` eingebunden (`src/fonts/index.ts`).
- **Corporate Design:** Farben, Logo und Schrift nach Logoblatt; Tokens in `src/app/(frontend)/globals.css`, Übersicht unter `/de/styleguide`. Logo nur über `<Logo />` (`src/components/brand/`) bzw. `public/brand/*.svg`, nie nachbauen.
- **Komponenten:** UI-Bausteine in `src/components/ui/`, Animationen in `src/components/effects/` und `src/components/text/`. Neue Seiten aus diesen Bausteinen bauen, nicht neu erfinden. Nur semantische Farb-Tokens (`ink`, `muted`, `primary`, `accent` …); Tailwind-Standardfarben sind abgeschaltet.
- **Farbrollen:** Primär- und Akzentfarbe ist die Hausfarbe Blau `#007F9D` (`primary`, `accent`). Dunkle Flächen in tiefem Blau (`surface-inverse` = `blue-950`, Abstufung `blue-900`), Text darauf `white`/`blue-100`/`blue-200`. Petrol nur noch als sparsame Ergänzung – nie als Button-, Akzent- oder Flächenfarbe.
- **Gestaltung ohne AI-Muster:** Radien vom Bildzeichen (≈ 10 %): Buttons/Felder `rounded-sm` (4 px), Flächen max. `rounded-lg` (8 px). Keine Pillen (`rounded-full` nur Radio, Schalter, Statuspunkte), keine Glassmorphism-Kacheln, keine Icons in Kreisen, kein Anheben von Cards beim Hover, keine Glows/Blobs, keine Versalien-Overlines, keine erfundenen Kennzahlen/Partner/Buzzwords, keine Gedankenstrich-Prosa. Details: Audit auf `/de/styleguide`.
- **Bewegung:** Einzige Animationsbibliothek ist `motion` (plus `ogl` nur für den WebGL-Hintergrund). Kein GSAP/Lenis. Jede Animation respektiert `prefers-reduced-motion`; Inhalte dürfen nie von JavaScript-Einblendungen abhängen (kein `initial={{ opacity: 0 }}` für Inhalt).
- **Kontaktformular:** Versand nur per E-Mail an die in Settings hinterlegte Adresse. **Keine Speicherung** der Anfragen (kein Payload-Form-Builder). Spam-Schutz ohne Drittanbieter.
- **Barrierefreiheit:** WCAG 2.2 AA als Maßstab (Semantik, Tastatur, sichtbarer Fokus, Kontraste, Alt-Texte, Formular-Labels). Besonders die Karriereseite. axe-Tests müssen grün bleiben.
- **Staging** nie indexierbar (`SITE_INDEXABLE` nur in Produktion `true`) und per Basic-Auth geschützt.
- **Datenbank:** Payload-Tabellen liegen im Schema `payload` (nicht `public`), damit die Supabase-API sie nie ausliefert. Dieses Schema nie in der Supabase-API freigeben; keine Payload-Daten nach `public` verschieben.
- **Offene Stellen** (`jobs`) müssen ohne Entwickler anleg-, änder- und deaktivierbar sein.

## Architektur (Kurzfassung)

- Seiten: `src/app/(frontend)/[locale]/[[...slug]]/page.tsx` + Datenschicht `src/lib/cms.ts` (Local API, `unstable_cache` mit Tags). Header/Footer über `SiteShell` je Seite, weil der Sprachumschalter die lokalisierten Pfade der Seite braucht.
- Revalidierung: Hooks in `src/hooks/revalidate.ts`. Next 16: `revalidateTag(tag, { expire: 0 })` – das Profil `'max'` liefert erst noch den alten Stand (stale-while-revalidate).
- Skripte außerhalb von Next (Seed, Import) leeren den Cache über `POST /next/revalidate` (`scripts/revalidate.ts`).
- Seed: bei Übersetzungen IDs verschachtelter Listen übernehmen (`withIds`), sonst ersetzt Payload die Einträge der anderen Sprachen.
- Dev-Server: `pnpm dev` (Port 3100). E2E zuverlässig gegen Produktions-Build: `pnpm build && CI=1 pnpm test:e2e`.

## Konventionen

- Code-Bezeichner Englisch, Doku/Kommentare/Admin-Labels Deutsch.
- Server Components als Standard; `'use client'` nur wenn nötig.
- Nach Änderungen an Collections/Globals: `pnpm generate:types`, dann `pnpm migrate:create <name>`.
- Nach Änderungen an Admin-Komponenten: `pnpm generate:importmap`.
- Dateien in `src/app/(payload)/` sind generiert – nicht bearbeiten.
- Vor Commit: `pnpm lint && pnpm typecheck && pnpm test` (E2E: `pnpm test:e2e`).
- **Versionierung & Changelog:** Jede ausgelieferte Änderung erhöht die Version in `package.json` (SemVer, bis Launch 0.x: Feature = Minor, Fix = Patch) und bekommt einen Eintrag in `CHANGELOG.md` (Keep a Changelog, Deutsch, verständlich für HC). Denselben Eintrag parallel in Notion spiegeln: Seite „Changelog“ (ID `3eae35581acf80f08853f033d1956534`), neueste Version oben.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
