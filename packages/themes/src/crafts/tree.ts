import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-tree'

export const tvTree = tv(
  {
    slots: {
      root: '',
      tree: '',
    },
  },
  {
    slots: {
      root: prefix,
      tree: `${prefix}-tree`,
    },
  },
)

export type TreeVariants = VariantProps<typeof tvTree>

export const tvTreeBranch = tv(
  {
    slots: {
      root: 'data-[disabled]:pointer-events-none',
      control: 'flex items-center justify-between data-[disabled]:pointer-events-none',
      title: 'flex items-center',
      text: '',
      icon: 'size-[1lh]',
      indicator: [
        'data-[state=open]:rotate-90',
        'data-[state=closed]:rotate-0',
        'transition-transform',
      ],
      content: [
        'overflow-hidden',
        'data-[state=open]:animate-collapsible-down',
        'data-[state=closed]:animate-collapsible-up',
      ],
      indentGuide: '',
      checkbox: '',
      checkboxIndicator: '',
    },

    variants: {
      size: {
        base: {
          control: [
            'text-sm',
            'min-h-8',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4)))]',
          ],
          title: 'gap-2.5',
        },
        sm: {
          control: [
            'text-xs',
            'min-h-6',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*3.5)))]',
          ],
          title: 'gap-2',
        },
        lg: {
          control: [
            'text-base',
            'min-h-10',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4.5)))]',
          ],
          title: 'gap-3',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-branch`,
      control: `${prefix}-branch-control`,
      title: `${prefix}-branch-title`,
      text: `${prefix}-branch-text`,
      icon: `${prefix}-branch-icon`,
      indicator: `${prefix}-branch-indicator`,
      content: `${prefix}-branch-content`,
      indentGuide: `${prefix}-branch-indent-guide`,
      checkbox: `${prefix}-branch-checkbox`,
      checkboxIndicator: `${prefix}-branch-checkbox-indicator`,
    },
  },
)
export type TreeBranchVariants = VariantProps<typeof tvTreeBranch>

export const tvTreeItem = tv(
  {
    slots: {
      root: 'data-[disabled]:pointer-events-none',
      title: 'flex items-center gap-2',
      icon: 'size-[1lh]',
      text: '',
      checkbox: '',
      checkboxIndicator: '',
    },
    variants: {
      size: {
        base: {
          title: [
            'gap-2.5',
            'min-h-8',
            'text-sm',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4)))]',
          ],
        },
        sm: {
          title: [
            'gap-2',
            'min-h-6',
            'text-xs',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*3.5)))]',
          ],
        },
        lg: {
          title: [
            'gap-3',
            'min-h-10',
            'text-base',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4.5)))]',
          ],
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: `${prefix}-item`,
      title: `${prefix}-item-title`,
      icon: `${prefix}-item-icon`,
      text: `${prefix}-item-text`,
      checkbox: `${prefix}-item-checkbox`,
      checkboxIndicator: `${prefix}-item-checkbox-indicator`,
    },
  },
)
