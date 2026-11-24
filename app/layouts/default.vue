<script setup lang="ts">
import headerManifest from '#build/header-manifest'
import { normalizeHeaderPath, type HeaderVariant } from '#shared/header'

// 首帧透明态优先页面元数据，其次构建期清单；挂载后由沉浸式区块注册表接管。
const props = withDefaults(defineProps<{ solid?: boolean }>(), { solid: false })
const route = useRoute()
const { overImmersive, reset } = useHeaderRegistry()
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

const isDark = computed(() => route.meta.isDark === true)
const variant = computed<HeaderVariant>(() => {
  if (props.solid) return 'light'
  if (overImmersive.value ?? initialTransparent.value) return 'transparent'
  return isDark.value ? 'dark' : 'light'
})

watch(
  () => route.path,
  () => {
    reset()
  },
)
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <SiteHeader :variant="variant" />
    <main class="grow">
      <slot />
    </main>
    <SiteBackTop />
    <SiteFooter />
  </div>
</template>
