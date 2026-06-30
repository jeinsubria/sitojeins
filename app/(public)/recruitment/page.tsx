import { ExternalLink, Users, Calendar, MapPin, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'

import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Recruitment - JEIns | Unisciti al Nostro Team di Studenti',
  description: 'Candidati per entrare a far parte di JEIns! Offriamo opportunità di crescita professionale, progetti reali e esperienza pratica per studenti dell\'Università dell\'Insubria. Scopri i ruoli disponibili.',
  keywords: 'recruitment JEIns, candidature studenti, opportunità lavoro universitario, team JEIns, posizioni aperte, carriera studenti',
  openGraph: {
    title: 'Recruitment - JEIns | Unisciti al Nostro Team di Studenti',
    description: 'Candidati per entrare a far parte di JEIns! Opportunità di crescita professionale per studenti dell\'Università dell\'Insubria.',
    url: 'https://jeins.it/recruitment',
  },
  alternates: {
    canonical: 'https://jeins.it/recruitment',
  },
}

const defaultFaqs = [
  {
    question: "Quando sono aperti i periodi di recruitment?",
    answer: "Il recruitment apre due volte all'anno: in autunno e in primavera. Segui i nostri canali social per sapere esattamente quando viene aperto il prossimo ciclo di selezione."
  },
  {
    question: "Come funziona il processo di selezione?",
    answer: "Il processo prevede una prima valutazione del CV, seguita da un colloquio conoscitivo e, se necessario, da un test pratico specifico per il ruolo."
  },
  {
    question: "Quali competenze sono richieste?",
    answer: "Cerchiamo studenti motivati con buone capacità comunicative, spirito di squadra e voglia di mettersi in gioco. Le competenze tecniche specifiche dipendono dal ruolo."
  },
  {
    question: "Quanto tempo richiede l'impegno?",
    answer: "L'impegno varia da 5 a 15 ore settimanali, compatibilmente con gli studi universitari. Offriamo flessibilità negli orari."
  },
  {
    question: "Quali sono i benefici di far parte di JEIns?",
    answer: "Esperienza professionale reale, networking con aziende, sviluppo di competenze trasversali, certificazioni e possibilità di crescita personale e professionale."
  }
]

const defaultRecruitment = {
  isOpen: false,
  description: "Candidati per diventare parte di JEIns e sviluppa le tue competenze professionali attraverso progetti reali e un ambiente stimolante.",
  tallyFormUrl: null as string | null,
  closeDate: null as Date | null,
}

async function getRecruitmentData() {
  try {
    const recruitment = await prisma.recruitment.findFirst()
    if (!recruitment) {
      return { recruitment: defaultRecruitment, faqs: defaultFaqs }
    }

    let faqs = defaultFaqs
    if (recruitment.faqs) {
      try {
        const parsed = JSON.parse(recruitment.faqs)
        if (Array.isArray(parsed) && parsed.length > 0) {
          faqs = parsed
        }
      } catch {
        // Usa i default se il JSON non è valido
      }
    }

    return { recruitment, faqs }
  } catch {
    return { recruitment: defaultRecruitment, faqs: defaultFaqs }
  }
}


export default async function RecruitmentPage() {
  const { recruitment, faqs } = await getRecruitmentData()
  const isOpen = recruitment?.isOpen ?? false

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 section-green relative overflow-hidden">
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-bottom"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline">
            Unisciti al nostro team
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {recruitment?.description || defaultRecruitment.description}
          </p>
          {isOpen && (
            <div className="mt-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Recruitment aperto
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tally Form di candidatura */}
      <section className="py-20 section-white relative">
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Candidati ora
            </h2>
            <p className="text-neutral-500 text-lg">
              Compila il form per candidarti e unisciti al nostro team
            </p>
          </div>

          <div className="bg-white border-2 border-insubria-200 rounded-2xl p-8 shadow-sm animate-fade-in-up">
            <div className="text-center mb-8">
              <div className={`${isOpen ? 'bg-insubria-50 text-insubria-600' : 'bg-gray-50 text-gray-400'} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                <Users className="h-10 w-10" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isOpen ? 'text-insubria-600' : 'text-gray-600'}`}>
                Form di Candidatura JEIns
              </h3>

              {!isOpen && (
                <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 font-medium">
                  Le candidature sono attualmente chiuse
                </p>
              )}

              {isOpen ? (
                <>
                  <p className="text-neutral-500 mb-6">
                    Clicca il pulsante qui sotto per accedere al form di candidatura
                  </p>
                  <a
                    href={recruitment?.tallyFormUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-insubria-600 text-white rounded-2xl font-semibold hover:bg-insubria-700 transition-colors text-lg"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Compila il Form di Candidatura
                  </a>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-6">
                    Al momento non ci sono posizioni aperte. Torna a trovarci presto per nuove opportunità!
                  </p>
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center px-8 py-4 bg-gray-200 text-gray-500 rounded-2xl font-semibold cursor-not-allowed text-lg"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Compila il Form di Candidatura
                  </button>
                </>
              )}
            </div>

            {isOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-insubria-50 text-insubria-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-insubria-600 mb-2">Scadenza</h4>
                  <p className="text-sm text-neutral-500">
                    {recruitment?.closeDate
                      ? new Date(recruitment.closeDate).toLocaleDateString('it-IT')
                      : 'Da definire'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-insubria-50 text-insubria-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-insubria-600 mb-2">Modalità</h4>
                  <p className="text-sm text-neutral-500">Online</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-insubria-50 text-insubria-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-insubria-600 mb-2">Tempo</h4>
                  <p className="text-sm text-neutral-500">10-15 minuti</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 section-green-light relative">
        <div className="decorative-corner top-0 right-0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        <div className="decorative-corner-bottom-right bottom-0 left-0" style={{clipPath: 'polygon(0 0, 100% 100%, 0 100%)'}}></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Domande frequenti
            </h2>
            <p className="text-neutral-500 text-lg">
              Risposte alle domande più comuni sul processo di recruitment
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq: { question: string; answer: string }, index: number) => (
              <div key={index} className="bg-white border-l-4 border-insubria-600 p-6 animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-500">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="py-20 section-white relative">
        <div className="decorative-corner top-0 left-0"></div>
        <div className="decorative-corner-bottom-right bottom-0 right-0"></div>
        <div className="decorative-strip decorative-strip-top"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 newspaper-headline">
              Perché scegliere JEIns?
            </h2>
            <p className="text-neutral-500 text-lg">
              I vantaggi di far parte della nostra Junior Enterprise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="text-center animate-scale-in hover-lift h-full w-full">
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="bg-insubria-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Esperienza Reale
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Lavora su progetti concreti con aziende reali, sviluppando competenze professionali autentiche.
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift h-full w-full" style={{animationDelay: '0.1s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="bg-insubria-300 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Networking
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Entra in contatto con professionisti del settore e costruisci la tua rete di contatti.
                </p>
              </div>
            </div>

            <div className="text-center animate-scale-in hover-lift h-full w-full" style={{animationDelay: '0.2s'}}>
              <div className="bg-white border-2 border-insubria-200 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="bg-insubria-200 text-insubria-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-lg font-semibold text-insubria-600 mb-3">
                  Crescita Personale
                </h3>
                <p className="text-neutral-500 text-sm flex-grow">
                  Sviluppa soft skills, leadership e capacità di problem solving in un ambiente stimolante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
