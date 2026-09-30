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
      ],
    },
    { name: 'image', label: 'Bild (optional)', type: 'upload', relationTo: 'media' },
    {
      name: 'actions',
      label: 'Buttons',
      type: 'array',
      maxRows: 2,
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

export const pageBlocks: Block[] = [
  HeroBlock,
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
