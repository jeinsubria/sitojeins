import { prisma } from '@/lib/prisma'

/**
 * Recupera tutti i dati necessari per renderizzare la Home Page.
 * Spostare questa logica fuori dal componente permette di isolare
 * l'accesso ai dati (Data Access Layer) e facilita i test.
 */
export async function getHomeData() {
  try {
    // Risolviamo prima le Promise indipendenti per ottimizzare i tempi
    await prisma.homeSection.updateMany({
      where: {
        name: 'hero',
        title: "Mostriamo il valore degli studenti dell'Insubria",
      },
      data: {
        title: "La realtà che unisce il mondo accademico a quello del lavoro",
      },
    })

    const [services, projects, sections] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 3
      }),
      prisma.project.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 6
      }),
      prisma.homeSection.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      })
    ])

    const stats = {
      projects: 10,
      services: 6,
      team: 35,
      applications: 100,
    }

    const fallbackServices = [
      { id: '1', title: 'Business Plan', description: 'Analizziamo il contesto, definiamo il modello di business e costruiamo un documento strategico utile a orientare scelte, investimenti e sviluppo.', sector: 'Business' },
      { id: '2', title: 'Comunicazione & Marketing Compass', description: 'Studiamo comunicazione, mercato e competitor per aiutarti a definire un posizionamento più chiaro, coerente ed efficace.', sector: 'Marketing' },
      { id: '3', title: 'E-commerce', description: 'Progettiamo soluzioni per la vendita online funzionali, semplici da usare e sostenibili, pensate per aprire o rafforzare un canale digitale.', sector: 'Digital' }
    ];

    // Se il database è vuoto o fallisce, usiamo i fallback per non rompere il design
    return {
      services: services.length > 0 ? services : fallbackServices,
      projects,
      stats,
      sections: sections
    }
  } catch (error) {
    console.error('Errore durante il recupero dei dati della home:', error)
    
    // Ritorniamo fallback values realistici se il DB MongoDB è giù (DNS resolution error)
    return {
      services: [
        { id: '1', title: 'Business Plan', description: 'Analizziamo il contesto, definiamo il modello di business e costruiamo un documento strategico utile a orientare scelte, investimenti e sviluppo.', sector: 'Business' },
        { id: '2', title: 'Comunicazione & Marketing Compass', description: 'Studiamo comunicazione, mercato e competitor per aiutarti a definire un posizionamento più chiaro, coerente ed efficace.', sector: 'Marketing' },
        { id: '3', title: 'E-commerce', description: 'Progettiamo soluzioni per la vendita online funzionali, semplici da usare e sostenibili, pensate per aprire o rafforzare un canale digitale.', sector: 'Digital' }
      ],
      projects: [],
      stats: { projects: 10, services: 6, team: 35, applications: 100 },
      sections: []
    }
  }
}
