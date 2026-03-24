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
      },
    },
  },
} satisfies Config
