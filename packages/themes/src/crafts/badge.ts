import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-badge'

export const tvBadge = tv(
  {
    base: [
      'inline-flex',
      'items-center',
      'rounded',
      'uppercase',
      'outline-none',
      'transition-colors',
    ],
    variants: {
      variant: {
        default: '',
        secondary: '',
        dot: ['rounded-full', '-top-[.5em]', '-right-[.5em]'],
      },
      size: {
        base: ['text-2xs', 'py-[.0625rem]', 'px-[.3125rem]'],
        sm: ['text-3xs', 'py-[.0625rem]', 'px-[.25rem]'],
        lg: ['text-xs', 'py-[.125rem]', 'px-[.375rem]'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
    compoundVariants: [
      {
        variant: 'dot',
        size: 'base',
        class: ['p-0', 'size-[.375rem]'],
      },
      {
        variant: 'dot',
        size: 'sm',
        class: ['p-0', 'size-[.25rem]'],
      },
      {
        variant: 'dot',
        size: 'lg',
        class: ['p-0', 'size-[.5rem]'],
      },
    ],
  },
  {
    class: prefix,
  },
)

export type BadgeVariants = VariantProps<typeof tvBadge>
