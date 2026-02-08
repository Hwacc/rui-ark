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
import { tvFloatingPanel } from '@rui-ark/themes/crafts/core/floating-panel'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { computed } from 'vue'
import { injectFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelContentProps>()

const { opacity } = injectFloatingPanelAppearanceContext()

// theme
const theme = useTheme(() => propsTheme)
const { positioner, content } = tvFloatingPanel()
const style = computed(() => ({
  opacity: opacity.value / 100,
}))
</script>

<template>
  <Teleport to="body">
    <FloatingPanel.Positioner
      :class="positioner({ class: [ui?.positioner, propsClass], ...theme })"
    >
      <FloatingPanel.Content
        v-bind="props"
        :class="content({ class: [ui?.content, propsClass], ...theme })"
        :style="style"
      >
        <slot />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Teleport>
</template>
