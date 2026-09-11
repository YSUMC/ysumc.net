<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    color?: 'blue' | 'pink' | 'gray' | 'white' | 'black'
    to?: string
  }>(),
  { color: 'blue' },
)

const colors = {
  blue: 'text-brand border-brand hover:text-brand-dark hover:border-brand-dark',
  pink: 'text-pink border-pink hover:text-pink-dark hover:border-pink-dark',
  gray: 'text-gray border-gray',
  white: 'text-white border-white hover:border-base-white',
  black: 'text-ink border-ink hover:text-ink-dark hover:border-ink-dark',
}
</script>

<template>
  <NuxtLink
    :to="props.to"
    class="inline-block whitespace-nowrap rounded-md border-[2.5px] px-3 py-2 text-center text-base/relaxed font-bold tracking-tight transition-colors xl:px-4 xl:text-lg"
    :class="[
      colors[props.color],
      props.color === 'gray' ? 'cursor-default' : '',
    ]"
    >{{ props.text }}</NuxtLink
  >
</template>
