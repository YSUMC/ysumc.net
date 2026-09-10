---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import TextCard from '@/component/TextCard.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Work-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="《云游燕大》学校导览系统" text="游戏中的燕大魅力丝毫不减。[WIP]"></Hero>

<div class="container">

<Introduction>

《云游燕大》校园导览系统是由燕山大学Minecraft学生同好者协会全体成员开发的一整套对于《像素燕大：燕山大学复原计划》地图的导览技术方案。社团希望该系统可以同时面向Minecraft爱好者和燕山大学校友开放，并向其全面详细地介绍燕山大学的历史，文化和面貌。

</Introduction>

<div class="center-block">

## 前言

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

《像素燕大：燕山大学复原计划》的精细度，时效性和生动程度均可以称为燕山大学的非官方GIS工程之冠。也因此，当燕山大学Minecraft学生同好者协会提出《云游燕大》草案时，便轻松获得了社团挂靠学院和校史档案馆的大力支持。但是《云游燕大》自提出以来，其导览方式已经从单纯的地图展示逐渐变成了一个具有高度综合性的第一人称导览和校史文化教育平台。因此《云游燕大》对于MC社成员而言是一个综合性极强的实践项目。

虽然社团成员任重而道远，但是《云游燕大》也离不开学校与社团的互相成就。为了获得来自学校的大力支持，社团决定了一个“两步走方案”：社团将花三周时间，制作一个可以部分展示其功能的演示Demo，在获得支持后以正常更新速度完成其余部分，其工作流程类似于《像素燕大：燕山大学复原计划》，这来自于社团本身较为审慎的行事方式：在缺乏强力的资金支持的状态下，任何决策都需要看得很远。

**《云游燕大》于2023年3月25日正式开始工作，优先级为顶级。**

</div>

<div class="center-block">

## 准备

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

作为一个全方面游览燕山大学的导览系统，官方希望《云游燕大》校园导览系统能够清楚展现学校的现状，也希望观者可以在建筑内部进行游览，而这正是该项目最重要的两大难题：**内部结构**和**细节营造**。

《像素燕大：燕山大学复原计划》的复原比例是2:3，考虑到游戏内建筑单位元“方块”的特殊性，直接在建筑中制作内饰无疑是具有挑战性的，最糟糕的情况下，可能会导致观者视觉感受的严重畸形。细节营造方面，燕山大学部分内饰具有较高的细节量，而这是几乎不可能在使用方块的情况下以正常尺度还原的。

考虑到如下问题，社团应对办法如下：

</div>

<TwoColumn>
<template #left>

### 内部结构方面

《云游燕大》将采用“部分建筑内部观览”的办法，独立制作部分建筑的内部结构，并将内部结构和外部建筑使用**“沉浸式传送门”（Immersive Portals）**进行连接。这种办法可以将建筑的外部结构和内部结构独立开来，并为建筑内部结构的营造提供更加弹性的选择，令观者能够在舒适的尺度上进行观览。与此同时，社团将会灵活运用沉浸式传送门的特点，营造更加生动的观感。

</template>
<template #right>

### 细节营造方面

《云游燕大》则使用了**“时装工坊”（Armourer's Workshop）**来营造部分原版游戏难以表现的细节，例如浮雕，窗框等难以在正常尺度中优雅表现的硬装。但过多的细节结构将对电脑的性能造成极大的挑战，所以在细节方面，社团仍旧秉承着“能少则少”的态度，尽量在原版中复原校园的更多细节。

</template>
</TwoColumn>

<div class="center-block">

## 制作

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

为了保证效率，社团停止了全部常态化项目，全力制作《云游燕大》的第一个Demo。该Demo将会演示《云游燕大》中一个“区域”的内容，在Demo中展示的则是“第一教学楼建筑群”，即第一教学楼、第二教学楼、建筑馆、环化馆、机械馆的内部结构和部分细节。

</div>

<TwoColumn>
<template #left>

## 特性

- 网页端即可游览，无需安装游戏
- 支持电脑、手机、平板多种设备
- 支持VR设备完全沉浸式体验
- 与《像素燕大》复原成果深度整合

</template>
<template #right>

## 当前状态

该项目正在开发中，目前为WIP状态。<br />
我们会陆续放出预览与测试入口，敬请期待。

</template>
</TwoColumn>

<TextCard title="先去别处看看" :action-button="{text: '打开全导览图', link: '/map.html'}">
在系统正式上线前，您可以先通过《像素燕大》全导览图俯瞰整个校园。
</TextCard>

<JoinUs />

</div>
