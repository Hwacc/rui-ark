<script lang="ts">
export interface DatePickerDayViewProps extends Theme {
  class?: HTMLAttributes['class']
  weekDayType?: 'short' | 'long' | 'narrow'
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import type { DatePickerContentProvide } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { tvDatePickerView } from '@rui-ark/themes/crafts/date-picker'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  weekDayType = 'short',
} = defineProps<DatePickerDayViewProps>()
const { viewsState } = inject<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, {
  viewsState: computed(() => ({
    count: 1,
    hasDayView: true,
    hasMonthView: false,
    hasYearView: false,
  })),
})

const context = useDatePickerContext()

// theme
const theme = useTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'day',
    weekDayType,
  }),
)
const {
  view,
  viewControl,
  viewControlTrigger,
  viewTrigger,
  table,
  tableHead,
  tableHeader,
  tableBody,
  tableCell,
  tableCellTrigger,
} = tvDatePickerView()
</script>

<template>
  <DatePicker.View
    view="day"
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
        v-if="viewsState.count > 1 && viewsState.hasMonthView"
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
        v-bind="context.getTableHeadProps()"
        :class="tableHead({ ...theme })"
      >
        <div
          v-for="(weekDay, id) in context.weekDays"
          v-bind="context.getTableHeaderProps()"
          :key="id"
          :class="tableHeader({ ...theme })"
        >
          {{ weekDay[weekDayType] }}
        </div>
      </div>
      <div
        v-bind="context.getTableBodyProps()"
        :class="tableBody({ ...theme })"
      >
        <DatePicker.TableCell
          v-for="(day, did) in flatten(context.weeks)"
          :key="did"
          :value="day"
          :class="tableCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              tableCellTrigger({ ...context.getDayTableCellState({ value: day }), ...theme })
            "
          >
            {{ day.day }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
