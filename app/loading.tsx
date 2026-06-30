export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Spinner animato */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-insubria-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-insubria-600 border-t-transparent animate-spin"></div>
        </div>
        
        {/* Testo di caricamento */}
        <h2 className="mt-6 text-xl font-semibold text-insubria-700 animate-pulse font-montserrat">
          Caricamento...
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Preparazione dei contenuti in corso
        </p>
      </div>
    </div>
  )
}
