export const HEADER_OVERLAP_LIMIT = 40

export type HeaderVariant = 'transparent' | 'light' | 'dark'

export type HeaderManifestEntry = {
  immersive: boolean
  isDark: boolean
}

export type HeaderManifest = Record<string, HeaderManifestEntry>

export type ImmersiveComponentName = 'Hero' | 'HomeCountdown'

const IMMERSIVE_COMPONENTS: Record<string, ImmersiveComponentName> = {
  hero: 'Hero',
  homecountdown: 'HomeCountdown',
}

export function normalizeComponentTag(tag: string): string {
  return tag.replace(/^lazy/i, '').replace(/[-_]/g, '').toLowerCase()
}

export function immersiveComponentName(
  tag: string,
): ImmersiveComponentName | undefined {
  return IMMERSIVE_COMPONENTS[normalizeComponentTag(tag)]
}

export function isCountdownImmersive(image: unknown): boolean {
  return typeof image === 'string' && image.trim().length > 0
}

export function normalizeHeaderPath(path: string): string {
  const pathname = path.split(/[?#]/)[0] || '/'
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
}
