<script setup lang="ts">
import type { PaginationEvents, Swiper } from 'swiper/types'
import type { SwiperPaginationProps } from '.'
import { getNodeCssVar, rem2px } from '@rark-ui/shared'
import { useForwardProps } from '@rark-ui/vue-addons-shared'
import { merge } from 'es-toolkit/compat'
import { useSwiper } from 'swiper/vue'
import { twMerge } from 'tailwind-merge'
import { computed, nextTick, useTemplateRef, watchEffect } from 'vue'
import { useRegistSwiperEmits, useSwiperModule } from './utils'

const {
  class: propsClass,
  swiper,
  ...props
} = defineProps<SwiperPaginationProps>()
const emit = defineEmits<PaginationEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const pagiRef = useTemplateRef('pagination')
const forwared = useForwardProps(props)

watchEffect((cleanup) => {
  if (effectiveSwiper.value && hasModule('Pagination') && pagiRef.value) {
    if (forwared.value.type === 'autoplay-bullets' && hasModule('Autoplay')) {
      const onAutoplayTimeLeft = (_swiper: Swiper, _timeLeft: number, percentage: number) => {
        pagiRef.value?.style.setProperty(
          '--autoplay-percentage',
          `${Math.max(0, Math.min(1, 1 - percentage)) * 100}%`,
        )
      }
      const onPaginationRender = () => {
        if (forwared.value.dynamicBullets) {
          const getMinBulletSize = (): number => {
            if (pagiRef.value) {
              const bullets = effectiveSwiper.value.pagination.bullets
              if (bullets.length === 0)
                return 0
              let minSize = Infinity
              bullets.forEach((bullet: Element) => {
                const style = window.getComputedStyle(bullet)
                const dir = effectiveSwiper.value?.params.direction
                if (dir === 'horizontal') {
                  const width
                    = parseFloat(style.width)
                      + parseFloat(style.marginLeft)
                      + parseFloat(style.marginRight)
                  if (width < minSize) {
                    minSize = width
                  }
                }
                else if (dir === 'vertical') {
                  const height
                    = parseFloat(style.height)
                      + parseFloat(style.marginTop)
                      + parseFloat(style.marginBottom)
                  if (height < minSize) {
                    minSize = height
                  }
                }
              })
              return minSize
            }
            return 0
          }
          const activeBulletSize = rem2px(
            getNodeCssVar(
              pagiRef.value,
              '---autoplay-active-bullet-size',
              '2.5rem',
            ),
          )
          nextTick(() => {
            if (pagiRef.value) {
              pagiRef.value.style.width = `${
                getMinBulletSize() * (5 + (forwared.value.dynamicMainBullets ?? 1))
                + activeBulletSize
              }px`
              console.log('width', pagiRef.value.style.width)
            }
          })
        }
      }
      effectiveSwiper.value.on('paginationRender', onPaginationRender)
      effectiveSwiper.value.on('autoplayTimeLeft', onAutoplayTimeLeft)
      cleanup(() => {
        effectiveSwiper.value.off('paginationRender', onPaginationRender)
        effectiveSwiper.value.off('autoplayTimeLeft', onAutoplayTimeLeft)
      })
    }
    const options = merge(
      {},
      typeof effectiveSwiper.value.params.pagination === 'boolean'
        ? {}
        : effectiveSwiper.value.params.pagination,
      forwared.value,
      {
        enabled: true,
        el: pagiRef.value,
        type: forwared.value.type === 'autoplay-bullets' ? 'bullets' : forwared.value.type,
      },
    )
    effectiveSwiper.value.params.pagination = options
    effectiveSwiper.value.pagination.destroy()
    effectiveSwiper.value.pagination.init()
    effectiveSwiper.value.pagination.render()
    effectiveSwiper.value.pagination.update()
  }
})

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['paginationHide', 'paginationRender', 'paginationShow', 'paginationUpdate'],
})
</script>

<template>
  <div
    ref="pagination"
    role="pagination-container"
    :class="twMerge('rui-swiper-pagination', propsClass)"
    :data-type="forwared.type"
    data-scope="swiper"
    data-part="pagination"
  />
</template>
