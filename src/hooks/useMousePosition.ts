import { useEffect, useRef } from 'react'

export interface MousePos {
  x: number
  y: number
}

/**
 * Posición del ratón sin re-render (guardada en ref) para animaciones de alto
 * FPS (cursor, tilt, grid interactivo). El consumidor lee la ref en su rAF.
 */
export function useMousePosition() {
  const pos = useRef<MousePos>({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return pos
}

/** Detecta puntero fino con hover (para activar cursor y tilt solo en desktop). */
export function useFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
