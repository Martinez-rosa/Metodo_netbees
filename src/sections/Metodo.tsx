import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { metodo } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * S4 · Método Netbees. Línea de tiempo vertical con las fases del método
 * (auditoría → estandarización → selección del reto → implementación), con
 * una línea de progreso que se dibuja al hacer scroll. La fase 03 cuelga un
 * paso derivado (3.1 · Apadrinamiento) en una tarjeta conectada aparte.
 */
export function Metodo() {
  const reduced = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 55%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <SectionShell
      id="metodo"
      marker={metodo.eyebrow}
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <div className="max-w-3xl">
        <SplitText as="h2" text={metodo.titulo} className="text-display-lg font-bold" />
        <Reveal delay={0.15} className="mt-5">
          <p className="text-body-lg text-brand-slate">{metodo.bajada}</p>
        </Reveal>
      </div>

      <div ref={timelineRef} className="relative mt-lg">
        {/* Línea base, tenue. */}
        <div aria-hidden className="absolute left-[10px] top-2 bottom-2 w-px bg-brand-line" />
        {/* Línea de progreso: se dibuja (scaleY) al hacer scroll por la lista. */}
        <motion.div
          aria-hidden
          className="absolute left-[10px] top-2 w-px origin-top bg-brand-accent"
          style={{ scaleY: reduced ? 1 : lineScale, height: 'calc(100% - 1rem)' }}
        />

        <div className="space-y-14">
          {metodo.fases.map((f) => (
            <div key={f.num} className="relative flex gap-6 md:gap-8">
              {/* Punto de la línea de tiempo */}
              <div className="flex w-5 shrink-0 justify-center pt-2">
                <span className="h-3 w-3 rounded-full border-2 border-brand-paper bg-brand-accent" />
              </div>

              <div className="flex-1 pb-1">
                <span className="font-label text-xs font-medium uppercase tracking-label text-brand-accent">
                  Fase {f.num}
                </span>
                <SplitText as="h3" text={f.titulo} className="mt-1 text-display-md font-bold" />
                <p className="mt-2 max-w-xl text-body-lg text-brand-slate">{f.descripcion}</p>

                {/* Paso derivado (rama), conectado con la fase principal. */}
                {f.branch && (
                  <Reveal direction="left" className="mt-5 max-w-md">
                    <div className="rounded-card border-l-[3px] border-brand-teal bg-brand-white p-5 shadow-card">
                      <span className="font-label text-[11px] font-medium uppercase tracking-label text-brand-teal">
                        Fase {f.branch.num}
                      </span>
                      <h4 className="mt-1 font-display text-lg font-bold tracking-tight">
                        {f.branch.titulo}
                      </h4>
                      <p className="mt-1.5 text-[15px] text-brand-slate">{f.branch.descripcion}</p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
