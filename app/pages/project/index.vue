<script setup lang="ts">
const { data: projects } = await usePrerenderData(
  'projects:index',
  async () => {
    const event = useRequestEvent()!
    const { getProjects } = await import('~~/server/utils/content-pages')
    return getProjects(event)
  },
)
const groups = [
  { key: 'work', title: '工程项目', description: '来看看我们的本事吧。' },
  { key: 'activity', title: '活动', description: '用欢笑打破距离的隔阂。' },
  { key: 'workflow', title: '工作流', description: '专业能力永远很重要。' },
  { key: 'mcserver', title: '多人游戏与工作平台', description: '你并不孤独。' },
]
const now = new Date()
const birthday = new Date(
  now.getFullYear() + (now >= new Date(now.getFullYear(), 8, 13) ? 1 : 0),
  8,
  13,
)
useSeoMeta({
  title: '项目 - 燕山大学MC社',
  description: '燕山大学MC社的工程项目、活动、工作流与服务器。',
  ogImage: '/image/project/Hero.png',
})
</script>

<template>
  <div>
    <Hero image="/image/project/Hero.png" dark="0.6" class="mb-14">
      <div class="absolute top-1/3 w-full text-center text-white">
        <h1 class="font-ysumc text-4xl md:text-7xl">距离社团生日还有</h1>
        <HomeCountdown :time="birthday"
          >这里是项目页，下滑以了解更多项目。</HomeCountdown
        >
      </div>
    </Hero>
    <template v-for="group in groups" :key="group.key">
      <CenterText :title="group.title">{{ group.description }}</CenterText>
      <div class="page-container">
        <CardsProjectRow
          v-for="project in projects?.filter(
            (item) => item.category === group.key,
          )"
          :key="project.path"
          :project="project"
        />
      </div>
    </template>
    <HomeCountdown
      :time="birthday"
      title="有人要过生日了。"
      image="/image/project/Activity-2.png"
      >燕山大学Minecraft学生同好者协会成立于2022年9月13日。每年这一天，我们都在一起。</HomeCountdown
    >
    <HomeJoinUs />
  </div>
</template>
