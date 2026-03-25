<template>
  <section v-if="parsedVideos.length > 0" id="social-section" class="py-20 sm:py-28 px-4 sm:px-6 bg-surface relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/3 rounded-full blur-[120px]"></div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Social</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Vu sur les <span class="text-brand">Reseaux Sociaux</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Decouvrez le Geestock en action a travers les videos de notre communaute.
        </p>

        <!-- Social platform badges -->
        <div class="flex items-center justify-center gap-3 sm:gap-4 mt-6">
          <div class="inline-flex items-center gap-2 bg-surface-light border border-surface-lighter rounded-full px-4 py-2">
            <svg class="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">Instagram</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-surface-light border border-surface-lighter rounded-full px-4 py-2">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">TikTok</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-surface-light border border-surface-lighter rounded-full px-4 py-2">
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">YouTube</span>
          </div>
        </div>
      </div>

      <!-- Video carousel -->
      <div class="relative">
        <!-- Navigation arrows -->
        <button
          class="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-surface-light/80 backdrop-blur-sm border border-surface-lighter text-white hover:bg-surface-light hover:text-brand transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label="Videos precedentes"
          @click="scrollCarousel('left')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-surface-light/80 backdrop-blur-sm border border-surface-lighter text-white hover:bg-surface-light hover:text-brand transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label="Videos suivantes"
          @click="scrollCarousel('right')"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Scrollable container -->
        <div
          ref="carouselRef"
          class="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2"
        >
          <a
            v-for="(video, idx) in parsedVideos"
            :key="idx"
            :href="video.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-shrink-0 w-[200px] sm:w-[220px] group"
          >
            <!-- Video thumbnail (9:16 ratio) -->
            <div class="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-surface-lighter group-hover:border-brand/40 transition-all duration-300 bg-surface-light">
              <!-- Thumbnail image -->
              <img
                :src="video.thumbnail"
                :alt="video.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Play button overlay -->
              <div class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-surface ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <!-- Platform badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                <component :is="platformIcons[video.platform]" />
                <span class="text-[10px] font-semibold text-white">{{ video.platform }}</span>
              </div>

              <!-- Views count -->
              <div v-if="video.views" class="absolute bottom-3 left-3">
                <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <svg class="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  <span class="text-[10px] font-medium text-white/80">{{ video.views }}</span>
                </div>
              </div>
            </div>

            <!-- Video title -->
            <p class="mt-3 text-sm text-gray-400 font-medium line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
              {{ video.title }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

const carouselRef = ref<HTMLElement | null>(null)

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const scrollAmount = 240
  carouselRef.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  })
}

// Platform icons
const platformIcons: Record<string, () => any> = {
  TikTok: () =>
    h('svg', { class: 'w-3 h-3 text-white', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' }),
    ]),
  Instagram: () =>
    h('svg', { class: 'w-3 h-3 text-pink-400', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' }),
    ]),
  YouTube: () =>
    h('svg', { class: 'w-3 h-3 text-red-500', fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }),
    ]),
}

// --- Detect platform & extract thumbnail from URL ---

function detectPlatform(url: string): 'TikTok' | 'Instagram' | 'YouTube' {
  if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) return 'TikTok'
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  return 'TikTok'
}

function getYouTubeThumbnail(url: string): string | null {
  // youtube.com/watch?v=ID or youtube.com/shorts/ID or youtu.be/ID
  let id: string | null = null
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  id = shortMatch?.[1] || watchMatch?.[1] || shortUrlMatch?.[1] || null
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return null
}

// Default videos (used if nothing saved in admin panel)
const defaultVideos = [
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE1', title: 'Test du Geestock en salle de sport', thumbnail: '/images/product/product-1.jpg' },
  { url: 'https://www.instagram.com/reel/EXAMPLE2/', title: 'Unboxing Geestock - Mon avis honnete', thumbnail: '/images/product/product-2.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE3', title: 'Le sac magnetique qui change tout', thumbnail: '/images/product/product-3.png' },
  { url: 'https://www.youtube.com/shorts/EXAMPLE4', title: 'Review complete du Geestock', thumbnail: '/images/product/product-4.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE5', title: 'Geestock vs sac classique - Comparatif', thumbnail: '/images/product/product-5.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE6', title: 'Je teste le Geestock en randonnee', thumbnail: '/images/product/product-6.png' },
]

// Load videos from localStorage (saved by admin panel) or use defaults
const videos = ref(defaultVideos)

onMounted(() => {
  const saved = localStorage.getItem('geestock_social_videos')
  if (saved) {
    const parsed = JSON.parse(saved)
    if (parsed.length > 0) {
      videos.value = parsed
    }
  }
})

// Parse videos: detect platform, resolve thumbnails
const parsedVideos = computed(() =>
  videos.value
    .filter((v: any) => v.url && v.url.trim() !== '')
    .map((v: any) => {
      const platform = detectPlatform(v.url)
      let thumbnail = v.thumbnail
      if (platform === 'YouTube' && !thumbnail) {
        thumbnail = getYouTubeThumbnail(v.url) || '/images/product/product-1.jpg'
      }
      if (!thumbnail) {
        thumbnail = '/images/product/product-1.jpg'
      }
      return { ...v, platform, thumbnail }
    }),
)
</script>
