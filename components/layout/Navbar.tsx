'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Stati per la pillola hover
  const [pillProps, setPillProps] = useState({ x: 0, width: 0, opacity: 0 })
  const navContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contatti', href: '/contatti' },
  ]

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navContainerRef.current) return
    const el = e.currentTarget
    const container = navContainerRef.current
    
    // Calcoliamo la posizione relativa rispetto al container
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    setPillProps({
      x: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1
    })
  }

  const handleMouseLeave = () => {
    setPillProps((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 transition-all duration-300">
      <nav className={`transition-all duration-500 rounded-full border border-white/10 backdrop-blur-xl ${scrolled ? 'bg-neutral-950/80 shadow-glass' : 'bg-neutral-950/40'}`}>
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo-jeins.png" 
                alt="JEIns Logo" 
                className="h-9 w-auto rounded-lg"
              />
            </Link>

            {/* Desktop Navigation */}
            <div 
              ref={navContainerRef}
              className="hidden md:flex items-center space-x-1 relative h-full py-2"
              onMouseLeave={handleMouseLeave}
            >
              {/* Effetto Slide Condiviso (Pillola) */}
              <motion.div
                className="absolute top-2 bottom-2 left-0 bg-white/10 rounded-full pointer-events-none"
                initial={false}
                animate={{
                  x: pillProps.x,
                  width: pillProps.width,
                  opacity: pillProps.opacity
                }}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  stiffness: 150,
                  damping: 15,
                  duration: 0.4 
                }}
              />

              {navItems.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div key={item.name} whileTap={{ scale: 0.95 }} className="h-full flex items-center">
                    <Link
                      href={item.href}
                      onMouseEnter={handleMouseEnter}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full z-10 ${
                        isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {isActive && pillProps.opacity === 0 && (
                        <motion.span 
                          layoutId="active-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-insubria-500 rounded-full" 
                        />
                      )}
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
              
              <Link
                href="/contatti"
                className="ml-4 bg-insubria-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-insubria-400 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,188,141,0.3)] z-10 relative"
              >
                Preventivo
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-400 hover:text-white transition-colors p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contatti"
                className="block w-full text-center mt-4 bg-insubria-500 text-white px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-insubria-400 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Richiedi un preventivo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
