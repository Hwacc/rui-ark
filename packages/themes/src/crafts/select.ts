import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-select'

export const tvSelect = tv(
  {
    slots: {
      root: '',
      trigger: [
        'group',
        'flex',
        'items-center',
        'min-w-[10.875rem]',
        'rounded',
        'gap-1.5',
        'border',
        'px-2',
        'py-1.5',
        'text-start',
        'transition-colors',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      indicator: ['data-[state=open]:rotate-180', 'transition-transform'],
      value: 'flex-1 flex items-center [&>span]:truncate',
      content: [
        'relative',
        'z-auto',
        'min-w-(--reference-width)',
        'rounded',
        'border',
        'p-0',
        'z-(--z-popover)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:motion-scale-in-95',
        'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[.25rem]',
        'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[.25rem]',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:motion-scale-out-95',
        'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[.25rem]',
        'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[.25rem]',
      ],
      item: [
        'w-full',
        'relative',
        'flex',
        'items-center',
        'justify-between',
        'gap-2',
        'rounded',
        'cursor-default',
        'select-none',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      itemIndicator: '[&_path]:animate-check-dash',
    },
    variants: {
      size: {
        base: {
          trigger: 'text-sm',
          indicator: '[&>svg]:size-3.5',
          item: 'text-sm px-2 py-1.5',
          itemIndicator: '[&>svg]:size-3',
        },
        sm: {
          trigger: 'text-xs',
          indicator: '[&>svg]:size-3',
          item: 'text-xs px-1.5 py-1',
          itemIndicator: '[&>svg]:size-3.5',
        },
        lg: {
          trigger: 'text-base',
          indicator: '[&>svg]:size-4.5',
          item: 'text-base px-2.5 py-1.5',
          itemIndicator: '[&>svg]:size-4',
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
      trigger: `${prefix}-trigger`,
      indicator: `${prefix}-indicator`,
      content: `${prefix}-content`,
      value: `${prefix}-value`,
      item: `${prefix}-item`,
      itemIndicator: `${prefix}-item-indicator`,
    },
  },
)

export type SelectVariants = VariantProps<typeof tvSelect>
