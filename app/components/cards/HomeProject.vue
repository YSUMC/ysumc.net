<script setup lang="ts">defineProps<{ title:string,image:string,to:string }>()</script>
<template><NuxtLink :to="to" class="overflow-hidden bg-white shadow-lg"><NuxtImg :src="image" sizes="sm:100vw md:50vw" class="aspect-video w-full object-cover" :alt="title"/><div class="p-7"><h3 class="font-ysumc text-2xl">{{ title }}</h3><p class="mt-4 leading-relaxed"><slot/></p></div></NuxtLink></template>
