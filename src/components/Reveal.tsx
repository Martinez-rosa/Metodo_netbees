import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_EXPO } from '../lib/config'

type Direction = 'up' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  distance?: number
  blur?: boolean
  className?: string
  id?: string
  /** Si es hijo de un grupo con staggerChildren, usa `asChild` para heredar. */
  asChild?: boolean
}

/** Desplazamiento inicial según dirección. */
function offset(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':
      return { y: distance, x: 0 }
    case 'left':
      return { y: 0, x: distance }
    case 'right':
      return { y: 0, x: -distance }
    default:
      return { y: 0, x: 0 }
  }
}

/**
 * Reveal base del sistema: opacity 0→1, desplazamiento y blur, expo-out 0.7s.
 * Respeta reduced motion (aparece en estado final).
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  blur = true,
  className,
  id,
  asChild = false,
}: RevealProps) {
  const reduced = useReducedMotion()
  const { x, y } = offset(direction, distance)

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1 }
      : { opacity: 0, x, y, filter: blur ? 'blur(6px)' : 'blur(0px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduced ? 0 : 0.7, ease: EASE_EXPO, delay: reduced ? 0 : delay },
    },
  }

  // Como hijo de un contenedor con stagger: no dispara su propio inView.
  if (asChild) {
    return (
      <motion.div variants={variants} className={className}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que orquesta el stagger de sus hijos (70–90ms). */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}) {
  const reduced = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  }
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
