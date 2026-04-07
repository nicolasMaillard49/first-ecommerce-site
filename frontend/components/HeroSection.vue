<template>
  <section id="hero-section" class="bg-white pt-20 pb-8 sm:pt-28 sm:pb-16 relative overflow-hidden">
    <!-- Subtle geometric accent -->
    <div class="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/[0.04] rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center">

        <!-- LEFT: Product image -->
        <div class="relative mb-10 lg:mb-0 hero-image-in">
          <!-- Soft accent backdrop -->
          <div class="absolute -inset-4 sm:-inset-6 bg-surface-alt rounded-[2rem] -z-10"></div>

          <div class="relative group">
            <img
              :src="heroImage"
              alt="ClipBag Sac Magnétique pour Bouteille"
              class="w-full rounded-2xl object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              fetchpriority="high"
              loading="eager"
            />
            <!-- Floating -40% badge on image -->
            <div class="absolute top-3 right-3 sm:top-5 sm:right-5 bg-urgency text-white text-xs sm:text-sm font-display font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
              -40%
            </div>
          </div>
        </div>

        <!-- RIGHT: Product details -->
        <div class="text-center lg:text-left">
          <!-- Social proof row -->
          <div class="flex items-center justify-center lg:justify-start gap-3 mb-5 hero-fade-in flex-wrap" style="animation-delay: 0.1s">
            <div class="flex items-center gap-0.5">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-text-muted text-sm font-medium">200 avis</span>
            <span class="w-1 h-1 rounded-full bg-text-muted/40"></span>
            <!-- Trustpilot badge -->
            <a
              href="https://fr.trustpilot.com/review/clipbag.shop"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 bg-surface-alt hover:bg-surface-alt/80 px-2.5 py-1 rounded-full cursor-pointer transition-colors duration-200"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 1.5l2.76 8.5h8.94l-7.23 5.26 2.76 8.5L12 18.5l-7.23 5.26 2.76-8.5L.3 10h8.94L12 1.5z" fill="#00B67A" />
              </svg>
              <span class="text-xs font-display font-semibold text-text">4.5</span>
              <span class="text-xs text-text-muted">Trustpilot</span>
            </a>
            <span class="w-1 h-1 rounded-full bg-text-muted/40"></span>
            <LiveViewers />
          </div>

          <!-- H1 -->
          <h1 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] uppercase tracking-tight text-text leading-[1.15] mb-5 hero-fade-in" style="animation-delay: 0.2s">
            Plus Jamais<br class="sm:hidden" /> Les Mains
            <span class="relative inline-block">
              <span class="text-accent-dark">Encombrées</span>
              <span class="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"></span>
            </span>
          </h1>

          <!-- Description -->
          <p class="text-text-muted text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed hero-fade-in" style="animation-delay: 0.3s">
            Clipse ton sac partout &mdash; en salle, en rando, au quotidien. Fixation magnétique instantanée, ultra léger (120g), compatible toutes bouteilles.
          </p>

          <!-- Price block -->
          <div class="flex items-end justify-center lg:justify-start gap-3 mb-8 hero-fade-in" style="animation-delay: 0.4s">
            <div class="flex flex-col items-start">
              <span class="font-display text-text-muted line-through text-base">49,99&euro;</span>
              <span class="font-display font-bold text-[28px] sm:text-[34px] text-text tracking-tight">29,99&euro;</span>
            </div>
            <div class="flex flex-col items-start gap-1 pb-1">
              <span class="bg-urgency text-white text-xs font-display font-semibold px-2.5 py-1 rounded-full">-40%</span>
              <span class="text-accent-dark text-xs font-display font-semibold">Offre limitée</span>
            </div>
          </div>

          <!-- CTA -->
          <div class="hero-fade-in" style="animation-delay: 0.5s">
            <button
              class="w-full sm:w-auto bg-accent hover:bg-accent-hover active:scale-[0.98] text-text font-display font-bold text-base sm:text-lg uppercase tracking-wider py-3.5 sm:py-4 px-12 rounded-pill cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(169,249,85,0.35)] hover:shadow-[0_6px_30px_rgba(169,249,85,0.45)]"
              @click="scrollToOrder"
            >
              Commander
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <!-- Trust strip -->
          <div class="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 mt-8 pt-6 border-t border-border hero-fade-in" style="animation-delay: 0.6s">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
              <span class="text-xs sm:text-sm text-text-muted whitespace-nowrap">Livraison gratuite</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
              <span class="text-xs sm:text-sm text-text-muted whitespace-nowrap">Garantie 30j</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
              <span class="text-xs sm:text-sm text-text-muted whitespace-nowrap">Paiement sécurisé</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll hint -->
    <button
      class="hidden sm:flex absolute bottom-4 inset-x-0 flex-col items-center gap-1 text-text-muted/50 hover:text-text-muted transition-colors cursor-pointer focus:outline-none"
      aria-label="Découvrir"
      @click="scrollToDiscover"
    >
      <span class="text-[10px] uppercase tracking-[0.2em] font-medium">Découvrir</span>
      <svg class="w-4 h-4 motion-safe:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
const productStore = useProductStore()
const heroImage = computed(() => productStore.product?.images[0] || '/images/product/product-1.png')

const scrollToOrder = () => {
  const el = document.getElementById('order-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToDiscover = () => {
  const el = document.getElementById('explanation-section') || document.getElementById('features-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero-fade-in {
  opacity: 0;
  animation: hero-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-image-in {
  opacity: 0;
  animation: hero-image-enter 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
}

@keyframes hero-image-enter {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade-in,
  .hero-image-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
