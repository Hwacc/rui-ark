<script lang="ts">
export interface ProgressLinearProps extends ProgressTrackBaseProps, Theme {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'robbin' | 'transfer'
  ui?: {
    track?: HTMLAttributes['class']
    range?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ProgressTrackBaseProps } from '@ark-ui/vue/progress'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  theme: propsTheme,
  variant = 'default',
  ui,
  ...props
} = defineProps<ProgressLinearProps>()
const forwarded = useForwardProps(props)
const context = useProgressContext()
const itemProps = computed<any>(() => context.value.getTrackProps())

const rangeRef = useTemplateRef<{ $el: HTMLDivElement }>('range')
const { styles: transferStyles } = useRangeTransfer(
  rangeRef,
  computed(() => variant),
  'background',
)

// theme
const theme = useTheme(() => propsTheme)
const { track: tvTrack, range: tvRange } = tvProgress()
</script>

<template>
  <Progress.Track
    v-bind="forwarded"
    :class="
      tvTrack({
        class: [ui?.track, propsClass],
        orientation: itemProps['data-orientation'] ?? 'horizontal',
        ...theme,
      })
    "
    :data-variant="variant"
  >
    <Progress.Range
      ref="range"
      :class="
        tvRange({
          class: ui?.range,
          orientation: itemProps['data-orientation'] ?? 'horizontal',
          ...theme,
        })
      "
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Track>
</template>
