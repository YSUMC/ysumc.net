<script setup lang="ts">
import type { MapPoint } from '~/data/map/types'

const setNavBar =
  inject<(transparent?: boolean, color?: 'white' | 'black') => void>(
    'setNavBar',
  )
const zoom = ref(0)
const selected = ref<MapPoint>()
const isOverview = computed(() => zoom.value <= 0.5 + Number.EPSILON)
const barKey = computed(() => {
  if (selected.value) return selected.value.position.join(':')
  return isOverview.value ? 'title' : undefined
})

watch(isOverview, (overview) => setNavBar?.(!overview, 'white'), {
  immediate: true,
})

function onZoom(value: number) {
  zoom.value = value
}

function onPoint(point: MapPoint) {
  selected.value = point
}

function onMap() {
  selected.value = undefined
}
</script>

<template>
  <div class="h-dvh">
    <slot :on-zoom="onZoom" :on-point="onPoint" :on-map="onMap" />
    <Transition name="map-bar" mode="out-in">
      <aside
        v-if="barKey"
        :key="barKey"
        class="fixed inset-x-0 bottom-0 z-[1000] bg-white/90 px-5 py-6 shadow-2xl backdrop-blur md:px-16 lg:flex lg:items-center lg:justify-between"
      >
        <div>
          <h1 class="font-ysumc text-xl md:text-2xl">
            {{
              selected
                ? selected.title
                : '《像素燕大：燕山大学复原计划》全导览图（2024）'
            }}
          </h1>
          <p v-if="!selected" class="mt-3 text-sm/relaxed md:text-base/relaxed">
            本图按燕山大学2024年5月时的燕山大学复原，在当时未建成的建筑按已完成计，蓝本为其效果图。<br />本图内景行路围地和不属于燕山大学行政管理范围内的建筑均未予复原。<br />本图的园林设计不能准确反映燕山大学实际的园林设计。
          </p>
          <div v-else class="mt-3">
            <span
              v-for="tag in selected.label"
              :key="tag"
              class="mr-2 inline-block rounded bg-brand px-4 py-2 text-white"
              >{{ tag }}</span
            >
          </div>
        </div>
        <div v-if="!selected" class="mt-4 hidden gap-8 lg:flex">
          <div class="text-center">
            <img src="/icons/map/left-click.svg" class="mx-auto h-14" alt="" />
            <p class="mt-2 text-sm">按住左键拖动以移动</p>
          </div>
          <div class="text-center">
            <img
              src="/icons/map/middle-click.svg"
              class="mx-auto h-14"
              alt=""
            />
            <p class="mt-2 text-sm">鼠标滚轮可缩放大小</p>
          </div>
        </div>
        <p v-else class="mt-3 lg:mt-0 lg:text-right" v-html="selected.text" />
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.map-bar-enter-active,
.map-bar-leave-active {
  transition: transform 200ms ease-in-out;
}

.map-bar-enter-from,
.map-bar-leave-to {
  transform: translateY(100%);
}
</style>
