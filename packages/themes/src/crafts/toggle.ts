import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-toggle'

export const tvToggle = tv({
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'gap-2',
    'whitespace-nowrap',
    'rounded',
    'border',
    'ring',
    'ring-transparent',
  ],
})

export type ToggleVariants = VariantProps<typeof tvToggle>
