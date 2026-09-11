import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const reportSchema = z
  .object({
    order: z.number(),
    tag: z.string(),
    summary: z.string(),
    image: z.string(),
    displayDate: z.string(),
  })
  .optional()

const commonSchema = z.object({
  // 页面呈现方式：article = 顶部横幅 + 正文窄栏，page = 正文自带英雄图
  layout: z.enum(['article', 'page']).optional(),
  subtitle: z.string().optional(),
  date: z.union([z.string(), z.date()]).optional(),
  tags: z.array(z.string()).optional(),
  banner: z.string().optional(),
  cover: z.string().optional(),
  report: reportSchema,
})

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'project/**/*.md',
      schema: commonSchema.extend({
        category: z.enum(['work', 'activity', 'workflow', 'mcserver', 'other']),
        order: z.number(),
        status: z.enum(['completed', 'ongoing', 'closed']).optional(),
        period: z.string().optional(),
        cardImage: z.string().optional(),
        dark: z.boolean().optional(),
      }),
    }),
    documents: defineCollection({
      type: 'page',
      source: 'document/**/*.md',
      schema: commonSchema,
    }),
    articles: defineCollection({
      type: 'page',
      source: { include: 'articles/**/*.md', prefix: '/' },
      schema: commonSchema,
    }),
  },
})
