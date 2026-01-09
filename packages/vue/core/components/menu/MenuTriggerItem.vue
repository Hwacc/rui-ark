<script lang="ts">
export interface MenuTriggerItemProps extends MenuTriggerItemBaseProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { MenuTriggerItemBaseProps } from '@ark-ui/vue/menu'
import type { MenuVariants } from '@rui-ark/themes/crafts/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronRight } from 'lucide-vue-next'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<MenuTriggerItemProps>()
const forwarded = useForwardProps<
  MenuTriggerItemProps,
  MenuTriggerItemBaseProps
>(props)
const theme = useTheme({ size, unstyled })
const { item, triggerItem, triggerItemIndicator } = tvMenu()
</script>

<template>
  <Menu.TriggerItem
    v-bind="forwarded"
    :class="
      cn(item({ class: [propsClass], ...theme }), triggerItem({ ...theme }))
    "
  >
    <Menu.ItemText>
      <slot />
    </Menu.ItemText>
    <Menu.Indicator :class="triggerItemIndicator({ ...theme })">
      <ChevronRight />
    </Menu.Indicator>
  </Menu.TriggerItem>
</template>
