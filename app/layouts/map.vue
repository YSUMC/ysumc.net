<script setup lang="ts">
const navState = reactive({ transparent: false, color: 'white' as 'white' | 'black' })

function setNavBar(transparent?: boolean, color?: 'white' | 'black') {
  if (typeof transparent === 'boolean') navState.transparent = transparent
  if (color) navState.color = color
}

provide('setNavBar', setNavBar)
</script>

<template>
  <div class="min-h-dvh">
    <SiteHeader :transparent="navState.transparent" :color="navState.color" />
    <slot />
  </div>
</template>
