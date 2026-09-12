<script setup lang="ts">
definePageMeta({ layout: 'map' })
useSeoMeta({
  title: '像素燕大全导览图 - 燕山大学MC社',
  description: '像素燕大燕山大学复原计划交互式全导览图。',
  ogImage: '/image/gf.png',
})
</script>

<template>
  <MapPage v-slot="{ onZoom, onPoint, onMap }">
    <MapCanvas @zoom="onZoom" @pointclick="onPoint" @mapclick="onMap" />
  </MapPage>
</template>
