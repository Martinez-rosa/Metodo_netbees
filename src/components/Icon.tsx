import {
  Ruler,
  ScanLine,
  Boxes,
  ScanSearch,
  Cpu,
  LifeBuoy,
  Network,
  Timer,
  Wrench,
  Users,
  Laptop,
  Target,
  FlaskConical,
  BadgeCheck,
  type LucideProps,
} from 'lucide-react'

/** Mapa de iconos usados en content.ts (referenciados por nombre string). */
const registry = {
  Ruler,
  ScanLine,
  Boxes,
  ScanSearch,
  Cpu,
  LifeBuoy,
  Network,
  Timer,
  Wrench,
  Users,
  Laptop,
  Target,
  FlaskConical,
  BadgeCheck,
} as const

export type IconName = keyof typeof registry

/** Renderiza un icono de línea lucide por su nombre. */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = registry[name as IconName]
  if (!Cmp) return null
  return <Cmp {...props} />
}
