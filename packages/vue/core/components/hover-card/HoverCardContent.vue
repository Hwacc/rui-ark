<script lang="ts">
export interface HoverCardContentProps extends ArkHoverCardContentProps, ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { HoverCardContentProps as ArkHoverCardContentProps } from '@ark-ui/vue/hover-card'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme/theme-props'
import type { HTMLAttributes } from 'vue'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvHoverCard } from '@rui-ark/themes/crafts/hover-card'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import {
  checkContextVNodePosition,
  excludeVNodesByName,
  findVNodeByName,
} from '@rui-ark/vue-core/utils/vnode'
import { computed, useSlots } from 'vue'

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
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'HoverCardContext', 'HoverCardContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'HoverCardArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'HoverCardArrow'))

const theme = useTheme(computed(() => ({ size, unstyled, skin, bordered })))
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
