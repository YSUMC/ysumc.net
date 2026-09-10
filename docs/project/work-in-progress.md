---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import Button from '@/component/public/Button.vue'

import heroImage from '~/image/project/work-in-progress.jpg'
</script>

<Hero :image="heroImage">
  <div class="absolute bottom-36 left-10">
    <h1 class="text-4xl font-ysumc text-white">项目正在制作……</h1>
    <p class="text-2xl pb-12 pt-6 text-white">凡事总有过程，对吧。</p>
    <Button text="看看别的项目" link="/project/" color="black" />
  </div>
</Hero>
