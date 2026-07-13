import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return contacts
  } catch {
    return []
  }
}

const FALLBACK_CONTACTS = {
  email:     'jeinsubria@gmail.com',
  phone:     '+39 3298999219',
  address:   'Via Stefano da Seregno n.31, 20831 Seregno (MB)',
  vatNumber: '14402760962',
  instagram: 'https://www.instagram.com/jeins.consulting/',
  linkedin:  'https://it.linkedin.com/company/jeins',
}

export default async function Footer() {
  const contacts = await getContacts()

  // Organizza i contatti per tipo, con fallback se il DB è offline
  const emailContact   = contacts.find(c => c.type === 'email')
  const phoneContact   = contacts.find(c => c.type === 'phone')
  const addressContact = contacts.find(c => c.type === 'address')
  const instagramContact = contacts.find(c => c.type === 'instagram')
  const linkedinContact  = contacts.find(c => c.type === 'linkedin')

  const email    = emailContact?.value    || FALLBACK_CONTACTS.email
  const phone    = phoneContact?.value    || FALLBACK_CONTACTS.phone
  const address  = addressContact?.value  || FALLBACK_CONTACTS.address
  const instagram = instagramContact?.value || FALLBACK_CONTACTS.instagram
  const linkedin  = linkedinContact?.value  || FALLBACK_CONTACTS.linkedin

  return (
    <footer className="bg-neutral-950 border-t border-white/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-insubria-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-insubria-500 mt-0.5 shrink-0" />
                <span className="text-neutral-400 font-medium break-all">{email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-insubria-500 shrink-0" />
                <span className="text-neutral-400 font-medium">{phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-insubria-500 mt-0.5 shrink-0" />
                <span className="text-neutral-400 font-medium">{address}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Seguici</h3>
            <div className="flex space-x-4">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-95">
                <Instagram size={18} />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-95">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Link rapidi */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Link rapidi</h3>
            <div className="space-y-2">
              <Link href="/chi-siamo" className="block text-neutral-400 hover:text-white transition-colors">
                Chi siamo
              </Link>
              <Link href="/servizi" className="block text-neutral-400 hover:text-white transition-colors">
                Servizi
              </Link>
              <Link href="/recruitment" className="block text-neutral-400 hover:text-white transition-colors">
                Recruitment
              </Link>
              <Link href="/blog" className="block text-neutral-400 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="block text-neutral-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/terms" className="block text-neutral-400 hover:text-white transition-colors">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center space-y-3">
          <div className="text-neutral-400 text-sm space-y-1">
            <p>
              <span className="text-neutral-300 font-medium">Sede legale:</span>{' '}
              {address}
            </p>
            <p>
              <span className="text-neutral-300 font-medium">P.IVA:</span>{' '}
              {FALLBACK_CONTACTS.vatNumber}
            </p>
          </div>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} JUNIOR ENTERPRISE DELL&apos;UNIVERSITA&apos; DEGLI STUDI DELL&apos;INSUBRIA. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
