<script lang="ts">
export interface PopoverContentProps extends ArkPopoverContentProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { PopoverContentProps as ArkPopoverContentProps } from '@ark-ui/vue/popover'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@rui-ark/vue-core/utils/vnode'
import { computed, useSlots } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<PopoverContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'PopoverContext', 'PopoverContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'PopoverArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'PopoverArrow'))

const theme = useTheme(() => propsTheme)
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
    </Popover.Content>
  </Popover.Positioner>
</template>
