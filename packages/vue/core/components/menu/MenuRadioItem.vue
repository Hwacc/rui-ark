<script lang="ts">
export interface MenuRadioItemProps extends MenuRadioItemBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  variant?: RadioGroupVariants['variant']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type {
  MenuRadioItemBaseProps,
  UseMenuItemContext,
} from '@ark-ui/vue/menu'
import type { RadioGroupVariants } from '@rui-ark/themes/crafts/radio-group'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { tvRadioGroup } from '@rui-ark/themes/crafts/radio-group'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check, Circle } from 'lucide-vue-next'

const {
  class: propsClass,
  size,
  unstyled,
  variant = 'default',
  ui,
  ...props
} = defineProps<MenuRadioItemProps>()
defineSlots<{
  default: (props: UnwrapRef<UseMenuItemContext>) => any
  indicator: (props: UnwrapRef<UseMenuItemContext>) => any
}>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => ({ size, unstyled }))
const { item, radioItem } = tvMenu()
const { itemIndicator } = tvRadioGroup()
</script>

<template>
  <Menu.RadioItem
    v-bind="forwarded"
    :class="
      cn(
        item({ ...theme }),
        radioItem({ class: [ui?.root, propsClass], ...theme }),
      )
    "
  >
    <Menu.ItemContext v-slot="context">
      <slot name="default" v-bind="context" />
      <slot name="indicator" v-bind="context">
        <Circle
          v-if="variant === 'default'"
          :class="itemIndicator({ class: [ui?.indicator], variant, ...theme })"
          data-part="indicator"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-variant="variant"
          :hidden="context.checked ? undefined : true"
        />
        <Check
          v-if="variant === 'checkbox'"
          :class="itemIndicator({ class: ui?.indicator, variant, ...theme })"
          data-part="indicator"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-variant="variant"
          :hidden="context.checked ? undefined : true"
        />
      </slot>
    </Menu.ItemContext>
  </Menu.RadioItem>
</template>
