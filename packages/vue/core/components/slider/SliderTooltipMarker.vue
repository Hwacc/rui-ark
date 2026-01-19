<script lang="ts">
export interface SliderTooltipMarkerProps extends SliderMarkerBaseProps, Omit<TooltipRootProps, 'open'>, ThemeProps {
  class?: HTMLAttributes['class']
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
}
</script>

<script setup lang="ts">
import type { SliderMarkerBaseProps, UseSliderContext } from '@ark-ui/vue/slider'
import type { TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { tvSlider } from '@rui-ark/themes/crafts/slider'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@rui-ark/vue-core/components/tooltip'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { merge, pick } from 'lodash-es'
import { computed, watch } from 'vue'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  size,
  unstyled,
  skin,
  value,
  open, // tooltip prop
  ...props
} = defineProps<SliderTooltipMarkerProps>()
const context = useSliderContext()

const boundary = injectSliderBoundaryContext()
const tooltipForwarded = useForwardProps(props)
const configs = useConfig('tooltip')
const tooltip = useTooltip(
  computed(() => (
    merge(
      {
        open: true,
        positioning: {
          boundary: boundary.value,
          overflowPadding: 0,
          placement: 'bottom',
          shift: 0,
          flip: false,
        },
      },
      configs.value,
      tooltipForwarded.value,
    )
  )),
)

watch(() => skin, () => {
  console.log('skin', skin)
})
const theme = useTheme(() => ({ size, unstyled, skin }))
const { markerDot } = tvSlider()
</script>

<template>
  <ThemeProvider :value="theme">
    <TooltipRootProvider :value="tooltip">
      <TooltipTrigger as-child>
        <Slider.Marker :value="value">
          <slot>
            <div
              :class="markerDot({ ...theme })"
              data-scope="slider"
              data-part="marker-dot"
              v-bind="pick(context.getMarkerProps({ value }), ['data-state'])"
            />
          </slot>
        </Slider.Marker>
      </TooltipTrigger>
      <TooltipContent>
        <slot name="arrow">
          <TooltipArrow />
        </slot>
        <slot name="content">
          {{ value }}
        </slot>
      </TooltipContent>
    </TooltipRootProvider>
  </ThemeProvider>
</template>
