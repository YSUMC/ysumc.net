<script setup lang="ts">
const visible = ref(false)
function update() { visible.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      class="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border-2 border-white bg-black/30 text-white backdrop-blur"
      aria-label="返回顶部"
      @click="scrollToTop"
    >↑</button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s}.fade-enter-from,.fade-leave-to{opacity:0}
</style>
