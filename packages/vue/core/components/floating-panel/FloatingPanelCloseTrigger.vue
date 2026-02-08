<script lang="ts">
export interface FloatingPanelCloseTriggerProps extends FloatingPanelCloseTriggerBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { FloatingPanelCloseTriggerBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { tvFloatingPanel } from '@rui-ark/themes/crafts/core/floating-panel'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { X } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelCloseTriggerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const { trigger } = tvFloatingPanel()
</script>

<template>
  <FloatingPanel.CloseTrigger v-bind="forwarded" :class="trigger({ class: propsClass, ...theme })">
    <slot>
      <X :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </FloatingPanel.CloseTrigger>
</template>
