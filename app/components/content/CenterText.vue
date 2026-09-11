<script setup lang="ts">defineProps<{ title?: string }>()</script>
<template><section class="not-prose px-6 py-14 text-center"><h2 v-if="title" class="font-ysumc text-3xl md:text-4xl mb-5">{{ title }}</h2><slot /></section></template>
