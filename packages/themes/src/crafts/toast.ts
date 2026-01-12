import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-toast'

export const tvToast = tv(
  {
    slots: {
      root: ['group/toast'],
      content: ['flex', 'items-center', 'border-l-3', 'rounded-md'],
      inner: 'flex flex-col w-max',
      title: '',
      description: '',
      icon: '',
      close: '',
    },
    variants: {
      size: {
        base: {
          content: 'py-4 px-6 space-x-4',
          inner: 'gap-1',
          icon: 'size-4',
          close: 'size-4',
          title: 'text-base',
          description: 'text-sm',
        },
        sm: {
          content: 'py-3 px-4 space-x-3',
          inner: 'gap-0.5',
          icon: 'size-3',
          close: 'size-3',
          title: 'text-sm',
          description: 'text-xs',
        },
        lg: {
          content: 'py-5 px-8 space-x-5',
          inner: 'gap-1.5',
          icon: 'size-5',
          close: 'size-5',
          title: 'text-lg',
          description: 'text-base',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: prefix,
      content: `${prefix}-content`,
      inner: `${prefix}-inner`,
      title: `${prefix}-title`,
      description: `${prefix}-description`,
      icon: `${prefix}-icon`,
      close: `${prefix}-close`,
    },
  },
)

export type ToastVariants = VariantProps<typeof tvToast>
