// 内容查询只允许在构建期（服务端）执行，客户端一律复用预渲染 payload。
// 统一这条约束：页面只声明 key 和取数逻辑，不在每处重复写守卫。
export function usePrerenderData<T>(key: string, loader: () => Promise<T>) {
  return useAsyncData(key, () => {
    if (!import.meta.server) throw new Error(`预渲染数据缺失：${key}`)
    return loader()
  })
}
