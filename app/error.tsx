'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log dell'errore ad un servizio di monitoraggio (opzionale)
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-insubria-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-xl w-full text-center border-2 border-insubria-200">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-insubria-700 mb-4 font-montserrat">
          Ops! Qualcosa è andato storto
        </h1>
        
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Ci scusiamo per l'inconveniente, ma sembra ci sia stato un errore di comunicazione con i nostri server o il database. Il nostro team tecnico è stato informato.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-insubria-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-insubria-700 transition-colors shadow-sm"
          >
            Riprova
          </button>
          <a
            href="/"
            className="bg-white border-2 border-insubria-600 text-insubria-600 px-6 py-3 rounded-2xl font-semibold hover:bg-insubria-50 transition-colors"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  )
}
