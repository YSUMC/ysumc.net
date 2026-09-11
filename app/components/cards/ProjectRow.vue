<script setup lang="ts">
import type { ProjectCardData } from '#shared/types/content'
defineProps<{ project: ProjectCardData }>()
const statusText = { completed: '已完成', ongoing: '进行中', closed: '已结束' }
</script>
<template>
  <NuxtLink :to="project.path" class="mb-8 grid overflow-hidden shadow-lg md:grid-cols-5" :class="project.dark ? 'bg-ink text-white' : 'bg-white'">
    <NuxtImg v-if="project.cardImage" :src="project.cardImage" sizes="sm:100vw md:40vw" class="h-full min-h-64 w-full object-cover md:col-span-2" :alt="project.title" />
    <div class="p-8 md:col-span-3 md:p-10">
      <p class="mb-3 text-sm opacity-70">{{ project.period }} <span v-if="project.status">· {{ statusText[project.status] }}</span></p>
      <h3 class="font-ysumc text-2xl md:text-3xl">{{ project.title }}</h3>
      <p class="mt-4 text-base/relaxed md:text-lg">{{ project.subtitle }}</p>
    </div>
  </NuxtLink>
</template>
