<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo -->
        <a
          href="#"
          class="font-display font-black text-2xl sm:text-3xl text-brand tracking-tight cursor-pointer select-none"
          @click.prevent="scrollToTop"
        >
          GEESTOCK
        </a>

        <!-- Desktop CTA -->
        <button
          class="hidden sm:inline-flex btn-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
          @click="scrollToOrder"
        >
          Commander
        </button>

        <!-- Mobile hamburger -->
        <button
          class="sm:hidden flex items-center justify-center w-11 h-11 rounded-lg text-white hover:text-brand transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
          :aria-expanded="mobileOpen"
          aria-label="Menu de navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <!-- Hamburger icon -->
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
          <!-- Close icon -->
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

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="sm:hidden bg-surface-light/95 backdrop-blur-md border-t border-surface-lighter px-4 py-4"
      >
        <button
          class="w-full btn-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
          @click="scrollToOrder(); mobileOpen = false"
        >
          Commander
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const scrollToOrder = () => {
  const el = document.getElementById('order-section')
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
