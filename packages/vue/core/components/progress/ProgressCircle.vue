<script lang="ts">
export interface ProgressCircleProps extends ProgressCircleBaseProps {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'transfer'
  ui?: {
    circle?: HTMLAttributes['class']
    circleTrack?: HTMLAttributes['class']
    circleRange?: HTMLAttributes['class']
  }
  theme?: ProgressCircleTheme
}
</script>

<script setup lang="ts">
import type { ProgressCircleBaseProps } from '@ark-ui/vue/progress'
import type { HTMLAttributes } from 'vue'
import type { ProgressCircleTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useCustomTheme } from '@rui-ark/vue-core/composables/useTheme'
import { omit } from 'es-toolkit'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  theme: propsTheme,
  variant = 'default',
  ui,
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
const theme = useCustomTheme<ProgressCircleTheme>(() => propsTheme)
const themeRest = computed(() => omit(theme.value, ['size']))
const { circle: tvCircle, circleTrack, circleRange } = tvProgress()
</script>

<template>
  <Progress.Circle
    v-bind="forwarded"
    :class="
      tvCircle({
        class: [ui?.circle, propsClass],
        size: typeof theme.size === 'string' ? theme.size : 'base',
        ...themeRest,
      })
    "
    :data-variant="variant"
    :style="typeof theme.size === 'number' && { '--size': `${theme.size}px` }"
  >
    <Progress.CircleTrack
      :class="circleTrack({ class: ui?.circleTrack, ...themeRest })"
      :data-variant="variant"
    />
    <Progress.CircleRange
      ref="range"
      :class="circleRange({ class: ui?.circleRange, ...themeRest })"
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Circle>
</template>
