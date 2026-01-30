<script lang="ts">
export interface DatePickerYearViewProps extends Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { tvDatePickerView } from '@rui-ark/themes/crafts/date-picker'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme } = defineProps<DatePickerYearViewProps>()
const context = useDatePickerContext()

// theme
const theme = useTheme(() => Object.assign({}, propsTheme, { view: 'year' }))
const {
  view,
  viewControl,
  viewControlTrigger,
  table,
  tableBody,
  tableCell,
  tableCellTrigger,
} = tvDatePickerView()
</script>

<template>
  <DatePicker.View
    view="year"
    :class="view({ class: propsClass, ...theme })"
  >
    <DatePicker.ViewControl :class="viewControl({ ...theme })">
      <DatePicker.PrevTrigger
        as-child
        :class="viewControlTrigger({ ...theme })"
      >
        <ChevronLeft />
      </DatePicker.PrevTrigger>
      <DatePicker.RangeText />
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
          v-for="(year, yid) in flatten(context.getYearsGrid({ columns: 4 }))"
          :key="`year-${yid}`"
          :value="year.value"
          :class="tableCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              tableCellTrigger({
                ...context.getYearTableCellState({ value: year.value }),
                ...theme,
              })
            "
          >
            {{ year.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
