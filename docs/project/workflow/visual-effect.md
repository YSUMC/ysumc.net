---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Workflow-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="平面设计与视效工作流" text="让一切真实与生动。"></Hero>

<div class="container">

<div class="center-block">

## 工作流简介

平面设计与视效工作流负责社团对外的视觉呈现：宣传图、banner、视频包装，以及建筑作品的渲染展示（Blender、twinmotion等）。画廊中的大部分作品都出自这条工作流。

让一切真实与生动——视效不仅是技术，更是社团对外形象的一部分。

</div>

<TwoColumn>
<template #left>

## 覆盖范围

- 平面宣传物料设计
- Blender / twinmotion建筑渲染
- 视频剪辑与包装
- 画廊作品产出

</template>
<template #right>

## 代表作品

《我们在》《渲染气氛测试》《模拟人生》……<br />
均收录于画廊页面。

</template>
</TwoColumn>

</div>
