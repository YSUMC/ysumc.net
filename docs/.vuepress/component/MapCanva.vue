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

const emit = defineEmits(['zoom','pointclick','mapclick']);

onMounted(async () => {
  const mapData = await import('@/mapdata/dataloader.js');

  map = L.map(mapContainer.value, mapData.mapOptions);

  markerLayer = mapData.markerLayer;
  eggLayer = mapData.eggLayer;

  map.addLayer(mapData.mapLayer)
  map.addLayer(mapData.markerLayer);

  mapData.markers.forEach((marker) => {
    marker.on('click', () => {
      emit('pointclick', marker.rawPoint);
    });
  });

  map.on('click', (e) => {
    emit('mapclick', e.latlng);
  });

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
  </div>
</template>

<style></style>
