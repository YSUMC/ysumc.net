<script setup lang="ts">
import Header from '../component/public/Header.vue';
import Footer from '../component/public/Footer.vue';
import BackTop from '../component/public/BackTop.vue';
import Banner from '../component/article/Banner.vue';
import { provide, ref } from 'vue';
import { usePageFrontmatter, usePageData } from 'vuepress/client';

import defaultBanner from '@/image/default-banner.png';

const frontmatter = usePageFrontmatter();
const pageData = usePageData();

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
  <Banner
    :image="frontmatter.banner || defaultBanner"
    :title="pageData.title"
    :text="frontmatter.subtitle"
    :tags="frontmatter.tags"
  />
  <main class="grow bg-base-white w-full my-8 md:my-16">
    <Content class="prose max-w-7xl mx-auto w-11/12 md:w-3/4" />
  </main>
  <BackTop />
  <Footer />
</template>

<style lang="scss">
main {
  .prose {
    h2 {
      font-family: var(--font-ysumc);
      @apply text-3xl md:text-4xl mb-4;
    }

    h1 {
      display: none;
    }

    a {
      text-decoration-thickness: 2.5px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      a {
        text-decoration: none;
      }
    }

    p {
      @apply text-base md:text-lg;
    }
  }
}
</style>
