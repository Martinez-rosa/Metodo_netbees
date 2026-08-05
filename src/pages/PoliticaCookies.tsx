import { LegalLayout, LegalSection } from '../components/LegalLayout'
import { resetConsent } from '../components/CookieConsent'

/** Política de cookies. Refleja las cookies/almacenamiento realmente usados por el sitio. */
export function PoliticaCookies() {
  const onManage = () => {
    resetConsent()
    window.location.reload()
  }

  return (
    <LegalLayout eyebrow="LEGAL" titulo="Política de cookies" actualizado="5 de agosto de 2026">
      <LegalSection titulo="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
          información sobre tu visita. También usamos <code>localStorage</code>, una tecnología
          similar que cumple la misma función de almacenamiento en tu navegador.
        </p>
      </LegalSection>

      <LegalSection titulo="2. Cookies que usamos">
        <p>Clasificamos las cookies del sitio en tres categorías, igual que en el banner de preferencias:</p>
        <ul>
          <li>
            <strong>Técnicas / esenciales (siempre activas)</strong>: necesarias para que el sitio
            funcione. Guardamos tu elección de cookies en <code>localStorage</code> (clave{' '}
            <code>netbees-cookie-consent</code>) para no volver a preguntarte en cada visita.
          </li>
          <li>
            <strong>Analíticas (opcionales)</strong>: si las aceptas, nos permiten medir de forma
            anónima o pseudonimizada cómo se usa el sitio (páginas vistas, tiempo de permanencia)
            para mejorarlo. No se activan hasta que las aceptas en el banner.
          </li>
          <li>
            <strong>Contenido embebido de terceros (opcional)</strong>: la sección «Cantabria, un
            ecosistema industrial en expansión» incluye un vídeo embebido de LinkedIn. Al
            cargarse, LinkedIn puede establecer sus propias cookies conforme a su propia política de
            privacidad. Además, las tipografías del sitio se sirven desde Google Fonts, lo que
            implica una conexión técnica a servidores de Google al cargar la página.
          </li>
        </ul>
      </LegalSection>

      <LegalSection titulo="3. Duración">
        <p>
          La preferencia guardada en <code>localStorage</code> no caduca automáticamente: permanece
          hasta que borres los datos de navegación de tu navegador o pulses «Gestionar
          preferencias» más abajo. Las cookies de terceros (LinkedIn, Google) siguen los plazos que
          cada proveedor define en su propia política.
        </p>
      </LegalSection>

      <LegalSection titulo="4. Cómo desactivar las cookies">
        <p>
          Puedes cambiar tu elección en cualquier momento con el botón de abajo, o borrarlas
          directamente desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge suelen
          tener esta opción en «Privacidad y seguridad»). Bloquear las cookies técnicas puede
          afectar al funcionamiento del sitio.
        </p>
        <button
          type="button"
          onClick={onManage}
          className="mt-2 inline-flex rounded-pill bg-brand-ink px-6 py-3 font-label text-[12px] font-medium uppercase tracking-label text-brand-paper transition-colors hover:bg-brand-teal"
        >
          Gestionar preferencias de cookies
        </button>
      </LegalSection>

      <LegalSection titulo="5. Más información">
        <p>
          Para saber cómo tratamos tus datos personales en general, consulta nuestra{' '}
          <a href="/privacidad">política de privacidad</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
