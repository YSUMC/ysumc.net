<script setup lang="ts">
import Header from "../component/public/Header.vue";
import Footer from "../component/public/Footer.vue";
import BackTop from "../component/public/BackTop.vue";
import {provide, ref} from "vue";
import Hero from "../component/public/Hero.vue";
import logoText from '@/asset/image/logo/ysumc-text.svg'

import HeroImage from '@/asset/image/Index/Hero.png'

const navBar = ref({
  isTransparent: undefined,
  color: undefined,
})

function setNavBar(isTransparent?: boolean, color?: 'white' | 'black') {
  if (isTransparent === true || isTransparent === false)
    navBar.value.isTransparent = isTransparent
  if (color === 'white' || color === 'black') navBar.value.color = color
}

provide('setNavBar', setNavBar)
</script>

<template>
  <Header/>
  <Hero :image=HeroImage class="mb-14">
    <div class="absolute bottom-36 md:top-[23%] left-4 md:left-8">
      <div class="w-full">
        <img :src=logoText class="h-20 md:h-32" />
      </div>
      <div
          class="mt-6 md:mt-16 ml-3 text-[3.2rem] md:text-[5.5rem] text-white font-normal leading-tight font-ysumc"
      >
        方块虽小，<br />
        亦是精彩之源。
      </div>
    </div>
  </Hero>
  <main class="grow bg-base-white">
    <Content/>
  </main>
  <BackTop/>
  <Footer/>
</template>

<style scoped lang="scss">

</style>