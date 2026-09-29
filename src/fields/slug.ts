import type { Field } from 'payload'

/** URL-tauglicher Slug aus beliebigem Text (inkl. Umlaute, Akzente). */
export function slugify(value: string): string {
  return value
    .replace(/ß/g, 'ss')
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Lokalisiertes Slug-Feld. Wird aus `sourceField` erzeugt, wenn leer,
 * und ist pro Sprache einzeln pflegbar (sprechende URLs je Sprache).
 */
export function slugField(sourceField = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    localized: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Teil der URL. Wird automatisch aus dem Titel erzeugt, wenn leer.',
    },
    hooks: {
      beforeValidate: [
        ({ value, siblingData }) => {
          if (typeof value === 'string' && value.trim()) return slugify(value)
          const source = siblingData?.[sourceField]
          return typeof source === 'string' ? slugify(source) : value
        },
      ],
    },
  }
}
