<script lang="ts">
export interface DatePickerMonthViewProps extends Theme {
  class?: HTMLAttributes['class']
  monthType?: 'short' | 'long'
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import type { DatePickerContentProvide } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { tvDatePickerView } from '@rui-ark/themes/crafts/date-picker'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, inject, watch } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  monthType = 'short',
} = defineProps<DatePickerMonthViewProps>()
const { viewsState } = inject<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, {
  viewsState: computed(() => ({
    count: 1,
    hasDayView: false,
    hasMonthView: true,
    hasYearView: false,
  })),
})
const context = useDatePickerContext()
watch(() => context.value.visibleRangeText, (text) => {
  console.log('visibleRangeText', text)
  console.log('view', context.value.view)
})

// theme
const theme = useTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'month',
    monthType,
  }),
)
const {
  view,
  viewControl,
  viewControlTrigger,
  viewTrigger,
  table,
  tableBody,
  tableBodyCell,
  tableBodyCellTrigger,
} = tvDatePickerView()
</script>

<template>
  <DatePicker.View
    view="month"
    :class="view({ class: propsClass, ...theme })"
  >
    <DatePicker.ViewControl :class="viewControl({ ...theme })">
      <DatePicker.PrevTrigger
        as-child
        :class="viewControlTrigger({ ...theme })"
      >
        <ChevronLeft />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger
        v-if="viewsState.count > 1 && viewsState.hasYearView"
        :class="viewTrigger({ ...theme })"
      >
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.RangeText v-else />
      <DatePicker.NextTrigger
        as-child
        :class="viewControlTrigger({ ...theme })"
      >
        <ChevronRight />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>

    <DatePicker.Table :class="table({ ...theme })">
      <div
        v-bind="context.getTableBodyProps()"
        :class="tableBody({ ...theme })"
      >
        <DatePicker.TableCell
          v-for="(month, mid) in context.getMonths({ format: monthType })"
          :key="mid"
          :value="month.value"
          :class="tableBodyCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              tableBodyCellTrigger({
                ...context.getMonthTableCellState({ value: month.value }),
                ...theme,
              })
            "
          >
            {{ month.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
