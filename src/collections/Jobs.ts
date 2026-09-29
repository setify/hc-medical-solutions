import type { CollectionConfig } from 'payload'

import { isLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Stelle', plural: 'Offene Stellen' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'active', 'updatedAt'],
    group: 'Inhalte',
    description: 'Stellen anlegen, ändern und über „Aktiv“ ein- oder ausblenden.',
  },
  access: {
    // Öffentlich nur aktive Stellen, im CMS alle.
    read: ({ req: { user } }) => (user ? true : { active: { equals: true } }),
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'active',
      label: 'Aktiv (auf der Website sichtbar)',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'title',
      label: 'Stellentitel',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField('title'),
    {
      name: 'location',
      label: 'Standort',
      type: 'text',
      localized: true,
    },
    {
      name: 'employmentType',
      label: 'Anstellungsart',
      type: 'select',
      options: [
        { label: 'Vollzeit', value: 'full-time' },
        { label: 'Teilzeit', value: 'part-time' },
        { label: 'Vollzeit oder Teilzeit', value: 'full-or-part-time' },
        { label: 'Werkstudium', value: 'working-student' },
        { label: 'Ausbildung', value: 'apprenticeship' },
        { label: 'Praktikum', value: 'internship' },
      ],
    },
    {
      name: 'description',
      label: 'Beschreibung',
      type: 'richText',
      localized: true,
    },
    {
      name: 'attachment',
      label: 'Stellenausschreibung (PDF)',
      type: 'upload',
      relationTo: 'documents',
    },
    {
      name: 'publishedAt',
      label: 'Veröffentlicht am',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
