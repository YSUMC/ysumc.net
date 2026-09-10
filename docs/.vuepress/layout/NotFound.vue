<script setup lang="ts">
import Header from '../component/public/Header.vue';
import Footer from '../component/public/Footer.vue';
import BackTop from '../component/public/BackTop.vue';
import { provide, ref } from 'vue';
import Button from '../component/public/Button.vue';

const navBar = ref<{
  isTransparent: boolean | undefined;
  color: 'white' | 'black' | undefined;
}>({
  isTransparent: undefined,
  color: undefined,
});

function setNavBar(isTransparent?: boolean, color?: 'white' | 'black') {
  if (isTransparent === true || isTransparent === false)
    navBar.value.isTransparent = isTransparent;
  if (color === 'white' || color === 'black') navBar.value.color = color;
}

provide('setNavBar', setNavBar);
</script>

<template>
  <Header :is-transparent="navBar.isTransparent" :color="navBar.color" />
  <main class="grow bg-base-white w-full my-24">
    <div class="max-w-7xl mx-auto w-11/12 md:w-3/4 text-center">
      <h1 class="text-6xl md:text-8xl font-ysumc">404</h1>
      <p class="mt-8 text-xl md:text-2xl">
        这个方块好像不在该有的位置上。<br />
        要么是链接错了，要么是我们搬走了它。
      </p>
      <div class="mt-10 flex flex-wrap gap-4 justify-center">
        <Button text="回到首页" link="/" />
        <Button text="去看看项目" link="/project/" color="pink" />
      </div>
    </div>
  </main>
  <BackTop />
  <Footer />
</template>
