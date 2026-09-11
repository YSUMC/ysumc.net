<script setup lang="ts">
// 默认透明：站点几乎所有页面首屏都是整屏英雄图，透明态由 Hero 组件的
// 观察器在挂载时接管；`solid` 用于没有英雄图的页面（如 404）。
const props = withDefaults(defineProps<{ solid?: boolean }>(), { solid: false })
const navState = reactive({
  transparent: !props.solid,
  color: 'white' as 'white' | 'black',
})

function setNavBar(transparent?: boolean, color?: 'white' | 'black') {
  if (typeof transparent === 'boolean') navState.transparent = transparent
  if (color) navState.color = color
}

provide('setNavBar', setNavBar)
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <SiteHeader :transparent="navState.transparent" :color="navState.color" />
    <main class="grow">
      <slot />
    </main>
    <SiteBackTop />
    <SiteFooter />
  </div>
</template>
