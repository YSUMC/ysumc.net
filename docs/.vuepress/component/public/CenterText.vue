<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="not-prose w-full text-center py-14 px-6">
    <h2 class="text-3xl md:text-4xl mb-10 font-ysumc" v-if="props.title">
      {{ props.title }}
    </h2>
    <p class="text-base md:text-lg"><slot></slot></p>
  </div>
</template>
