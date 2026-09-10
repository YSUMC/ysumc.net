---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import TextCard from '@/component/TextCard.vue'

import heroImage from '~/image/project/MCServer-1.png'
</script>

<Hero :image="heroImage" dark="0.6" title="燕山大学服务器" text="为燕山大学Minecraft爱好者搭建起的平台。"></Hero>

<div class="container">

<div class="center-block">

## 平台简介

燕山大学服务器是燕山大学Minecraft学生同好者协会为全校Minecraft爱好者搭建的多人游戏平台。社团为全部外部成员**无偿**提供服务器，安装包均为已经打包好的版本，即插即用，方便第一次游玩PC版Minecraft的学生。

</div>

<TwoColumn>
<template #left>

## 特色

- 无偿向全体外部成员开放
- 打包好的客户端，即插即用
- 皮肤站正版验证，支持自定义皮肤
- 定期举办服务器内活动

</template>
<template #right>

## 如何加入

加入QQ群即视为成为外部成员，<br />
在群公告中即可获取服务器与客户端信息。

</template>
</TwoColumn>

<TextCard title="皮肤站" :action-button="{text: '前往皮肤站', link: 'https://skin.ysumc.net'}">
服务器使用皮肤站进行登录验证，注册皮肤站账号后即可自定义皮肤与披风。<br />
设置方法见皮肤站设置教程。
</TextCard>

</div>
