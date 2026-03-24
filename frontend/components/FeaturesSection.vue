<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <h2
        class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-4"
      >
        Pourquoi <span class="text-brand">Geestock</span> ?
      </h2>
      <p class="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
        Conçu pour les sportifs exigeants qui refusent les compromis.
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div
          v-for="(feature, idx) in features"
          :key="idx"
          class="group bg-surface-light border border-surface-lighter rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 cursor-default"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-14 h-14 rounded-xl bg-brand/10 text-brand mb-6 transition-colors duration-300 group-hover:bg-brand/20"
          >
            <component :is="feature.icon" />
          </div>

          <h3 class="font-display font-bold text-lg sm:text-xl text-white mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-400 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

// Inline SVG icon components
const MagnetIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 2a4 4 0 014 4v6a4 4 0 01-8 0V6a4 4 0 014-4zM6 10v2a6 6 0 0012 0v-2M4 10h2M18 10h2M4 14h2M18 14h2',
      }),
    ]
  )

const FeatherIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9',
      }),
    ]
  )

const GlobeIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8',
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z',
      }),
    ]
  )

const ShieldIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      }),
    ]
  )

const features = [
  {
    icon: MagnetIcon,
    title: 'Fixation Magnétique',
    description: 'Se fixe en un instant sur toute surface métallique. Tient fermement même en mouvement.',
  },
  {
    icon: FeatherIcon,
    title: 'Ultra Léger',
    description: 'Seulement 120g. Vous ne le sentirez pas, mais vous ne pourrez plus vous en passer.',
  },
  {
    icon: GlobeIcon,
    title: 'Universel',
    description: 'Compatible avec toutes les bouteilles standard. S\'adapte à votre style de vie.',
  },
  {
    icon: ShieldIcon,
    title: 'Résistant',
    description: 'Matériaux premium qui résistent aux intempéries. Conçu pour durer.',
  },
]
</script>
