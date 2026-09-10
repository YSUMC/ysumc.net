<script setup lang="ts">
import AutoLink from '../public/AutoLink.vue';

const props = defineProps<{
  prev?: { title: string; link: string }
  next?: { title: string; link: string }
  list?: { title: string; link: string }
}>()
</script>

<template>
  <div class="not-prose w-full max-w-7xl mx-auto my-14 px-6 xl:px-0">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <div v-if="props.prev" class="bg-white shadow-lg p-6 flex flex-col justify-center md:text-left">
        <p class="text-sm text-gray">上一篇</p>
        <AutoLink
            :to="props.prev.link"
            class="mt-2 text-lg md:text-xl font-ysumc text-black hover:text-blue-dark transition"
        >{{ props.prev.title }}</AutoLink>
      </div>
      <div v-else class="hidden md:block"></div>
      <div v-if="props.list" class="bg-base-white shadow-lg p-6 flex flex-col justify-center text-center">
        <AutoLink
            :to="props.list.link"
            class="text-lg md:text-xl font-ysumc text-gray hover:text-black-dark transition"
        >{{ props.list.title }}</AutoLink>
      </div>
      <div v-if="props.next" class="bg-white shadow-lg p-6 flex flex-col justify-center md:text-right">
        <p class="text-sm text-gray">下一篇</p>
        <AutoLink
            :to="props.next.link"
            class="mt-2 text-lg md:text-xl font-ysumc text-black hover:text-blue-dark transition"
        >{{ props.next.title }}</AutoLink>
      </div>
      <div v-else class="hidden md:block"></div>
    </div>
  </div>
</template>
