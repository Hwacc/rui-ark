<script lang="ts">
import type {
  OpenChangeDetails,
  PositionChangeDetails,
  SizeChangeDetails,
  StageChangeDetails,
} from '@zag-js/floating-panel'

export interface FloatingPanelProps extends FloatingPanelRootBaseProps, Theme {
  class?: HTMLAttributes['class']
}
/**
 * address ts __VLS_export error
 * @description The emits of the FloatingPanelRoot component.
 */
export interface FloatingPanelRootEmits {
  'exitComplete': []
  'openChange': [details: OpenChangeDetails]
  'update:open': [open: boolean]
  'positionChange': [details: PositionChangeDetails]
  'update:position': [details: PositionChangeDetails['position']]
  'positionChangeEnd': [details: PositionChangeDetails]
  'sizeChange': [details: SizeChangeDetails]
  'update:size': [details: SizeChangeDetails['size']]
  'sizeChangeEnd': [details: SizeChangeDetails]
  'stageChange': [details: StageChangeDetails]
}
</script>

<script setup lang="ts">
import type { FloatingPanelRootBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel, useFloatingPanel, useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<FloatingPanelProps>()
const emit = defineEmits<FloatingPanelRootEmits>()
const floatingPanel = useFloatingPanel(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({ $api: floatingPanel })
useForwardExpose()
</script>

<template>
  <FloatingPanel.RootProvider :value="floatingPanel">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </FloatingPanel.RootProvider>
</template>
