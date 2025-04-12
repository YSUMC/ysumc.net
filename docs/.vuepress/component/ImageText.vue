<script setup lang="ts">
const props = withDefaults(defineProps<{
  align?:'center'|'left'|'right'
}>(), {
  align: 'center'
})
</script>

<template>
  <span class="not-prose text-xs text-gray my-2 mx-2 xl:mx-0 block" :align="props.align">
    <slot></slot>
  </span>
</template>
