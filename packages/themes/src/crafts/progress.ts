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
        track: '',
        range: 'rounded-[calc(var(--spacing)*1.5)]',
      },
      sm: {
        track: '',
        range: 'rounded-[calc(var(--spacing))]',
      },
      lg: {
        track: '',
        range: 'rounded-[calc(var(--spacing)*2)]',
      },
    },

    orientation: {
      horizontal: '',
      vertical: '',
    },
  },

  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'base',
      class: {
        track: 'w-full h-1.5 rounded-[calc(var(--spacing)*1.5)]',
        range: 'h-full rounded-[calc(var(--spacing)*1.5)]',
      },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        track: 'w-full h-1 rounded-[calc(var(--spacing))]',
        range: 'h-full rounded-[calc(var(--spacing))]',
      },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        track: 'w-full h-2 rounded-[calc(var(--spacing)*2)]',
        range: 'h-full rounded-[calc(var(--spacing)*2)]',
      },
    },
    {
      orientation: 'vertical',
      size: 'base',
      class: {
        track: 'h-full w-1.5 rounded-[calc(var(--spacing)*1.5)]',
        range: 'w-full rounded-[calc(var(--spacing)*1.5)]',
      },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        track: 'h-full w-1 rounded-[calc(var(--spacing))]',
        range: 'w-full rounded-[calc(var(--spacing))]',
      },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        track: 'h-full w-2 rounded-[calc(var(--spacing)*2)]',
        range: 'w-full rounded-[calc(var(--spacing)*2)]',
      },
    },
  ],
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
