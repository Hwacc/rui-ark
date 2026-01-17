<script lang="ts">
export interface SliderMarkerProps extends SliderMarkerBaseProps {
  class?: HTMLAttributes['class']
  size?: SliderVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { SliderMarkerBaseProps } from '@ark-ui/vue/slider'
import type { SliderVariants } from '@rui-ark/themes/crafts/slider'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Slider } from '@ark-ui/vue/slider'
import { tvSlider } from '@rui-ark/themes/crafts/slider'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<SliderMarkerProps>()
const forwarded = useForwardProps(props)

const theme = useTheme({ size, unstyled })
const { marker } = tvSlider()
</script>

<template>
  <Slider.Marker v-bind="forwarded" :class="marker({ class: [propsClass], ...theme })">
    <slot />
  </Slider.Marker>
</template>
