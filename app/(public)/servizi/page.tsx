import ProcessWorkFlow from '@/components/sections/ProcessWorkFlow'
import ServicesScrollDriven from '@/components/sections/ServicesScrollDriven'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Ricarica i dati ogni 60 secondi
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Servizi - JEIns | Consulenza Aziendale e Progetti Universitari',
  description: 'Scopri i servizi di JEIns: consulenza aziendale, sviluppo web, marketing digitale, business consulting e progetti di ricerca. Soluzioni innovative per aziende e opportunità di crescita per studenti.',
  keywords: 'servizi JEIns, consulenza aziendale, sviluppo web, marketing digitale, business consulting, progetti universitari, servizi studenti',
  openGraph: {
    title: 'Servizi - JEIns | Consulenza Aziendale e Progetti Universitari',
    description: 'Scopri i servizi di JEIns: consulenza aziendale, sviluppo web, marketing digitale e business consulting.',
    url: 'https://jeins.it/servizi',
  },
  alternates: {
    canonical: 'https://jeins.it/servizi',
  },
}

const fallbackServices = [
  { id: '1', title: 'Business Plan', description: 'Analizziamo il contesto, definiamo il modello di business e costruiamo un documento strategico utile a orientare scelte, investimenti e sviluppo.', sector: 'Business', icon: null, isActive: true, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', title: 'Comunicazione & Marketing Compass', description: 'Studiamo comunicazione, mercato e competitor per aiutarti a definire un posizionamento più chiaro, coerente ed efficace.', sector: 'Marketing', icon: null, isActive: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', title: 'Gestione e ottimizzazione degli hashtag', description: 'Selezioniamo gli hashtag più adatti ai tuoi contenuti e ai tuoi obiettivi per migliorare visibilità, coerenza e reach organica.', sector: 'Social Media', icon: null, isActive: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', title: 'E-commerce', description: 'Progettiamo soluzioni per la vendita online funzionali, semplici da usare e sostenibili, pensate per aprire o rafforzare un canale digitale.', sector: 'Digital', icon: null, isActive: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', title: 'Sviluppo applicativi', description: 'Progettiamo applicativi costruiti intorno ai processi e alle esigenze specifiche della tua attività, trasformando un bisogno operativo in una soluzione concreta.', sector: 'IT', icon: null, isActive: true, order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: '6', title: 'Sviluppo app web', description: 'Realizziamo web app intuitive e progettate sui bisogni reali degli utenti, con attenzione a struttura, usabilità e sostenibilità del progetto.', sector: 'IT', icon: null, isActive: true, order: 5, createdAt: new Date(), updatedAt: new Date() },
]

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return services.length > 0 ? services : fallbackServices
  } catch {
    return fallbackServices
  }
}

export default async function ServiziPage() {
  const services = await getServices()

  return (
    <main>
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 newspaper-headline tracking-tighter">
            I nostri servizi
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-neutral-400 font-light leading-relaxed">
            Soluzioni innovative e personalizzate per aziende di ogni dimensione. 
            Il nostro team di studenti qualificati offre consulenza professionale 
            in diversi settori.
          </p>
        </div>
      </section>

      {/* Servizi — Scroll Driven */}
      <section className="py-32 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesScrollDriven services={services} />
        </div>
      </section>

      {/* Processo di lavoro */}
      <section className="py-32 relative">

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
              Il nostro processo di lavoro
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl font-light">
              Un approccio strutturato per garantire risultati eccellenti
            </p>
          </div>
          
          <ProcessWorkFlow />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-insubria-900/20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline tracking-tighter">
              Pronto a iniziare il tuo progetto?
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Contattaci per una consulenza gratuita e scopri come possiamo aiutarti 
              a raggiungere i tuoi obiettivi aziendali.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contatti"
                className="cta-primary"
              >
                Richiedi un preventivo
              </a>
              <a
                href="/chi-siamo"
                className="cta-secondary"
              >
                Scopri di più su di noi
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
