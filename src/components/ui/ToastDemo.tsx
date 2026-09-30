'use client'

import { CheckCircle } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'

/** Bestätigungsmeldung nach dem Absenden (z. B. Kontaktformular). Wird per aria-live angesagt. */
export function ToastDemo() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!show) return
    const id = window.setTimeout(() => setShow(false), 4200)
    return () => window.clearTimeout(id)
  }, [show])

  return (
    <div className="relative flex min-h-40 flex-col items-start gap-6">
      <Button variant="secondary" onClick={() => setShow(true)}>
        Bestätigung anzeigen
      </Button>
      <div aria-live="polite" className="w-full max-w-md">
        <AnimatePresence>
          {show ? (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="flex items-start gap-3 rounded-md border-l-2 border-blue-200 bg-blue-950 p-4 pr-6 text-white shadow-md"
            >
              <CheckCircle
                aria-hidden="true"
                weight="fill"
                className="mt-0.5 size-5 shrink-0 text-blue-200"
              />
              <div>
                <p className="text-small font-normal">Vielen Dank für Ihre Anfrage.</p>
                <p className="text-caption text-blue-100">
                  Wir melden uns innerhalb von zwei Werktagen.
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
