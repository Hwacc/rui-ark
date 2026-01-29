<script lang="ts">
export interface MenuItemProps extends MenuItemBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { MenuItemBaseProps } from '@ark-ui/vue/menu'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { MenuItem } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<MenuItemProps>()
const forwarded = useForwardProps<MenuItemProps, MenuItemBaseProps>(props)

// theme
const theme = useTheme(() => propsTheme)
const { item } = tvMenu()
</script>

<template>
  <MenuItem v-bind="forwarded" :class="item({ class: [propsClass], ...theme })">
    <slot />
  </MenuItem>
</template>
