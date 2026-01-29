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
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  weekDayType = 'short',
} = defineProps<DatePickerDayViewProps>()
const { viewCount } = inject<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, {
  viewCount: computed(() => 1),
})
const context = useDatePickerContext()

// theme
const theme = useTheme(() => propsTheme)
const {
  view,
  viewControl,
  viewControlTrigger,
  viewTrigger,
  table,
  tableHead,
  tableHeader,
  tableBody,
  tableBodyRow,
  tableBodyCell,
  tableBodyCellTrigger,
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
        v-if="viewCount > 1"
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
        <div
          v-for="(week, wid) in context.weeks"
          :key="wid"
          :class="tableBodyRow({ ...theme })"
        >
          <DatePicker.TableCell
            v-for="(day, did) in week"
            :key="did"
            :value="day"
            :class="tableBodyCell({ ...theme })"
          >
            <DatePicker.TableCellTrigger :class="tableBodyCellTrigger({ ...theme })">
              {{ day.day }}
            </DatePicker.TableCellTrigger>
          </DatePicker.TableCell>
        </div>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
