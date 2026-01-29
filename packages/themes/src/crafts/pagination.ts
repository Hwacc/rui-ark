import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-pagination'

export const tvPagination = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: 'flex items-center gap-2',
      item: ['inline-flex', 'items-center', 'justify-center', 'transition-all', 'rounded'],
      ellipsis: 'inline-flex items-center justify-center',
    },

    variants: {
      size: {
        base: {
          item: ['h-8', 'min-w-8', 'text-sm', '[&>svg]:size-4'],
          ellipsis: 'size-8',
        },
        sm: {
          item: ['h-6', 'min-w-6', 'text-xs', '[&>svg]:size-3.5'],
          ellipsis: 'size-6',
        },
        lg: {
          item: ['h-10', 'min-w-10', 'text-base', '[&>svg]:size-4.5'],
          ellipsis: 'size-10',
        },
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: prefix,
      control: `${prefix}-control`,
      item: `${prefix}-item`,
      ellipsis: `${prefix}-ellipsis`,
    },
  },
)

export type PaginationVariantProps = VariantProps<typeof tvPagination>

export const tvPaginationGoto = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      input: ['[&_[data-part="input"]]:px-0 [&_[data-part="input"]]:text-center'],
    },
    variants: {
      size: {
        base: {
          input: 'text-sm size-8',
        },
        sm: {
          input: 'text-xs size-6',
        },
        lg: {
          input: 'text-base size-10',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-goto`,
      input: `${prefix}-goto-input`,
    },
  },
)
export type PaginationGotoVariantProps = VariantProps<typeof tvPaginationGoto>

export const tvPaginationPageSize = tv(
  {
    slots: {
      root: 'flex items-center gap-2',
      control: '',
      trigger: 'min-w-0',
      value: '',
      content: '',
      item: '',
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-page-size`,
      control: `${prefix}-page-size-control`,
      trigger: `${prefix}-page-size-trigger`,
      value: `${prefix}-page-size-value`,
      content: `${prefix}-page-size-content`,
      item: `${prefix}-page-size-item`,
    },
  },
)
export type PaginationPageSizeVariantProps = VariantProps<typeof tvPaginationPageSize>
