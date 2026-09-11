import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import type {
  ProjectCardData,
  ReportItem,
  ReportMeta,
} from '#shared/types/content'

type ContentNode = string | { tag?: string; children?: ContentNode[] }

function nodeText(node: ContentNode): string {
  if (typeof node === 'string') return node
  return node.children?.map(nodeText).join('') || ''
}

function firstParagraph(node: ContentNode): string {
  if (typeof node === 'string') return ''
  if (node.tag === 'p') return nodeText(node).replace(/\s+/g, ' ').trim()
  for (const child of node.children || []) {
    const text = firstParagraph(child)
    if (text) return text
  }
  return ''
}

export async function findContentPage(event: H3Event, path: string) {
  const collection = path.startsWith('/project/')
    ? ('projects' as const)
    : path.startsWith('/document/')
      ? ('documents' as const)
      : ('articles' as const)
  const page = await queryCollection(event, collection).path(path).first()
  if (!page) return null
  return {
    ...page,
    collection,
    description:
      page.description ||
      page.subtitle ||
      firstParagraph(page.body as ContentNode).slice(0, 160),
  }
}

export async function getProjects(event: H3Event): Promise<ProjectCardData[]> {
  const rows = await queryCollection(event, 'projects').all()
  return rows
    .map((row) => ({
      title: row.title,
      path: row.path,
      category: row.category,
      order: row.order,
      subtitle: row.subtitle,
      status: row.status,
      period: row.period,
      cardImage: row.cardImage,
      dark: row.dark,
    }))
    .sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order)
}

export async function getReports(event: H3Event): Promise<ReportItem[]> {
  const [articles, projects] = await Promise.all([
    queryCollection(event, 'articles').all(),
    queryCollection(event, 'projects').all(),
  ])
  return [...articles, ...projects]
    .filter((row): row is typeof row & { report: ReportMeta } => !!row.report)
    .map((row) => ({ title: row.title, path: row.path, ...row.report }))
    .sort((a, b) => a.order - b.order)
}
