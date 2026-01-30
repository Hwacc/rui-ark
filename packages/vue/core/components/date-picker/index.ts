import type { ComputedRef } from 'vue'

export { default as DatePicker, type DatePickerProps } from './DatePicker.vue'
export { default as DatePickerContent, type DatePickerContentProps } from './DatePickerContent.vue'
export { default as DatePickerControl, type DatePickerControlProps } from './DatePickerControl.vue'
export { default as DatePickerDayView } from './DatePickerDayView.vue'
export { default as DatePickerMonthView } from './DatePickerMonthView.vue'
export { default as DatePickerYearView } from './DatePickerYearView.vue'

export { DatePickerTrigger, DatePickerValueText } from '@ark-ui/vue/date-picker'

export type DatePickerContentProvide = {
  viewsState: ComputedRef<{
    count: number
    hasDayView: boolean
    hasMonthView: boolean
    hasYearView: boolean
  }>
}
export const DATE_PICKER_CONTENT_PROVIDE_KEY = Symbol('DATE_PICKER_CONTENT_PROVIDE_KEY')
