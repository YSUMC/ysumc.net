<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from 'reka-ui'

const props = withDefaults(
  defineProps<{ transparent?: boolean; color?: 'white' | 'black' }>(),
  {
    transparent: true,
    color: 'white',
  },
)
const appConfig = useAppConfig()
const route = useRoute()
const mobileOpen = ref(false)

const nav = appConfig.nav

// 透明态（英雄图之上，无背景）、白底态、黑底态。黑底态旧站没有页面触发，作为备用保留。
const themes = [
  {
    background: '',
    text: 'text-white',
    logo: '/image/theme/logo/ysumc-white.svg',
  },
  {
    background: 'bg-white/90',
    text: 'text-ink',
    logo: '/image/theme/logo/ysumc-color.svg',
  },
  {
    background: 'bg-ink-dark/80',
    text: 'text-white',
    logo: '/image/theme/logo/ysumc-white.svg',
  },
] as const
const theme = computed(
  () => themes[props.transparent ? 0 : props.color === 'white' ? 1 : 2],
)

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

function external(to?: string) {
  return !!to && /^https?:\/\//.test(to)
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[2000] shadow-md transition-all duration-[160ms] ease-[ease]"
    :class="theme.text"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 backdrop-blur-lg transition-all duration-[160ms] ease-[ease]"
      :class="theme.background"
    />
    <div
      class="relative z-10 mx-3 flex h-14 items-center justify-between md:mx-10"
    >
      <NuxtLink to="/" class="shrink-0" aria-label="燕山大学MC社首页">
        <NuxtImg :src="theme.logo" class="h-8" alt="燕山大学MC社" />
      </NuxtLink>

      <nav class="hidden h-full md:block" aria-label="主导航">
        <ul class="flex h-full items-center">
          <li
            v-for="item in nav"
            :key="item.name"
            class="group relative h-full"
          >
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              :external="external(item.to)"
              class="flex h-full items-center px-3 text-sm font-medium transition-[color] duration-[160ms] ease-[ease] hover:text-brand xl:px-5"
              >{{ item.name }}</NuxtLink
            >
            <a
              v-else
              href="#"
              role="button"
              aria-haspopup="menu"
              @click.prevent
              class="flex h-full items-center px-3 text-sm font-medium transition-[color] duration-[160ms] ease-[ease] hover:text-brand xl:px-5"
            >
              {{ item.name }} ▾
            </a>
            <div
              v-if="item.children"
              class="invisible absolute right-0 top-full min-w-40 translate-y-1 rounded-md py-1 opacity-0 shadow-lg backdrop-blur-lg transition-[opacity,translate,visibility] duration-[160ms] ease-[ease] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              :class="[theme.background, theme.text]"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.name"
                :to="child.to"
                :external="external(child.to)"
                class="block whitespace-nowrap px-5 py-3 text-sm transition-[color] duration-[160ms] ease-[ease] hover:text-brand"
                >{{ child.name }}</NuxtLink
              >
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
          <DialogContent
            class="fixed right-0 top-0 z-[2200] h-dvh w-72 overflow-y-auto bg-base-white p-6 text-ink shadow-2xl"
          >
            <div class="mb-5 flex justify-between">
              <span class="font-ysumc text-xl">导航</span>
              <DialogClose class="p-1 text-2xl" aria-label="关闭导航"
                >×</DialogClose
              >
            </div>
            <ul>
              <li v-for="item in nav" :key="item.name" class="mb-3">
                <DialogClose v-if="item.to" as-child>
                  <NuxtLink
                    :to="item.to"
                    :external="external(item.to)"
                    class="block py-1 font-medium"
                    >{{ item.name }}</NuxtLink
                  >
                </DialogClose>
                <span v-else class="block py-1 font-medium">{{
                  item.name
                }}</span>
                <ul v-if="item.children" class="ml-4 text-sm text-gray-dark">
                  <li v-for="child in item.children" :key="child.name">
                    <DialogClose as-child>
                      <NuxtLink
                        :to="child.to"
                        :external="external(child.to)"
                        class="block py-1.5"
                        >{{ child.name }}</NuxtLink
                      >
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
