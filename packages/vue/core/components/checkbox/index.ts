import { Checkbox as ArkCheckbox } from '@ark-ui/vue/checkbox'

const { Group, GroupProvider } = ArkCheckbox
export {
  default as Checkbox,
  type CheckboxProps,
  type CheckedState,
} from './Checkbox.vue'

export { Group as CheckboxGroup, GroupProvider as CheckboxGroupProvider }
