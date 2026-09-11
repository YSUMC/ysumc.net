<script setup lang="ts">
const btnFlag = ref(false)

function backTop() {
  document.documentElement.scrollTop = document.body.scrollTop = 0
}

function update() {
  btnFlag.value = window.scrollY > 400
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <Transition>
    <button
      v-show="btnFlag"
      class="fixed bottom-10 right-20 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/20"
      aria-label="返回顶部"
      @click="backTop"
    >
      <svg class="h-5 w-5" viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          fill="#ffffff"
          d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
        />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
