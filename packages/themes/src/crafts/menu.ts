import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-menu'

export const tvMenu = tv(
  {
    slots: {
      root: '',
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
      contentInner: [
        'relative',
        'rounded-(--border-radius)',
        'z-10',
        'min-w-(--reference-width)',
        'px-2',
        'py-1.5',
      ],
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
    compoundVariants: [
      {
        bordered: true,
        class: {
          content: 'border',
        },
      },
    ],
    defaultVariants: { size: 'base', bordered: true },
  },
  {
    slots: {
      root: prefix,
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)
export type MenuVariants = VariantProps<typeof tvMenu>
