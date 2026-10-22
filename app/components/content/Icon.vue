<script setup lang="ts">
// 放在 components/content/ 是为了让 markdown 里能直接写 <Icon>：
// Nuxt Content 只把该目录下的组件按无前缀名字交给 MDC，挪到别的目录会静默失效。
import { iconPaths } from '~/data/icons'

const props = defineProps<{ name: string }>()
</script>

<template>
  <!-- 不写死 display：调用方常用 `mx-auto block` 居中，而 `inline-block` 与 `block`
       同属 display 工具类、特异性相同，会按字母序互相覆盖导致居中失效。
       svg 默认就是 inline，父级 `text-center` 依旧能居中；需要块级时调用方自己加 `block`。 -->
  <svg class="fill-current" viewBox="0 0 1024 1024" aria-hidden="true">
    <path :d="iconPaths[props.name]" transform="translate(0 992) scale(1 -1)" />
  </svg>
</template>
