<script setup lang="ts">
import Header from '../component/public/Header.vue';
import { provide, ref } from 'vue';
import { usePageFrontmatter } from 'vuepress/client';

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
  <main class="grow bg-base-white">
    <Content />
  </main>
</template>

<style lang="scss">

</style>
