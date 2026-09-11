<script setup lang="ts">import type { ReportItem } from '#shared/types/content'; defineProps<{ item: ReportItem }>()</script>
<template>
  <NuxtLink :to="item.path" class="overflow-hidden bg-white shadow-lg">
    <NuxtImg :src="item.image" sizes="sm:100vw md:50vw" class="aspect-video w-full object-cover" :alt="item.title" />
    <div class="p-7"><p class="text-sm text-gray">{{ item.displayDate }} · {{ item.tag }}</p><h2 class="mt-3 font-ysumc text-2xl">{{ item.title }}</h2><p class="mt-4 leading-relaxed">{{ item.summary }}</p></div>
  </NuxtLink>
</template>
