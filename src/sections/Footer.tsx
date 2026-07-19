import { footer, brand } from '../data/content'
import { Marquee } from '../components/Marquee'

/**
 * S11 · Footer. Logos placeholder de los tres actores, filete de 1px, enlaces
 * legales, copyright y marquee lento y sutil de baja opacidad.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-line bg-brand-paper">
      {/* Marquee sutil de fondo. */}
      <div className="py-10 text-brand-ink/[0.06]">
        <Marquee text={footer.marquee} />
      </div>

      <div className="shell pb-14">
        {/* Logos de los tres actores. */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {footer.actores.map((a) => (
            <span
              key={a}
              className="font-label text-xl font-bold uppercase tracking-label text-brand-ink"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Filete + fila inferior. */}
        <div className="mt-8 flex flex-col gap-4 border-t border-brand-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <img src={brand.logoSrc} alt="Método Netbees" className="h-7 w-auto" />
            <p className="font-sans text-sm text-brand-slate">{footer.copyright}</p>
          </div>
          <ul className="flex flex-wrap gap-6">
            {footer.legales.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative font-sans text-sm text-brand-slate transition-colors hover:text-brand-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-accent transition-transform duration-300 ease-expo group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
