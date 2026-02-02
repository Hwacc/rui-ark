import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-icon'

export const tvIcon = tv(
  {
    base: 'size-[1lh]',
  },
  {
    class: prefix,
  },
)

export type IconVariants = VariantProps<typeof tvIcon>
