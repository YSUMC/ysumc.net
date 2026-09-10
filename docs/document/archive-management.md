---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'

import heroImage from '~/image/document/Hero.png'
</script>

<Hero
    :image="heroImage"
    dark="0.6"
    title="档案管理办法"
    text="留住每一份记忆才能越走越远"
></Hero>

<div class="container">

<Introduction>

燕山大学Minecraft学生同好者协会的创作特性让社团的历史文件归档工作非常重要，本《办法》规定了燕山大学Minecraft学生同好者协会对社团内档案的管理方式，以供各位社员和每一届管理层参考。

</Introduction>

<div class="center-block">

## 档案分类

燕山大学Minecraft学生同好者协会的档案可分为以下几类：

</div>

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <span class="mobi-mbri-contact-form text-7xl text-gray4"></span>
    <h3 class="mt-8 text-xl font-ysumc">行政档案</h3>
    <p class="mt-4 text-base/relaxed">一般来自行政部，运营层和临时团支部，记载了社团内的行政工作资料，比如社团建社记载、运营记载、会议记载等。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <span class="mobi-mbri-gift text-7xl text-gray4"></span>
    <h3 class="mt-8 text-xl font-ysumc">活动档案</h3>
    <p class="mt-4 text-base/relaxed">一般来自运维部和技术部，记载了社团内的全部活动记录，例如活动报告、会议思维导图、活动记载等。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <span class="mobi-mbri-rocket text-7xl text-gray4"></span>
    <h3 class="mt-8 text-xl font-ysumc">建筑（玩法）档案</h3>
    <p class="mt-4 text-base/relaxed">一般来自建筑部和玩法部，记载了社团内全部的Minecraft建筑地图，渲染文件和小游戏地图。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <span class="mobi-mbri-folder text-7xl text-gray4"></span>
    <h3 class="mt-8 text-xl font-ysumc">其他档案</h3>
    <p class="mt-4 text-base/relaxed">社团内其他难以归档于上述三类的档案，便归类于“其他档案”中。</p>
  </div>
</div>

<div class="center-block">

## 记载封面规范

</div>

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
  <div class="not-prose shadow-lg p-10 text-center bg-white border border-gray">
    <p class="text-3xl font-ysumc text-black">一般记载</p>
    <p class="text-sm text-gray mt-4">白色或浅灰色底，阳文</p>
    <p class="mt-8 text-base/relaxed">一般档案使用的封面。</p>
  </div>
  <div class="not-prose shadow-lg p-10 text-center bg-black-dark">
    <p class="text-3xl font-ysumc text-white">重要记载</p>
    <p class="text-sm text-gray mt-4">深灰色底，阴文</p>
    <p class="mt-8 text-base/relaxed text-white">社团内重要工作的记载封面。</p>
  </div>
  <div class="not-prose shadow-lg p-10 text-center" style="background-color:#1f296a;">
    <p class="text-3xl font-ysumc text-white">提案</p>
    <p class="text-sm mt-4" style="color:#66cccc;">燕大蓝底，阴文</p>
    <p class="mt-8 text-base/relaxed text-white">对外提交的提案封面。</p>
  </div>
  <div class="not-prose shadow-lg p-10 text-center" style="background-color:#9c292d;">
    <p class="text-3xl font-ysumc text-white">急件</p>
    <p class="text-sm mt-4" style="color:#d36839;">深红色底，阴文</p>
    <p class="mt-8 text-base/relaxed text-white">极其重大事务和急送件的封面。</p>
  </div>
</div>

<div class="center-block">

## 档案评级

为了保证每一名社员的权益，档案分为以下评级：

</div>

<div class="max-w-7xl mx-6 xl:mx-auto my-14">
  <div class="not-prose bg-white shadow-lg p-10 mb-8">
    <h3 class="text-2xl font-ysumc text-blue">公开</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">档案向全部人开放，外人可自由查阅或下载，甚至是重新编辑，是最低的档案评级。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 mb-8">
    <h3 class="text-2xl font-ysumc text-blue">仅限查阅</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">档案向全部人开放，但仅可以通过官方的云盘文件或经运营层授权后进行查阅，社团对于可能的非法复制行为不做评价。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 mb-8">
    <h3 class="text-2xl font-ysumc text-blue">仅限知晓</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">档案仅可被运营层成员和被授权可查阅的社员开放，他人只能知晓该档案的存在和大致信息，但不可以查阅，下载或编辑。</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10">
    <h3 class="text-2xl font-ysumc text-red">保密</h3>
    <p class="mt-4 text-base/relaxed md:text-lg">最高的档案评级，档案只允许当届运营层查阅，下载或编辑。极端情况下，档案可以不允许任何人进行任何可能的操作。</p>
  </div>
</div>

<div class="center-block">

## 档案的产生

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

社团的每一次活动和项目同时都可能会伴随着档案的产生，档案可以是任何记录过社团活动或项目的纸质或电子媒介，例如图片、会议纪要、笔记、活动申请表、演示文稿、思维导图等。因为本社团的特殊性，Minecraft地图文件包、Schematic文件（MCEdit通用结构文件）、NBT文件等游戏内可以执行的文件也可以算作产生的档案。档案产生后，需要对档案进行分类和评级，然后由运营层进行归档工作。

</div>

<div class="center-block">

## 归档和保存

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

档案在经过分类和评级后才可进行归档操作。归档分为**电子归档**、**实体归档**和**独立电子归档**三种：电子归档即将需要归档的档案保存在官方云盘或经本社团授权过的存储介质中；实体归档则是将实体文件存储进本社团授权过的档案夹中；独立电子归档一般用于保存对社团具有重大意义的文件，是指将电子文件独立存储至U盘或固态硬盘中后进行物理保管。

档案应当按照已经确定的分类和评级进行准确的分类，以保证后期查阅的便捷。燕山大学Minecraft学生同好者协会的档案库分为**电子档案库**和**实体档案库**：电子档案库一般由一个经本社团授权的存储介质和本社授权的云盘构成；实体档案库分为纸质文件库和存储介质库，前者是一个经过本社团授权的档案盒，储存纸质档案，后者则是经社团授权的运营层成员和经社团授权的物理存储空间共同组成，储存独立电子归档的档案。

**电子档案库只允许储存评级为“公开”和“仅限查阅”的档案和评级为“仅限知晓”的档案的粗略信息。只有实体档案库允许储存评级为“仅限知晓”和“保密”的档案！**

</div>

<div class="center-block">

## 档案库管理

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

燕山大学Minecraft学生同好者协会的一种档案库至少需要一个运营层成员进行专门的管理工作。档案的管理工作仅限分类，第一次评级，归档和查阅。编辑档案本身，更改档案评级和删除档案等工作则需要在运营层会议中决定。

通过电子存储介质存储的档案需要按时备份，为了保证文件的完整性，独立电子归档的档案建议一式两份异地保存。评级为“公开”和“仅限查阅”的档案可以不经任何授权进行评级内允许的工作，评级为“仅限知晓”和“保密”的档案需要被授权才能查阅。

</div>

<div class="center-block">

## 版权档案管理办法

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

燕山大学Minecraft学生同好者协会部分档案生成后即默认拥有著作权（例如社团内成员制作的地图等），这类档案需要进行特殊管理。若档案拥有著作权，任何处理办法需优先按照本管理办法进行：

1. 版权档案的全部决定权由作者或主要创作者负责。
2. 单作者或无运营层成员做出突出贡献的多作者版权档案，主要创作者有权禁止运营层进行归档工作。
3. 由运营层成员领导的多作者版权档案必须进行归档工作。
4. 版权档案生成并决定归档且主要创作者未对版权进行任何解释时，档案评级默认为“仅限知晓”。
5. 版权档案在任何评级，任何情况下，均可由作者或主要创作者单方面宣布对档案的一切决定，其权限高于运营层。
6. 任何未经本办法解释的涉及版权档案的处理工作，作者或主要创作者优先级最高。

</div>

<CenterText title="档案页样例">档案评级为“仅限知晓”及以上的档案不对公众开放，样例页仅展示档案封面与概括信息。</CenterText>

</div>
