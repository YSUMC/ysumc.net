<script setup lang="ts">
const props = defineProps<{
  title: string
  tags?: string[]
  color?: string
  dark?: boolean
}>()
</script>

<template>
  <div
    class="shadow-lg my-10 p-10"
    :class="props.dark ? 'bg-black' : props.color==='red'?'bg-red-dark':'bg-white'"
  >
    <div v-if="title" class="text-3xl md:text-4xl mb-4 font-ysumc" :class="props.dark || props.color ? 'text-white' : 'text-gray4'">
      {{ props.title }}
    </div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in props.tags"
        :key="tag"
        class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
      >
        {{ tag }}
      </span>
    </div>
    <div class="text-base" :class="props.dark || props.color ? 'text-white' : 'text-black'">
      <slot />
    </div>
  </div>
</template>
