---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Workflow-1.png'
</script>

<Hero :image="heroImage" dark="0.6" title="3D打印工作流" text="虚拟成真的纪念。"></Hero>

<div class="container">

<div class="center-block">

## 工作流简介

3D打印工作流将Minecraft中的建筑作品转化为可以拿在手里的实体模型。从游戏内建筑到3D打印成品，中间需要经过模型导出、网格修复、切片打印等多个环节。

虚拟成真的纪念——这是社团成员最喜欢的工作流之一。

</div>

<TwoColumn>
<template #left>

## 流程

- 游戏内建筑导出（.schematic / .obj）
- 网格修复与实体化
- 切片软件参数调整
- 3D打印与后处理

</template>
<template #right>

## 成果

我们已为多位社员打印了他们在服务器中的作品，<br />
作为社团活动的纪念品。

</template>
</TwoColumn>

</div>
