<script lang="ts">
export interface SliderMarkerProps extends SliderMarkerBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { SliderMarkerBaseProps } from '@ark-ui/vue/slider'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { tvSlider } from '@rui-ark/themes/crafts/slider'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { pick } from 'lodash-es'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<SliderMarkerProps>()
const forwarded = useForwardProps(props)
const context = useSliderContext()

const theme = useTheme(() => ({ size, unstyled }))
const { marker, markerDot } = tvSlider()
</script>

<template>
  <Slider.Marker v-bind="forwarded" :class="marker({ class: [propsClass], ...theme })">
    <slot>
      <div
        :class="markerDot({ ...theme })"
        data-scope="slider"
        data-part="marker-dot"
        v-bind="pick(context.getMarkerProps(forwarded), ['data-state'])"
      />
      <span v-bind="pick(context.getMarkerProps(forwarded), ['data-state'])">
        {{ forwarded.value }}
      </span>
    </slot>
  </Slider.Marker>
</template>
