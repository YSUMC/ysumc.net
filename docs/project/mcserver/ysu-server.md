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

import heroImage from '~/image/project/MCServer-1.png'
import serverImg1 from '~/image/project/server/800px-1-800x428.png'
import serverImg2 from '~/image/project/server/800px-1-800x450.png'
import serverImg3 from '~/image/project/server/qq20230202151708-1256x665.jpeg'
import serverImg4 from '~/image/project/server/qq20230202153230-1896x923.png'
import serverImg5 from '~/image/project/server/qq20230202153855-1256x686.png'
import serverImg6 from '~/image/project/server/qq20230202153954-1256x707.png'
</script>

<Hero :image="heroImage" dark="0.6" title="燕山大学服务器" text="为燕山大学Minecraft爱好者搭建起的平台"></Hero>

<div class="container">

<Introduction>

燕山大学服务器是燕山大学Minecraft学生同好者协会提供的Minecraft多人游戏平台和多人协同工作平台。本服务器多人游戏平台面向燕山大学全体Minecraft爱好者开放，多人协同工作平台目前仅向正式社员开放。

</Introduction>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

燕山大学服务器立项于2022年5月，是《原初燕大服》关闭后燕山大学Minecraft同好群体重新规划并开放的服务器，最初仅设置了多人游戏平台。测试时使用了简洁的机械动力整合包，正式版本则提供长时间的原版生存和部分短时间的整合包生存。

在《像素燕大：燕山大学复原计划》二期工程开始后，因工作需要，服务器拓展了多人协同工作模块。多人协同工作模块需要正式社员的申请才可开放，如今已经协助社员完成了《像素燕大：燕山大学复原计划》《100分钟建筑赛》《新春联谊会》《时空悖论系列》等项目的工作或前期准备。

燕山大学Minecraft同好者协会成立后，为了感谢每一位成员的努力，燕山大学服务器开启了活动模块。第一次活动为《燕大跑跑乐》，是简单的大逃杀活动。第一届《新春联谊会》后，活动模块从不定期开放的模块变成了长期开放的小游戏模块。

</div>

<div class="center-block">

## 服务器历史

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14">
  <div class="not-prose bg-white shadow-lg p-8">
    <p class="text-2xl font-ysumc">机械动力生存服 2022.5</p>
    <div class="mt-6">
      <img :src="serverImg1" class="w-full" alt="机械动力生存服" />
      <p class="mt-4 text-center text-gray">秋田同学在服务器里吸猫</p>
    </div>
  </div>
</div>

<TwoColumn>
<template #left>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="serverImg2" class="w-full" alt="原版三周目" />
  <p class="mt-4 text-center text-gray">原版三周目 桑梓巅 2023.1</p>
</div>

</template>
<template #right>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="serverImg3" class="w-full" alt="原版三周目" />
  <p class="mt-4 text-center text-gray">原版三周目的量产机器</p>
</div>

</template>
</TwoColumn>

<div class="center-block">

## 活动模块

</div>

<TwoColumn>
<template #left>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="serverImg4" class="w-full" alt="燕大跑跑乐" />
  <p class="mt-4 text-center text-gray">第一次活动《燕大跑跑乐》</p>
</div>

</template>
<template #right>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="serverImg5" class="w-full" alt="新春联谊会" />
  <p class="mt-4 text-center text-gray">第一届《新春联谊会》现场</p>
</div>

</template>
</TwoColumn>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

燕山大学服务器向全部燕山大学Minecraft玩家开放多人游戏和活动模块，并向正式社员开放多人协同工作模块。社团为全部外部成员**无偿**提供服务器，安装包均为已经打包好的版本，即插即用。

</div>

<TextCard title="皮肤站" :action-button="{text: '前往皮肤站', link: 'https://skin.ysumc.net'}">
服务器使用皮肤站进行登录验证，注册皮肤站账号后即可自定义皮肤与披风。<br />
设置方法见皮肤站设置教程。
</TextCard>

<JoinUs />

</div>
