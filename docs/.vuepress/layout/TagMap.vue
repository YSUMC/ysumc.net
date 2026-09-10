<script setup lang="ts">
import Header from '../component/public/Header.vue';
import Footer from '../component/public/Footer.vue';
import BackTop from '../component/public/BackTop.vue';
import { provide, ref } from 'vue';

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
  <main class="grow bg-base-white w-full my-8 md:my-16">
    <div class="prose max-w-7xl mx-auto w-11/12 md:w-3/4">
      <h1>标签页</h1>
      <p>本站暂无归档文章标签。</p>
    </div>
  </main>
  <BackTop />
  <Footer />
</template>
