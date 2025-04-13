<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {inject} from 'vue'

const setNavBar = inject('setNavBar')

import { onMounted, ref } from 'vue';

const map = ref(null);
const mapContainer = ref(null);
const mapOptions = {
  crs: L.CRS.Simple,
  center: [-230, 260], // Center adjusted to the middle of the image bounds
  zoom: 2,
  zoomSnap: 0.5,
  minZoom: 0,
  maxZoom: 4,
  maxBounds: [
    [-540, 0],
    [0, 960],
  ],
};

const points = ref([
  [2370, 3890, '西里西亚智能科学与工程学院']
]);

onMounted(() => {
  map.value = L.map(mapContainer.value, mapOptions);

  const imageBounds = [
    [-540, 0],
    [0, 960],
  ];
  const tileLayerUrl = '/map/tiles/zoom_{z}/tile_{x}_{y}.webp'; // Replace with your tile URL pattern
  L.tileLayer(tileLayerUrl, {
    bounds: imageBounds,
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    tileSize: 256,
    maxNativeZoom: 4,
    detectRetina: true,
  }).addTo(map.value);

  points.value.forEach(([x, y, label]) => {
    const marker = L.marker([-x / 16, y / 16]).addTo(map.value);
    marker.bindPopup(label);
  });
  
  map.value.on('zoomend', () => {
    const currentZoom = map.value.getZoom();
    if (currentZoom === 0 || currentZoom === 1) {
      setNavBar(false);
    } else {
      setNavBar(true);
    }
  });
});
</script>

<template>
  <div ref="mapContainer" class="h-screen"></div>
</template>

<style>
.leaflet-top {
  @apply mt-16
}
</style>