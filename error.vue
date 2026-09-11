<script setup lang="ts">
defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="grid min-h-dvh place-items-center bg-ink px-6 text-center text-white">
    <div>
      <NuxtImg src="/image/theme/logo/ysumc-white.svg" class="mx-auto w-72 max-w-full" alt="燕山大学MC社" />
      <p class="mt-12 font-ysumc text-8xl">{{ error.statusCode || 404 }}</p>
      <h1 class="mt-6 text-2xl">这里还没有被方块填满</h1>
      <p class="mt-3 text-white/70">{{ error.statusMessage || '找不到你要访问的页面。' }}</p>
      <button class="mt-10 border-2 border-white px-6 py-3" @click="handleError">返回首页</button>
    </div>
  </main>
</template>
