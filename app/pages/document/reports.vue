<script setup lang="ts">
const {data:reports}=await useAsyncData('reports:index',async()=>{if(!import.meta.server)throw new Error('Report index is missing from the prerender payload');const event=useRequestEvent()!;const{getReports}=await import('~~/server/utils/content-pages');return getReports(event)})
useSeoMeta({title:'我社报道 - 燕山大学MC社',description:'本社团的对外文章、教程与项目记录。',ogImage:'/image/document/Hero.png'})
</script>
<template><div><Hero image="/image/document/Hero.png" dark="0.6" title="我社报道" text="这里收录本社团的对外文章、教程与项目记录，点击卡片即可阅读。"/><div class="page-container my-14 grid gap-8 md:grid-cols-2"><CardsReportCard v-for="item in reports" :key="item.path" :item="item"/></div></div></template>
