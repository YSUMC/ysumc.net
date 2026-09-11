<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const canonical = computed(
  () =>
    `${appConfig.site.url}${route.path === '/' ? '/' : `${route.path.replace(/\/$/, '')}/`}`,
)
useHead({ link: [{ rel: 'canonical', href: canonical }] })
useSeoMeta({
  ogSiteName: appConfig.site.name,
  ogType: 'website',
  ogUrl: canonical,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
