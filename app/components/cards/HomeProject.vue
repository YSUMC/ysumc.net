<script setup lang="ts">
defineProps<{ title: string; image: string; to: string }>()
</script>

<template>
  <div class="not-prose flex flex-col overflow-hidden bg-white shadow-lg">
    <NuxtImg
      :src="image"
      sizes="sm:100vw md:50vw"
      class="aspect-video w-full object-cover"
      :alt="title"
    />
    <div class="px-8 pt-8">
      <h3 class="text-center text-xl leading-normal">
        <b>{{ title }}</b>
      </h3>
      <p class="mb-8 mt-4 indent-9 text-base/normal leading-normal md:text-lg">
        <slot />
      </p>
    </div>
    <SiteButton text="详细信息" :to="to" class="mb-8 ml-8 mt-auto self-start" />
  </div>
</template>
