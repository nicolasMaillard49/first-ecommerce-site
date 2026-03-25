export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api',
      siteUrl: 'https://geestock.fr',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Geestock - Sac Magnétique pour Bouteille | Livraison Gratuite',
      meta: [
        { name: 'description', content: 'Le sac magnétique révolutionnaire pour vos bouteilles. Fixation instantanée, ultra léger (120g), compatible toutes bouteilles. -40% : 29,99€ au lieu de 49,99€. Livraison gratuite en France.' },
        { name: 'keywords', content: 'geestock, sac magnétique bouteille, porte bouteille sport, accessoire sport, porte gourde magnétique' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:site_name', content: 'Geestock' },
        { property: 'og:title', content: 'Geestock - Le Sac Magnétique pour Bouteille' },
        { property: 'og:description', content: 'Libérez vos mains pendant le sport. Fixation magnétique instantanée, ultra léger. -40% : 29,99€.' },
        { property: 'og:image', content: 'https://geestock.fr/images/product/product-1.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Geestock - Le Sac Magnétique pour Bouteille' },
        { name: 'twitter:description', content: 'Libérez vos mains pendant le sport. -40% : 29,99€. Livraison gratuite.' },
        { name: 'theme-color', content: '#10b981' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800;900&display=swap' },
        { rel: 'canonical', href: 'https://geestock.fr' },
      ],
    },
  },
  routeRules: {
    '/': { swr: 3600 },
    '/mentions-legales': { swr: 86400 },
    '/cgv': { swr: 86400 },
    '/confidentialite': { swr: 86400 },
    '/admin/**': { ssr: false },
  },
  devServer: {
    port: 4000,
  },
  nitro: {
    compressPublicAssets: true,
  },
})
