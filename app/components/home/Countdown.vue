<script setup lang="ts">
const props = defineProps<{ time: Date; title?: string; image?: string }>()
const values = ref(['00', '00', '00', '00'])
const section = ref<HTMLElement>()
const imageStyle = useParallax(section)
let timer: ReturnType<typeof setInterval> | undefined
const updateValues = () => {
  const diff = Math.max(0, props.time.getTime() - Date.now())
  values.value = [
    Math.floor(diff / 86400000),
    Math.floor(diff / 3600000) % 24,
    Math.floor(diff / 60000) % 60,
    Math.floor(diff / 1000) % 60,
  ].map((value) => String(value).padStart(2, '0'))
}
onMounted(() => {
  updateValues()
  timer = setInterval(updateValues, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
<template>
  <section
    ref="section"
    class="not-prose relative isolate w-full overflow-hidden text-white"
    :class="image ? 'py-14' : 'py-0'"
  >
    <NuxtImg
      v-if="image"
      :src="image"
      sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
      class="absolute left-0 top-0 -z-10 h-full w-full object-cover brightness-50 will-change-transform"
      :style="imageStyle"
      alt=""
    />
    <div class="mx-auto max-w-4xl text-center">
      <h1 v-if="title" class="font-ysumc text-2xl md:text-5xl">{{ title }}</h1>
      <div class="mb-8 mt-14 flex items-end">
        <div v-for="(value, index) in values" :key="index" class="w-1/4">
          <span class="font-ysumc text-4xl md:text-6xl">{{ value }}</span>
          <p class="text-xl md:text-2xl">
            {{ ['天', '时', '分', '秒'][index] }}
          </p>
        </div>
      </div>
      <div class="text-center text-sm text-white md:text-xl"><slot /></div>
    </div>
  </section>
</template>
