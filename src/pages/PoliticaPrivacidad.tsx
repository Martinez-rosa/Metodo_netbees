import { LegalLayout, LegalSection } from '../components/LegalLayout'

/**
 * Política de privacidad. Contenido real y completo conforme al RGPD, con los
 * datos identificativos del responsable como placeholder entre corchetes —
 * hay que sustituirlos por los datos legales reales antes de publicar.
 */
export function PoliticaPrivacidad() {
  return (
    <LegalLayout
      eyebrow="LEGAL"
      titulo="Política de privacidad"
      actualizado="5 de agosto de 2026"
    >
      <LegalSection titulo="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales recogidos a través de este sitio
          web es <strong>Netbees</strong>, en el marco del Método Netbees desarrollado junto a
          Panamá Pacífico y las universidades y centros académicos participantes.
        </p>
        <ul>
          <li>Denominación: [razón social completa del responsable]</li>
          <li>NIF/CIF: [NIF o CIF]</li>
          <li>Domicilio: [dirección postal completa]</li>
          <li>
            Correo de contacto para privacidad:{' '}
            <a href="mailto:privacidad@netbees.eu">privacidad@netbees.eu</a> [sustituir por el
            correo real]
          </li>
        </ul>
      </LegalSection>

      <LegalSection titulo="2. Qué datos recopilamos">
        <p>Recopilamos únicamente los datos que nos facilitas de forma voluntaria:</p>
        <ul>
          <li>
            <strong>Formulario de contacto</strong> (sección «Quiero ser empresa padrina»): nombre,
            empresa, correo electrónico y el mensaje que escribas.
          </li>
          <li>
            <strong>Datos de navegación</strong>: si aceptas las cookies analíticas, información
            anónima o pseudonimizada sobre cómo usas el sitio (páginas vistas, tiempo de permanencia,
            origen del tráfico). Ver el detalle en nuestra{' '}
            <a href="/cookies">política de cookies</a>.
          </li>
        </ul>
        <p>No recopilamos categorías especiales de datos (art. 9 RGPD) en ningún caso.</p>
      </LegalSection>

      <LegalSection titulo="3. Finalidad del tratamiento">
        <ul>
          <li>Responder a las solicitudes de información o de apadrinamiento empresarial que envíes.</li>
          <li>Gestionar la relación con empresas, universidades y alumnado participantes en el programa.</li>
          <li>Elaborar estadísticas de uso agregadas y anónimas para mejorar el sitio, cuando hayas dado tu consentimiento analítico.</li>
        </ul>
        <p>No utilizamos tus datos para elaborar perfiles con fines publicitarios de terceros.</p>
      </LegalSection>

      <LegalSection titulo="4. Legitimación">
        <ul>
          <li>
            <strong>Consentimiento</strong> (art. 6.1.a RGPD): al enviar el formulario de contacto o
            al aceptar cookies no esenciales en el banner de preferencias.
          </li>
          <li>
            <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para las cookies técnicas
            imprescindibles que garantizan el funcionamiento del sitio.
          </li>
        </ul>
      </LegalSection>

      <LegalSection titulo="5. Plazo de conservación">
        <p>
          Los datos del formulario de contacto se conservan mientras dure la relación derivada de tu
          solicitud y, tras ello, durante los plazos legalmente exigibles para atender
          responsabilidades. Los datos analíticos se conservan de forma agregada según la
          configuración descrita en la <a href="/cookies">política de cookies</a>.
        </p>
      </LegalSection>

      <LegalSection titulo="6. Destinatarios y transferencias internacionales">
        <p>
          Al tratarse de un programa que conecta a Panamá y Europa, tus datos pueden ser accedidos
          por el equipo de Netbees en España y por Panamá Pacífico en Panamá, exclusivamente para las
          finalidades descritas en esta política. No cedemos tus datos a terceros ajenos al programa
          salvo obligación legal.
        </p>
        <p>
          Este sitio carga tipografías desde Google Fonts (servidores en la Unión Europea/Estados
          Unidos), lo que implica una transferencia técnica mínima de tu dirección IP a Google al
          cargar la página. No se usa con fines de perfilado.
        </p>
      </LegalSection>

      <LegalSection titulo="7. Tus derechos">
        <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
        <ul>
          <li>Acceso a tus datos personales.</li>
          <li>Rectificación de datos inexactos.</li>
          <li>Supresión («derecho al olvido»).</li>
          <li>Oposición al tratamiento.</li>
          <li>Limitación del tratamiento.</li>
          <li>Portabilidad de tus datos.</li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a{' '}
          <a href="mailto:privacidad@netbees.eu">privacidad@netbees.eu</a> indicando el derecho que
          quieres ejercer y adjuntando un documento que acredite tu identidad. También puedes
          presentar una reclamación ante la autoridad de control competente (en España, la Agencia
          Española de Protección de Datos, <a href="https://www.aepd.es">aepd.es</a>).
        </p>
      </LegalSection>

      <LegalSection titulo="8. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a
          accesos no autorizados, pérdida o alteración. El envío de formularios se realiza mediante
          conexión cifrada (HTTPS).
        </p>
      </LegalSection>

      <LegalSection titulo="9. Menores de edad">
        <p>
          Este sitio se dirige a empresas, universidades y profesionales. Si eres menor de 16 años,
          te pedimos que no nos facilites datos personales sin la autorización de tu tutor legal.
        </p>
      </LegalSection>

      <LegalSection titulo="10. Cambios en esta política">
        <p>
          Podemos actualizar esta política para adaptarla a cambios normativos o del propio sitio.
          La fecha de la última actualización figura al inicio de este documento.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
