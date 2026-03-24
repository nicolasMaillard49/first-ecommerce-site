export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api',
    },
  },
  app: {
    head: {
      title: 'Geestock - Sac Magnétique pour Bouteille',
      meta: [
        { name: 'description', content: "Le sac magnétique révolutionnaire pour vos bouteilles d'eau. Libérez vos mains pendant le sport." },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800;900&display=swap' },
      ],
    },
  },
})
