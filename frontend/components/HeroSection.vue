<template>
  <section id="hero-section" class="bg-white pt-20 pb-0 sm:pt-28 sm:pb-0 relative overflow-hidden lg:min-h-[80vh]">
    <!-- Subtle geometric accent -->
    <div class="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-accent/[0.04] rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:items-start">

        <!-- LEFT: Product gallery -->
        <div class="relative mb-8 lg:mb-0 hero-image-in">

          <!-- MOBILE: Native scroll carousel -->
          <div class="lg:hidden">
            <div
              ref="mobileScrollRef"
              class="gallery-scroll flex overflow-x-auto snap-x snap-mandatory"
              @scroll="onMobileScroll"
              @touchstart="pauseAutoplay"
              @touchend="resumeAutoplay"
            >
              <div
                v-for="(img, i) in productImages"
                :key="i"
                class="gallery-scroll__item flex-shrink-0 snap-center"
              >
                <img
                  :src="img"
                  alt="ClipBag Sac Magnétique pour Bouteille"
                  class="w-full h-full object-cover object-[center_55%] rounded-lg"
                  :fetchpriority="i === 0 ? 'high' : 'auto'"
                  :loading="i < 2 ? 'eager' : 'lazy'"
                />
              </div>
            </div>
            <!-- Thumbnails (mobile) -->
            <div class="flex items-center justify-center gap-2 mt-3 overflow-x-auto thumbnails-scroll px-4">
              <button
                v-for="(img, i) in productImages"
                :key="i"
                class="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                :class="i === currentImageIndex ? 'border-accent shadow-sm' : 'border-transparent opacity-50'"
                @click="goToImageMobile(i)"
              >
                <img
                  :src="img"
                  :alt="`ClipBag vue ${i + 1}`"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
            </div>
            <!-- Floating -40% badge (mobile) -->
            <div class="absolute top-3 right-7 bg-urgency text-white text-xs font-display font-semibold px-3 py-1.5 rounded-full shadow-lg z-10">
              -40%
            </div>
          </div>

          <!-- DESKTOP: Thumbnails left + main image -->
          <div class="hidden lg:flex lg:flex-row lg:gap-3">
            <div class="flex flex-col gap-2 overflow-y-auto thumbnails-scroll max-h-[70vh] w-[72px] flex-shrink-0">
              <button
                v-for="(img, i) in productImages"
                :key="i"
                class="flex-shrink-0 w-[64px] h-[64px] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                :class="i === currentImageIndex ? 'border-accent shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'"
                :aria-label="`Image ${i + 1}`"
                :aria-current="i === currentImageIndex"
                @click="goToImage(i)"
              >
                <img
                  :src="img"
                  :alt="`ClipBag vue ${i + 1}`"
                  class="w-full h-full object-contain rounded-sm"
                  loading="lazy"
                />
              </button>
            </div>

            <div
              class="relative group flex-1 cursor-pointer"
              @click="onDesktopClick"
            >
              <div class="gallery-main relative overflow-hidden rounded-lg bg-transparent">
                <div class="gallery-main__container relative w-full h-[70vh] max-h-[720px]">
                  <transition :name="carouselDirection">
                    <img
                      :key="currentImageIndex"
                      :src="productImages[currentImageIndex]"
                      alt="ClipBag Sac Magnétique pour Bouteille"
                      class="absolute -top-[2%] left-0 w-full h-[102%] rounded-lg object-contain"
                      fetchpriority="high"
                      loading="eager"
                    />
                  </transition>
                </div>
                <div class="absolute top-4 right-4 bg-urgency text-white text-sm font-display font-semibold px-4 py-2 rounded-full shadow-lg z-10">
                  -40%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Product info + Order form -->
        <div id="order-section" class="text-center lg:text-left min-w-0">

          <!-- Promo adbar -->
          <div class="adbar overflow-hidden mb-4 hero-fade-in" style="animation-delay: 0.05s">
            <div class="adbar__track">
              <div class="adbar__msg">
                ACHETEZ 2 &rarr; 24,99&euro; L'UNITÉ (ÉCONOMISEZ 10&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 3 &rarr; 22,99&euro; L'UNITÉ (ÉCONOMISEZ 21&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 4 &rarr; 20,99&euro; L'UNITÉ (ÉCONOMISEZ 36&euro;)
              </div>
              <div class="adbar__msg" aria-hidden="true">
                ACHETEZ 2 &rarr; 24,99&euro; L'UNITÉ (ÉCONOMISEZ 10&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 3 &rarr; 22,99&euro; L'UNITÉ (ÉCONOMISEZ 21&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 4 &rarr; 20,99&euro; L'UNITÉ (ÉCONOMISEZ 36&euro;)
              </div>
              <div class="adbar__msg" aria-hidden="true">
                ACHETEZ 2 &rarr; 24,99&euro; L'UNITÉ (ÉCONOMISEZ 10&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 3 &rarr; 22,99&euro; L'UNITÉ (ÉCONOMISEZ 21&euro;)
                <span class="adbar__sep">&bull;</span>
                ACHETEZ 4 &rarr; 20,99&euro; L'UNITÉ (ÉCONOMISEZ 36&euro;)
              </div>
            </div>
          </div>

          <!-- Social proof -->
          <div class="flex items-center justify-center lg:justify-start gap-2 mb-4 hero-fade-in flex-nowrap overflow-hidden" style="animation-delay: 0.1s">
            <div class="flex items-center gap-0.5 flex-shrink-0">
              <svg v-for="s in 5" :key="s" class="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-text-muted text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">200 avis</span>
            <span class="w-1 h-1 rounded-full bg-text-muted/40 flex-shrink-0"></span>
            <LiveViewers />
          </div>

          <!-- H1 -->
          <h1 class="font-display font-bold text-[22px] sm:text-[28px] lg:text-[34px] uppercase tracking-tight text-text leading-[1.1] mb-3 hero-fade-in whitespace-nowrap" style="animation-delay: 0.2s">
            Plus Jamais Les Mains
            <span class="relative inline-block">
              <span class="text-accent-dark">Encombrées</span>
              <span class="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"></span>
            </span>
          </h1>

          <!-- Description -->
          <p class="text-text-muted text-sm sm:text-base mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed hero-fade-in" style="animation-delay: 0.3s">
            Fixation magnétique instantanée, ultra léger (120g), compatible toutes bouteilles.
          </p>

          <!-- Product name + Pack selection -->
          <p class="text-text font-display font-semibold text-sm mb-2 hero-fade-in text-left" style="animation-delay: 0.33s">ClipBag :</p>
          <div class="mb-5 hero-fade-in" style="animation-delay: 0.35s">
            <div class="flex flex-col gap-2">
              <button
                v-for="pack in packs"
                :key="pack.name"
                :class="[
                  'relative flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 cursor-pointer focus:outline-none',
                  selectedPack === pack.name
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/30'
                ]"
                @click="selectPack(pack.name)"
              >
                <div class="flex items-center gap-2 flex-shrink-0 min-w-0">
                  <span :class="['w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0', selectedPack === pack.name ? 'border-accent-dark' : 'border-border']">
                    <span v-if="selectedPack === pack.name" class="w-1.5 h-1.5 rounded-full bg-accent-dark" />
                  </span>
                  <span class="text-text font-display font-semibold text-xs sm:text-sm whitespace-nowrap">{{ pack.label }}</span>
                  <span class="text-text-muted text-[10px] sm:text-xs whitespace-nowrap">{{ pack.qty }}x</span>
                  <span v-if="pack.badge" class="text-urgency text-[9px] sm:text-[10px] font-display font-bold uppercase whitespace-nowrap">{{ pack.badge }}</span>
                </div>
                <div class="flex items-baseline gap-1.5 flex-shrink-0">
                  <span v-if="pack.oldPriceDisplay" class="text-text-muted line-through text-[10px] sm:text-xs whitespace-nowrap">{{ pack.oldPriceDisplay }}</span>
                  <span class="text-text font-display font-medium text-sm sm:text-base tracking-tight whitespace-nowrap">{{ pack.priceDisplay }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- In stock badge + Price + Quantity -->
          <div class="flex items-center gap-1.5 mb-2 hero-fade-in" style="animation-delay: 0.38s">
            <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
            <span class="text-accent-dark text-xs font-display font-semibold uppercase tracking-wide">En stock</span>
          </div>
          <div class="flex items-end justify-between gap-3 mb-5 hero-fade-in" style="animation-delay: 0.4s">
            <div class="text-left min-w-0">
              <div class="flex items-baseline gap-2">
                <span class="font-display text-text-muted line-through text-sm sm:text-base whitespace-nowrap">{{ originalTotal }}</span>
                <span class="font-display font-medium text-[28px] sm:text-[34px] lg:text-[40px] text-text tracking-tight leading-none whitespace-nowrap">{{ formattedTotal }}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-1">
                <svg class="w-3.5 h-3.5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-accent-dark text-xs font-display font-semibold">Économisez {{ savedAmount }}</span>
              </div>
            </div>

            <!-- Quantity -->
            <div class="flex-shrink-0">
              <div class="inline-flex items-center bg-surface-alt border border-border rounded-xl">
                <button
                  class="flex items-center justify-center w-9 h-9 text-text-muted hover:text-text transition-colors cursor-pointer focus:outline-none rounded-l-xl disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="quantity <= 1"
                  aria-label="Diminuer"
                  @click="decrementQuantity"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>
                </button>
                <span class="w-9 text-center text-text font-display font-bold text-sm select-none">{{ quantity }}</span>
                <button
                  class="flex items-center justify-center w-9 h-9 text-text-muted hover:text-text transition-colors cursor-pointer focus:outline-none rounded-r-xl disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="quantity >= 10"
                  aria-label="Augmenter"
                  @click="incrementQuantity"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- CTA / Address form -->
          <div class="hero-fade-in" style="animation-delay: 0.5s">
            <div v-if="!showAddressForm">
              <button
                class="group w-full bg-accent hover:bg-accent-hover active:scale-[0.98] text-text font-display font-bold text-sm sm:text-lg uppercase tracking-wider py-3 sm:py-4 px-6 sm:px-12 rounded-xl cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 sm:gap-3 shadow-[0_4px_20px_rgba(169,249,85,0.35)] hover:shadow-[0_6px_30px_rgba(169,249,85,0.45)]"
                @click="showAddressForm = true"
              >
                Commander &mdash; {{ formattedTotal }}
                <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p class="text-center text-[11px] text-text-muted mt-2">Paiement 100% sécurisé par Stripe</p>
            </div>

            <!-- Address form -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-3"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div v-if="showAddressForm">
                <div class="bg-surface-alt rounded-xl border border-border p-4 sm:p-5 mb-4">
                  <p class="text-xs text-text font-display font-semibold mb-4">Adresse de livraison</p>
                  <div class="grid gap-3 text-left">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label for="hero-name" class="block text-[11px] text-text-muted mb-1 font-medium">Nom complet *</label>
                        <input id="hero-name" v-model="customerName" type="text" required autocomplete="name" placeholder="Jean Dupont"
                          class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                      </div>
                      <div>
                        <label for="hero-email" class="block text-[11px] text-text-muted mb-1 font-medium">Email *</label>
                        <input id="hero-email" v-model="customerEmail" type="email" required autocomplete="email" placeholder="jean@email.com"
                          class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label for="hero-phone" class="block text-[11px] text-text-muted mb-1 font-medium">Téléphone <span class="text-text-muted/60">(optionnel)</span></label>
                      <input id="hero-phone" v-model="customerPhone" type="tel" autocomplete="tel" placeholder="06 12 34 56 78"
                        class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                    </div>
                    <div>
                      <label for="hero-addr" class="block text-[11px] text-text-muted mb-1 font-medium">Adresse *</label>
                      <input id="hero-addr" v-model="addressLine1" type="text" required autocomplete="address-line1" placeholder="12 rue de la Paix"
                        class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                    </div>
                    <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-3">
                      <div>
                        <label for="hero-cp" class="block text-[11px] text-text-muted mb-1 font-medium">Code postal *</label>
                        <input id="hero-cp" v-model="postalCode" type="text" required autocomplete="postal-code" placeholder="75001" maxlength="5" inputmode="numeric"
                          class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                      </div>
                      <div>
                        <label for="hero-city" class="block text-[11px] text-text-muted mb-1 font-medium">Ville *</label>
                        <input id="hero-city" v-model="city" type="text" required autocomplete="address-level2" placeholder="Paris"
                          class="w-full bg-white border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Error -->
                <div v-if="error" class="mb-3 bg-urgency/10 border border-urgency/20 text-urgency text-sm rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {{ error }}
                </div>

                <!-- Pay button -->
                <button
                  :disabled="loading || !isAddressValid"
                  :class="[
                    'group w-full text-text font-display font-bold text-base sm:text-lg uppercase tracking-wider py-3.5 sm:py-4 px-12 rounded-xl transition-all duration-200 focus:outline-none inline-flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(169,249,85,0.35)] hover:shadow-[0_6px_30px_rgba(169,249,85,0.45)]',
                    loading || !isAddressValid
                      ? 'bg-accent/50 cursor-not-allowed'
                      : 'bg-accent hover:bg-accent-hover cursor-pointer active:scale-[0.98]',
                  ]"
                  @click="handleCheckout"
                >
                  <span v-if="loading" class="inline-flex items-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-text" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirection...
                  </span>
                  <template v-else>
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Payer {{ formattedTotal }}
                    <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </template>
                </button>
                <p class="text-center text-[11px] text-text-muted mt-2">Paiement 100% sécurisé par Stripe</p>
              </div>
            </Transition>
          </div>
        </div>

      </div>
    </div>

    <!-- Trust marquee band -->
    <div class="mt-8 sm:mt-12 border-t border-b border-border bg-surface-alt/50 overflow-hidden hero-fade-in" style="animation-delay: 0.7s">
      <div class="trust-marquee py-3">
        <div class="trust-marquee__track">
          <template v-for="copy in 3" :key="copy">
            <div class="trust-marquee__item">
              <svg class="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-sm font-medium text-text whitespace-nowrap">Livraison gratuite</span>
            </div>
            <span class="trust-marquee__sep">&bull;</span>
            <div class="trust-marquee__item">
              <svg class="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              <span class="text-sm font-medium text-text whitespace-nowrap">Garantie 30 jours</span>
            </div>
            <span class="trust-marquee__sep">&bull;</span>
            <div class="trust-marquee__item">
              <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-sm font-medium text-text whitespace-nowrap">Paiement sécurisé</span>
            </div>
            <span class="trust-marquee__sep">&bull;</span>
            <div class="trust-marquee__item">
              <a href="https://fr.trustpilot.com/review/clipbag.shop" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5">
                <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1.5l2.76 8.5h8.94l-7.23 5.26 2.76 8.5L12 18.5l-7.23 5.26 2.76-8.5L.3 10h8.94L12 1.5z" fill="#00B67A" />
                </svg>
                <span class="text-sm font-display font-semibold text-text whitespace-nowrap">4.5</span>
                <span class="text-sm text-text-muted whitespace-nowrap">Trustpilot</span>
              </a>
            </div>
            <span class="trust-marquee__sep">&bull;</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const productStore = useProductStore()
const { track: fbTrack } = useMetaPixel()

// === Gallery ===
const productImages = computed(() => {
  const imgs = productStore.product?.images
  if (imgs && imgs.length > 0) {
    const idx = imgs.findIndex((img: string) => img.includes('product-2'))
    if (idx > 0) {
      const reordered = [...imgs]
      const [item] = reordered.splice(idx, 1)
      reordered.unshift(item)
      return reordered
    }
    return imgs
  }
  return ['/images/product/product-2.png', '/images/product/product-1.png', '/images/product/product-3.png', '/images/product/product-4.png', '/images/product/product-5.png', '/images/product/product-6.png']
})

const currentImageIndex = ref(0)
const carouselDirection = ref('carousel-next')
const mobileScrollRef = ref<HTMLElement | null>(null)
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let autoplayPaused = false

const goToImage = (index: number) => {
  carouselDirection.value = index > currentImageIndex.value ? 'carousel-next' : 'carousel-prev'
  currentImageIndex.value = index
}

const nextImage = () => {
  carouselDirection.value = 'carousel-next'
  currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
  scrollMobileToIndex(currentImageIndex.value)
}

const prevImage = () => {
  carouselDirection.value = 'carousel-prev'
  currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
  scrollMobileToIndex(currentImageIndex.value)
}

const goToImageMobile = (index: number) => {
  currentImageIndex.value = index
  scrollMobileToIndex(index)
}

const onDesktopClick = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  if (e.clientX - rect.left < rect.width / 2) prevImage()
  else nextImage()
}

const onMobileScroll = () => {
  const el = mobileScrollRef.value
  if (!el) return
  const itemWidth = el.children[0]?.clientWidth || 1
  const index = Math.round(el.scrollLeft / itemWidth)
  if (index !== currentImageIndex.value && index >= 0 && index < productImages.value.length) {
    currentImageIndex.value = index
  }
}

const scrollMobileToIndex = (index: number) => {
  const el = mobileScrollRef.value
  if (!el || !el.children[index]) return
  const child = el.children[index] as HTMLElement
  el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
}

const startAutoplay = () => { stopAutoplay(); autoplayTimer = setInterval(() => { if (!autoplayPaused) nextImage() }, 4000) }
const stopAutoplay = () => { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null } }
const pauseAutoplay = () => { autoplayPaused = true }
const resumeAutoplay = () => { autoplayPaused = false }

// === Order logic (from OrderSection) ===
const quantity = ref(1)
const loading = ref(false)
const error = ref('')
const selectedPack = ref('')
const showAddressForm = ref(false)
const customerName = ref('')
const customerEmail = ref('')
const customerPhone = ref('')
const addressLine1 = ref('')
const postalCode = ref('')
const city = ref('')

const isAddressValid = computed(() =>
  customerName.value.trim().length >= 2 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.value) &&
  addressLine1.value.trim().length >= 3 &&
  /^\d{5}$/.test(postalCode.value.trim()) &&
  city.value.trim().length >= 1
)

const UNIT_PRICE = 29.99
const ORIGINAL_UNIT_PRICE = 49.99

interface Pack { name: string; label: string; qty: number; packPrice: number; badge: string; priceDisplay: string; oldPriceDisplay: string }

const packs: Pack[] = [
  { name: 'duo', label: 'Duo', qty: 2, packPrice: 49.99, badge: '-17%', priceDisplay: '49,99\u20AC', oldPriceDisplay: '59,98\u20AC' },
  { name: 'equipe', label: 'Équipe', qty: 5, packPrice: 99.99, badge: '-33%', priceDisplay: '99,99\u20AC', oldPriceDisplay: '149,95\u20AC' },
]

const currentPack = computed(() => packs.find(p => p.name === selectedPack.value))

const selectPack = (name: string) => {
  selectedPack.value = name
  const pack = packs.find(p => p.name === name)
  if (pack) {
    quantity.value = pack.qty
    fbTrack('AddToCart', { content_name: productStore.product?.name || 'ClipBag', content_ids: [productStore.product?.id || ''], content_type: 'product', value: pack.packPrice, currency: 'EUR' })
  }
}

const decrementQuantity = () => { if (quantity.value > 1) { quantity.value--; syncPackFromQuantity() } }
const incrementQuantity = () => { if (quantity.value < 10) { quantity.value++; syncPackFromQuantity() } }
const syncPackFromQuantity = () => { const match = packs.find(p => p.qty === quantity.value); selectedPack.value = match ? match.name : '' }

const formattedTotal = computed(() => {
  const total = currentPack.value ? currentPack.value.packPrice : UNIT_PRICE * quantity.value
  return `${total.toFixed(2).replace('.', ',')}\u20AC`
})

const originalTotal = computed(() => `${(ORIGINAL_UNIT_PRICE * quantity.value).toFixed(2).replace('.', ',')}\u20AC`)

const savedAmount = computed(() => {
  const original = ORIGINAL_UNIT_PRICE * quantity.value
  const actual = currentPack.value ? currentPack.value.packPrice : UNIT_PRICE * quantity.value
  return `${(original - actual).toFixed(2).replace('.', ',')}\u20AC`
})

const handleCheckout = async () => {
  if (!isAddressValid.value) { error.value = 'Veuillez remplir tous les champs obligatoires.'; return }
  loading.value = true
  error.value = ''
  try {
    const totalValue = currentPack.value ? currentPack.value.packPrice : UNIT_PRICE * quantity.value
    const pixelParams = { content_name: productStore.product?.name || 'ClipBag', content_ids: [productStore.product?.id || ''], content_type: 'product', num_items: quantity.value, value: totalValue, currency: 'EUR' }
    fbTrack('AddToCart', pixelParams)
    fbTrack('InitiateCheckout', pixelParams)
    const { apiFetch } = useApi()
    const response = await apiFetch<{ sessionId: string; url: string }>('/payments/create-checkout', {
      method: 'POST',
      body: {
        productId: productStore.product?.id || '', quantity: quantity.value, packType: selectedPack.value,
        customerName: customerName.value.trim(), customerEmail: customerEmail.value.trim(),
        customerPhone: customerPhone.value.trim() || undefined,
        shippingAddress: { line1: addressLine1.value.trim(), city: city.value.trim(), postalCode: postalCode.value.trim(), country: 'FR' },
      },
    })
    if (response.url) window.location.href = response.url
  } catch (e: any) {
    error.value = e?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}

onMounted(() => { startAutoplay() })
onUnmounted(() => { stopAutoplay() })
</script>

<style scoped>
.hero-fade-in {
  opacity: 0;
  animation: hero-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes hero-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-image-in {
  opacity: 0;
  animation: hero-image-enter 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
}
@keyframes hero-image-enter {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

/* Mobile carousel */
.gallery-scroll { scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; gap: 0; }
.gallery-scroll::-webkit-scrollbar { display: none; }
.gallery-scroll__item { width: calc(100vw - 32px); aspect-ratio: 4 / 5; }

/* Desktop carousel transitions */
.carousel-next-enter-active, .carousel-prev-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; z-index: 2; }
.carousel-next-leave-active, .carousel-prev-leave-active { transition: opacity 0.25s ease; z-index: 1; }
.carousel-next-enter-from { opacity: 0; transform: translateX(20px); }
.carousel-next-leave-to { opacity: 0; }
.carousel-prev-enter-from { opacity: 0; transform: translateX(-20px); }
.carousel-prev-leave-to { opacity: 0; }

/* Thumbnails */
.thumbnails-scroll { scrollbar-width: none; -ms-overflow-style: none; }
.thumbnails-scroll::-webkit-scrollbar { display: none; }

/* Promo adbar */
.adbar { border-bottom: 1px solid rgba(0,0,0,0.06); padding: 10px 0; position: relative; }
.adbar__track { display: flex; width: max-content; animation: adbar-marquee 40s linear infinite; }
.adbar:hover .adbar__track { animation-play-state: paused; }
.adbar__msg { display: flex; align-items: center; white-space: nowrap; font-size: 13px; letter-spacing: 0.2px; padding: 0 18px; font-weight: 600; color: #101010; }
.adbar__sep { opacity: 0.5; margin: 0 14px; }
@keyframes adbar-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@media (max-width: 768px) {
  .adbar { margin-bottom: 16px; }
  .adbar__track { animation-duration: 28s; }
  .adbar__msg { font-size: 12px; padding: 0 14px; }
}

/* Trust marquee */
.trust-marquee { position: relative; width: 100%; }
.trust-marquee__track { display: flex; align-items: center; gap: 0; width: max-content; animation: marquee-scroll 30s linear infinite; }
.trust-marquee__item { display: flex; align-items: center; gap: 6px; padding: 0 16px; }
.trust-marquee__sep { color: rgba(16,16,16,0.15); font-size: 10px; user-select: none; }
@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
.trust-marquee:hover .trust-marquee__track { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .hero-fade-in, .hero-image-in { animation: none; opacity: 1; transform: none; }
  .carousel-next-enter-active, .carousel-next-leave-active, .carousel-prev-enter-active, .carousel-prev-leave-active { transition: none; }
  .trust-marquee__track, .adbar__track { animation: none; }
}
</style>
