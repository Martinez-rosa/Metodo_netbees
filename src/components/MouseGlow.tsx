import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useFinePointer } from '../hooks/useMousePosition'

/**
 * Resplandor radial suave (electric/indigo) que sigue al cursor por detrás del
 * contenido. Sustituye al punto de cursor. Sin puntero: solo un gradiente que
 * se mueve. Solo en desktop con puntero fino; se oculta con reduced motion.
 */
export function MouseGlow() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const enabled = fine && !reduced

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      // Seguimiento suave (lerp) para que el gradiente se deslice, no salte.
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] rounded-full blur-[90px] mix-blend-multiply will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(250,210,0,0.20), rgba(250,210,0,0.12) 45%, transparent 70%)',
      }}
    />
  )
}
