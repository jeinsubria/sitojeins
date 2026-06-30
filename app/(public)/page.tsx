import Hero from '@/components/sections/Hero'
import ServiceCard from '@/components/ui/ServiceCard'
import StatsCard from '@/components/ui/StatsCard'
import PortfolioCard from '@/components/ui/PortfolioCard'
import NewsletterBox from '@/components/sections/NewsletterBox'
import ContactForm from '@/components/sections/ContactForm'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { getHomeData } from '@/lib/services/homeService'

// Ricarica i dati ogni 60 secondi (ISR - Incremental Static Regeneration)
export const revalidate = 60

export default async function HomePage() {
  const { services, projects, stats, sections } = await getHomeData()
  
  // Crea un oggetto per accedere facilmente alle configurazioni delle sezioni
  const sectionConfig = sections.reduce((acc, section) => {
    acc[section.name] = section
    return acc
  }, {} as Record<string, any>)

  return (
    <main>
      {/* Hero Section */}
      {sectionConfig.hero?.isActive && (
        <Hero
          title={sectionConfig.hero.title || "Mostriamo il valore degli studenti dell'Insubria"}
          subtitle={sectionConfig.hero.subtitle || 'Consulenza, progetti e crescita: per aziende e studenti'}
          primaryCta="Richiedi un preventivo"
          secondaryCta="Unisciti a noi"
          primaryCtaHref="/contatti"
          secondaryCtaHref="/recruitment"
          backgroundImage="/images/hero-universita.jpg"
        />
      )}

      {/* Servizi in evidenza */}
      {sectionConfig.services?.isActive && (
        <section className="py-32 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20 animate-slide-in-top">
              <h2 className="text-4xl md:text-5xl font-bold newspaper-headline">
                {sectionConfig.services.title || 'I nostri servizi'}
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="py-10 grid grid-cols-[32px_1fr_auto] gap-8 items-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <span className="text-sm text-neutral-600 font-light">
                    {index + 1}.
                  </span>
                  <div>
                    <span className="text-xs text-insubria-500 font-semibold tracking-wide uppercase mb-2 block">
                      {service.sector}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-insubria-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <a
                    href="/servizi"
                    className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all text-xl"
                    aria-label={`Scopri ${service.title}`}
                  >
                    →
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <a href="/servizi" className="cta-secondary inline-flex items-center gap-2">
                Tutti i servizi →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* I nostri numeri */}
      {sectionConfig.stats?.isActive && (
        <section className="py-32 relative">

          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 animate-slide-in-bottom">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
                {sectionConfig.stats.title || 'I nostri numeri'}
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                {sectionConfig.stats.subtitle || 'Risultati che testimoniano il nostro impegno e la nostra crescita nel territorio insubre'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
              {[
                { value: stats.projects, suffix: '+', label: 'Progetti completati', sub: 'Con successo' },
                { value: stats.services, suffix: '+', label: 'Servizi offerti', sub: 'Soddisfatte' },
                { value: stats.team, suffix: '+', label: 'Membri attivi', sub: 'Studenti motivati' },
                { value: stats.applications, suffix: '', label: 'Candidature', sub: 'Nel settore' }
              ].map((stat, i) => (
                <div key={i} className="px-8 py-6 text-center animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tighter">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-insubria-500 mb-1 uppercase tracking-widest">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio/Case Studies */}
      {sectionConfig.portfolio?.isActive && projects.length > 0 && (
        <section className="py-32 relative">

          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 animate-zoom-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
                {sectionConfig.portfolio.title || 'I nostri progetti'}
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                {sectionConfig.portfolio.subtitle || 'Alcuni esempi dei progetti che abbiamo realizzato per i nostri clienti, dimostrando la nostra capacità di innovazione e problem solving.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {projects.map((project, index) => {
                const tags = project.tags ? JSON.parse(project.tags) : []
                return (
                  <div key={project.id} className="animate-fade-in-left hover-lift h-full card-standard w-full" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="newspaper-card h-full flex flex-col">
                      <div className="h-56 bg-neutral-900 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                          />
                        ) : (
                          <div className="text-insubria-500/20 text-center">
                            <div className="text-6xl mb-2">📊</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
                      </div>
                      <div className="p-8 flex-grow flex flex-col">
                        <p className="text-xs text-insubria-500 font-bold tracking-widest uppercase mb-3">
                          {project.client || 'JEIns'}
                        </p>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-neutral-400 mb-6 flex-grow font-light leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span key={tagIndex} className="bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {sectionConfig.newsletter?.isActive && (
        <section className="py-32 relative overflow-hidden">

          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <NewsletterBox />
            </div>
          </div>
        </section>
      )}

      {/* Contatto rapido */}
      {sectionConfig.contact?.isActive && (
        <section className="py-32 relative">

          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up">
              <ContactForm
                title={sectionConfig.contact.title || "Contatto rapido"}
                description={sectionConfig.contact.subtitle || "Hai un progetto in mente? Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi."}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
