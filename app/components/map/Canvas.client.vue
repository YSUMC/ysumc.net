<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import {
  buildingTypes,
  eggPositions,
  mapBounds,
  mapMaxZoom,
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
let selectedMarker: import('leaflet').Marker | undefined

const pinPath =
  'M52.4,0C23.5,0,0,24.1,0,53.8s28,66,49.5,89.8c1.5,1.7,4.1,1.7,5.6,0,21.5-23.7,49.5-61.4,49.5-89.8S81.2,0,52.3,0h.1Z'

function markerHtml(point: MapPoint) {
  const type = buildingTypes[point.buildingType]
  return `<svg viewBox="0 0 104.6 144.9" style="--marker-color:${type.color}" aria-hidden="true"><path class="map-pin" d="${pinPath}"/><circle class="map-dot" cx="52.4" cy="53.8" r="20"/><path class="map-glyph" d="${type.icon}"/></svg>`
}

function selectMarker(marker?: import('leaflet').Marker) {
  selectedMarker?.getElement()?.classList.remove('map-icon--selected')
  selectedMarker = marker
  selectedMarker?.getElement()?.classList.add('map-icon--selected')
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
    maxZoom: mapMaxZoom,
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
            className: `map-icon${buildingTypes[point.buildingType].isSpecial ? ' map-icon--special' : ''}`,
            html: markerHtml(point),
            iconSize: [29.71, 41.14],
            iconAnchor: [14.86, 41],
          }),
          title: point.title,
          autoPanOnFocus: true,
          riseOnHover: true,
        },
      )
      marker.on('click', () => {
        selectMarker(marker)
        emit('pointclick', point)
      })
      return marker
    }),
  ).addTo(map)
  eggLayer = L.layerGroup(
    eggPositions.map(([x, y]) =>
      L.marker([-y / 16, x / 16], {
        icon: L.icon({
          iconUrl: '/icons/map/point-heart.svg',
          iconSize: [50, 50],
          iconAnchor: [25, 43],
        }),
      }),
    ),
  )
  map.on('click', () => {
    selectMarker()
    emit('mapclick')
  })
  map.on('zoomend', () => emit('zoom', map?.getZoom() ?? 0))
})
onBeforeUnmount(() => map?.remove())

function togglePoints() {
  if (!map || !markerLayer || !eggLayer) return
  toggleCount.value += 1
  showPoints.value = !showPoints.value
  if (showPoints.value) markerLayer.addTo(map)
  else {
    selectMarker()
    emit('mapclick')
    markerLayer.removeFrom(map)
  }
  if (toggleCount.value === 9) eggLayer.addTo(map)
  if (toggleCount.value === 10) eggLayer.removeFrom(map)
}
</script>
<template>
  <div class="relative h-full">
    <button
      class="absolute left-3 top-36 z-[401] rounded bg-white px-3 py-2 shadow"
      :aria-label="showPoints ? '隐藏点位' : '显示点位'"
      @click="togglePoints"
    >
      <img
        :src="
          showPoints
            ? '/icons/map/point_disable.svg'
            : '/icons/map/point_enable.svg'
        "
        class="h-[1.4rem]"
        alt=""
      />
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
.map-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.75));
  transform-origin: 50% 99%;
  transition: transform 0.3s cubic-bezier(0.84, 0.01, 0.14, 2.18);
}
.map-pin {
  fill: #fff;
  transition: fill 0.3s ease-in-out;
}
.map-dot {
  fill: var(--marker-color);
  transition: opacity 0.3s ease-in-out;
}
.map-glyph {
  fill: #fff;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.map-icon--special .map-pin,
.map-icon--selected .map-pin {
  fill: var(--marker-color);
}
.map-icon--special .map-dot,
.map-icon--selected .map-dot {
  opacity: 0;
}
.map-icon--special .map-glyph,
.map-icon--selected .map-glyph {
  opacity: 1;
}
.map-icon--selected svg {
  transform: scale(2);
}
.leaflet-top {
  margin-top: 4rem;
}
</style>
