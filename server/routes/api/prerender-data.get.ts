import {
  findContentPage,
  getProjects,
  getReports,
} from '../../utils/content-pages'

// dev 专用兜底：客户端导航没有预渲染 payload 时，按 useAsyncData 的 key 在服务端取同一份数据。
// 生产为纯静态托管，该路由不会部署；payload 命中时也不会被调用。
export default defineEventHandler(async (event) => {
  const key = getQuery(event).key
  if (typeof key !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
  }
  if (key === 'reports:index') return getReports(event)
  if (key === 'projects:index') return getProjects(event)
  if (key.startsWith('content-page:')) {
    const path = key.slice('content-page:'.length)
    if (path.startsWith('/')) return findContentPage(event, path)
  }
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
})
