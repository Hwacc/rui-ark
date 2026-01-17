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
      thumb: 'rounded-full data-dragging:scale-120 transition-transform',
      marker: '',
    },
    variants: {
      size: {
        base: {
          control: 'h-[max(var(--slider-thumb-height),.875rem)]',
          track: 'h-1 rounded-md',
          range: 'rounded-md',
          thumb: [
            'w-[max(var(--slider-thumb-width),.875rem)]',
            'h-[max(var(--slider-thumb-height),.875rem)]',
          ],
        },
        sm: {
          control: 'h-[max(var(--slider-thumb-height),.75rem)]',
          track: 'h-0.5 rounded',
          range: 'rounded',
          thumb: [
            'w-[max(var(--slider-thumb-width),.625rem)]',
            'h-[max(var(--slider-thumb-height),.625rem)]',
          ],
        },
        lg: {
          control: 'h-[max(var(--slider-thumb-height),1rem)]',
          track: 'h-1.5 rounded-lg',
          range: 'rounded-lg',
          thumb: [
            'w-[max(var(--slider-thumb-width),1.125rem)]',
            'h-[max(var(--slider-thumb-height),1.125rem)]',
          ],
        },
      },
      orientation: {
        horizontal: {
          root: 'flex flex-col',
          control: 'w-full flex items-center',
          track: 'w-full',
          range: 'h-full',
        },
        vertical: '',
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
      control: `${prefix}-control`,
      track: `${prefix}-track`,
      range: `${prefix}-range`,
      thumb: `${prefix}-thumb`,
      marker: `${prefix}-marker`,
    },
  },
)

export type SliderVariants = VariantProps<typeof tvSlider>
