---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import TwoColumn from '@/component/TwoColumn.vue'
import CenterText from '@/component/public/CenterText.vue'
import Introduction from '@/component/join/Introduction.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Workflow-2.png'
import vfxTest from '~/image/project/workflow/0rcbjp3dinf8jq2c-816x450.png'
import vfxWest from '~/image/project/workflow/1-816x459.png'
import vfxTower from '~/image/project/workflow/linglong-3-816x459.png'
import vfxBig from '~/image/project/workflow/8rcokd5epce5ed-1920x1058.png'
import vfxSev from '~/image/project/workflow/sev-2-816x1255.png'
import vfx2 from '~/image/project/workflow/2-816x459.png'
</script>

<Hero :image="heroImage" dark="0.6" title="平面设计与视效工作流" text="让一切真实且生动"></Hero>

<div class="container">

<Introduction>

Minecraft以方块为单位元的游戏玩法让其得以成为各位玩家挥洒想象力的工具，也能成为学校宣传的一个独特视角。燕山大学Minecraft同好者协会为了将每名社员的建筑成果和社团宣传成果以最高的规格展示出来，在社团内设立了专门的视效工作流。这是本社团的三大工作流之一。

</Introduction>

<div class="center-block">

## 用途和成果展示（部分）

</div>

<div class="max-w-5xl mx-6 xl:mx-auto my-14">
  <div class="not-prose bg-white shadow-lg p-6">
    <img :src="vfxTest" class="w-full" alt="样本渲染测试" />
    <p class="mt-4 text-center text-gray">样本渲染测试（太空电梯复原 弹射塔部分）</p>
  </div>
</div>

<TwoColumn>
<template #left>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="vfxWest" class="w-full" alt="外宣用渲染" />
  <p class="mt-4 text-center text-gray">展示外宣用渲染（燕山大学复原计划 西校区）</p>
</div>

</template>
<template #right>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="vfxTower" class="w-full" alt="个人建筑渲染" />
  <p class="mt-4 text-center text-gray">个人建筑渲染（玲珑塔复原 社员作品）</p>
</div>

</template>
</TwoColumn>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

Minecraft虽然拥有着强大的创造性，但是仍旧拥有着诸多限制。例如低图形质量，限制高度（384方块）和加载距离（原版为512方块）等。这虽然不影响正常游戏，但也会影响到本社团部分制作成果的观感和整体效果。

在专业3D视效软件的帮助下，我们可以轻易解决上述问题，并将质量优秀的作品以极佳的视觉效果向各位展现出来。

</div>

<TwoColumn>
<template #left>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="vfxBig" class="w-full" alt="超大规模建筑渲染" />
  <p class="mt-4 text-center text-base/relaxed md:text-lg">超大规模建筑可以利用渲染软件实现游戏内难以实现或无法实现的视觉效果，令人眼前一亮。</p>
</div>

</template>
<template #right>

<div class="not-prose bg-white shadow-lg p-6">
  <img :src="vfxSev" class="w-full" alt="分段建筑拼合" />
  <p class="mt-4 text-center text-base/relaxed md:text-lg">利用3D视效软件，将游戏内因为超高需要分段制作的建筑拼合在一起进行渲染，以确定其最终效果是否符合预期。</p>
</div>

</template>
</TwoColumn>

<div class="max-w-5xl mx-6 xl:mx-auto my-14 text-base/relaxed md:text-lg">

3D视效工作流是燕山大学Minecraft学生同好者协会在游戏内建筑工程和对外宣传上的重要辅助工作流。在建筑工作时，可以利用3D视效软件拼合因为游戏内部原因必须分段制作的建筑，查看最终效果如何并提出更改方案。在外宣工作时，3D视效软件可以轻松制作出在游戏内难以实现甚至无法实现的视觉效果，在优秀建筑的基础上再度为其增色，甚至可以提振社团内的士气。

与此同时，部分专业工作需要学习3D视效软件，大量来自社团的不同建筑案例需要不同的3D视效制作策略，这有助于提升个人有关3D视效的专业能力，这可能对之后的学习工作有极大的益处。

目前，燕山大学Minecraft学生同好者协会使用 **Blender** 和 **Twinmotion**（一种较易上手的建筑可视化软件）进行3D视觉效果工作。视效工作流虽然是本社团的重要一环，但本社团不强制规定社员必须掌握一种3D视效软件。

</div>

<JoinUs />

</div>
