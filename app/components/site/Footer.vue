<script setup lang="ts">
const appConfig = useAppConfig()
const groups = computed(() => [
  {
    title: '资料',
    items: [
      { name: '我社报道', to: '/document/reports/' },
      { name: '视觉形象', to: '/document/visual-identity/' },
      { name: '档案管理办法', to: '/document/archive-management/' },
    ],
  },
  {
    title: '关于我们',
    items: [
      { name: '燕山大学官方网站', to: appConfig.site.links.university },
      { name: '燕山大学MC社皮肤站', to: appConfig.site.links.skin },
      { name: '画廊', to: '/gallery/' },
      { name: '加入我们', to: '/join/external-member/' },
    ],
  },
])
</script>

<template>
  <footer class="bg-ink-dark text-white py-8">
    <div class="page-container grid gap-8 md:grid-cols-4">
      <div class="md:col-span-2">
        <NuxtLink to="/" aria-label="燕山大学MC社首页">
          <NuxtImg src="/image/theme/logo/ysumc-text.svg" class="w-72 max-w-full" alt="燕山大学MC社" />
        </NuxtLink>
        <div class="mt-6 flex gap-4 text-sm">
          <a :href="appConfig.site.links.qq" target="_blank" rel="noopener">QQ</a>
          <a :href="appConfig.site.links.bilibili" target="_blank" rel="noopener">B站</a>
          <a :href="appConfig.site.links.afdian" target="_blank" rel="noopener">爱发电</a>
        </div>
      </div>
      <div v-for="group in groups" :key="group.title">
        <h2 class="font-bold mb-3">{{ group.title }}</h2>
        <ul class="space-y-2 text-sm text-gray-300">
          <li v-for="item in group.items" :key="item.name">
            <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-container mt-8 border-t border-white/20 pt-5 text-xs md:flex md:justify-between">
      <p>© {{ new Date().getFullYear() }} 本社所有文案，图片均由燕山大学Minecraft学生同好者协会制作，未经允许，切勿盗取挪用，如若发现，将采取法律手段进行维权。</p>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">黔ICP备2022009898号-2</a>
    </div>
  </footer>
</template>
