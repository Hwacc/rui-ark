<script lang="ts">
export type CheckedState = boolean | 'indeterminate'
export interface CheckboxProps extends CheckboxRootProps {
  label?: string
  class?: HTMLAttributes['class']
  size?: CheckboxVariants['size']
  stopPropagation?: boolean // 有时checkbox作为checkable-item的子组件，需要阻止事件冒泡
  unstyled?: boolean
  ui?: {
    root?: {
      class?: HTMLAttributes['class']
    }
    control?: {
      class?: HTMLAttributes['class']
    }
    indicator?: {
      class?: HTMLAttributes['class']
    }
    label?: {
      class?: HTMLAttributes['class']
    }
  }
}
</script>

<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox'
import type { CheckboxVariants } from '@rui-ark/themes/crafts/checkbox'
import type { HTMLAttributes } from 'vue'
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { tvCheckbox } from '@rui-ark/themes/crafts/checkbox'
import { Check, Minus } from 'lucide-vue-next'
import { watch } from 'vue'

const {
  class: propsClass,
  label,
  unstyled = false,
  ui,
  size = 'base',
  ...props
} = defineProps<CheckboxProps>()

const emit = defineEmits<CheckboxRootEmits>()

defineSlots<{
  indicator: (props: { checkedState: CheckedState }) => any
  label: () => any
}>()

const checkbox = useCheckbox(props, emit)
console.log('checkbox', checkbox)
watch(checkbox, (newVal) => {
  console.log('checkbox.checkedState', newVal)
})
const { root, control, indicator, label: tvLabel } = tvCheckbox()

defineExpose({
  checkbox,
})
</script>

<template>
  <Checkbox.RootProvider
    :value="checkbox"
    :class="root({ class: [ui?.root?.class, propsClass], unstyled, size })"
  >
    <Checkbox.Control
      :class="control({ class: ui?.control?.class, unstyled, size })"
    >
      <Checkbox.Indicator
        :class="indicator({ class: ui?.indicator?.class, unstyled, size })"
      >
        <slot
          name="indicator"
          v-bind="{ checkedState: checkbox.checkedState }"
        >
          <Check
            v-if="checkbox.checkedState === true"
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-check-dash"
          />
          <Minus
            v-if="checkbox.checkedState === 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-indeterminate-dash"
          />
        </slot>
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label
      :class="tvLabel({ class: ui?.label?.class, unstyled, size })"
      :as-child="!!label"
    >
      <slot name="label">
        <span v-if="label">
          {{ label }}
        </span>
      </slot>
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
