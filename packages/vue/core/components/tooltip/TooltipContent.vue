<script lang="ts">
export interface TooltipContentProps extends ArkTooltipContentProps {
  class?: HTMLAttributes['class']
  size?: TooltipVariants['size']
  unstyled?: boolean
  skin?: 'dark' | 'light'
  bordered?: TooltipVariants['bordered']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { TooltipContentProps as ArkTooltipContentProps } from '@ark-ui/vue/tooltip'
import type { TooltipVariants } from '@rui-ark/themes/crafts/tooltip'
import type { HTMLAttributes } from 'vue'
import { TooltipContent, TooltipPositioner } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvTooltip } from '@rui-ark/themes/crafts/tooltip'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import {
  contextVNodeWarning,
  findVNodeByName,
} from '@rui-ark/vue-core/utils/vnode'
import { useSlots } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  ui,
  skin,
  bordered,
  ...props
} = defineProps<TooltipContentProps>()
const forwarded = useForwardProps<TooltipContentProps, { asChild?: boolean }>(
  props,
)

const slots = useSlots()
const defaultSlots = slots.default?.()
contextVNodeWarning(defaultSlots, 'TooltipContext', 'TooltipContent')
const arrowNode = findVNodeByName(defaultSlots, 'TooltipArrow')
const otherNodes = defaultSlots?.filter(n => n !== arrowNode) ?? []

const theme = useTheme({ size, unstyled, skin, bordered })
const { content, contentInner } = tvTooltip()
</script>

<template>
  <TooltipPositioner
    :class="ui?.positioner"
    :style="{ zIndex: `var(--z-tooltip, --z-index)` }"
  >
    <TooltipContent
      v-bind="forwarded"
      :class="content({ class: [ui?.content, propsClass], ...theme })"
      :data-bordered="theme.bordered ? 'true' : undefined"
      :data-skin="theme.skin"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div
        :class="contentInner({ class: [ui?.inner], ...theme })"
        :data-skin="theme.skin"
      >
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </TooltipContent>
  </TooltipPositioner>
</template>
