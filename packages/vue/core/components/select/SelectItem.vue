<script lang="ts">
export interface SelectItemProps extends SelectItemBaseProps {
  class?: HTMLAttributes['class']
  size?: SelectVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { SelectItemBaseProps } from '@ark-ui/vue/select'
import type { SelectVariants } from '@rui-ark/themes/crafts/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check } from 'lucide-vue-next'

const { class: propsClass, size, unstyled, ...props } = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)
const theme = useTheme({ size, unstyled })
</script>

<template>
  <Select.Item
    v-bind="forwarded"
  >
    <Select.ItemIndicator>
      <slot name="indicator">
        <Check />
      </slot>
    </Select.ItemIndicator>
    <Select.ItemText>
      <slot />
    </Select.ItemText>
  </Select.Item>
</template>
