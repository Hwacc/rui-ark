import {
  TooltipArrow as ArkTooltipArrow,
  TooltipArrowTip as ArkTooltipArrowTip,
} from '@ark-ui/vue/tooltip'
import { createArrow } from '@rui-ark/vue-core/components/arrow/createArrow'

export { default as Tooltip, type TooltipProps } from './Tooltip.vue'
export {
  default as TooltipContent,
  type TooltipContentProps,
} from './TooltipContent.vue'

export { TooltipTrigger, type TooltipTriggerProps } from '@ark-ui/vue/tooltip'

const TooltipArrow = createArrow(ArkTooltipArrow, ArkTooltipArrowTip)
export { TooltipArrow }
