---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'

import heroImage from '~/image/project/Workflow-3.png'
</script>

<Hero :image="heroImage" dark="0.6" title="正式社员培训工作流" text="薪火相传的意义。"></Hero>

<div class="container">

<div class="center-block">

## 工作流简介

正式社员培训工作流是社团传承的根基：由资深社员为新加入的正式社员提供系统培训，覆盖建筑、技术、运维、宣传各个部门的核心技能。

薪火相传的意义——每一位讲师都曾是学员，每一位学员都可能成为讲师。

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

</div>
