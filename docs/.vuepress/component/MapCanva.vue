<script setup>
import 'leaflet/dist/leaflet.css';
import { inject, onMounted, ref } from 'vue';
import iconDisablePoint from '@/asset/icons/point_disable.svg';
import iconEnablePoint from '@/asset/icons/point_enable.svg';
import MapIcon from './map/MapIcon.vue';

const L = inject('leaflet');

const mapContainer = ref(null);
const showPoints = ref(true);
const eggCount = ref(0);
const selectedPoint = ref(Symbol());

const markerList = ref([]);

var map = {};
var markerLayer = {};
var eggLayer = {};

const emit = defineEmits(['zoom', 'pointclick', 'mapclick']);

onMounted(async () => {
  const mapData = await import('@/mapdata/dataloader.js');
  map = L.map(mapContainer.value, mapData.mapOptions);

  markerLayer = mapData.markerLayer;
  eggLayer = mapData.eggLayer;

  map.addLayer(mapData.mapLayer);
  map.addLayer(mapData.markerLayer);

  mapData.markers.forEach((marker, i) => {
    markerList.value[i] = {
      HTML: marker.getElement(),
      color:
        mapData.buildingType[marker.rawPoint.buildingType].color || '#66cccc',
      isSpecial:
        mapData.buildingType[marker.rawPoint.buildingType].isSpecial || false,
      icon: mapData.buildingType[marker.rawPoint.buildingType].icon || '',
      rawPoint: marker.rawPoint,
    };
    marker.on('click', () => {
      selectedPoint.value = marker.rawPoint.uuid;
      emit('pointclick', marker.rawPoint);
    });
  });

  map.on('click', e => {
    selectedPoint.value = '';
    emit('mapclick', e.latlng);
  });

  map.on('zoomend', () => {
    emit('zoom', map.getZoom());
  });
});

function togglePoints() {
  eggCount.value++;
  showPoints.value = !showPoints.value;

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
    <Teleport v-for="i in markerList" :to="i.HTML" :key="i.rawPoint">
      <MapIcon :color="i.color" :icon-path="i.icon" :is-special="i.isSpecial"
        :is-selected="i.rawPoint.uuid === selectedPoint" v-show="showPoints"/>
    </Teleport>
  </div>
</template>

<style>
.leaflet-container {
  background: rgb(43, 55, 65) !important;
  /* 确保瓦片未加载时显示自定义背景色 */
}
</style>
