import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-rating-group'

export const tvRatingGroup = tv(
  {
    slots: {
      root: '',
      control: ['flex', 'items-center', 'gap-0.5'],
      item: ['inline-flex', 'outline-none'],
      itemIndicator: ['relative'],
      itemIndicatorIcon: ['absolute', 'block', 'size-full'],
    },
    variants: {
      size: {
        base: {
          itemIndicator: 'size-3.5',
        },
        sm: {
          itemIndicator: 'size-3',
        },
        lg: {
          itemIndicator: 'size-4',
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
      itemIndicator: `${prefix}-item-indicator`,
      itemIndicatorIcon: `${prefix}-item-indicator-icon`,
    },
  },
)

export type RatingGroupVariants = VariantProps<typeof tvRatingGroup>
