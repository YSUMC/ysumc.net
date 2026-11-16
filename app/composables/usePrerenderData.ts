// 内容查询只允许在构建期（服务端）执行，客户端一律复用预渲染 payload。
// 统一这条约束：页面只声明 key 和取数逻辑，不在每处重复写守卫。
// dev 没有预渲染 payload，客户端导航会缺数据：按同一 key 走 dev API 取同一份；
// 生产 payload 命中后不会执行到这里，仍严格复用 payload。
export function usePrerenderData<T>(key: string, loader: () => Promise<T>) {
  return useAsyncData(key, async () => {
    if (import.meta.server) return loader()
    if (import.meta.dev)
      return $fetch<T>('/api/prerender-data', { query: { key } })
    throw new Error(`预渲染数据缺失：${key}`)
  })
}
