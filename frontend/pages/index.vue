<template>
  <div>
    <HeroSection />
    <ExplanationSection />
    <ProblemSection />
    <FeaturesSection />
    <GallerySection />
    <TestimonialsSection />
    <SocialVideoSection />
    <FaqSection />

    <!-- Floating mobile CTA -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <button
        v-if="showFloatingCta"
        class="fixed bottom-6 left-4 right-4 z-40 sm:hidden bg-accent hover:bg-accent-hover active:scale-[0.98] text-text font-display font-bold text-base uppercase tracking-wider py-3.5 rounded-xl shadow-[0_4px_20px_rgba(169,249,85,0.35)] cursor-pointer transition-all duration-200 flex items-center justify-center gap-3"
        @click="scrollToOrder"
      >
        Commander - 29,99&euro;
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </Transition>

    <!-- Purchase notification toast -->
    <PurchaseNotification />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ClipBag - Le Sac Magnétique pour Bouteille | Libérez Vos Mains',
  ogTitle: 'ClipBag - Le Sac Magnétique pour Bouteille',
  description: 'Le sac magnétique révolutionnaire pour vos bouteilles d\'eau. Fixation instantanée, ultra léger (120g), compatible toutes bouteilles. Livraison gratuite. -40% en ce moment.',
  ogDescription: 'Plus jamais les mains encombrées pendant le sport. Découvrez le sac magnétique ClipBag - Fixation instantanée, 120g seulement. 29,99 EUR au lieu de 49,99 EUR.',
  ogImage: 'https://clipbag.shop/og.png',
  ogType: 'website',
  ogLocale: 'fr_FR',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'fr',
    class: 'scroll-smooth',
  },
  link: [{ rel: 'canonical', href: 'https://clipbag.shop' }],
})

const productStore = useProductStore()
const { track: fbTrack } = useMetaPixel()

await callOnce(async () => {
  try {
    await productStore.fetchProduct()
  } catch (e) {
    console.error('[SSR] Failed to fetch product:', e)
  }
})

onMounted(async () => {
  if (!productStore.product) {
    try {
      await productStore.fetchProduct()
    } catch (e) {
      console.error('[Client] Failed to fetch product:', e)
    }
  }
  const p = productStore.product
  if (p) {
    fbTrack('ViewContent', {
      content_name: p.name,
      content_ids: [p.id],
      content_type: 'product',
      value: p.price,
      currency: 'EUR',
    })
  }
})

const showFloatingCta = ref(false)

const scrollToOrder = () => {
  const el = document.getElementById('order-section') || document.getElementById('hero-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const handleScroll = () => {
    const hero = document.getElementById('hero-section')
    if (!hero) return
    const heroBottom = hero.getBoundingClientRect().bottom
    showFloatingCta.value = heroBottom < 0
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale'
  )

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    animatedElements.forEach((el) => observer.observe(el))
  }
})
</script>
