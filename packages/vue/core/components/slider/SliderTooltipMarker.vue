<script lang="ts">
export interface SliderTooltipMarkerProps extends SliderMarkerBaseProps {
  class?: HTMLAttributes['class']
  size?: SliderVariants['size']
  skin?: Skin
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { SliderMarkerBaseProps } from '@ark-ui/vue/slider'
import type { SliderVariants } from '@rui-ark/themes/crafts/slider'
import type { Skin } from '@rui-ark/vue-core/providers/theme/theme-props'
import type { HTMLAttributes } from 'vue'
import { Slider } from '@ark-ui/vue/slider'
import { tvSlider } from '@rui-ark/themes/crafts/slider'

const { marker } = tvSlider()
</script>

<template>
  <Slider.Marker>
    <slot />
  </Slider.Marker>
</template>
