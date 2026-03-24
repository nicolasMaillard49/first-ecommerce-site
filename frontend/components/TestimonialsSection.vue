<template>
  <section id="testimonials-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand/3 rounded-full blur-[120px]"></div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Temoignages</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Ce que disent <span class="text-brand">nos clients</span>
        </h2>

        <!-- Overall rating summary -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <div class="flex items-center gap-1">
            <svg v-for="star in 5" :key="star" class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div class="text-left">
            <span class="text-white font-display font-bold text-lg">4.9/5</span>
            <span class="text-gray-400 text-sm ml-1">base sur 2 000+ avis</span>
          </div>
        </div>
      </div>

      <!-- Desktop: grid of 3 visible, Mobile: horizontal scroll carousel -->
      <div class="hidden lg:grid lg:grid-cols-3 gap-8">
        <article
          v-for="(testimonial, idx) in visibleTestimonials"
          :key="idx"
          :class="[
            'animate-on-scroll group relative bg-surface-light rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-brand/5 border border-surface-lighter hover:border-brand/20 overflow-hidden',
            `stagger-${idx + 1}`,
          ]"
        >
          <!-- Gradient border top accent -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"></div>

          <!-- Stars -->
          <div class="flex items-center gap-1 mb-5">
            <svg
              v-for="star in 5"
              :key="star"
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <!-- Quote -->
          <blockquote class="text-gray-300 leading-relaxed flex-1 mb-6 text-base">
            "{{ testimonial.quote }}"
          </blockquote>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-5 border-t border-surface-lighter/50">
            <div class="flex items-center justify-center w-11 h-11 rounded-full bg-brand/10 text-brand font-display font-bold text-sm ring-2 ring-brand/20">
              {{ testimonial.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white font-semibold text-sm">{{ testimonial.name }}</p>
              <p class="text-gray-500 text-xs">{{ testimonial.sport }}</p>
            </div>
            <div class="flex items-center gap-1.5 bg-brand/10 rounded-full px-3 py-1">
              <svg class="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-xs text-brand font-semibold">Verifie</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Desktop pagination dots -->
      <div class="hidden lg:flex items-center justify-center gap-2 mt-10">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand',
            currentPage === page - 1
              ? 'bg-brand scale-110'
              : 'bg-surface-lighter hover:bg-gray-600',
          ]"
          :aria-label="`Page ${page}`"
          @click="currentPage = page - 1"
        ></button>
      </div>

      <!-- Mobile carousel -->
      <div class="lg:hidden">
        <div
          ref="carouselRef"
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          @scroll="handleCarouselScroll"
        >
          <article
            v-for="(testimonial, idx) in testimonials"
            :key="idx"
            class="snap-center flex-shrink-0 w-[85vw] sm:w-[70vw] bg-surface-light rounded-3xl p-6 sm:p-8 flex flex-col border border-surface-lighter"
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
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <blockquote class="text-gray-300 leading-relaxed flex-1 mb-5 text-sm sm:text-base">
              "{{ testimonial.quote }}"
            </blockquote>

            <div class="flex items-center gap-3 pt-4 border-t border-surface-lighter/50">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand font-display font-bold text-sm">
                {{ testimonial.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white font-semibold text-sm">{{ testimonial.name }}</p>
                <p class="text-gray-500 text-xs">{{ testimonial.sport }}</p>
              </div>
              <div class="flex items-center gap-1 bg-brand/10 rounded-full px-2.5 py-1">
                <svg class="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-xs text-brand font-semibold">Verifie</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Mobile carousel indicators -->
        <div class="flex items-center justify-center gap-1.5 mt-4">
          <span
            v-for="(_, idx) in testimonials"
            :key="idx"
            :class="[
              'block w-1.5 h-1.5 rounded-full transition-all duration-200',
              mobileActiveIndex === idx ? 'bg-brand w-4' : 'bg-surface-lighter',
            ]"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentPage = ref(0)
const mobileActiveIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const testimonials = [
  {
    name: 'Thomas Lefevre',
    initials: 'TL',
    sport: 'Trail Running',
    quote: "J'utilise le Geestock depuis 3 mois pour mes sorties trail. La fixation magnetique est bluffante de solidite. Je ne cours plus jamais sans !",
  },
  {
    name: 'Camille Dubois',
    initials: 'CD',
    sport: 'Fitness & Musculation',
    quote: "Enfin un accessoire qui tient ses promesses ! Ultra leger, je l'oublie completement pendant mes seances. La qualite des materiaux est vraiment premium.",
  },
  {
    name: 'Mehdi Bouchard',
    initials: 'MB',
    sport: 'Cyclisme',
    quote: "Sceptique au depart, convaincu apres 5 minutes. La fixation est instantanee et hyper solide. J'en ai commande un deuxieme pour offrir.",
  },
  {
    name: 'Sophie Martin',
    initials: 'SM',
    sport: 'Randonnee',
    quote: "Parfait pour mes randonnees en montagne. La bouteille reste parfaitement en place meme sur les sentiers les plus accidentes. Un indispensable !",
  },
  {
    name: 'Lucas Moreau',
    initials: 'LM',
    sport: 'CrossFit',
    quote: "Entre les WODs, je n'ai plus a chercher ma bouteille. Elle est la, accessible en un geste. Ca change vraiment la routine d'entrainement.",
  },
  {
    name: 'Lea Rousseau',
    initials: 'LR',
    sport: 'Yoga & Pilates',
    quote: "J'adore le design epure et la qualite de fabrication. Meme pour le yoga, c'est pratique d'avoir sa bouteille toujours a portee sans encombrer le tapis.",
  },
]

const totalPages = computed(() => Math.ceil(testimonials.length / 3))

const visibleTestimonials = computed(() => {
  const start = currentPage.value * 3
  return testimonials.slice(start, start + 3)
})

const handleCarouselScroll = () => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  const scrollLeft = el.scrollLeft
  const itemWidth = el.scrollWidth / testimonials.length
  mobileActiveIndex.value = Math.round(scrollLeft / itemWidth)
}
</script>
