<script lang="ts">
export type CheckedState = boolean | 'indeterminate'
export interface CheckboxProps extends CheckboxRootProps, Theme {
  label?: string
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps, UseCheckboxReturn } from '@ark-ui/vue/checkbox'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { tvCheckbox } from '@rui-ark/themes/crafts/checkbox'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check, Minus } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  label,
  ui,
  ...props
} = defineProps<CheckboxProps>()
const emit = defineEmits<CheckboxRootEmits>()
const slots = defineSlots<{
  indicator: (props: { checkedState: CheckedState }) => any
  label: () => any
}>()
const forwarded = useForwardProps(props)
const checkbox = useCheckbox(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const { root, control, indicator, label: tvLabel } = tvCheckbox()

// expose
defineExpose({ $api: checkbox as UseCheckboxReturn })
useForwardExpose()
</script>

<template>
  <Checkbox.RootProvider
    :value="checkbox"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <Checkbox.Control :class="control({ class: ui?.control, ...theme })">
      <Checkbox.Indicator :class="indicator({ class: ui?.indicator, ...theme })">
        <slot name="indicator" v-bind="{ checkedState: checkbox.checkedState }">
          <Check class="size-full stroke-black stroke-[.125rem] [&>path]:animate-check-dash" />
        </slot>
      </Checkbox.Indicator>
      <Checkbox.Indicator :class="indicator({ class: ui?.indicator, ...theme })" indeterminate>
        <slot name="indicator" v-bind="{ checkedState: checkbox.checkedState }">
          <Minus
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-indeterminate-dash"
          />
        </slot>
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label
      v-if="label || slots.label?.()"
      :class="tvLabel({ class: ui?.label, ...theme })"
      :as-child="!!label"
    >
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
