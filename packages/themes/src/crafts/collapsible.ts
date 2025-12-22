import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-collapsible'

export const tvCollapsible = tv({
  slots: {
    root: [],
    trigger: ['w-fit flex items-center'],
    indicator: [
      'data-[state=closed]:rotate-0',
      'data-[state=open]:rotate-180',
      'transition-transform',
    ],
    content: [
      'overflow-hidden',
      'data-[state=closed]:animate-collapsible-up',
      'data-[state=open]:animate-collapsible-down',
    ],
  },
  variants: {
    size: {
      sm: {
        trigger: ['text-xs gap-3'],
        indicator: ['[&>svg]:size-3'],
      },
      base: {
        trigger: ['text-sm gap-4'],
        indicator: ['[&>svg]:size-4'],
      },
      lg: {
        trigger: ['text-base gap-4.5'],
        indicator: ['[&>svg]:size-4.5'],
      },
    },
  },
}, {
  slots: {
    root: prefix,
    trigger: `${prefix}-trigger`,
    indicator: `${prefix}-trigger-indicator`,
    content: `${prefix}-content`,
  },
})
export type CollapsibleVariants = VariantProps<typeof tvCollapsible>

const readMorePrefix = 'rui-readmore'
export const tvReadMore = tv({
  slots: {
    root: [],
    content: [],
    trigger: [],
  },
}, {
  slots: {
    root: readMorePrefix,
    content: `${readMorePrefix}-content`,
    trigger: `${readMorePrefix}-trigger`,
  },
})
export type ReadMoreVariants = VariantProps<typeof tvReadMore>
