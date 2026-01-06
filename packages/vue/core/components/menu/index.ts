import {
  MenuArrow as ArkMenuArrow,
  MenuArrowTip as ArkMenuArrowTip,
} from '@ark-ui/vue/menu'
import { createArrow } from '../arrow/createArrow'

export { default as Menu, type MenuProps } from './Menu.vue'
export {
  default as MenuContent,
  type MenuContentProps,
} from './MenuContent.vue'

export { MenuContextTrigger, MenuTrigger } from '@ark-ui/vue/menu'

const MenuArrow = createArrow(ArkMenuArrow, ArkMenuArrowTip)
export { MenuArrow }
