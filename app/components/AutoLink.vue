<script setup lang="ts">
const props = defineProps<{ to: string }>()

const external = computed(() => /^https?:\/\//.test(props.to))
</script>

<template>
  <a v-if="external" :href="to" target="_blank" rel="noopener"><slot /></a>
  <NuxtLink v-else :to="to"><slot /></NuxtLink>
</template>
