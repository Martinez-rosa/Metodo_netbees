import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

interface ParallaxLayerProps {
  children: ReactNode
  /** Desplazamiento total en px a lo largo del recorrido de scroll. */
  y?: number
  className?: string
  /** Reduce el efecto (para móvil se pasa 0.4). */
  factor?: number
}

/**
 * Capa con parallax vertical suave basada en el scroll de la ventana.
 * Solo anima transform. Respeta reduced motion (queda estática).
 */
export function ParallaxLayer({ children, y = 60, className, factor = 1 }: ParallaxLayerProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [0, y * factor])
  const smooth = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.5 })

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y: smooth }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
