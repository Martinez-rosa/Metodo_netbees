import { contexto } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { AccentText } from '../components/AccentText'
import { Reveal, RevealGroup } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * «Método Netbees… ¿y cómo?» — resumen en bullets con icono. Vive justo
 * después de Innovación abierta (antes vivía al final de Contexto).
 */
export function MetodoRapido() {
  return (
    <SectionShell
      id="metodo-rapido"
      marker={contexto.metodoRapido.eyebrow}
      background={<AnimatedBackground variant="grid" className="opacity-30" />}
    >
      <Reveal>
        <div className="rounded-card-lg border border-brand-line bg-brand-white px-7 py-10 shadow-card md:px-12 md:py-12">
          <p className="eyebrow text-brand-accent">{contexto.metodoRapido.eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-ink md:text-3xl">
            <AccentText text={contexto.metodoRapido.titulo} tone="accent" />
          </h3>

          <RevealGroup className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2" stagger={0.06}>
            {contexto.metodoRapido.puntos.map((pt) => (
              <Reveal key={pt.texto} asChild>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-accent">
                    <Icon name={pt.icon} className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-sans text-[15px] font-medium text-brand-ink">
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
