# Changelog

Alle nennenswerten Änderungen an der HC-Website. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Bis zum Launch gilt 0.x; der Launch wird 1.0.0.

Gespiegelt in Notion: Setify / HC Medical Solutions / Changelog.

## [0.2.1] – 2026-09-29

### Behoben

- Hydration-Warnung durch Browser-Erweiterungen (z. B. LanguageTool, Grammarly), die Attribute auf `<html>`/`<body>` setzen.

## [0.2.0] – 2026-09-29

### Hinzugefügt

- Designsystem nach HC-Logoblatt (Honegger&Bregenzer, 09/2023): Logo als Vektor-Komponente, Hausschrift Lexend Deca lokal, Farbskalen mit geprüften Kontrasten, fluide Typografie, Radien, Schatten, Bewegungsregeln.
- Komponenten: Buttons (inkl. animierter Varianten), Formularfelder, Cards, Dialog, Toast, Hinweise, Skeleton, leerer Zustand, Tabs, FAQ-Akkordeon, Prozess-Schritte, Brotkrumen.
- Textanimationen und Effekte nach React Bits (Shiny, Gradient, Rotating, Count Up, Scroll Reveal, Curved Loop, Logo Loop, Micro Slats).
- Interner Styleguide unter `/de/styleguide` (nicht indexiert) mit Audit und offenen Punkten für HC.
- Logo im Header der Website.

### Geändert

- Tailwind-Standardfarben deaktiviert – nur Markenfarben verfügbar.
- Dev-Server akzeptiert größere Anfrage-Header (behebt HTTP 431 bei vielen localhost-Cookies).

## [0.1.1] – 2026-09-29

### Sicherheit

- Payload-Tabellen aus dem Schema `public` in das Schema `payload` verschoben. Zuvor waren sie über die Supabase-REST-API mit dem öffentlichen Schlüssel lesbar (inkl. Benutzer und Passwort-Hashes; betroffen nur die lokale Entwicklungsdatenbank, ohne Daten).

### Behoben

- Fehlende Indizes auf Fremdschlüsseln der Sprachtabellen ergänzt.

## [0.1.0] – 2026-09-29

### Hinzugefügt

- Technisches Grundgerüst: Next.js 16, Payload CMS 3, TypeScript, lokale Supabase (Datenbank und Speicher).
- Dreisprachigkeit Deutsch, Englisch, Französisch mit Adressen `/de`, `/en`, `/fr` – ohne automatische Ersatzsprache.
- CMS-Datenmodell: Seiten, offene Stellen, Bilder, Dokumente, Benutzer mit Rollen, Navigation, Footer, Einstellungen, SEO-Felder, Weiterleitungen.
- Statische Platzhalter-Startseite, SEO-Grundlagen (robots.txt, Sitemap, hreflang, canonical), Staging-Schutz.
- Qualitätssicherung: Lint, Typecheck, Unit-Tests, Browser- und Barrierefreiheitstests, GitHub-CI.

[0.2.1]: https://github.com/setify/hc-medical-solutions/compare/3c91a28...main
[0.2.0]: https://github.com/setify/hc-medical-solutions/commit/3c91a28
[0.1.1]: https://github.com/setify/hc-medical-solutions/commit/95f496f
[0.1.0]: https://github.com/setify/hc-medical-solutions/commit/cdcb5ee
