import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Dokument', plural: 'Dokumente' },
  admin: { useAsTitle: 'title', group: 'Medien' },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: {
    mimeTypes: ['application/pdf'],
  },
}
