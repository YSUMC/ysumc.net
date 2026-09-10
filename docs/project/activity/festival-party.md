---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Activity-2.png'
import festivalScene from '~/image/project/festival/9-1920x1080.png'
import festivalFire from '~/image/project/festival/video1-1.jpg'
</script>

<Hero :image="heroImage" dark="0.6" title="玩家联谊会" text="每逢佳节便会到来的欢庆。节日期间举行。"></Hero>

<div class="container">

<Introduction>

“一起玩”是高校学生社交中最重要的一环。《玩家联谊会》希望能在佳节中带来欢庆，提升燕山大学Minecraft同好群体的认同感和凝聚力。《玩家联谊会》是燕山大学Minecraft学生同好者协会准备的Minecraft派对游戏活动，一般在节日期间举行。

</Introduction>

<div class="center-block">

## 2023 新春联谊会

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

第一届《玩家联谊会》是于2023年1月21日（农历腊月三十）举办的《新春联谊会》，由顾梵主持。大家一起游玩了“不要做挑战”“Bingo！”“10分钟建筑赛”（主题：灯笼）。派对游戏结束后，于新年钟声敲响时进行了烟花表演。

</div>

<TwoColumn>
<template #left>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="festivalScene" class="w-full" alt="新春联谊会现场" />
  <p class="mt-4 text-center text-gray">2023新春联谊会</p>
</div>

</template>
<template #right>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="festivalFire" class="w-full" alt="参与人员全家福" />
  <p class="mt-4 text-center text-gray">参与人员全家福</p>
</div>

</template>
</TwoColumn>

<TwoColumn>
<template #left>

## 往期活动

- 新春联谊会与烟火秀
- 中秋建筑赛
- 期末季减压联机

</template>
<template #right>

## 如何参加

联谊会通过QQ群与服务器内公告发布。<br />
所有外部成员均可参加，无需任何费用。

</template>
</TwoColumn>

<JoinUs />

</div>
