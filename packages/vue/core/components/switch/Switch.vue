<script lang="ts">
export interface SwitchProps extends SwitchRootProps, Theme {
  class?: HtmlHTMLAttributes['class']
  ui?: {
    root?: HtmlHTMLAttributes['class']
    control?: HtmlHTMLAttributes['class']
    thumb?: HtmlHTMLAttributes['class']
    label?: HtmlHTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HtmlHTMLAttributes } from 'vue'
import { Switch, useForwardExpose, useForwardProps, useSwitch } from '@ark-ui/vue'
import { tvSwitch } from '@rui-ark/themes/crafts/switch'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SwitchProps>()
const emit = defineEmits<SwitchRootEmits>()
const switchRoot = useSwitch(useForwardProps(props), emit)

const theme = useTheme(() => propsTheme)
const { root, control, thumb } = tvSwitch()

defineExpose({ $api: switchRoot })
useForwardExpose()
</script>

<template>
  <Switch.RootProvider
    :value="switchRoot"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <Switch.Control :class="control({ class: ui?.control, ...theme })">
        <Switch.Thumb :class="thumb({ class: ui?.thumb, ...theme })" />
      </Switch.Control>
      <Switch.HiddenInput />
      <slot />
    </ThemeProvider>
  </Switch.RootProvider>
</template>
