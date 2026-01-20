import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-scroll-area'

export const tvScrollArea = tv({
  slots: {
    root: '',
    viewport: 'scrollbar-none scrollbar-none::-webkit-scrollbar',
    content: '',
    scrollbar: '',
    thumb: '',
    corner: '',
  },

  variants: {
    size: {
      base: {
        thumb: '',
      },
      sm: {
        thumb: '',
      },
      lg: {
        thumb: '',
      },
      xs: {

      },
    },
    orientation: {
      vertical: {
        scrollbar: 'h-full',
      },
      horizontal: {
        scrollbar: 'w-full',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      size: 'base',
      class: {
        scrollbar: 'w-2',
        thumb: 'w-2',
      },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        scrollbar: 'w-1.5',
        thumb: 'w-1.5',
      },
    },
  ],

  defaultVariants: {
    size: 'base',
    orientation: 'vertical',
  },
}, {
  slots: {
    root: prefix,
    viewport: `${prefix}-viewport`,
    content: `${prefix}-content`,
    scrollbar: `${prefix}-scrollbar`,
    thumb: `${prefix}-thumb`,
    corner: `${prefix}-corner`,
  },
})

export type ScrollAreaVariantProps = VariantProps<typeof tvScrollArea>
