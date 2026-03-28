<template>
  <nav
    :class="[
      'fixed z-50 transition-all duration-500',
      scrolled
        ? 'top-0 left-0 right-0 bg-surface/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-surface-lighter/50'
        : 'top-4 left-4 right-4 bg-surface-light/70 backdrop-blur-xl rounded-2xl border border-surface-lighter/40',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-18">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="font-display font-black text-xl sm:text-2xl text-brand tracking-tight cursor-pointer select-none transition-colors duration-200 hover:text-brand-light"
        >
          CLIPBAG
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.href">
            <NuxtLink
              v-if="link.isPage"
              :to="link.href"
              :class="[
                'px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-lg',
                link.highlight
                  ? 'text-brand hover:text-brand-light hover:bg-brand/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              ]"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer rounded-lg hover:bg-white/5"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.label }}
            </a>
          </template>
        </div>

        <!-- Desktop CTA -->
        <button
          class="hidden md:inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:scale-105"
          @click="scrollToSection('#order-section')"
        >
          Commander
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
          :aria-expanded="mobileOpen"
          aria-label="Menu de navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            v-if="!mobileOpen"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu slide-in -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden overflow-hidden border-t border-surface-lighter/40 bg-surface-light/95 backdrop-blur-xl"
        :class="[scrolled ? '' : 'rounded-b-2xl']"
      >
        <div class="px-4 py-4 space-y-1">
          <template v-for="link in navLinks" :key="link.href">
            <NuxtLink
              v-if="link.isPage"
              :to="link.href"
              :class="[
                'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 cursor-pointer',
                link.highlight
                  ? 'text-brand hover:text-brand-light hover:bg-brand/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              ]"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 cursor-pointer"
              @click.prevent="scrollToSection(link.href); mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </template>
          <div class="pt-2">
            <button
              class="w-full bg-brand hover:bg-brand-dark text-white font-display font-bold text-base py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface flex items-center justify-center gap-2"
              @click="scrollToSection('#order-section'); mobileOpen = false"
            >
              Commander Maintenant
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Avantages', href: '#features-section' },
  { label: 'Galerie', href: '#gallery-section' },
  { label: 'Avis', href: '#testimonials-section' },
  { label: 'FAQ', href: '#faq-section' },
  { label: 'Suivre ma commande', href: '/suivi', isPage: true, highlight: true },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 40
}

const route = useRoute()

const scrollToSection = (href: string) => {
  const id = href.replace('#', '')
  // If we're not on the homepage, navigate there with the anchor
  if (route.path !== '/') {
    navigateTo(`/${href}`)
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
