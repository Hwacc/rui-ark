<script lang="ts">
export interface MenuRadioItemGroupProps extends ArkMenuRadioItemGroupProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type {
  MenuRadioItemGroupProps as ArkMenuRadioItemGroupProps,
  MenuRadioItemGroupEmits,
} from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
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
