<script setup lang="ts">
// 放在 components/content/ 是为了让 markdown 里能直接写 <Icon>：
// Nuxt Content 只把该目录下的组件按无前缀名字交给 MDC，挪到别的目录会静默失效。
import { iconPaths } from '~/data/icons'

const props = defineProps<{ name: string }>()
</script>

<template>
  <svg class="inline-block fill-current" viewBox="0 0 1024 1024" aria-hidden="true">
    <path :d="iconPaths[props.name]" transform="translate(0 992) scale(1 -1)" />
  </svg>
</template>
