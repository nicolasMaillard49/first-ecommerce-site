<template>
  <section id="social-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/3 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14 sm:mb-20 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Social</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Vu sur les <span class="text-brand">Réseaux Sociaux</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Notre communauté adore le ClipBag. Découvrez leurs avis authentiques.
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
        </div>
      </div>

      <!-- Carousel auto-scroll -->
      <div class="relative overflow-hidden" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
        <div
          ref="trackRef"
          class="social-track flex gap-4 sm:gap-6"
          :style="{ transform: `translateX(-${scrollOffset}px)` }"
        >
          <!-- Render doubled for infinite loop -->
          <div
            v-for="(post, idx) in doubledPosts"
            :key="idx"
            class="social-post-card flex-shrink-0 w-64 sm:w-72"
            :style="{ animationDelay: `${(idx % posts.length) * 0.1}s` }"
          >
            <!-- Post header -->
            <div class="flex items-center gap-3 mb-3">
              <!-- Avatar -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-2 ring-white/10"
                :style="{ background: post.avatarColor }"
              >
                {{ post.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white font-semibold text-sm truncate">{{ post.username }}</p>
                <div class="flex items-center gap-1 mt-0.5">
                  <svg v-for="s in 5" :key="s" class="w-3 h-3" :class="s <= post.stars ? 'text-yellow-400' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <!-- Platform badge -->
              <div class="flex-shrink-0">
                <div v-if="post.platform === 'instagram'" class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div v-else class="w-7 h-7 rounded-full bg-black border border-white/20 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Comment -->
            <p class="text-gray-300 text-sm leading-relaxed">{{ post.comment }}</p>

            <!-- Likes -->
            <div class="flex items-center gap-1.5 mt-3">
              <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span class="text-xs text-gray-500">{{ post.likes }} j'aime</span>
            </div>
          </div>
        </div>

        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const trackRef = ref<HTMLElement | null>(null)
const scrollOffset = ref(0)
let animFrame: number | null = null
let paused = ref(false)

interface SocialPost {
  username: string
  initials: string
  avatarColor: string
  platform: 'instagram' | 'tiktok'
  stars: number
  comment: string
  likes: number
}

const posts: SocialPost[] = [
  {
    username: '@thomas_lift',
    initials: 'TH',
    avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    platform: 'instagram',
    stars: 5,
    comment: '🔥 Franchement incroyable. Ma bouteille reste accrochée sur le rack pendant toute ma séance. Plus jamais sans !',
    likes: 247,
  },
  {
    username: '@sophie_yoga',
    initials: 'SY',
    avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    platform: 'tiktok',
    stars: 5,
    comment: '💕 Parfait pour le yoga et le pilates. Discret, léger, et vraiment pratique. Je recommande à toutes mes copines !',
    likes: 189,
  },
  {
    username: '@marc_running',
    initials: 'MR',
    avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    platform: 'tiktok',
    stars: 5,
    comment: '⚡ Testé en trail de 20km. La fixation tient parfaitement même dans les descentes techniques. Bluffant !',
    likes: 312,
  },
  {
    username: '@lena_fitness',
    initials: 'LF',
    avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    platform: 'instagram',
    stars: 5,
    comment: '✨ Design super stylé et qualité premium. Tout le monde me demande où je l\'ai trouvé en salle. Merci ClipBag !',
    likes: 203,
  },
  {
    username: '@julien_crossfit',
    initials: 'JC',
    avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    platform: 'tiktok',
    stars: 5,
    comment: '💪 Les aimants sont ultra costauds. Pendant les WODs les plus intenses, ma gourde reste en place. Top produit !',
    likes: 445,
  },
  {
    username: '@camille_rando',
    initials: 'CR',
    avatarColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    platform: 'instagram',
    stars: 5,
    comment: '🏔️ Testé sur tous les sentiers des Alpes. Se fixe sur les poteaux, les garde-fous... partout ! Révolutionnaire.',
    likes: 178,
  },
  {
    username: '@alexis_velo',
    initials: 'AV',
    avatarColor: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    platform: 'tiktok',
    stars: 5,
    comment: '🚴 Sur mon vélo de montagne, il se fixe sur le cadre en acier. Hydratation accessible sans m\'arrêter. Génie !',
    likes: 267,
  },
  {
    username: '@noemie_sport',
    initials: 'NS',
    avatarColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    platform: 'instagram',
    stars: 5,
    comment: '🌟 J\'étais sceptique mais après 2 mois d\'utilisation quotidienne, c\'est le meilleur achat sport de l\'année !',
    likes: 334,
  },
]

const doubledPosts = computed(() => [...posts, ...posts])

const CARD_WIDTH = 288 + 24 // w-72 + gap-6 (approx)
const totalWidth = computed(() => posts.length * CARD_WIDTH)

const animate = () => {
  if (!paused.value) {
    scrollOffset.value += 0.5
    if (scrollOffset.value >= totalWidth.value) {
      scrollOffset.value = 0
    }
  }
  animFrame = requestAnimationFrame(animate)
}

const pauseScroll = () => { paused.value = true }
const resumeScroll = () => { paused.value = false }

onMounted(() => {
  animFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.social-track {
  will-change: transform;
  transition: none;
}

.social-post-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 1rem;
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.social-post-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  .social-track { transition: none; }
  .social-post-card:hover { transform: none; }
}
</style>
