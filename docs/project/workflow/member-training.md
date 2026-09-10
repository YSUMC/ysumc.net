---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Workflow-3.png'
</script>

<Hero :image="heroImage" dark="0.6" title="正式社员培训工作流" text="薪火相传的意义"></Hero>

<div class="container">

<Introduction>

燕山大学Minecraft学生同好者协会希望能够以“薪火相传”的理念逐渐培养起每一位正式社员的能力。本社团虽然是游戏社团，但其工作范围包含文化，技术，软硬件等，具有极强的综合性。社团希望通过游戏这一普遍被年轻人所接受的事物和Minecraft游戏本身自带的专业属性，在游戏工作中精进其个人能力，使其在日后的学习和工作上有更大的收获。目前，燕山大学Minecraft学生同好者协会正在培训或希望培训的类别如下：

</Introduction>

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="not-prose bg-white shadow-lg p-10">
    <span class="mobi-mbri-user-2 text-7xl text-gray4 block text-center"></span>
    <h3 class="mt-8 text-2xl font-ysumc text-center">个人魅力和执行力培养</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">听起来可能和社团本身工作离题太远，但实际上，个人魅力与执行力极其重要。这包括如何领导社团，如何从一而终地贯彻执行社团的主要目标等直接关系着社团根基的事务。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10">
    <span class="mobi-mbri-star text-7xl text-gray4 block text-center"></span>
    <h3 class="mt-8 text-2xl font-ysumc text-center">审美培养</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">审美能力是本社团外宣和内部工作的重要保证，相当于社团的“面子”。将利好于游戏内建筑工作，3D视效工作流和外部宣传，优秀的审美能力可以大幅提升社团的形象。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10">
    <span class="mobi-mbri-setting text-7xl text-gray4 block text-center"></span>
    <h3 class="mt-8 text-2xl font-ysumc text-center">技术培养</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">Minecraft的底层技术是社团运营的基础，是社团的“里子”。涉及到软件和硬件的工作。例如服务器的搭建和维护，本官网的制作也涉及到网络技术上的方面。</p>
  </div>
</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

一般情况下，培训工作流包括授课和实践项目，授课可以通过线上或者线下的形式进行。实践项目一般是使用“老带新”的方式进行，让社员们接触到大型项目和社团工作的方方面面，用生动的实例让社员们了解工作的方式和流程。社员们可以自由参与运营层成员的大型项目之中，了解到大型项目的制作方式和一般流程，也可以动手帮忙，甚至成为社团项目的主理人之一。

考虑到各位社员的时间安排和兴趣各不相同，一般不强制社员参与培训工作。但下一届运营层总是优先选择积极参与社团活动和培训的正式社员。燕山大学Minecraft学生同好者协会十分重视社员对待工作的态度，要求社员**“不求最好，但求认真”**。

燕山大学Minecraft学生同好者协会涉及到的工作不是只有《我的世界》游戏本身，而是包括审美能力、执行能力、交流能力、领导能力和各项专业工作的能力的综合工作。社团衷心希望各位社员能够通过社团内的工作精进个人能力，为以后的生活增加宝贵的工作经验。

</div>

<TwoColumn>
<template #left>

## 培训内容

- 建筑部：建筑风格、规划与细节工艺
- 技术部：数据包、材质包、插件开发
- 运维部：服务器、官网、皮肤站运维
- 宣传部：设计工具与内容创作

</template>
<template #right>

## 教材

部分培训教材已整理成教程公开，<br />
例如《Axiom 的基础科普与使用方法》。

</template>
</TwoColumn>

<JoinUs />

</div>
