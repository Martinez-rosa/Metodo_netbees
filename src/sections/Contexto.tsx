import { contexto } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { AccentText } from '../components/AccentText'
import { Reveal, RevealGroup } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * Contexto: qué es Netbees, entre el Hero y Los tres pilares. Cabecera
 * editorial (titular + párrafos a dos columnas, estilo "Trusted where trust
 * is audited"), un bloque secundario sobre talento, la fila de logos de los
 * tres socios, y un bloque oscuro con el método resumido en bullets + icono.
 */
export function Contexto() {
  return (
    <SectionShell
      id="contexto"
      marker={contexto.eyebrow}
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      {/* Cabecera: titular a la izquierda, párrafos a la derecha */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <SplitText as="h2" text={contexto.titulo} className="text-display-lg font-bold" />
        <div className="space-y-5">
          {contexto.parrafos.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="text-body-lg text-brand-slate">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Secundario: Impulsando el talento */}
      <div className="mt-14 grid gap-6 border-t border-brand-line pt-14 lg:grid-cols-2 lg:gap-16">
        <SplitText
          as="h3"
          text={contexto.secundario.titulo}
          className="text-display-md font-bold"
        />
        <Reveal delay={0.1}>
          <p className="text-body-lg text-brand-slate">{contexto.secundario.parrafo}</p>
        </Reveal>
      </div>

      {/* Alianzas: fila de logos de los tres socios */}
      <div className="mt-16 border-t border-brand-line pt-10">
        <RevealGroup
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          stagger={0.08}
        >
          <Reveal asChild>
            <span className="font-display text-xl font-bold tracking-tight text-brand-ink/70 grayscale transition-[filter,color] duration-300 hover:text-brand-ink hover:grayscale-0">
              Panamá Pacífico
            </span>
          </Reveal>
          <Reveal asChild>
            <img
              src="/logo_cesine.jpg"
              alt="Cesine"
              className="h-8 w-auto grayscale transition-[filter] duration-300 hover:grayscale-0 md:h-9"
            />
          </Reveal>
          <Reveal asChild>
            <img
              src="/logo_netbees.svg"
              alt="Netbees"
              className="h-9 w-auto grayscale transition-[filter] duration-300 hover:grayscale-0 md:h-10"
            />
          </Reveal>
        </RevealGroup>
      </div>

      {/* Método Netbees resumido: bullets con icono sobre fondo oscuro */}
      <Reveal className="mt-16">
        <div className="rounded-card-lg bg-brand-ink px-7 py-10 text-brand-paper md:px-12 md:py-12">
          <p className="eyebrow text-brand-electric">{contexto.metodoRapido.eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-paper md:text-3xl">
            <AccentText text={contexto.metodoRapido.titulo} tone="electric" />
          </h3>

          <RevealGroup className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2" stagger={0.06}>
            {contexto.metodoRapido.puntos.map((pt) => (
              <Reveal key={pt.texto} asChild>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-paper/20 text-brand-electric">
                    <Icon name={pt.icon} className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-sans text-[15px] font-medium text-brand-paper">
                    {pt.texto}
                  </span>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Reveal>
    </SectionShell>
  )
}
