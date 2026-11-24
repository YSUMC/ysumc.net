<script setup lang="ts">
import headerManifest from '#build/header-manifest'
import { normalizeHeaderPath } from '#shared/header'

// 首帧透明态优先页面元数据，其次构建期清单；滚动后由 Hero 组件接管。`solid` 用于 404 等页面。
const props = withDefaults(defineProps<{ solid?: boolean }>(), { solid: false })
const route = useRoute()
const warnedManifestPaths = new Set<string>()
const initialTransparent = computed(() => {
  if (props.solid) return false
  const metaImmersive = route.meta.headerImmersive
  if (typeof metaImmersive === 'boolean') return metaImmersive
  const key = normalizeHeaderPath(route.path)
  const value = headerManifest[key]
  if (import.meta.dev && value === undefined && !warnedManifestPaths.has(key)) {
    warnedManifestPaths.add(key)
    console.warn(`[header-manifest] 路由 ${key} 没有清单项，暂按透明处理`)
  }
  return value ?? true
})
const navState = reactive({
  transparent: initialTransparent.value,
  color: 'white' as 'white' | 'black',
})

watch(
  () => route.path,
  () => {
    navState.transparent = initialTransparent.value
  },
)

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
