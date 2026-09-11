<script setup lang="ts">
// 一周年特别页，移植自 ysumc.club（旧 Nuxt 3 站）的 pages/index.vue。
// 页面是深色底，页头用黑底态；离开本页时把颜色还给白底态。
const setNavBar =
  inject<(transparent?: boolean, color?: 'white' | 'black') => void>(
    'setNavBar',
  )
setNavBar?.(undefined, 'black')
onBeforeRouteLeave(() => setNavBar?.(undefined, 'white'))

type AnniversaryProject = {
  title: string
  text: string
  image: string
  link: string
  video?: string[]
  additionalImage?: string
}

const projectList: AnniversaryProject[] = [
  {
    title: '三千一百万方块。',
    text: '从一场比赛开始，再到一个社团的建立。<br>《像素燕大：燕山大学复原计划》见证着社团初建的时光。<br><br>2022.4~2022.12',
    image: '/image/article/PixelYSU.png',
    link: '',
  },
  // 原作在上游按社团要求暂时去掉了太空电梯部分，这里保持同样的状态
  // {
  //   title: '直冲云霄。',
  //   text: '起初没有人在意这场计划，直到这个计划显现出恐怖的规模。<br>固体方块数达12亿，从整体到每个细节均无可挑剔，前无古人，后难见来者。<br><br>预计2024.8完工',
  //   image: '/image/article/SEV.png',
  //   link: '',
  // },
  {
    title: '彳亍定格间。',
    text: '百年燕大，四十年上下求索，六十年筚路蓝缕。<br>《定格之中》虚拟校史馆让你走入底片，感受那个年代的燕大精神。<br><br>2023.8',
    image: '/image/article/DGZZ.png',
    link: '',
  },
  {
    title: '29所学校，494名玩家。',
    text: '我们发起倡议，与中国Minecraft高校联盟合作，为高考学子加油助威。<br>用我们所制作的高校复原，共同展现高校联合的力量。<br><br>2023.6.25',
    image: '/image/anniversary/BackupImg.png',
    video: ['/media/myuniversity/vp9.webm', '/media/myuniversity/265.mp4'],
    additionalImage: '/image/theme/logo/mua_white.svg',
    link: '',
  },
  {
    title: '到乡野去。',
    text: 'Minecraft的半开源性质让其不止于游戏的欢乐中，而是能做到寓教于乐。<br>我们希望走进乡村，利用Minecraft为每一名孩子科普科学的无穷奇妙。<br><br>《Minecraft乡村科普计划》<br>计划中',
    image: '/image/article/DXYQ.jpg',
    link: '',
  },
]

const workflow: AnniversaryProject[] = [
  {
    title: '保持专业。',
    text: '单论游戏的话Minecraft只能说是游戏。<br>但是要是稍微延展一点，可有的是专业软件和工作流可以与其挂钩。',
    image: '/image/article/SXGZL.png',
    link: '',
  },
  {
    title: '一起玩，一起学。',
    text: '虽然这不是强制的工作，<br>但是如果能从这里学到什么东西，是一件很好的事情。',
    image: '/image/article/Work.jpg',
    link: '',
  },
]

useSeoMeta({
  title: '一周年特别页 - 燕山大学MC社',
  description: '燕山大学Minecraft学生同好者协会建社一周年特别页。',
  ogImage: '/image/anniversary/Hero.png',
})
</script>

<template>
  <div class="bg-ink text-white">
    <Hero image="/image/anniversary/Hero.png">
      <div class="absolute bottom-36 left-4 md:left-8 md:top-[23%]">
        <NuxtImg
          src="/image/theme/logo/ysumc-text.svg"
          class="h-20 md:h-32"
          alt="燕山大学MC社"
        />
        <!-- <p class="font-ysumc text-3xl">一周年纪念</p> -->
        <div
          class="ml-3 mt-6 font-ysumc text-[3.2rem] font-normal leading-tight text-white md:mt-16 md:text-[5.5rem]"
        >
          方块虽小，<br />
          亦是精彩之源。
        </div>
      </div>
    </Hero>
    <CenterText title="“9月13日”" class="my-20">
      <p class="text-base/relaxed md:text-lg">
        时光飞逝，白衣苍狗，燕山大学Minecraft学生同好者协会终于迎来了建社的第一个生日。<br />
        从一个人丢失了自己的存档开始，再到一个摇摇欲坠的服务器。又从一个学校的复原开始，到如今的MC社团。<br />
        我们甚至不知该如何形容这一段时光，充实的？繁忙的？好像都可以。
      </p>
    </CenterText>
    <Hero variant="inline" image="/image/article/WhereIFrom.png">
      <FirstAnniMainBlock title="我从哪儿来?" :button="{ link: '' }">
        第一个吃螃蟹的人是很令人佩服的。从零到一的过程永远是艰难的。<br />
        我们的创始人之一用他个人的视角为大家讲述这个社团建立的全程。
      </FirstAnniMainBlock>
    </Hero>
    <CenterText title="" class="my-20">
      <p class="text-base/relaxed md:text-lg">
        …………<br /><br />
        建社前240天，建社后365天，我们仍旧致力于创造趣味与价值并存的成果。<br />
        这个社团从来不缺少惊喜。
      </p>
    </CenterText>
    <Hero
      v-for="item in projectList"
      :key="item.title"
      :image="item.image"
      :video="item.video"
    >
      <FirstAnniMainBlock
        :title="item.title"
        :text="item.text"
        :additional-image="item.additionalImage"
        :button="{ link: item.link }"
      />
    </Hero>
    <CenterText title="“因为，我们在。”" class="my-20">
      <p class="text-base/relaxed md:text-lg">
        不积跬步，无以至千里；不积小流，无以成江海。<br />
        燕山大学Minecraft学生同好者协会的斐然成就，离不开每一名社团成员的才智与努力。<br /><br />
        …………<br /><br />
        截至2023年9月，燕山大学Minecraft学生同好者协会已有430名外部成员与26名正式成员。<br />
        我们彼此信任，互相合作，将一切做到更好。<br /><br />
        这一切，最后都会成为珍贵的回忆。
      </p>
    </CenterText>
    <Hero
      v-for="item in workflow"
      :key="item.title"
      variant="inline"
      :image="item.image"
    >
      <FirstAnniMainBlock
        :title="item.title"
        :text="item.text"
        :button="{ link: item.link }"
      />
    </Hero>
    <CenterText title="“未来……”" class="my-20">
      <p class="text-base/relaxed md:text-lg">
        未来总是不确定的。<br />
        我们毕竟是一个相当年轻的社团，或许仍旧需要更多的历练。<br /><br />
        ……<br /><br />
        但是，我们仍旧脚踏实地，彼此信任，创造出一个又一个充满着趣味与价值的成果。<br />
        不要忘记，这个社团从来不缺少惊喜。<br /><br /><br />
        燕山大学Minecraft学生同好者协会，生日快乐！
      </p>
    </CenterText>
    <FirstAnniBigPicture />
    <HomeJoinUs dark class="mt-24" />
    <HomeContact dark />
    <HomeMuaBanner dark />
  </div>
</template>
