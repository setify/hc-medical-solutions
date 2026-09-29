import type { Field } from 'payload'

/** Link auf interne Seite, Dokument (PDF) oder externe URL. Beschriftung je Sprache. */
export const linkField: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'page',
      options: [
        { label: 'Interne Seite', value: 'page' },
        { label: 'Dokument', value: 'document' },
        { label: 'Externe URL', value: 'external' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: { condition: (_, sibling) => sibling?.type === 'page' },
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'documents',
      required: true,
      admin: { condition: (_, sibling) => sibling?.type === 'document' },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { condition: (_, sibling) => sibling?.type === 'external' },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'In neuem Tab öffnen',
      defaultValue: false,
    },
  ],
}
