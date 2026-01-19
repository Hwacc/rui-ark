<script lang="ts">
export interface MenuContentProps extends ArkMenuContentProps, ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { MenuContentProps as ArkMenuContentProps } from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
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
  ui,
  bordered,
  ...props
} = defineProps<MenuContentProps>()
const forwarded = useForwardProps<MenuContentProps, { asChild?: boolean }>(
  props,
)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
checkContextVNodePosition(defaultSlots.value, 'MenuContext', 'MenuContent')
const arrowNode = computed(() => findVNodeByName(defaultSlots.value, 'MenuArrow'))
const otherNodes = computed(() => excludeVNodesByName(defaultSlots.value, 'MenuArrow'))

const theme = useTheme(() => ({ size, unstyled, bordered }))
const { content, contentInner } = tvMenu()
</script>

<template>
  <Menu.Positioner
    :class="ui?.positioner"
    :style="{ zIndex: `var(--z-dropdown, --z-index)` }"
  >
    <Menu.Content
      v-bind="forwarded"
      :class="content({ class: [ui?.content, propsClass], ...theme })"
      :data-bordered="theme.bordered ? 'true' : undefined"
    >
      <template v-if="arrowNode">
        <component :is="arrowNode" />
      </template>
      <div :class="contentInner({ class: [ui?.inner], ...theme })">
        <template v-for="node in otherNodes" :key="node.key">
          <component :is="node" />
        </template>
      </div>
    </Menu.Content>
  </Menu.Positioner>
</template>
