<script lang="ts">
export interface SliderTooltipThumbProps extends SliderThumbBaseProps, Omit<TooltipRootProps, 'open'>, ThemeProps {
  class?: HTMLAttributes['class']
  open?: (context: UnwrapRef<UseSliderContext>) => boolean
  widget?: {
    tooltipContent?: ComponentProps<typeof TooltipContent>
    tooltipArrow?: ComponentProps<typeof TooltipArrow>
  }
}
</script>

<script setup lang="ts">
import type { SliderThumbBaseProps, UseSliderContext } from '@ark-ui/vue/slider'
import type { TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { tvSlider } from '@rui-ark/themes/crafts/slider'
import {
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@rui-ark/vue-core/components/tooltip'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { merge } from 'lodash-es'
import { computed, watch } from 'vue'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  class: propsClass,
  size,
  unstyled,
  index, // thumb prop
  name, // thumb prop
  open, // tooltip prop
  widget,
  skin,
  ...props
} = defineProps<SliderTooltipThumbProps>()
const context = useSliderContext()

const boundary = injectSliderBoundaryContext()
const tooltipForwarded = useForwardProps(props)
const configs = useConfig('tooltip')
const tooltip = useTooltip(
  computed(() => (
    merge(
      {
        open: open?.(context.value) ?? context.value.dragging,
        positioning: {
          boundary: boundary.value,
          overflowPadding: 0,
          placement: 'top',
          shift: 0,
          flip: false,
        },
      },
      configs.value,
      tooltipForwarded.value,
    )
  )),
)

watch(
  () => context.value.value,
  () => {
    // we reposition when the value changes, it will be smoother when thumb fast dragging
    tooltip.value.reposition()
  },
)

const { forwardRef } = useForwardExpose()
const theme = useTheme(computed(() => ({ size, unstyled, skin })))
const { thumb: tvThumb } = tvSlider()
</script>

<template>
  <ThemeProvider :value="theme">
    <TooltipRootProvider :value="tooltip">
      <TooltipTrigger as-child>
        <Slider.Thumb
          :ref="(el) => el && forwardRef(el)"
          :class="tvThumb({ class: [propsClass], ...theme })"
          :data-size="theme.size"
          :index="index"
          :name="name"
        >
          <Slider.HiddenInput />
        </Slider.Thumb>
      </TooltipTrigger>
      <Teleport
        v-if="tooltipForwarded.positioning?.strategy === 'fixed'"
        to="body"
      >
        <TooltipContent v-bind="widget?.tooltipContent">
          <slot name="arrow">
            <TooltipArrow v-bind="widget?.tooltipArrow" />
          </slot>
          <slot name="default">
            <Slider.ValueText />
          </slot>
        </TooltipContent>
      </Teleport>
      <TooltipContent v-else v-bind="widget?.tooltipContent">
        <slot name="arrow">
          <TooltipArrow v-bind="widget?.tooltipArrow" />
        </slot>
        <slot name="default">
          <Slider.ValueText />
        </slot>
      </TooltipContent>
    </TooltipRootProvider>
  </ThemeProvider>
</template>
