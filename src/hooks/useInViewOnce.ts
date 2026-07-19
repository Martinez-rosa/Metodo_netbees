import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver de un solo disparo. Se usa para:
 *  - arrancar contadores y dibujos SVG al entrar en viewport
 *  - pausar/activar fondos animados según visibilidad
 * Con `once: false` sirve para pausar canvas cuando la sección sale de vista.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(options?: {
  margin?: string
  once?: boolean
  threshold?: number
}) {
  const { margin = '-12% 0px', once = true, threshold = 0 } = options ?? {}
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [margin, once, threshold])

  return { ref, inView }
}
