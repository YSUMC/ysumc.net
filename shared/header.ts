export const HEADER_OVERLAP_LIMIT = 40

export type HeaderBlock = {
  immersive: boolean
  top: number
  bottom: number
}

export type HeaderManifest = Record<string, boolean>

export function isHeaderTransparent(
  blocks: readonly HeaderBlock[],
  headerBottom = HEADER_OVERLAP_LIMIT,
): boolean {
  return blocks.some(
    (block) => block.immersive && block.top < headerBottom && block.bottom > 0,
  )
}

export function normalizeHeaderPath(path: string): string {
  const pathname = path.split(/[?#]/)[0] || '/'
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
}
