<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>()

const card = [
  {
    name: '外部成员',
    icon: 'mobi-mbri-globe',
    text: '与朋友游玩，与大佬交流，享受燕山大学Minecraft学生同好者协会<br>为燕山大学《我的世界》玩家提供的服务器和丰富多彩的活动！',
    to: '/join/external-member/',
  },
  {
    name: '正式社员',
    icon: 'mobi-mbri-users',
    text: '在享受游戏的同时获取全新的知识，提升自己的综合能力。<br>相信我们，你们将会在大学中度过最充实美好的社团时光！',
    to: '/join/full-member/',
  },
]
</script>

<template>
  <div class="not-prose w-full py-14">
    <div class="mx-auto max-w-7xl text-center">
      <h2 class="font-ysumc text-3xl md:text-4xl">加入我们！</h2>
      <p class="mt-3 text-base/relaxed md:text-xl">我们不收取任何费用！</p>
      <div class="mx-6 mt-8 md:flex md:gap-8 xl:mx-0">
        <div
          v-for="item in card"
          :key="item.name"
          class="my-4 p-12 text-center shadow-lg md:my-0 md:w-1/2"
          :class="props.dark ? 'bg-gray' : 'bg-white'"
        >
          <Icon
            :name="item.icon"
            class="size-18"
            :class="props.dark ? 'text-white' : 'text-gray4'"
          />
          <h3 class="mt-10 font-ysumc text-3xl md:text-4xl">{{ item.name }}</h3>
          <p class="my-4 text-base/relaxed md:text-lg" v-html="item.text" />
          <SiteButton
            text="了解更多"
            :to="item.to"
            :color="props.dark ? 'white' : 'blue'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
