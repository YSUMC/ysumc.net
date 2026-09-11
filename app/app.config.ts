type NavItem = {
  name: string
  to?: string
  children?: { name: string; to: string }[]
}

type FooterGroup = {
  title: string
  items: { name: string; to: string }[]
}

const links = {
  qq: 'https://jq.qq.com/?_wv=1027&k=5BZ5Z8D',
  bilibili: 'https://space.bilibili.com/353195087',
  afdian: 'https://afdian.com/a/yusmc/',
  skin: 'https://skin.ysumc.net/',
  cloud: 'http://cloud.ysumc.net/',
  university: 'https://www.ysu.edu.cn/',
  mua: 'https://www.mualliance.ltd/',
  blog: 'https://blog.ysumc.net/index.php/%E6%95%99%E7%A8%8B/54.html',
}

const nav: NavItem[] = [
  { name: '项目', to: '/project/' },
  { name: '地图', to: '/map/' },
  {
    name: '资料',
    children: [
      { name: '皮肤站设置', to: links.blog },
      { name: '我社报道', to: '/document/reports/' },
      { name: '视觉形象', to: '/document/visual-identity/' },
      { name: '加入我们', to: '/join/external-member/' },
      { name: 'MC社网盘', to: links.cloud },
    ],
  },
  { name: '画廊', to: '/gallery/' },
  { name: '皮肤站', to: links.skin },
  {
    name: '联系我们',
    children: [
      { name: 'QQ群', to: links.qq },
      { name: 'B站', to: links.bilibili },
      { name: '爱发电', to: links.afdian },
    ],
  },
]

const footerGroups: FooterGroup[] = [
  {
    title: '资料',
    items: [
      { name: '皮肤站教程', to: links.blog },
      { name: '我社报道', to: '/document/reports/' },
      { name: '视觉形象', to: '/document/visual-identity/' },
      { name: '档案管理办法', to: '/document/archive-management/' },
    ],
  },
  {
    title: '外联',
    items: [
      { name: 'MUA高校联盟', to: links.mua },
      { name: '上海交通大学', to: 'https://mc.sjtu.cn/' },
      { name: '中南大学', to: 'https://csu-mc.magicalsheep.cn/' },
      { name: '西安建筑科技大学', to: 'https://www.xauatcraft.com/' },
      { name: '塔里木大学', to: 'https://www.tarucraft.club' },
      { name: '上海应用技术大学', to: 'https://www.sitmc.club' },
    ],
  },
  {
    title: '关于我们',
    items: [
      { name: '燕山大学官方网站', to: links.university },
      { name: '燕山大学MC社皮肤站', to: links.skin },
    ],
  },
]

export default defineAppConfig({
  site: {
    name: '燕山大学MC社',
    fullName: '燕山大学Minecraft学生同好者协会',
    description: '燕山大学Minecraft学生同好者协会官方网站',
    url: 'https://ysumc.net',
    links,
  },
  nav,
  footer: {
    social: [
      { name: 'skin', to: links.skin, icon: 'mobi-mbri-website-theme' },
      { name: 'bili', to: links.bilibili, icon: 'socicon-niconico' },
      { name: 'qq', to: links.qq, icon: 'socicon-qq' },
      { name: 'afd', to: links.afdian, icon: 'mobi-mbri-cash' },
    ],
    groups: footerGroups,
    license:
      '本社所有文案，图片均由燕山大学Minecraft学生同好者协会制作，未经允许，切勿盗取挪用，如若发现，将采取法律手段进行维权。',
    icp: { text: '黔ICP备2022009898号-2', to: 'https://beian.miit.gov.cn' },
  },
})
