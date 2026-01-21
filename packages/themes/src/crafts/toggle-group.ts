import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-toggle-group'

export const tvToggleGroup = tv(
  {
    slots: {
      root: ['flex', 'items-center', 'group/toggle-group', 'border', 'rounded'],
      item: ['aspect-square'],
    },
    variants: {
      size: {
        base: {
          item: 'size-7',
        },
        sm: {
          item: 'size-6',
        },
        lg: {
          item: 'size-8',
        },
      },
      orientation: {
        horizontal: {
          root: 'flex-row',
          item: [
            '[&:not([hidden])~:not([hidden])]:border-s',
            '[&:not([hidden])~:not([hidden])]:border-e-0',
          ],
        },
        vertical: {
          root: 'flex-col',
          item: [
            '[&:not([hidden])~:not([hidden])]:border-t',
            '[&:not([hidden])~:not([hidden])]:border-b-0',
          ],
        },
      },
    },
    defaultVariants: {
      size: 'base',
      orientation: 'horizontal',
    },
  },
  {
    slots: {
      root: prefix,
      item: `${prefix}-item`,
    },
  },
)

export type ToggleGroupVariants = VariantProps<typeof tvToggleGroup>
