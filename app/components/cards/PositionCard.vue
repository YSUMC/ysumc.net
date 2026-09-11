<script setup lang="ts">
defineProps<{
  items: { title: string; text: string; icon: string; color?: string }[]
}>()
</script>

<template>
  <div class="not-prose flex w-full flex-wrap justify-center gap-6 py-2">
    <div
      v-for="item in items"
      :key="item.title"
      class="w-full md:w-1/3 lg:w-1/5"
    >
      <Icon
        :name="item.icon"
        class="mx-auto block size-18"
        :class="item.color || 'text-gray'"
      />
      <h4 class="pb-3 pt-8 text-center text-xl">
        <b>{{ item.title }}</b>
      </h4>
      <p class="text-lg" v-html="item.text" />
    </div>
  </div>
</template>
