import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-date-picker'

export const tvDatePicker = tv(
  {
    slots: {
      root: '',
      control: ['flex', 'items-center', 'gap-2', 'w-fit'],
      content: [
        'group/content',
        'relative',
        'z-auto',
        'min-w-(--reference-width)',
        'rounded',
        'p-0',
        'z-(--z-popover)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:motion-scale-in-95',
        'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[.25rem]',
        'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[.25rem]',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:motion-scale-out-95',
        'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[.25rem]',
        'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[.25rem]',
      ],
      contentInner: '',
    },

    variants: {
      size: {
        base: {
          contentInner: 'px-2 py-1.5',
        },
        sm: {
          contentInner: 'px-1.5 py-1',
        },
        lg: {
          contentInner: 'px-2.5 py-1.5',
        },
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: '',
      },
    },
  },
  {
    slots: {
      root: `${prefix}`,
      control: `${prefix}-control`,
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)

export type DatePickerVariantProps = VariantProps<typeof tvDatePicker>

export const tvDatePickerView = tv(
  {
    slots: {
      view: 'flex flex-col gap-2',
      viewControl: ['flex', 'items-center', 'justify-between', 'w-full'],
      viewControlTrigger: '',
      viewTrigger: 'rounded',
      table: 'grid gap-2',
      tableHead: 'grid grid-cols-7',
      tableHeader: 'flex items-center justify-center',
      tableBody: 'grid',
      tableBodyRow: 'grid grid-cols-7',
      tableBodyCell: ['w-full', 'aspect-square'],
      tableBodyCellTrigger: ['flex', 'items-center', 'justify-center', 'size-full'],
    },
    variants: {
      size: {
        base: {
          view: 'text-sm',
          viewControl: '',
          viewControlTrigger: 'box-content size-4 p-2',
          viewTrigger: 'text-sm h-full px-1.5',
        },
        sm: {
          view: 'text-xs',
          viewControl: '',
          viewControlTrigger: 'box-content size-3 p-1.5',
          viewTrigger: 'text-xs h-full px-1',
        },
        lg: {
          view: 'text-base',
          viewControl: '',
          viewControlTrigger: 'box-content size-4.5 p-2.5',
          viewTrigger: 'text-base h-full px-2',
        },
      },

      weekDayType: {
        short: {
          tableHeader: 'px-1 uppercase',
        },
        long: {
          tableHeader: 'px-0.5',
        },
        narrow: {
          tableHeader: 'px-1.5 uppercase',
        },
      },
    },

    defaultVariants: {
      size: 'base',
      weekDayType: 'short',
    },
  },
  {
    slots: {
      view: `${prefix}-view`,
      viewControl: `${prefix}-view-control`,
      viewTrigger: `${prefix}-view-trigger`,
      viewControlTrigger: `${prefix}-view-control-trigger`,
      table: `${prefix}-table`,
      tableHead: `${prefix}-table-head`,
      tableHeader: `${prefix}-table-header`,
      tableBody: `${prefix}-table-body`,
      tableBodyRow: `${prefix}-table-body-row`,
      tableBodyCell: `${prefix}-table-body-cell`,
      tableBodyCellTrigger: `${prefix}-table-body-cell-trigger`,
    },
  },
)

export type DatePickerViewVariantProps = VariantProps<typeof tvDatePickerView>
