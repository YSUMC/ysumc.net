---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import CountDown from '@/component/CountDown.vue'

import heroImage from '~/image/project/Hero.png'
</script>

<Hero :image=heroImage class="mb-14" dark="0.6">
  <div class="absolute top-1/3 w-full">
    <h1 class="text-4xl md:text-7xl font-ysumc text-white text-center">
      距离下一次危机还有
    </h1>
    <CountDown :time="new Date('2024/12/10')">
      这里是项目页，下滑以了解更多项目。
    </CountDown>
  </div>
</Hero>
