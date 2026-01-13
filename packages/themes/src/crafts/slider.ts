import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-slider'

export const tvSlider = tv(
  {
    slots: {
      root: '',
      control: '',
      track: '',
      range: '',
      thumb: '',
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
      orientation: {
        horizontal: {
          root: 'flex flex-col',
          control: 'w-full flex items-center',
        },
        vertical: '',
      },
    },
    compoundVariants: [
      {
        size: 'base',
        orientation: 'horizontal',
        class: {
          control: 'test h-[var(--slider-thumb-height,.875rem)]',
        },
      },
    ],
    defaultVariants: {
      size: 'base',
      orientation: 'horizontal',
    },
  },
  {
    slots: {
      root: prefix,
      control: `${prefix}-control`,
      track: `${prefix}-track`,
      range: `${prefix}-range`,
      thumb: `${prefix}-thumb`,
    },
  },
)

export type SliderVariants = VariantProps<typeof tvSlider>
