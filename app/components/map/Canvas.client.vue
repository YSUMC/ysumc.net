<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import {
  buildingTypes,
  eggPositions,
  mapBounds,
  tileLayerUrl,
} from '~/data/map/config'
import { points } from '~/data/map/points'
import type { MapPoint } from '~/data/map/types'

const emit = defineEmits<{
  zoom: [number]
  pointclick: [MapPoint]
  mapclick: []
}>()
const container = ref<HTMLElement>()
const showPoints = ref(true)
const toggleCount = ref(0)
let map: import('leaflet').Map | undefined
let markerLayer: import('leaflet').LayerGroup | undefined
let eggLayer: import('leaflet').LayerGroup | undefined

function markerHtml(point: MapPoint) {
  const type = buildingTypes[point.buildingType]
  return `<span class="map-marker" style="--marker:${type.color}"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${type.icon}"/></svg></span>`
}

onMounted(async () => {
  const L = await import('leaflet')
  if (!container.value) return
  map = L.map(container.value, {
    crs: L.CRS.Simple,
    attributionControl: false,
    center: [-270, 480],
    zoom: 1,
    zoomSnap: 0.5,
    minZoom: 0,
    maxZoom: 4,
    maxBounds: mapBounds,
  })
  L.tileLayer(tileLayerUrl, {
    bounds: mapBounds,
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    tileSize: 512,
    maxNativeZoom: 4,
    detectRetina: true,
  }).addTo(map)
  markerLayer = L.layerGroup(
    points.map((point) => {
      const marker = L.marker(
        [-point.position[1] / 16, point.position[0] / 16],
        {
          icon: L.divIcon({
            className: 'map-icon',
            html: markerHtml(point),
            iconSize: [30, 42],
            iconAnchor: [15, 41],
          }),
          title: point.title,
          autoPanOnFocus: true,
          riseOnHover: true,
        },
      )
      marker.on('click', () => emit('pointclick', point))
      return marker
    }),
  ).addTo(map)
  eggLayer = L.layerGroup(
    eggPositions.map(([x, y]) =>
      L.marker([-y / 16, x / 16], {
        icon: L.divIcon({
          className: 'map-heart',
          html: '♥',
          iconSize: [50, 50],
          iconAnchor: [25, 43],
        }),
      }),
    ),
  )
  map.on('click', () => emit('mapclick'))
  map.on('zoomend', () => emit('zoom', map?.getZoom() ?? 0))
})
onBeforeUnmount(() => map?.remove())

function togglePoints() {
  if (!map || !markerLayer || !eggLayer) return
  toggleCount.value += 1
  showPoints.value = !showPoints.value
  if (showPoints.value) markerLayer.addTo(map)
  else markerLayer.removeFrom(map)
  if (toggleCount.value === 9) eggLayer.addTo(map)
  if (toggleCount.value === 10) eggLayer.removeFrom(map)
}
</script>
<template>
  <div class="relative h-full">
    <button
      class="absolute left-3 top-36 z-[401] rounded bg-white px-3 py-2 shadow"
      @click="togglePoints"
    >
      {{ showPoints ? '隐藏点位' : '显示点位' }}
    </button>
    <div ref="container" class="h-full" />
  </div>
</template>
<style>
.leaflet-container {
  background: #2b3741 !important;
}
.map-icon {
  background: none !important;
  border: 0 !important;
}
.map-marker {
  display: grid;
  width: 30px;
  height: 42px;
  place-items: center;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: var(--marker);
  color: white;
  box-shadow: 0 2px 6px #0005;
}
.map-marker svg {
  width: 23px;
  height: 23px;
  transform: rotate(45deg);
  fill: currentColor;
}
.map-heart {
  font-size: 42px;
  color: #cc6666;
  background: none !important;
  border: 0 !important;
}
</style>
