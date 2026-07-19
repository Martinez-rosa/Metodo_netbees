import { motion } from 'framer-motion'
import { recursos } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal, RevealGroup } from '../components/Reveal'
import { StatNumber } from '../components/StatNumber'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * S9 · Recursos e inversión. Cifra protagonista con contador. Dos columnas:
 * izquierda bloque económico, derecha lista de entregables con filete animado
 * por ítem.
 */
export function Recursos() {
  const reduced = useReducedMotion()

  return (
    <SectionShell
      id="recursos"
      marker="RECURSOS E INVERSIÓN"
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <div className="max-w-3xl">
        <SplitText as="h2" text={recursos.titulo} className="text-display-lg font-bold" />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-20">
        {/* Columna izquierda: bloque económico */}
        <Reveal direction="right">
          <div className="rounded-card border border-brand-line bg-brand-white p-8 shadow-card lg:sticky lg:top-28">
            <p className="eyebrow text-brand-slate">{recursos.bloqueEconomicoTitulo}</p>
            <div className="mt-6 text-stat">
              <StatNumber value={recursos.cifra} unit={recursos.unidad} unitClassName="text-3xl" />
            </div>
            <p className="eyebrow mt-3 text-brand-accent">{recursos.cifraLabel}</p>
            <div className="mt-8 flex items-center gap-3 border-t border-brand-line pt-6">
              <span className="font-display text-4xl font-bold text-brand-ink">10</span>
              <span className="font-label text-sm font-semibold uppercase tracking-label text-brand-slate">
                {recursos.cifraSub}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Columna derecha: lista de entregables */}
        <div>
          <Reveal>
            <p className="eyebrow text-brand-slate">{recursos.entregablesTitulo}</p>
          </Reveal>
          <RevealGroup className="mt-4" stagger={0.07}>
            {recursos.entregables.map((e) => (
              <Reveal key={e.titulo} asChild>
                <div className="group relative py-5">
                  {/* Filete animado por ítem */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-full origin-left bg-brand-line"
                    initial={{ scaleX: reduced ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-8% 0px' }}
                    transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent transition-transform duration-300 group-hover:scale-150" />
                    <div>
                      <h3 className="font-sans text-lg font-bold">{e.titulo}</h3>
                      {e.descripcion && (
                        <p className="mt-1 text-body-lg text-brand-slate">{e.descripcion}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>
    </SectionShell>
  )
}
