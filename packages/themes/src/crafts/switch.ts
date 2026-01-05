import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-switch'

export const tvSwitch = tv({
  slots: {
    root: [
      'inline-flex',
      'items-center',
      'gap-2',
      'w-fit',
    ],
    control: [
      'peer',
      'inline-flex',
      'shrink-0',
      'items-center',
      'rounded-full',
      'border-2',
      'transition-colors',
      'disabled:opacity-(--disabled-opacity)',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'size-3.5',
      'rounded-full',
      'origin-center',
      'transition-transform',
      'data-[state=checked]:translate-x-full',
      'data-[state=unchecked]:translate-x-0',
    ],
  },
  variants: {
    size: {
      base: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'base',
  },
  compoundVariants: [
    {
      size: 'base',
      class: {
        control: 'w-8 h-[1.125rem]',
        thumb: 'size-3.5',
      },
    },
    {
      size: 'sm',
      class: {
        control: 'w-[1.75rem] h-4',
        thumb: 'size-3',
      },
    },
    {
      size: 'lg',
      class: {
        control: 'w-[2.25rem] h-5',
        thumb: 'size-4',
      },
    },
  ],
}, {
  slots: {
    root: prefix,
    control: `${prefix}-control`,
    thumb: `${prefix}-thumb`,
  },
})

export type SwitchVariants = VariantProps<typeof tvSwitch>
