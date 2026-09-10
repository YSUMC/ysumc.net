---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'

import heroImage from '~/image/document/Hero.png'

const documents = [
  {
    title: '皮肤站设置',
    icon: 'mobi-mbri-website-theme',
    text: '多人服务器正版验证与皮肤加载的设置方法。',
    link: 'https://blog.ysumc.net/index.php/%E6%95%99%E7%A8%8B/54.html',
  },
  {
    title: '我社报道',
    icon: 'mobi-mbri-file',
    text: '外界媒体对燕山大学Minecraft学生同好者协会的报道。',
    link: '/document/reports.html',
  },
  {
    title: '视觉形象',
    icon: 'mobi-mbri-change-style',
    text: '本社团视觉形象规范与素材下载。',
    link: '/document/visual-identity.html',
  },
  {
    title: 'MC社网盘',
    icon: 'mobi-mbri-cloud',
    text: '社团对外公开的文件分发渠道。',
    link: 'http://cloud.ysumc.net',
  },
]
</script>

<Hero
    :image="heroImage"
    dark="0.6"
    title="资料"
    text="这里包含着你可能需要的Minecraft操作教程和有关本社团的文书资料。"
></Hero>

<div class="container">

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 gap-8">
  <div
      v-for="i in documents"
      :key="i.title"
      class="not-prose bg-white shadow-lg p-10 text-center flex flex-col"
  >
    <span :class="i.icon" class="text-7xl text-gray4"></span>
    <h3 class="mt-8 text-2xl font-ysumc">{{ i.title }}</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">{{ i.text }}</p>
  </div>
</div>

</div>
