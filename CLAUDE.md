# CLAUDE.md – HC Medical Solutions Website

Payload-Referenz: `.claude/skills/payload/SKILL.md` (Details in `.claude/skills/payload/reference/`).
Setup, Scripts und Struktur: `README.md`.

## Projektrahmen (aus dem Kundenbriefing – verbindlich)

- **Freigabe:** Michael Trick (HC) gibt Inhalte, Design, Staging und Launch frei. Texte nie eigenmächtig ändern oder erfinden; Abweichungen nur als Vorschlag.
- **Keine Texterstellung/Übersetzung:** Deutsche Texte sowie EN/FR-Übersetzungen liefert HC. Keine Maschinenübersetzung. Payload-Localization bleibt auf `fallback: false`.
- **Sprachen:** de (Standard), en, fr. URLs immer mit Präfix `/de`, `/en`, `/fr`. Sprachwechsel bleibt auf der gleichen Unterseite. hreflang + canonical über `src/lib/seo.ts`.
- **Keine externen Skripte oder Dienste** ohne Abstimmung (kein Google Fonts, kein CDN, kein externes Captcha, keine Einbettungen). Einzige Ausnahme: HC-eigene Matomo-Instanz, nur Besuchszählung, keine Events.
- **Schriften lokal** aus `public/fonts` über `next/font/local`.
- **Kontaktformular:** Versand nur per E-Mail an die in Settings hinterlegte Adresse. **Keine Speicherung** der Anfragen (kein Payload-Form-Builder). Spam-Schutz ohne Drittanbieter.
- **Barrierefreiheit:** WCAG 2.2 AA als Maßstab (Semantik, Tastatur, sichtbarer Fokus, Kontraste, Alt-Texte, Formular-Labels). Besonders die Karriereseite. axe-Tests müssen grün bleiben.
- **Staging** nie indexierbar (`SITE_INDEXABLE` nur in Produktion `true`) und per Basic-Auth geschützt.
- **Offene Stellen** (`jobs`) müssen ohne Entwickler anleg-, änder- und deaktivierbar sein.

## Konventionen

- Code-Bezeichner Englisch, Doku/Kommentare/Admin-Labels Deutsch.
- Server Components als Standard; `'use client'` nur wenn nötig.
- Nach Änderungen an Collections/Globals: `pnpm generate:types`, dann `pnpm migrate:create <name>`.
- Nach Änderungen an Admin-Komponenten: `pnpm generate:importmap`.
- Dateien in `src/app/(payload)/` sind generiert – nicht bearbeiten.
- Vor Commit: `pnpm lint && pnpm typecheck && pnpm test` (E2E: `pnpm test:e2e`).
