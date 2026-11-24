<script setup lang="ts">
import headerManifest from '#build/header-manifest'
import { normalizeHeaderPath, type HeaderVariant } from '#shared/header'

// 首帧透明态优先页面元数据，其次构建期清单；挂载后由沉浸式区块注册表接管。
const props = withDefaults(defineProps<{ solid?: boolean }>(), { solid: false })
const route = useRoute()
const { overImmersive, reset } = useHeaderRegistry()
const warnedManifestPaths = new Set<string>()

const manifestKey = computed(() => normalizeHeaderPath(route.path))
const manifestEntry = computed(() => headerManifest[manifestKey.value])

const initialTransparent = computed(() => {
  if (props.solid) return false
  const metaImmersive = route.meta.headerImmersive
  if (typeof metaImmersive === 'boolean') return metaImmersive
  if (
    import.meta.dev &&
    manifestEntry.value === undefined &&
    !warnedManifestPaths.has(manifestKey.value)
  ) {
    warnedManifestPaths.add(manifestKey.value)
    console.warn(
      `[header-manifest] 路由 ${manifestKey.value} 没有清单项，暂按透明处理`,
    )
  }
  return manifestEntry.value?.immersive ?? true
})

const isDark = computed(() => {
  const metaIsDark = route.meta.isDark
  if (typeof metaIsDark === 'boolean') return metaIsDark
  return manifestEntry.value?.isDark ?? false
})

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
