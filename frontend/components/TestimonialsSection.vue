<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 bg-surface-light">
    <div class="max-w-6xl mx-auto">
      <h2
        class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-4"
      >
        Ce que disent <span class="text-brand">nos clients</span>
      </h2>
      <p class="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
        Plus de 2 000 sportifs nous font confiance.
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <article
          v-for="(testimonial, idx) in testimonials"
          :key="idx"
          class="bg-surface border border-surface-lighter rounded-2xl p-6 sm:p-8 flex flex-col"
        >
          <!-- Stars -->
          <div class="flex items-center gap-1 mb-4">
            <svg
              v-for="star in 5"
              :key="star"
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>

          <!-- Quote -->
          <blockquote class="text-gray-300 leading-relaxed flex-1 mb-6">
            "{{ testimonial.quote }}"
          </blockquote>

          <!-- Author -->
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand font-display font-bold text-sm"
            >
              {{ testimonial.initials }}
            </div>
            <div>
              <p class="text-white font-semibold text-sm">{{ testimonial.name }}</p>
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-xs text-gray-500">Client vérifié</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Thomas Lefèvre',
    initials: 'TL',
    quote:
      "J'utilise le Geestock depuis 3 mois pour mes sorties trail. La fixation magnétique est bluffante de solidité. Je ne cours plus jamais sans !",
  },
  {
    name: 'Camille Dubois',
    initials: 'CD',
    quote:
      "Enfin un accessoire qui tient ses promesses ! Ultra léger, je l'oublie complètement pendant mes séances. La qualité des matériaux est vraiment premium.",
  },
  {
    name: 'Mehdi Bouchard',
    initials: 'MB',
    quote:
      "Sceptique au départ, convaincu après 5 minutes. La fixation est instantanée et hyper solide. J'en ai commandé un deuxième pour offrir. Rapport qualité-prix imbattable.",
  },
]
</script>
