<script lang="ts">
export interface FloatingPanelHeaderProps extends FloatingPanelHeaderBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { FloatingPanelHeaderBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { tvFloatingPanel } from '@rui-ark/themes/crafts/core/floating-panel'
import { useTheme } from '@rui-ark/vue/composables/useTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelHeaderProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const { header, control, title } = tvFloatingPanel()
</script>

<template>
  <FloatingPanel.DragTrigger>
    <FloatingPanel.Header
      v-bind="forwarded"
      :class="header({ class: [ui?.root, propsClass], ...theme })"
    >
      <FloatingPanel.Title :class="title({ class: ui?.title, ...theme })">
        <slot />
      </FloatingPanel.Title>
      <FloatingPanel.Control :class="control({ class: ui?.control, ...theme })">
        <slot name="control" />
      </FloatingPanel.Control>
    </FloatingPanel.Header>
  </FloatingPanel.DragTrigger>
</template>
