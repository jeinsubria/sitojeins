'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Save } from 'lucide-react'

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
  initialPreferences?: CookiePreferences
}

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  onSave,
  initialPreferences,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    initialPreferences || defaultPreferences
  )
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (initialPreferences) setPreferences(initialPreferences)
  }, [initialPreferences])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(preferences)
      onClose()
    } catch (error) {
      console.error('Errore nel salvataggio delle preferenze:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  const categories = [
    {
      key: 'necessary' as const,
      label: 'Cookie Necessari',
      description: 'Essenziali per il funzionamento del sito. Non possono essere disattivati.',
      examples: 'Autenticazione, sicurezza, preferenze di base',
      locked: true,
    },
    {
      key: 'analytics' as const,
      label: 'Cookie Analitici',
      description: 'Ci aiutano a capire come i visitatori interagiscono con il sito.',
      examples: 'Statistiche di navigazione, comportamento utente',
      locked: false,
    },
    {
      key: 'marketing' as const,
      label: 'Cookie di Marketing',
      description: 'Utilizzati per mostrare contenuti e annunci più rilevanti.',
      examples: 'Tracciamento pubblicitario, remarketing',
      locked: false,
    },
    {
      key: 'functional' as const,
      label: 'Cookie Funzionali',
      description: 'Permettono al sito di ricordare le tue scelte per una migliore esperienza.',
      examples: 'Preferenze di lingua, impostazioni di visualizzazione',
      locked: false,
    },
  ]

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">

        {/* Header */}
        <div className="border-b border-white/10 p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-insubria-500/10 border border-insubria-500/20 p-2.5 rounded-xl">
              <Cookie className="text-insubria-400" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Preferenze Cookie</h2>
              <p className="text-xs text-neutral-500">Scegli quali cookie accettare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5 text-neutral-400 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-sm text-neutral-400 font-light leading-relaxed mb-4">
            Puoi scegliere quali categorie di cookie consentire. I cookie necessari sono sempre attivi perché il sito non può funzionare senza di essi.
          </p>

          {categories.map(cat => (
            <div
              key={cat.key}
              className={`rounded-xl p-4 border transition-colors ${
                cat.locked
                  ? 'border-insubria-500/20 bg-insubria-500/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold mb-1 ${cat.locked ? 'text-insubria-400' : 'text-white'}`}>
                    {cat.label}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{cat.description}</p>
                  <p className="text-xs text-neutral-600 mt-1">{cat.examples}</p>
                </div>

                {/* Toggle */}
                <div className="shrink-0 mt-0.5">
                  {cat.locked ? (
                    <div className="relative inline-flex items-center h-6 w-11 bg-insubria-500 rounded-full opacity-60 cursor-not-allowed">
                      <span className="inline-block h-4 w-4 bg-white rounded-full translate-x-6 shadow" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleToggle(cat.key)}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-insubria-500 focus:ring-offset-2 focus:ring-offset-neutral-900 ${
                        preferences[cat.key] ? 'bg-insubria-500' : 'bg-white/10'
                      }`}
                      aria-label={`Toggle ${cat.label}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 bg-white rounded-full shadow transition-transform ${
                          preferences[cat.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-1 text-xs">
            <a href="/privacy" className="text-insubria-400 hover:text-white transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
            <a href="/cookie-policy" className="text-insubria-400 hover:text-white transition-colors underline underline-offset-2">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-5 flex flex-col sm:flex-row gap-3 justify-between shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setPreferences({ necessary: true, analytics: true, marketing: true, functional: true })}
              className="px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
            >
              Accetta tutti
            </button>
            <button
              onClick={() => setPreferences({ necessary: true, analytics: false, marketing: false, functional: false })}
              className="px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
            >
              Rifiuta tutti
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 bg-insubria-500 hover:bg-insubria-600 text-white rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Salvataggio...' : 'Salva preferenze'}
          </button>
        </div>
      </div>
    </div>
  )
}
