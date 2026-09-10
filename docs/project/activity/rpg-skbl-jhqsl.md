---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Activity-1.png'
import rpgImg1 from '~/image/project/rpg/2023-01-23-21.19.41-1-1256x672.png'
import rpgImg2 from '~/image/project/rpg/2023-01-25-12.13.53-1-1256x648.png'
import rpgImg3 from '~/image/project/rpg/2023-01-31-18.15.41-1256x707.png'
import rpgImg4 from '~/image/project/rpg/2023-01-31-18.27.58-1256x648.png'
</script>

<Hero :image="heroImage" dark="0.6" title="时空悖论：劫后启示录" text="在逆境中重燃希望。2023.1.6 已结束。"></Hero>

<div class="container">

<Introduction>

《时空悖论：劫后启示录》是燕山大学Minecraft同好者协会推出的角色扮演类多人活动，由舔舔主导制作。该活动已结束。

《时空悖论：劫后启示录》是燕山大学Minecraft同好者协会原创的小型RPG活动，为“时空悖论”系列三部曲之一。

</Introduction>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

《时空悖论》含有完整的世界观以及丰富的剧情线路，地图使用了大量原创建筑。游戏内有上百个NPC、数百条对话。玩家将扮演因为一场实验事故被传送到异世界的燕大学生，在逆境中重燃希望，探索这个陌生而危险的世界，找到回到原来世界的办法。

</div>

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 gap-8">
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="rpgImg1" class="w-full" alt="游戏内场景" />
  </div>
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="rpgImg2" class="w-full" alt="游戏内场景" />
  </div>
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="rpgImg3" class="w-full" alt="游戏内场景" />
  </div>
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="rpgImg4" class="w-full" alt="游戏内场景" />
  </div>
</div>

<TwoColumn>
<template #left>

## 玩法

- 轻度RPG向剧情任务
- 完整的世界观与剧情线路
- 上百个NPC、数百条对话
- 大量原创地图建筑
- 多人协作探险与解谜

</template>
<template #right>

## 回顾

活动于2023年1月6日举行，已圆满结束。<br />
感谢每一位参与者的热情，我们在异世界中再见。<br />
“时空悖论”系列后续作品敬请期待。

</template>
</TwoColumn>

<JoinUs />

</div>
