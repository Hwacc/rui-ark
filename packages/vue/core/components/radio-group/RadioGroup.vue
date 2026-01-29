<script lang="ts">
export interface RadioGroupProps extends RadioGroupRootBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { RadioGroupRootBaseProps, RadioGroupRootEmits } from '@ark-ui/vue/radio-group'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { tvRadioGroup } from '@rui-ark/themes/crafts/radio-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const radioGroup = useRadioGroup(useForwardProps(props), emit)

const theme = useTheme(() => propsTheme)
const { root } = tvRadioGroup()

defineExpose({ $api: radioGroup })
useForwardExpose()
</script>

<template>
  <RadioGroup.RootProvider :value="radioGroup" :class="root({ class: [propsClass], ...theme })">
    <ThemeProvider :value="theme">
      <slot name="label" />
      <slot />
    </ThemeProvider>
  </RadioGroup.RootProvider>
</template>
