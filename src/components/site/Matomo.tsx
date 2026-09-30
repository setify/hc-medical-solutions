'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Paq = unknown[][]
declare global {
  interface Window {
    _paq?: Paq
  }
}

/**
 * Matomo (HC-eigene Instanz) – nur Besuchszählung, ohne Cookies.
 * Kein Link-Tracking, kein Heartbeat, keine Events (Briefing). Seitenaufrufe auch bei Client-Navigation.
 */
export function Matomo({
  url,
  siteId,
  respectDnt,
}: {
  url: string
  siteId: string
  respectDnt: boolean
}) {
  const pathname = usePathname()
  const first = useRef(true)

  useEffect(() => {
    if (respectDnt && navigator.doNotTrack === '1') return
    const base = url.endsWith('/') ? url : `${url}/`
    const paq = (window._paq = window._paq || [])

    if (first.current) {
      first.current = false
      paq.push(['disableCookies'])
      paq.push(['setTrackerUrl', `${base}matomo.php`])
      paq.push(['setSiteId', siteId])
      paq.push(['trackPageView'])
      const script = document.createElement('script')
      script.async = true
      script.src = `${base}matomo.js`
      document.head.appendChild(script)
      return
    }
    paq.push(['setCustomUrl', window.location.href])
    paq.push(['setDocumentTitle', document.title])
    paq.push(['trackPageView'])
  }, [pathname, url, siteId, respectDnt])

  return null
}
