<script setup lang="ts">
import type { MapPoint } from '~/data/map/types'
definePageMeta({ layout: 'map' })
const setNavBar =
  inject<(transparent?: boolean, color?: 'white' | 'black') => void>(
    'setNavBar',
  )
const showBar = ref(true),
  titleMode = ref(true),
  selected = ref<MapPoint>()
function onZoom(zoom: number) {
  setNavBar?.(zoom > 1, 'white')
  if (zoom <= 1) {
    if (titleMode.value && showBar.value) return
    showBar.value = false
    const wasTitle = titleMode.value
    setTimeout(
      () => {
        titleMode.value = true
        showBar.value = true
      },
      wasTitle ? 0 : 300,
    )
  } else if (titleMode.value) {
    showBar.value = false
  }
}
function onPoint(point: MapPoint) {
  titleMode.value = false
  const wasShown = showBar.value
  if (wasShown && selected.value === point) return
  showBar.value = false
  setTimeout(
    () => {
      selected.value = point
      showBar.value = true
    },
    wasShown ? 300 : 0,
  )
}
function onMap() {
  if (!titleMode.value) showBar.value = false
}
useSeoMeta({
  title: '像素燕大全导览图 - 燕山大学MC社',
  description: '像素燕大燕山大学复原计划交互式全导览图。',
  ogImage: '/image/gf.png',
})
</script>
<template>
  <div class="h-dvh">
    <MapCanvas @zoom="onZoom" @pointclick="onPoint" @mapclick="onMap" />
    <aside
      class="fixed inset-x-0 bottom-0 z-[1000] bg-white/90 px-5 py-6 shadow-2xl backdrop-blur transition-transform duration-200 ease-in-out md:px-16 lg:flex lg:items-center lg:justify-between"
      :class="showBar ? 'translate-y-0' : 'translate-y-full'"
    >
      <div>
        <h1 class="font-ysumc text-xl md:text-2xl">
          {{
            titleMode
              ? '《像素燕大：燕山大学复原计划》全导览图（2024）'
              : selected?.title
          }}
        </h1>
        <p v-if="titleMode" class="mt-3 text-sm/relaxed md:text-base/relaxed">
          本图按燕山大学2024年5月时的燕山大学复原，在当时未建成的建筑按已完成计，蓝本为其效果图。<br />本图内景行路围地和不属于燕山大学行政管理范围内的建筑均未予复原。<br />本图的园林设计不能准确反映燕山大学实际的园林设计。
        </p>
        <div v-else class="mt-3">
          <span
            v-for="tag in selected?.label"
            :key="tag"
            class="mr-2 inline-block rounded bg-brand px-4 py-2 text-white"
            >{{ tag }}</span
          >
        </div>
      </div>
      <div v-if="titleMode" class="mt-4 hidden gap-8 lg:flex">
        <div class="text-center">
          <img src="/icons/map/left-click.svg" class="mx-auto h-14" alt="" />
          <p class="mt-2 text-sm">按住左键拖动以移动</p>
        </div>
        <div class="text-center">
          <img src="/icons/map/middle-click.svg" class="mx-auto h-14" alt="" />
          <p class="mt-2 text-sm">鼠标滚轮可缩放大小</p>
        </div>
      </div>
      <p v-else class="mt-3 lg:mt-0 lg:text-right" v-html="selected?.text" />
    </aside>
  </div>
</template>
