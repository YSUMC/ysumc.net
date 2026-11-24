export {}

declare module '#app' {
  interface PageMeta {
    headerImmersive?: boolean
    isDark?: boolean
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    headerImmersive?: boolean
    isDark?: boolean
  }
}
