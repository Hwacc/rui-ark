import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'
import { tvInput } from './input'

const prefix = 'rui-editable'

export const tvEditable = tv(
  {
    slots: {
      root: 'flex items-center',
      area: '',
      preview: '',
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
        },
      },
      {
        size: 'sm',
        class: {
          root: 'text-xs',
        },
      },
      {
        size: 'lg',
        class: {
          root: 'text-base',
        },
      },
    ],
  },
  {
    slots: {
      root: prefix,
      area: `${prefix}-area`,
      preview: `${prefix}-preview`,
    },
  },
)

export const tvEditableInput = tv(
  {
    extend: tvInput,
    slots: {
      root: '',
      input: 'min-w-20 w-fit',
      clearable: '',
    },
    compoundVariants: [
      {
        size: 'base',
        class: {
          root: 'px-1 py-0.5',
          clearable: 'size-3.5',
        },
      },
      {
        size: 'sm',
        class: {
          root: 'px-0.5 py-0.25',
          clearable: 'size-3',
        },
      },
      {
        size: 'lg',
        class: {
          root: 'px-1.5 py-0.75',
          clearable: 'size-4',
        },
      },
    ],
  },
  {
    slots: {
      root: `${prefix}-input`,
      input: `${prefix}-input-input`,
      clearable: `${prefix}-input-clearable`,
    },
  },
)

export type EditableVariants = VariantProps<typeof tvEditable>
export type EditableInputVariants = VariantProps<typeof tvEditableInput>
