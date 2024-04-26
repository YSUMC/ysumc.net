<script setup lang="ts">
import Button from "./public/Button.vue";

const props = defineProps<{
  title: string
  image: string
  link: string
}>()
</script>

<template>
  <div class="shadow-lg overflow-hidden bg-white flex flex-col">
    <img :src="props.image" class="w-full aspect-video object-cover" alt="图片"/>
    <div class="pt-8 px-8">
      <h3 class="text-xl leading-normal text-center">
        <b>{{ props.title }}</b>
      </h3>
      <p class="text-base md:text-lg mb-8 mt-4 leading-normal indent-9">
        <slot/>
      </p>
    </div>
    <Button
        text="详细信息"
        :link="props.link"
        class="self-start mt-auto mb-8 ml-8"
    />
  </div>
</template>
