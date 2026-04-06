<template>
  <div class="inline-flex items-center gap-2 bg-surface/80 border border-surface-lighter rounded-full px-4 py-2">
    <span class="relative flex h-2.5 w-2.5">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span class="text-sm text-gray-300">
      <span class="font-semibold text-white tabular-nums">{{ viewers }}</span> personnes regardent ce produit
    </span>
  </div>
</template>

<script setup lang="ts">
const MIN_VIEWERS = 6
const MAX_VIEWERS = 12

const viewers = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const nextViewers = (current: number): number => {
  // Soft variation: ±1 or ±2 max, always clamped between MIN and MAX
  const delta = randomBetween(-2, 2)
  return Math.min(MAX_VIEWERS, Math.max(MIN_VIEWERS, current + delta))
}

onMounted(() => {
  viewers.value = randomBetween(MIN_VIEWERS, MAX_VIEWERS)

  const scheduleNext = () => {
    const delay = randomBetween(20_000, 40_000)
    interval = setTimeout(() => {
      viewers.value = nextViewers(viewers.value)
      scheduleNext()
    }, delay)
  }

  scheduleNext()
})

onUnmounted(() => {
  if (interval) clearTimeout(interval)
})
</script>
