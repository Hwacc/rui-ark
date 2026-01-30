<script lang="ts">
export interface DatePickerContentProps extends DatePickerContentBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { DatePickerContentBaseProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import type { DatePickerContentProvide } from '.'
import { DatePicker } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvDatePicker } from '@rui-ark/themes/crafts/date-picker'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { findVNodeByName, findVNodesByName } from '@rui-ark/vue-core/utils/vnode'
import { compact, isNil } from 'es-toolkit'
import { computed, provide, useSlots } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DatePickerContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const viewsState = computed(() => {
  const state = {
    count: 0,
    hasDayView: false,
    hasMonthView: false,
    hasYearView: false,
  }
  state.count = compact(
    ['DatePickerDayView', 'DatePickerMonthView', 'DatePickerYearView'].map((name) => {
      return findVNodesByName(defaultSlots.value, name).length > 0
    }),
  ).length
  state.hasDayView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerDayView'))
  state.hasMonthView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerMonthView'))
  state.hasYearView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerYearView'))
  return state
})

// theme
const theme = useTheme(() => propsTheme)
const { content, contentInner } = tvDatePicker()

// provide
provide<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, { viewsState })
</script>

<template>
  <DatePicker.Positioner>
    <DatePicker.Content
      v-bind="forwarded"
      :class="content({ class: [propsClass], ...theme })"
    >
      <slot name="prefix" />
      <ark.div
        :class="contentInner({ ...theme })"
        data-scope="date-picker"
        data-part="content-inner"
      >
        <slot />
      </ark.div>
      <slot name="suffix" />
    </DatePicker.Content>
  </DatePicker.Positioner>
</template>
