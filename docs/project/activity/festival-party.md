---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Activity-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="玩家联谊会" text="每逢佳节便会到来的欢庆。节日期间举行。"></Hero>

<div class="container">

<div class="center-block">

## 活动简介

“一起玩”是高校学生社交中最重要的一环。《玩家联谊会》希望能在佳节中带来欢庆，提升燕山大学Minecraft同好群体的认同感和凝聚力。

每逢佳节，我们都会在服务器中举办玩家联谊会：烟火秀、建筑比赛、团队玩法……让欢笑跨越距离的隔阂。

</div>

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

</div>
