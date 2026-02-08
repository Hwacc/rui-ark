<script lang="ts">
export interface FloatingPanelStageTriggerProps extends FloatingPanelStageTriggerBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { FloatingPanelStageTriggerBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { tvFloatingPanel } from '@rui-ark/themes/crafts/core/floating-panel'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { Minus, Square, SquareArrowOutDownLeft } from 'lucide-vue-next'
import { computed, h } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  stage,
  ...props
} = defineProps<FloatingPanelStageTriggerProps>()
const forwarded = useForwardProps(props)

const stageComponent = computed(() => {
  switch (stage) {
    case 'minimized':
      return h(Minus)
    case 'maximized':
      return h(Square)
    case 'default':
    default:
      return h(SquareArrowOutDownLeft)
  }
})

// theme
const theme = useTheme(() => propsTheme)
const { trigger } = tvFloatingPanel()
</script>

<template>
  <FloatingPanel.StageTrigger
    v-bind="forwarded"
    :stage="stage"
    :class="trigger({ class: propsClass, ...theme })"
  >
    <slot>
      <component :is="stageComponent" :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </FloatingPanel.StageTrigger>
</template>
