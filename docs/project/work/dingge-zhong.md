---
layout: BlankPage
date: 2023-08-01
subtitle: 走进照片，回首百年
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Work-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="《定格之中》虚拟校史馆" text="走进照片，回首百年。2023.8"></Hero>

<div class="container">

<Introduction>

**彳亍定格间。** 百年燕大，四十年上下求索，六十年筚路蓝缕。《定格之中》虚拟校史馆让你走入底片，感受那个年代的燕大精神。

《定格之中》虚拟校史馆是燕山大学Minecraft学生同好者协会计划中的校史文化项目。与《云游燕大》的实时导览不同，《定格之中》试图以Minecraft为载体再现燕山大学历史上的重要瞬间——走进一张张老照片，站在当时学生的位置上，回望这所学校走过的百年。

</Introduction>

<div class="center-block">

## 构想

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

校史是学校最珍贵的财富之一。燕山大学源于哈尔滨工业大学重型机械系，1960年独立办学，几经辗转于1985年整体搬迁至秦皇岛。从“重型机械”到“燕山大学”，四十年上下求索，六十年筚路蓝缕。

传统的校史馆以实物与图文陈列为主，观者与历史之间始终隔着展柜的玻璃。《定格之中》希望打破这层玻璃：利用《像素燕大》的复原成果与Minecraft的沉浸感，将观者“传送”进历史照片的现场——在老图书馆的书桌前自习，在八十年代的教室里听课，在校门口与当年的同学们一起拍下那张合影。

</div>

<TwoColumn>
<template #left>

## 展示形式

- 历史场景复原与漫游
- “照片内视角”的沉浸式体验
- 与校史档案馆资料联动
- 配合《云游燕大》导览系统使用

</template>
<template #right>

## 当前状态

项目已写入计划，正在筹备中。<br />
将视《云游燕大》的进度适时启动。

</template>
</TwoColumn>

<CenterText title="百年燕大">从一张照片开始，走进那个年代的燕大精神。</CenterText>

<JoinUs />

</div>
