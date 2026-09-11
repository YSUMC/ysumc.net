<script setup lang="ts">
defineProps<{
  title: string
  time: string
  image: string
  text: string
  download?: string
  downloads?: { label: string; to?: string }[]
}>()
</script>

<template>
  <div class="not-prose w-full bg-white py-16">
    <div class="items-center lg:mx-10 lg:flex lg:justify-start">
      <NuxtImg
        :src="image"
        sizes="sm:100vw md:66vw"
        class="aspect-video w-full object-cover shadow-lg lg:w-2/3"
        :alt="title"
      />
      <div class="w-0 xl:w-[5%]" />
      <div class="ml-8 mt-8 lg:mt-0 xl:ml-0">
        <p class="font-ysumc text-3xl xl:text-4xl">{{ time }}</p>
        <h2 class="-ml-2 pt-4 font-ysumc text-2xl xl:text-3xl">{{ title }}</h2>
        <div class="mb-6 mt-12 text-base xl:text-lg" v-html="text" />
        <div class="flex flex-wrap gap-4">
          <template v-if="downloads">
            <SiteButton
              v-for="(item, index) in downloads"
              :key="item.label"
              :text="item.label"
              :color="index === 0 ? 'gray' : 'pink'"
              :to="item.to"
            />
          </template>
          <SiteButton
            v-else-if="download"
            text="下载原图"
            :to="download"
            download
          />
        </div>
      </div>
    </div>
  </div>
</template>
