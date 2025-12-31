import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-dialog'

export const tvDialog = tv(
  {
    slots: {
      backdrop: [
        'fixed',
        'inset-0',
        'z-(--z-overlay)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=closed]:motion-opacity-out',
      ],
      positioner: ['fixed', 'inset-0', 'z-(--z-modal)'],
      content: [
        'max-w-full',
        'md:max-w-[80vw]',
        'border',
        'rounded',
        'data-[state=open]:animate-fade-down-in',
        'data-[state=closed]:animate-fade-down-out',
      ],
    },
  },
  {
    slots: {
      backdrop: `${prefix}-backdrop`,
      positioner: `${prefix}-positioner`,
      content: `${prefix}-content`,
    },
  },
)

export type DialogVariants = VariantProps<typeof tvDialog>
