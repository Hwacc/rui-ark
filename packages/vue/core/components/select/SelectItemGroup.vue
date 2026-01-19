<script lang="ts">
export interface SelectItemGroupProps extends SelectItemGroupBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  label?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { SelectItemGroupBaseProps } from '@ark-ui/vue/select'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  label,
  ui,
  ...props
} = defineProps<SelectItemGroupProps>()
const forwarded = useForwardProps(props)
const theme = useTheme(() => ({ size, unstyled }))

const { itemGroup, itemGroupLabel } = tvSelect()
</script>

<template>
  <Select.ItemGroup
    v-bind="forwarded"
    :class="itemGroup({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot name="label">
      <Select.ItemGroupLabel
        :class="itemGroupLabel({ class: [ui?.label], ...theme })"
      >
        {{ label }}
      </Select.ItemGroupLabel>
    </slot>
    <slot />
  </Select.ItemGroup>
</template>
