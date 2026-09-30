import { revalidatePath, revalidateTag } from 'next/cache'

// Sofort ablaufen lassen. Das Profil 'max' würde einmal noch den alten Stand ausliefern (stale-while-revalidate).
const NOW = { expire: 0 }
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/*
 * Cache-Invalidierung nach Änderungen im CMS.
 * Next 16: revalidateTag braucht ein Profil als zweiten Parameter; { expire: 0 } = sofort neu laden.
 * Außerhalb von Next (Seed, Skripte) werfen die Funktionen – dann still ignorieren.
 */
function safe(fn: () => void) {
  try {
    fn()
  } catch {
    // kein Next-Kontext (z. B. Seed-Skript)
  }
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  safe(() => {
    revalidateTag('pages', NOW)
    revalidateTag(`page:${doc.id}`, NOW)
    revalidatePath('/', 'layout')
  })
  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => {
    revalidateTag('pages', NOW)
    revalidatePath('/', 'layout')
  })
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  safe(() => {
    revalidateTag('globals', NOW)
    revalidatePath('/', 'layout')
  })
  return doc
}

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidateTag('redirects', NOW))
  return doc
}

export const revalidateRedirectsDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidateTag('redirects', NOW))
  return doc
}
