---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/work-in-progress.jpg'
import bigProject from '~/image/project/big-project.png'
</script>

<Hero :image="heroImage">
  <div class="absolute bottom-36 left-10">
    <h1 class="text-4xl font-ysumc text-white">项目正在制作……</h1>
    <p class="text-2xl pb-12 pt-6 text-white">凡事总有过程，对吧。</p>
  </div>
</Hero>

<div class="container">

<Introduction>

这里是燕山大学Minecraft学生同好者协会正在进行中的大工程。在正式揭晓之前，请允许我们先卖个关子。

</Introduction>

<div class="center-block">

## 国内最顶尖的太空电梯复原项目

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14">
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="bigProject" class="w-full" alt="一个大工程" />
  </div>
</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

起初没有人在意这场计划，直到这个计划显现出恐怖的规模。

**固体方块数达12亿**，从整体到每个细节均无可挑剔，前无古人，后难见来者。

本工程为《流浪地球2》太空电梯的1:1复原项目，涵盖弹射塔、配重、轿厢与缆绳系统的完整复原。社团此前已在《像素燕大》中完成过太空电梯轿厢的1:1复原（见画廊《渲染气氛测试》），而这一次，我们要把整座太空电梯立起来。

</div>

<TwoColumn>
<template #left>

## 工程信息

- 项目周期：2023.4 ~ 2023.9
- 固体方块数：12亿+
- 复原比例：1:1
- 状态：WIP

</template>
<template #right>

## 相关作品

- 画廊：《渲染气氛测试》（弹射塔区域渲染）
- 画廊：《模拟人生》（社员与太空电梯合影）
- 3D打印工作流：以弹射塔结构调试打印机

</template>
</TwoColumn>

<CenterText title="提示">项目完成后本页将更新为完整介绍，敬请期待。</CenterText>

<JoinUs />

</div>
