<script lang="ts">
export interface MenuRadioItemGroupProps extends ArkMenuRadioItemGroupProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type {
  MenuRadioItemGroupProps as ArkMenuRadioItemGroupProps,
  MenuRadioItemGroupEmits,
} from '@ark-ui/vue/menu'
import type { MenuVariants } from '@rui-ark/themes/crafts/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<MenuRadioItemGroupProps>()
const emit = defineEmits<MenuRadioItemGroupEmits>()
const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <Menu.RadioItemGroup v-bind="forwarded">
    <slot />
  </Menu.RadioItemGroup>
</template>
