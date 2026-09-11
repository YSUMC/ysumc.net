# ysumc.net 项目约定

## 页面与内容

- `/project/`、`/document/`、`/document/reports/` 是专用 Vue 分类页；项目、资料与普通文章正文由 Nuxt Content 页面壳渲染。没有 `/join/` 根页面。
- 首页文案、模块内容和模块顺序不可调整。有效旧站正文不得改写或删减。
- `projects`、`documents`、`articles` 三个 collection 分别承载项目、资料和根路径文章。`tags` 只存 metadata，不新增标签、筛选或搜索界面。
- 内容页排版由 frontmatter 的 `layout` 决定：`article` 表示顶部 384px 横幅 + 正文窄栏，缺省表示正文自带 `<Hero>`。不要把排版判断写成路由前缀或特例路径。
- Markdown 里的内容组件写成单行标签，例如 `<Hero image="/image/x.png" title="标题"></Hero>`。跨行的标签会被 CommonMark 当成普通段落转义，页面会静默丢掉整块内容并把标签字面量显示出来；组件必须放在 `app/components/content/` 才能被 MDC 按无前缀名解析；`::组件{…}` 块语法必须以 `::` 收尾，否则后续内容会被当成它的子节点丢掉。`pnpm verify` 会拦截“标签被转义”这一类问题。
- 不实现旧 `.html` redirect、alias 或 CDN 兼容规则。

## 组件与样式

- 全宽媒体区块（整屏英雄图、文章横幅、正文里的视差块）统一用 `app/components/content/Hero.vue`，用 `variant="screen" | "banner" | "inline"` 选形态；页头透明态的判定也在该组件内部，新页面不要再自己写 IntersectionObserver 或滚动监听。深色页面用 `setNavBar(undefined, 'black')` 声明黑底态，并在离开时还原 `'white'`。
- 图标统一写 `<Icon name="mobi-mbri-…" />`，字形数据由 `scripts/extract-icons.mjs` 从旧站字体生成（先写用法、再跑脚本，不手改生成物）。不要引入图标字体或图标库。
- 不引入 jarallax。首屏视差用 Hero + `useParallax`，速度为 0.6（与旧站一致），任何滚动位置都不允许露出底色。
- 保留 YSUMC logo、自有字体、现有色彩、大图沉浸感及重点页面深色语义。普通展示图使用 Nuxt Image，画廊保留公开原图，地图瓦片不经过 Nuxt Image，视频等大媒体放 `public/media/` 并尽量先压缩。

## 数据与地图

- `queryCollection` 只允许在服务端构建阶段通过 `@nuxt/content/server` 调用；客户端只复用预渲染 payload，不发布 SQLite、WASM、worker 或内容数据库 dump。页面取数走 `usePrerenderData`，不要绕过它直接查内容。
- 地图坐标、边界、缩放、点位开关、选中详情、导航状态和第 9/10 次切换彩蛋必须保留；地图数据保持类型化单一数据源。

## 验证与提交

- 验证顺序：`pnpm format:check` → `pnpm typecheck` → `pnpm generate` → `pnpm verify`，然后人工做浏览器/设备验收。自动检查通过不等于视觉与交互已验收。禁止擅自增加深色模式、多语言、搜索、Playwright、视觉快照、Lighthouse 门槛或部署兼容层。
- 代码风格以仓库自带的 Prettier 为准（`pnpm format`）；`content/` 是站点正文，不参与格式化。
- 提交信息用 Conventional Commits 格式，摘要与正文写中文；语义改动与纯格式化分开提交。
