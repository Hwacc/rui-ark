<script lang="ts">
export interface PopoverContentProps extends ArkPopoverContentProps {
  class?: HTMLAttributes['class']
  size?: PopoverVariants['size']
  unstyled?: boolean
  skin?: 'dark' | 'light'
  bordered?: PopoverVariants['bordered']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { PopoverContentProps as ArkPopoverContentProps } from '@ark-ui/vue/popover'
import type { PopoverVariants } from '@rui-ark/themes/crafts/popover'
import type { HTMLAttributes } from 'vue'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { findVNodeByName } from '@rui-ark/vue-core/utils/vnode'
import { useSlots } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  bordered,
  skin,
  ui,
  ...props
} = defineProps<PopoverContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = slots.default?.()
const arrowNode = findVNodeByName(defaultSlots, 'PopoverArrow')
const otherNodes = defaultSlots?.filter(n => n !== arrowNode) ?? []

const theme = useTheme({ size, unstyled, bordered, skin })
const { content, contentInner } = tvPopover()
</script>

<template>
  <Popover.Positioner
    :class="ui?.positioner"
    :style="{ zIndex: `var(--z-popover, --z-index)` }"
  >
    <Popover.Content
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
    </Popover.Content>
  </Popover.Positioner>
</template>
