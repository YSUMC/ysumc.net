---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Activity-3.png'
</script>

<Hero :image="heroImage" dark="0.6" title="100分钟建筑赛" text="能力与智谋的较量。不定期举行。"></Hero>

<div class="container">

<div class="center-block">

## 活动简介

100分钟建筑赛是燕山大学Minecraft学生同好者协会的品牌活动：参赛者在100分钟内，围绕当场公布的主题进行建筑创作，由评委与观众共同投票评选。

这是能力与智谋的较量——如何在有限的时间里规划、分工、呈现，比拼的不仅是建筑技术，更是临场决策。

</div>

<TwoColumn>
<template #left>

## 规则

- 100分钟限时建筑创作
- 当场公布主题
- 允许单人或组队参赛
- 评委与观众共同投票

</template>
<template #right>

## 经验谈

我们整理了完整的活动复盘与经验总结，<br />
参赛前不妨一读。

</template>
</TwoColumn>

</div>
