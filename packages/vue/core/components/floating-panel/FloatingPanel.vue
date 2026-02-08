<script lang="ts">
import type {
  OpenChangeDetails,
  PositionChangeDetails,
  SizeChangeDetails,
  StageChangeDetails,
} from '@zag-js/floating-panel'

export interface FloatingPanelProps extends FloatingPanelRootBaseProps, Theme {
  class?: HTMLAttributes['class']
  opacity?: number
  pinned?: boolean
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
import { clamp } from 'es-toolkit'
import { computed, ref } from 'vue'
import { provideFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  opacity: propsOpacity = 100,
  pinned: propsPinned = false,
  lazyMount = undefined,
  unmountOnExit = undefined,
  draggable = true,
  ...props
} = defineProps<FloatingPanelProps>()
const emit = defineEmits<FloatingPanelRootEmits>()
const forwarded = useForwardProps(props)

const pinned = ref(propsPinned)
function setPinned(_pinned: boolean) {
  pinned.value = _pinned
}
const opacity = ref(propsOpacity)
function setOpacity(_opacity: number) {
  opacity.value = clamp(_opacity, 0, 100)
}
const mergedProps = computed(() => {
  return {
    ...forwarded.value,
    draggable: !pinned.value && draggable,
  }
})
const floatingPanel = useFloatingPanel(mergedProps, emit)

// appearance context
provideFloatingPanelAppearanceContext({
  opacity,
  pinned,
  setOpacity,
  setPinned,
})

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({
  $api: Object.assign({}, floatingPanel, {
    pinned,
    setPinned: (p: boolean) => {
      pinned.value = p
    },
    opacity,
    setOpacity: (o: number) => {
      opacity.value = clamp(o, 0, 100)
    },
  }),
})
useForwardExpose()
</script>

<template>
  <FloatingPanel.RootProvider :value="floatingPanel">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </FloatingPanel.RootProvider>
</template>
