<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background image -->
    <div class="absolute inset-0">
      <img
        src="https://ae01.alicdn.com/kf/Sb3f10763c9c948c7a9bdc6e84a6e9a0fe.jpg"
        alt="Geestock Sac Magnétique pour Bouteille"
        class="w-full h-full object-cover opacity-30"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/80 to-surface"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-32">
      <h1
        class="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white mb-6"
      >
        Libérez Vos Mains.
        <span class="text-brand">Dominez Votre Sport.</span>
      </h1>

      <p class="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
        Le sac magnétique qui change tout.
      </p>

      <!-- Price badge -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <span class="text-gray-400 line-through text-lg sm:text-xl">49,99&euro;</span>
        <span
          class="inline-flex items-center bg-brand/10 border border-brand/30 text-brand font-display font-black text-3xl sm:text-4xl px-6 py-2 rounded-xl"
        >
          29,99&euro;
        </span>
      </div>

      <!-- CTA button -->
      <button
        class="btn-primary text-lg sm:text-xl px-10 sm:px-14 py-4 sm:py-5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface shadow-lg shadow-brand/20 hover:shadow-brand/40"
        @click="scrollToOrder"
      >
        Commander Maintenant
      </button>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 motion-safe:animate-bounce">
      <span class="text-xs uppercase tracking-widest">Découvrir</span>
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToOrder = () => {
  const el = document.getElementById('order-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
