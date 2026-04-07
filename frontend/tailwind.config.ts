import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
          neon: '#00FF88',
        },
        surface: {
          DEFAULT: '#0a0a0a',
          light: '#171717',
          lighter: '#262626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        hero: ['Horizon', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)',
        'neon-sm': '0 0 10px rgba(0, 255, 136, 0.2)',
        'neon-lg': '0 0 30px rgba(0, 255, 136, 0.4), 0 0 80px rgba(0, 255, 136, 0.15)',
      },
    },
  },
} satisfies Config
