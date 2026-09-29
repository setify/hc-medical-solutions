import { notFound } from 'next/navigation'

/** Fängt unbekannte Pfade innerhalb einer Sprache ab und zeigt die lokalisierte 404-Seite. */
export default function CatchAll() {
  notFound()
}
