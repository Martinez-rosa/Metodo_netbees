import { contexto } from '../data/content'
import { SectionShell } from '../components/SectionShell'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { AnimatedBackground } from '../components/AnimatedBackground'

/**
 * Contexto: qué es Netbees, entre el Hero y Los tres pilares. Cabecera
 * editorial (titular + párrafos a dos columnas, estilo "Trusted where trust
 * is audited") y un bloque secundario sobre talento, cerrando con el vídeo
 * de Cantabria. El bloque «Método Netbees… ¿y cómo?» vive aparte, en
 * MetodoRapido.tsx (después de Innovación abierta).
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
      <div className="mt-lg grid gap-6 border-t border-brand-line pt-lg lg:grid-cols-2 lg:gap-16">
        <SplitText
          as="h3"
          text={contexto.secundario.titulo}
          className="text-display-md font-bold"
        />
        <Reveal delay={0.1}>
          <p className="text-body-lg text-brand-slate">{contexto.secundario.parrafo}</p>
        </Reveal>
      </div>

      {/* Vídeo de región: Cantabria como ecosistema industrial europeo */}
      <div className="mt-lg border-t border-brand-line pt-lg">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-brand-accent">{contexto.videoRegion.eyebrow}</p>
            <SplitText
              as="h3"
              text={contexto.videoRegion.titulo}
              className="mt-3 text-display-md font-bold"
            />
            <Reveal delay={0.1} className="mt-4">
              <p className="text-body-lg text-brand-slate">{contexto.videoRegion.parrafo}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-card-lg border border-brand-line shadow-card">
              <div className="relative aspect-video w-full">
                <iframe
                  src={contexto.videoRegion.embedUrl}
                  title={contexto.videoRegion.titulo.replace(/\*/g, '')}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <p className="mt-2 font-label text-[11px] uppercase tracking-label text-brand-slate">
              {contexto.videoRegion.creditos}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
