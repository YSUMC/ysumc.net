<script setup lang="ts">
const links = useAppConfig().site.links
const documents = [
  { title: '教程', text: '我们尽量完成了90%与MC有关的教程。', to: 'https://blog.ysumc.net/index.php/%E6%95%99%E7%A8%8B/54.html' },
  { title: '皮肤站设置', text: '进入与燕山大学MC相关的服务器必须使用燕山大学MC社皮肤站账号进行登录，皮肤站与燕大统一身份认证接入，并对审核通过的外校人员以邀请码的方式注册。', to: 'https://blog.ysumc.net/index.php/%E6%95%99%E7%A8%8B/54.html' },
  { title: 'JAVA版MC基础知识', text: '这里是与java版我的世界相关的绝大部分知识，包括且不限于游戏本体介绍；如何游玩MC；WE（创世神插件），服务器，数据包等技术学习资料。', to: 'https://wiki.mualliance.ltd/%E7%87%95%E5%B1%B1%E5%A4%A7%E5%AD%A6Minecraft%E5%90%8C%E5%A5%BD%E8%80%85%E5%8D%8F%E4%BC%9A' },
  { title: '我社报道', text: '这里收录着外界网站发布与本社相关的资讯与本社的对外文章。', to: '/document/reports/' },
  { title: '视觉识别标准', text: '视觉识别系统可以大规模提升社团对外的形象和专业性，也可以在一定程度上规范社员的行为，让他们在小事上一丝不苟。', to: '/document/visual-identity/' },
  { title: '档案管理办法', text: '燕山大学Minecraft学生同好者协会的每一个活动或地图成果都需要归档管理，本文介绍本社档案管理办法以供各位参考。', to: '/document/archive-management/' },
  { title: 'MUA相关', text: '中国Minecraft高校联盟（Minecraft University Alliance，简称MUA）是一个旨在联合全国高校MC爱好者，共同推动高校MC生态发展的公益性组织。', to: links.mua },
  { title: 'MC社网盘', text: '社团对外公开的文件分发渠道。', to: links.cloud },
]
const media = [
  { title: 'b站视频汇总', text: '发布在b站所有与本社相关的视频都在本帖记录。', to: links.bilibili },
  { title: 'b站：像素燕大宣传视频', text: '《像素燕大：燕山大学复原计划》宣传视频。', to: 'https://www.bilibili.com/video/BV1tD4y1p7uP/' },
]
useSeoMeta({ title: '资料 - 燕山大学MC社', description: 'Minecraft操作教程和燕山大学MC社文书资料。', ogImage: '/image/document/Hero.png' })
</script>

<template>
  <div>
    <Hero image="/image/document/Hero.png" dark="0.6" title="资料" text="这里包含着你可能需要的Minecraft操作教程和有关本社团的文书资料。" />
    <div class="page-container my-14 grid gap-8 md:grid-cols-2">
      <NuxtLink v-for="item in documents" :key="item.title" :to="item.to" class="bg-white p-10 text-center shadow-lg">
        <div class="mx-auto grid size-16 place-items-center rounded-full border-2 border-gray text-2xl">◆</div>
        <h2 class="mt-7 font-ysumc text-2xl">{{ item.title }}</h2>
        <p class="mt-4 text-lg/relaxed">{{ item.text }}</p>
      </NuxtLink>
    </div>
    <CenterText title="资讯发布" />
    <div class="page-container mb-14 grid gap-8 md:grid-cols-2">
      <NuxtLink v-for="item in media" :key="item.title" :to="item.to" class="bg-white p-10 text-center shadow-lg">
        <h2 class="font-ysumc text-2xl">{{ item.title }}</h2>
        <p class="mt-4 text-lg/relaxed">{{ item.text }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
