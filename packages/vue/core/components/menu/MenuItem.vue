<script lang="ts">
export interface MenuItemProps extends MenuItemBaseProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { MenuItemBaseProps } from '@ark-ui/vue/menu'
import type { MenuVariants } from '@rui-ark/themes/crafts/menu'
import type { HTMLAttributes } from 'vue'
import { MenuItem } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<MenuItemProps>()
const forwarded = useForwardProps<MenuItemProps, MenuItemBaseProps>(props)

const theme = useTheme({ size, unstyled })
const { item } = tvMenu()
</script>

<template>
  <MenuItem v-bind="forwarded" :class="item({ class: [propsClass], ...theme })">
    <slot />
  </MenuItem>
</template>
