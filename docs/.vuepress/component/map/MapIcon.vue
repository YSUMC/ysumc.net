<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  isSelected: boolean,
  color: string,
  isSpecial: boolean,
  iconPath: string,
}>()

// const props = ref({
//   isSelected: false,
//   color: '#66cccc',
//   isSpecial: false,
//   iconPath: 'M172.9,213.6c-.2-.2-.3-.4-.7-.4h-1.7v-6.7c0-.3-.4-.6-1-.6h-.8v-17h.8c.7,0,1.1-.5,1.1-1.1v-9.1c0-.7-.5-1.1-1.1-1.1h-.8v-8.7h.4c.7,0,1.1-.5,1.1-1.1v-9.1c0-.7-.5-1.1-1.1-1.1h-38.2c-.7,0-1.1.5-1.1,1.1v9.1c0,.6.5,1.1,1.1,1.1h.4v8.7c-.6,0-1.1.5-1.1,1.1v9.1c0,.6.5,1.1,1.1,1.1v17h-.8c-.5,0-1,.3-1,.6v6.7h-1.7c-.4,0-.6.2-.7.4l-2.3,2.6h50.4l-2.3-2.6ZM164.2,177.6h-1.3v-8.7h1.3v8.7ZM143.5,177.6v-8.7h3.3v8.7h-3.3ZM156.5,168.9v8.7h-3.3v-8.7h3.3ZM137.1,168.9v8.7h-1.3v-8.7h1.3ZM135.8,204.3v-15.4h28.4v15.4c0,.7-.3,1.3-.7,1.6h-7.2v-.2c1.6-1.6,2.6-3.8,2.6-6.3,0-4.9-3.9-8.8-8.8-8.8s-8.8,3.9-8.8,8.8,1,4.7,2.6,6.3v.2h-7.3c-.4-.3-.7-.9-.7-1.6ZM153.7,194.5c-.2-1-1-1.7-1.9-1.7h-3.7c-.9,0-1.7.7-1.9,1.7l-2,9.1c-.9-1.2-1.4-2.6-1.4-4.2,0-3.9,3.2-7.1,7.1-7.1s7.1,3.2,7.1,7.1-.5,3-1.4,4.2l-2-9.1Z',
// })

const styleSvg = computed(() => ({
  transform: props.isSelected ? 'scale(2)' : 'scale(1)',
}));

const styleSt1 = computed(() => ({
  fill: props.color,
  opacity: props.isSpecial ? 0 : props.isSelected ? 0 : 1,
}));

const styleSt2 = computed(() => ({
  fill: props.isSpecial ? props.color : props.isSelected ? props.color : '#fff',
}));

const styleSt3 = computed(() => ({
  fill: '#fff',
  opacity: props.isSpecial ? 1 : props.isSelected ? 1 : 0,
}));
</script>

<template>
  <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
    viewBox="0 0 104.6 144.9" :style="styleSvg">
    <g class="st0">
      <path class="st2" :style="styleSt2"
        d="M52.4,0C23.5,0,0,24.1,0,53.8s28,66,49.5,89.8c1.5,1.7,4.1,1.7,5.6,0,21.5-23.7,49.5-61.4,49.5-89.8S81.2,0,52.3,0h.1Z" />
      <circle class="st1" :style="styleSt1" cx="52.4" cy="53.8" r="20" />
    </g>
    <path class="st3" :style="styleSt3" :d="props.iconPath" />
  </svg>
</template>

<style scoped>
svg {
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.75));
  transition: transform 0.3s cubic-bezier(0.84, 0.01, 0.14, 2.18);
  transform-origin: 50% 99%;
}

.st1 {
  transition: opacity 0.3s ease-in-out;
}

.st2 {
  transition: fill 0.3s ease-in-out;
}

.st3 {
  transition: opacity 0.3s ease-in-out;
}
</style>
