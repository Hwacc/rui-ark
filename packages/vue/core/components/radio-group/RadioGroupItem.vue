<script lang="ts">
export interface RadioGroupItemProps extends RadioGroupItemBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  label?: string
  variant?: RadioGroupVariants['variant']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type {
  RadioGroupItemBaseProps,
  UseRadioGroupItemContext,
} from '@ark-ui/vue/radio-group'
import type { RadioGroupVariants } from '@rui-ark/themes/crafts/radio-group'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvRadioGroup } from '@rui-ark/themes/crafts/radio-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check, Circle } from 'lucide-vue-next'

const {
  class: propsClass,
  size,
  unstyled,
  label,
  ui,
  variant = 'default',
  ...props
} = defineProps<RadioGroupItemProps>()
defineSlots<{
  control: (props: UnwrapRef<UseRadioGroupItemContext>) => any
  default: (props: UnwrapRef<UseRadioGroupItemContext>) => any
}>()
const forwarded = useForwardProps<RadioGroupItemProps, RadioGroupItemBaseProps>(
  props,
)

const theme = useTheme(() => ({ size, unstyled }))
const { item, itemControl, itemIndicator, itemText } = tvRadioGroup()
</script>

<template>
  <RadioGroup.Item
    v-bind="forwarded"
    :class="item({ class: [ui?.root, propsClass], ...theme })"
  >
    <RadioGroup.ItemContext v-slot="context">
      <slot name="control" v-bind="context">
        <RadioGroup.ItemControl
          :class="itemControl({ class: ui?.control, variant, ...theme })"
          :data-variant="variant"
        >
          <Circle
            v-if="variant === 'default'"
            :class="itemIndicator({ class: ui?.indicator, variant, ...theme })"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
          <Check
            v-if="variant === 'checkbox'"
            :class="itemIndicator({ class: ui?.indicator, variant, ...theme })"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
        </RadioGroup.ItemControl>
      </slot>
      <slot name="default" v-bind="context">
        <RadioGroup.ItemText
          v-if="label"
          :class="itemText({ class: ui?.text, ...theme })"
        >
          {{ label }}
        </RadioGroup.ItemText>
      </slot>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.ItemContext>
  </RadioGroup.Item>
</template>
