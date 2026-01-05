import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-popover'

export const tvPopover = tv(
  {
    slots: {
      content: [
        'rounded',
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
      contentInner: ['relative', 'rounded', 'z-10'],
      arrow: 'z-0 overflow-visible',
      arrowTip: '',
      close: 'inline-flex w-fit items-center justify-center',
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
      bordered: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
    compoundVariants: [
      {
        size: 'sm',
        class: {
          contentInner: 'px-1.5 py-0.5 text-xs',
          close: 'p-1 [&_svg]:size-3',
        },
      },
      {
        size: 'base',
        class: {
          contentInner: 'px-2 py-1 text-sm',
          close: 'p-1.5 [&_svg]:size-4',
        },
      },
      {
        size: 'lg',
        class: {
          contentInner: 'px-2.5 py-1.5 text-base',
          close: 'p-2 [&_svg]:size-4.5',
        },
      },
      {
        bordered: true,
        class: {
          content: 'border',
          arrowTip: 'border',
        },
      },
    ],
  },
  {
    slots: {
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
      arrow: `${prefix}-arrow`,
      arrowTip: `${prefix}-arrow-tip`,
      close: `${prefix}-close`,
    },
  },
)

export type PopoverVariants = VariantProps<typeof tvPopover>
