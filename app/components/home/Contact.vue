<script setup lang="ts">
const props = defineProps<{ dark?: boolean }>()

const links = useAppConfig().site.links

const items = [
  { name: 'qq', to: links.qq, icon: 'socicon-qq' },
  { name: 'bili', to: links.bilibili, icon: 'socicon-niconico' },
  { name: 'skin', to: links.skin, icon: 'mobi-mbri-website-theme' },
]
</script>

<template>
  <div class="not-prose w-full pb-14">
    <div
      class="mx-auto flex max-w-7xl flex-col px-6 md:flex-row md:items-center"
    >
      <p
        class="mr-auto text-center text-base/relaxed leading-normal md:text-left md:text-xl"
      >
        您可以前往QQ群与我们交流，进入我们的bilibili页面了解更多……<br />
        或在皮肤站注册一个账号，直接开玩！
      </p>
      <div class="ml-auto mt-4 flex justify-center gap-4 md:mt-0">
        <a
          v-for="item in items"
          :key="item.name"
          :href="item.to"
          target="_blank"
          rel="noopener"
          class="flex h-14 w-14 items-center justify-center rounded-full border-2"
          :class="props.dark ? 'border-white' : 'border-gray4'"
        >
          <Icon
            :name="item.icon"
            class="size-8"
            :class="props.dark ? 'text-white' : 'text-gray4'"
          />
        </a>
      </div>
    </div>
  </div>
</template>
