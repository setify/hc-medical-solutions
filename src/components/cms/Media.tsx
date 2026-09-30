import Image from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/lib/cn'

/** Bild aus der Mediathek mit Pflicht-Alternativtext und responsiven Größen. */
export function Media({
  media,
  className,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority,
  fill,
}: {
  media: number | MediaDoc | null | undefined
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}) {
  if (!media || typeof media !== 'object' || !media.url) return null
  const alt = media.alt ?? ''
  const common = { src: media.url, sizes, priority, className: cn('object-cover', className) }
  if (fill) return <Image {...common} alt={alt} fill />
  return <Image {...common} alt={alt} width={media.width ?? 1600} height={media.height ?? 1000} />
}
