import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-checkbox'

export const tvCheckbox = tv({
  slots: {
    root: ['flex', 'items-center', 'gap-2.5', 'w-fit'],
    control: ['peer', 'shrink-0', 'rounded-xs', 'border'],
    indicator: ['flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'text-inherit'],
    label: '',
  },
  variants: {
    disabled: {
      true: '',
      false: '',
    },
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
        control: 'size-3.5',
        label: 'text-sm',
      },
    },
    {
      size: 'sm',
      class: {
        control: 'size-3',
        label: 'text-xs',
      },
    },
    {
      size: 'lg',
      class: {
        control: 'size-4',
        label: 'text-base',
      },
    },
  ],
  compoundSlots: [
    {
      slots: ['root'],
      disabled: true,
      class: 'opacity-(--disabled-opacity)',
    },
  ],
}, {
  slots: {
    root: prefix,
    control: `${prefix}-control`,
    indicator: `${prefix}-indicator`,
    label: `${prefix}-label`,
  },
})

export type CheckboxVariants = VariantProps<typeof tvCheckbox>
