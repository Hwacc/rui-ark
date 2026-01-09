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
      ],
      item: [
        'relative',
        'flex',
        'items-center',
        'rounded',
        'gap-2',
        'cursor-pointer',
        'transition-colors',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      itemGroup: '',
      itemGroupLabel: 'relative',
      itemGroupMarker: 'absolute left-0 w-0.5',
      triggerItem: 'justify-between',
      triggerItemIndicator: [
        'transition-transform',
        'data-[state=open]:rotate-180',
      ],
      radioItem: 'justify-between',
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
        size: 'base',
        class: {
          contentInner: 'px-2 py-1',
          item: 'text-sm px-2 py-1',
          itemGroupLabel: 'text-sm px-2 py-2',
          itemGroupMarker: 'top-2 bottom-2',
        },
      },
      {
        size: 'sm',
        class: {
          contentInner: 'px-1.5 py-1',
          item: 'text-xs px-1.5 py-1',
          itemGroupLabel: 'text-xs px-1.5 py-1.5',
          itemGroupMarker: 'top-1.5 bottom-1.5',
        },
      },
      {
        size: 'lg',
        class: {
          contentInner: 'px-2.5 py-1.5',
          item: 'text-base px-2.5 py-1.5',
          itemGroupLabel: 'text-base px-2.5 py-2.5',
          itemGroupMarker: 'top-2.5 bottom-2.5',
        },
      },
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
      item: `${prefix}-item`,
      itemGroup: `${prefix}-item-group`,
      itemGroupMarker: `${prefix}-item-group-marker`,
      itemGroupLabel: `${prefix}-item-group-label`,
      triggerItem: `${prefix}-trigger-item`,
      triggerItemIndicator: `${prefix}-trigger-item-indicator`,
      radioItem: `${prefix}-radio-item`,
    },
  },
)
export type MenuVariants = VariantProps<typeof tvMenu>
