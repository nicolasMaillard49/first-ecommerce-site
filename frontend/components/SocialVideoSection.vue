<template>
  <section v-if="parsedVideos.length > 0" id="social-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/3 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14 sm:mb-20 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Social</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Vu sur les <span class="text-brand">Reseaux Sociaux</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Decouvrez le Geestock en action a travers les videos de notre communaute.
        </p>

        <!-- Platform badges -->
        <div class="flex items-center justify-center gap-3 sm:gap-4 mt-6">
          <div class="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 backdrop-blur-sm">
            <svg class="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">Instagram</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 backdrop-blur-sm">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">TikTok</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 backdrop-blur-sm">
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span class="text-xs font-medium text-gray-400">YouTube</span>
          </div>
        </div>
      </div>

      <!-- Carousel -->
      <div class="relative">
        <!-- Arrow left -->
        <button
          class="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white/70 hover:text-brand hover:border-brand/30 hover:bg-brand/[0.08] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/50"
          aria-label="Video precedente"
          @click="navigate(-1)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Arrow right -->
        <button
          class="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white/70 hover:text-brand hover:border-brand/30 hover:bg-brand/[0.08] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/50"
          aria-label="Video suivante"
          @click="navigate(1)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- 3D Stage -->
        <div
          ref="stageRef"
          class="social-stage relative mx-8 sm:mx-14"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @keydown.left="navigate(-1)"
          @keydown.right="navigate(1)"
          tabindex="0"
          role="region"
          aria-label="Carrousel de videos sociales"
          aria-roledescription="carousel"
        >
          <div
            v-for="(video, idx) in parsedVideos"
            :key="idx"
            class="social-card"
            :class="{ 'social-card--active': idx === current }"
            :style="cardStyle(idx)"
            :aria-hidden="idx !== current"
          >
            <a
              :href="video.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block relative h-full"
              :tabindex="idx === current ? 0 : -1"
              @click.prevent="onCardClick(idx, video.url)"
            >
              <!-- Thumbnail -->
              <img
                :src="video.thumbnail"
                :alt="video.title"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              <!-- Active glow ring (CSS driven) -->
              <div class="social-card__glow"></div>

              <!-- Gradient vignette -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

              <!-- Play overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 social-card__play">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-surface ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <!-- Platform badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1">
                <component :is="platformIcons[video.platform]" />
                <span class="text-[10px] font-semibold text-white/90">{{ video.platform }}</span>
              </div>

              <!-- Bottom info -->
              <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p class="text-xs sm:text-sm font-medium text-white/90 line-clamp-2 drop-shadow-lg">
                  {{ video.title }}
                </p>
              </div>
            </a>
          </div>
        </div>

        <!-- Dots -->
        <div class="flex items-center justify-center gap-1.5 mt-6 sm:mt-8" role="tablist" aria-label="Navigation videos">
          <button
            v-for="(_, idx) in parsedVideos"
            :key="idx"
            class="social-dot"
            :class="idx === current ? 'social-dot--active' : ''"
            role="tab"
            :aria-selected="idx === current"
            :aria-label="`Video ${idx + 1}`"
            @click="current = idx"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

const stageRef = ref<HTMLElement | null>(null)
const current = ref(3)

// ---- Navigation ----
const navigate = (dir: number) => {
  const len = parsedVideos.value.length
  if (!len) return
  current.value = (current.value + dir + len) % len
}

// ---- Touch / Swipe ----
let tx0 = 0
let dx = 0

const onTouchStart = (e: TouchEvent) => { tx0 = e.touches[0].clientX; dx = 0 }
const onTouchMove = (e: TouchEvent) => { dx = e.touches[0].clientX - tx0 }
const onTouchEnd = () => {
  if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1)
  dx = 0
}

// ---- Card click ----
const onCardClick = (idx: number, url: string) => {
  if (idx !== current.value) { current.value = idx; return }
  window.open(url, '_blank', 'noopener,noreferrer')
}

// ---- 3D positioning ----
const cardStyle = (idx: number) => {
  const diff = idx - current.value
  const abs = Math.abs(diff)

  // Off-screen cards
  if (abs > 3) return { opacity: 0, pointerEvents: 'none' as const, transform: 'scale(0)' }

  const tx = diff * 58         // horizontal spread %
  const tz = -abs * 80          // depth push
  const ry = diff * -8          // Y-axis rotation
  const s = abs === 0 ? 1 : Math.max(0.7, 1 - abs * 0.12)
  const o = abs === 0 ? 1 : Math.max(0, 1 - abs * 0.3)

  return {
    transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${s})`,
    opacity: o,
    zIndex: 20 - abs,
    pointerEvents: abs > 2 ? 'none' as const : 'auto' as const,
    filter: abs > 0 ? `brightness(${0.55 + (1 - abs * 0.15) * 0.45})` : 'none',
  }
}

// ---- Platform icons ----
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

// ---- Video data ----
function detectPlatform(url: string): 'TikTok' | 'Instagram' | 'YouTube' {
  if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) return 'TikTok'
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  return 'TikTok'
}

function getYouTubeThumbnail(url: string): string | null {
  let id: string | null = null
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  id = shortMatch?.[1] || watchMatch?.[1] || shortUrlMatch?.[1] || null
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return null
}

const defaultVideos = [
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE1', title: 'Test du Geestock en salle de sport', thumbnail: '/images/product/product-1.jpg' },
  { url: 'https://www.instagram.com/reel/EXAMPLE2/', title: 'Unboxing Geestock - Mon avis honnete', thumbnail: '/images/product/product-2.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE3', title: 'Le sac magnetique qui change tout', thumbnail: '/images/product/product-3.png' },
  { url: 'https://www.youtube.com/shorts/EXAMPLE4', title: 'Review complete du Geestock', thumbnail: '/images/product/product-4.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE5', title: 'Geestock vs sac classique - Comparatif', thumbnail: '/images/product/product-5.png' },
  { url: 'https://www.tiktok.com/@geestock/video/EXAMPLE6', title: 'Je teste le Geestock en randonnee', thumbnail: '/images/product/product-6.png' },
]

const videos = ref(defaultVideos)

onMounted(() => {
  const saved = localStorage.getItem('geestock_social_videos')
  if (saved) {
    const parsed = JSON.parse(saved)
    if (parsed.length > 0) videos.value = parsed
  }
})

const parsedVideos = computed(() =>
  videos.value
    .filter((v: any) => v.url && v.url.trim() !== '')
    .map((v: any) => {
      const platform = detectPlatform(v.url)
      let thumbnail = v.thumbnail
      if (platform === 'YouTube' && !thumbnail) thumbnail = getYouTubeThumbnail(v.url) || '/images/product/product-1.jpg'
      if (!thumbnail) thumbnail = '/images/product/product-1.jpg'
      return { ...v, platform, thumbnail }
    }),
)

</script>

<style scoped>
/* ---- Stage: 3D perspective container ---- */
.social-stage {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  height: clamp(280px, 55vh, 480px);
  position: relative;
  outline: none;
}

/* ---- Card: absolutely centered, 3D-transformed ---- */
.social-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: clamp(160px, 42vw, 260px);
  height: 100%;
  margin-left: calc(clamp(160px, 42vw, 260px) / -2);
  border-radius: 1rem;
  overflow: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  cursor: pointer;
}

/* ---- Active card glow ---- */
.social-card__glow {
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  box-shadow:
    0 0 30px rgba(16, 185, 129, 0.15),
    inset 0 0 0 1.5px rgba(16, 185, 129, 0.25);
}

.social-card--active .social-card__glow {
  opacity: 1;
}

/* ---- Play button: visible on active hover ---- */
.social-card__play {
  transition: opacity 0.3s ease;
}

.social-card--active:hover .social-card__play {
  opacity: 1;
}

/* ---- Dots ---- */
.social-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.social-dot:hover {
  background: rgba(255, 255, 255, 0.35);
}

.social-dot--active {
  width: 28px;
  background: #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}

/* ---- Desktop: larger cards ---- */
@media (min-width: 640px) {
  .social-stage {
    height: clamp(360px, 60vh, 540px);
  }

  .social-card {
    width: clamp(220px, 22vw, 300px);
    margin-left: calc(clamp(220px, 22vw, 300px) / -2);
    border-radius: 1.25rem;
  }

  .social-card__glow {
    border-radius: 1.25rem;
  }

  .social-dot--active {
    width: 32px;
  }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .social-card {
    transition: none;
  }
  .social-card__glow,
  .social-card__play,
  .social-dot {
    transition: none;
  }
}
</style>
