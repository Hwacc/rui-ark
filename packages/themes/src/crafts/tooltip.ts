import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-tooltip'

export const tvTooltip = tv(
  {
    slots: {
      content: [
        'rounded-(--border-radius)',
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
      contentInner: ['relative', 'rounded-(--border-radius)', 'z-10'],
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
        },
      },
      {
        size: 'base',
        class: {
          contentInner: 'px-2 py-1 text-sm',
        },
      },
      {
        size: 'lg',
        class: {
          contentInner: 'px-2.5 py-1.5 text-base',
        },
      },
      {
        bordered: true,
        class: {
          content: 'border',
        },
      },
    ],
  },
  {
    slots: {
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)

export type TooltipVariants = VariantProps<typeof tvTooltip>
