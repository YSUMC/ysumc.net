<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { onMounted, ref } from 'vue';

const map = ref(null);
const mapContainer = ref(null);
const mapOptions = {
  crs: L.CRS.Simple,
  center: [-270, 480], // Center adjusted to the middle of the image bounds
  zoom: 2,
  minZoom: 0,
  maxZoom: 4,
  maxBounds: [
    [-540, 0],
    [0, 960],
  ],
};

onMounted(() => {
  map.value = L.map(mapContainer.value, mapOptions);

  const imageBounds = [
    [-540, 0],
    [0, 960],
  ];
  const tileLayerUrl = '/map/tiles/zoom_{z}/tile_{x}_{y}.png'; // Replace with your tile URL pattern
  L.tileLayer(tileLayerUrl, {
    bounds: imageBounds,
    minZoom: 0,
    maxZoom: 4,
    noWrap: true,
    tileSize: 256,
    maxNativeZoom: 4,
  }).addTo(map.value);

  // map.value.setMaxBounds(imageBounds);
  // map.value.setView([29.5, 16.5], 0);
});
</script>

<template>
  <div ref="mapContainer" class="h-screen"></div>
</template>
