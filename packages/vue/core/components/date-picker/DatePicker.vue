<script lang="ts">
import type * as ZagDatePicker from '@zag-js/date-picker'

export interface DatePickerProps extends DatePickerRootBaseProps, Theme {}
export type DatePickerRootEmits = {
  'focusChange': [details: ZagDatePicker.FocusChangeDetails]
  'openChange': [details: ZagDatePicker.OpenChangeDetails]
  'valueChange': [details: ZagDatePicker.ValueChangeDetails]
  'viewChange': [details: ZagDatePicker.ViewChangeDetails]
  'update:modelValue': [value: ZagDatePicker.DateValue[]]
  'update:open': [open: boolean]
  'update:view': [view: ZagDatePicker.DateView]
  'update:focusedValue': [focusedValue: ZagDatePicker.DateValue]
}
</script>

<script setup lang="ts">
import type { DatePickerRootBaseProps, UseDatePickerProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { DatePicker, useDatePicker, useForwardProps } from '@ark-ui/vue'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { theme, ...props } = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerRootEmits>()
const datePicker = useDatePicker(useForwardProps<DatePickerProps, UseDatePickerProps>(props), emit)
</script>

<template>
  <DatePicker.RootProvider :value="datePicker">
    <ThemeProvider>
      <slot />
    </ThemeProvider>
  </DatePicker.RootProvider>
</template>
