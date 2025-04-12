<script setup lang="ts">
import {ref, onMounted, inject} from 'vue'
import {useIntersectionObserver} from '@vueuse/core'

const jarallaxItem = ref()
const target = ref()
const setNavBar = inject('setNavBar')
const j = inject('jarallax')

const inViewport = ref(false)

const props = defineProps<{
  image: string
  dark?: number | string
  title?: string
  text?: string
  isVideo?: boolean
  backupImg?: string
}>()

onMounted(() => {
  if (props.isVideo) {
    j.jarallaxVideo()
    j.jarallax(jarallaxItem.value, {
      speed: 0.6,
      videoSrc: props.image,
      videoLazyLoading: false,
      // imgPosition: '50% 50%',
    })
    return
  }
  j.jarallax(jarallaxItem.value, {
    speed: 0.6,
    // imgPosition: '50% 50%',
  })
})

const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!__VUEPRESS_SSR__) {
          window.addEventListener('scroll', handleScroll)
        }
      } else {
        if (!__VUEPRESS_SSR__) {
          setNavBar(false)
          window.removeEventListener('scroll', handleScroll)
        }
      }
    },
)

function handleScroll() {
  if (!__VUEPRESS_SSR__) {
    if (!target.value) return
    const a = target.value.getBoundingClientRect()
    if (a.top < 40 && a.bottom > 0) {
      setNavBar(true)
    }
  }
}
</script>

<template>
  <div class="not-prose w-full relative overflow-hidden" ref="target">
    <div
        class="relative h-dvh jarallax flex items-center justify-center"
        ref="jarallaxItem"
    >
      <img
          v-if="!props.isVideo || props.backupImg"
          :src="props.isVideo ? props.backupImg : props.image"
          class="absolute m-auto inset-0 -z-10 jarallax-img"
          :style="props.dark ? `filter: brightness(${props.dark})` : ''"
          alt="hero image"
      />
      <div v-if="title || text" class="text-white text-center">
        <h1 v-if="title" class="text-5xl font-ysumc">{{ props.title }}</h1>
        <p v-if="text" v-html="props.text" class="text-xl pt-6"></p>
      </div>
      <slot v-else></slot>
    </div>
  </div>
</template>
