<script setup lang="ts">
import 'ol/ol.css'
import Map from 'ol/Map.js'
import Overlay from 'ol/Overlay.js'
import View from 'ol/View.js'
import WebGLTileLayer from 'ol/layer/WebGLTile.js'
import Projection from 'ol/proj/Projection.js'
import ImageTileSource from 'ol/source/ImageTile.js'
import TileGrid from 'ol/tilegrid/TileGrid.js'
import {
  buildingTypes,
  eggPositions,
  mapBounds,
  mapMaxZoom,
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
let map: Map | undefined
let view: View | undefined
let markerOverlays: Overlay[] = []
let eggOverlays: Overlay[] = []
let selectedMarker: HTMLElement | undefined

const pinPath =
  'M52.4,0C23.5,0,0,24.1,0,53.8s28,66,49.5,89.8c1.5,1.7,4.1,1.7,5.6,0,21.5-23.7,49.5-61.4,49.5-89.8S81.2,0,52.3,0h.1Z'
// maxResolution 2 starts one Leaflet level below the map's native resolution.
const openLayersMaxZoom = (mapMaxZoom + 1) * 2

function markerHtml(point: MapPoint) {
  const type = buildingTypes[point.buildingType]
  return `<svg viewBox="0 0 104.6 144.9" style="--marker-color:${type.color}" aria-hidden="true"><path class="map-pin" d="${pinPath}"/><circle class="map-dot" cx="52.4" cy="53.8" r="20"/><path class="map-glyph" d="${type.icon}"/></svg>`
}

function selectMarker(marker?: HTMLElement) {
  selectedMarker?.classList.remove('map-icon--selected')
  selectedMarker = marker
  selectedMarker?.classList.add('map-icon--selected')
}

function createPointOverlay(point: MapPoint) {
  const element = document.createElement('button')
  element.type = 'button'
  element.className = `map-icon${buildingTypes[point.buildingType].isSpecial ? ' map-icon--special' : ''}`
  element.title = point.title
  element.setAttribute('aria-label', point.title)
  element.innerHTML = markerHtml(point)

  const overlay = new Overlay({
    element,
    position: [point.position[0] / 16, -point.position[1] / 16],
    positioning: 'bottom-center',
    offset: [0, 0.14],
    stopEvent: true,
    insertFirst: false,
  })
  element.addEventListener('click', () => {
    selectMarker(element)
    emit('pointclick', point)
  })
  element.addEventListener('focus', () => overlay.panIntoView())
  element.addEventListener('pointerenter', () => {
    if (element.parentElement) element.parentElement.style.zIndex = '1'
  })
  element.addEventListener('pointerleave', () => {
    if (element.parentElement) element.parentElement.style.zIndex = ''
  })
  return overlay
}

function createEggOverlay([x, y]: [number, number]) {
  const element = document.createElement('img')
  element.src = '/icons/map/point-heart.svg'
  element.alt = ''
  element.className = 'map-heart'
  return new Overlay({
    element,
    position: [x / 16, -y / 16],
    positioning: 'bottom-center',
    offset: [0, 7],
    stopEvent: true,
    insertFirst: false,
  })
}

onMounted(async () => {
  await nextTick()
  if (!container.value) return

  const extent = [
    mapBounds[0][1],
    mapBounds[0][0],
    mapBounds[1][1],
    mapBounds[1][0],
  ]
  const projection = new Projection({
    code: 'YSUMC-MAP',
    units: 'pixels',
    extent,
  })
  const tileGrid = new TileGrid({
    extent,
    origin: [0, 0],
    resolutions: [2, 1, 0.5, 0.25, 0.125, 0.0625],
    tileSize: 256,
  })

  view = new View({
    projection,
    center: [480, -270],
    extent,
    showFullExtent: true,
    resolution: 1,
    maxResolution: 2,
    maxZoom: openLayersMaxZoom,
    zoomFactor: Math.SQRT2,
    constrainResolution: false,
    smoothResolutionConstraint: false,
  })
  map = new Map({
    target: container.value,
    layers: [
      new WebGLTileLayer({
        source: new ImageTileSource({
          projection,
          tileGrid,
          tileSize: 512,
          transition: 0,
          url: (z, x, y) => `/map/tiles/512/zoom_${z}/tile_${x}_${y}.webp`,
        }),
      }),
    ],
    view,
  })

  markerOverlays = points.map(createPointOverlay)
  eggOverlays = eggPositions.map(createEggOverlay)
  markerOverlays.forEach((overlay) => map?.addOverlay(overlay))

  let resolutionChanged = false
  view.on('change:resolution', () => {
    resolutionChanged = true
  })
  map.on('moveend', () => {
    if (!resolutionChanged || !map || !view) return
    resolutionChanged = false
    const resolution = view.getResolution()
    if (!resolution) return
    const overviewResolution = view.getConstrainedResolution(Infinity)!
    emit('zoom', Math.log2(overviewResolution / resolution))
  })
  map.on('click', () => {
    selectMarker()
    emit('mapclick')
  })
})

onBeforeUnmount(() => {
  map?.setTarget(undefined)
  map = undefined
  view = undefined
  markerOverlays = []
  eggOverlays = []
})

function togglePoints() {
  if (!map) return
  toggleCount.value += 1
  showPoints.value = !showPoints.value
  if (showPoints.value)
    markerOverlays.forEach((overlay) => map?.addOverlay(overlay))
  else {
    selectMarker()
    emit('mapclick')
    markerOverlays.forEach((overlay) => map?.removeOverlay(overlay))
  }
  if (toggleCount.value === 9)
    eggOverlays.forEach((overlay) => map?.addOverlay(overlay))
  if (toggleCount.value === 10)
    eggOverlays.forEach((overlay) => map?.removeOverlay(overlay))
}
</script>

<template>
  <div class="relative h-full">
    <button
      class="map-point-toggle"
      :aria-label="showPoints ? '隐藏点位' : '显示点位'"
      @click="togglePoints"
    >
      <img
        :src="
          showPoints
            ? '/icons/map/point_disable.svg'
            : '/icons/map/point_enable.svg'
        "
        alt=""
      />
    </button>
    <div ref="container" class="openlayers-map h-full bg-[#2b3741]" />
  </div>
</template>

<style>
.openlayers-map .map-icon {
  width: 29.71px;
  height: 41.14px;
  padding: 0;
  background: none;
  border: 0;
}
.openlayers-map .map-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.75));
  transform-origin: 50% 99%;
  transition: transform 0.3s cubic-bezier(0.84, 0.01, 0.14, 2.18);
}
.openlayers-map .map-pin {
  fill: #fff;
  transition: fill 0.3s ease-in-out;
}
.openlayers-map .map-dot {
  fill: var(--marker-color);
  transition: opacity 0.3s ease-in-out;
}
.openlayers-map .map-glyph {
  fill: #fff;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.openlayers-map .map-icon--special .map-pin,
.openlayers-map .map-icon--selected .map-pin {
  fill: var(--marker-color);
}
.openlayers-map .map-icon--special .map-dot,
.openlayers-map .map-icon--selected .map-dot {
  opacity: 0;
}
.openlayers-map .map-icon--special .map-glyph,
.openlayers-map .map-icon--selected .map-glyph {
  opacity: 1;
}
.openlayers-map .map-icon--selected svg {
  transform: scale(2);
}
.openlayers-map .map-heart {
  width: 50px;
  height: 50px;
}
.openlayers-map .ol-zoom {
  top: 5rem;
  left: 0.75rem;
  z-index: 2;
  padding: 0;
  background: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}
.openlayers-map .ol-control button,
.map-point-toggle {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  place-items: center;
  color: #1f296a;
  font-size: 1.25rem;
  line-height: 1;
  background: rgba(255, 255, 255, 0.92);
  border: 0;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}
.openlayers-map .ol-zoom-in {
  border-radius: 0.375rem 0.375rem 0 0;
}
.openlayers-map .ol-zoom-out {
  border-radius: 0 0 0.375rem 0.375rem;
}
.openlayers-map .ol-control button:hover,
.openlayers-map .ol-control button:focus-visible,
.map-point-toggle:hover,
.map-point-toggle:focus-visible {
  color: #fff;
  background: var(--color-brand);
  outline: none;
}
.map-point-toggle {
  position: absolute;
  top: 10.25rem;
  left: 0.75rem;
  z-index: 2;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}
.map-point-toggle img {
  width: 1.4rem;
  height: 1.4rem;
}
</style>
