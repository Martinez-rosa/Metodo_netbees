import { ProgressBar } from './components/ProgressBar'
import { MouseGlow } from './components/MouseGlow'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { Contexto } from './sections/Contexto'
import { InnovacionAbierta } from './sections/InnovacionAbierta'
import { Pilares } from './sections/Pilares'
import { Colaboradores } from './sections/Colaboradores'
import { MinimalDivider } from './sections/MinimalDivider'
import { Metodo } from './sections/Metodo'
import { ModulosPrograma } from './sections/ModulosPrograma'
import { TalentLab } from './sections/TalentLab'
import { Recursos } from './sections/Recursos'
import { Cierre } from './sections/Cierre'
import { Footer } from './sections/Footer'
import { dividerUno, dividerDos } from './data/content'

/**
 * Orquestador de la landing. Un componente por sección, en orden de relato.
 * Los divisores minimalistas marcan los actos. (Sin Rapid Tools ni El Proceso.)
 */
export default function App() {
  // Smooth scroll global se monta desde src/main.tsx (Lenis + gsap.ticker).
  return (
    <>
      <ProgressBar />
      <MouseGlow />
      <Navbar />

      <main>
        <Hero />
        <Contexto />
        <InnovacionAbierta />
        <Pilares />
        <Colaboradores />
        <MinimalDivider
          id="como"
          eyebrow={dividerUno.eyebrow}
          titulo={dividerUno.titulo}
          parrafo={dividerUno.parrafo}
        />
        <Metodo />
        <ModulosPrograma />
        <TalentLab />
        <MinimalDivider
          id="recursos-intro"
          eyebrow={dividerDos.eyebrow}
          titulo={dividerDos.titulo}
          parrafo={dividerDos.parrafo}
        />
        <Recursos />
        <Cierre />
      </main>

      <Footer />
    </>
  )
}
