<script setup lang="ts">
import MapCanva from '@/component/MapCanva.vue';
import { inject, onMounted, ref } from 'vue';

const setNavBar = inject('setNavBar');

onMounted(() => {
  setNavBar(false);
});

const showTitleBar = ref(true);
const zoomLevel = ref(1);

function onZoom(zoom) {
  zoomLevel.value = zoomLevel;
  if (zoom <= 1) {
    setNavBar(false);
    showTitleBar.value = true;
  } else {
    setNavBar(true);
    showTitleBar.value = false;
  }
}
</script>

<template>
  <div class="h-dvh">
    <MapCanva @zoom="onZoom" />
    <div
      class="w-dvw fixed shadow-2xl bottom-0 bg-white/90 backdrop-blur py-8 px-16 z-[10000] flex flex-row items-center justify-between transition-transform duration-200"
      :class="{ 'translate-y-full': !showTitleBar, 'translate-y-0': showTitleBar }"
    >
      <div>
        <h1 class="font-ysumc text-2xl mb-4">
          《像素燕大：燕山大学复原计划》全导览图（2024）
        </h1>
        <p>
          本图按燕山大学2024年5月时的燕山大学复原，在当时未建成的建筑按已完成计，蓝本为其效果图。<br />
          本图内景行路围地和不属于燕山大学行政管理范围内的建筑均未予复原。<br />
          本图的园林设计不能准确反映燕山大学实际的园林设计。<br />
        </p>
      </div>
      <div class="flex flex-row items-center gap-8">
        <div>
          <img src="@/asset/icons/left-click.svg" class="h-16 mx-auto" />
          <p class="mt-4 text-sm">按住左键拖动以移动</p>
        </div>
        <div>
          <img src="@/asset/icons/middle-click.svg" class="h-16 mx-auto" />
          <p class="mt-4 text-sm">鼠标滚轮可缩放大小</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.leaflet-top {
  @apply mt-16;
}
</style>
