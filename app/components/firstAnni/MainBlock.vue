<script setup lang="ts">
const props = defineProps<{
  title: string
  text?: string
  additionalImage?: string
  button?: {
    text?: string
    link?: string
    color?: 'blue' | 'pink' | 'gray' | 'white' | 'black'
  }
}>()
</script>

<template>
  <div class="w-full px-6 py-16 md:px-10">
    <h2 class="font-ysumc text-3xl md:text-5xl">{{ props.title }}</h2>
    <NuxtImg
      v-if="props.additionalImage"
      :src="props.additionalImage"
      class="mt-4 block w-32"
      alt="MUA"
    />
    <p
      v-if="props.text"
      class="mb-6 mt-10 text-base md:text-lg"
      v-html="props.text"
    />
    <p v-else class="mb-6 mt-10 text-base md:text-lg"><slot /></p>
    <SiteButton
      :text="props.button?.text || '了解更多'"
      :to="props.button?.link || undefined"
      :color="props.button?.color || 'white'"
    />
  </div>
</template>
