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
          400: '#a3e635',
          500: '#84cc16',
          DEFAULT: '#CCFF00',
          dark: '#65a30d',
        },
        dark: {
          bg: '#080C14',
          surface: '#0E1524',
          card: '#131C31',
          border: '#1E2D4A',
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
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'glow-volt': '0 0 20px -3px rgba(204, 255, 0, 0.35)',
        'glow-sm': '0 0 10px -2px rgba(6, 182, 212, 0.25)',
        'sport-card': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
