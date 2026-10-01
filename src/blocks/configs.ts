import type { Block, Field } from 'payload'

import { linkField } from '@/fields/link'

/*
 * Seitenbausteine für die Collection „Seiten“.
 * Struktur (Reihenfolge der Blöcke) gilt für alle Sprachen, Texte sind je Sprache pflegbar.
 * Rendering: src/blocks/RenderBlocks.tsx
 */

const text = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'text', localized: true, ...extra }) as Field

const textarea = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'textarea', localized: true, ...extra }) as Field

const heading = text('title', 'Überschrift')
const intro = textarea('intro', 'Einleitung')

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heros' },
  fields: [
    text('eyebrow', 'Kleine Zeile über dem Titel'),
    text('title', 'Titel', { required: true }),
    text('titleHighlight', 'Hervorgehobener Teil des Titels', {
      admin: { description: 'Exakt so, wie er im Titel steht – wird farbig abgesetzt.' },
    }),
    textarea('lead', 'Einleitung'),
    {
      name: 'variant',
      label: 'Darstellung',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Hell', value: 'light' },
        { label: 'Dunkel', value: 'dark' },
        { label: 'Dunkel mit Lamellen-Hintergrund', value: 'slats' },
        { label: 'Dunkel mit Linienbündel (Startseite)', value: 'lines' },
      ],
    },
    { name: 'image', label: 'Bild (optional)', type: 'upload', relationTo: 'media' },
    {
      name: 'visual',
      label: 'Grafik rechts',
      type: 'select',
      defaultValue: 'none',
      admin: { description: 'Nur bei „Linienbündel“: Grafik „Zweiter Kanal zum Original“.' },
      options: [
        { label: 'Keine', value: 'none' },
        { label: 'Zweiter Kanal (Hersteller → HC → Einrichtung)', value: 'channels' },
      ],
    },
    {
      name: 'visualTags',
      label: 'Stichworte in der Grafik',
      type: 'array',
      maxRows: 3,
      admin: { condition: (_, s) => s?.visual === 'channels' },
      fields: [text('label', 'Stichwort', { required: true })],
    },
    {
      name: 'actions',
      label: 'Buttons',
      type: 'array',
      maxRows: 2,
      fields: [linkField],
    },
    {
      name: 'quickLinks',
      label: 'Schnellzugriff (Leiste am unteren Rand)',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Nur bei dunklen Varianten. Verweise auf wichtige Unterseiten.' },
      fields: [linkField],
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Text', plural: 'Texte' },
  fields: [{ name: 'content', label: 'Inhalt', type: 'richText', localized: true }],
}

export const TextImageBlock: Block = {
  slug: 'textImage',
  labels: { singular: 'Text mit Bild', plural: 'Texte mit Bild' },
  fields: [
    heading,
    { name: 'content', label: 'Text', type: 'richText', localized: true },
    { name: 'image', label: 'Bild', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imagePosition',
      label: 'Bildposition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Rechts', value: 'right' },
        { label: 'Links', value: 'left' },
      ],
    },
  ],
}

export const TeaserGridBlock: Block = {
  slug: 'teaserGrid',
  labels: { singular: 'Teaser-Raster', plural: 'Teaser-Raster' },
  fields: [
    heading,
    intro,
    {
      name: 'items',
      label: 'Verweise',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'page', label: 'Seite', type: 'relationship', relationTo: 'pages', required: true },
        textarea('text', 'Kurzbeschreibung'),
      ],
    },
  ],
}

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  labels: { singular: 'Prozess-Schritte', plural: 'Prozess-Schritte' },
  fields: [
    heading,
    intro,
    {
      name: 'steps',
      label: 'Schritte',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [text('title', 'Titel', { required: true }), textarea('text', 'Beschreibung')],
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    heading,
    {
      name: 'items',
      label: 'Fragen',
      type: 'array',
      minRows: 1,
      fields: [text('question', 'Frage', { required: true }), textarea('answer', 'Antwort')],
    },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Zitat', plural: 'Zitate' },
  fields: [
    textarea('quote', 'Zitat', { required: true }),
    { name: 'author', label: 'Name', type: 'text' },
    text('role', 'Funktion / Firma'),
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Kennzahlen', plural: 'Kennzahlen' },
  fields: [
    heading,
    {
      name: 'items',
      label: 'Kennzahlen',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: { description: 'Nur belegbare Werte verwenden.' },
      fields: [
        { name: 'value', label: 'Wert', type: 'number', required: true },
        {
          name: 'decimals',
          label: 'Nachkommastellen',
          type: 'number',
          defaultValue: 0,
          min: 0,
          max: 2,
        },
        { name: 'suffix', label: 'Einheit (z. B. %)', type: 'text' },
        {
          name: 'plain',
          label: 'Ohne Tausenderpunkt (z. B. Jahreszahl)',
          type: 'checkbox',
          defaultValue: false,
        },
        text('label', 'Beschriftung', { required: true }),
      ],
    },
  ],
}

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  labels: { singular: 'Handlungsaufforderung', plural: 'Handlungsaufforderungen' },
  fields: [
    text('title', 'Überschrift', { required: true }),
    textarea('text', 'Text'),
    linkField,
    {
      name: 'variant',
      label: 'Darstellung',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dunkel', value: 'dark' },
        { label: 'Hell', value: 'light' },
      ],
    },
  ],
}

export const DownloadsBlock: Block = {
  slug: 'downloads',
  labels: { singular: 'Downloads', plural: 'Downloads' },
  fields: [
    heading,
    {
      name: 'documents',
      label: 'Dokumente',
      type: 'upload',
      relationTo: 'documents',
      hasMany: true,
      required: true,
    },
  ],
}

export const PartnerLogosBlock: Block = {
  slug: 'partnerLogos',
  labels: { singular: 'Partnerlogos', plural: 'Partnerlogos' },
  fields: [
    heading,
    {
      name: 'logos',
      label: 'Logos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: { description: 'Der Alternativtext des Bildes wird als Name verwendet.' },
    },
  ],
}

export const JobListBlock: Block = {
  slug: 'jobList',
  labels: { singular: 'Stellenliste (JOIN)', plural: 'Stellenlisten (JOIN)' },
  admin: { group: 'Karriere' },
  fields: [heading, intro, textarea('emptyText', 'Text, wenn keine Stelle offen ist')],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Kontaktformular', plural: 'Kontaktformulare' },
  fields: [
    heading,
    intro,
    {
      name: 'topics',
      label: 'Auswahl „Anliegen“',
      type: 'array',
      minRows: 1,
      fields: [text('label', 'Bezeichnung', { required: true })],
    },
    textarea('privacyText', 'Datenschutz-Einwilligung (Text der Checkbox)', { required: true }),
    textarea('successText', 'Bestätigung nach dem Absenden'),
  ],
}

/** Symbole für Kacheln – feste Auswahl, damit die Gestaltung einheitlich bleibt. */
export const featureIcons = [
  ['original', 'Original / Siegel'],
  ['savings', 'Einsparung'],
  ['stock', 'Bestand / Paket'],
  ['transparency', 'Transparenz / Auge'],
  ['traceability', 'Rückverfolgbarkeit'],
  ['decision', 'Entscheidung / Diagramm'],
  ['calendar', 'Termin / Start'],
  ['temperature', 'Lagerbedingungen'],
  ['inventory', 'Bestandsführung'],
  ['delivery', 'Lieferung'],
  ['certificate', 'Zertifikat'],
  ['check', 'Prüfung'],
  ['recall', 'Rückruf'],
  ['idea', 'Idee'],
  ['route', 'Kurze Wege'],
  ['freedom', 'Freiraum'],
  ['growth', 'Entwicklung'],
  ['clock', 'Arbeitszeit'],
  ['home', 'Homeoffice'],
  ['family', 'Familie'],
  ['equipment', 'Ausstattung'],
] as const

const tone = (options: [string, string][], defaultValue: string): Field => ({
  name: 'tone',
  label: 'Hintergrund',
  type: 'select',
  defaultValue,
  options: options.map(([value, label]) => ({ value, label })),
})

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Kacheln mit Symbol', plural: 'Kacheln mit Symbol' },
  fields: [
    text('eyebrow', 'Kleine Zeile über der Überschrift'),
    heading,
    intro,
    {
      name: 'items',
      label: 'Kacheln',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          label: 'Symbol',
          type: 'select',
          defaultValue: 'check',
          options: featureIcons.map(([value, label]) => ({ value, label })),
        },
        text('title', 'Titel', { required: true }),
        textarea('text', 'Text'),
      ],
    },
    {
      name: 'cta',
      label: 'Aktionskachel (optional)',
      type: 'group',
      admin: { description: 'Dunkle Kachel mit Button, ergänzt das Raster.' },
      fields: [
        { name: 'enabled', label: 'Anzeigen', type: 'checkbox', defaultValue: false },
        text('title', 'Titel'),
        textarea('text', 'Text'),
        {
          ...(linkField as Extract<Field, { type: 'group' }>),
          admin: { condition: (_, s) => Boolean(s?.enabled) },
        } as Field,
      ],
    },
    tone(
      [
        ['plain', 'Ohne Fläche'],
        ['muted', 'Helles Panel'],
        ['teal', 'Teal-Panel'],
      ],
      'plain',
    ),
  ],
}

export const ColumnsBlock: Block = {
  slug: 'columns',
  labels: { singular: 'Aussagen', plural: 'Aussagen' },
  fields: [
    text('eyebrow', 'Kleine Zeile über der Überschrift'),
    heading,
    {
      name: 'layout',
      label: 'Darstellung',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Karten nebeneinander', value: 'cards' },
        { label: 'Bild und Text im Wechsel', value: 'alternating' },
      ],
    },
    {
      name: 'items',
      label: 'Aussagen',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        text('title', 'Titel', { required: true }),
        textarea('text', 'Text', {
          admin: { description: 'Leerzeile trennt Absätze.' },
        }),
        textarea('highlight', 'Hervorgehobener Satz (optional)'),
        {
          name: 'image',
          label: 'Bild (bei „Bild und Text im Wechsel“)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export const StatementBlock: Block = {
  slug: 'statement',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    text('eyebrow', 'Kleine Zeile über der Überschrift'),
    text('title', 'Überschrift', { required: true }),
    textarea('text', 'Text', { admin: { description: 'Leerzeile trennt Absätze.' } }),
    {
      name: 'tags',
      label: 'Stichworte (als Pillen)',
      type: 'array',
      maxRows: 12,
      fields: [text('label', 'Stichwort', { required: true })],
    },
    tone(
      [
        ['plain', 'Ohne Fläche'],
        ['teal', 'Teal-Panel'],
        ['dark', 'Tiefblaues Panel'],
      ],
      'plain',
    ),
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  labels: { singular: 'Team / Personen', plural: 'Team / Personen' },
  fields: [
    text('eyebrow', 'Kleine Zeile über der Überschrift'),
    heading,
    intro,
    {
      name: 'members',
      label: 'Personen',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        text('role', 'Funktion'),
        { name: 'image', label: 'Porträt', type: 'upload', relationTo: 'media' },
        textarea('bio', 'Kurzbiografie', { admin: { description: 'Leerzeile trennt Absätze.' } }),
        textarea('quote', 'Zitat (optional)'),
      ],
    },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  ColumnsBlock,
  FeaturesBlock,
  StatementBlock,
  TeamBlock,
  RichTextBlock,
  TextImageBlock,
  TeaserGridBlock,
  ProcessStepsBlock,
  FaqBlock,
  QuoteBlock,
  StatsBlock,
  CallToActionBlock,
  DownloadsBlock,
  PartnerLogosBlock,
  JobListBlock,
  ContactFormBlock,
]
