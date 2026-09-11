<script setup lang="ts">
defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()
</script>

<template>
  <NuxtLayout name="default" solid>
    <div class="mx-auto w-11/12 max-w-7xl py-24 text-center md:w-3/4">
      <h1 class="font-ysumc text-6xl md:text-8xl">
        {{ error.statusCode || 404 }}
      </h1>
      <p class="mt-8 text-xl md:text-2xl">
        这个方块好像不在该有的位置上。<br />
        要么是链接错了，要么是我们搬走了它。
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <SiteButton text="回到首页" to="/" />
        <SiteButton text="去看看项目" to="/project/" color="pink" />
      </div>
    </div>
  </NuxtLayout>
</template>
