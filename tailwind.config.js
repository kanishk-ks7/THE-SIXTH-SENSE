/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          DEFAULT: '#06b6d4',
          accent: '#00F0FF',
        },
        volt: {
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          DEFAULT: '#CCFF00',
          lime: '#00F076',
          dark: '#65a30d',
        },
        dark: {
          pure: '#05070B',
          bg: '#080C14',
          surface: '#0E1524',
          card: '#121A2D',
          cardHover: '#17223B',
          border: '#1E2D4A',
          borderLight: '#2A3C60',
          muted: '#2A3C60',
        },
        sport: {
          football: '#10B981',
          cricket: '#F59E0B',
          basketball: '#F97316',
          athletics: '#EF4444',
          volleyball: '#8B5CF6',
          badminton: '#06B6D4',
          tennis: '#84CC16',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 24px -2px rgba(6, 182, 212, 0.45)',
        'glow-cyan': '0 0 30px -4px rgba(0, 240, 255, 0.35)',
        'glow-volt': '0 0 24px -2px rgba(204, 255, 0, 0.4)',
        'glow-lime': '0 0 24px -2px rgba(0, 240, 118, 0.4)',
        'glow-sm': '0 0 12px -2px rgba(6, 182, 212, 0.3)',
        'glow-volt-sm': '0 0 12px -2px rgba(204, 255, 0, 0.3)',
        'sport-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'sport-card-hover': '0 20px 40px -15px rgba(0, 240, 255, 0.15)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}

