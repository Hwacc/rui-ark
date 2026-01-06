<script lang="ts">
export interface HoverCardContentProps extends ArkHoverCardContentProps {
  class?: HTMLAttributes['class']
  size?: HoverCardVariants['size']
  skin?: 'dark' | 'light'
  unstyled?: boolean
  bordered?: boolean
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { HoverCardContentProps as ArkHoverCardContentProps } from '@ark-ui/vue/hover-card'
import type { HoverCardVariants } from '@rui-ark/themes/crafts/hover-card'
import type { HTMLAttributes } from 'vue'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvHoverCard } from '@rui-ark/themes/crafts/hover-card'
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
  skin,
  bordered,
  ui,
  ...props
} = defineProps<HoverCardContentProps>()

const forwarded = useForwardProps<HoverCardContentProps, { asChild?: boolean }>(
  props,
)
const slots = useSlots()
const defaultSlots = slots.default?.()
contextVNodeWarning(defaultSlots, 'HoverCardContext', 'HoverCardContent')
const arrowNode = findVNodeByName(defaultSlots, 'HoverCardArrow')
const otherNodes = defaultSlots?.filter(n => n !== arrowNode) ?? []

const theme = useTheme({ size, unstyled, skin, bordered })
const { content, contentInner } = tvHoverCard()
</script>

<template>
  <HoverCard.Positioner :class="ui?.positioner">
    <HoverCard.Content
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
    </HoverCard.Content>
  </HoverCard.Positioner>
</template>
