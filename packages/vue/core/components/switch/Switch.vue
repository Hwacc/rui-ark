<script lang="ts">
export interface SwitchProps extends SwitchRootProps {
  class?: HtmlHTMLAttributes['class']
  size?: SwitchVariants['size']
  unstyled?: boolean
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
import type { SwitchVariants } from '@rui-ark/themes/crafts/switch'
import type { HtmlHTMLAttributes } from 'vue'
import { Switch, useForwardPropsEmits } from '@ark-ui/vue'
import { tvSwitch } from '@rui-ark/themes/crafts/switch'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  size,
  unstyled,
  ui,
  ...props
} = defineProps<SwitchProps>()
const emit = defineEmits<SwitchRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)

const theme = useTheme({ size, unstyled })
const { root, control, thumb } = tvSwitch()
</script>

<template>
  <Switch.Root
    v-bind="forwarded"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <Switch.Control :class="control({ class: ui?.control, ...theme })">
        <Switch.Thumb :class="thumb({ class: ui?.thumb, ...theme })" />
      </Switch.Control>
      <Switch.HiddenInput />
      <slot />
    </ThemeProvider>
  </Switch.Root>
</template>
