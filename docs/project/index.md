---
layout: BlankPage
---

<script setup>
import Hero from '@/component/Hero.vue'
import CountDown from '@/component/CountDown.vue'
import CenterText from '@/component/public/CenterText.vue'
import ProjectRow from '@/component/project/ProjectRow.vue'
import JoinUs from '@/component/dedicated/JoinUs.vue'

import heroImage from '~/image/project/Hero.png'
import activityImg1 from '~/image/project/Activity-1.png'
import activityImg2 from '~/image/project/Activity-2.png'
import activityImg3 from '~/image/project/Activity-3.png'
import workImg1 from '~/image/project/Work-1.png'
import workImg2 from '~/image/project/Work-2.png'
import wipImg from '~/image/project/WIP.png'
import workflowImg1 from '~/image/project/Workflow-1.png'
import workflowImg2 from '~/image/project/Workflow-2.png'
import workflowImg3 from '~/image/project/Workflow-3.png'
import mcserverImg1 from '~/image/project/MCServer-1.png'
import mcserverImg2 from '~/image/project/MCServer-2.png'

const project = [
  {
    title: '工程项目',
    desc: '来看看我们的本事吧。',
    content: [
      {
        title: '《像素燕大：燕山大学复原计划》',
        subtitle: '三千一百万方块打造的虚拟校园。',
        time: '2022.4-2022.12',
        state: 0,
        image: workImg1,
        link: '/project/work/pixel-ysu.html',
        dark: true,
      },
      {
        title: '一个大工程',
        subtitle: '敬请期待。',
        time: '预计于2024.1完成',
        state: 1,
        image: wipImg,
        link: '/project/work-in-progress.html',
        dark: true,
      },
      {
        title: '《云游燕大》学校导览系统',
        subtitle: '游戏中的燕大魅力丝毫不减。',
        time: '',
        state: 1,
        image: workImg2,
        link: '/project/work/online-ysu.html',
      },
      {
        title: '《定格之中》虚拟校史馆',
        subtitle: '走进照片，回首百年。',
        time: '',
        state: 2,
        image: wipImg,
        link: '',
      },
    ],
  },
  {
    title: '活动',
    desc: '用欢笑打破距离的隔阂。',
    content: [
      {
        title: '时空悖论 ：劫后启示录',
        subtitle: '在逆境中重燃希望。',
        time: '2023.1.6  已结束',
        state: 0,
        image: activityImg1,
        link: '/project/activity/rpg-skbl-jhqsl.html',
      },
      {
        title: '玩家联谊会',
        subtitle: '每逢佳节便会到来的欢庆。',
        time: '节日期间举行',
        state: 0,
        image: activityImg2,
        link: '/project/activity/festival-party.html',
      },
      {
        title: '100分钟建筑赛',
        subtitle: '能力与智谋的较量。',
        time: '不定期举行',
        state: 0,
        image: activityImg3,
        link: '/project/activity/100min-construct.html',
      },
    ],
  },
  {
    title: '工作流',
    desc: '专业能力永远很重要。',
    content: [
      {
        title: '3D打印工作流',
        subtitle: '虚拟成真的纪念。',
        time: '',
        state: 0,
        image: workflowImg1,
        link: '/project/workflow/3d-print.html',
      },
      {
        title: '平面设计与视效工作流',
        subtitle: '让一切真实与生动。',
        time: '',
        state: 0,
        image: workflowImg2,
        link: '/project/workflow/visual-effect.html',
      },
      {
        title: '正式社员培训工作流',
        subtitle: '薪火相传的意义。',
        time: '',
        state: 0,
        image: workflowImg3,
        link: '/project/workflow/member-training.html',
      },
    ],
  },
  {
    title: '多人游戏与工作平台',
    desc: '你并不孤独。',
    content: [
      {
        title: '燕山大学服务器',
        subtitle: '为燕山大学Minecraft爱好者搭建起的平台。',
        time: '',
        state: 0,
        image: mcserverImg1,
        link: '/project/mcserver/ysu-server.html',
      },
      {
        title: '《原初燕大服》',
        subtitle: '这个不堪一击的服务器是一切的原点。',
        time: '2022.2  已关闭',
        state: 0,
        image: mcserverImg2,
        link: '/project/mcserver/old-server.html',
      },
    ],
  },
]
</script>

<Hero :image="heroImage" class="mb-14" dark="0.6">
  <div class="absolute top-1/3 w-full">
    <h1 class="text-4xl md:text-7xl font-ysumc text-white text-center">
      距离下一次危机还有
    </h1>
    <CountDown :time="new Date('2024/12/10')">
      这里是项目页，下滑以了解更多项目。
    </CountDown>
  </div>
</Hero>

<div class="container">

<div v-for="i in project" :key="i.title">
  <CenterText :title="i.title">{{ i.desc }}</CenterText>
  <div class="max-w-7xl mx-6 xl:mx-auto">
    <ProjectRow
        v-for="j in i.content"
        :key="j.title"
        :title="j.title"
        :subtitle="j.subtitle"
        :time="j.time"
        :state="j.state"
        :image="j.image"
        :link="j.link"
        :dark="j.dark || false"
    />
  </div>
</div>

<CountDown
    :time="new Date('2023/9/13')"
    title="有人要过生日了。"
    :image="activityImg2"
>燕山大学Minecraft学生同好者协会成立一周年。</CountDown>

<JoinUs />

</div>
