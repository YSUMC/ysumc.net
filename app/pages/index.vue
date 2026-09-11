<script setup lang="ts">
const now = new Date()
const birthday = new Date(now.getFullYear() + (now >= new Date(now.getFullYear(), 8, 13) ? 1 : 0), 8, 13)
const projects = [
  { title: '《像素燕大：燕山大学复原计划》', image: '/image/index/Proj-1.png', to: '/project/work/pixel-ysu/', text: '《像素燕大》:该项目于2022年2月24日着手计划建设，于2022年12月4日正式竣工，历时303天。由燕山大学Minecraft学生同好者协会打造，此项目以游戏《我的世界》为载体，通过CAD图纸、GIS定高、资料查询及图像拍摄等方法，进行燕山大学东、西校区的再现还原，将现实中的燕大转化为电子模型，打造最生动形象的燕山大学。' },
  { title: '工作流', image: '/image/index/Proj-2.png', to: '/project/workflow/visual-effect/', text: 'Minecraft具有半开源的性质，其底层工作很考验社员们的专业能力。燕山大学Minecraft学生同好者协会正在尝试建立涉及到专业软件的工作流，以提升社员们的专业素养。' },
  { title: '《云游燕大》校园导览系统', image: '/image/index/Proj-3.jpg', to: '/project/work/online-ysu/', text: '云游燕大:基于游戏《我的世界》的特殊性，相较于其他艺术形式，游览者可在其中切身实际进行游览，沉浸式感受世纪楼、燕宏桥、图书馆等燕大地标性建筑的魅力。通过简单的电脑、手机输入，便可实现在虚拟中畅游燕大。云游燕大同样支持虚拟现实设备进入，若游览者拥有此类设备，便可完全沉浸式体验在燕山大学漫步的体验。' },
  { title: '学生联谊会', image: '/image/index/Proj-4.png', to: '/project/activity/festival-party/', text: '“一起玩”是高校学生社交中最重要的一环。《玩家联谊会》希望能在佳节中带来欢庆，提升燕山大学Minecraft同好群体的认同感和凝聚力。' },
]
useSeoMeta({ title: '燕山大学MC社', description: '燕山大学Minecraft学生同好者协会官方网站', ogTitle: '燕山大学MC社', ogDescription: '方块虽小，亦是精彩之源。', ogImage: '/image/index/Hero.png' })
useHead({ link: [{ rel: 'canonical', href: 'https://ysumc.net/' }] })
</script>
<template>
  <div>
    <Hero image="/image/index/Hero.png">
      <div class="absolute bottom-36 left-4 md:left-14 md:top-[30%]">
        <NuxtImg src="/image/theme/logo/ysumc-text.svg" class="h-20 md:h-24" alt="燕山大学MC社" />
        <div class="ml-3 mt-6 font-ysumc text-[3.2rem] font-normal leading-tight text-white md:mt-16 md:text-[4.8rem]">方块虽小，<br>亦是精彩之源。</div>
      </div>
    </Hero>
    <section class="px-6 py-14 text-center"><h2 class="font-ysumc text-3xl md:text-4xl">我社简介</h2><p class="mt-8 text-base/relaxed md:text-lg/relaxed">燕山大学Minecraft学生同好者协会（也可以叫燕山大学MC社）成立于2022年9月13日，<br>是以游戏《我的世界》（Minecraft）为核心开展同好活动和专业项目的学生社团，<br><br><strong>值得骄傲的是：我们是燕山大学第一个被学校官方承认的游戏社团。</strong><br>我们致力于为每一位来自燕山大学的Minecraft爱好者提供一个友好的交流平台，<br>并向外界展示Minecraft的趣味和价值。</p></section>
    <div class="page-container"><NuxtImg src="/image/index/BigPicture.png" sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw" class="w-full" alt="燕山大学复原计划东校区"/><ImageText align="left">燕山大学复原计划　东校区　2022.04</ImageText></div>
    <TwoColumn><template #left><h2 class="font-ysumc text-3xl">Minecraft是什么？</h2><p class="mt-5 text-lg/relaxed">Minecraft中文译名《我的世界》，是瑞典游戏工作室Mojang Studio于2009年推出的沙盒类电子游戏。游戏中以“方块”为单位元的建设模式和简便直观的操作手法让这款游戏的受众极为广泛，玩家可以通过游玩培养审美能力和逻辑思维。Minecraft本身也具有半开源性，这也会让玩家体验到诸如编程、网络工程等计算机知识。</p></template><template #right><NuxtImg src="/image/index/BigPicture.png" sizes="sm:100vw md:50vw" class="w-full" alt="流浪地球2太空电梯轿厢复原"/><ImageText align="right">《流浪地球2》太空电梯 轿厢 复原（1:1）<br>秋田同学 2023.3</ImageText></template></TwoColumn>
    <section class="px-6 py-14 text-center"><h2 class="font-ysumc text-3xl md:text-4xl">趣味与价值</h2><p class="mt-8 text-base/relaxed md:text-lg/relaxed">燕山大学Minecraft学生同好者协会虽然是游戏社团，但我们也不仅仅止于游戏的方方面面，<br>而是试着走出去，让Minecraft发挥更大的魅力。<br><br><strong>燕山大学Minecraft学生同好者协会的成员们精诚合作，共同创造出趣味与价值并存的成果。</strong><br><br>《像素燕大：燕山大学复原计划》用三千一百万方块详细生动地展现出了燕山大学东西校区的全貌。<br>每到佳节便会举办的玩家联谊会让欢笑跨越了距离的隔阂。<br>社团内部的三大工作流在为游戏增色的同时，也让社团具备了强大的专业素质。<br><br>……<br><br><strong>游戏带来趣味，项目和专业工作流带来价值，这也是燕山大学Minecraft学生同好者协会一直所坚持的事情。</strong></p></section>
    <div class="page-container mb-14 grid gap-8 md:grid-cols-2"><CardsHomeProject v-for="item in projects" :key="item.title" :title="item.title" :image="item.image" :to="item.to">{{ item.text }}</CardsHomeProject></div>
    <HomeJoinUs/><HomeContact/><HomeMuaBanner/>
    <HomeCountdown :time="birthday" title="距离社团生日还剩下：" image="/image/index/Countdown.png">2022年9月13日，燕山大学Minecraft学生同好者协会成立。<br>每年这一天，我们都会带着新的惊喜回来。</HomeCountdown>
  </div>
</template>
