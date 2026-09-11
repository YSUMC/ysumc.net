<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, '') || '/')
const key = computed(() => `content-page:${path.value}`)

const { data: page } = await usePrerenderData(key.value, async () => {
  const event = useRequestEvent()!
  const { findContentPage } = await import('~~/server/utils/content-pages')
  return findContentPage(event, path.value)
})

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { data: reports } = await usePrerenderData('reports:index', async () => {
  const event = useRequestEvent()!
  const { getReports } = await import('~~/server/utils/content-pages')
  return getReports(event)
})

const isArticle = computed(
  () =>
    page.value?.layout === 'article' || page.value?.collection === 'articles',
)
const description = computed(
  () => page.value?.description || page.value?.subtitle || '',
)

useSeoMeta({
  title: () => page.value?.title,
  description,
  ogTitle: () => page.value?.title,
  ogDescription: description,
  ogImage: () =>
    page.value?.cover || page.value?.banner || page.value?.report?.image,
})
useHead({
  link: [{ rel: 'canonical', href: `https://ysumc.net${path.value}/` }],
})
</script>

<template>
  <div>
    <Hero
      v-if="isArticle"
      variant="banner"
      :image="page?.banner || '/image/theme/default-banner.png'"
      :title="page?.title"
      :text="page?.subtitle"
      :tags="page?.tags"
    />
    <ContentRenderer
      v-if="page"
      :value="page"
      :class="isArticle ? 'content-prose prose max-w-none' : 'content-page'"
    />
    <SiteReportNavigation
      v-if="reports"
      :items="reports"
      :current-path="path"
    />
  </div>
</template>
