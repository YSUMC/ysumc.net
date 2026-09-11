<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, '') || '/')
const key = computed(() => `content-page:${path.value}`)

const { data: page } = await useAsyncData(key.value, async () => {
  if (!import.meta.server) throw new Error('Content page is missing from the prerender payload')
  const event = useRequestEvent()!
  const { findContentPage } = await import('~~/server/utils/content-pages')
  return findContentPage(event, path.value)
})

if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { data: reports } = await useAsyncData('reports:index', async () => {
  if (!import.meta.server) throw new Error('Report index is missing from the prerender payload')
  const event = useRequestEvent()!
  const { getReports } = await import('~~/server/utils/content-pages')
  return getReports(event)
})

const isArticle = computed(() => path.value === '/project/axiom' || !path.value.startsWith('/project/') && !path.value.startsWith('/document/'))
const description = computed(() => page.value?.description || page.value?.subtitle || '')

useSeoMeta({
  title: () => page.value?.title,
  description,
  ogTitle: () => page.value?.title,
  ogDescription: description,
  ogImage: () => page.value?.cover || page.value?.banner || page.value?.report?.image,
})
useHead({ link: [{ rel: 'canonical', href: `https://ysumc.net${path.value}/` }] })
</script>

<template>
  <div :class="isArticle ? 'article-page pt-20' : 'feature-page'">
    <ContentRenderer v-if="page" :value="page" :class="isArticle ? 'content-prose prose max-w-none' : 'content-page'" />
    <SiteReportNavigation v-if="reports" :items="reports" :current-path="path" />
  </div>
</template>
