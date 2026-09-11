<script setup lang="ts">
const props = defineProps<{ title?: string, tags?: string[], color?: string, dark?: boolean, actionButton?: {text:string,link:string}, image?: string }>()
</script>
<template>
  <section class="not-prose relative my-8 flex flex-col gap-5 p-6 shadow-lg md:flex-row md:items-center md:justify-between md:p-10" :class="dark?'bg-ink text-white':color==='red'?'bg-red text-white':'bg-white'">
    <div><h2 v-if="title" class="font-ysumc text-3xl mb-4">{{ title }}</h2><slot /></div>
    <NuxtLink v-if="actionButton" :to="actionButton.link" class="shrink-0 border-2 border-current px-5 py-2">{{ actionButton.text }}</NuxtLink>
  </section>
</template>
