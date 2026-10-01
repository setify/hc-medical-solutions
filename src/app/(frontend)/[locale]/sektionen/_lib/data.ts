/**
 * Platzhalter für die Sektionsbibliothek. Alle Texte, Namen, Zitate und Zahlen sind
 * Beispiele zur Gestaltung – die echten Inhalte liefert HC. Themen angelehnt an die
 * alte Website (Vorgehensweise, Qualitätsversprechen, Lagerlogistik, Karriere).
 * Bilder: neutrale Motive (picsum.photos, frei nutzbar), lokal in Markenblau eingefärbt.
 */

export type Img = { src: string; alt: string }

const img = (n: number, alt: string): Img => ({
  src: `/sektionen/bild-${String(n).padStart(2, '0')}.webp`,
  alt,
})

export const images = {
  desk: img(1, 'Arbeitsplatz mit Laptop und Notizbuch'),
  phone: img(2, 'Person am Laptop mit Smartphone'),
  meeting: img(3, 'Besprechung am Holztisch'),
  laptop: img(4, 'Laptop auf einem Tisch'),
  flatlay: img(5, 'Arbeitsmittel von oben fotografiert'),
  studio: img(6, 'Heller Arbeitsplatz mit Unterlagen'),
  detail: img(7, 'Detailaufnahme eines Smartphones'),
  notes: img(8, 'Laptop und handschriftliche Notizen'),
  glasses: img(9, 'Brille auf einem Laptop'),
  mountains: img(10, 'Verschneite Berge'),
  road: img(11, 'Straße durch ein weites Tal'),
  fog: img(12, 'Nebel über einem Wald'),
  office: img(13, 'Schreibtisch am Fenster'),
  papers: img(14, 'Druckmuster und Unterlagen auf dem Tisch'),
  network: img(15, 'Weltkugel mit Netzwerklinien'),
} satisfies Record<string, Img>

export const gallery: (Img & { title: string })[] = [
  { ...images.meeting, title: 'Beratung' },
  { ...images.flatlay, title: 'Dokumentation' },
  { ...images.road, title: 'Versand' },
  { ...images.notes, title: 'Planung' },
  { ...images.fog, title: 'Region' },
  { ...images.glasses, title: 'Prüfung' },
  { ...images.office, title: 'Büro' },
  { ...images.mountains, title: 'Europa' },
  { ...images.papers, title: 'Unterlagen' },
]

export const people = [
  { name: 'Vorname Nachname', role: 'Geschäftsführung', src: '/sektionen/person-01.webp' },
  { name: 'Vorname Nachname', role: 'Einkauf', src: '/sektionen/person-02.webp' },
  { name: 'Vorname Nachname', role: 'Qualitätsmanagement', src: '/sektionen/person-03.webp' },
  { name: 'Vorname Nachname', role: 'Lagerlogistik', src: '/sektionen/person-04.webp' },
  { name: 'Vorname Nachname', role: 'Vertrieb', src: '/sektionen/person-05.webp' },
  { name: 'Vorname Nachname', role: 'Kundenservice', src: '/sektionen/person-06.webp' },
].map((p, i) => ({ ...p, name: `${p.name} ${i + 1}` }))

/** Platzhalter-Zitate: bewusst allgemein, bis HC echte Stimmen mit Freigabe liefert. */
export const quotes = [
  {
    text: 'Hier steht ein kurzes Zitat einer Kundin oder eines Kunden. Zwei bis drei Sätze wirken am besten.',
    name: 'Name der Person',
    org: 'Einrichtung, Ort',
  },
  {
    text: 'Platz für eine Stimme aus einer Klinik oder Praxis, zum Beispiel zur Zuverlässigkeit der Lieferungen.',
    name: 'Name der Person',
    org: 'Klinik, Ort',
  },
  {
    text: 'Ein Zitat zur Zusammenarbeit mit dem Qualitätsmanagement. Konkrete Erfahrungen überzeugen mehr als Lob.',
    name: 'Name der Person',
    org: 'Einkaufsgemeinschaft, Ort',
  },
  {
    text: 'Eine kurze Aussage aus dem Handel oder einer Apotheke. Ideal mit Funktion und Einrichtung.',
    name: 'Name der Person',
    org: 'Apotheke, Ort',
  },
  {
    text: 'Stimme einer Partnerfirma über Abläufe, Dokumentation oder die Rückverfolgbarkeit von Chargen.',
    name: 'Name der Person',
    org: 'Hersteller, Land',
  },
  {
    text: 'Noch ein Beispielzitat, damit Karussells und Spalten genug Inhalt zum Laufen haben.',
    name: 'Name der Person',
    org: 'Praxis, Ort',
  },
].map((q, i) => ({ ...q, name: `${q.name} ${i + 1}`, portrait: people[i % people.length]!.src }))

/** Themen der alten Website als Platzhalter für Leistungen. */
export const services = [
  {
    title: 'Vorgehensweise',
    text: 'Kurzbeschreibung der Leistung in ein bis zwei Sätzen. Der Text kommt von HC.',
    image: images.meeting,
  },
  {
    title: 'Qualitätsversprechen',
    text: 'Kurzbeschreibung, zum Beispiel zu Chargendokumentation und Rückverfolgbarkeit.',
    image: images.papers,
  },
  {
    title: 'Lagerlogistik',
    text: 'Kurzbeschreibung, zum Beispiel zu Lagerung, Verfügbarkeit und Versand.',
    image: images.road,
  },
  {
    title: 'Karriere',
    text: 'Kurzbeschreibung mit Verweis auf offene Stellen, die aus JOIN geladen werden.',
    image: images.office,
  },
]

/** Merkmale aus dem Qualitätsversprechen der alten Seite (nur Stichworte). */
export const features = [
  { title: 'Digitale Bestandsführung', text: 'Ein bis zwei Sätze zur Erklärung.' },
  { title: 'Chargendokumentation', text: 'Ein bis zwei Sätze zur Erklärung.' },
  { title: 'Produktverfügbarkeit', text: 'Ein bis zwei Sätze zur Erklärung.' },
  { title: 'Bestellung bis Rechnung', text: 'Ein bis zwei Sätze zur Erklärung.' },
  { title: 'Vorkommnismeldungen', text: 'Ein bis zwei Sätze zur Erklärung.' },
  { title: 'Rücksendungen', text: 'Ein bis zwei Sätze zur Erklärung.' },
]

export const steps = [
  { title: 'Anfrage', text: 'Was im ersten Schritt passiert, in ein bis zwei Sätzen.' },
  { title: 'Prüfung', text: 'Was im zweiten Schritt passiert, in ein bis zwei Sätzen.' },
  { title: 'Freigabe', text: 'Was im dritten Schritt passiert, in ein bis zwei Sätzen.' },
  { title: 'Lieferung', text: 'Was im vierten Schritt passiert, in ein bis zwei Sätzen.' },
  { title: 'Nachbetreuung', text: 'Was im fünften Schritt passiert, in ein bis zwei Sätzen.' },
]

export const faqs = [
  {
    q: 'Beispielfrage zur Bestellung?',
    a: 'Platz für eine kurze, klare Antwort. HC liefert Fragen und Antworten.',
  },
  {
    q: 'Beispielfrage zur Lieferung?',
    a: 'Platz für eine kurze, klare Antwort. HC liefert Fragen und Antworten.',
  },
  {
    q: 'Beispielfrage zur Dokumentation?',
    a: 'Platz für eine kurze, klare Antwort. HC liefert Fragen und Antworten.',
  },
  {
    q: 'Beispielfrage zu Rücksendungen?',
    a: 'Platz für eine kurze, klare Antwort. HC liefert Fragen und Antworten.',
  },
]

export const lorem = {
  short: 'Hier steht ein einleitender Satz, der das Thema der Sektion in einfachen Worten erklärt.',
  medium:
    'Platzhaltertext für einen Absatz. Die echten Inhalte liefert HC Medical Solutions. Ein Absatz sollte zwei bis vier Sätze lang sein, damit die Zeilenlänge angenehm bleibt und Leserinnen und Leser den Faden nicht verlieren.',
  long: 'Platzhaltertext für einen längeren Abschnitt. Er zeigt, wie Fließtext auf der Seite wirkt, wie Zeilenlänge, Zeilenabstand und Absatzabstand zusammenspielen. Die Inhalte kommen später aus dem CMS und werden von HC in allen drei Sprachen gepflegt. Bis dahin hilft dieser Text, Proportionen zu beurteilen.',
}
