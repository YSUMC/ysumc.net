# 燕大MC社新官网

新官网更换了.net新域名，使用 Vuepress2 重构，抛弃难用的 Nuxt Content。

## 地图瓦片

地图原图保存在 `maptiler/full.png`，通过 Git LFS 管理。`maptiler/main.py`
使用 Pillow 将原图生成 512×512 的 WebP 瓦片，输出到
`docs/.vuepress/public/map/tiles/512/zoom_{z}/tile_{x}_{y}.webp`。

当前地图生成 `zoom_0` 至 `zoom_5`，共 2741 个瓦片。Leaflet 使用相同路径和
512 瓦片尺寸加载，配置位于 `docs/.vuepress/mapdata/dataloader.js`。

瓦片目录由 `.gitignore` 排除，本地生成的瓦片无需提交。VuePress 构建时会将
该目录复制到 `docs/.vuepress/dist/map/tiles/512`。

### 本地生成

```bash
git lfs pull --include="maptiler/full.png"
python -m pip install -r maptiler/requirements.txt
pnpm maptiler
```

### CD 流程

GitHub Workflow 使用原图 LFS 指针、切图脚本和 Pillow 依赖文件的内容生成缓存键：

1. 缓存命中时，将瓦片恢复到 VuePress 的 `public` 目录。
2. 缓存未命中时，下载 `full.png`、安装 Pillow 并重新切图。
3. 确认瓦片数量为 2741 后执行 VuePress 构建和 COS 部署。

替换原图时应保持当前 15360×8640 尺寸。调整尺寸、瓦片大小或缩放层级时，需要同步
修改切图脚本、Leaflet 配置和 Workflow 的瓦片数量检查。
