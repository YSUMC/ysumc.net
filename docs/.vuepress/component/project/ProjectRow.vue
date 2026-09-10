<script setup lang="ts">
import Button from '../public/Button.vue';

const props = defineProps<{
  title: string
  subtitle?: string
  time?: string
  link?: string
  state: 0 | 1 | 2
  image: string
  dark?: boolean
}>()
</script>

<template>
  <div
      class="not-prose md:flex md:items-center p-2 md:py-16 md:px-10 shadow-lg mb-8"
      :class="dark ? 'bg-black' : 'bg-white'"
  >
    <img
        :src="props.image"
        class="aspect-video w-full object-cover md:hidden"
        alt="project image"
    />
    <div class="pb-12 md:pb-0 pl-2 md:pl-0" :class="{ 'text-white': dark }">
      <h2
          class="text-[1.4rem] md:text-3xl pb-2 leading-normal font-ysumc mt-6"
          v-html="props.title"
      ></h2>
      <p class="text-base md:text-lg pt-2">{{ props.subtitle || ' ' }}</p>
      <p class="text-base md:text-lg pb-12">{{ props.time || ' ' }}</p>
      <Button
          :text="['了解更多', 'WIP', '已写入计划'][props.state]"
          :color="dark ? 'white' : ['blue', 'pink', 'gray'][props.state]"
          :link="props.link"
      />
    </div>
    <img
        :src="props.image"
        class="aspect-video w-1/2 ml-auto hidden md:inline-block object-cover"
        alt="project image"
    />
  </div>
</template>
