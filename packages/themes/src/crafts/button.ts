import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-btn'

export const tvButton = tv(
  {
    slots: {
      root: [
        'inline-flex',
        'items-center',
        'justify-center',
        'px-4',
        'gap-2',
        'rounded',
        'border',
        'transition-all',
        'disabled:pointer-events-none',
        'disabled:opacity-(--disabled-opacity)',
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
      ],
      loading: 'animate-spin',
    },
    variants: {
      variant: {
        default: '',
        normal: '',
        outline: '',
        text: '',
        icon: {
          root: ['p-0', 'aspect-square', 'border-none'],
        },
      },
      size: {
        base: {
          root: 'h-7 text-sm',
          loading: 'size-4',
        },
        sm: {
          root: 'h-6 text-xs',
          loading: 'size-3.5',
        },
        lg: {
          root: 'h-8 text-base',
          loading: 'size-4.5',
        },
      },
      loading: {
        true: {
          root: 'pointer-events-none',
        },
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      loading: false,
    },
  },
  {
    slots: {
      root: prefix,
      loading: `${prefix}-loading`,
    },
  },
)

export type ButtonVariants = VariantProps<typeof tvButton>
