<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from "vue";
import AutoLink from "./AutoLink.vue";
import logo from '@/image/logo/ysumc-color.svg';
import logoWhite from '@/image/logo/ysumc-white.svg'

const top = ref(true)
const mobileNavOpen = ref(false)
// const router = useRouter()
// router.beforeEach((to, from) =>
//     mobileNavOpen.value ? (mobileNavOpen.value = false) : true,
// )

const props = withDefaults(
    defineProps<{
      color?: 'black' | 'white'
      isTransparent?: boolean
    }>(),
    {
      color: 'white',
      isTransparent: true,
    },
)

const resColor = computed(() => {
  return props.isTransparent ? 0 : props.color === 'white' ? 1 : 2
})

const NavBarList = [
  {
    name: '项目',
    isMenu: false,
    link: '/project/',
  },
  {
    name: '地图',
    isMenu: false,
    link: '/map.html',
  },
  {
    name: '资料',
    isMenu: true,
    contents: [
      {
        name: '皮肤站设置',
        link: 'https://blog.ysumc.club/index.php/%E6%95%99%E7%A8%8B/54.html',
      },
      {name: '我社报道', link: '/document'},
      {name: 'MC社网盘', link: 'http://cloud.ysumc.club'},
    ],
  },
  {
    name: '画廊',
    isMenu: false,
    link: '/gallery',
  },
  {
    name: '皮肤站',
    isMenu: false,
    link: 'https://skin.ysumc.club',
  },
  {
    name: '联系我们',
    isMenu: true,
    contents: [
      {name: 'QQ群', link: 'https://jq.qq.com/?_wv=1027&k=ob12TKWY'},
      {name: 'B站', link: 'https://www.bilibili.com/'},
      {name: '爱发电', link: 'https://afdian.net/a/yusmc/'},
    ],
  },
]

onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
  document.addEventListener('keydown', keyHandler)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
  document.removeEventListener('keydown', keyHandler)
})

function scrollHandler() {
  window.pageYOffset > 10 ? (top.value = false) : (top.value = true)
}

function keyHandler(e: any) {
  if (e.keyCode === 27) {
    mobileNavOpen.value = false
  }
}
</script>

<template>
  <header
      class="fixed w-full shadow-md top-0 transition-all duration-300 ease-in-out backdrop-blur-lg"
      :class="['', 'bg-white/80', 'bg-black-dark/80'][resColor]"
      style="z-index: 2000;"
  >
    <div class="mx-3 md:mx-10 flex items-center justify-between h-14">
      <!-- Site branding -->
      <AutoLink
          to="/"
          class="shrink-0 mr-4 flex items-center"
          aria-label="YSUMC"
      >
        <img
            :src="
            resColor === 1 ? logo : logoWhite
          "
            class="transition-all duration-300 ease-in-out h-8"
            fit="contain"
            alt="YSUMC Logo"/>
        <!-- <span
            class="text-base pl-3 font-ysumc hidden md:inline transition-all duration-300 ease-in-out"
            :class="['text-white', 'text-black', 'text-white'][resColor]"
        >燕山大学Minecraft学生同好者协会</span> -->
      </AutoLink>

      <!-- Desktop navigation -->
      <nav class="hidden md:flex md:grow">
        <!-- Desktop menu links -->
        <ul class="flex grow justify-end flex-wrap items-center">
          <li v-for="i in NavBarList" :key="i.name" class="nav-button">
            <AutoLink
                :to="i.isMenu ? '' : i.link"
                class="text-sm font-medium hover:text-gray-300 px-3 xl:px-5 py-2 flex items-center transition ease-in-out"
                :class="['text-white', 'text-black', 'text-white'][resColor]"
            >
              {{ i.name }}{{ i.isMenu ? ' ▾' : '' }}
            </AutoLink>
            <div
                v-if="i.isMenu"
                class="absolute bg-gray4/90 backdrop-blur-md rounded-md transition-all ease-in-out hidden dropdown-menu"
            >
              <AutoLink
                  v-for="j in i.contents"
                  :key="j.name"
                  :to="j.link"
                  class="text-lg font-base text-white hover:text-gray-300 px-6 py-3 flex items-center transition ease-in-out"
                  :class="
                  i.contents?.indexOf(j) === i.contents?.length - 1
                    ? ''
                    : 'border-b border-slate-300'
                "
              >
                {{ j.name }}
              </AutoLink>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Mobile menu -->
      <div class="flex md:hidden">
        <button @click="mobileNavOpen = !mobileNavOpen">
          <span class="sr-only">Menu</span>
          <svg
              class="w-6 h-6"
              :class="resColor === 1 ? 'fill-black' : 'fill-white'"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="4" width="24" height="2"/>
            <rect y="11" width="24" height="2"/>
            <rect y="18" width="24" height="2"/>
          </svg>
        </button>

        <!-- Mobile navigation -->
        <div
            class="bg-black/50 fixed left-0 top-0 w-screen h-dvh z-10 transition-opacity duration-200 ease-in-out"
            v-show="mobileNavOpen"
            @click="mobileNavOpen = false"
        ></div>

        <Transition
            tag="nav"
            id="mobile-nav"
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0 translate-x-2"
            enter-to-class="opacity-100 -translate-x-0"
            leave-active-class="transition ease-out duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <div
              v-show="mobileNavOpen"
              class="fixed right-0 top-0 h-dvh z-20 w-1/2 overflow-scroll bg-base-white shadow-xl"
          >
            <ul class="px-5 py-2">
              <!-- <li>
                  <h2 class="h2 flex text-gray-600 py-2">和瑛社</h2>
                </li> -->
              <li v-for="i in NavBarList" :key="i.name">
                <AutoLink
                    @click="mobileNavOpen = false"
                    :to="i.link"
                    class="flex text-black hover:text-gray-900 py-2 hover:text-black-dark"
                >
                  {{ i.name }}
                </AutoLink>
                <ul v-if="i.isMenu" class="ml-3">
                  <li v-for="j in i.contents">
                    <AutoLink
                        @click="mobileNavOpen = false"
                        :to="j.link"
                        class="flex text-gray hover:text-gray-900 py-2 hover:text-gray-dark text-sm"
                    >{{ j.name }}
                    </AutoLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav-button:hover > .dropdown-menu {
  display: block;
}
</style>
