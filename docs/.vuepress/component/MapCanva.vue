<script setup>
import 'leaflet/dist/leaflet.css';
import { inject,onMounted, ref } from 'vue';
import iconDisablePoint from '@/asset/icons/point_disable.svg';
import iconEnablePoint from '@/asset/icons/point_enable.svg';

const L = inject('leaflet');

const mapContainer = ref(null);
const showPoints = ref(true);
const eggCount = ref(0);

var map = {};
var markerLayer = {};
var eggLayer = {};

const emit = defineEmits(['zoom']);

onMounted(async () => {
  const mapData = await import('@/mapdata/dataloader.js');

  map = L.map(mapContainer.value, mapData.mapOptions);

  markerLayer = mapData.markerLayer;
  eggLayer = mapData.eggLayer;

  map.addLayer(mapData.mapLayer)
  map.addLayer(mapData.markerLayer);

  map.on('zoomend', () => {
    emit('zoom', map.getZoom());
  });
});

function togglePoints() {
  // TODO: 切换次数增多后的性能问题

  eggCount.value++;
  if (showPoints.value) {
    map.removeLayer(markerLayer);
    showPoints.value = false;
  } else {
    map.addLayer(markerLayer);
    showPoints.value = true;
  }

  if (eggCount.value > 10) return;
  // 控制彩蛋 Marker 的显示
  if (eggCount.value === 9) {
    map.addLayer(eggLayer);
  } else if (eggCount.value === 10) {
    map.removeLayer(eggLayer);
  }
}
</script>

<template>
  <div class="h-full">
    <button class="absolute top-36 left-3 bg-white p-1 rounded-sm shadow z-[401] hover:bg-base-white"
      @click="togglePoints">
      <img :src="showPoints ? iconDisablePoint : iconEnablePoint" class="h-[1.4rem]" />
    </button>
    <div ref="mapContainer" class="h-full"></div>
    <div
      class="h-40 w-dvw fixed shadow-2xl bottom-0 bg-white/90 backdrop-blur py-8 px-16 z-[10000] flex flex-row items-center justify-between transition-transform duration-200">
      <div>
        <h1 class="font-ysumc text-2xl mb-4">
          燕山大学图书馆（西）
        </h1>
        <span class="inline-block bg-blue text-white rounded px-4 py-2 font-semibold text-sm md:text-base">
          教学建筑
        </span>
      </div>
      <div class="flex flex-row items-center gap-8 text-right">
        2022年竣工，是燕山大学在新世纪下竣工的最大的建筑。<br />在复原计划中，我们特意将其放在最后复原，与东校区图书馆对账，有始有终。
      </div>
    </div>
  </div>
</template>

<style></style>
