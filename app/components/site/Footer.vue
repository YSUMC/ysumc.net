<script setup lang="ts">
import footerBkg from '~/assets/image/theme/footer-bkg.png'

const appConfig = useAppConfig()
const { social, groups, license, icp } = appConfig.footer
</script>

<template>
  <footer
    class="bg-cover bg-center bg-no-repeat py-4 text-white"
    :style="{ backgroundImage: `url(${footerBkg})` }"
  >
    <div class="mx-auto max-w-7xl px-6 md:px-4">
      <div class="grid grid-cols-12 pb-4 pt-8">
        <div class="col-span-6 flex flex-col md:col-span-3 md:justify-between">
          <NuxtLink to="/" class="inline-block" aria-label="燕山大学MC社首页">
            <NuxtImg
              src="/image/theme/logo/ysumc-text.svg"
              class="w-96 max-w-full"
              alt="燕山大学MC社"
            />
          </NuxtLink>
          <div class="mt-4 flex md:mt-0 md:gap-2">
            <a
              v-for="item in social"
              :key="item.name"
              :href="item.to"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center"
            >
              <Icon :name="item.icon" class="size-5" />
            </a>
          </div>
        </div>
        <div class="col-span-6 md:col-span-3" />
        <div
          v-for="group in groups"
          :key="group.title"
          class="col-span-12 my-3 md:col-span-2 md:my-0"
        >
          <h6 class="mb-3 font-bold">{{ group.title }}</h6>
          <ul class="text-sm">
            <li v-for="item in group.items" :key="item.name" class="mb-2">
              <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-t border-gray py-4 text-gray md:flex md:items-center md:justify-between"
      >
        <div class="mr-4 text-[0.7rem] md:text-sm">
          {{ new Date().getFullYear() }} © {{ license }}
        </div>
        <a
          :href="icp.to"
          target="_blank"
          rel="noopener"
          class="mr-4 text-[0.7rem] md:text-sm"
          >{{ icp.text }}</a
        >
      </div>
    </div>
  </footer>
</template>
