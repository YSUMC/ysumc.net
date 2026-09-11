// 从旧站（main 分支的 VuePress 资源）里的 mobirise2 / socicon 图标字体中，
// 抽出站点实际用到的字形，生成 app/data/icons.ts。
//
// 用法：node scripts/extract-icons.mjs
// 需要能读到 main 分支（i.e. 旧站资源仍在 git 历史里）。

import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputFile = join(root, 'app/data/icons.ts')

const fonts = [
  {
    css: 'docs/.vuepress/asset/mobirise-icons2/mobirise2.css',
    svg: 'docs/.vuepress/asset/mobirise-icons2/mobirise2.svg',
  },
  {
    css: 'docs/.vuepress/asset/socicon/css/styles.css',
    svg: 'docs/.vuepress/asset/socicon/fonts/socicon.svg',
  },
]

const readOldSiteFile = (path) =>
  execFileSync('git', ['show', `main:${path}`], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })

// 扫描仓库里出现的图标类名（组件里的 class 和 markdown 里的 name="…" 都会命中），
// 生成物自身除外，否则已生成的图标永远不会被移除。
const used = new Set()
const scan = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') scan(full)
      continue
    }
    if (full === outputFile) continue
    if (!/\.(vue|md|ts|js|mjs)$/.test(entry.name)) continue
    for (const match of readFileSync(full, 'utf8').matchAll(
      /(?:mobi-mbri|socicon)-[a-z0-9-]+/g,
    )) {
      used.add(match[0])
    }
  }
}
scan(join(root, 'app'))
scan(join(root, 'content'))

const glyphs = {}
for (const font of fonts) {
  const css = readOldSiteFile(font.css)
  const svg = readOldSiteFile(font.svg)
  const codeByName = {}
  for (const match of css.matchAll(
    /\.([a-z0-9-]+):before\s*\{\s*content:\s*'\\([0-9a-f]+)'/gi,
  )) {
    codeByName[match[1]] = match[2].toLowerCase()
  }
  const pathByCode = {}
  for (const match of svg.matchAll(
    /<glyph unicode="&#x([0-9a-f]+);"[^>]*?d="([^"]*)"/gi,
  )) {
    pathByCode[match[1].toLowerCase()] = match[2]
  }
  font.glyphs = { codeByName, pathByCode }
}

const entries = [...used].sort().map((name) => {
  const font = fonts.find((font) => font.glyphs.codeByName[name])
  const path = font && font.glyphs.pathByCode[font.glyphs.codeByName[name]]
  if (!path) throw new Error(`旧站字体里找不到字形：${name}`)
  return `  '${name}':\n    '${path}',`
})

const content = `// 图标字形取自旧站 docs/.vuepress/asset 的 mobirise2 / socicon 字体（IcoMoon 导出，
// units-per-em=1024、ascent=960）。这里只保留站点实际用到的字形，渲染为内联 SVG，
// 因此不再需要引入完整图标字体。视图坐标是字体坐标，渲染时按 ascent 翻转 y 轴。
//
// 本文件由 scripts/extract-icons.mjs 生成，不要手改。

export const iconPaths: Record<string, string> = {
${entries.join('\n')}
}
`

writeFileSync(outputFile, content)
console.log(
  `已写入 ${relative(root, outputFile)}：${entries.length} 个字形（扫描到 ${used.size} 个类名）`,
)
