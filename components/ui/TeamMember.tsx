interface TeamMemberProps {
  name: string
  role: string
  image?: string
  description?: string
}

export default function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="newspaper-card bg-neutral-950/40 p-6 text-center w-full h-full flex flex-col items-center">
      <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden group">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-24 h-24 rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal"
          />
        ) : (
          <span className="text-2xl font-bold text-insubria-500">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-1">
        {name}
      </h3>
      
      <p className="text-insubria-500 font-medium mb-3 text-sm tracking-wide uppercase">
        {role}
      </p>
      
      {description && (
        <p className="text-neutral-400 text-sm font-light leading-relaxed flex-grow">
          {description}
        </p>
      )}
    </div>
  )
}
