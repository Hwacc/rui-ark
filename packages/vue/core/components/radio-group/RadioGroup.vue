<script lang="ts">
export interface RadioGroupProps extends RadioGroupRootProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type {
  RadioGroupRootBaseProps,
  RadioGroupRootEmits,
  RadioGroupRootProps,
} from '@ark-ui/vue/radio-group'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvRadioGroup } from '@rui-ark/themes/crafts/radio-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const forwarded = useForwardProps<RadioGroupProps, RadioGroupRootBaseProps>(
  props,
)
const radioGroup = useRadioGroup(forwarded, emit)

const theme = useTheme(computed(() => ({ size, unstyled })))
const { root } = tvRadioGroup()

defineExpose({
  value: computed(() => radioGroup.value.value),
  setValue: radioGroup.value.setValue,
  clearValue: radioGroup.value.clearValue,
})
</script>

<template>
  <RadioGroup.RootProvider
    :value="radioGroup"
    :class="root({ class: [propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="label" />
      <slot />
    </ThemeProvider>
  </RadioGroup.RootProvider>
</template>
