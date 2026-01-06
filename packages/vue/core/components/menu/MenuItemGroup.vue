<script lang="ts">
export interface MenuItemGroupProps extends MenuItemGroupBaseProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
    separator?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { MenuItemGroupBaseProps } from '@ark-ui/vue/menu'
import type { MenuVariants } from '@rui-ark/themes/crafts/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  label,
  ui,
  ...props
} = defineProps<MenuItemGroupProps>()
const forwarded = useForwardProps(props)
const theme = useTheme({ size, unstyled })

const { itemGroup, itemGroupLabel, separator } = tvMenu()
</script>

<template>
  <Menu.ItemGroup
    v-bind="forwarded"
    :class="itemGroup({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot name="label">
      <Menu.ItemGroupLabel
        :class="itemGroupLabel({ class: ui?.label, ...theme })"
      >
        {{ label }}
      </Menu.ItemGroupLabel>
      <Menu.Separator :class="separator({ class: ui?.separator, ...theme })" />
    </slot>
    <slot />
  </Menu.ItemGroup>
</template>
