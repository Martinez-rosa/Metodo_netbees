import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { hero } from '../data/content'
import { HeroVideoBackground } from '../components/HeroVideoBackground'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Eyebrow } from '../components/Eyebrow'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToAnchor } from '../lib/lenis'
import { buildHeroTimeline, buildHeroReducedTimeline } from './Hero.timeline'

/**
 * S1 · Hero. Scrollytelling técnica #5 (sticky layered composition).
 * Sobre el vídeo del skyline pineado, se materializan tres columnas de vidrio
 * (los "3 pilares") y el subtítulo remata pasando de "misión" a "arquitectura".
 * Ver Hero.timeline.ts para la coreografía completa.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  // GSAP context con scope: al desmontar (o al cambiar `reduced`) revierte
  // todos los tweens y ScrollTriggers creados dentro. Equivalente al patrón
  // que usa @gsap/react/useGSAP, aplicado con useEffect nativo para no
  // depender del wrapper.
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      if (reduced) {
        buildHeroReducedTimeline(containerRef.current!)
      } else {
        buildHeroTimeline(containerRef.current!)
      }
    }, containerRef)
    return () => {
      ctx.revert()
      // ScrollTriggers registrados dentro del context también se limpian
      // por revert(), pero aseguramos por si algún matchMedia dejó restos.
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill()
      })
    }
  }, [reduced])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToAnchor(href)
  }

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fondo: vídeo del skyline de Panamá con overlay para legibilidad. */}
      <HeroVideoBackground />

      {/* Logo Método Netbees — arriba a la izquierda, fuera del navbar. */}
      <div className="absolute inset-x-0 top-5 z-30 md:top-7">
        <div className="shell">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollToAnchor('#top')
            }}
            aria-label="Método Netbees — inicio"
            className="group inline-block"
          >
            <img
              src="/netbees-logo.svg"
              alt="Método Netbees"
              className="h-12 w-auto origin-left transition-[transform,filter] duration-300 ease-expo group-hover:scale-[1.03] group-hover:[filter:drop-shadow(0_0_16px_rgba(250,210,0,0.55))] md:h-16 lg:h-20"
            />
          </a>
        </div>
      </div>

      <div className="shell relative z-20 w-full py-28 pt-40 md:pt-44">
        <Reveal direction="none" blur={false}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        {/* Titular. Ancho proporcional al font-size (clamp) para que
            "el futuro" quede en la misma línea en todos los tamaños. */}
        <div className="mt-6 max-w-[clamp(16rem,45vw,42rem)]">
          <SplitText as="h1" text={hero.titulo} className="text-display-xl font-bold" />
        </div>

        {/* Subtítulo con swap semántico: "misión" ↔ "arquitectura". El
            segundo <span> vive absolutamente posicionado sobre el primero
            para que el intercambio sea in situ (Hero.timeline.ts se encarga
            del cross-fade linkeado al scroll). */}
        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="font-display text-2xl font-medium tracking-tight text-brand-ink md:text-3xl">
            {hero.subtituloPrefijo}{' '}
            <span className="relative inline-block align-baseline">
              <span className="hero-subtitle-swap accent">
                {hero.subtituloInicial}
              </span>
              <span className="hero-subtitle-final accent">
                {hero.subtituloFinal}
              </span>
            </span>
            .
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-5 max-w-xl">
          <p className="text-body-lg text-brand-slate">{hero.descriptor}</p>
        </Reveal>

        <Reveal delay={0.42} className="mt-9 flex flex-wrap gap-3">
          <Button
            href={hero.ctaPrimario.href}
            onClick={go(hero.ctaPrimario.href)}
            variant="primary"
          >
            {hero.ctaPrimario.label}
          </Button>
          <Button
            href={hero.ctaSecundario.href}
            onClick={go(hero.ctaSecundario.href)}
            variant="secondary"
          >
            {hero.ctaSecundario.label}
          </Button>
        </Reveal>
      </div>

      {/* Indicador de scroll animado. */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-brand-slate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="eyebrow text-[11px]">{hero.scrollHint}</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </section>
  )
}
