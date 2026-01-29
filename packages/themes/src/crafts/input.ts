import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-input'

export const tvInput = tv({
  slots: {
    root: [
      'flex',
      'items-center',
      'min-w-0',
      'py-1.5',
      'px-2',
      'gap-2',
      'border',
      'rounded',
      'transition-all',
      'data-[state=disabled]:pointer-events-none',
      'data-[state=disabled]:opacity-(--disabled-opacity)',
    ],
    input: ['flex-1', 'w-0', 'outline-hidden', 'border-none', 'bg-transparent'],
    clearable: ['flex', 'items-center', 'justify-center'],
  },
  variants: {
    size: {
      base: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: { size: 'base' },
  compoundVariants: [
    {
      size: 'base',
      class: {
        root: 'text-sm',
        input: 'placeholder:text-sm',
        clearable: '[&_svg]:size-3.5',
      },
    },
    {
      size: 'sm',
      class: {
        root: 'text-xs',
        input: 'placeholder:text-xs',
        clearable: '[&_svg]:size-3',
      },
    },
    {
      size: 'lg',
      class: {
        root: 'text-base',
        input: 'placeholder:text-base',
        clearable: '[&_svg]:size-4',
      },
    },
  ],
}, {
  slots: {
    root: prefix,
    input: `${prefix}-input`,
    clearable: `${prefix}-clearable`,
  },
})

export type InputVariants = VariantProps<typeof tvInput>
