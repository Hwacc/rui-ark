import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'

const prefix = 'rui-floating-panel'

export const tvFloatingPanel = tv(
  {
    slots: {
      positioner: '',
      content: '',
      header: 'w-full flex items-center justify-between',
      control: 'flex items-center gap-2',
      title: '',
      trigger: 'flex items-center justify-center',
    },
    variants: {
      size: {
        xs: {
          header: 'py-2 pl-4 pr-3 text-xs',
          control: '',
          trigger: 'size-5',
        },
        sm: {
          header: 'py-2.5 pl-5 pr-4 text-sm',
          control: '',
          trigger: 'size-6',
        },
        base: {
          header: 'py-3 pl-6 pr-5 text-base',
          control: '',
          trigger: 'size-7',
        },
        lg: {
          header: 'py-4 pl-8 pr-7 text-lg',
          control: '',
          trigger: 'size-8',
        },
      },
    },
  },
  {
    slots: {
      positioner: `${prefix}-positioner`,
      content: `${prefix}-content`,
      header: `${prefix}-header`,
      control: `${prefix}-control`,
      title: `${prefix}-title`,
      trigger: `${prefix}-trigger`,
    },
  },
)

export type FloatingPanelVariants = VariantProps<typeof tvFloatingPanel>
