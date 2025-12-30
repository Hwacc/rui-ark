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
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvCheckbox } from '@rui-ark/themes/crafts/checkbox'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check, Minus } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  label,
  size,
  unstyled,
  ui,
  ...props
} = defineProps<CheckboxProps>()
const emit = defineEmits<CheckboxRootEmits>()
defineSlots<{
  indicator: (props: { checkedState: CheckedState }) => any
  label: () => any
}>()

const forwarded = useForwardProps(props)
const checkbox = useCheckbox(forwarded, emit)
const theme = useTheme({ size, unstyled })
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
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <Checkbox.Control :class="control({ class: ui?.control, ...theme })">
      <Checkbox.Indicator
        :class="indicator({ class: ui?.indicator, ...theme })"
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
        :class="indicator({ class: ui?.indicator, ...theme })"
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
      :class="tvLabel({ class: ui?.label, ...theme })"
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
