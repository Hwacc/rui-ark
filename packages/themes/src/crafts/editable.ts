import type { VariantProps } from '../utils/tv'
import { tv } from '../utils/tv'

const prefix = 'rui-editable'

export const tvEditable = tv({
  slots: {
    root: [],
    input: [],
  },
}, {
  slots: {
    root: prefix,
    input: `${prefix}-input`,
  },
})

export type EditableVariants = VariantProps<typeof tvEditable>
