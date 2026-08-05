import { innovacionAbierta } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { OpenInnovationVideo } from '../components/OpenInnovationVideo'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * Vídeo destacado de Netbees: el método de innovación abierta entre
 * estudiantes y empresas. Vive justo debajo de Contexto y antes del bloque
 * «Escuela de IA» (MetodoRapido). Fondo claro con gradiente suave (Aurora) y
 * tratamiento de vídeo
 * "hero" (halo + tarjeta con ring/sombra + píldoras flotantes), en línea con
 * la referencia visual de Digital Heroes que ya inspira los radios
 * redondeados del sistema — nunca fondo oscuro ni bloques sólidos.
 */
export function InnovacionAbierta() {
  return (
    <SectionShell
      id="innovacion-abierta"
      marker={innovacionAbierta.eyebrow}
      background={<AnimatedBackground variant="aurora" />}
    >
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SplitText
            as="h2"
            text={innovacionAbierta.titulo}
            className="text-display-md font-bold text-brand-ink"
          />
          <Reveal delay={0.15} className="mt-6">
            <p className="text-body-lg text-brand-slate">{innovacionAbierta.parrafo}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1} className="mx-auto max-w-xl lg:mx-0 lg:max-w-none">
            <OpenInnovationVideo
              src={innovacionAbierta.video.src}
              poster={innovacionAbierta.video.poster}
              alt={innovacionAbierta.video.alt}
              badges={innovacionAbierta.badges}
            />
          </Reveal>
          <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="font-label text-[11px] uppercase tracking-label text-brand-slate/70">
              {innovacionAbierta.creditos}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
