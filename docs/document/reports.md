---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'

import heroImage from '~/image/document/Hero.png'

const reports = [
  {
    time: '2023年',
    title: '《我从哪里来》',
    text: '本社社员以个人视角讲述的建社全程：从一次丢档事故，到一个服务器，再到一个官方承认的学生社团。',
    link: '/where-i-from.html',
  },
  {
    time: '2023年',
    title: '《100分钟建筑赛经验谈》',
    text: '本社社员对100分钟建筑赛这一活动形式的完整复盘与经验总结。',
    link: '/experience-of-100-mins-building.html',
  },
  {
    time: '2022年',
    title: '《像素燕大：燕山大学复原计划》竣工',
    text: '历时303天，三千一百万方块，燕山大学东西校区在Minecraft中完整重现。',
    link: '/project/pixel-ysu.html',
  },
]
</script>

<Hero
    :image="heroImage"
    dark="0.6"
    title="我社报道"
    text="这里收录本社团的对外文章与相关报道。"
></Hero>

<div class="container">

<div class="max-w-5xl mx-6 xl:mx-auto my-14">
  <div
      v-for="i in reports"
      :key="i.title"
      class="not-prose bg-white shadow-lg p-10 mb-8 flex flex-col md:flex-row md:items-center gap-6"
  >
    <p class="text-2xl font-ysumc text-gray md:w-32 shrink-0">{{ i.time }}</p>
    <div>
      <h3 class="text-2xl font-ysumc">{{ i.title }}</h3>
      <p class="mt-4 text-base/relaxed md:text-lg">{{ i.text }}</p>
    </div>
  </div>
</div>

</div>
