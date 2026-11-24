<script setup lang="ts">
// 三种用法：
//   screen —— 整屏英雄图，内容是居中的标题/正文或插槽
//   banner —— 文章顶部 384px 横幅，标题/副标题/标签落在左下角
//   inline —— 高度由内容撑起（正文里的视差块），只用插槽
const props = defineProps<{
  image: string
  variant?: 'screen' | 'banner' | 'inline'
  video?: string[]
  dark?: number | string
  title?: string
  text?: string
  tags?: string[]
}>()

const section = ref<HTMLElement>()
const imageStyle = useParallax(section)
useImmersiveHeaderBlock(section, () => true)

const sectionClass = computed(
  () =>
    ({
      screen: 'flex h-dvh items-center justify-center text-white',
      banner: 'flex h-96 items-end px-4 pb-8 md:px-32 md:pb-16',
      inline: '',
    })[props.variant || 'screen'],
)

</script>

<template>
  <section
    ref="section"
    class="not-prose relative isolate w-full overflow-hidden"
    :class="sectionClass"
  >
    <video
      v-if="video?.length"
      class="absolute left-0 top-0 -z-10 h-full w-full object-cover will-change-transform"
      :style="{ filter: `brightness(${props.dark ?? 1})`, ...imageStyle }"
      :poster="props.image"
      muted
      autoplay
      loop
      playsinline
    >
      <source v-for="source in video" :key="source" :src="source" />
    </video>
    <NuxtImg
      v-else
      :src="props.image"
      sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
      format="webp"
      class="absolute left-0 top-0 -z-10 h-full w-full object-cover will-change-transform"
      :style="{ filter: `brightness(${props.dark ?? 1})`, ...imageStyle }"
      :alt="props.title || ''"
    />
    <div
      v-if="props.variant !== 'banner' && (title || text)"
      class="px-6 text-center"
    >
      <h1 v-if="title" class="font-ysumc text-5xl">{{ title }}</h1>
      <p v-if="text" class="pt-6 text-xl" v-html="text" />
    </div>
    <div v-else-if="title || text" class="text-white">
      <h1 v-if="title" class="font-ysumc text-2xl md:text-5xl">{{ title }}</h1>
      <p
        v-if="text"
        class="mt-4 text-base/relaxed md:text-xl"
        v-html="text"
      />
      <div v-if="tags?.length" class="mt-6 flex flex-wrap gap-4">
        <span
          v-for="tag in tags"
          :key="tag"
          class="inline-block rounded bg-white px-4 py-2 text-sm font-semibold text-ink md:text-base/relaxed"
          >{{ tag }}</span
        >
      </div>
    </div>
    <slot v-else />
  </section>
</template>
