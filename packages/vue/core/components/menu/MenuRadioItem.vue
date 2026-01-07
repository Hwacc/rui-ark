<script lang="ts">
export interface MenuRadioItemProps extends MenuRadioItemBaseProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { MenuRadioItemBaseProps } from '@ark-ui/vue/menu'
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
  ...props
} = defineProps<MenuRadioItemProps>()
const forwarded = useForwardProps(props)

const theme = useTheme({ size, unstyled })
const { item } = tvMenu()
</script>

<template>
  <Menu.RadioItem
    v-bind="forwarded"
    :class="item({ class: [propsClass], ...theme })"
  >
    <slot name="indicator" />
    <slot name="default" />
  </Menu.RadioItem>
</template>
