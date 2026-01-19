<script lang="ts">
export interface SliderThumbProps extends SliderThumbBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { SliderThumbBaseProps } from '@ark-ui/vue/slider'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
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
} = defineProps<SliderThumbProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => ({ size, unstyled }))
const { thumb } = tvSlider()
</script>

<template>
  <Slider.Thumb
    v-bind="forwarded"
    :class="thumb({ class: [propsClass], ...theme })"
    :data-size="theme.size"
  >
    <Slider.HiddenInput />
  </Slider.Thumb>
</template>
