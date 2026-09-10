---
layout: BlankPage
date: 2022-04-01
tags:
  - 燕山大学
  - 复原计划
  - 大项目
subtitle: 三千一百万方块打造的虚拟校园
---

<script setup>
import Hero from '@/component/Hero.vue'
import TextCard from '@/component/TextCard.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'

import heroImage from '~/image/project/Work-1.png'
import gf from '~/image/gf.png'
</script>

<Hero :image="heroImage" dark="0.6" title="《像素燕大：燕山大学复原计划》" text="三千一百万方块打造的虚拟校园。2022.4 - 2022.12，历时303天。"></Hero>

<div class="container">

<div class="center-block">

## 项目简介

该项目于2022年2月24日着手计划建设，于2022年12月4日正式竣工，历时303天。<br />
由燕山大学Minecraft学生同好者协会打造，此项目以游戏《我的世界》为载体，通过CAD图纸、GIS定高、资料查询及图像拍摄等方法，进行燕山大学东、西校区的再现还原，将现实中的燕大转化为电子模型，打造最生动形象的燕山大学。

</div>

<TwoColumn>
<template #left>

## 我们如何做到

- **CAD图纸**：依据学校基建处公开的图纸确定建筑轮廓
- **GIS定高**：通过地理信息系统数据确定地形与建筑高度
- **资料查询**：查阅校史资料确定建筑细节与色彩
- **图像拍摄**：实地拍摄建筑立面作为还原参照

</template>
<template #right>

## 数据规模

- 总方块数：**3100万+**
- 覆盖范围：燕山大学东、西校区全境
- 参与社员：建筑部全体成员
- 竣工时间：2022年12月4日

</template>
</TwoColumn>

<CenterText title="去看看">该项目成果已整合进《像素燕大》全导览图，可以在地图页自由游览。</CenterText>

<TextCard title="全导览图" :action-button="{text: '打开地图', link: '/map.html'}" :image="gf">
《像素燕大：燕山大学复原计划》全导览图按2024年5月时的燕山大学复原。<br />
支持缩放、点位查看，覆盖东西校区全部已复原建筑。
</TextCard>

</div>
