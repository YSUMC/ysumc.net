---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TextCard from '@/component/TextCard.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Work-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="《云游燕大》学校导览系统" text="游戏中的燕大魅力丝毫不减。[WIP]"></Hero>

<div class="container">

<div class="center-block">

## 项目简介

云游燕大：基于游戏《我的世界》的特殊性，相较于其他艺术形式，游览者可在其中切身实际进行游览，沉浸式感受世纪楼、燕宏桥、图书馆等燕大地标性建筑的魅力。

通过简单的电脑、手机输入，便可实现在虚拟中畅游燕大。云游燕大同样支持虚拟现实设备进入，若游览者拥有此类设备，便可完全沉浸式体验在燕山大学漫步的体验。

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

</div>
