import { createSharedComposable, useWindowSize } from '@vueuse/core'
import {
  computed,
  onMounted,
  onScopeDispose,
  onUnmounted,
  ref,
  shallowReactive,
  shallowRef,
  watch,
} from 'vue'
import type { Ref } from 'vue'
import { HEADER_OVERLAP_LIMIT } from '#shared/header'

type HeaderBlock = {
  enabled: () => boolean
}

function createHeaderRegistry() {
  const registry = shallowReactive(new Map<HTMLElement, HeaderBlock>())
  const intersecting = shallowRef(new Set<HTMLElement>())
  const overImmersive = ref<boolean>()
  const { height: viewportHeight } = useWindowSize({
    initialWidth: 0,
    initialHeight: 0,
  })
  let observer: IntersectionObserver | undefined

  const targets = computed(() => {
    const result: HTMLElement[] = []
    for (const [element, block] of registry) {
      if (block.enabled()) result.push(element)
    }
    return result
  })

  const rootMargin = computed(
    () =>
      `0px 0px -${Math.max(0, viewportHeight.value - HEADER_OVERLAP_LIMIT)}px 0px`,
  )

  function handleEntries(entries: IntersectionObserverEntry[]) {
    const next = new Set(intersecting.value)
    for (const entry of entries) {
      if (entry.isIntersecting) next.add(entry.target as HTMLElement)
      else next.delete(entry.target as HTMLElement)
    }
    intersecting.value = next
    overImmersive.value = next.size > 0
  }

  function connect() {
    observer?.disconnect()
    observer = undefined
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }
    if (!targets.value.length) return
    observer = new IntersectionObserver(handleEntries, {
      rootMargin: rootMargin.value,
      threshold: 0,
    })
    for (const target of targets.value) observer.observe(target)
  }

  watch(
    [targets, rootMargin],
    () => {
      intersecting.value = new Set()
      overImmersive.value = undefined
      connect()
    },
    { immediate: true, flush: 'post' },
  )

  onScopeDispose(() => {
    observer?.disconnect()
    observer = undefined
  })

  function register(element: HTMLElement, block: HeaderBlock) {
    registry.set(element, block)
    return () => {
      registry.delete(element)
    }
  }

  function reset() {
    intersecting.value = new Set()
    overImmersive.value = undefined
  }

  return { overImmersive, register, reset }
}

export const useHeaderRegistry = createSharedComposable(createHeaderRegistry)

export function useImmersiveHeaderBlock(
  element: Ref<HTMLElement | undefined>,
  enabled: () => boolean,
) {
  const { register } = useHeaderRegistry()
  let unregister: (() => void) | undefined

  onMounted(() => {
    if (!element.value) return
    unregister = register(element.value, { enabled })
  })

  onUnmounted(() => {
    unregister?.()
    unregister = undefined
  })
}
