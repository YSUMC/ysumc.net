<script setup lang="ts">
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'

const props = defineProps<{
  image: string
  dark?: number | string
  title?: string
  text?: string
}>()
const target = ref<HTMLElement>()
const setNavBar = inject<(transparent?: boolean, color?: 'white' | 'black') => void>('setNavBar')
const { y } = useWindowScroll()
const offset = computed(() => Math.min(y.value * 0.12, 90))

useIntersectionObserver(target, ([entry]) => setNavBar?.(!entry?.isIntersecting, 'white'))
</script>

<template>
  <section ref="target" class="not-prose relative isolate h-dvh overflow-hidden flex items-center justify-center text-white">
    <NuxtImg
      :src="props.image"
      sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
      format="webp"
      class="absolute inset-0 -z-10 h-[112%] w-full object-cover will-change-transform"
      :style="{ filter: `brightness(${props.dark ?? 1})`, transform: `translateY(${offset}px)` }"
      :alt="props.title || ''"
    />
    <div v-if="title || text" class="px-6 text-center">
      <h1 v-if="title" class="font-ysumc text-4xl md:text-6xl">{{ title }}</h1>
      <p v-if="text" class="pt-6 text-lg md:text-xl" v-html="text" />
    </div>
    <slot v-else />
  </section>
</template>
