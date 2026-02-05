<script lang="ts">
export interface FloatingPanelHeaderProps extends FloatingPanelHeaderBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { FloatingPanelHeaderBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel } from '@ark-ui/vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelHeaderProps>()
</script>

<template>
  <FloatingPanel.DragTrigger>
    <FloatingPanel.Header>
      <FloatingPanel.Title />
      <FloatingPanel.Control />
    </FloatingPanel.Header>
  </FloatingPanel.DragTrigger>
</template>
