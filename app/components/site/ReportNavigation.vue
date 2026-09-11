<script setup lang="ts">
import type { ReportItem } from '#shared/types/content'

const props = defineProps<{ items: ReportItem[]; currentPath: string }>()
const index = computed(() =>
  props.items.findIndex((item) => item.path === props.currentPath),
)
const previous = computed(() =>
  index.value > 0 ? props.items[index.value - 1] : undefined,
)
const next = computed(() =>
  index.value >= 0 ? props.items[index.value + 1] : undefined,
)
</script>

<template>
  <div
    v-if="index >= 0"
    class="not-prose mx-auto my-14 grid w-full max-w-7xl grid-cols-1 items-stretch gap-4 px-6 md:grid-cols-3 xl:px-0"
  >
    <div
      v-if="previous"
      class="flex flex-col justify-center bg-white p-6 shadow-lg md:text-left"
    >
      <p class="text-sm text-gray">上一篇</p>
      <NuxtLink
        :to="previous.path"
        class="mt-2 font-ysumc text-lg text-ink transition hover:text-brand-dark md:text-xl"
        >{{ previous.title }}</NuxtLink
      >
    </div>
    <div v-else class="hidden md:block" />
    <div
      class="flex flex-col justify-center bg-base-white p-6 text-center shadow-lg"
    >
      <NuxtLink
        to="/document/reports/"
        class="font-ysumc text-lg text-gray transition hover:text-ink-dark md:text-xl"
        >返回文章目录</NuxtLink
      >
    </div>
    <div
      v-if="next"
      class="flex flex-col justify-center bg-white p-6 shadow-lg md:text-right"
    >
      <p class="text-sm text-gray">下一篇</p>
      <NuxtLink
        :to="next.path"
        class="mt-2 font-ysumc text-lg text-ink transition hover:text-brand-dark md:text-xl"
        >{{ next.title }}</NuxtLink
      >
    </div>
    <div v-else class="hidden md:block" />
  </div>
</template>
