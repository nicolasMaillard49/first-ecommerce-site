<template>
  <div>
    <HeroSection />
    <ProblemSection />
    <FeaturesSection />
    <GallerySection />
    <TestimonialsSection />
    <SocialVideoSection />
    <OrderSection />
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
        class="fixed bottom-6 left-4 right-4 z-40 sm:hidden bg-brand hover:bg-brand-dark text-white font-display font-bold text-base py-4 rounded-2xl shadow-lg shadow-brand/30 cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2"
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
  title: 'ClipBag - Le Sac Magnetique pour Bouteille | Liberez Vos Mains',
  ogTitle: 'ClipBag - Le Sac Magnetique pour Bouteille',
  description: 'Le sac magnetique revolutionnaire pour vos bouteilles d\'eau. Fixation instantanee, ultra leger (120g), compatible toutes bouteilles. Livraison gratuite. -40% en ce moment.',
  ogDescription: 'Plus jamais les mains encombrees pendant le sport. Decouvrez le sac magnetique ClipBag - Fixation instantanee, 120g seulement. 29,99 EUR au lieu de 49,99 EUR.',
  ogImage: 'https://clipbag.shop/images/product/product-1.jpg',
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

// Retry on client if SSR fetch failed
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
  const el = document.getElementById('order-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Floating CTA visibility
  const handleScroll = () => {
    const hero = document.getElementById('hero-section')
    const order = document.getElementById('order-section')
    if (!hero || !order) return

    const heroBottom = hero.getBoundingClientRect().bottom
    const orderTop = order.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    showFloatingCta.value = heroBottom < 0 && orderTop > windowHeight * 0.5
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Scroll-triggered animation observer
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    animatedElements.forEach((el) => observer.observe(el))
  }
})
</script>
