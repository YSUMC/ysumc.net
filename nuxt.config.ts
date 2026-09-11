import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  image: {
    dir: 'assets',
    format: ['webp'],
    quality: 82,
  },
  site: {
    url: 'https://ysumc.net',
    name: '燕山大学MC社',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ['/sitemap.xml'],
    },
  },
  routeRules: {
    '/__nuxt_content/**': { prerender: false },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hans-CN' },
      meta: [{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      }],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
      script: [{ src: 'https://hm.baidu.com/hm.js?fa3da49c5f4c868bc9a8ae469ba4051f' }],
    },
  },
  typescript: { typeCheck: true },
})
