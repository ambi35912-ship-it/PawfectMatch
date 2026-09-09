/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f2',
          100: '#ffe8e2',
          200: '#ffd5c8',
          300: '#ffb5a1',
          400: '#ff8566',
          500: '#ff6542',
          600: '#e54521',
          700: '#c03314',
          800: '#992c15',
          900: '#7e2917',
        },
        warm: {
          50: '#FAF8F5',
          100: '#F4F0EA',
          200: '#EAE4D9',
          300: '#DDD3C4',
          400: '#C5B5A0',
          500: '#AB967F',
        },
        brand: {
          dark: '#0F172A',
          muted: '#64748B',
          light: '#F8FAFC',
          card: '#FFFFFF',
          accent: '#FF6542',
          gold: '#F59E0B',
          sage: '#10B981',
          sky: '#0EA5E9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 40px -4px rgba(15, 23, 42, 0.12), 0 8px 16px -2px rgba(15, 23, 42, 0.06)',
        'float': '0 24px 48px -12px rgba(255, 101, 66, 0.25)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
