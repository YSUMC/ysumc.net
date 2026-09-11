<script setup lang="ts">
const items=[
  {title:'《我们在》',time:'2023年8月14日',image:'/image/gallery/1-wmz/demo.png',text:'<b>秋田同学</b><br>Blender渲染<br>3840px*2160px<br>《像素燕大：燕山大学复原计划》与社团部分社员。',download:'/image/gallery/1-wmz/demo.png'},
  {title:'《渲染气氛测试》',time:'2023年8月13日',image:'/image/gallery/2-xrqfcs/demo.png',text:'<b>秋田同学</b><br>Blender渲染<br>1920px*1080px<br>《太空电梯1:1复原》弹射塔区域。',download:'/image/gallery/2-xrqfcs/demo.png'},
  {title:'《模拟人生》',time:'2023年5月7日',image:'/image/gallery/3-mnrs/demo.png',text:'<b>LockRikard Kerkythea</b><br>Novasikn.me壁纸预设<br>1920px*1080px<br>社团部分社员。',download:'/image/gallery/3-mnrs/demo.png'},
  {title:'《烟花》',time:'2023年1月22日',image:'/image/gallery/4-yh/demo.png',text:'<b>秋田同学</b><br>游戏截图<br>1920px*1080px<br>《新春联谊会》烟火秀与一名社团社员。',download:'/image/gallery/4-yh/demo.png'},
  {title:'《燕山大学复原总图》',time:'2022年12月15日',image:'/image/gallery/5-ysdxfyzt/demo.png',text:'<b>秋田同学</b><br>twinmotion渲染<br>15360px*8640px<br>《像素燕大：燕山大学复原计划》',downloads:[{label:'不提供原图'},{label:'下载8K'},{label:'下载4K'}]},
]
useSeoMeta({title:'画廊 - 燕山大学MC社',description:'展示燕山大学MC社的宣传图片并提供下载。',ogImage:'/image/gallery/Hero.jpg'})
</script>
<template><div><Hero image="/image/gallery/Hero.jpg" dark="0.6" title="画廊" text="这里展示本社团的宣传图片并提供其下载渠道，既有有趣的经历也有斐然的成就。"/><CenterText title="注意事项"><p>所有原创拍摄图片下载后均会于左下角显示本社团水印，望谅解。<br>尊重创作成果，请勿冒用。</p></CenterText><CardsGalleryItem v-for="item in items" :key="item.title" v-bind="item"/></div></template>
