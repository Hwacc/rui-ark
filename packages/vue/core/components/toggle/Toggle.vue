<script lang="ts">
export interface ToggleProps extends ToggleRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { ToggleRootBaseProps, ToggleRootEmits } from '@ark-ui/vue/toggle'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Toggle } from '@ark-ui/vue/toggle'
import { tvToggle } from '@rui-ark/themes/crafts/toggle'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const { class: propsClass, size, unstyled, ...props } = defineProps<ToggleProps>()
const emit = defineEmits<ToggleRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)

const theme = useTheme(() => ({ size, unstyled }))
</script>

<template>
  <Toggle.Root v-bind="forwarded" :class="tvToggle({ class: [propsClass], ...theme })">
    <slot />
  </Toggle.Root>
</template>
