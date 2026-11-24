import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { addTemplate, defineNuxtModule, updateTemplates } from 'nuxt/kit'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { parse } from 'vue/compiler-sfc'
import {
  immersiveComponentName,
  isCountdownImmersive,
  normalizeHeaderPath,
  type HeaderManifest,
} from '../shared/header'

const TEMPLATE_NAME = 'header-manifest.ts'
const CONTENT_COLLECTIONS = new Set(['articles', 'project', 'document'])

type TemplateProp = {
  type: number
  name?: string
  value?: { content?: string }
  exp?: { content?: string; isStatic?: boolean }
  arg?: { content?: string }
}

type TemplateNode = {
  type: number
  tag?: string
  content?: string
  props?: TemplateProp[]
  children?: TemplateNode[]
}

type Inferred = {
  immersive: boolean
  confident: boolean
}

type InspectedContent = Inferred & {
  explicit: boolean | undefined
}

type ResolvedRoute = {
  path: string
  file?: string
  meta?: {
    headerImmersive?: unknown
  }
  children?: ResolvedRoute[]
}

function meaningfulNodes(nodes: TemplateNode[] | undefined): TemplateNode[] {
  return (nodes ?? []).filter((node) => {
    if (node.type === 3) return false
    if (node.type === 2) return (node.content ?? '').trim().length > 0
    return true
  })
}

function hasDynamicDirective(node: TemplateNode): boolean {
  return (node.props ?? []).some((prop) => {
    if (prop.type !== 7) return false
    if (['if', 'else', 'else-if', 'for'].includes(prop.name ?? '')) return true
    return prop.name === 'bind' && prop.arg?.content === 'is'
  })
}

function resolveFirstVisual(nodes: TemplateNode[] | undefined): {
  node?: TemplateNode
  confident: boolean
} {
  let current = meaningfulNodes(nodes)
  let confident = true
  while (true) {
    const first = current[0]
    if (!first) return { confident }
    if (hasDynamicDirective(first)) confident = false
    if (first.type === 1 && first.tag?.toLowerCase() === 'div') {
      current = meaningfulNodes(first.children)
      continue
    }
    return { node: first, confident }
  }
}

function readStaticProp(
  node: TemplateNode,
  name: string,
): { known: boolean; value?: unknown } {
  let known = true
  let value: unknown
  for (const prop of node.props ?? []) {
    if (prop.type === 6 && prop.name === name) {
      value = prop.value?.content
    } else if (prop.type === 7 && prop.name === 'bind') {
      if (prop.arg?.content === name) known = false
      else if (!prop.arg?.content) known = false
    }
  }
  return { known, value }
}

function classifyImmersiveNode(node: TemplateNode): Inferred {
  if (node.type !== 1) return { immersive: false, confident: true }
  const name = immersiveComponentName(node.tag ?? '')
  if (!name) return { immersive: false, confident: true }
  if (name === 'Hero') return { immersive: true, confident: true }
  const image = readStaticProp(node, 'image')
  return {
    immersive: image.known && isCountdownImmersive(image.value),
    confident: image.known,
  }
}

type HastNode = {
  type?: string
  tag?: string
  value?: string
  props?: Record<string, unknown>
  children?: HastNode[]
}

function meaningfulHastNodes(nodes: HastNode[] | undefined): HastNode[] {
  return (nodes ?? []).filter((node) => {
    if (node.type === 'comment') return false
    if (node.type === 'text') return (node.value ?? '').trim().length > 0
    return true
  })
}

function classifyHastNode(node: HastNode): Inferred {
  if (node.type === 'text') return { immersive: false, confident: true }
  if (node.type !== 'element') return { immersive: false, confident: true }
  const name = immersiveComponentName(node.tag ?? '')
  if (!name) return { immersive: false, confident: true }
  if (name === 'Hero') return { immersive: true, confident: true }
  const props = node.props ?? {}
  if (
    Object.keys(props).some((key) => key.startsWith(':') || key === 'v-bind')
  ) {
    return { immersive: false, confident: false }
  }
  return {
    immersive: isCountdownImmersive(props.image),
    confident: true,
  }
}

function inspectHastNode(node: HastNode): Inferred {
  let current: HastNode | undefined = node
  while (current) {
    if (current.type !== 'element') return classifyHastNode(current)
    const classified = classifyHastNode(current)
    const children = meaningfulHastNodes(current.children)
    if (
      current.tag?.toLowerCase() === 'div' &&
      !immersiveComponentName(current.tag ?? '') &&
      children.length
    ) {
      current = children[0]
      continue
    }
    return classified
  }
  return { immersive: false, confident: true }
}

function inspectHastBody(
  body: { children?: HastNode[] } | undefined,
): Inferred {
  const first = meaningfulHastNodes(body?.children)[0]
  if (!first) return { immersive: false, confident: true }
  return inspectHastNode(first)
}

async function inspectMarkdown(
  file: string,
  collection: string,
): Promise<InspectedContent> {
  const parsed = await parseMarkdown(readFileSync(file, 'utf8'), {
    highlight: false,
  })
  const data = parsed.data as {
    layout?: unknown
    headerImmersive?: unknown
  }
  const explicit =
    typeof data.headerImmersive === 'boolean' ? data.headerImmersive : undefined
  const inferred =
    collection === 'articles' || data.layout === 'article'
      ? { immersive: true, confident: true }
      : inspectHastBody(parsed.body as { children?: HastNode[] })
  return { ...inferred, explicit }
}

function classifyVuePage(file: string): Inferred {
  const { descriptor, errors } = parse(readFileSync(file, 'utf8'), {
    filename: file,
  })
  if (errors.length) {
    throw new Error(
      `[header-manifest] 无法解析 ${file}: ${errors[0]?.message ?? 'unknown error'}`,
    )
  }
  const ast = descriptor.template?.ast as
    { children?: TemplateNode[] } | undefined
  if (!ast) {
    throw new Error(`[header-manifest] ${file} 缺少 template`)
  }
  const resolution = resolveFirstVisual(ast.children)
  const classified = resolution.node
    ? classifyImmersiveNode(resolution.node)
    : { immersive: false, confident: true }
  return {
    immersive: classified.immersive,
    confident: resolution.confident && classified.confident,
  }
}

function forEachRoutePath(
  routes: ResolvedRoute[],
  visit: (route: ResolvedRoute, path: string) => void,
  parentPath = '',
) {
  for (const route of routes) {
    const path = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    visit(route, path)
    if (route.children?.length) forEachRoutePath(route.children, visit, path)
  }
}

function contentRoutePath(contentDir: string, file: string) {
  const relativePath = relative(contentDir, file)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
  const [collection, ...rest] = relativePath.split('/')
  if (!collection) return undefined
  if (!CONTENT_COLLECTIONS.has(collection)) return undefined
  const suffix = rest.join('/')
  const prefix = collection === 'articles' ? '' : `/${collection}`
  return normalizeHeaderPath(`${prefix}/${suffix}`)
}

function listFiles(
  directory: string,
  extension: string,
  output: string[] = [],
) {
  if (!existsSync(directory)) return output
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      listFiles(fullPath, extension, output)
    } else if (entry.isFile() && fullPath.endsWith(extension)) {
      output.push(fullPath)
    }
  }
  return output
}

async function buildManifest(
  contentDir: string,
  routes: ResolvedRoute[],
  warnedMessages: Set<string>,
): Promise<HeaderManifest> {
  const manifest: HeaderManifest = {}
  const warnIf = (message: string) => {
    if (warnedMessages.has(message)) return
    warnedMessages.add(message)
    console.warn(message)
  }
  const add = (path: string, initial: boolean, source: string) => {
    const key = normalizeHeaderPath(path)
    if (Object.hasOwn(manifest, key)) {
      throw new Error(`[header-manifest] 路径重复: ${key}（${source}）`)
    }
    manifest[key] = initial
  }

  const label = (immersive: boolean) => (immersive ? '透明' : '不透明')
  const warnConflict = (file: string, explicit: boolean, inferred: boolean) => {
    warnIf(
      `[header-manifest] ${file} 声明为${label(explicit)}，推断为${label(inferred)}；按声明值使用，运行时可能纠正并导致闪烁`,
    )
  }
  const warnUnconfident = (file: string, inferred: boolean, hint: string) => {
    warnIf(
      `[header-manifest] 无法确定 ${file} 的首屏状态，暂按${label(inferred)}处理；请用 ${hint} 声明`,
    )
  }

  for (const file of listFiles(contentDir, '.md')) {
    const collection = relative(contentDir, file).split(/[\\/]/)[0]
    if (!collection) continue
    if (!CONTENT_COLLECTIONS.has(collection)) {
      warnIf(
        `[header-manifest] 无法识别内容集合 ${collection}（${file}），已跳过页头清单`,
      )
      continue
    }
    const path = contentRoutePath(contentDir, file)
    if (!path) continue
    const inferred = await inspectMarkdown(file, collection)
    if (inferred.explicit !== undefined) {
      if (inferred.confident && inferred.explicit !== inferred.immersive) {
        warnConflict(file, inferred.explicit, inferred.immersive)
      }
    } else if (!inferred.confident) {
      warnUnconfident(
        file,
        inferred.immersive,
        'frontmatter 中的 headerImmersive',
      )
    }
    add(path, inferred.explicit ?? inferred.immersive, file)
  }

  forEachRoutePath(routes, (route, path) => {
    if (path.includes(':')) {
      if (path.includes('(.*)') || !route.file) return
      const explicit = route.meta?.headerImmersive
      if (typeof explicit === 'boolean') {
        const inferred = classifyVuePage(route.file)
        if (inferred.confident && explicit !== inferred.immersive) {
          warnConflict(route.file, explicit, inferred.immersive)
        }
      } else {
        warnIf(
          `[header-manifest] 动态页面 ${route.file} 没有 headerImmersive 页面元数据，无法生成静态首屏清单`,
        )
      }
      return
    }
    if (!route.file) return
    const explicit =
      typeof route.meta?.headerImmersive === 'boolean'
        ? route.meta.headerImmersive
        : undefined
    const inferred = classifyVuePage(route.file)
    if (explicit !== undefined) {
      if (inferred.confident && explicit !== inferred.immersive) {
        warnConflict(route.file, explicit, inferred.immersive)
      }
    } else if (!inferred.confident) {
      warnUnconfident(
        route.file,
        inferred.immersive,
        'definePageMeta({ headerImmersive: true/false })',
      )
    }
    add(path, explicit ?? inferred.immersive, route.file)
  })

  return Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  )
}

export default defineNuxtModule({
  meta: { name: 'header-manifest' },
  setup(_options, nuxt) {
    const contentDir = resolve(nuxt.options.rootDir, 'content')
    let routes: ResolvedRoute[] = []
    const warnedMessages = new Set<string>()

    addTemplate({
      filename: TEMPLATE_NAME,
      write: true,
      getContents: async () => {
        const manifest = await buildManifest(contentDir, routes, warnedMessages)
        return `export default ${JSON.stringify(manifest, null, 2)} as Record<string, boolean>\n`
      },
    })

    let timer: ReturnType<typeof setTimeout> | undefined
    const scheduleManifestUpdate = () => {
      if (!nuxt.options.dev) return
      if (timer) clearTimeout(timer)
      timer = setTimeout(async () => {
        timer = undefined
        try {
          await updateTemplates({
            filter: (template) => template.filename === TEMPLATE_NAME,
          })
        } catch (error) {
          console.error(error)
        }
      }, 100)
    }

    nuxt.hook('pages:resolved', (resolvedRoutes) => {
      routes = resolvedRoutes as unknown as ResolvedRoute[]
      scheduleManifestUpdate()
    })
    nuxt.hook('builder:watch', (_event, path) => {
      const normalizedPath = path.replace(/\\/g, '/')
      if (
        normalizedPath.includes('pages/') ||
        normalizedPath.includes('content/')
      ) {
        scheduleManifestUpdate()
      }
    })
    nuxt.hook('content:file:afterParse', () => scheduleManifestUpdate())
  },
})
