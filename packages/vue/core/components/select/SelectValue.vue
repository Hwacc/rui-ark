<script lang="ts">
export interface SelectValueProps extends ThemeProps {
  class?: HTMLAttributes['class']
  placeholder?: string
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  asChild,
  placeholder,
} = defineProps<SelectValueProps>()

const theme = useTheme(() => ({ size, unstyled }))
const { value: tvValue } = tvSelect()
</script>

<template>
  <ark.span
    :class="tvValue({ class: [propsClass], ...theme })"
    :as-child="asChild"
  >
    <slot>
      <Select.ValueText :placeholder="placeholder" />
    </slot>
  </ark.span>
</template>
