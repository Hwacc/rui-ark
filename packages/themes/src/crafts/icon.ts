import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-icon'

export const tvIcon = tv(
  {
    base: '',
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    class: prefix,
  },
)

export type IconVariants = VariantProps<typeof tvIcon>
