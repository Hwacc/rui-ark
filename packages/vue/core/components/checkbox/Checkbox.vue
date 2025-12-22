<script lang="ts">
export type CheckedState = boolean | 'indeterminate'
export interface CheckboxProps extends CheckboxRootProps {
  label?: string
  class?: HTMLAttributes['class']
  size?: CheckboxVariants['size']
  unstyled?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
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
import { computed } from 'vue'

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
const { root, control, indicator, label: tvLabel } = tvCheckbox()

defineExpose({
  checked: computed(() => checkbox.value.checked),
  checkedState: computed(() => checkbox.value.checkedState),
  toggle: checkbox.value.toggleChecked,
  setChecked: checkbox.value.setChecked,
})
</script>

<template>
  <Checkbox.RootProvider
    :value="checkbox"
    :class="root({ class: [ui?.root, propsClass], unstyled, size })"
  >
    <Checkbox.Control :class="control({ class: ui?.control, unstyled, size })">
      <Checkbox.Indicator
        :class="indicator({ class: ui?.indicator, unstyled, size })"
      >
        <slot
          name="indicator"
          v-bind="{ checkedState: checkbox.checkedState }"
        >
          <Check
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-check-dash"
          />
        </slot>
      </Checkbox.Indicator>
      <Checkbox.Indicator
        :class="indicator({ class: ui?.indicator, unstyled, size })"
        indeterminate
      >
        <slot
          name="indicator"
          v-bind="{ checkedState: checkbox.checkedState }"
        >
          <Minus
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-indeterminate-dash"
          />
        </slot>
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label
      :class="tvLabel({ class: ui?.label, unstyled, size })"
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
