<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <section class="not-prose w-full px-6 py-14 text-center">
    <h2 v-if="title" class="mb-10 font-ysumc text-3xl md:text-4xl">{{ title }}</h2>
    <slot />
  </section>
</template>
