<script setup lang="ts">
withDefaults(
    defineProps<{
      to: string
    }>(),
    {
      to: ''
    }
)

function isOutlink(link: string | undefined) {
  // 使用正则表达式判断是否为外链
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
  return link ? reg.test(link) : false
}
</script>

<template>
  <a
      :href="to"
      target="_blank"
      v-if="isOutlink(to)"
  >
    <slot/>
  </a>
  <RouteLink
      :to="to"
      v-else
  >
    <slot/>
  </RouteLink>
</template>
