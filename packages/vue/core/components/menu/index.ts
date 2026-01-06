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

export { default as MenuItem, type MenuItemProps } from './MenuItem.vue'
export { default as MenuItemGroup, type MenuItemGroupProps } from './MenuItemGroup.vue'
export { default as MenuTriggerItem, type MenuTriggerItemProps } from './MenuTriggerItem.vue'

export {
  MenuContextTrigger,
  MenuItemText,
  MenuTrigger,
} from '@ark-ui/vue/menu'

const MenuArrow = createArrow(ArkMenuArrow, ArkMenuArrowTip)
export { MenuArrow }
