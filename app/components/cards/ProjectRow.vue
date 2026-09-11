<script setup lang="ts">
import type { ProjectCardData } from '#shared/types/content'

const props = defineProps<{ project: ProjectCardData }>()
const ongoing = computed(() => props.project.status === 'ongoing')
</script>

<template>
  <div
    class="not-prose mb-8 p-2 shadow-lg md:flex md:items-center md:px-10 md:py-16"
    :class="project.dark ? 'bg-ink text-white' : 'bg-white'"
  >
    <NuxtImg
      v-if="project.cardImage"
      :src="project.cardImage"
      sizes="sm:100vw md:50vw"
      class="aspect-video w-full object-cover md:hidden"
      :alt="project.title"
    />
    <div class="pb-12 pl-2 md:pb-0 md:pl-0">
      <h2 class="mt-6 pb-2 font-ysumc text-[1.4rem] leading-normal md:text-3xl">
        {{ project.title }}
      </h2>
      <p class="pt-2 text-base md:text-lg">{{ project.subtitle || ' ' }}</p>
      <p class="pb-12 text-base md:text-lg">{{ project.period || ' ' }}</p>
      <SiteButton
        :text="ongoing ? 'WIP' : '了解更多'"
        :color="project.dark ? 'white' : ongoing ? 'pink' : 'blue'"
        :to="project.path"
      />
    </div>
    <NuxtImg
      v-if="project.cardImage"
      :src="project.cardImage"
      sizes="sm:100vw md:50vw"
      class="ml-auto hidden aspect-video w-1/2 object-cover md:inline-block"
      :alt="project.title"
    />
  </div>
</template>
