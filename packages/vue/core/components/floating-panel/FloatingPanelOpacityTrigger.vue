<script lang="ts">
export interface FloatingPanelOpacityTriggerProps extends PolymorphicProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue/factory'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { tvFloatingPanel } from '@rui-ark/themes/crafts/core/floating-panel'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { injectFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelOpacityTriggerProps>()
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const forwarded = useForwardProps(props)

const { opacity, setOpacity } = injectFloatingPanelAppearanceContext()
// theme
const theme = useTheme(() => propsTheme)
const { trigger } = tvFloatingPanel()
</script>

<template>
  <ark.button v-bind="forwarded" :class="trigger({ class: [propsClass], ...theme })">
    <slot v-bind="{ opacity, opacityGetter: () => opacity, setOpacity }" />
  </ark.button>
</template>
