# ysumc.net

燕山大学 Minecraft 学生同好者协会官方网站。仓库根目录是一个 Nuxt 4 静态站，生成结果位于 `.output/public/`，由 GitHub Actions 同步到腾讯云 COS/CDN。

## 技术栈

- Nuxt 4、Vue 3、Vite、TypeScript
- Nuxt Content 3、Nuxt Image 2
- Tailwind CSS 4、Reka UI、VueUse
- Leaflet
- Node.js 22、pnpm 11、Python/Pillow（地图切片）

## 目录

- `app/pages/`：首页、分类页、加入页、画廊和地图等专用 Vue 页面。
- `app/pages/anniversary.vue`：一周年特别页（移植自旧 Nuxt 站），深色底 + MUA 视频横幅。
- `app/error.vue`：品牌化 404；Nuxt 4 的 srcDir 是 `app/`，错误页放仓库根目录不会生效。
- `content/project/`：生成 `/project/**/` 的项目正文。
- `content/document/`：生成 `/document/**/` 的资料正文。
- `content/articles/`：生成根路径文章。
- `app/components/content/`：可在 Markdown/MDC 中使用的内容组件。
- `app/components/content/Hero.vue`：整屏英雄图、文章横幅、正文视差块三种形态，页头透明态的判定也在其中。
- `app/data/icons.ts` + `scripts/extract-icons.mjs`：旧站图标字体的按需 SVG 数据与生成脚本。
- `app/data/map/`：地图坐标、点位、建筑类型和 SVG path 的类型化单一数据源。
- `app/assets/image/`：交给 Nuxt Image 处理的展示图片。
- `public/media/`：视频等大媒体（一周年页的 `myuniversity/{vp9.webm,265.mp4}`）。
- `public/image/gallery/`：画廊公开下载原图。
- `public/map/tiles/512/`：本地或 CI 生成的地图瓦片，不提交 Git。
- `maptiler/`：Git LFS 原图、Pillow 切片脚本和依赖。
- `scripts/verify-output.mjs`：静态产物与客户端 Content 边界检查。

## 本地开发

需要 Node.js 22 和 pnpm 11：

```bash
pnpm install
pnpm dev
```

常用验证：

```bash
pnpm format:check
pnpm typecheck
pnpm generate
pnpm verify
git diff --check
```

`pnpm format:check` 用仓库自带的 Prettier 配置检查代码风格（`pnpm format` 为写入），`content/` 是站点正文、不参与格式化。`pnpm generate` 会在 Nuxt 生成结束后移除 Content 自动产生、但本站客户端不需要的公开数据库 dump。`pnpm verify` 随后检查预期路由（含 `/anniversary`）、404、sitemap、robots、残留 `.html` 内链、关键 SEO 标记、被转义成正文的组件标签、客户端 SQLite/WASM/worker 痕迹、地图瓦片数量与报道顺序。

## 内容写作

新增正文时，按内容职责放入 `content/project/`、`content/document/` 或 `content/articles/`。公共 metadata 包括 `title`、`description`、`subtitle`、`date`、`tags`、`banner` 和 `cover`；项目还使用 `category`、`order`、`status`、`cardImage`、`dark`。报道内容添加：

```yaml
report:
  order: 1
  tag: 我社报道
  summary: 卡片摘要
  image: /image/example.webp
  displayDate: 2022-09-13
```

页面排版由 `layout` 决定：`layout: article` 表示顶部 384px 横幅 + 正文窄栏（`articles` collection 默认如此），不写则视为正文自带 `<Hero>`。

Markdown 可直接使用 Nuxt Content 的 Markdown、MDC、HTML 属性和 `app/components/content/` 下的组件。组件标签写成单行（跨行会被当成普通段落转义，页面会丢内容并显示标签字面量）；用 `::组件{…}` 块语法时记得以 `::` 收尾。只使用一次的特殊排版留在对应正文中。不要在页面组件中直接查询 Content；查询集中在 `server/utils/content-pages.ts`，页面通过 `usePrerenderData` 获得预渲染 payload。

## 图片与画廊

普通展示图放入 `app/assets/image/`，使用 `NuxtImg` 并提供合适的 `sizes`、宽高和加载优先级。Nuxt Image 会在静态生成时输出页面实际使用的优化格式。画廊需要公开下载的原图放入 `public/image/gallery/`，下载链接直接指向原文件。地图瓦片始终使用 `public/map/tiles/512/`，不走 Nuxt Image。

## 地图切片

`maptiler/full.png` 由 Git LFS 管理。获取原图并生成 512px WebP 瓦片：

```bash
git lfs pull --include="maptiler/full.png"
python -m pip install -r maptiler/requirements.txt
pnpm maptiler
find public/map/tiles/512 -type f -name '*.webp' | wc -l
```

期望数量是 `2741`。CI 缓存键同时包含原图、脚本和 Pillow 依赖。

### OpenLayers 缩放边界备忘

OpenLayers 10.10.0 在同时设置 `maxResolution: 2`、`minResolution: 0.0625` 和
`zoomFactor: Math.SQRT2` 时会少计算一级最大缩放。其内部通过对数反推层级并直接
`Math.floor()`；本组参数在 JavaScript 中得到 `9.999999999999998`，因此预期的 10
被截为 9。这是合法配置触发的浮点边界缺陷。

项目使用整数 `maxZoom: (mapMaxZoom + 1) * 2` 表达相同上限，不再让 OpenLayers 从
`minResolution` 反推层级。该写法是项目的正常配置，不依赖 epsilon 补丁，即使上游
修复后也无需还原。

上游 issue 尚未提交，建议标题：
`minResolution with fractional zoomFactor may lose one zoom level due to floating-point rounding`。
提交前附上上述最小参数组合、实际值与预期值，并确认没有新增的重复 issue。

## 构建与部署

推送 `main` 或手动触发 `Deploy to COS` 后，GitHub Actions 会恢复或生成地图瓦片，检查数量，安装依赖，执行 `pnpm typecheck`、`pnpm generate` 与 `pnpm verify`，最后通过 COSCLI：

```bash
coscli sync .output/public/ cos://site/ --recursive --delete --force --routines 64
```

部署依赖仓库 environment `production` 中的腾讯云 secrets/variables。上线前还需要从 COS 域名冷启动检查多层无后缀路径、资源、404 和客户端导航。

## 已知边界

- 站点不提供 `/join/` 根页面。
- `/anniversary` 是从旧 Nuxt 站移植的一周年特别页；旧站里它本身就是首页，因此目前没有导航入口，要不要加入口需要单独决定。
- 不兼容旧 `.html` 地址；旧地址允许返回 404。
- 不提供站内搜索、标签页、动态筛选、深色模式或多语言。
- Content 查询只在服务端生成阶段运行，客户端不携带内容数据库。
- 一周年页的视频（约 11MB）与 poster（约 6.5MB）直接放在 `public/media/` 与 `app/assets/image/anniversary/`，未压缩、未走 Git LFS 或对象存储。
- 自动检查不等同于 Chrome、Edge、移动 Safari 或 WebView 的视觉与交互验收。
