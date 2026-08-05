import { colaboradores } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { LogoMarquee } from '../components/LogoMarquee'

/**
 * S2.1 · Empresas colaboradoras. Trust bar editorial justo debajo de los
 * tres pilares: cinta de logos en loop continuo a sangre completa.
 */
export function Colaboradores() {
  return (
    <SectionShell id="colaboradores" marker={colaboradores.eyebrow}>
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-body-lg text-brand-slate">{colaboradores.bajada}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative left-1/2 right-1/2 -mx-[50vw] mt-lg w-screen">
        <LogoMarquee logos={colaboradores.items} />
      </Reveal>
    </SectionShell>
  )
}
