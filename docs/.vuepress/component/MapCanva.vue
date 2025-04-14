<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { inject } from 'vue';
import iconDisablePoint from '@/asset/icons/point_disable.svg';
import iconEnablePoint from '@/asset/icons/point_enable.svg';

import iconPointBlue from '@/asset/icons/map_points/point-blue.svg';
import iconPointRed from '@/asset/icons/map_points/point-red.svg';
import iconPointOrange from '@/asset/icons/map_points/point-orange.svg';
import iconPointGray from '@/asset/icons/map_points/point-gray.svg';
import iconPointBlueDark from '@/asset/icons/map_points/point-blue-dark.svg';
import iconPointRedDark from '@/asset/icons/map_points/point-red-dark.svg';
import iconPointGate from '@/asset/icons/map_points/point-gate.svg';
import iconPointHeart from '@/asset/icons/map_points/point-heart.svg';

const L = inject('leaflet');

import { onMounted, ref, defineEmits } from 'vue';

var map = {};
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
[iconPointBlue, iconPointRed, iconPointOrange, iconPointGray, iconPointBlueDark, iconPointRedDark, iconPointGate, iconPointHeart].forEach((element, i) => {
  pointIcons[['blue', 'red', 'orange', 'gray', 'blueDark', 'redDark', 'gate', 'heart'][i]] = L.icon({
    iconUrl: element,
    iconSize: [50, 50],
    iconAnchor: [25, 43],
  });
});

const points = [
  { position: [5809, 3072], label: '燕山大学Minecraft学生同好者协会', icon: pointIcons.blueDark },
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
  { position: [3792, 5822], label: '7号门', icon: pointIcons.gate },
  { position: [2065, 2047], label: '6号门', icon: pointIcons.gate },
  { position: [9835, 3905], label: '5号门', icon: pointIcons.gate },
  { position: [3978, 4723], label: '《大国重器》', icon: pointIcons.blueDark },
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
  { position: [4508, 5080], label: '里仁学院，环境与化学工程学院，材料科学与工程学院行政楼', icon: pointIcons.blueDark },
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
  { position: [6490, 4442], label: '塔山', icon: pointIcons.blueDark },

  { position: [10104, 4626], label: '燕宏桥', icon: pointIcons.blueDark },
  { position: [10539, 5046], label: '智能制造交叉融合中心', icon: pointIcons.blue },
  { position: [11394, 4634], label: '车辆与能源学院（车辆馆）', icon: pointIcons.blue },
  { position: [11913, 4064], label: '文法学院（公共管理学院）（人文馆）', icon: pointIcons.blue },
  { position: [12268, 3747], label: '东校区体育馆（体育学院）', icon: pointIcons.blue },
  { position: [12317, 3617], label: '风雨球场（羽毛球）', icon: pointIcons.blue },
  { position: [13730, 3794], label: '风雨球场（篮球）', icon: pointIcons.blue },
  { position: [13076, 3710], label: '第二体育场', icon: pointIcons.blue },
  { position: [14519, 3767], label: '3号门', icon: pointIcons.gate },
  { position: [11272, 4317], label: '4号门', icon: pointIcons.gate },
  { position: [12314, 4469], label: '东校区第四教学楼（马克思学院）', icon: pointIcons.blue },
  { position: [12807, 4230], label: '教职工活动中心', icon: pointIcons.blue },
  { position: [11388, 5137], label: '重型机械协同创新中心', icon: pointIcons.blue },
  { position: [11742, 5422], label: '东校区实验室建筑群', icon: pointIcons.blue },
  // { position: [10973, 5565], label: '东校区浴池', icon: pointIcons.blue },
  { position: [11125, 5533], label: '世纪楼', icon: pointIcons.blueDark },
  { position: [10378, 5544], label: '工程训练中心', icon: pointIcons.blue },
  { position: [10844, 5781], label: '物理实验中心', icon: pointIcons.blue },
  { position: [10196, 5757], label: '燕山大学印刷厂', icon: pointIcons.blue },
  { position: [11452, 6108], label: '燕山大学图书馆（东）', icon: pointIcons.blue },
  { position: [11267, 6541], label: '东校区第三教学楼', icon: pointIcons.blue },
  { position: [12515, 6000], label: '东校区第一教学楼', icon: pointIcons.blue },
  { position: [11767, 5947], label: '机械工程学院（机械馆）', icon: pointIcons.blue },
  { position: [12331, 5603], label: '东校区第二教学楼', icon: pointIcons.blue },
  { position: [13215, 6038], label: '建筑工程与力学学院（建筑馆）', icon: pointIcons.blue },
  { position: [12603, 6360], label: '环境与化学工程学院（环化馆）', icon: pointIcons.blue },
  { position: [13925, 5485], label: '燕大第一幼儿园', icon: pointIcons.blue },
  { position: [14525, 6055], label: '闲庭四艺酒店（前燕大宾馆）', icon: pointIcons.blue },
  { position: [14438, 6391], label: '2号门', icon: pointIcons.gate },
  { position: [13219, 4934], label: '燕大小区', icon: pointIcons.gray },
  { position: [13669, 6275], label: '风雨球场（网球）', icon: pointIcons.blue },
  { position: [13448, 6521], label: '风雨球场（羽毛球）', icon: pointIcons.blue },
  { position: [13089, 6783], label: '风雨球场（篮球）', icon: pointIcons.blue },
  { position: [13105, 7016], label: '1号门', icon: pointIcons.gate },
  { position: [12132, 7186], label: '第一体育场', icon: pointIcons.blue },
  { position: [11204, 7916], label: '8号门', icon: pointIcons.gate },
  { position: [11147, 7407], label: '东校区大学生活动中心', icon: pointIcons.blue },
  { position: [11349, 7265], label: '燕山大学校团委', icon: pointIcons.redDark },
  { position: [10381, 7061], label: '高钢中心', icon: pointIcons.blue },
  { position: [10624, 7216], label: '东校区生活服务楼', icon: pointIcons.red },
  { position: [10100, 6860], label: '燕山大学中快餐厅', icon: pointIcons.orange },
  { position: [9784, 6756], label: '外部水房', icon: pointIcons.red },
  { position: [9924, 6513], label: '燕鸣湖餐厅', icon: pointIcons.orange },
  { position: [10228, 6420], label: '民族餐厅与职工餐厅', icon: pointIcons.orange },
  { position: [9971, 5739], label: '研究生公寓（东区八舍）', icon: pointIcons.gray },
  { position: [9681, 6045], label: '东校区第七公寓', icon: pointIcons.gray },
  { position: [9456, 6281], label: '至慧楼（东区五舍）', icon: pointIcons.gray },
  { position: [9248, 6587], label: '至雅楼（东区四舍）', icon: pointIcons.gray },
  { position: [9508, 6880], label: '至达楼（东区三舍）', icon: pointIcons.gray },
  { position: [9897, 7131], label: '至博楼（东区二舍）', icon: pointIcons.gray },
  { position: [10296, 7405], label: '至理楼（东区一舍）', icon: pointIcons.gray },
  { position: [10726, 7662], label: '至明楼（东区六舍）', icon: pointIcons.gray },
  { position: [9046, 6480], label: '东校区快递代收点', icon: pointIcons.red },
  { position: [10726, 6929], label: '桥头堡帝国商厦国际贸易中心遗址', icon: pointIcons.blueDark },
  { position: [12045, 5820], label: '琢园', icon: pointIcons.blueDark },
];

const markerLayer = L.layerGroup(
  points.map(p => {
    const marker = L.marker([-p.position[1] / 16, p.position[0] / 16], {
      icon: p.icon,
    });
    marker.bindPopup(p.label);
    return marker;
  })
)

const eggLayer = L.layerGroup(
  [[12045, 5820], [6490, 4442], [1655, 3721]]
    .map(element =>
      L.marker([-element[1] / 16, element[0] / 16], { icon: pointIcons.heart })
    )
)

const emit = defineEmits(['zoom']);

onMounted(() => {
  if (__VUEPRESS_SSR__) {
    return;
  }

  map = L.map(mapContainer.value, mapOptions);

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
  }).addTo(map);

  map.addLayer(markerLayer);

  map.on('zoomend', () => {
    emit('zoom', map.getZoom());
  });
});

const showPoints = ref(true);
const eggCount = ref(0);

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
