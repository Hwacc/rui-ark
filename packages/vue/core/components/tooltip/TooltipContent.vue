<script lang="ts">
export interface TooltipContentProps extends ArkTooltipContentProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { TooltipContentProps as ArkTooltipContentProps } from '@ark-ui/vue/tooltip'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvTooltip } from '@rui-ark/themes/crafts/tooltip'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@rui-ark/vue-core/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<TooltipContentProps>()
const forwarded = useForwardProps<TooltipContentProps, { asChild?: boolean }>(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'TooltipContext', 'TooltipContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'TooltipArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'TooltipArrow'))

const theme = useTheme(() => propsTheme)
const { content, contentInner } = tvTooltip()
</script>

<template>
  <Tooltip.Positioner :class="ui?.positioner" :style="{ zIndex: `var(--z-tooltip, --z-index)` }">
    <Tooltip.Content
      v-bind="forwarded"
      :class="content({ class: [ui?.content, propsClass], ...theme })"
      :data-theme-bordered="theme.bordered ? '' : undefined"
      :data-theme-skin="theme.skin"
      :data-theme-surface="theme.surface"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="contentInner({ class: [ui?.inner], ...theme })"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </Tooltip.Content>
  </Tooltip.Positioner>
</template>
