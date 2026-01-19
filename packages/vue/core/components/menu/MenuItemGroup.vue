<script lang="ts">
export interface MenuItemGroupProps extends MenuItemGroupBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
    marker?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { MenuItemGroupBaseProps } from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
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
const theme = useTheme(() => ({ size, unstyled }))

const { itemGroup, itemGroupLabel } = tvMenu()
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
    </slot>
    <slot />
  </Menu.ItemGroup>
</template>
