import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'

const prefix = 'rui-virtual'

export const tvVirtualList = tv(
  {
    slots: {
      base: 'size-full overflow-auto overflow-anchor-none overscroll-contain',
      scroll: 'relative',
    },
    variants: {
      horizontal: {
        true: '',
        false: '',
      },
    },
  },
  {
    slots: {
      base: `${prefix}-list`,
      scroll: `${prefix}-list-scroll`,
    },
  },
)
export type VirtualListVariants = VariantProps<typeof tvVirtualList>

export const tvVirtualInfiniteLoading = tv(
  {
    slots: {
      base: 'w-full h-auto',
      loading: 'flex items-center justify-center',
      spinner: 'animate-spin',
      complete: 'flex items-center justify-center',
      error: 'flex flex-col items-center justify-center',
    },
    variants: {
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
        base: 'text-base',
      },
    },
    defaultVariants: {
      size: 'base',
    },
    compoundVariants: [
      {
        size: 'base',
        class: {
          loading: 'py-2',
          spinner: 'size-6',
          complete: 'py-2',
          error: 'py-2 gap-2',
        },
      },
      {
        size: 'sm',
        class: {
          loading: 'py-1.5',
          spinner: 'size-5',
          complete: 'py-1.5',
          error: 'py-1.5 gap-1',
        },
      },
      {
        size: 'lg',
        class: {
          loading: 'py-3',
          spinner: 'size-7',
          complete: 'py-3',
          error: 'py-3 gap-2.5',
        },
      },
    ],
  },
  {
    slots: {
      base: `${prefix}-infinite`,
      loading: `${prefix}-infinite-loading`,
      spinner: `${prefix}-infinite-spinner`,
      complete: `${prefix}-infinite-complete`,
      error: `${prefix}-infinite-error`,
    },
  },
)
export type VirtualInfiniteLoadingVariants = VariantProps<typeof tvVirtualInfiniteLoading>

export const tvVirtualGrid = tv(
  {
    slots: {
      base: 'size-full overflow-auto overflow-anchor-none overscroll-contain',
      scroll: 'relative',
    },
  },
  {
    slots: {
      base: `${prefix}-grid`,
      scroll: `${prefix}-grid-scroll`,
    },
  },
)
export type VirtualGridVariants = VariantProps<typeof tvVirtualGrid>
