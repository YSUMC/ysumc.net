---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import Button from '@/component/public/Button.vue'
import TextCard from '@/component/TextCard.vue'

import heroImage from '~/image/document/Hero.png'
import logoColor from '@/image/logo/ysumc-color.svg'
import logoWhite from '@/image/logo/ysumc-white.svg'
import logoText from '@/image/logo/ysumc-text.svg'
import muaLogo from '@/image/logo/mua.svg'
</script>

<Hero
    :image="heroImage"
    dark="0.6"
    title="视觉形象"
    text="本社团的视觉形象规范与标准素材。"
></Hero>

<div class="container">

<div class="center-block">

## 标准标识

燕山大学Minecraft学生同好者协会的标准标识由标志图形与标准字组成。<br />
标准色为燕大蓝（#1f296a）与辅助青（#66cccc）。

</div>

<div class="max-w-7xl mx-6 xl:mx-auto my-14 grid grid-cols-1 md:grid-cols-2 gap-8">
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <img :src="logoColor" class="mx-auto h-32" alt="YSUMC 标准色标识" />
    <p class="mt-6 text-gray">标准色标识 ysumc-color.svg</p>
  </div>
  <div class="not-prose bg-black-dark shadow-lg p-10 text-center">
    <img :src="logoWhite" class="mx-auto h-32" alt="YSUMC 反白标识" />
    <p class="mt-6 text-white">反白标识 ysumc-white.svg</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <img :src="logoText" class="mx-auto h-24" alt="YSUMC 标准字" />
    <p class="mt-6 text-gray">标准字 ysumc-text.svg</p>
  </div>
  <div class="not-prose bg-white shadow-lg p-10 text-center">
    <img :src="muaLogo" class="mx-auto h-32" alt="MUA 标识" />
    <p class="mt-6 text-gray">MUA高校联盟标识 mua.svg</p>
  </div>
</div>

<TextCard title="使用规范" dark>
  标识使用时应保证足够的留白空间，不得拉伸、变形、改变配色。<br />
  对外宣传物料中应优先使用标准色标识。<br />
  如需其他格式或尺寸的素材，请通过QQ群联系我们。
</TextCard>

<div class="center-block">

## 标准字体

本社标准字体为 YSUMC Standard Minecraft Font，基于 Minecraft 游戏字体定制。<br />
用于标题、banner 等场景，正文请使用系统默认字体以保证可读性。

</div>

</div>
