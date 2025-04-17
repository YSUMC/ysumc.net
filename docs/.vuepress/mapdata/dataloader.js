import L from 'leaflet';
import points from './points.js';

import iconPointBlue from '@/asset/icons/map_points/point-blue.svg';
import iconPointRed from '@/asset/icons/map_points/point-red.svg';
import iconPointOrange from '@/asset/icons/map_points/point-orange.svg';
import iconPointGray from '@/asset/icons/map_points/point-gray.svg';
import iconPointBlueDark from '@/asset/icons/map_points/point-blue-dark.svg';
import iconPointRedDark from '@/asset/icons/map_points/point-red-dark.svg';
import iconPointGate from '@/asset/icons/map_points/point-gate.svg';
import iconPointHeart from '@/asset/icons/map_points/point-heart.svg';

export const mapOptions = {
  crs: L.CRS.Simple,
  attributionControl: false,
  center: [-270, 480],
  zoom: 1,
  zoomSnap: 0.5,
  minZoom: 0,
  maxZoom: 4,
  maxBounds: [
    [-540, 0],
    [0, 960],
  ],
};

const pointIcons = {};
[iconPointBlue, iconPointRed, iconPointOrange, iconPointGray, iconPointBlueDark, iconPointRedDark, iconPointGate, iconPointHeart].forEach((element, i) => {
  pointIcons[['blue', 'red', 'orange', 'gray', 'blueDark', 'redDark', 'gate', 'heart'][i]] = L.icon({
    iconUrl: element,
    iconSize: [50, 50],
    iconAnchor: [25, 43],
  });
});

export const markers = [];

export const markerLayer = L.layerGroup(
  points.map(p => {
    const marker = L.marker([-p.position[1] / 16, p.position[0] / 16], {
      icon: pointIcons[p.color] || pointIcons.blue,
      title: p.title,
      autoPanOnFocus: true,
      riseOnHover: true,
    });
    // marker.bindPopup(p.title);
    marker.rawPoint = p;
    markers.push(marker);
    return marker;
  })
)

export const eggLayer = L.layerGroup(
  [[12045, 5820], [6490, 4442], [1655, 3721]]
    .map(element =>
      L.marker([-element[1] / 16, element[0] / 16], { icon: pointIcons.heart })
    )
)

const imageBounds = [
  [-540, 0],
  [0, 960],
];
const tileLayerUrl = '/map/tiles/512/zoom_{z}/tile_{x}_{y}.webp';
export const mapLayer = L.tileLayer(tileLayerUrl, {
  bounds: imageBounds,
  minZoom: 0,
  maxZoom: 5,
  noWrap: true,
  tileSize: 512,
  maxNativeZoom: 4,
  detectRetina: true,
})

export default {
  mapOptions,
  markerLayer,
  eggLayer,
  mapLayer,
};
