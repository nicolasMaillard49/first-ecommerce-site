<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto">
      <h2
        class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-16"
      >
        Découvrez le <span class="text-brand">Geestock</span>
      </h2>

      <!-- Main image -->
      <div
        class="relative aspect-[4/3] sm:aspect-[16/10] bg-surface-light rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-surface-lighter"
      >
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200 ease-in absolute inset-0"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <img
            :key="activeIndex"
            :src="images[activeIndex]"
            :alt="`Geestock Sac Magnétique pour Bouteille - Vue ${activeIndex + 1}`"
            class="w-full h-full object-contain"
            loading="lazy"
          />
        </Transition>
      </div>

      <!-- Thumbnails -->
      <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          v-for="(image, idx) in images"
          :key="idx"
          :class="[
            'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface',
            activeIndex === idx
              ? 'border-brand shadow-lg shadow-brand/20'
              : 'border-surface-lighter hover:border-brand/40',
          ]"
          :aria-label="`Voir image ${idx + 1}`"
          @click="activeIndex = idx"
        >
          <img
            :src="image"
            :alt="`Geestock miniature ${idx + 1}`"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeIndex = ref(0)

const images = [
  'https://ae01.alicdn.com/kf/Sb3f10763c9c948c7a9bdc6e84a6e9a0fe.jpg',
  'https://ae01.alicdn.com/kf/S12e824863ec645dea0aef595f904c0eaf.jpg',
  'https://ae01.alicdn.com/kf/S4d8bac28c4794424a382b37bf383cac4d.jpg',
  'https://ae01.alicdn.com/kf/Scb8b59e6be9442c292b42251f3afd438u.jpg',
  'https://ae01.alicdn.com/kf/Sc9f337cce8ce48f199695e18ca515bbcH.jpg',
  'https://ae01.alicdn.com/kf/S3841ddcdd72d4eac91362fc44339f0a34.jpg',
]
</script>
