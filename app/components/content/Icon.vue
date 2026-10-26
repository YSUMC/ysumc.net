<script setup lang="ts">
// 放在 components/content/ 是为了让 markdown 里能直接写 <Icon>：
// Nuxt Content 只把该目录下的组件按无前缀名字交给 MDC，挪到别的目录会静默失效。
import { iconPaths } from '~/data/icons'

const props = defineProps<{ name: string }>()
</script>

<template>
  <!-- 居中：不写死 display。调用方常用 `mx-auto block`，而 `inline-block` 与 `block`
       同属 display 工具类、特异性相同，会按字母序互相覆盖导致居中失效。
       svg 默认是 inline，父级 `text-center` 依旧能居中；需要块级时调用方自己加 `block`。

       翻转：字体坐标是 y 轴向上、em 框为 descent(-64) ~ ascent(960)，所以先 scale(1 -1)
       再平移 ascent 而非 units-per-em。用 992 会让整个字形下移 32 个单位、底部超出
       viewBox 被裁掉；用 960 后字形正好落在 0..1024 内，上下都不留裁切。 -->
  <svg class="fill-current" viewBox="0 0 1024 1024" aria-hidden="true">
    <path :d="iconPaths[props.name]" transform="translate(0 960) scale(1 -1)" />
  </svg>
</template>
