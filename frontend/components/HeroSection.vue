<template>
  <section id="hero-section" class="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-light pointer-events-none"></div>
    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2310b981&quot; fill-opacity=&quot;0.6&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    <!-- Green radial glow -->
    <div class="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-24 pb-16 sm:pt-32 sm:pb-28">

      <!--
        DESKTOP: classic 2-col (text | image)
        MOBILE:  badges → title → IMAGE → price → CTA → trust
      -->
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

        <!-- ===== Text top (mobile) / Left col (desktop) ===== -->
        <div class="text-center lg:text-left">

          <!-- Social proof badge -->
          <div class="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4">
            <span class="flex h-2 w-2 relative">
              <span class="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span class="text-xs sm:text-sm font-medium text-brand">+2 000 sportifs conquis</span>
          </div>

          <!-- Live viewers -->
          <div class="mb-4 sm:mb-8">
            <LiveViewers />
          </div>

          <!-- H1 -->
          <h1 class="font-display font-black text-[1.75rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl sm:leading-[1.05] tracking-tight text-white mb-5 sm:mb-6">
            Plus Jamais Les Mains
            <span class="relative">
              <span class="hero-gradient-text">Encombrees</span>
              <svg class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="hero-wave" d="M2 8C30 3 70 2 100 5C130 8 170 9 198 4" stroke="url(#waveGrad)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.6" />
                    <stop offset="50%" stop-color="#34d399" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#10b981" stop-opacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p class="text-sm sm:text-lg text-gray-400 mb-5 sm:mb-6 max-w-md mx-auto lg:mx-0">
            Avec ClipBag, clipse ton sac partout en salle, en rando, au quotidien.
          </p>

          <!-- Description — hidden on mobile to save space, image speaks louder -->
          <p class="hidden sm:block text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Le sac magnetique qui se fixe en un clic sur toute surface metallique. Ultra leger, indestructible, indispensable.
          </p>

          <!-- ===== PRODUCT IMAGE — MOBILE ONLY (between title and price) ===== -->
          <div class="lg:hidden relative flex items-center justify-center mb-6">
            <div class="absolute inset-0 bg-brand/10 rounded-full blur-[60px] scale-75"></div>
            <div class="relative w-full max-w-[300px] mx-auto motion-safe:animate-float">
              <img
                :src="heroImage"
                alt="ClipBag Sac Magnetique pour Bouteille"
                class="w-full rounded-3xl shadow-2xl shadow-black/40 aspect-square object-cover"
                width="600"
                height="600"
                fetchpriority="high"
                loading="eager"
              />
              <!-- Badge overlay -->
              <div class="absolute bottom-3 left-3 bg-surface-light/90 backdrop-blur-sm border border-surface-lighter rounded-xl p-2.5 shadow-xl">
                <div class="flex items-center gap-2">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-[10px] font-bold text-brand">T</div>
                    <div class="w-6 h-6 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-[10px] font-bold text-brand">C</div>
                    <div class="w-6 h-6 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-[10px] font-bold text-brand">M</div>
                  </div>
                  <div>
                    <div class="flex items-center gap-0.5">
                      <svg v-for="s in 5" :key="s" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="text-[10px] text-gray-400 mt-0.5">4.9/5 (2 000+ avis)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Price display -->
          <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
            <span class="text-gray-500 line-through text-lg sm:text-xl">49,99&euro;</span>
            <span class="font-display font-black text-3xl sm:text-5xl text-brand">29,99&euro;</span>
            <span class="bg-red-500/15 text-red-400 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg">-40%</span>
          </div>

          <!-- CTA button -->
          <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
            <button
              class="group w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-display font-bold text-base sm:text-lg py-4 px-10 rounded-2xl cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface shadow-xl shadow-brand/25 hover:shadow-brand/40 hover:scale-105 flex items-center justify-center gap-3"
              @click="scrollToOrder"
            >
              Commander Maintenant
              <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <!-- Trust indicators -->
          <div class="grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-8 mt-8 sm:mt-10 justify-center lg:justify-start">
            <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-400">
              <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-[11px] sm:text-sm text-center leading-tight">Livraison gratuite</span>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-400">
              <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-[11px] sm:text-sm text-center leading-tight">Garantie 30 jours</span>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-400">
              <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-[11px] sm:text-sm text-center leading-tight">Paiement securise</span>
            </div>
          </div>
        </div>

        <!-- ===== Right col: Product image — DESKTOP ONLY ===== -->
        <div class="hidden lg:flex relative items-center justify-center">
          <div class="absolute inset-0 bg-brand/10 rounded-full blur-[80px] scale-75"></div>
          <div class="relative w-full max-w-lg xl:max-w-xl mx-auto motion-safe:animate-float">
            <img
              :src="heroImage"
              alt="ClipBag Sac Magnetique pour Bouteille"
              class="w-full rounded-3xl shadow-2xl shadow-black/40 aspect-square object-cover"
              width="600"
              height="600"
              fetchpriority="high"
              loading="eager"
            />
            <!-- Badge overlay -->
            <div class="absolute bottom-4 left-4 bg-surface-light/90 backdrop-blur-sm border border-surface-lighter rounded-2xl p-4 shadow-xl">
              <div class="flex items-center gap-3">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-xs font-bold text-brand">T</div>
                  <div class="w-8 h-8 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-xs font-bold text-brand">C</div>
                  <div class="w-8 h-8 rounded-full bg-brand/20 border-2 border-surface-light flex items-center justify-center text-xs font-bold text-brand">M</div>
                </div>
                <div>
                  <div class="flex items-center gap-0.5">
                    <svg v-for="s in 5" :key="s" class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p class="text-xs text-gray-400 mt-0.5">4.9/5 (2 000+ avis)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <button
      class="absolute bottom-3 sm:bottom-8 inset-x-0 z-30 flex flex-col items-center gap-1 text-gray-600 motion-safe:animate-bounce cursor-pointer hover:text-brand transition-colors duration-200 focus:outline-none"
      aria-label="Decouvrir le produit"
      @click="scrollToDiscover"
    >
      <span class="text-[10px] sm:text-xs uppercase tracking-widest font-medium">Decouvrir</span>
      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
const productStore = useProductStore()
const heroImage = computed(() => productStore.product?.images[0] || '/images/product/product-7.png')

const scrollToOrder = () => {
  const el = document.getElementById('order-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToDiscover = () => {
  const el = document.getElementById('problem-section') || document.getElementById('features-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ---- Animated gradient text on "Encombrees" ---- */
.hero-gradient-text {
  background: linear-gradient(
    90deg,
    #10b981 0%,
    #6ee7b7 25%,
    #34d399 50%,
    #6ee7b7 75%,
    #10b981 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* ---- Live wave underline ---- */
.hero-wave {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: wave-draw 1.2s ease-out 0.5s forwards, wave-float 3s ease-in-out 1.7s infinite;
}

@keyframes wave-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes wave-float {
  0%, 100% { d: path("M2 8C30 3 70 2 100 5C130 8 170 9 198 4"); }
  50% { d: path("M2 5C30 9 70 8 100 4C130 2 170 3 198 7"); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-gradient-text { animation: none; }
  .hero-wave { animation: none; stroke-dashoffset: 0; }
}
</style>
