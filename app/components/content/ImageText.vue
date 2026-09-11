<script setup lang="ts">withDefaults(defineProps<{ align?: 'left'|'center'|'right' }>(),{align:'center'})</script>
<template><span class="not-prose my-2 block text-xs text-gray" :style="{textAlign:align}"><slot /></span></template>
