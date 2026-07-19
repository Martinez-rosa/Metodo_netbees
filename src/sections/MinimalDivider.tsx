import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'

interface MinimalDividerProps {
  id?: string
  eyebrow: string
  titulo: string
  parrafo: string
}

/**
 * Transición editorial minimalista entre actos — sin el contraste fuerte de
 * un divisor oscuro (sin fondo negro ni red de nodos). Fondo cálido y sutil,
 * tipografía disruptiva (sans bold + serif itálica) como único protagonista,
 * un párrafo breve debajo. Reutilizable: marca cada quiebre de la narrativa
 * sin romper el ritmo editorial claro de la página.
 */
export function MinimalDivider({ id, eyebrow, titulo, parrafo }: MinimalDividerProps) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-brand-paper py-section">
      {/* Fondo cálido muy sutil — sin contraste fuerte, solo un leve calor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 85% 100%, rgba(255,189,0,0.08), transparent 60%), radial-gradient(90% 70% at 10% 0%, rgba(250,210,0,0.05), transparent 55%)',
        }}
      />

      <div className="shell relative mx-auto max-w-3xl text-center">
        <Reveal direction="none" blur={false}>
          <p className="eyebrow text-brand-slate">{eyebrow}</p>
        </Reveal>

        <SplitText
          as="h2"
          text={titulo}
          className="mt-5 justify-center text-display-lg font-bold text-brand-ink"
        />

        <Reveal delay={0.2} className="mx-auto mt-7 max-w-xl">
          <p className="text-body-lg text-brand-slate">{parrafo}</p>
        </Reveal>
      </div>
    </section>
  )
}
