# Changelog

Alle nennenswerten Änderungen an der HC-Website. Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Bis zum Launch gilt 0.x; der Launch wird 1.0.0.

Gespiegelt in Notion: Setify / HC Medical Solutions / Changelog.

## [0.6.0] – 2026-10-01

### Hinzugefügt

- Interne Seite `/de/schriften` (nicht indexiert): drei Schriftkombinationen im Vergleich – A Lexend Deca (aktuell), B Plus Jakarta Sans mit Source Sans 3, C Space Grotesk mit IBM Plex Sans – gesetzt mit den finalen Startseitentexten, umschaltbar per Reiter plus Direktvergleich. Alle Schriften lokal eingebunden (SIL Open Font License).

## [0.5.0] – 2026-10-01

### Hinzugefügt

- Seitenstruktur nach der finalen Übergabe von HC (30.09.2026): Startseite, Vorgehensweise, Lagerlogistik, Qualität & Regulatory, Karriere, Kontakt sowie Impressum und Datenschutz. Navigation mit „Einkaufspotenzial prüfen“, Footer mit Leistungen, Unternehmen und Rechtlichem.
- Startseite vollständig mit den finalen Texten: Hero mit Grafik „Der zweite Kanal zum Original“ und Schnellzugriff, zwei Kernaussagen, „Warum HC?“ mit fünf Kacheln und Aktionskachel, „Mehr als ein guter Preis“, „Unsere Expertise“ mit Fachbereichen und Kennzahlen, Michael und Bernhard Trick mit Porträt und Zitat, Abschluss mit Handlungsaufforderung.
- Kernaussagen auf der Startseite als Bild und Text im Wechsel (wie Vorlage VL6); Bilder sind Platzhalter, bis HC eigene Fotos liefert.
- Unterseiten zunächst mit Seitenkopf (Titel und Einleitung aus dem Dokument); Karriere mit Stellenliste, Kontakt mit Formular.
- Neue CMS-Bausteine für alle Seiten: Kacheln mit Symbol (optional mit Aktionskachel), Aussagen nebeneinander, Statement mit Stichworten, Team mit Porträt und Zitat; Hero mit Linienbündel, Grafik und Schnellzugriff; Kennzahlen mit Jahreszahl.
- Interne Sektionsbibliothek unter `/de/sektionen` (nicht indexiert) zur Auswahl mit HC: 122 Varianten in 18 Kapiteln, jede mit Kennung (z. B. H3, U7, D12). Enthält Hero, Überschriftentypen, Text, Bild und Text, Galerien, Karussells, Leistungen, Ablauf, Kennzahlen, Kundenstimmen, Team, Nachweise, FAQ, Handlungsaufrufe, Navigation, Hintergründe sowie Trenner und Übergänge.
- Alle Inhalte sind Platzhalter; Bilder sind neutrale Motive, lokal in Markenblau eingefärbt (keine externen Einbindungen).
- Neues Kapitel „Nach Kundenvorlage“ (VL1–VL9): Panel-Hero mit schwebenden Karten, Fortschrittsbalken, Auswahlkarten, Leistungsraster mit Aktionskarte, Teal-Panel, Karten- und Fächer-Karussell, Footer-Panel mit Newsletter.

### Geändert

- Gestaltung nach Kundenvorlage: Buttons, Eingabefelder, Kennzeichnungen, Tabs und Navigation vollständig abgerundet; Cards 20 px, große Flächen 28 px Radius.
- Farbige Abschnitte erscheinen als eingerückte, gerundete Panels auf hellem Graublau (`#F1F7FA`); Header schwebt als runde Leiste mit Pillen-Navigation, Footer als dunkles Panel.
- Teal (`#22C7BD`) als Zweitfarbe neben Blau, vor allem für Buttons auf dunklen Flächen; dunkle Panels in Tiefblau oder Teal.
- Runde Pfeil-Buttons in Leistungs- und Stellenkarten; Stellen als einzelne gerundete Karten.
- Styleguide aktualisiert (Farben mit Teal und Graublau, Radien, Buttons, Audit-Regeln).
- Unterseiten ohne Hero erhalten einen hellen Seitenkopf als Panel; das Kontaktformular liegt in einer weißen Card.
- Schatten tiefblau statt petrol getönt; Kontrastbeispiele im Styleguide auf die aktuellen Farben umgestellt.

### Behoben

- Linienbündel-Hintergrund (H2, C1, HG14) ruckelte (gemessen ~12 Bilder/s): Linien jetzt statisch, nur die Ebene driftet per GPU – flüssige 120 Bilder/s. Alle übrigen Varianten gemessen, ohne Auffälligkeiten.
- Tastaturfokus machte runde Buttons und Felder eckig (globale Fokus-Regel setzte einen festen Radius).
- Scroll-Expansion-Hero (H3) schloss sich beim Weiterscrollen wieder; Einleitung liegt jetzt unter dem Bild statt darauf.
- Fächer-Karussell (VL8) zeigte nur eine Karte; Trenner-Vorschauen und Laufband-Überschrift passen jetzt zum Panel-Raster.

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
