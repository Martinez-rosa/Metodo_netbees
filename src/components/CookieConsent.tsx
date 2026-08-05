import { useEffect, useState } from 'react'

export type ConsentValue = 'accepted' | 'rejected' | 'analytics'

const STORAGE_KEY = 'netbees-cookie-consent'

/** Lee la preferencia guardada, si existe. Usable también fuera del banner. */
export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'rejected' || value === 'analytics' ? value : null
}

/** Borra la preferencia guardada — usado por el botón "gestionar preferencias" de /cookies. */
export function resetConsent() {
  window.localStorage.removeItem(STORAGE_KEY)
}

/**
 * Banner de consentimiento de cookies, fijo al pie de la ventana. Tres
 * niveles (rechazar / solo analíticas / aceptar todas) persistidos en
 * localStorage; no vuelve a mostrarse una vez elegido. La página de Política
 * de Cookies puede resetear la elección con `resetConsent()`.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
  }, [])

  const choose = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new CustomEvent('netbees-consent-change', { detail: value }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-4xl rounded-card-lg border border-brand-line bg-brand-paper/95 p-6 shadow-float backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-7"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="font-display text-base font-bold tracking-tight text-brand-ink md:text-lg">
            Preferencias de cookies.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">
            Usamos cookies esenciales para el funcionamiento del sitio, analítica anónima y, con tu
            consentimiento, medición de contenido embebido. Consulta nuestra{' '}
            <a
              href="/cookies"
              className="text-brand-ink underline decoration-brand-line underline-offset-2 transition-colors hover:decoration-brand-accent"
            >
              política de cookies
            </a>{' '}
            y nuestra{' '}
            <a
              href="/privacidad"
              className="text-brand-ink underline decoration-brand-line underline-offset-2 transition-colors hover:decoration-brand-accent"
            >
              política de privacidad
            </a>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="rounded-pill border border-brand-line px-5 py-2.5 font-label text-[12px] font-medium uppercase tracking-label text-brand-slate transition-colors hover:border-brand-ink hover:text-brand-ink"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose('analytics')}
            className="rounded-pill border border-brand-line px-5 py-2.5 font-label text-[12px] font-medium uppercase tracking-label text-brand-slate transition-colors hover:border-brand-ink hover:text-brand-ink"
          >
            Solo analíticas
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-pill bg-brand-ink px-5 py-2.5 font-label text-[12px] font-medium uppercase tracking-label text-brand-paper transition-colors hover:bg-brand-teal"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
