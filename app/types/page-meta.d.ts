export {}

declare module '#app' {
  interface PageMeta {
    headerImmersive?: boolean
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    headerImmersive?: boolean
  }
}
