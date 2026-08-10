/**
 * TODO el copy de la landing vive aquí, tipado.
 * Los componentes nunca llevan strings hardcodeados: editas el texto aquí.
 * En los titulares, las palabras entre *asteriscos* se renderizan en
 * Instrument Serif itálica (acento editorial).
 * Las rutas de imagen (`src`) están centralizadas para sustituir placeholders
 * por imágenes reales cambiando una sola ruta.
 */

// ————————————————————————————————————————————————
// Tipos
// ————————————————————————————————————————————————

export interface NavItem {
  label: string
  href: string
}

export interface SocioAcademico {
  nombre: string
  descripcion: string
}

export interface Pilar {
  index: string
  nombre: string
  rol: string
  descripcion: string
  /** Burbujas de instituciones dentro del pilar (p. ej. universidades/centros). */
  socios?: SocioAcademico[]
  /** Logo del socio, mostrado como sello discreto dentro de la tarjeta. */
  logo?: string
  /** Tono del sello: 'red' para marca Altamira, 'neutral' (por defecto) vidrio/blanco. */
  logoTone?: 'red' | 'neutral'
  video: { src: string; poster: string; alt: string }
}

export interface Colaborador {
  nombre: string
  logo: string
  /** Logos cuadrados/verticales leen más pequeños que los horizontales a igual altura: marca este flag para darles más aire en la cinta. */
  destacado?: boolean
}

export interface Metric {
  cifra: string
  unidad: string
  label: string
}

export interface FaseMetodo {
  num: string
  titulo: string
  descripcion: string
  /** Paso derivado/opcional que cuelga de esta fase (p. ej. 3.1). */
  branch?: { num: string; titulo: string; descripcion: string }
}

export interface MetodoPunto {
  /** Nombre de icono lucide-react. */
  icon: string
  texto: string
}

export interface ModuloTalent {
  titulo: string
  descripcion: string
  logo: string
}

export interface BloqueTematico {
  num: string
  titulo: string
  modulos: string[]
}

export interface Entregable {
  titulo: string
  descripcion?: string
}

// ————————————————————————————————————————————————
// Global
// ————————————————————————————————————————————————

export const brand = {
  name: 'NETBEES',
  logoSrc: '/netbees-logo.svg', // logo Método Netbees (recortado)
  partners: 'PANAMÁ PACÍFICO · UTP · NETBEES',
} as const

export const nav = {
  items: [
    { label: 'Pilares', href: '#pilares' },
    { label: 'Método', href: '#metodo' },
    { label: 'Temario', href: '#temario' },
    { label: 'Talent Lab', href: '#talent-lab' },
    { label: 'Recursos', href: '#recursos' },
  ] satisfies NavItem[],
  cta: { label: 'Contactar', href: '#cierre' },
}

// ————————————————————————————————————————————————
// S1 · Hero
// ————————————————————————————————————————————————

export const hero = {
  eyebrow: 'PANAMÁ PACÍFICO · ALTAMIRA IA ACADEMY · NETBEES',
  titulo: 'Diseñamos el *futuro*',
  // El subtítulo cambia con el scroll: al inicio "misión", al final del pin
  // "arquitectura" — la promesa "3 pilares" se afirma literalmente.
  subtituloPrefijo: 'Tres pilares, una sola',
  subtituloInicial: 'misión',
  subtituloFinal: 'arquitectura',
  subtitulo: 'Tres pilares, una sola misión.',
  descriptor:
    'El puente de innovación transatlántico que convierte a Panamá en el próximo hub de IA de la región.',
  ctaPrimario: { label: 'Conocer el proyecto', href: '#pilares' },
  ctaSecundario: { label: 'Ver el método', href: '#metodo' },
  scrollHint: 'Desliza',
}

// ————————————————————————————————————————————————
// Contexto: qué es Netbees (entre Hero y Pilares)
// ————————————————————————————————————————————————

export const contexto = {
  eyebrow: 'LA VENTAJA OPERATIVA',
  titulo: 'La Innovación no se enseña se *Provoca*',
  parrafos: [
    'Disponemos de un entorno de experimentación y validación donde las organizaciones pueden testear soluciones, procesos y casos de uso antes de su implementación, reduciendo riesgos y acelerando la adopción de la inteligencia artificial.',
    'Formamos a empresas, instituciones, y profesionales mediante metodologías prácticas basadas en la resolución de retos reales.',
    'Nuestro objetivo es acercar la inteligencia artificial a situaciones cotidianas y necesidades concretas del mercado.',

  ],
  secundario: {
    titulo: 'Impulsando el *talento*',
    parrafo:
      'Capacitamos a jóvenes, estudiantes y personas en búsqueda de empleo para facilitar su incorporación al mercado laboral. Además, trabajamos con pymes para impulsar una cultura de innovación, transferir conocimiento y mentorizar en la aplicación práctica de la inteligencia artificial.',
  },
  videoRegion: {
    eyebrow: 'CANTABRIA · ECOSISTEMA EUROPEO',
    titulo: 'Cantabria, un ecosistema industrial en *expansión*',
    parrafo:
      'El Puerto de Santander y un sector de automoción consolidado sitúan a Cantabria como socio estratégico para nuevos proyectos industriales y tecnológicos en Europa.',
    creditos: 'Vídeo: SODERCAN — Sociedad para el Desarrollo de Cantabria',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7480302322233950208',
  },

  metodoRapido: {
    eyebrow: 'ESCUELA DE IA',
    titulo: 'Método Netbees… ¿y *cómo*?',
    puntos: [
      { icon: 'Wrench', texto: '100% Práctico' },
      { icon: 'Users', texto: 'Profesional a Profesional' },
      { icon: 'Laptop', texto: '100% online o híbrido… tú decides' },
      { icon: 'Target', texto: 'Enfocado a tus procesos' },
      { icon: 'FlaskConical', texto: 'Laboratorio de IA vivo' },
      { icon: 'BadgeCheck', texto: 'Certificado de finalización emitido Fundación gestora de la Escuela Universitaria  Altamira y la Altamira IA Academy adscrita a la UC' },
    ] satisfies MetodoPunto[],
  },
}



// ————————————————————————————————————————————————
// Innovación abierta: vídeo Netbees, debajo del bloque «Escuela de IA»
// ————————————————————————————————————————————————

export const innovacionAbierta = {
  eyebrow: 'ESCUELA DE IA · LABORATORIO NETBEES',
  titulo: 'Innovación *abierta* entre estudiantes y empresas',
  parrafo:
    'El Laboratorio de IA de Netbees pone a estudiantes y empresas a trabajar codo a codo sobre retos reales: equipos mixtos, mentoría profesional y prototipos que se validan en el mismo entorno donde nacen los procesos que buscan mejorar.',
  video: {
    src: '/Laboratorio_ia.mp4',
    poster: '/video/laboratorio-ia-poster.jpg',
    alt: 'Laboratorio de IA Netbees — innovación abierta entre estudiantes y empresas',
  },
  creditos: 'Vídeo: Netbees — Laboratorio de IA',
  badges: [
    { icon: 'Users', texto: 'Estudiantes × Empresas' },
    { icon: 'Target', texto: 'Retos reales' },
  ] satisfies MetodoPunto[],
}

// ————————————————————————————————————————————————
// S2 · Los tres pilares
// ————————————————————————————————————————————————

export const pilares = {
  eyebrow: 'LOS TRES PILARES',
  titulo: 'Tres pilares, una sola *misión*.',
  bajada:
    'Tres actores complementarios a ambos lados del Atlántico, unidos en una única arquitectura de innovación.',
  items: [
    {
      index: '01',
      nombre: 'Panamá Pacífico',
      rol: 'Socio corporativo',
      descripcion: 'Propone retos reales y financia el apadrinamiento.',
      video: {
        src: '/video/pilar-panama.mp4',
        poster: '/video/pilar-panama-poster.jpg',
        alt: 'Zona económica Panamá Pacífico',
      },
    },
    {
      index: '02',
      nombre: 'Universidades / Centros académicos',
      rol: 'Socio académico',
      descripcion: 'Motor de talento de élite y validación académica.',
      socios: [
        { nombre: 'UTP', descripcion: 'Universidad Tecnológica de Panamá' },
        { nombre: 'Altamira', descripcion: 'Fundación gestora de la Escuela Universitaria  Altamira y la Altamira IA Academy adscrita a la UC' },
      ] satisfies SocioAcademico[],
      logo: '/logo_altamira.svg',
      logoTone: 'red',
      video: {
        src: '/video/video_escuelaAltamira.mp4',
        poster: '',
        alt: 'Escuela Universitaria de Turismo Altamira',
      },
    },
    {
      index: '03',
      nombre: 'Netbees',
      rol: 'Socio tecnológico europeo',
      descripcion:
        'Laboratorio de IA en España y red de empresas innovadoras europeas.',
      logo: '/logo_netbees.svg',
      video: {
        src: '/video/pilar-netbees.mp4',
        poster: '/video/pilar-netbees-poster.jpg',
        alt: 'Laboratorio de IA Netbees',
      },
    },
  ] satisfies Pilar[],
}

// ————————————————————————————————————————————————
// S2.1 · Empresas colaboradoras
// ————————————————————————————————————————————————

export const colaboradores = {
  eyebrow: 'EMPRESAS COLABORADORAS',
  bajada: 'Empresas que participan - Misión Panamá Pacífico.',
  items: [
    { nombre: 'Maflow', logo: '/logo_maflow-crop.png' },
    { nombre: 'Netbees', logo: '/logo_netbees-crop.png' },
    { nombre: 'TIM', logo: '/logo_tim-crop.png' },
    { nombre: 'Deduce', logo: '/logo_deduce.png' },
    { nombre: 'Altamira', logo: '/logo_altamira.svg', destacado: true },
    { nombre: 'Incentro', logo: '/logo_incentro.svg', destacado: true },
    { nombre: 'Cámara de Comercio de Torrelavega', logo: '/logo_cámaradecomerciotorrellavega.svg', destacado: true },
    { nombre: 'H7 Metrology', logo: '/logo_h7metrology.svg', destacado: true },
  ] satisfies Colaborador[],
}

// ————————————————————————————————————————————————
// S3 · Divisor oscuro I
// ————————————————————————————————————————————————

export const dividerUno = {
  eyebrow: 'ESTRATEGIA Y EJECUCIÓN',
  titulo: '¿Cómo lo vamos a *hacer*?',
  parrafo:
    'Antes de escalar, validamos. El Método Netbees traduce la estrategia en un plan operativo: infraestructura, equipamiento, talento y mentoría ya probado en Europa.',
}

// ————————————————————————————————————————————————
// S4 · Método Netbees
// ————————————————————————————————————————————————

export const metodo = {
  eyebrow: 'NUESTRO MÉTODO',
  titulo: 'Método *Netbees* IA',
  bajada: 'Transformamos procesos empresariales en soluciones de inteligencia artificial.',
  fases: [
    {
      num: '01',
      titulo: 'Auditoría',
      descripcion: 'Analizamos los procesos mediante ASME.',
    },
    {
      num: '02',
      titulo: 'Estandarizamos',
      descripcion: 'Estructuramos y normalizamos los datos.',
    },
    {
      num: '03',
      titulo: 'Seleccionamos el *reto*',
      descripcion: 'Creamos la plantilla de prompt.',
      branch: {
        num: '3.1',
        titulo: 'Apadrinamiento',
        descripcion:
          'La empresa se convierte en padrino enviando un alumno a Europa con un objetivo claro y accionable.',
      },
    },
    {
      num: '04',
      titulo: 'Implementación y *mejora continua*',
      descripcion: 'Implementamos, validamos y optimizamos.',
    },
  ] satisfies FaseMetodo[],
}

// ————————————————————————————————————————————————
// Temario del programa (bloques temáticos y módulos)
// ————————————————————————————————————————————————

export const programa = {
  eyebrow: 'TEMARIO DEL PROGRAMA',
  titulo: 'Un recorrido por *toda* la IA aplicada',
  bajada: '',
  
  cita: {
    texto:
      '13 bloques temáticos, contenido 100% modular — se pueden elegir módulos sueltos según las necesidades de cada empresa o alumno, sin cursar el programa completo.',
    atribucion: 'método netbees',
    nota: 'FORMACIÓN A MEDIDA, NO UN PAQUETE CERRADO',
  },
  bloques: [
    {
      num: '00',
      titulo: 'Introducción y visión estratégica',
      modulos: ['Bienvenida y evaluación competencial', '¿En qué punto estás? Evaluación personal'],
    },
    {
      num: '01',
      titulo: 'Fundamentos estratégicos de la IA',
      modulos: ['Comprendemos cómo funciona la IA'],
    },
    {
      num: '02',
      titulo: 'Modelos de lenguaje y productividad con IA',
      modulos: [
        'Exprime ChatGPT de 0 a 100',
        'Microsoft Copilot: descubre su universo',
        'El potencial de Gemini',
        'Grok: más de lo que imaginas',
        'Destaca con Claude',
      ],
    },
    {
      num: '03',
      titulo: 'Automatización inteligente de procesos',
      modulos: [
        'IA en entornos industriales',
        'Automatizaciones con Make',
        'Response API: crea tus propios sistemas',
        'Botpress y sus agentes autónomos',
        'n8n: automatización y agentes aplicados',
        'n8n: IA, MCPs y automatización avanzada',
      ],
    },
    {
      num: '04',
      titulo: 'Productividad digital y ofimática',
      modulos: [
        'Transforma tus documentos en un diálogo activo',
        'IA en Microsoft Office',
        'Análisis y visualización de datos con Power BI',
        'IA en Google Workspace',
        '¿Qué herramienta es para mí?',
      ],
    },
    {
      num: '05',
      titulo: 'Creación de asistentes con Copilot Studio',
      modulos: ['Copilot Studio'],
    },
    {
      num: '06',
      titulo: 'Marco legal y ética en IA',
      modulos: ['Aspectos legales de la IA'],
    },
    {
      num: '07',
      titulo: 'Desarrollo de software asistido (Vibe Coding)',
      modulos: ['Vibe Coding — Lovable', 'Vibe Coding — Replit'],
    },
    {
      num: '08',
      titulo: 'Arquitecturas avanzadas y ejecución local de LLMs',
      modulos: ['LLMs avanzados: convierte tu PC en tu centro de IA'],
    },
    {
      num: '09',
      titulo: 'Producción audiovisual avanzada con IA',
      modulos: [
        'IA y branding: identidad y manual de marca',
        'IA audiovisual: el vídeo, tu mejor aliado',
        'ComfyUI',
      ],
    },
    {
      num: '10',
      titulo: 'Avatares digitales y síntesis de voz',
      modulos: ['Avatares digitales', 'Clonación y generación de voz'],
    },
    {
      num: '11',
      titulo: 'Marketing estratégico, SEO y automatización',
      modulos: [
        'Comunícate con IA: marketing eficaz',
        'Conoce a tu cliente y haz que te compre',
        'SEO con IA',
        'SEO / GEO avanzado con IA',
        'GEM con IA',
        'Email marketing',
        'Redes sociales con IA',
      ],
    },
    {
      num: '12',
      titulo: 'Gestión de proyectos con IA y caso práctico real',
      modulos: ['Gestión de proyectos con IA'],
    },
    {
      num: '13',
      titulo: 'Futuro laboral, empleabilidad y mercado de la IA',
      modulos: ['Talento y Empleo 4.0'],
    },
  ] satisfies BloqueTematico[],
}

// ————————————————————————————————————————————————
// S5 · Talent Lab
// ————————————————————————————————————————————————

export const talentLab = {
  eyebrow: 'TALENT LAB · INNOVACIÓN ABIERTA',
  cifra: '400',
  unidad: 'm²',
  titulo: 'dedicados a aulas de formación de *élite* tecnológica, y más de *8000 m²* de laboratorio industrial',
  retosEyebrow: 'RETOS TECNOLÓGICOS',
  retosSubtitulo: 'A continuación, los retos tecnológicos que hemos logrado resolver.',
  modulos: [
    {
      titulo: 'Agente inteligente de conocimiento',
      descripcion: 'Transformación de conocimiento colectivo mediante IA.',
      logo: '/logo_lysa.svg',
    },
    {
      titulo: 'Agente de soporte',
      descripcion: 'Resolución de incidencias y soporte automatizado.',
      logo: '/logo_aris.svg',
    },
    {
      titulo: 'OPC UA',
      descripcion:
        'Open Platform Communications Unified Architecture. Conectividad industrial e interpretación de datos de máquina.',
      logo: '/logo_opc.svg',
    },
    {
      titulo: 'Maflow Pulse',
      descripcion: 'Cronómetro de procesos industriales.',
      logo: '/logo_pulse.svg',
    },
  ] satisfies ModuloTalent[],
}

// ————————————————————————————————————————————————
// S6 · Divisor oscuro II
// ————————————————————————————————————————————————

export const dividerDos = {
  eyebrow: 'TECNOLOGÍA · TALENTO · INVERSIÓN',
  titulo: '¿Qué recursos son *necesarios*?',
  parrafo:
    'Becas, equipamiento y una red de mentores ya validada en Europa. Así se traduce el Método Netbees en inversión concreta para el primer piloto en Panamá.',
}

// ————————————————————————————————————————————————
// S7 · Recursos e inversión
// ————————————————————————————————————————————————

export const recursos = {
  eyebrow: 'RECURSOS E INVERSIÓN',
  titulo: 'Tecnología, talento e *inversión*',
  cifra: '1.711,66',
  unidad: '$',
  cifraLabel: 'POR BECA',
  cifraSub: 'BECAS',
  bloqueEconomicoTitulo: 'Inversión por beca',
  entregablesTitulo: 'Qué se entrega',
  entregables: [
    {
      titulo: 'Becas a alumnos de 1.711,66 $',
      descripcion:
        'Formación 100% online (3 meses) o híbrida, apadrinada por empresa.',
    },
    {
      titulo: 'Entrega de 5 becas del Programa Método Netbees',
      descripcion:
        'Para creación, prueba y validación de soluciones aplicadas a retos empresariales reales implementados por empresas de Panamá Pacífico.',
    },
    {
      titulo: 'Los participantes formarán parte de una bolsa de empleo de AEDIPE para búsqueda de oprtunidades en Europa.',
    },
    {
      titulo: 'Metodología "Learning by doing"',
      descripcion: 'Ya implementada en Europa.',
    },
    {
      titulo: 'Certificado Fundación gestora de la Escuela Universitaria  Altamira y la Altamira IA Academy adscrita a la uce ',
    },
    
    {
      titulo: 'Inversión económica a través de empresas padrinas',
    },
    {
      titulo: 'Creación de microcredenciales para los alumnos',
    },
    {
      titulo: 'Obtendrás tu perfil y CV Europass oficial, para tu laboral en Europa.',
    },
    
  ] satisfies Entregable[],
}

// ————————————————————————————————————————————————
// S8 · Cierre / CTA
// ————————————————————————————————————————————————

export const cierre = {
  eyebrow: 'EL FUTURO ES HOY',
  titulo: 'Panamá, el próximo *hub de IA* de la región.',
  texto:
    'Únete al puente de innovación transatlántico y transforma el potencial de tu empresa en liderazgo tecnológico global.',
  ctaPrimario: 'Quiero ser empresa padrina',
  ctaSecundario: 'Descargar el dossier',
  form: {
    nombre: 'Nombre',
    empresa: 'Empresa',
    email: 'Email',
    mensaje: 'Mensaje',
    enviar: 'Enviar solicitud',
    exito: 'Gracias. Nos pondremos en contacto contigo muy pronto.',
  },
}

// ————————————————————————————————————————————————
// S9 · Footer
// ————————————————————————————————————————————————

export const footer = {
  actores: ['Panamá Pacífico', 'CESINE', 'Netbees'],
  legales: [
    { label: 'Aviso legal', href: '#' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Cookies', href: '/cookies' },
  ] satisfies NavItem[],
  copyright: '© 2026 Netbees. Todos los derechos reservados.',
  marquee: 'PANAMÁ PACÍFICO · CESINE · NETBEES · TALENT LAB · MÉTODO NETBEES ·',
}
