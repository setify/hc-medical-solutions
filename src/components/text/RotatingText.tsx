'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

/**
 * Wechselnde Wörter, Buchstabe für Buchstabe von unten eingeblendet (nach reactbits „Rotating Text“).
 * Screenreader erhalten alle Begriffe als statische Liste.
 */
export function RotatingText({
  words,
  interval = 2600,
  className,
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || words.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [interval, reduce, words.length])

  const word = words[index] ?? ''

  return (
    <span className={cn('relative inline-flex', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="relative inline-flex overflow-hidden pb-[0.12em]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={word} layout className="inline-flex whitespace-pre">
            {word.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 26, delay: i * 0.025 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
