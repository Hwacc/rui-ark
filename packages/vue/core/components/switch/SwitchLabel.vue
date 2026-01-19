<script lang="ts">
export interface SwitchLabelProps extends ThemeProps {
  class?: HTMLAttributes['class']
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { SwitchLabel } from '@ark-ui/vue/switch'
import { tvSwitch } from '@rui-ark/themes/crafts/switch'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  size,
  unstyled,
  asChild,
} = defineProps<SwitchLabelProps>()

const theme = useTheme(() => ({ size, unstyled }))
const { label } = tvSwitch()
</script>

<template>
  <SwitchLabel
    :class="label({ class: [propsClass], ...theme })"
    :as-child="asChild"
  >
    <slot />
  </SwitchLabel>
</template>
