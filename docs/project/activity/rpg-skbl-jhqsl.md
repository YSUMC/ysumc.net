---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'

import heroImage from '~/image/project/Activity-1.png'
</script>

<Hero :image="heroImage" dark="0.6" title="时空悖论：劫后启示录" text="在逆境中重燃希望。2023.1.6 已结束。"></Hero>

<div class="container">

<div class="center-block">

## 活动简介

《时空悖论：劫后启示录》是燕山大学Minecraft学生同好者协会举办的线下RPG主题活动。因为一场实验事故，燕大东校区六舍（至明楼）被传送到了异世界。参与者作为建工学院的学生，要在异世界中生存下来，在其中探险，并找到与原先世界相通的办法。

</div>

<TwoColumn>
<template #left>

## 玩法

- 轻度RPG向剧情任务
- 结合燕大校园生活设定的原创剧情
- 多人协作探险与解谜

</template>
<template #right>

## 回顾

活动于2023年1月6日举行，已圆满结束。<br />
感谢每一位参与者的热情，我们在异世界中再见。

</template>
</TwoColumn>

<CenterText title="更多活动">用欢笑打破距离的隔阂，我们每逢佳节都会举办玩家联谊会，不定期举行100分钟建筑赛。</CenterText>

</div>
