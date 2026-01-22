<script lang="ts">
interface ProgressCircleTheme extends Omit<ThemeProps, 'size'> {
  size?: ProgressVariantProps['size'] | number
}

export interface ProgressCircleProps extends ProgressCircleBaseProps, ProgressCircleTheme {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'transfer'
}
</script>

<script setup lang="ts">
import type { ProgressCircleBaseProps } from '@ark-ui/vue/progress'
import type { ProgressVariantProps } from '@rui-ark/themes/crafts/progress'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useCustomTheme } from '@rui-ark/vue-core/composables/useTheme'
import { omit } from 'es-toolkit'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  size,
  unstyled,
  variant = 'default',
  ...props
} = defineProps<ProgressCircleProps>()
const forwarded = useForwardProps(props)

const rangeRef = useTemplateRef<{ $el: HTMLDivElement }>('range')
const { styles: transferStyles } = useRangeTransfer(
  rangeRef,
  computed(() => variant),
  'stroke',
)

// theme
const theme = useCustomTheme<ProgressCircleTheme>(() => ({ size, unstyled }))
const themeRest = computed(() => omit(theme.value, ['size']))
const { circle: tvCircle, circleTrack, circleRange } = tvProgress()
</script>

<template>
  <Progress.Circle
    v-bind="forwarded"
    :class="
      tvCircle({
        class: propsClass,
        size: typeof theme.size === 'string' ? theme.size : 'base',
        ...themeRest,
      })
    "
    :style="typeof theme.size === 'number' && { '--size': `${theme.size}px` }"
    :data-variant="variant"
  >
    <Progress.CircleTrack
      :class="circleTrack({ class: propsClass, ...themeRest })"
      :data-variant="variant"
    />
    <Progress.CircleRange
      ref="range"
      :class="circleRange({ class: propsClass, ...themeRest })"
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Circle>
</template>
