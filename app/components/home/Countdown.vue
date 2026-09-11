<script setup lang="ts">
const props = defineProps<{ time: Date, title?: string, image?: string }>()
const values = ref(['00', '00', '00', '00'])
let timer: ReturnType<typeof setInterval> | undefined
const updateValues = () => {
  const diff = Math.max(0, props.time.getTime() - Date.now())
  values.value = [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60].map(value => String(value).padStart(2, '0'))
}
onMounted(() => {
  updateValues()
  timer = setInterval(updateValues, 1000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>
<template>
  <section class="not-prose relative isolate overflow-hidden py-14 text-white" :class="image ? 'min-h-80' : ''">
    <NuxtImg v-if="image" :src="image" sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw" class="absolute inset-0 -z-10 h-full w-full object-cover brightness-50" alt="" />
    <div class="page-container text-center"><h2 v-if="title" class="font-ysumc text-3xl md:text-5xl">{{ title }}</h2><div class="mt-12 grid grid-cols-4"><div v-for="(value,index) in values" :key="index"><strong class="font-ysumc text-4xl md:text-6xl">{{ value }}</strong><p class="text-lg">{{ ['天','时','分','秒'][index] }}</p></div></div><p class="mt-7"><slot /></p></div>
  </section>
</template>
