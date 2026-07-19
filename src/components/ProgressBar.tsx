import { motion, useScroll, useSpring } from 'framer-motion'

/** Barra de progreso de scroll de 2px, fija arriba, en accent (visible sobre paper y sobre fondos oscuros). */
export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  // Suavizado con spring para que no dé saltos.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-accent"
      style={{ scaleX }}
    />
  )
}
