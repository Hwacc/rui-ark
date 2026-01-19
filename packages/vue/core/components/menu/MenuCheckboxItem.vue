<script lang="ts">
export interface MenuCheckboxItemProps extends MenuCheckboxItemBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    checkbox?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type {
  MenuCheckboxItemBaseProps,
  MenuCheckboxItemEmits,
} from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { Checkbox } from '@rui-ark/vue-core/components/checkbox'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  ui,
  ...props
} = defineProps<MenuCheckboxItemProps>()
const emit = defineEmits<MenuCheckboxItemEmits>()
defineSlots<{
  default: (props: { checked: boolean }) => any
  indicator: (props: { checked: boolean }) => any
}>()
const forwarded = useForwardPropsEmits(props, emit)

const theme = useTheme(() => ({ size, unstyled }))
const { item } = tvMenu()
</script>

<template>
  <Menu.CheckboxItem
    v-bind="forwarded"
    :class="item({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot name="indicator" v-bind="{ checked: forwarded.checked }">
      <Checkbox
        :class="ui?.checkbox"
        :checked="forwarded.checked"
        :size="size"
        :unstyled="unstyled"
      />
    </slot>
    <slot name="default" v-bind="{ checked: forwarded.checked }" />
  </Menu.CheckboxItem>
</template>
