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
import type { SwitchRootProps } from '@ark-ui/vue'
import type { SwitchVariants } from '@rui-ark/themes/crafts/switch'
import type { HtmlHTMLAttributes } from 'vue'
import { Switch, useForwardProps } from '@ark-ui/vue'
import { tvSwitch } from '@rui-ark/themes/crafts/switch'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const { class: propsClass, size, unstyled, ui, ...props } = defineProps<SwitchProps>()
const forwarded = useForwardProps(props)

const theme = useTheme({ size, unstyled })
const { root, control, thumb } = tvSwitch()
</script>

<template>
  <Switch.Root v-bind="forwarded" :class="root({ class: [ui?.root, propsClass], ...theme })">
    <Switch.Control :class="control({ class: ui?.control, ...theme })">
      <Switch.Thumb :class="thumb({ class: ui?.thumb, ...theme })" />
    </Switch.Control>
    <Switch.Label />
    <Switch.HiddenInput />
  </Switch.Root>
</template>
