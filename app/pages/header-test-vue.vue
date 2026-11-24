<template>
  <div>
    <section class="bg-white px-6 pb-20 pt-32 text-center">
      <h1 class="font-ysumc text-4xl md:text-6xl">首块不是 Hero（Vue 页面）</h1>
      <p class="mx-auto mt-8 max-w-2xl text-lg/relaxed">
        这是常规 Vue 测试页。首屏第一块是普通内容，页头在 SSR
        时应为实底态；滚动到页面下方的 Hero 时，运行逻辑会把页头改成透明态。
      </p>
    </section>
    <Hero image="/image/index/Countdown.png" title="测试页面下方 Hero"></Hero>
  </div>
</template>
