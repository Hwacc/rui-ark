<script lang="ts">
export interface DatePickerControlProps extends DatePickerControlBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { DatePickerControlBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { DatePicker } from '@ark-ui/vue'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvDatePicker } from '@rui-ark/themes/crafts/date-picker'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DatePickerControlProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const { control } = tvDatePicker()
</script>

<template>
  <DatePicker.Control v-bind="forwarded" :class="control({ class: propsClass, ...theme })">
    <slot />
  </DatePicker.Control>
</template>
