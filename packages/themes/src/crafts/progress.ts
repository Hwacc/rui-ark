import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-progress'

export const tvProgress = tv({
  slots: {
    root: 'w-full flex flex-col items-center',
    track: '',
    range: '',
    circleTrack: '',
    circleRange: '',
  },
  variants: {
    size: {
      base: {
        track: 'h-1.5 rounded-[calc(var(--spacing)*1.5)]',
        range: 'rounded-[calc(var(--spacing)*1.5)]',
      },
      sm: {
        track: 'h-1 rounded-[calc(var(--spacing))]',
        range: 'rounded-[calc(var(--spacing))]',
      },
      lg: {
        track: 'h-2 rounded-[calc(var(--spacing)*2)]',
        range: 'rounded-[calc(var(--spacing)*2)]',
      },
    },

    orientation: {
      horizontal: {
        track: 'w-full',
        range: 'h-full',
      },
      vertical: {
        track: 'h-full',
        range: 'w-full',
      },
    },
  },
  defaultVariants: {
    size: 'base',
    orientation: 'horizontal',
  },
}, {
  slots: {
    root: prefix,
    track: `${prefix}-track`,
    range: `${prefix}-range`,
    circleTrack: `${prefix}-circle-track`,
    circleRange: `${prefix}-circle-range`,
  },
})

export type ProgressVariantProps = VariantProps<typeof tvProgress>
