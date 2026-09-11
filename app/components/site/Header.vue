<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'reka-ui'

const props = withDefaults(defineProps<{ transparent?: boolean, color?: 'white' | 'black' }>(), {
  transparent: true,
  color: 'white',
})
const appConfig = useAppConfig()
const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const darkHeader = computed(() => props.transparent || props.color === 'black')
const nav = computed(() => [
  { name: '项目', to: '/project/' },
  { name: '地图', to: '/map/' },
  {
    name: '资料',
    children: [
      { name: '皮肤站设置', to: 'https://blog.ysumc.net/index.php/%E6%95%99%E7%A8%8B/54.html' },
      { name: '我社报道', to: '/document/reports/' },
      { name: '视觉形象', to: '/document/visual-identity/' },
      { name: '加入我们', to: '/join/external-member/' },
      { name: 'MC社网盘', to: appConfig.site.links.cloud },
    ],
  },
  { name: '画廊', to: '/gallery/' },
  { name: '皮肤站', to: appConfig.site.links.skin },
  {
    name: '联系我们',
    children: [
      { name: 'QQ群', to: appConfig.site.links.qq },
      { name: 'B站', to: appConfig.site.links.bilibili },
      { name: '爱发电', to: appConfig.site.links.afdian },
    ],
  },
])

function updateScroll() { scrolled.value = window.scrollY > 10 }
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', updateScroll))
watch(() => route.fullPath, () => { mobileOpen.value = false })

function external(to?: string) { return !!to && /^https?:\/\//.test(to) }
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[2000] transition-all duration-300"
    :class="[
      scrolled ? 'shadow-md backdrop-blur-lg' : '',
      darkHeader ? 'bg-ink-dark/80 text-white' : 'bg-white/80 text-ink',
    ]"
  >
    <div class="mx-3 md:mx-10 flex h-14 items-center justify-between">
      <NuxtLink to="/" class="shrink-0" aria-label="燕山大学MC社首页">
        <NuxtImg
          :src="darkHeader ? '/image/theme/logo/ysumc-white.svg' : '/image/theme/logo/ysumc-color.svg'"
          class="h-8"
          alt="燕山大学MC社"
        />
      </NuxtLink>

      <nav class="hidden md:block" aria-label="主导航">
        <ul class="flex items-center">
          <li v-for="item in nav" :key="item.name" class="group relative">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              :external="external(item.to)"
              class="block px-3 xl:px-5 py-4 text-sm font-medium hover:text-brand"
            >{{ item.name }}</NuxtLink>
            <button v-else class="px-3 xl:px-5 py-4 text-sm font-medium hover:text-brand">
              {{ item.name }} ▾
            </button>
            <div
              v-if="item.children"
              class="invisible absolute right-0 min-w-40 translate-y-1 rounded-md bg-ink-dark/90 py-1 text-white opacity-0 shadow-lg backdrop-blur-md transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.to"
                :external="external(child.to)"
                class="block whitespace-nowrap px-5 py-3 text-sm hover:text-brand"
              >{{ child.name }}</NuxtLink>
            </div>
          </li>
        </ul>
      </nav>

      <DialogRoot v-model:open="mobileOpen">
        <DialogTrigger class="md:hidden p-2" aria-label="打开导航">
          <span class="block h-0.5 w-6 bg-current mb-1.5" />
          <span class="block h-0.5 w-6 bg-current mb-1.5" />
          <span class="block h-0.5 w-6 bg-current" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="fixed inset-0 z-[2100] bg-black/50" />
          <DialogContent class="fixed right-0 top-0 z-[2200] h-dvh w-72 overflow-y-auto bg-base-white p-6 text-ink shadow-2xl">
            <div class="mb-5 flex justify-between">
              <span class="font-ysumc text-xl">导航</span>
              <DialogClose class="p-1 text-2xl" aria-label="关闭导航">×</DialogClose>
            </div>
            <ul>
              <li v-for="item in nav" :key="item.name" class="mb-3">
                <DialogClose v-if="item.to" as-child>
                  <NuxtLink :to="item.to" :external="external(item.to)" class="block py-1 font-medium">{{ item.name }}</NuxtLink>
                </DialogClose>
                <span v-else class="block py-1 font-medium">{{ item.name }}</span>
                <ul v-if="item.children" class="ml-4 text-sm text-gray-dark">
                  <li v-for="child in item.children" :key="child.name">
                    <DialogClose as-child>
                      <NuxtLink :to="child.to" :external="external(child.to)" class="block py-1.5">{{ child.name }}</NuxtLink>
                    </DialogClose>
                  </li>
                </ul>
              </li>
            </ul>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </header>
</template>
