module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'insubria': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Accent vibrante (tipo Emerald)
          600: '#007161', // Brand Originale
          700: '#047857',
          800: '#004036',
          900: '#022c22',
          950: '#011812',
        },
        'neutral': {
          100: '#f5f5f5',
          500: '#737373',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a', // Sfondo principale Dark Mode
        }
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'premium': '0 10px 30px -10px rgba(16, 185, 129, 0.15)', // Neon green glow
      },
      backgroundImage: {
        'halftone': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        'gradient-insubria': 'linear-gradient(135deg, rgba(0, 113, 97, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #022c22 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slide-in-bottom': 'slideInFromBottom 0.8s ease-out forwards',
        'slide-in-top': 'slideInFromTop 0.8s ease-out forwards',
        'zoom-in': 'zoomIn 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}
