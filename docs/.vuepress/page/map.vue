<script setup lang="ts">
import MapCanva from '@/component/MapCanva.vue';
import { inject, onMounted, ref } from 'vue';

const setNavBar = inject('setNavBar');

onMounted(() => {
  setNavBar(false);
});

const showBar = ref(true);
const barIsTitle = ref(true);

const barTitle = ref('');
const barTags = ref([]);
const barText = ref('');
const pointColor = ref('blue');

const colorList = {
  blue: '#66cccc',
  blueDark: '#1f296a',
  red: '#cc6666',
  orange: '#d36839',
  gray: '#777777',
  redDark: '#9c292d',
  gate: '#1f296a',
};

function onZoom(zoom) {
  if (zoom <= 1) {
    setNavBar(false);
    if (barIsTitle.value && showBar.value) return;
    showBar.value = false;
    const barIsTitleOld = barIsTitle.value;
    setTimeout(
      () => {
        barIsTitle.value = true;
        showBar.value = true;
      },
      barIsTitleOld ? 0 : 300
    );
  } else {
    setNavBar(true);
    if (!barIsTitle.value) return;
    showBar.value = false;
  }
}

function onPointclick(point) {
  barIsTitle.value = false;
  const showBarOld = showBar.value;
  if (showBarOld && point.title === barTitle.value) return;
  showBar.value = false;
  setTimeout(
    () => {
      barTitle.value = point.title || '';
      barTags.value = point.label || [];
      barText.value = point.text || '';
      pointColor.value = point.color || 'blue';
      showBar.value = true;
    },
    showBarOld ? 300 : 0
  );
}

function onMapclick(latlng) {
  if (barIsTitle.value) return;
  showBar.value ? (showBar.value = false) : null;
}
</script>

<template>
  <div class="h-dvh">
    <MapCanva @zoom="onZoom" @pointclick="onPointclick" @mapclick="onMapclick" />
    <div class="w-dvw fixed shadow-2xl bottom-0 bg-white/90 backdrop-blur
        py-6 md:py-8 px-4 md:px-16 lg:px-20 xl:px-32 z-[10000]
        flex flex-col md:flex-row md:items-center md:justify-between
        transition-transform ease-in-out duration-200" :class="{ 'translate-y-full': !showBar, 'translate-y-0': showBar }">
      <div>
        <h1 class="font-ysumc text-xl md:text-2xl mb-2 md:mb-4">
          {{
            barIsTitle
              ? '《像素燕大：燕山大学复原计划》全导览图（2024）'
              : barTitle
          }}
        </h1>
        <p v-show="barIsTitle" class="text-sm md:text-base">
          本图按燕山大学2024年5月时的燕山大学复原，在当时未建成的建筑按已完成计，蓝本为其效果图。<br />
          本图内景行路围地和不属于燕山大学行政管理范围内的建筑均未予复原。<br />
          本图的园林设计不能准确反映燕山大学实际的园林设计。<br />
        </p>
        <div v-show="!barIsTitle">
          <span v-for="i in barTags" :key="i"
            class="inline-block text-white rounded px-3 md:px-4 py-1.5 md:py-2 font-bold text-sm md:text-base" :style="{
              backgroundColor: colorList[pointColor],
            }">
            {{ i }}
          </span>
        </div>
      </div>
      <div v-show="barIsTitle" class="hidden lg:flex flex-row items-center gap-8">
        <div>
          <img src="@/asset/icons/left-click.svg" class="h-16 mx-auto" />
          <p class="mt-4 text-sm">按住左键拖动以移动</p>
        </div>
        <div>
          <img src="@/asset/icons/middle-click.svg" class="h-16 mx-auto" />
          <p class="mt-4 text-sm">鼠标滚轮可缩放大小</p>
        </div>
      </div>
      <div v-show="!barIsTitle" class="text-left md:text-right mt-2 md:mt-0 text-sm md:text-base" v-html="barText">
      </div>
    </div>
  </div>
</template>

<style>
.leaflet-top {
  @apply mt-16;
}
</style>
