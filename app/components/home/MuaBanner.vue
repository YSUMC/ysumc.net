<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>()

const links = useAppConfig().site.links

const items = [
  { name: 'website', to: links.mua, icon: 'mobi-mbri-globe-2' },
  {
    name: 'bili',
    to: 'https://space.bilibili.com/2011929607',
    icon: 'socicon-niconico',
  },
]
</script>

<template>
  <div
    class="not-prose w-full py-14"
    :class="props.dark ? 'bg-gray4' : 'bg-white'"
  >
    <div
      class="mx-auto flex max-w-7xl flex-col px-6 md:flex-row md:items-center"
    >
      <div class="mr-auto max-w-2xl">
        <div class="mb-4 flex flex-col items-center md:flex-row">
          <NuxtImg
            :src="
              props.dark
                ? '/image/theme/logo/mua_slogan_white.svg'
                : '/image/theme/logo/mua_slogan.svg'
            "
            class="h-12"
            alt="MUA高校联盟"
          />
          <NuxtImg
            :src="
              props.dark
                ? '/image/theme/logo/mua_white.svg'
                : '/image/theme/logo/mua.svg'
            "
            class="mt-6 h-10 md:ml-auto md:mr-2 md:mt-0"
            alt="MUA"
          />
        </div>
        <p class="mt-6 text-base/relaxed leading-normal md:mt-0 md:text-xl">
          我们并不孤独：不仅是我们，国内其他的著名高校也拥有着自己Minecraft同好群体甚至是Minecraft游戏社团。我们彼此联谊，精诚合作，联合高校Minecraft同好群体的力量，共同面对未来的挑战。
        </p>
      </div>
      <div class="mr-auto mt-6 flex gap-4 md:ml-auto md:mr-0 md:mt-0">
        <a
          v-for="item in items"
          :key="item.name"
          :href="item.to"
          target="_blank"
          rel="noopener"
          class="flex h-14 w-14 items-center justify-center rounded-full border-2"
          :class="props.dark ? 'border-white' : 'border-pink'"
        >
          <Icon
            :name="item.icon"
            class="size-8"
            :class="props.dark ? 'text-white' : 'text-pink'"
          />
        </a>
      </div>
    </div>
  </div>
</template>
