import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Inhalte',
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  versions: {
    drafts: { autosave: false },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField('title'),
    {
      // Inhaltsblöcke werden nach Designfreigabe ergänzt (Hero, Text/Bild, Teaser, …).
      name: 'layout',
      label: 'Inhalt',
      type: 'blocks',
      localized: true,
      blocks: [
        {
          slug: 'richText',
          labels: { singular: 'Text', plural: 'Texte' },
          fields: [{ name: 'content', type: 'richText', required: true }],
        },
      ],
    },
  ],
}
