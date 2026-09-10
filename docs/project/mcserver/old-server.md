---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'

import heroImage from '~/image/project/MCServer-2.png'
</script>

<Hero :image="heroImage" dark="0.6" title="《原初燕大服》" text="这个不堪一击的服务器是一切的原点。2022.2 已关闭。"></Hero>

<div class="container">

<div class="center-block">

## 历史背景

在燕山大学里，有一个Minecraft建筑玩家，他失手删掉了自己全部的建筑存档，至此命运的齿轮开始转动。

“你说同样是生存，我们可以和外人玩，那为什么我们不开一个为燕大校友服务的服务器呢？”

2022年2月，我们花了一段时间选择托管的机房、服务器的套餐和服务器的大致规划。大概一周后，一个小小的服务器成型了。我们计划建设一个轻度RPG向的服务器，剧情结合了燕大校园生活：因为一场实验事故，燕大东校区六舍（至明楼）被传送到了异世界。

这个不堪一击的服务器，就是燕山大学Minecraft学生同好者协会的原点。

</div>

<CenterText title="后来">从原初燕大服到燕山大学服务器，从一个人丢档到八百人的社团。完整的故事见《我从哪里来》。</CenterText>

<TwoColumn>
<template #left>

## 原初设定

- 轻度RPG向生存服务器
- 原创剧情：实验事故与异世界
- 六舍（至明楼）传送设定

</template>
<template #right>

## 服务器状态

该服务器已于2022年关闭，仅作为历史纪念。<br />
现行服务器为燕山大学服务器。

</template>
</TwoColumn>

</div>
