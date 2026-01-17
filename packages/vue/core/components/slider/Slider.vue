<script lang="ts">
export interface SliderProps extends SliderRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    track?: HTMLAttributes['class']
    range?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { SliderRootBaseProps, SliderRootEmits } from '@ark-ui/vue/slider'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSlider } from '@ark-ui/vue/slider'
import { tvSlider } from '@rui-ark/themes/crafts/slider'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, useTemplateRef, watch } from 'vue'
import SliderBoundaryProvider from './SliderBoundaryProvider.vue'

const {
  class: propsClass,
  unstyled,
  size,
  ui,
  ...props
} = defineProps<SliderProps>()
const emit = defineEmits<SliderRootEmits>()
const forwarded = useForwardProps(props)
const slider = useSlider(forwarded, emit)
const controlRef = useTemplateRef('control')
watch(controlRef, (el) => {
  console.log('el', el)
})

const theme = useTheme(computed(() => ({ size, unstyled })))
const { root, control: tvControl, track, range } = tvSlider()
</script>

<template>
  <Slider.RootProvider
    :value="slider"
    :class="
      root({
        class: [ui?.root, propsClass],
        orientation: forwarded.orientation ?? 'horizontal',
        ...theme,
      })
    "
  >
    <ThemeProvider :value="theme">
      <SliderBoundaryProvider :boundary="controlRef?.$el ?? 'clipping-ancestors'">
        <slot name="prefix" />
        <Slider.Control
          ref="control"
          :class="
            tvControl({
              class: ui?.control,
              orientation: forwarded.orientation ?? 'horizontal',
              ...theme,
            })
          "
        >
          <Slider.Track
            :class="
              track({
                class: ui?.track,
                orientation: forwarded.orientation ?? 'horizontal',
                ...theme,
              })
            "
          >
            <Slider.Range
              :class="
                range({
                  class: ui?.range,
                  orientation: forwarded.orientation ?? 'horizontal',
                  ...theme,
                })
              "
            />
          </Slider.Track>
          <slot />
        </Slider.Control>
        <slot name="suffix" />
      </SliderBoundaryProvider>
    </ThemeProvider>
  </Slider.RootProvider>
</template>
