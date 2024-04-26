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

const specialPageClass = ref([])

provide('setNavBar', setNavBar)
</script>

<template>
  <Header :is-transparent="navBar.isTransparent" :color="navBar.color"/>
  <main class="grow bg-base-white">
    <Content class="special-page"/>
  </main>
  <BackTop/>
  <Footer/>
</template>

<style lang="scss">
main {
  .container {
    @apply max-w-7xl md:mx-auto;
    h2 {
      font-family: var(--font-ysumc);
      @apply text-3xl md:text-4xl mb-4
    }

    p {
      @apply text-base md:text-lg
    }
  }

  .special-page {
    .center-block {
      @apply w-full text-center py-14 px-6;
      h2 {
        @apply mb-10
      }
    }
  }
}

//h1,h2,h3,h4,h5,h6 {
//  @apply pt-16;
//}
</style>