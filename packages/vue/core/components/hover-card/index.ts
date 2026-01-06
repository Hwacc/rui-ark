import {
  HoverCardArrow as ArkHoverCardArrow,
  HoverCardArrowTip as ArkHoverCardArrowTip,
} from '@ark-ui/vue/hover-card'
import { createArrow } from '@rui-ark/vue-core/components/arrow/createArrow'

export { default as HoverCard, type HoverCardProps } from './HoverCard.vue'
export {
  default as HoverCardContent,
  type HoverCardContentProps,
} from './HoverCardContent.vue'

export {
  HoverCardTrigger,
  type HoverCardTriggerProps,
} from '@ark-ui/vue/hover-card'

const HoverCardArrow = createArrow(ArkHoverCardArrow, ArkHoverCardArrowTip)
export { HoverCardArrow }
