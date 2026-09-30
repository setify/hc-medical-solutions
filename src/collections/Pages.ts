import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '@/access'
import { pageBlocks } from '@/blocks/configs'
import { slugField } from '@/fields/slug'
import { revalidatePage, revalidatePageDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    group: 'Inhalte',
    preview: (doc, { locale }) => previewUrl(locale, (doc as { path?: string }).path),
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
  hooks: {
    // Läuft nach dem Nested-Docs-Hook: letzte Breadcrumb-URL = vollständiger Pfad dieser Sprache.
    beforeChange: [
      ({ data }) => {
        const crumbs = (data?.breadcrumbs ?? []) as { url?: string }[]
        const last = crumbs[crumbs.length - 1]
        if (last?.url) data.path = last.url
        return data
      },
    ],
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
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
      name: 'path',
      label: 'Pfad',
      type: 'text',
      localized: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Wird aus übergeordneter Seite und Slug erzeugt.',
      },
    },
    {
      name: 'noindex',
      label: 'Nicht in Suchmaschinen anzeigen',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'layout',
      label: 'Inhalt',
      type: 'blocks',
      blocks: pageBlocks,
    },
  ],
}
