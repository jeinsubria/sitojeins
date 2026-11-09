import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Network e Partner - JEIns | JE Italy',
  description: 'JEIns Consulting è parte di JE Italy, la confederazione delle Junior Enterprise italiane. Scopri il nostro network e i nostri partner.',
  keywords: 'JE Italy, Junior Enterprise Italia, network JEIns, partner JEIns, Junior Enterprise Lombardia',
  openGraph: {
    title: 'Network e Partner - JEIns | JE Italy',
    description: 'JEIns Consulting è parte di JE Italy, la confederazione delle Junior Enterprise italiane.',
    url: 'https://jeins.it/network',
  },
  alternates: {
    canonical: 'https://jeins.it/network',
  },
}

const JE_ITALY_URL = 'https://jeitaly.org/network/'

// Per ogni partner: description è la riga su cosa abbiamo fatto insieme (lasciala vuota per non mostrarla)
const partners = [
  { name: 'Forbes Next Leaders', image: '/images/partner/forbes-next-leaders.jpg', url: 'https://nextleaders.forbes.it', description: 'Next Leaders è il progetto di Forbes Italia dedicato agli studenti universitari. La partnership dà valore ai nostri associati, offrendo loro visibilità e occasioni di crescita nel contesto editoriale di Forbes.' },
  { name: 'Assoconsult', image: '/images/partner/assoconsult.jpg', url: 'https://assoconsult.org', description: 'Insieme ad Assoconsult abbiamo organizzato Next JEn Consulting, l\'evento che avvicina gli studenti al mondo della consulenza.' },
  { name: 'Joinrs', image: '/images/partner/joinrs.jpg', url: 'https://www.joinrs.com/it', description: 'Joinrs è la piattaforma italiana che aiuta i giovani a trovare lavoro, proponendo a ciascuno le offerte più adatte al proprio profilo. Insieme abbiamo portato avanti una campagna social per avvicinare gli studenti alle opportunità di stage e lavoro.' },
]

export default function NetworkPage() {
  return (
    <main>
      {/* Intestazione */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 newspaper-headline tracking-tighter text-white">
            Network
          </h1>
        </div>
      </section>

      {/* JE Italy */}
      <section className="py-16 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-4 mb-8 shadow-xl">
              <img src="/images/network/je-italy-logo.jpg" alt="Logo JE Italy" className="h-24 w-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mappa delle JE */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl animate-fade-in-left">
              <img
                src="/images/network/mappa-je.jpg"
                alt="Mappa delle Junior Enterprise italiane del network JE Italy"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Testo sul network */}
            <div className="animate-fade-in-right">
              <p className="text-white text-xl leading-relaxed font-light mb-10">
                JEIns Consulting è parte di JE Italy, la confederazione che riunisce le oltre 35 Junior Enterprise italiane: associazioni senza scopo di lucro costituite da studenti universitari che realizzano progetti di consulenza per imprese e istituzioni. Facciamo parte della rete della Lombardia, e dal confronto con le altre Junior Enterprise prendiamo metodi, formazione e occasioni di collaborazione.
              </p>
              <a
                href={JE_ITALY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                Scopri la rete JE Italy →
              </a>
            </div>
          </div>

          {/* Foto di gruppo */}
          <div className="mt-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up">
            <img
              src="/images/network/foto-gruppo-je-italy.jpg"
              alt="Foto di gruppo con le Junior Enterprise di JE Italy"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="py-32 relative border-t border-white/5 mt-16">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold newspaper-headline text-white mb-6 animate-fade-in-up">
            Partner
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-16">
            Tramite formazioni, eventi e progetti collaboriamo con realtà che condividono il nostro obiettivo di avvicinare studenti e mondo del lavoro.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, i) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl h-48 flex items-center justify-center p-8 shadow-xl hover-lift">
                  <img src={partner.image} alt={`Logo ${partner.name}`} className="max-h-full max-w-full object-contain" />
                </div>
                {partner.description && (
                  <p className="text-neutral-400 font-light leading-relaxed">{partner.description}</p>
                )}
                <span className="text-insubria-400 text-sm font-medium group-hover:text-white transition-colors">
                  Visita il sito di {partner.name} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
