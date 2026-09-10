---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import ArticleCard from '@/component/article/ArticleCard.vue'

import heroImage from '~/image/document/Hero.png'
import imgWhereIFrom from '~/image/article/WhereIFrom.png'
import imgConstruct from '~/image/article/SpringFestival.png'
import imgPixel from '~/image/article/PixelYSU.png'
import imgAxiom from '~/image/article/SXGZL.png'

const articles = [
  {
    title: '我从哪里来',
    time: '2023年9月13日',
    tag: '建社故事',
    image: imgWhereIFrom,
    text: '本社社员以个人视角讲述的建社全程：从一次丢档事故，到一个服务器，再到一个官方承认的学生社团。',
    link: '/where-i-from.html',
  },
  {
    title: '100分钟建筑赛经验谈',
    time: '2025年4月2日',
    tag: '活动复盘',
    image: imgConstruct,
    text: '本社社员对100分钟建筑赛这一活动形式的完整复盘与经验总结。',
    link: '/experience-of-100-mins-building.html',
  },
  {
    title: '《像素燕大：燕山大学复原计划》',
    time: '2022年4月1日',
    tag: '项目记录',
    image: imgPixel,
    text: '历时303天，三千一百万方块，燕山大学东西校区在Minecraft中完整重现的完整记录。',
    link: '/project/work/pixel-ysu.html',
  },
  {
    title: 'Axiom 的基础科普与使用方法',
    time: '2023年',
    tag: '教程',
    image: imgAxiom,
    text: '新锐世界编辑模组 Axiom 的基础科普与使用方法教程，原文来自飞书 wiki。',
    link: '/project/axiom.html',
  },
]
</script>

<Hero
    :image="heroImage"
    dark="0.6"
    title="我社报道"
    text="这里收录本社团的对外文章、教程与项目记录，点击卡片即可阅读。"
></Hero>

<div class="container">

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 gap-8">
  <ArticleCard
      v-for="i in articles"
      :key="i.title"
      :title="i.title"
      :time="i.time"
      :tag="i.tag"
      :image="i.image"
      :text="i.text"
      :link="i.link"
  ></ArticleCard>
</div>

</div>
