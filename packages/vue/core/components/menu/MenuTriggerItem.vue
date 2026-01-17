<script lang="ts">
export interface MenuTriggerItemProps extends MenuTriggerItemBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { MenuTriggerItemBaseProps } from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

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
const theme = useTheme(computed(() => ({ size, unstyled })))
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
