// 视差算法按旧站 jarallax `speed: 0.6` 的行为复刻（type: 'scroll'，图片原为 fixed 定位）。
// 图片按容器坐标计算：顶部偏移 = marginTop + positionY - 容器 top，等价于 jarallax 的
// “图片钉在视口上、随滚动以 0.6 倍速移动”。高度与偏移同源，容器任意时刻都被图片盖满，
// 不会露出底色。
const parallaxSpeed = 0.6

export function useParallax(
  target: Ref<HTMLElement | undefined>,
  speed = parallaxSpeed,
) {
  const style = ref<Record<string, string>>()
  let frame = 0

  function measure() {
    frame = 0
    const element = target.value
    if (!element) return
    const windowHeight = window.innerHeight
    const { top, height } = element.getBoundingClientRect()
    const imageHeight = height + (windowHeight - height) * (1 - speed)
    const fromViewportCenter = Math.max(
      -1,
      Math.min(1, 1 - 2 * ((windowHeight - top) / (windowHeight + height))),
    )
    style.value = {
      height: `${imageHeight}px`,
      marginTop: `${(windowHeight - imageHeight) / 2}px`,
      transform: `translate3d(0, ${0.5 * speed * (height + windowHeight) * fromViewportCenter - top}px, 0)`,
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame) cancelAnimationFrame(frame)
  })

  return style
}
