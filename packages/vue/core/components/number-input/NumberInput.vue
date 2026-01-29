<script lang="ts">
export interface NumberInputProps extends NumberInputRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  showTrigger?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    triggerGroup?: HTMLAttributes['class']
    trigger?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { NumberInputRootBaseProps, NumberInputRootEmits } from '@ark-ui/vue/number-input'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { NumberInput, useNumberInput } from '@ark-ui/vue/number-input'
import { tvInput } from '@rui-ark/themes/crafts/input'
import { tvNumberInput } from '@rui-ark/themes/crafts/number-input'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

const {
  class: propsClass,
  size,
  ui,
  unstyled = undefined,
  showTrigger = false,
  ...props
} = defineProps<NumberInputProps>()
const emits = defineEmits<
  NumberInputRootEmits & {
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
  }
>()
const numberInput = useNumberInput(useForwardProps(props), emits)

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { root: tvInputRoot, input: tvInputInput } = tvInput()
const { root, control, input, triggerGroup, trigger } = tvNumberInput()

// expose
defineExpose({ $api: numberInput })
useForwardExpose()
</script>

<template>
  <NumberInput.RootProvider
    :value="numberInput"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot name="prefix" />
    <NumberInput.Control
      :class="tvInputRoot({ class: control({ class: ui?.control, ...theme }), ...theme })"
    >
      <NumberInput.Input
        :class="tvInputInput({ class: input({ class: ui?.input, ...theme }), ...theme })"
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
      />
      <div
        v-if="showTrigger"
        :class="triggerGroup({ class: ui?.triggerGroup, ...theme })"
        data-scope="number-input"
        data-part="trigger-group"
      >
        <NumberInput.IncrementTrigger :class="trigger({ class: ui?.trigger, ...theme })">
          <ChevronUp />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger :class="trigger({ class: ui?.trigger, ...theme })">
          <ChevronDown />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
    <slot name="suffix" />
  </NumberInput.RootProvider>
</template>
