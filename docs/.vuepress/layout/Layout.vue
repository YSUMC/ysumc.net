<script setup lang="ts">
import Header from "../component/public/Header.vue";
import Footer from "../component/public/Footer.vue";
import BackTop from "../component/public/BackTop.vue";
import {provide, ref} from "vue";

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
  <main class="grow bg-base-white">
    <Content/>
  </main>
  <BackTop/>
  <Footer/>
</template>

<style scoped lang="scss">

</style>