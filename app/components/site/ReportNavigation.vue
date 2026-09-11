<script setup lang="ts">
import type { ReportItem } from '#shared/types/content'
const props = defineProps<{ items: ReportItem[], currentPath: string }>()
const index = computed(() => props.items.findIndex(item => item.path === props.currentPath))
const previous = computed(() => index.value > 0 ? props.items[index.value - 1] : undefined)
const next = computed(() => index.value >= 0 ? props.items[index.value + 1] : undefined)
</script>
<template>
  <nav v-if="index >= 0" class="not-prose page-container my-12 grid gap-5 border-t border-black/10 pt-8 md:grid-cols-3" aria-label="文章导航">
    <NuxtLink v-if="previous" :to="previous.path" class="font-ysumc text-lg hover:text-brand-dark">← {{ previous.title }}</NuxtLink><span v-else />
    <NuxtLink to="/document/reports/" class="text-center font-ysumc text-lg text-gray hover:text-ink">返回文章目录</NuxtLink>
    <NuxtLink v-if="next" :to="next.path" class="text-right font-ysumc text-lg hover:text-brand-dark">{{ next.title }} →</NuxtLink>
  </nav>
</template>
