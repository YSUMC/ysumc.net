<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { inject } from 'vue';

const L = inject('leaflet');

import { onMounted, ref, defineEmits } from 'vue';

const map = ref(null);
const mapContainer = ref(null);
const mapOptions = {
  crs: L.CRS.Simple,
  // attributionControl: false,
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

['blue-dark', 'blue', 'red', 'orange', 'gray', 'red-dark'].forEach(element => {
  pointIcons[element] = L.icon({
    iconUrl: `/map/mapicons/point-${element}.svg`,
    iconSize: [50, 50],
    iconAnchor: [25, 43],
  });
});

const points = ref([
  { position: [5809, 3072], label: '燕山大学Minecraft学生同好者协会', icon: pointIcons['blue-dark'] },
  { position: [3460, 2000], label: '信息工程与技术学院（软件学院）1号楼', icon: pointIcons.blue, },
  { position: [3125, 2164], label: '信息工程与技术学院 2号楼', icon: pointIcons.blue, },
  { position: [3758, 2160], label: '理学院', icon: pointIcons.blue },
  { position: [3890, 2370], label: '西里西亚学院', icon: pointIcons.blue },
  { position: [3354, 2571], label: '占位符', icon: pointIcons.blue },
  { position: [3674, 2501], label: '占位符', icon: pointIcons.blue },
  { position: [2226, 2979], label: '艺术与设计学院（艺术馆）', icon: pointIcons.blue, },
  { position: [2525, 3025], label: '音乐馆', icon: pointIcons.blue },
  { position: [2720, 3020], label: '继续教育学院', icon: pointIcons.blue },
  { position: [3252, 2744], label: '经济管理学院', icon: pointIcons.blue },
  { position: [1030, 2968], label: '第四体育场', icon: pointIcons.blue },
  { position: [309, 2935], label: '体育场（西）', icon: pointIcons.blue },
  { position: [884, 3351], label: '风雨球场（网球）', icon: pointIcons.blue },
  { position: [1314, 3367], label: '风雨球场（篮球）', icon: pointIcons.blue },
  { position: [406, 3436], label: '西区十三组团公寓（留学生公寓）', icon: pointIcons.gray, },
  { position: [304, 3691], label: '西区十二组团公寓', icon: pointIcons.gray },
  { position: [1079, 3685], label: '西区十一组团公寓', icon: pointIcons.gray },
  { position: [1000, 3918], label: '西区十组团公寓', icon: pointIcons.gray },
  { position: [1680, 3884], label: '西区九组团公寓', icon: pointIcons.gray },
  { position: [1640, 4130], label: '西区八组团公寓', icon: pointIcons.gray },
  { position: [1622, 4453], label: '西区七组团公寓', icon: pointIcons.gray },
  { position: [1587, 4734], label: '西区六组团公寓', icon: pointIcons.gray },
  { position: [1029, 4535], label: '兴隆广缘服务楼', icon: pointIcons.red },
  { position: [1655, 3721], label: '好仕来燕园餐厅', icon: pointIcons.orange },
  { position: [2049, 4305], label: '西校区快递代收点1', icon: pointIcons.red },
  { position: [2232, 4315], label: '西校区浴池', icon: pointIcons.red },
  { position: [2369, 4650], label: '燕山大学西校区食堂', icon: pointIcons.orange, },
  { position: [2208, 5078], label: '西区五组团公寓', icon: pointIcons.gray },
  { position: [2262, 5368], label: '西区四组团公寓', icon: pointIcons.gray },
  { position: [3054, 4873], label: '西区三组团公寓', icon: pointIcons.gray },
  { position: [3008, 5150], label: '西区二组团公寓', icon: pointIcons.gray },
  { position: [2933, 5490], label: '西区一组团公寓', icon: pointIcons.gray },
  { position: [3792, 5822], label: '7号门', icon: pointIcons['blue-dark'] },
  { position: [3978, 4723], label: '《大国重器》', icon: pointIcons['blue-dark'] },
  { position: [3620, 4408], label: '材料科学与工程学院 A楼', icon: pointIcons.blue },
  { position: [3438, 4234], label: '材料科学与工程学院 B楼', icon: pointIcons.blue },
  { position: [3487, 4125], label: '材料科学与工程学院 C楼', icon: pointIcons.blue },
  { position: [3967, 4180], label: '先进结构材料研究中心', icon: pointIcons.blue },
  { position: [3150, 3960], label: '电气工程学院 A楼', icon: pointIcons.blue },
  { position: [2897, 3802], label: '电气工程学院 B楼', icon: pointIcons.blue },
  { position: [2601, 3604], label: '电气工程学院 C楼', icon: pointIcons.blue },
  { position: [3486, 3544], label: '西区第一教学楼', icon: pointIcons.blue },
  { position: [3754, 3718], label: '西区第二教学楼', icon: pointIcons.blue },
  { position: [4015, 3840], label: '西区第三教学楼', icon: pointIcons.blue },
  { position: [4158, 4041], label: '西区第四教学楼', icon: pointIcons.blue },
  { position: [4508, 5080], label: '里仁学院，环境与化学工程学院，材料科学与工程学院行政楼', icon: pointIcons['blue-dark'] },
  { position: [5313, 5103], label: '里仁教学楼（里A~里D）', icon: pointIcons.blue },
  { position: [6045, 5125], label: '里仁阶梯教室（里J）', icon: pointIcons.blue },
  { position: [5300, 5615], label: '图文信息楼（T）', icon: pointIcons.blue },
  { position: [4550, 5655], label: '西校区大学生活动中心', icon: pointIcons.blue },
  { position: [6650, 5400], label: '里仁实验楼', icon: pointIcons.blue },
  { position: [6849, 5160], label: '风雨球场（网球）', icon: pointIcons.blue },
  { position: [7610, 5210], label: '风雨球场（篮球，羽毛球）', icon: pointIcons.blue },
  { position: [8160, 5190], label: '风雨球场（五人足球）', icon: pointIcons.blue },
  { position: [7430, 5600], label: '第三体育场', icon: pointIcons.blue },
  { position: [8277, 3877], label: '燕山大学图书馆（西）', icon: pointIcons.blue },
  { position: [4620, 3705], label: '材料实验室（未复原）', icon: pointIcons.blue },
  { position: [7400, 3407], label: '车辆测试场（未复原）', icon: pointIcons.blue },
]);

const emit = defineEmits(['zoomend']);

onMounted(() => {
  if (__VUEPRESS_SSR__) {
    return;
  }
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

  points.value.forEach(p => {
    const marker = L.marker([-p.position[1] / 16, p.position[0] / 16], {
      icon: p.icon,
    }).addTo(map.value);
    marker.bindPopup(p.label);
  });

  map.value.on('zoomend', () => {
    emit('zoomend', map.value.getZoom());
  });
});
</script>

<template>
  <div ref="mapContainer"></div>
</template>
