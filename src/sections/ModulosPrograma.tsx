import { programa } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal, RevealGroup } from '../components/Reveal'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * Temario del programa. Lista vertical apilada (igual en móvil y desktop):
 * cada bloque = número en serif itálica + heading + línea "módulos:" con los
 * nombres en mono mayúsculas. Estilo ordenado tipo índice editorial.
 */
export function ModulosPrograma() {
  return (
    <SectionShell
      id="temario"
      marker={programa.eyebrow}
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] lg:items-end">
        <SplitText as="h2" text={programa.titulo} className="text-display-lg font-bold" />
        <Reveal delay={0.15}>
          <p className="text-body-lg text-brand-slate">{programa.bajada}</p>
        </Reveal>
      </div>

      {/* Cita destacada: el temario es modular, no un paquete cerrado. */}
      <Reveal delay={0.2} className="mx-auto mt-10 max-w-5xl">
        <blockquote className="rounded-card border-l-[3px] border-brand-accent bg-gradient-to-r from-brand-electric/[0.05] to-transparent p-6 md:p-8">
          <p className="font-display text-lg leading-snug tracking-tight text-brand-ink md:text-xl">
            {programa.cita.texto}
          </p>
          <footer className="mt-4 font-label text-[12px] uppercase tracking-label text-brand-slate">
            <cite className="font-serif text-base italic">{programa.cita.atribucion}</cite>
            <span className="mx-2 opacity-50">·</span>
            {programa.cita.nota}
          </footer>
        </blockquote>
      </Reveal>

      {/* Lista apilada, ancho contenido para líneas legibles. */}
      <RevealGroup className="mx-auto mt-14 max-w-5xl space-y-4" stagger={0.06}>
        {programa.bloques.map((b) => (
          <Reveal key={b.num} asChild>
            <article className="group rounded-card-lg border border-brand-line bg-brand-white/70 p-6 transition-[border-color,box-shadow,transform] duration-300 ease-expo hover:-translate-y-0.5 hover:border-brand-accent/50 hover:shadow-card-hover md:p-8">
              <div className="flex gap-5 md:gap-8">
                {/* Número en serif itálica */}
                <span className="shrink-0 font-serif text-3xl italic leading-none text-brand-accent md:text-4xl">
                  {b.num}
                </span>

                <div className="flex-1">
                  {/* Heading */}
                  <h3 className="font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    {b.titulo}.
                  </h3>

                  {/* Línea de módulos: label serif itálica + lista en mono mayúsculas */}
                  {/* Línea de módulos: label serif itálica + lista en mono mayúsculas */}
                <div className="mt-4">
                  <span className="font-serif text-base italic text-brand-ink">módulos:</span>
                  <ul className="mt-2 space-y-1.5">
                    {b.modulos.map((modulo, i) => (
                      <li
                        key={i}
                        className="flex gap-3 font-label text-[13px] uppercase tracking-[0.1em] text-brand-slate"
                      >
                        <span className="text-brand-accent" aria-hidden="true">—</span>
                        <span>{modulo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  )
}
