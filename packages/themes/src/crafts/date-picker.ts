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
      tableHead: 'grid',
      tableHeader: 'block text-center truncate uppercase',
      tableBody: 'grid',
      tableBodyRow: 'grid',
      tableBodyCell: '',
      tableBodyCellTrigger: [
        'relative',
        'flex',
        'items-center',
        'justify-center',
        'size-full',
        'cursor-default',
      ],
    },
    variants: {
      size: {
        base: {
          view: 'text-sm',
          viewControl: '',
          viewControlTrigger: 'box-content size-4 p-2',
          viewTrigger: 'text-sm h-full px-1.5',
          tableHeader: 'w-8 text-xs',
        },
        sm: {
          view: 'text-xs',
          viewControl: '',
          viewControlTrigger: 'box-content size-3 p-1.5',
          viewTrigger: 'text-xs h-full px-1',
          tableHeader: 'w-7 text-xxs',
        },
        lg: {
          view: 'text-base',
          viewControl: '',
          viewControlTrigger: 'box-content size-4.5 p-2.5',
          viewTrigger: 'text-base h-full px-2',
          tableHeader: 'w-10 text-sm',
        },
      },

      view: {
        day: {
          tableHead: 'grid-cols-7',
          tableBodyRow: 'grid-cols-7',
          tableBodyCell: 'aspect-square',
        },
        month: {
          tableBody: 'grid-cols-4',
          tableBodyCell: 'aspect-[16/9]',
        },
        year: '',
      },

      selected: {
        true: {
          tableBodyCellTrigger: 'rounded',
        },
      },

      today: {
        true: {
          tableBodyCellTrigger: [
            'after:content-[""]',
            'after:absolute',
            'after:top-0',
            'after:right-0',
            'after:rounded-full',
          ],
        },
      },
    },

    compoundVariants: [
      {
        size: 'base',
        view: 'month',
        class: {
          tableBodyCell: 'w-14',
        },
      },
      {
        size: 'sm',
        view: 'month',
        class: {
          tableBodyCell: 'w-12.5',
        },
      },
      {
        size: 'lg',
        view: 'month',
        class: {
          tableBodyCell: 'w-17.5',
        },
      },
      {
        today: true,
        size: 'base',
        class: {
          tableBodyCellTrigger: 'after:w-1.5 after:h-1.5',
        },
      },
      {
        today: true,
        size: 'sm',
        class: {
          tableBodyCellTrigger: 'after:w-1.25 after:h-1.25',
        },
      },
      {
        today: true,
        size: 'lg',
        class: {
          tableBodyCellTrigger: 'after:w-2 after:h-2',
        },
      },
    ],

    defaultVariants: {
      size: 'base',
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
