<script lang="ts">
export interface FloatingPanelContentProps extends FloatingPanelContentBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { FloatingPanelContentBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel } from '@ark-ui/vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelContentProps>()
</script>

<template>
  <Teleport to="body">
    <FloatingPanel.Positioner>
      <FloatingPanel.Content
        v-bind="props"
      >
        <slot />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Teleport>
</template>
