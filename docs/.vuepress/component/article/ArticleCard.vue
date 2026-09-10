<script setup lang="ts">
import Button from '../public/Button.vue';

const props = defineProps<{
  title: string
  time: string
  tag: string
  image: string
  text: string
  link: string
}>()
</script>

<template>
  <div class="not-prose bg-white shadow-lg overflow-hidden flex flex-col">
    <img :src="props.image" class="w-full aspect-video object-cover" alt="article cover" />
    <div class="pt-8 px-8 grow">
      <div class="flex items-center gap-3 flex-wrap">
        <span class="bg-blue text-white rounded px-3 py-1 text-sm font-bold">{{ props.tag }}</span>
        <span class="text-sm text-gray">{{ props.time }}</span>
      </div>
      <h3 class="text-2xl font-ysumc mt-4">{{ props.title }}</h3>
      <p class="text-base/relaxed md:text-lg mt-4">{{ props.text }}</p>
    </div>
    <Button
        text="阅读文章"
        :link="props.link"
        class="self-start mt-6 mb-8 ml-8"
    />
  </div>
</template>
