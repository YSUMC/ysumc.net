import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = new URL('../.output/public/', import.meta.url).pathname
const routes = [
  '/',
  '/project/',
  '/document/',
  '/document/reports/',
  '/gallery/',
  '/join/external-member/',
  '/join/full-member/',
  '/map/',
  '/project/work-in-progress/',
  '/project/work/dingge-zhong/',
  '/project/work/online-ysu/',
  '/project/work/pixel-ysu/',
  '/project/activity/100min-construct/',
  '/project/activity/festival-party/',
  '/project/activity/rpg-skbl-jhqsl/',
  '/project/workflow/3d-print/',
  '/project/workflow/member-training/',
  '/project/workflow/visual-effect/',
  '/project/mcserver/ysu-server/',
  '/project/mcserver/old-server/',
  '/project/axiom/',
  '/document/visual-identity/',
  '/document/archive-management/',
  '/where-i-from/',
  '/experience-of-100-mins-building/',
  '/anniversary/',
]

const failures = []
for (const route of routes) {
  const file =
    route === '/' ? join(root, 'index.html') : join(root, route, 'index.html')
  if (!existsSync(file)) failures.push(`缺少路由：${route}`)
}
for (const file of ['404.html', 'sitemap.xml', 'robots.txt']) {
  if (!existsSync(join(root, file))) failures.push(`缺少产物：${file}`)
}

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else files.push(path)
  }
}
walk(root)

for (const file of files.filter((file) =>
  ['.html', '.js', '.json'].includes(extname(file)),
)) {
  const content = readFileSync(file, 'utf8')
  if (/href=["']\/(?!\/)[^"']+\.html(?:[?#"'])/.test(content))
    failures.push(`残留 .html 内链：${relative(root, file)}`)
}

// markdown 里跨行的组件标签会被 CommonMark 当成普通段落转义：页面少掉整块内容，
// 还会把 `<Hero ...>` 字面量显示出来。盯着产物，避免这种静默失效再次出现。
const mdcComponents = [
  'Hero',
  'Introduction',
  'TwoColumn',
  'TextCard',
  'ImageText',
  'CenterText',
  'JoinUs',
  'Icon',
]
for (const file of files.filter((file) => extname(file) === '.html')) {
  const content = readFileSync(file, 'utf8')
  for (const component of mdcComponents) {
    if (content.includes(`&lt;${component}`))
      failures.push(
        `组件标签被当成正文文本：${relative(root, file)}（${component}）`,
      )
  }
}

const clientFiles = files.filter((file) =>
  /\.(?:js|wasm|sqlite|db)$/.test(file),
)
for (const file of clientFiles) {
  const name = relative(root, file)
  if (/sqlite|wa-sqlite|\.wasm$|worker/i.test(name))
    failures.push(`客户端包含 Content 数据库运行时：${name}`)
}

for (const route of [
  '/',
  '/project/',
  '/document/',
  '/document/reports/',
  '/where-i-from/',
]) {
  const file =
    route === '/' ? join(root, 'index.html') : join(root, route, 'index.html')
  if (!existsSync(file)) continue
  const html = readFileSync(file, 'utf8')
  for (const marker of [
    '<title>',
    'name="description"',
    'rel="canonical"',
    'property="og:',
  ]) {
    if (!html.includes(marker))
      failures.push(`${route} 缺少 SEO 标记：${marker}`)
  }
}

const projectHtml = readFileSync(join(root, 'project/index.html'), 'utf8')
for (const route of routes.filter(
  (route) =>
    route.startsWith('/project/') &&
    route !== '/project/' &&
    route !== '/project/axiom/',
)) {
  if (!projectHtml.includes(`href="${route.replace(/\/$/, '')}"`))
    failures.push(`项目根页缺少卡片：${route}`)
}

const reportsHtml = readFileSync(
  join(root, 'document/reports/index.html'),
  'utf8',
)
const reportOrder = [
  '/where-i-from/',
  '/experience-of-100-mins-building/',
  '/project/work/pixel-ysu/',
  '/project/axiom/',
]
let previousIndex = -1
for (const route of reportOrder) {
  const index = reportsHtml.indexOf(`href="${route.replace(/\/$/, '')}"`)
  if (index < 0) failures.push(`报道页缺少卡片：${route}`)
  else if (index <= previousIndex) failures.push(`报道顺序错误：${route}`)
  previousIndex = index
}

const tileRoot = join(root, 'map/tiles/512')
if (existsSync(tileRoot)) {
  const tiles = []
  const collectTiles = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) collectTiles(path)
      else if (entry.name.endsWith('.webp')) tiles.push(path)
    }
  }
  collectTiles(tileRoot)
  if (tiles.length !== 2741) failures.push(`地图瓦片数量错误：${tiles.length}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`已验证 ${routes.length} 个路由及 ${files.length} 个生成文件。`)
