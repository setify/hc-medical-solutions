# Technische Datenschutz-Übersicht – neue HC-Website

Stand: Entwicklung (lokal). Grundlage für Datenschutzerklärung und Consent-Entscheidung durch HC.
Die rechtliche Bewertung liegt bei HC (Briefing, Abschnitt 5).

## Cookies

| Cookie               | Zweck            | Wer          | Wann                                 |
| -------------------- | ---------------- | ------------ | ------------------------------------ |
| `payload-token`      | Anmeldung im CMS | HC-Redaktion | nur unter `/admin`, nach Login       |
| `__prerender_bypass` | Entwurfsvorschau | HC-Redaktion | nur nach Klick auf „Vorschau“ im CMS |

**Website-Besucher erhalten keine Cookies.** Es gibt keinen Consent-Banner, weil keine einwilligungspflichtige Technik eingesetzt wird (Bewertung durch HC).

## Datenübertragungen beim Besuch

| Dienst         | Was                           | Ziel                                                       | Hinweis                                                                                                                                                                                    |
| -------------- | ----------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hosting        | Seitenaufruf (IP, User-Agent) | Hosting-Anbieter (geplant: Vercel, Region EU)              | technisch notwendig                                                                                                                                                                        |
| Schriften      | Lexend Deca                   | eigener Server                                             | keine Verbindung zu Google                                                                                                                                                                 |
| Matomo         | Seitenaufrufe                 | `a.hc-medical-solutions.eu` (HC-eigene Instanz, Site-ID 3) | ohne Cookies (`disableCookies`), nur Besuchszählung, kein Link-Tracking, kein Heartbeat, keine Events; „Do Not Track“ wird respektiert; nur in Produktion aktiv                            |
| JOIN (Stellen) | –                             | –                                                          | Stellen werden **serverseitig** von join.com geladen; der Browser des Besuchers verbindet sich nicht mit JOIN. Erst der Klick auf eine Stelle öffnet join.com (neuer Tab, gekennzeichnet). |

Keine weiteren Drittanbieter: kein Google Fonts, kein CDN, kein Captcha, keine Karten, Videos, Social-Media-Einbindungen.

## Kontaktformular

- Pflichtfelder: Vorname, Nachname, E-Mail, Anliegen, Nachricht, Einwilligung; optional: Telefon.
- Versand ausschließlich per E-Mail (SMTP) an die in den CMS-Einstellungen hinterlegte Adresse.
- **Keine Speicherung** der Anfrage in Datenbank oder Protokollen.
- Spamschutz ohne Drittanbieter: unsichtbares Honeypot-Feld, signierte Zeitsperre, Begrenzung auf 5 Anfragen je 10 Minuten und IP. Die IP wird dafür nur gehasht und nur im Arbeitsspeicher des Servers gehalten.
- Der Text der Einwilligungs-Checkbox wird im CMS je Sprache gepflegt (Vorgabe HC).

## Offene Punkte für HC

1. Bestätigung, dass Matomo ohne Cookies und ohne Einwilligung betrieben werden soll.
2. Hosting-Anbieter und Auftragsverarbeitungsverträge (Vercel, Supabase) in die Datenschutzerklärung aufnehmen.
3. Hinweis zur Stellenanzeige über JOIN (Weiterleitung zu join.com) in die Datenschutzerklärung aufnehmen.
