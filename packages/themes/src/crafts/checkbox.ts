import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-checkbox'

export const tvCheckbox = tv({
  slots: {
    root: ['flex', 'items-center', 'gap-2.5', 'w-fit'],
    control: ['peer', 'shrink-0', 'rounded-xs', 'border'],
    indicator: ['flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'text-inherit'],
    indicatorChecked: 'size-[0.875lh] stroke-black stroke-[.125rem] [&>path]:animate-check-dash',
    indicatorMinus: 'size-[0.875lh] stroke-black stroke-[.125rem] [&_path]:animate-indeterminate-dash',
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
        control: 'size-4',
        label: 'text-sm',
        indicator: 'text-sm',
      },
    },
    {
      size: 'sm',
      class: {
        control: 'size-3.5',
        label: 'text-xs',
        indicator: 'text-xs',
      },
    },
    {
      size: 'lg',
      class: {
        control: 'size-4.5',
        label: 'text-base',
        indicator: 'text-base',
      },
    },
  ],
}, {
  slots: {
    root: prefix,
    control: `${prefix}-control`,
    indicator: `${prefix}-indicator`,
    indicatorChecked: `${prefix}-indicator-checked`,
    indicatorMinus: `${prefix}-indicator-minus`,
    label: `${prefix}-label`,
  },
})

export type CheckboxVariants = VariantProps<typeof tvCheckbox>
