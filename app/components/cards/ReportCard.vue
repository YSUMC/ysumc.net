<script setup lang="ts">
import type { ReportItem } from '#shared/types/content'

defineProps<{ item: ReportItem }>()
</script>

<template>
  <div class="not-prose flex flex-col overflow-hidden bg-white shadow-lg">
    <NuxtImg
      :src="item.image"
      sizes="sm:100vw md:50vw"
      class="aspect-video w-full object-cover"
      :alt="item.title"
    />
    <div class="grow px-8 pt-8">
      <div class="flex flex-wrap items-center gap-3">
        <span class="rounded bg-brand px-3 py-1 text-sm font-bold text-white">{{
          item.tag
        }}</span>
        <span class="text-sm text-gray">{{ item.displayDate }}</span>
      </div>
      <h3 class="mt-4 font-ysumc text-2xl">{{ item.title }}</h3>
      <p class="mt-4 text-base/relaxed md:text-lg">{{ item.summary }}</p>
    </div>
    <SiteButton
      text="阅读文章"
      :to="item.path"
      class="mb-8 ml-8 mt-6 self-start"
    />
  </div>
</template>
