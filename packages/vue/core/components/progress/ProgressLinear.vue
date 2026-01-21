<script lang="ts">
export interface ProgressLinearProps extends ProgressTrackBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'robbin' | 'transfer'
}
</script>

<script setup lang="ts">
import type { ProgressTrackBaseProps } from '@ark-ui/vue/progress'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  size,
  unstyled,
  variant = 'default',
  ...props
} = defineProps<ProgressLinearProps>()
const forwarded = useForwardProps(props)
const context = useProgressContext()
const itemProps = computed<any>(() => context.value.getTrackProps())

const trackRef = useTemplateRef<{ $el: HTMLDivElement }>('track')
const trackSizeStyles = computed(() => {
  if (!trackRef.value)
    return {}
  return {
    '--width': `${trackRef.value.$el.clientWidth}px`,
    '--height': `${trackRef.value.$el.clientHeight}px`,
  }
})

const rangeRef = useTemplateRef<{ $el: HTMLDivElement }>('range')
const transfer = useRangeTransfer(rangeRef)
const rangeTransferStyle = computed(() => {
  return variant === 'transfer' ? transfer.styles : undefined
})

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { track: tvTrack, range: tvRange } = tvProgress()
</script>

<template>
  <Progress.Track
    v-bind="forwarded"
    ref="track"
    :class="
      tvTrack({
        class: propsClass,
        orientation: itemProps['data-orientation'] ?? 'horizontal',
        ...theme,
      })
    "
    :data-variant="variant"
    :style="trackSizeStyles"
  >
    <Progress.Range
      ref="range"
      :class="
        tvRange({
          class: propsClass,
          orientation: itemProps['data-orientation'] ?? 'horizontal',
          ...theme,
        })
      "
      :data-variant="variant"
      :style="rangeTransferStyle"
    />
  </Progress.Track>
</template>
