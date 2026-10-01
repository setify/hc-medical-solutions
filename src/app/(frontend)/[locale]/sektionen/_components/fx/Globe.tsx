'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/cn'

/** Beispielorte in Europa (nur zur Gestaltung, keine Standorte von HC). */
const MARKERS: [number, number][] = [
  [52.5, 13.4],
  [48.1, 11.6],
  [48.2, 16.4],
  [47.4, 8.5],
  [48.9, 2.35],
  [52.4, 4.9],
  [50.8, 4.35],
  [45.5, 9.2],
  [40.4, -3.7],
  [52.2, 21.0],
  [59.3, 18.1],
]
const HUB: [number, number] = [50.1, 8.7]

/**
 * Punkt-Globus mit Europa-Markierungen und Verbindungsbögen (nach 21st.dev „Interactive Globe“).
 * Canvas 2D, ohne Bibliothek. Ziehen dreht den Globus; ohne Bewegung steht er still.
 */
export function Globe({ className, dark = true }: { className?: string; dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fibonacci-Kugel
    const N = 2200
    const pts: [number, number, number][] = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = Math.PI * (3 - Math.sqrt(5)) * i
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
    }
    const toVec = ([lat, lon]: [number, number]): [number, number, number] => {
      const phi = (lat * Math.PI) / 180
      const lam = (lon * Math.PI) / 180
      return [Math.cos(phi) * Math.sin(lam), Math.sin(phi), Math.cos(phi) * Math.cos(lam)]
    }
    const markers = MARKERS.map(toVec)
    const hub = toVec(HUB)

    // Startlage: Europa zeigt zur Kamera
    let rotY = (-10 * Math.PI) / 180
    let rotX = (40 * Math.PI) / 180
    let velocity = reduce ? 0 : 0.0016
    let dragging = false
    let lastX = 0
    let lastY = 0
    let frame = 0
    let t0 = performance.now()

    const dot = dark ? '160,204,224' : '0,127,157'
    const accent = dark ? '#ffffff' : '#006a84'

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const project = (v: [number, number, number], R: number, cx: number, cy: number) => {
      const [x0, y0, z0] = v
      // Drehung um Y, dann X
      const x1 = x0 * Math.cos(rotY) - z0 * Math.sin(rotY)
      const z1 = x0 * Math.sin(rotY) + z0 * Math.cos(rotY)
      const y2 = y0 * Math.cos(rotX) - z1 * Math.sin(rotX)
      const z2 = y0 * Math.sin(rotX) + z1 * Math.cos(rotX)
      return { x: cx + x1 * R, y: cy - y2 * R, z: z2 }
    }

    const draw = (now: number) => {
      const dt = now - t0
      t0 = now
      if (!dragging) rotY += velocity * dt * 0.06
      const { width, height } = canvas.getBoundingClientRect()
      const R = Math.min(width, height) * 0.44
      const cx = width / 2
      const cy = height / 2
      ctx.clearRect(0, 0, width, height)

      for (const p of pts) {
        const q = project(p, R, cx, cy)
        if (q.z < -0.05) continue
        const a = 0.25 + q.z * 0.65
        ctx.fillStyle = `rgba(${dot},${a})`
        ctx.fillRect(q.x - 1, q.y - 1, 2.2, 2.2)
      }

      const h = project(hub, R, cx, cy)
      const pulse = reduce ? 0.5 : (Math.sin(now / 600) + 1) / 2
      for (const m of markers) {
        const q = project(m, R, cx, cy)
        if (q.z < 0) continue
        // Bogen zum Knoten
        if (h.z > 0) {
          const mx = (q.x + h.x) / 2
          const my = (q.y + h.y) / 2 - Math.hypot(q.x - h.x, q.y - h.y) * 0.35
          ctx.strokeStyle = `rgba(${dot},0.55)`
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(h.x, h.y)
          ctx.quadraticCurveTo(mx, my, q.x, q.y)
          ctx.stroke()
        }
        ctx.fillStyle = accent
        ctx.fillRect(q.x - 3, q.y - 3, 6, 6)
      }
      if (h.z > 0) {
        ctx.strokeStyle = accent
        ctx.globalAlpha = 1 - pulse
        ctx.strokeRect(h.x - 4 - pulse * 8, h.y - 4 - pulse * 8, 8 + pulse * 16, 8 + pulse * 16)
        ctx.globalAlpha = 1
        ctx.fillStyle = accent
        ctx.fillRect(h.x - 3, h.y - 3, 6, 6)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    const down = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      rotY += (e.clientX - lastX) * 0.006
      rotX = Math.max(-1.2, Math.min(1.2, rotX + (e.clientY - lastY) * 0.006))
      lastX = e.clientX
      lastY = e.clientY
    }
    const up = () => {
      dragging = false
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    // Außerhalb des Viewports nicht zeichnen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry?.isIntersecting) {
        t0 = performance.now()
        frame = requestAnimationFrame(draw)
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      velocity = 0
    }
  }, [dark])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('size-full cursor-grab touch-pan-y active:cursor-grabbing', className)}
    />
  )
}
