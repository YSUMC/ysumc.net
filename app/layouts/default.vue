<script setup lang="ts">
const navState = reactive({ transparent: true, color: 'white' as 'white' | 'black' })

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
