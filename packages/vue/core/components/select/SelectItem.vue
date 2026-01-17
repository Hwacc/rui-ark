<script lang="ts">
export interface SelectItemProps extends SelectItemBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { SelectItemBaseProps } from '@ark-ui/vue/select'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)
const theme = useTheme(computed(() => ({ size, unstyled })))
const { item, itemIndicator } = tvSelect()
</script>

<template>
  <Select.Item
    v-bind="forwarded"
    :class="item({ class: [propsClass], ...theme })"
  >
    <Select.ItemText>
      <slot />
    </Select.ItemText>
    <slot name="indicator">
      <Select.ItemIndicator :class="itemIndicator({ ...theme })">
        <Check />
      </Select.ItemIndicator>
    </slot>
  </Select.Item>
</template>
