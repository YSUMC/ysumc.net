---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import PictureItem from '@/component/gallery/PictureItem.vue'

import heroImage from '~/image/gallery/Hero.jpg'
import demo1 from '~/image/gallery/1-wmz/demo.png'
import demo2 from '~/image/gallery/2-xrqfcs/demo.png'
import demo3 from '~/image/gallery/3-mnrs/demo.png'
import demo4 from '~/image/gallery/4-yh/demo.png'
import demo5 from '~/image/gallery/5-ysdxfyzt/demo.png'

const galleryItems = [
  {
    title: '《我们在》',
    time: '2023年8月14日',
    image: demo1,
    text: '<b>秋田同学</b><br />Blender渲染<br />3840px*2160px<br />《像素燕大：燕山大学复原计划》与社团部分社员。',
    buttons: [{ text: '下载原图' }],
  },
  {
    title: '《渲染气氛测试》',
    time: '2023年8月13日',
    image: demo2,
    text: '<b>秋田同学</b><br />Blender渲染<br />1920px*1080px<br />《太空电梯1:1复原》弹射塔区域。',
    buttons: [{ text: '下载原图' }],
  },
  {
    title: '《模拟人生》',
    time: '2023年5月7日',
    image: demo3,
    text: '<b>LockRikard  Kerkythea</b><br />Novasikn.me壁纸预设<br />1920px*1080px<br />社团部分社员。',
    buttons: [{ text: '下载原图' }],
  },
  {
    title: '《烟花》',
    time: '2023年1月22日',
    image: demo4,
    text: '<b>秋田同学</b><br />游戏截图<br />1920px*1080px<br />《新春联谊会》烟火秀与一名社团社员。',
    buttons: [{ text: '下载原图' }],
  },
  {
    title: '《燕山大学复原总图》',
    time: '2022年12月15日',
    image: demo5,
    text: '<b>秋田同学</b><br />twinmotion渲染<br />15360px*8640px<br />《像素燕大：燕山大学复原计划》',
    buttons: [
      { text: '不提供原图', color: 'gray' },
      { text: '下载8K', color: 'pink' },
      { text: '下载4K', color: 'pink' },
    ],
  },
]
</script>

<Hero :image="heroImage" dark="0.6" title="画廊" text="这里展示本社团的宣传图片并提供其下载渠道，既有有趣的经历也有斐然的成就。"></Hero>

<div class="container">

<div class="center-block">

## 注意事项

所有原创拍摄图片下载后均会于左下角显示本社团水印，望谅解。<br />
尊重创作成果，请勿冒用。

</div>

<PictureItem
    v-for="i in galleryItems"
    :key="i.title"
    :title="i.title"
    :time="i.time"
    :buttons="i.buttons"
    :image="i.image"
    :text="i.text"
></PictureItem>

</div>
