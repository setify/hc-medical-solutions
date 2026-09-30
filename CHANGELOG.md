# Changelog

Alle nennenswerten Änderungen an der HC-Website. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Bis zum Launch gilt 0.x; der Launch wird 1.0.0.

Gespiegelt in Notion: Setify / HC Medical Solutions / Changelog.

## [0.4.0] – 2026-09-30

### Geändert

- Blau (`#007F9D`) ist jetzt Primär- und Akzentfarbe: Buttons, Auswahlfelder, Hover-Zustände, Lamellen-Hintergrund.
- Dunkle Flächen (Hero, Footer, Aufrufe, Dialog-Hintergrund) in tiefem Blau `#061F33` statt Petrol; Blau-Skala um 900/950 ergänzt.

## [0.3.0] – 2026-09-30

### Hinzugefügt

- Seiten kommen aus dem CMS: 13 Seitenbausteine, Seitenhierarchie mit Pfaden je Sprache, Entwurfsvorschau, Startseite in den Einstellungen wählbar.
- Header mit Untermenü und Mobilmenü, Footer mit Firmendaten, Sprachumschalter auf die übersetzte Seite.
- Kontaktformular: Versand per E-Mail ohne Speicherung, Spamschutz ohne Drittanbieter, Fehlermeldungen in drei Sprachen.
- Karriere: offene Stellen aus JOIN, serverseitig geladen und im HC-Design dargestellt – ohne Skript von join.com.
- SEO: Metadaten aus dem CMS, hreflang/canonical, Sitemap aus veröffentlichten Seiten, JSON-LD, eigene Fehlerseiten.
- Weiterleitungen alter URLs mit genau einer 301; Erfassung der alten Website (117 URLs) mit Vorschlägen zur Freigabe.
- Matomo (HC-Instanz) ohne Cookies, nur Besuchszählung, nur in Produktion.
- Technische Datenschutz-Übersicht für HC.

### Geändert

- Design-Audit „AI-Muster“: Radien aus dem HC-Bildzeichen abgeleitet (≈ 10 %, Buttons 4 px, Flächen max. 8 px), keine Pillenformen mehr.
- Cards liegen flach (kein Anheben, keine großen Schatten), Icons ohne Kreis, Tabs und Sprachwahl mit Linie statt Füllung.
- Styleguide-Hero ohne Glaseffekt und Zweizeiler, sachliche Metadaten.
- Effekte beruhigt: einfarbiger Leuchtrand, Grafiken ohne Glow, Verlauf nur auf einzelnen Wörtern, kein pulsierender Statuspunkt.
- Beispielinhalte ohne erfundene Kennzahlen, Partnernamen und Schlagwort-Reihen.
- Erst-Migration neu erzeugt (noch keine Produktionsdatenbank); lokale Datenbanken einmal mit `supabase db reset` neu aufsetzen.
- Entwicklungsserver fest auf Port 3100.

### Behoben

- Hydration-Warnung durch Passwortmanager (z. B. Dashlane) an Formularfeldern.

### Entfernt

- CMS-Collection „Offene Stellen“ (JOIN ist die einzige Quelle).

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

[0.4.0]: https://github.com/setify/hc-medical-solutions/compare/fde23fa...main
[0.3.0]: https://github.com/setify/hc-medical-solutions/commit/fde23fa
[0.2.1]: https://github.com/setify/hc-medical-solutions/commit/cb11b04
[0.2.0]: https://github.com/setify/hc-medical-solutions/commit/3c91a28
[0.1.1]: https://github.com/setify/hc-medical-solutions/commit/95f496f
[0.1.0]: https://github.com/setify/hc-medical-solutions/commit/cdcb5ee
